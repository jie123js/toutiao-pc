<template>
  <!--
    el-menu-item 的 index 不能重复，确保唯一即可
   -->
  <el-menu
    class="nav-menu"
    :default-active="$route.path"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse"
  >
    <div
      v-bind:class="{
      maxW:!isCollapse,
      minW:isCollapse
      }"
    >
      <img
        src="https://img0.baidu.com/it/u=2914791792,3491814355&fm=26&fmt=auto&gp=0.jpg"
        alt=""
        style="width: 100%"
      />
    </div>
    <el-menu-item index="/">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-changeyihao"></use>
      </svg>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-dongfang-kyunzaihuojian"></use>
      </svg>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-UFO"></use>
      </svg>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diqiu"></use>
      </svg>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-heidong"></use>
      </svg>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liuxing"></use>
      </svg>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-diqiuren"></use>
      </svg>

      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AppAside',
  components: {},
  props: {
    isCollapse: {
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.nav-menu {
  .icon {
    margin-right: 15px;
    padding-left: 5px;
  }
}
.maxW {
  width: 200px;
}
.minW {
  width: 65px;
}
</style>
