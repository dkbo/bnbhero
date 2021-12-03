<template>
    <div class="row" :class="rowClassName">
        <div class="flex" >
            <div v-for="data in columns" :key="data.key+source.date">{{ source[data.key] }}</div>
        </div>
        <div class="log">{{source.log}}</div>
    </div>
</template>

<script>
  export default {
      name: 'item-component',
      data() {
          return {
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
              rowClassName: !this.source.isSuccess
                  ? this.source.hploss
                      ? 'fair'
                      : 'others'
                  : ''
          }
      },
      props: {
          index: { // index of current item
              type: Number
          },
          source: { // here is: {uid: 'unique_1', text: 'abc'}
              type: Object,
              default () {
                  return {}
              }
          }
      },
      methods: {
          handleRowClick() {
              this.$parent.$parent.$parent.filterHero = this.source._heroId
              this.$parent.$parent.$parent.filterEnemyType = this.source.enemyType
          }
      }
  }
</script>

<style scoped>
.row {
    /* margin-bottom: 20px; */
}
.flex {
    font-size: 16px;
    padding: 12px;
    display: flex;
    justify-content: space-around;
}
.log {
    font-size: 16px;
    padding: 12px;
    background-color: #67a95b;
    color: #fff;
}
.flex div {
    width: 16.666%;
}
.fair .log{
    background-color: #ff00006b;
    color: #fff;
}
.others .log{
    background-color: #5378b1;
    color: #fff;
}
</style>