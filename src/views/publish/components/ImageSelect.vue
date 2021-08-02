<template>
  <div>
    <div @click="dialogVisible=true">
        <div class="img-box"><img :src="value" alt="" ref='imgbox' style="width: 100%;"></div>

    </div>
    <el-dialog
    :append-to-body=true
      title="选择图片"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-tabs v-model="activeName" >
    <el-tab-pane label="图片选择" name="first"><select-img :isSelect=true ref="imgUP"></select-img></el-tab-pane>
    <el-tab-pane label="上传图片" name="second">

        <input type="file" ref="imgfile" @change="selectImg" />
        <img ref='preimg' width='100'>

    </el-tab-pane>

  </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
import selectImg from '@/components/select.vue'

export default {
  name: 'ImageSelect',
  // props: ['newimg'],
  props: ['value'],
  components: {
    selectImg

  },
  data () {
    return {
      imgData: '',
      dialogVisible: false,
      activeName: 'first'
    }
  },
  created () {

  },
  methods: {
    submit () {
      if (this.activeName === 'second') {
        const fs = this.$refs.imgfile.files[0]
        // console.log(fs)

        const fd = new FormData()
        fd.append('image', fs)
        uploadImage(fd).then((res) => {
          console.log(res)
          this.$refs.imgbox.src = res.data.data.url
          this.$emit('input', res.data.data.url)
        })
      }
      if (this.activeName === 'first') {
        console.log(11)
        const index = this.$refs.imgUP.selinx
        console.log(index)
        const data = this.$refs.imgUP.imgList[index]
        console.log(data)
        // this.$refs.imgbox.src = data.url
        this.$emit('input', data.url)
      }
      this.dialogVisible = false
    },
    handleClose () {},
    selectImg () {
      const fs = this.$refs.imgfile.files[0]
      const blob = window.URL.createObjectURL(fs)
      this.$refs.preimg.src = blob
    }
  }
}
</script>

<style lang="less" scoped>
.img-box {
  width: 150px;
  height: 150px;
  border: 1px solid lightblue;
}

</style>
