<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form ref="form" :model="article" label-width="51px" :rules="rules">
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
       <el-tiptap v-model="article.content" :extensions="extensions" height="250px" lang="zh"></el-tiptap>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(false)">发表</el-button>
          <el-button @click="onSubmit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image.js'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import {
  getChanel,
  addArticle,
  getArticle,
  updateArticle
} from '@/api/article.js'
export default {
  name: 'PublishIndex',
  components: {
    'el-tiptap': ElementTiptap
  },
  props: {},
  data () {
    return {
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest: (file) => {
            const fs = new FormData()
            fs.append('image', file)
            return uploadImage(fs).then((res) => {
              return res.data.data.url
            })
          }
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock()
      ],
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题名称', trigger: 'blur' },
          {
            min: 5,
            max: 10,
            message: '长度在 5 到 10 个字符',
            trigger: 'blur'
          }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择频道', trigger: 'change' }
        ]
      },
      article: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 封面图片的地址
        },
        channel_id: null
      },
      channels: null
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getChanel()
    // console.log(this.$route)
    if (this.$route.query.id) {
      this.getArticles(this.$route.query.id)
    }
  },
  mounted () {},
  methods: {
    async onSubmit (draft) {
      this.$refs.form.validate(async (valid) => {
        console.log(valid)
        if (valid) {
          if (this.$route.query.id) {
            const { data } = await updateArticle(
              this.$route.query.id,
              this.article,
              draft
            )
            if (data.message === 'OK') {
              if (draft) {
                this.$message({
                  message: '存入草稿成功',
                  type: 'success'
                })
                this.$router.push({ name: 'article' })
                return
              }
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$router.push({ name: 'article' })
            }
          } else {
            const { data } = await addArticle(this.article, draft)
            if (data.message === 'OK') {
              if (draft) {
                this.$message({
                  message: '存入草稿成功',
                  type: 'success'
                })
                this.$router.push({ name: 'article' })
                return
              }
              this.$message({
                message: '发布成功',
                type: 'success'
              })
              this.$router.push({ name: 'article' })
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async getChanel () {
      const { data } = await getChanel()
      this.channels = data.data.channels
    },
    async getArticles (id) {
      const { data } = await getArticle(id)
      this.article = data.data
    }
  }
}
</script>

<style scoped lang="less"></style>
