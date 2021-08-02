<template>
  <div>
    <div
      style="
        padding-bottom: 20px;
        display: flex;
        justify-content: space-between;
      "
    >
      <el-radio-group v-model="col" size="mini" @change="loadImg()">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>

      <el-button type="success" @click="dialogTableVisible = true" v-if="isUp"
        >上传素材</el-button
      >
    </div>
    <!-- 素材列表 -->
    <el-row :gutter="10">
      <el-col
        v-for="(item, index) in imgList"
        :key="item.id"
        :xs="12"
        :sm="6"
        :md="6"
        :lg="4"
        style="position: relative"
        @click.native="selinx = index"
      >
        <el-image style="height: 100px" :src="item.url" fit="cover"></el-image>
        <div class="isSel" v-if="isSelect && selinx === index"></div>
        <div
          v-if="isCol"
          style="
            background: rgb(204, 204, 204, 0.5);
            position: absolute;
            bottom: 0;
            left: 5px;
            right: 5px;
            display: flex;
            justify-content: space-evenly;
          "
        >
          <el-button
            size="small"
            type="warning"
            circle=""
            :class="{
              'el-icon-star-on': item.is_collected,
              'el-icon-star-off': !item.is_collected,
            }"
            :disabled="item.load"
            @click="changeCol(item)"
          ></el-button>
          <el-button
            @click="deleteImage(item)"
            size="small"
            type="danger"
            class="el-icon-delete"
            circle=""
            :disabled="item.load"
          ></el-button>
        </div>
      </el-col>
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="imgTotal"
      :page-size="pageSize"
      :current-page.sync="page"
      @current-change="changeImg"
    >
    </el-pagination>
    <!-- /素材列表 -->

    <el-dialog
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
      width="30%"
      center
    >
      <el-upload
        class="upload-demo"
        drag
        name="image"
        :headers="Authorization"
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        multiple
        :show-file-list="false"
        :on-success="loadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collecImages, deleteImages } from '@/api/image.js'
export default {
  name: 'ImageIndex',
  components: {},
  props: {
    isUp: {
      type: Boolean,
      default: false
    },
    isCol: {
      type: Boolean,
      default: false
    },
    isSelect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isLoading: false,
      iscol: false,
      col: false,
      imgList: [],
      dialogTableVisible: false,
      Authorization: null,
      imgTotal: 0,

      pageSize: 10,
      page: 1,
      selinx: null
    }
  },
  computed: {},
  watch: {},
  created () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    this.Authorization = {
      Authorization: `Bearer ${user}`
    }

    this.loadImg(1)
  },
  mounted () {},
  methods: {
    changeImg (page) {
      this.loadImg(page)
    },
    loadSuccess () {
      console.log(1111)
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.dialogTableVisible = false
      this.loadImg()
    },
    async loadImg (page = 1) {
      try {
        const { data } = await getImages({
          collect: this.col,
          per_page: this.pageSize,
          page: page
        })
        // this.imgList = data.data.results
        // this.imgList.forEach((item) => {
        //   // item.load = false
        //   this.$set(item, 'load', false)
        // })
        data.data.results.forEach((item) => {
          item.load = false
        })
        this.imgList = data.data.results
        console.log(this.imgList)
        this.imgTotal = data.data.total_count
      } catch (error) {}
    },
    changeCol (img) {
      img.load = true
      // this.$set(img,'it')
      collecImages(img.id, !img.is_collected).then((res) => {
        if (res.status === 201) {
          this.loadImg(this.page)
        }
        img.load = false
      })
    },
    deleteImage (img) {
      img.item = true
      deleteImages(img.id).then((res) => {
        if (res.status === 204) {
          this.loadImg(this.page)
        }
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        img.item = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.isSel {
  background: url("./gougou.jpeg") no-repeat;
  background-size: cover;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  opacity: 0.8;
}
</style>
