<template>
  <div class="login-container">
    <!--
      el-form 表单组件
      每个表单项都必须使用 el-form-item 组件包裹
     -->

    <div class="login-form-wrap">
      <div class="login-head">
        <div class="logo"></div>
      </div>
      <el-form class="login-form" ref="login-form" :model="user" :rules='rulesForm'>
        <el-form-item prop='mobile'>
          <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop='code'>
          <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop='agree'>
          <el-checkbox v-model="user.agree"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="onSubmit" :loading="isLoading"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>

  </div>
</template>

<script>

import { login } from '@/api/user'
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请勾选'))
      } else {
        callback()
      }
    }
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810', // 验证码
        agree: false// 是否同意协议的选中状态
      },
      checked: false, // 是否同意协议的选中状态
      isLoading: false,
      rulesForm: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[1|3|5|7|8|9]\d{9}$/, message: '请输入正确的手机格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '验证码位数是6位', trigger: 'blur' }
        ],
        // 自定义验证规则
        agree: [
          {
            validator: validatePass,
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async  login () {
      // 开启登陆中 loading...
      this.loginLoading = true

      try {
        const { data } = await login(this.user)
        // console.log(data)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.loginLoading = false
        window.localStorage.setItem('user', JSON.stringify(data.data.token))
        this.$router.push({ name: 'home' })
      } catch (error) {
        this.$message.error('登录失败，手机号或验证码错误')
        this.loginLoading = false
      }
      // request({
      //   method: 'POST',
      //   url: '/mp/v1_0/authorizations',
      //   // data 用来设置 POST 请求体
      //   data: this.user
      // }).then(res => {
      //   console.log(res)

      //   // 登录成功
      //   this.$message({
      //     message: '登录成功',
      //     type: 'success'
      //   })

      // 关闭 loading
      //   this.loginLoading = false
      // }).catch(err => { // 登录失败
      //   console.log('登录失败', err)
      //   this.$message.error('登录失败，手机号或验证码错误')

      // 关闭 loading

      // })
    },
    onSubmit () {
      // 获取表单数据（根据接口要求绑定数据）
      // const user = this.user

      // 表单验证
      // validate 方法是异步的
      this.$refs['login-form'].validate(valid => {
        // 如果表单验证失败，停止请求提交
        if (!valid) {
          return
        }

        // 验证通过，请求登录
        this.login()
      })
    }
  }
}
</script>

<style scoped lang="less">
  .login-container {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: url('./t0187cbd852119cfd2b.jpg') no-repeat;
    background-size: cover;
    .login-form-wrap {
      min-width: 300px;
      padding: 30px 50px 10px;
      background-color: #fff;
      .login-head {
        display: flex;
        justify-content: center;
        .logo {
          width: 64px;
          height: 57px;
          background: url('../../assets/logo.png') no-repeat;
          background-size: contain;
        }
      }
      .login-form {
        .login-btn {
          width: 100%;
        }
      }
    }
  }
</style>
