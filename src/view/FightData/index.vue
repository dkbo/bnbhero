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

        <Table :row-class-name="rowClassName" :columns="columns" :data="tableData" @on-row-click="handleRowClick" />
    </div>
</template>
<script>
import { setStorage, getStorage, b64EncodeUnicode, b64DecodeUnicode } from '@UTIL'
import axios from 'axios'
import enemies from '@UTIL/enemies.js'
import dayjs from 'dayjs'
export default {
    name: 'FightData',
    data() {
        return {
            api: 'https://graphql.bitquery.io',
            walletAddress: getStorage('walletAddress') || '',
            dataAddress: '0xde9fFb228C1789FEf3F08014498F2b16c57db855',
            filterHero: '',
            filterEnemyType: '',
            network: 'bsc',
            eventType: 'Fight',
            startDate: null,
            endDate: null,
            columns: [
                {
                    title: '英雄',
                    key: '_attackingHero'
                },
                {
                    title: '敵人',
                    key: 'enemyType'
                },
                {
                    title: '獎勵',
                    key: 'rewards'
                },
                {
                    title: '經驗值',
                    key: 'xpGained'
                },
                {
                    title: '損血',
                    key: 'hpLoss'
                },
                {
                    title: '時間',
                    key: 'date'
                }
            ],
            data: [],
            isLoading: false
        }
    },
    beforeMount() {
        this.walletAddress && this.handleCalc()
    },
    methods: {
        async handleCalc() {
            this.isLoading = true
            const count = await this.fetchGetCount()
            await this.fetchGetFightData(count)
            this.isLoading = false
        },
        fetchGetCount() {
            return axios
                .post(this.api, {
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
                    console.error(err, '查詢戰鬥數據失敗')
                    return -1
                })
        },
        fetchGetFightData(limit) {
            return axios
                .post(this.api, {
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
                })
                .then(this.handleFightData)
                .catch((err) => {
                    console.error(err, '查詢戰鬥數據失敗')
                    return []
                })
        },
        handleFightData({data: {data: {ethereum: {smartContractEvents}}}}) {
            const calcData = (argument, value) => {
                switch (argument) {
                    case 'enemyType':
                        return enemies[value].name
                    case 'rewards':
                        return value / 1000000000000000000
                    default:
                        return value
                }
            }
            this.data = smartContractEvents.map(({arguments: attr, block}) => {
                let obj = {}
                attr.slice(1, 7).forEach(({argument, value}) => (obj[argument] = calcData(argument, value)))
                const date = dayjs.unix(block.timestamp.unixtime)
                obj.timestamp = date.valueOf()
                obj.date = date.format('YYYY/MM/DD HH:mm:ss')
                return obj
            })
            setStorage('walletAddress', this.walletAddress)
        },
        rowClassName(row) {
            return !row.rewards ? 'table-fair' : ''
        },
        handleRowClick(data) {
            console.log(data)
            this.filterHero = data._attackingHero
            this.filterEnemyType = data.enemyType
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
</style>