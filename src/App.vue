<template>
    <Layout :style="{minHeight: '100vh', minWidth: '980px'}">
        <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
            <router-link
                class="link"
                to="/"
                :exact="$route.path !== '/'"
            >
                英雄計算
            </router-link>
            <router-link
                class="link"
                to="/FightData"
            >
                戰鬥數據
            </router-link>
             <router-link
                class="link"
                to="/FightData"
            >
                市場數據
            </router-link>
            <router-link
                class="link"
                to="/Market"
            >
                歡迎贊助
            </router-link>
            <a
                class="link"
                href="https://github.com/dkbo/bnbhero"
                target="_blank"
            >
                Github
            </a>
        </Sider>
        <Layout>
            <Header class="layout-header-bar">
                <h1 align="center">{{$route.meta.title}}</h1>

            </Header>
            <Content :style="{margin: '20px', background: '#fff'}">
                <router-view  />
            </Content>
        </Layout>
    </Layout>
</template>
<style lang="sass" scoped>
    .layout
        border: 1px solid #d7dde4
        background: #f5f7f9
        position: relative
        border-radius: 4px
        overflow: hidden

    .layout-header-bar
        background: #fff
        box-shadow: 0 1px 1px rgba(0,0,0,.1)

    .link
        display: block
        padding: 10px
        text-align: center
        color: #fff
        font-size: 1rem
        border-bottom: 2px solid #5b5e63
        &:hover, &.router-link-active
            background: #2db7f5
            border-color: #2db7f5
</style>
<script>
    export default {
        data () {
            return {
                isCollapsed: false
            }
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        }
    }
</script>