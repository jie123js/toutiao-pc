
<template>
  <div class="settings-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-row>
        <el-col :span="15">
          <el-form ref="form" :model="user" label-width="70px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button

                type="primary"
                :loading="updateProfileLoading"
                @click="onUpdateUser"
              >保存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :offset="2" :span="4">

          <!-- <p @click="$refs.file.click()">点击修改头像</p> -->
          <label for="file" >
            <el-avatar
              shape="square"
              :size="150"
              fit="cover"
              :src="user.photo"
            ></el-avatar>
            <p>点击修改头像</p>
          </label>
          <input
            id="file"
            type="file"
            ref="file"
            hidden
            @change="onFileChange"
          >
        </el-col>
      </el-row>
    </el-card>

    <el-dialog
      title="修改头像"
      width="40%"
      :visible.sync="dialogVisible"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed"
    >
      <div class="preview-image-wrap" >
        <img
          class="preview-image"
          :src="previewImage"
          ref="preview-image"
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :loading="updatePhotoLoading"
          @click="onUpdatePhoto"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  loginData,
  updateUserPhoto,
  updateUserProfile
} from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'SettingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      }, // 用户资料
      dialogVisible: false, // 控制上传图片裁切预览的显示状态
      previewImage: '', // 预览图片
      cropper: null, // 裁切器示例
      updatePhotoLoading: false, // 更新用户头像 loading 状态
      updateProfileLoading: false // 更新基本信息的 loading 状态

    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {

    loadUser () {
      loginData().then(res => {
        this.user = res.data.data
      })
    },
    onUpdateUser () {
      const { name, intro, email } = this.user
      updateUserProfile({
        name,
        intro,
        email
      }).then(res => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '保存成功'
        })
        this.$bus.$emit('upuser', this.user)
      })
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      console.log(file)
      const blobimg = window.URL.createObjectURL(file)
      this.previewImage = blobimg
      this.dialogVisible = true
      // 解决选择相同文件不触发的问题
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // 图片裁切器必须基于 img 进行初始化
      // 注意：img 必须是可见状态才能正常完成初始化
      //       因为我们这里要在对话框里面初始化裁切器
      //       所以务必要在对话框完全打开的状态去进行初始化。
      // 获取图片 DOM 节点
      const image = this.$refs['preview-image']

      this.cropper = new Cropper(image, {
        viewMode: 1,
        dragMode: 'none',
        aspectRatio: 1,
        cropBoxResizable: false,
        crop (event) {
          // console.log(event.detail.x)
          // console.log(event.detail.y)
          // console.log(event.detail.width)
          // console.log(event.detail.height)
          // console.log(event.detail.rotate)
          // console.log(event.detail.scaleX)
          // console.log(event.detail.scaleY)
        }
      })
    },
    onDialogClosed () {
      // 对话框关闭，销毁裁切器,不然每次点击都是第一个
      this.cropper.destroy()
    },
    onUpdatePhoto () {
      this.cropper.getCroppedCanvas().toBlob((blob) => {
        // console.log(blob)
        this.updatePhotoLoading = true
        const fd = new FormData()
        fd.append('photo', blob)
        updateUserPhoto(fd).then((res) => {
          console.log(res)
          // 2种方法都可以,第二种快一点,因为是直接本地的数据,第一种是服务器的数据
          // this.user.photo = res.data.data.photo
          this.user.photo = window.URL.createObjectURL(blob)
          this.dialogVisible = false
          this.updatePhotoLoading = false
          // this.$bus.$emit('updata', this.user.photo)
          this.$message({
            type: 'success',
            message: '更新头像成功'
          })
        })
      })
    }

  }
}
</script>

<style scoped lang="less">
.preview-image-wrap {
  /* Ensure the size of the image fit the container perfectly */
  .preview-image {
    display: block;
    /* This rule is very important, please don't ignore this */
    max-width: 100%;
    height: 200px;
  }
}
</style>
