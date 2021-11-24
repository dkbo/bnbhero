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
                        建築物等級
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
                        卡片資料
                    </Button>
                </Col>
                <Col span="8">
                    <Select
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
                <Col span="8">
                    <Input v-model="name" placeholder="英雄名稱" />
                </Col>
                <Col span="8">
                    <Input v-model="gas" placeholder="Gas" />
                </Col>
            </Row>
            <Row>
                <Col span="24">
                    <Button
                        type="info"
                        long
                    >
                        等級、攻、防、速
                    </Button>
                </Col>
            </Row>
            <CalcInput
                :v="card"
                :PH="['等級', '攻擊', '防禦', '速度']"
            />
            <Row>
                <Col span="24">
                    <Button
                        type="success"
                        long
                        icon="ios-search"
                        @click="handleCalc"
                    >
                        計算
                    </Button>
                </Col>
            </Row>
        </Col>
        <Col span="12">
            <Button
                type="ghost"
                long
                @click="handleRecodeCalc(i)"
                v-for="({name, card, build}, i) in storage"
                icon="ios-search"
                :key="i"
            >
                {{`${name} ${card.join()}|${build.join()}`}}
            </Button>
        </Col>
    </Row>
    <Row>
        <Col span="24">
            <Table border :columns="columns" :data="data" />
        </Col>
    </Row>
    <Row>
        <Col span="24">
            <Table border :columns="columns2" :data="data2" />
        </Col>
    </Row>

  </div>
</template>
<script>
import { calc, calcEnemies, setStorage, getStorage, b64EncodeUnicode, b64DecodeUnicode } from '@UTIL'
import heroData from '@UTIL/hero'
import CalcInput from '@C/CalcInput'
export default {
    name: 'HeroCalc',
    data() {
        const storage = getStorage('HeroCalc') || []
        const heroColumns = {
            title: '英雄素質',
            align: 'center',
            className: 'color5',
            children: [
                {
                    title: '回血CD',
                    key: 'hpcd',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '每日血量',
                    key: 'everyDayHp',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '攻擊',
                    key: 'vatk',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '攻擊',
                    key: 'vatk',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '防禦',
                    key: 'vdef',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '速度',
                    key: 'vagi',
                    align: 'center',
                    className: 'color5'
                }
            ]
        }
        const buildColumns = {
            title: '建築物加成',
            align: 'center',
            className: 'color5',
            children: [
                {
                    title: '屬性加成',
                    key: 'attr',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '獎勵加成(%)',
                    key: 'reward',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '扣血減少(%)',
                    key: 'dishp',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: 'EXP加成',
                    key: 'exp',
                    align: 'center',
                    className: 'color5'
                }
            ]
        }

        const enemiesColumns = {
            title: '怪物數據',
            align: 'center',
            className: 'color5',
            children: [
                {
                    title: '怪物名字',
                    key: 'name',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '總成功率(%)',
                    key: 'successC',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '戰鬥成功扣血量',
                    key: 'hplossC',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '獎金',
                    key: 'rewardC',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '期望每天經驗',
                    key: 'everyXp',
                    align: 'center',
                    className: 'color5'
                },
                {
                    title: '期望每天獎金',
                    key: 'everyRewrad',
                    align: 'center',
                    className: 'color5'
                }
            ]
        }
        return {
            heroData,
            gas: '',
            name: '',
            name2: '',
            card: ['', '', '', ''],
            build: ['', '', '', ''],
            columns: [
                heroColumns,
                buildColumns
            ],
            columns2: [
                enemiesColumns
            ],
            data: [],
            data2: [],
            storage
        }
    },
    mounted() {
        try {
            let {card, build, name, gas} = JSON.parse(b64DecodeUnicode(this.$route.query.search))
            this.card = card
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
            const search = b64EncodeUnicode(JSON.stringify({build: this.build, card: this.card, name: this.name, gas: this.gas}))
            this.$router.push({ path: '', query: { search } })
            const { buildData, cardData } = calc(this)
            this.data = [{
                ...buildData,
                ...cardData
            }]
            this.data2 = calcEnemies({ buildData, cardData, gas: this.gas })
            if (isStorage) {
                const build = [...this.build]
                const card = [...this.card]
                const name = this.name
                this.storage.unshift({ name, build, card })
                this.storage.length > 7 && this.storage.pop()
                setStorage('HeroCalc', this.storage)
            }
        },
        handleRecodeCalc(i) {
            const { build, card, name } = this.storage[i]
            this.name = name
            this.card = [...card]
            this.build = [...build]
            this.handleCalc(false)
        }
    },
    components: {
        CalcInput
    }
}
</script>
<style scoped>

</style>
