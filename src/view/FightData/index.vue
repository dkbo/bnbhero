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
            </Col>
            <Col span="24" class="info2">
                已領取(BNB): {{aleadyClaim.toFixed(4)}}
                獎金(BNB): {{totalRewards.toFixed(4)}}
                瓦斯費(BNB): {{successGas.toFixed(4)}}
                失敗瓦斯費(BNB)(只篩選日期時間): {{fairGas.toFixed(4)}}

            </Col>
        </Row>
        <div class="flex">
            <div v-for="data in columns" :key="data.key">{{ data.title }}</div>
        </div>
        <VirtualList
            style="height: calc(100vh - 258px); overflow-y: auto;"
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
            bnbContract: '0xde8c58d082d39d04dc2e5241a3a65911454674cd',
            contractData: undefined,
            filterHero: '',
            filterEnemyType: '',
            network: 'bsc',
            eventType: 'Fight',
            startDate: null,
            endDate: null,
            aleadyClaim: 0,
            data: [],
            columns: [
                {
                    title: '英雄 Hero',
                    key: '_heroId'
                },
                // {
                //     title: '職業 Class',
                //     key: 'heroClass'
                // },
                // {
                //     title: '稀有度 Type',
                //     key: 'heroType'
                // },
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
                    title: '燃料費 Gas',
                    key: 'gasValue'
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
            successTrs: [],
            fairTrs: [],
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
            // const count = await this.fetchGetCount()
            await this.fetchGetFightData()
            this.aleadyClaim = await this.fetchGetBnbClaim()
            this.isLoading = false
        },

        fetchGetBnbClaim() {
            return axios({
                method: 'post',
                url: this.api,
                headers: {
                    'X-API-KEY': 'BQYvhnv04csZHaprIBZNwtpRiDIwEIW9'
                },
                data: {
                    query: `
                    query ($network: EthereumNetwork!, $sender: String!, $receiver: String!) {
  ethereum(network: $network) {
    transfers(sender: {is: $sender}, receiver: {is: $receiver}) {
      amount(amount: {}, calculate: sum)
      currency {
        symbol
      }
    }
  }
}`,
                    variables: {
                        network: this.network,
                        sender: this.bnbContract,
                        receiver: this.walletAddress
                    }
                }
            })
                .then(
                    ({
                        data: {
                            data: {
                                ethereum: { transfers }
                            }
                        }
                    }) => transfers[0].amount
                )
                .catch((err) => {
                    const message = '查詢領取BNB數據失敗'
                    this.$Message.error(message)
                    console.error(err, message)
                    return 0
                })
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
        fetchGetFightData() {
            return axios({
                method: 'post',
                url: this.api,
                headers: {
                    'X-API-KEY': 'BQYvhnv04csZHaprIBZNwtpRiDIwEIW9'
                },
                data: {
                    query: `
                    query ($network: EthereumNetwork!, $bnbHeroAddress: String!, $limit: Int!, $offset: Int!, $startDate: ISO8601DateTime, $endDate: ISO8601DateTime, $txFrom: [String!]) {
                        ethereum(network: $network) {
                            transactions(
                            txSender: {in: $txFrom}
                            txTo: {is: $bnbHeroAddress}
                            options: {desc: "block.height", limit: $limit, offset: $offset}
                            ) {
                            block {
                                height
                                timestamp {
                                unixtime
                                }
                            }
                            gasValue
                            success
                            }
                            smartContractEvents(
                            options: {desc: "block.height", limit: $limit, offset: $offset}
                            txFrom: {in: $txFrom}
                            smartContractAddress: {is: $bnbHeroAddress}
                            date: {since: $startDate, till: $endDate}
                            ) {
                            block {
                                height
                                timestamp {
                                unixtime
                                }
                            }
                            arguments {
                                value
                                argument
                            }
                            }
                        }
                        }
                    `,
                    variables: {
                        network: this.network,
                        bnbHeroAddress: this.dataAddress,
                        offset: 0,
                        limit: 100000,
                        startDate: null,
                        endDate: null,
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
        async handleFightData({data: {data: {ethereum: {smartContractEvents, transactions}}}}) {
            this.handleTransactions(transactions)
            this.handleEventsData(smartContractEvents)
            setStorage('walletAddress', this.walletAddress)
        },
        handleEventsData(smartContractEvents) {
            const calcData = (argument, value, obj) => {
                switch (argument) {
                    case 'townType':
                        obj.enemyType = `Town ${value} Level up`
                        return value
                    case 'level':
                        !obj.enemyType && (obj.enemyType = `Unlocked Level ${value}`)
                        return value
                    case '_attackingHero':
                    case 'heroId':
                        obj._heroId = value
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
            // 0: {value: "29390", argument: "_heroId"}
            // 1: {value: "0x2d96a2c38e66d7c6837c97096c1ff8d2bc4cab05", argument: "player"}
            // 2: {value: "29390", argument: "_heroId"}
            // 3: {value: "11", argument: "level"}
            this.heroObj = {}
            const data = smartContractEvents.map(({arguments: attr, block}, index) => {
                let obj = {}
                attr.forEach(({argument, value}) => (obj[argument] = calcData(argument, value, obj)))
                const date = dayjs.unix(block.timestamp.unixtime)
                obj.timestamp = date.valueOf()
                obj.date = date.format('YYYY/MM/DD HH:mm:ss')
                obj.gasValue = this.successTrs[index].gasValue
                if (!obj.enemyType) {
                    obj.enemyType = 'Others'
                }
                return obj
            })
            // 取得英雄資料
            // const arr = await this.contractData.methods.getCharacterDataByIds(Object.keys(this.heroObj)).call()
            // arr.forEach(obj => {
            //     const obj2 = {...obj}
            //     obj2.heroType = this.typeObj[obj2.heroType]
            //     obj2.heroClass = this.classObj[obj2.heroClass]
            //     this.heroObj[obj.tokenId] = {...obj2}
            // })
            // this.data = data.map(data => ({...data, ...this.heroObj[data._attackingHero]}))
            this.data = data
        },
        handleTransactions(transactions) {
            this.successTrs = []
            this.fairTrs = []
            transactions.forEach(data => data.success ? this.successTrs.push(data) : this.fairTrs.push(data))
        },
        handleChangeDate([startDate, endDate]) {
            this.startDate = startDate
            this.endDate = endDate.replace('00:00', '23:59')
        }
    },
    computed: {
        tableData() {
            if (this.filterHero || this.filterEnemyType || this.endDate || this.startDate) {
                const data = this.data.filter(({_heroId = '', enemyType}) => {
                    return (_heroId.includes(this.filterHero) || !this.filterHero) &&
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
        fairGasData() {
            if (this.endDate || this.startDate) {
                const startDate = dayjs(this.startDate)
                const endDate = dayjs(this.endDate)
                return this.fairTrs.filter(({block}) => {
                    const timestamp = dayjs.unix(block.timestamp.unixtime)
                    return startDate <= timestamp && timestamp <= endDate
                })
            }
            return this.fairTrs
        },
        fightCount() {
            return this.tableData.filter(({hpLoss}) => hpLoss).length
        },
        fightSuccess() {
            return this.tableData.filter(({rewards}) => rewards).length
        },
        fightFair() {
            return this.fightCount - this.fightSuccess
        },
        totalRewards() {
            return this.tableData.reduce((value, {rewards = 0}) => value + rewards, 0)
        },
        successGas() {
            return this.tableData.reduce((value, {gasValue = 0}) => value + gasValue, 0)
        },
        fairGas() {
            return this.fairGasData.reduce((value, {gasValue = 0}) => value + gasValue, 0)
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
    width: 12.5%;
}
</style>