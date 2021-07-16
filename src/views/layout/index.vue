<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
        <aside-menu class="aside-menu" :isCollapse="isCollapse"></aside-menu>
    </el-aside>
    <el-container>
      <el-header class="header" ><header-top @changeCollapse=changeMyCollapse :isCollapse="isCollapse"></header-top></el-header>
      <el-main class="main">
        <!-- 子路由出口 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideMenu from './components/aside.vue'
import HeaderTop from './components/header.vue'
export default {
  name: 'loginIndex',
  data () {
    return {
      isCollapse: false
    }
  },
  components: {
    AsideMenu,
    HeaderTop
  },
  methods: {
    changeMyCollapse () {
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
}
.aside-menu{
    height: 100%;
}
</style>
