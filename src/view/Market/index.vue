<template>
    <div class="container">
        <Row>
            <Col span="4">
                <Input v-model="filterHero" clearable placeholder="英雄" />
            </Col>
            <Col span="4">
                <Select v-model="filterClass" placeholder="職業">
                    <Option v-for="item in classObj" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </Col>
            <Col span="4">
                <Select v-model="filterType" placeholder="稀有度">
                    <Option v-for="item in typeObj" :value="item" :key="item">{{ item }}</Option>
                </Select>
            </Col>
             <Col span="4">
                <Input v-model="filterMoney" clearable placeholder="價格小於" />
            </Col>
            <Col span="8">
                <Button
                        :loading="isLoading"
                        type="success"
                        long
                        icon="ios-search"
                        @click="getCharactersForPage()"
                    >
                        計算
                    </Button>
            </Col>
        </Row>
        <Page :total="listings" :page-size="pageLimit" show-sizer :page-size-opts="[10, 20, 50, 200, 400]" @on-change="getCharactersForPage" @on-page-size-change="handlePageLimit" prev-text="Previous" next-text="Next" />

        <Table :columns="columns" :data="tableData"  />
    </div>
</template>
<script>
import Web3 from 'web3'
import abi from '@UTIL/abi'
import { setStorage, getStorage, b64EncodeUnicode, b64DecodeUnicode } from '@UTIL'
export default {
    name: 'Market',
    data() {
        return {
            contract: '0x5CFFca0321b83dc873Bd2439aE7fEA10aE163fac',
            contractData: undefined,
            filterHero: getStorage('filterHero') || '',
            filterMoney: getStorage('filterMoney') || '',
            filterClass: getStorage('filterClass') || '',
            filterType: getStorage('filterType') || '',
            pageLimit: getStorage('pageLimit') || 200,
            listings: 0,
            pages: 1,
            columns: [
                {
                    title: '編號 No.',
                    key: 'tokenId'
                },
                {
                    title: '官方頁數 Page',
                    key: 'page'
                },
                {
                    title: '名字 Name',
                    key: 'name'
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
                    title: '等級 Level',
                    key: 'level'
                },
                {
                    title: '經驗 EXP',
                    key: 'xp'
                },
                {
                    title: '價錢 Price',
                    key: 'price'
                }
            ],
            data: [],
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
            isLoading: true
        }
    },
    async beforeMount() {
        const Web3 = await this.getWeb3()
        this.contractData = await new Web3.eth.Contract(abi, this.contract)
        // console.log(this.contractData)
        // console.log('getCharacterDataById', this.contractData.methods.characters().call().then(console.log))
        this.getCharactersForPage(1)
        // v.c.methods.getCharactersForPage(Ae, e).call().then((function(e)
    },
    methods: {
        async getCharactersForPage(pages = this.pages) {
            this.pages = pages
            this.isLoading = true
            try {
                this.listings = await this.contractData.methods.getNumberOfCharacterListings().call()
                this.listings = +this.listings
                const markData = await this.contractData.methods.getCharactersForPage(+this.pageLimit, pages - 1).call()
                this.handleMarkData(markData)
                this.isLoading = false
            } catch (err) {
                this.data = []
                this.isLoading = false
            }
        },
        handlePageLimit(pageLimit) {
            this.pageLimit = pageLimit
            this.getCharactersForPage(1)
        },
        // transfer() {
        //     let value = web3.util.toWei(1, 'bnb');
        //     var message =
        // },
        getWeb3() {
            return new Promise(async (resolve, reject) => {
                const web3 = new Web3(window.ethereum)
                try {
                    // await window.ethereum.enable()
                    resolve(web3)
                } catch (err) {
                    reject(err)
                }
            })
        },
        handleMarkData(data) {
            this.data = data.map((obj, i) => {
                let obj2 = {...obj}
                obj2.price = (obj2.price / 1000000000000000000).toFixed(3)
                obj2.priceText = obj2.price + ' BNB'
                obj2.heroType = this.typeObj[obj2.heroType]
                obj2.heroClass = this.classObj[obj2.heroClass]
                const index = (this.pages - 1) * this.pageLimit + i + 1
                obj2.page = Math.ceil(index / 12)
                return obj2
            })
            setStorage('filterHero', this.filterHero)
            setStorage('filterMoney', this.filterMoney)
            setStorage('filterClass', this.filterClass)
            setStorage('filterType', this.filterType)
            setStorage('pageLimit', this.pageLimit)
        }

    },
    // armor: "310"
    // attack: "610"
    // heroClass: "2"
    // heroType: "1"
    // hp: "728"
    // level: "2"
    // name: "10"
    // price: "440000000000000000"
    // seller: "0x0107A72B078Fe548876Bb70F9b1b3fA7e81C7677"
    // speed: "610"
    // tokenId: "92041"
    // xp: "2200"
    computed: {
        tableData() {
            if (this.filterHero || this.filterMoney || this.filterClass || this.filterType) {
                return this.data.filter(({name, heroClass, heroType, price}) => {
                    return (name.includes(this.filterHero) || !this.filterHero) &&
                    (heroClass.includes(this.filterClass) || !this.filterClass) &&
                    (+this.filterMoney > +price || !this.filterMoney) &&
                    (heroType.includes(this.filterType) || !this.filterType)
                })
            }
            return this.data
        }
    }
}
</script>
<style scoped>
.info {
    height: 100%;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>