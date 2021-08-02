<template>
  <div class="image-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
  <select-img :isUp='true' :isCol=true></select-img>
    </el-card>

  </div>
</template>

<script>
import selectImg from '@/components/select.vue'

export default {
  name: 'ImageIndex',
  components: {
    selectImg

  },
  props: {},
  data () {
    return {
      // isLoading: false,
      // iscol: false,
      // col: false,
      // imgList: [],
      // dialogTableVisible: false,
      // Authorization: null,
      // imgTotal: 0,

      // pageSize: 10,
      // page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    // const user = JSON.parse(window.localStorage.getItem('user'))
    // this.Authorization = {
    //   Authorization: `Bearer ${user}`
    // }

    // this.loadImg(1)
  },
  mounted () {},
  methods: {
    // changeImg (page) {
    //   this.loadImg(page)
    // },
    // loadSuccess () {
    //   console.log(1111)
    //   this.$message({
    //     message: '上传成功',
    //     type: 'success'
    //   })
    //   this.dialogTableVisible = false
    //   this.loadImg()
    // },
    // async loadImg (page = 1) {
    //   try {
    //     const { data } = await getImages({
    //       collect: this.col,
    //       per_page: this.pageSize,
    //       page: page
    //     })
    //     // this.imgList = data.data.results
    //     // this.imgList.forEach((item) => {
    //     //   // item.load = false
    //     //   this.$set(item, 'load', false)
    //     // })
    //     data.data.results.forEach(item => {
    //       item.load = false
    //     })
    //     this.imgList = data.data.results
    //     console.log(this.imgList)
    //     this.imgTotal = data.data.total_count
    //   } catch (error) {}
    // },
    // changeCol (img) {
    //   img.load = true
    //   // this.$set(img,'it')
    //   collecImages(img.id, !img.is_collected).then((res) => {
    //     if (res.status === 201) {
    //       this.loadImg(this.page)
    //     }
    //     img.load = false
    //   })
    // },
    // deleteImage (img) {
    //   img.item = true
    //   deleteImages(img.id).then((res) => {
    //     if (res.status === 204) {
    //       this.loadImg(this.page)
    //     }
    //     this.$message({
    //       message: '删除成功',
    //       type: 'success'
    //     })
    //     img.item = false
    //   })
    // }
  }
}
</script>

<style scoped lang="less"></style>
