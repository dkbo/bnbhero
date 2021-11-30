<template>
    <div class="flex">
        <div v-for="data in columns" class="center" :class="data.classFn && data.classFn(source)" :key="data.key+source.date">{{ source[data.key] }}</div>
    </div>
</template>

<script>
  export default {
      name: 'item-component',
      data() {
          return {
              typeObjClass: {
                  1: '',
                  2: 'green',
                  3: 'blue',
                  4: 'purple',
                  5: 'orange'
              },
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
                      key: 'heroTypeName',
                      classFn: ({heroType}) => this.typeObjClass[heroType] + ' type'
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
                      key: 'price',
                      classFn: () => 'right'
                  }
              ]
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
.center {
    text-align: center;
}
.right {
    text-align: right;
}
.type {
    font-weight: bold;
}
.green {
    background: #6ea40f;
    color: white;
}
.blue {
    background: #2b83b5;
    color: white;
}
.purple {
    background: #bb55be;
    color: white;
}
.orange {
    background: #d97701;
    color: white;
}

</style>