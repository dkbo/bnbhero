<template>
    <div class="flex" :class="rowClassName">
        <div v-for="data in columns" @click="handleRowClick" :key="data.key+source.date">{{ source[data.key] }}</div>
    </div>
</template>

<script>
  export default {
      name: 'item-component',
      data() {
          return {
              columns: [
                  {
                      title: '英雄 Hero',
                      key: '_heroId'
                  },
                  //   {
                  //       title: '職業 Class',
                  //       key: 'heroClass'
                  //   },
                  //   {
                  //       title: '稀有度 Type',
                  //       key: 'heroType'
                  //   },
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
              rowClassName: !this.source.rewards
                  ? this.source.hpLoss
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
.flex div {
    width: 12.5%;
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