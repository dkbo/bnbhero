<template>
    <div class="container">
    <Row>
        <Col span="12">
            <Row>
                <Col span="24">
                    <Button
                        type="info"
                        long
                    >
                        建築物等級 Building Level
                    </Button>
                </Col>
            </Row>
            <CalcInput
                :v="build"
                :PH="['Training Ground', 'BNB Vault', 'Town Inn', 'Barracks']"
            />
            <Row>
                <Col span="24">
                    <Button
                        type="info"
                        long
                    >
                        卡片資料 Card
                    </Button>
                </Col>
                <Col span="6">
                    <Select
                        placeholder="英雄列表 Hero List"
                        v-model="name2"
                        @input="handleChange"
                        filterable
                        long
                    >
                        <OptionGroup v-for="(heroCate, i) in getheroData" :label="heroCate.name" :key="heroCate.name">
                            <Option  v-for="(hero, j) in heroCate.arr" :value="`${i}.${j}`" :key="hero.name" :label="hero.name" />
                        </OptionGroup>
                    </Select>
                </Col>
                <Col span="6">
                    <Input v-model="name" placeholder="英雄名稱 Hero" />
                </Col>
                <Col span="6">
                    <Select
                        placeholder="怪物列表 Enemies List"
                        v-model="enemyType"
                    >
                        <Option  v-for="(enemies, i) in enemiesData" :value="i" :key="enemies.name" :label="enemies.name" />
                    </Select>
                </Col>
                <Col span="6">
                    <Input v-model="gas" placeholder="Gas" />
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Button
                        type="info"
                        long
                    >
                        初始經驗 Exp、攻 atk、防 def、速 agi
                    </Button>
                </Col>
            </Row>
            <CalcInput
                :v="card"
                :PH="['初始經驗', '攻擊 Atk', '防禦 Def', '速度 Agi']"
            />
            <Row>
                <Col span="12">
                    <Input v-model="days" placeholder="試算天數 Calc Days" />
                </Col>
                <Col span="12">
                    <Button
                        type="success"
                        long
                        icon="ios-search"
                        @click="handleCalc"
                    >
                        計算(calculate)
                    </Button>
                </Col>
            </Row>
        </Col>
        <Col span="12">
            <Button
                type="ghost"
                long
                @click="handleRecodeCalc(i)"
                v-for="({name, card, build, enemyType}, i) in storage"
                icon="ios-search"
                :key="i"
            >
                {{`${name} vs ${enemiesData[enemyType].name} | ${card.join()}|${build.join()}`}}
            </Button>
        </Col>
    </Row>
    <Row v-if="tableData.length">
        <Col span="24" class="info">
            總戰鬥次數: {{fightCount}}
            戰鬥成功: {{fightSuccess}}
            戰鬥失敗: {{fightFair}}
            實際勝率: {{(fightSuccess / fightCount * 100).toFixed(2)}}%
            最大連勝次數: {{maxSuccess}}
            最大連敗次數: {{maxFair}}
        </Col>
        <Col span="24" class="info2">
            獎金(BNB): {{totalRewards.toFixed(4)}}
            瓦斯費(BNB): {{successGas.toFixed(4)}}
        </Col>
    </Row>
    <div class="flex">
        <div v-for="data in columns" :key="data.key">{{ data.title }}</div>
    </div>
    <VirtualList
        style="height: calc(100vh - 486px); overflow-y: auto;"
        :data-key="'count'"
        :data-sources="tableData"
        :data-component="item"
    />
  </div>
</template>
<script>
import { calc2, calcFight, setStorage, getStorage, b64EncodeUnicode, b64DecodeUnicode } from '@UTIL'
import heroData from '@UTIL/hero'
import enemiesData from '@UTIL/enemies'
import VirtualList from 'vue-virtual-scroll-list'
import item from './item'

import CalcInput from '@C/CalcInput'
export default {
    name: 'HeroCalc',
    components: {
        CalcInput,
        VirtualList
    },
    data() {
        const storage = getStorage('HeroHighCalc') || []

        return {
            item,
            heroData,
            enemiesData,
            maxSuccess: 0,
            maxFair: 0,
            days: '',
            gas: '',
            name: '',
            name2: '',
            enemyType: 1,
            card: ['', '', '', ''],
            build: ['', '', '', ''],
            columns: [
                {
                    title: '等級 Level',
                    key: 'lv'
                },
                {
                    title: '英雄經驗 Hero Exp',
                    key: 'totalExp'
                },
                {
                    title: '獎勵 Rewards',
                    key: 'rewards'
                },
                {
                    title: '經驗值 EXP',
                    key: 'exp'
                },
                {
                    title: '損血 Hploss',
                    key: 'hploss'
                },
                {
                    title: '燃料費 Gas',
                    key: 'gas'
                }
            ],
            columns2: [
                {
                    title: '戰鬥紀錄',
                    key: 'log'
                }
            ],
            tableData: [],
            storage
        }
    },
    beforeMount() {
        try {
            let {card, build, name, gas, enemyType, days} = JSON.parse(b64DecodeUnicode(this.$route.query.search))
            this.card = card
            this.enemyType = +enemyType
            this.days = days
            this.build = build
            this.name = name
            this.gas = gas
            this.handleCalc(false)
        } catch (err) {

        }
    },
    computed: {
        getheroData() {
            return this.heroData
        },
        fightCount() {
            return this.tableData.filter(({type}) => type === 'Fight').length
        },
        fightSuccess() {
            return this.tableData.filter(({isSuccess}) => isSuccess).length
        },
        fightFair() {
            return this.fightCount - this.fightSuccess
        },
        totalRewards() {
            return this.tableData.reduce((value, {rewards = 0}) => value + +rewards, 0)
        },
        successGas() {
            return this.tableData.reduce((value, {gas = 0}) => value + +gas, 0)
        }
    },
    methods: {
        handleChange(v) {
            const [i, j] = v.split('.')
            const { name, card } = this.getheroData[i].arr[j]
            this.card = [this.card[0], ...card]
            this.name = name
        },
        handleCalc(isStorage = true) {
            const search = b64EncodeUnicode(JSON.stringify({build: this.build, card: this.card, name: this.name, gas: this.gas, enemyType: this.enemyType, days: this.days}))
            this.$router.push({ path: '', query: { search } })
            const { buildData, cardData } = calc2(this)
            const {
                arr,
                maxSuccess,
                maxFair
            } = calcFight({ buildData, cardData, gas: this.gas, enemyType: this.enemyType, totalHp: this.days * cardData.everyDayHp, card: this.card })
            this.tableData = arr
            this.maxSuccess = maxSuccess
            this.maxFair = maxFair
            if (isStorage) {
                const build = [...this.build]
                const card = [...this.card]
                const name = this.name
                this.storage.unshift({ name, build, card, days: this.days, enemyType: this.enemyType, gas: this.gas })
                this.storage.length > 7 && this.storage.pop()
                setStorage('HeroHighCalc', this.storage)
            }
        },
        handleRecodeCalc(i) {
            const { build, card, name, days, enemyType, gas } = this.storage[i]
            this.gas = gas
            this.days = days
            this.enemyType = +enemyType
            this.name = name
            this.card = [...card]
            this.build = [...build]
            this.handleCalc(false)
        }
    }
}
</script>
<style scoped>

::v-deep .ivu-select-group-title {
  background: #2db7f5;
  color: white;
}

.info {
    font-size: 16px;
    padding: 5px;
    background: #67a95b;
    color: #e1e1e1;
}
.info2 {
    font-size: 16px;
    padding: 5px;
    background: #495060;
    color: #c3c3c3;
}
::v-deep .ivu-input,
::v-deep .ivu-btn {
    border-radius: 0;
}
.flex {
  font-size: 16px;
  font-weight: bold;
  padding: 12px;
  display: flex;
  justify-content: space-around;
  background: #f8f8f9;
}
.flex div {
    width: 16.666%;
}
</style>
