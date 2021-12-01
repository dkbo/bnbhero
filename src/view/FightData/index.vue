<template>
    <div class="container">
        <Row>
            <Col span="4">
                <Input v-model="walletAddress" placeholder="bsc 錢包位址" />
            </Col>
            <Col span="4">
                <Input v-model="filterHero" clearable placeholder="篩選英雄" />
            </Col>
            <Col span="4">
                <Input v-model="filterEnemyType" clearable placeholder="篩選敵人" />
            </Col>
            <Col span="8">
                <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="篩選日期" style="width: 100%" @on-change="handleChangeDate" />
            </Col>
            <Col span="4">
                <Button
                        :loading="isLoading"
                        type="success"
                        long
                        icon="ios-search"
                        @click="handleCalc"
                    >
                        計算
                    </Button>
            </Col>
        </Row>
        <Row v-if="tableData.length">
            <Col span="24" class="info">
                總戰鬥次數: {{fightCount}}
                戰鬥成功: {{fightSuccess}}
                戰鬥失敗: {{fightFair}}
                實際勝率: {{(fightSuccess / fightCount * 100).toFixed(2)}}%
                總獎金: {{totalRewards}} BNB
            </Col>
        </Row>
        <div class="flex">
            <div v-for="data in columns" :key="data.key">{{ data.title }}</div>
        </div>
        <VirtualList
            style="height: calc(100vh - 234px); overflow-y: auto;"
            :data-key="'date'"
            :data-sources="tableData"
            :data-component="item"
        />
    </div>
</template>
<script>
import { setStorage, getStorage, b64EncodeUnicode, b64DecodeUnicode } from '@UTIL'
import axios from 'axios'
import VirtualList from 'vue-virtual-scroll-list'
import item from './item'
import enemies from '@UTIL/enemies.js'
import dayjs from 'dayjs'
import Web3 from '@UTIL/web3'
import abi from '@UTIL/abi'
export default {
    name: 'FightData',
    components: {
        VirtualList
    },
    data() {
        return {
            item,
            api: 'https://graphql.bitquery.io',
            walletAddress: getStorage('walletAddress') || '',
            dataAddress: '0xde9fFb228C1789FEf3F08014498F2b16c57db855',
            contract: '0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac',
            contractData: undefined,
            filterHero: '',
            filterEnemyType: '',
            network: 'bsc',
            eventType: 'Fight',
            startDate: null,
            endDate: null,
            data: [],
            columns: [
                {
                    title: '英雄 Hero',
                    key: '_attackingHero'
                },
                {
                    title: '職業 Class',
                    key: 'heroClass'
                },
                {
                    title: '稀有度 Type',
                    key: 'heroType'
                },
                {
                    title: '敵人 Enemies',
                    key: 'enemyType'
                },
                {
                    title: '獎勵 Rewards',
                    key: 'rewards'
                },
                {
                    title: '經驗值 EXP',
                    key: 'xpGained'
                },
                {
                    title: '損血 Hploss',
                    key: 'hpLoss'
                },
                {
                    title: '時間 Date',
                    key: 'date'
                }
            ],
            typeObj: {
                1: '普通 Common',
                2: '罕見 Uncommon',
                3: '稀有 Rare',
                4: '史詩 Epic',
                5: '傳說 Legendary'
            },
            classObj: {
                1: '士兵 Soldier',
                2: '獵人 Hunter',
                3: '刺客 Rogue',
                4: '法師 Mage',
                5: '騎士 Knight'
            },
            heroObj: {

            },
            isLoading: false
        }
    },
    async beforeMount() {
        this.contractData = await new Web3.eth.Contract(abi, this.contract)
        this.walletAddress && this.handleCalc()
        // v.c.methods.getCharactersForPage(Ae, e).call().then((function(e)
    },
    methods: {
        async handleCalc() {
            this.isLoading = true
            const count = await this.fetchGetCount()
            await this.fetchGetFightData(count)
            this.isLoading = false
        },
        fetchGetCount() {
            return axios({
                method: 'post',
                url: this.api,
                headers: {
                    'X-API-KEY': 'BQYvhnv04csZHaprIBZNwtpRiDIwEIW9'
                },
                data: {
                    query: 'query ($network: EthereumNetwork!, $address: String!, $eventType: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $to: ISO8601DateTime, $txFrom: [String!]) {\n  ethereum(network: $network) {\n    smartContractEvents(\n      options: {limit: $limit, offset: $offset}\n      date: {since: $from, till: $to}\n      txFrom: {in: $txFrom}\n      smartContractAddress: {is: $address}\n      smartContractEvent: {is: $eventType}\n    ) {\n      count(smartContractEvent: {is: $eventType})\n      __typename\n    }\n    __typename\n  }\n}',
                    variables: {
                        network: this.network,
                        address: this.dataAddress,
                        eventType: this.eventType,
                        offset: 0,
                        limit: 10000,
                        from: null,
                        to: null,
                        txFrom: [this.walletAddress]
                    }
                }
            })
                .then(
                    ({
                        data: {
                            data: {
                                ethereum: { smartContractEvents }
                            }
                        }
                    }) => smartContractEvents[0].count
                )
                .catch((err) => {
                    const message = '查詢戰鬥數據失敗，請過段時間再查詢'
                    this.$Message.error(message)
                    console.error(err, message)
                    return -1
                })
        },
        fetchGetFightData(limit) {
            return axios({
                method: 'post',
                url: this.api,
                headers: {
                    'X-API-KEY': 'BQYvhnv04csZHaprIBZNwtpRiDIwEIW9'
                },
                data: {
                    query: 'query ($network: EthereumNetwork!, $address: String!, $eventType: String!, $limit: Int!, $offset: Int!, $from: ISO8601DateTime, $to: ISO8601DateTime, $txFrom: [String!]) {\n  ethereum(network: $network) {\n    smartContractEvents(\n      options: {desc: "block.height", limit: $limit, offset: $offset}\n      date: {since: $from, till: $to}\n      txFrom: {in: $txFrom}\n      smartContractAddress: {is: $address}\n      smartContractEvent: {is: $eventType}\n    ) {\n      smartContractEvent {\n        name\n        __typename\n      }\n      block {\n        height\n        timestamp {\n          iso8601\n          unixtime\n          __typename\n        }\n        __typename\n      }\n      arguments {\n        value\n        argument\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}',
                    variables: {
                        network: this.network,
                        address: this.dataAddress,
                        eventType: this.eventType,
                        offset: 0,
                        limit,
                        from: null,
                        to: null,
                        txFrom: [this.walletAddress]
                    }
                }
            })
                .then(this.handleFightData)
                .catch((err) => {
                    console.error(err, '查詢戰鬥數據失敗')
                    return []
                })
        },
        async handleFightData({data: {data: {ethereum: {smartContractEvents}}}}) {
            const calcData = (argument, value) => {
                switch (argument) {
                    case '_attackingHero':
                        this.heroObj[value] = true
                        return value
                    case 'enemyType':
                        return enemies[value].name
                    case 'rewards':
                        return value / 1000000000000000000
                    default:
                        return value
                }
            }
            this.heroObj = {}
            const data = smartContractEvents.map(({arguments: attr, block}) => {
                let obj = {}
                attr.slice(1, 7).forEach(({argument, value}) => (obj[argument] = calcData(argument, value)))
                const date = dayjs.unix(block.timestamp.unixtime)
                obj.timestamp = date.valueOf()
                obj.date = date.format('YYYY/MM/DD HH:mm:ss')
                return obj
            })
            // 取得英雄資料
            const arr = await this.contractData.methods.getCharacterDataByIds(Object.keys(this.heroObj)).call()
            arr.forEach(obj => {
                const obj2 = {...obj}
                obj2.heroType = this.typeObj[obj2.heroType]
                obj2.heroClass = this.classObj[obj2.heroClass]
                this.heroObj[obj.tokenId] = {...obj2}
            })
            this.data = data.map(data => ({...data, ...this.heroObj[data._attackingHero]}))
            setStorage('walletAddress', this.walletAddress)
        },
        handleChangeDate([startDate, endDate]) {
            this.startDate = startDate
            this.endDate = endDate.replace('00:00', '23:59')
        }
    },
    computed: {
        tableData() {
            if (this.filterHero || this.filterEnemyType || this.endDate || this.startDate) {
                const data = this.data.filter(({_attackingHero, enemyType}) => {
                    return (_attackingHero.includes(this.filterHero) || !this.filterHero) &&
                    (enemyType.includes(this.filterEnemyType) || !this.filterEnemyType)
                })
                if (this.endDate || this.startDate) {
                    const startDate = dayjs(this.startDate)
                    const endDate = dayjs(this.endDate)
                    return data.filter(({timestamp}) => startDate <= timestamp && timestamp <= endDate)
                }
                return data
            }
            return this.data
        },
        fightCount() {
            return this.tableData.length
        },
        fightSuccess() {
            return this.tableData.filter(({rewards}) => rewards).length
        },
        fightFair() {
            return this.fightCount - this.fightSuccess
        },
        totalRewards() {
            return this.tableData.reduce((rewards, {rewards: rewards2 = 0}) => rewards + rewards2, 0).toFixed(2)
        }
    }
}
</script>
<style scoped>
::v-deep .table-fair td{
        background-color: #ff00006b;
        color: #fff;
    }
.info {
    font-size: 16px;
    padding: 10px;
    background: #67a95b;
    color: #ebebeb;
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
    width: 12.5%;
}
</style>