<template>
  <div class="header-container">
    <div>
      <i
        @click="change"
        v-bind:class="{
          'el-icon-s-fold':!isCollapse,
          'el-icon-s-unfold':isCollapse
         } "
      ></i>
      <span>啊杰有限公司</span>
    </div>
    <el-dropdown>
      <div class="avatar-wrap">
        <img
          class="avatar"
          src="https://img2.baidu.com/it/u=676154522,3786938767&fm=11&fmt=auto&gp=0.jpg"
          alt=""
        />
        <span>用户昵称</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>设置</el-dropdown-item>
        <el-dropdown-item @click.native="outHome()">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { loginData } from '@/api/user'
export default {
  name: 'AppHeader',
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
  created () {
    this.getData()
  },
  mounted () {},
  methods: {
    async getData () {
      try {
        const result = await loginData()
        console.log(result)
      } catch (error) {}
    },
    change () {
      this.$emit('changeCollapse')
    },
    outHome () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 把用户的登录状态清除
        window.localStorage.removeItem('user')

        // 跳转到登录页面
        this.$router.push({ name: 'login' })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.header-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
</style>
