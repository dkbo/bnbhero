<template>
    <div class="flex" :class="rowClassName">
        <div v-for="data in columns2" :key="data.key+source.date">{{ source[data.key] }}</div>
    </div>
</template>

<script>
  export default {
      name: 'item-component',
      data() {
          return {
              columns: [
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

.flex {
  font-size: 16px;
  padding: 12px;
  display: flex;
  justify-content: space-around;
}
.fair {
    background-color: #ff00006b;
    color: #fff;
}
.others {
    background-color: #67a95b;
    color: #fff;
}
</style>