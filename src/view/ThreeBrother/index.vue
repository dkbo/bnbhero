<template>
    <div class="container">
    <Input  v-model="filterText" placeholder="篩選" />
    <Table
        stripe
        :columns="columns"
        :data="tableData"
        @on-row-click="copyAns"
    />
  </div>
</template>
<script>
import threeBrotherData from '@UTIL/threeBrotherData'
export default {
    name: 'Home',
    data() {
        return {
            filterText: '',
            columns: [
                {
                    title: '問題',
                    key: 'question'
                },
                {
                    title: '答案',
                    key: 'ans'
                }
            ]
        }
    },
    methods: {
        copyAns({ans}) {
            const clipArea = document.createElement('textarea')
            clipArea.textContent = ans
            document.body.appendChild(clipArea)
            clipArea.select()
            document.execCommand('copy')
            clipArea.remove()
            this.$Message.info({
                render: h => <div>複製: {ans}</div>
            })
        }
    },
    computed: {
        tableData() {
            if (this.filterText) {
                return threeBrotherData.filter(({question}) => question.includes(this.filterText))
            }
            return threeBrotherData
        }
    }
}
</script>
<style scoped>
</style>
