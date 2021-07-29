<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelsId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              v-for="item in channels"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="artTime"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList(1)" :disabled="loading"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 46147 条结果：
      </div>
      <!-- 数据列表 -->
      <!-- 数据列表 -->
      <!--
  Table 表格组件
  1、把需要展示的数组列表数据绑定给 table 组件的 data 属性
    注意：你不用去 v-for 遍历，它自己会遍历
  2、设计表格列 el-table-column
    width 可以设定表格列的宽度
    label 可以设定列的标题
    prop  用来设定要渲染的列表项数据字段，只能展示文本

  3、表格列默认只能渲染普通文本，如果需要展示其它内容，例如放个按钮啊、放个图片啊，那就需要自定义表格列模板了：https://element.eleme.cn/#/zh-CN/component/table#zi-ding-yi-lie-mo-ban
 -->
      <el-table
        v-loading="loading"
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column prop="date" label="封面">
          <template slot-scope="scope">
            <img
              class="cover-img"
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
              alt=""
            />
            <img class="cover-img" v-else src="./no-cover.jpg" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 0" type="warning">草稿</el-tag>
            <el-tag v-else-if="scope.row.status === 1">待审核</el-tag>
            <el-tag v-else-if="scope.row.status === 2" type="success"
              >审核通过</el-tag
            >
            <el-tag v-else-if="scope.row.status === 3" type="danger"
              >审核失败</el-tag
            >
            <el-tag v-else-if="scope.row.status === 4" type="info"
              >已删除</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到 template 里面 -->
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
              @click="$router.push({name:'publish',query:{id:scope.row.id}})"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteArt(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="artTotal"
        :page-size="perPage"
        :current-page.sync='page'
        @current-change="changePage"
        :disabled="loading"
      >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getChanel, deleteArticle } from '@/api/article.js'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
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
      perPage: 10,
      artTotal: 1000,
      pageSize: '',
      status: null,
      channels: [],
      channelsId: null,
      artTime: [],
      loading: true,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getList()
    this.getChannels()
  },
  mounted () {},
  methods: {
    async getList (page = 1) {
      this.loading = true
      try {
        const { data } = await getArticles({
          page,
          per_page: this.perPage,
          status: this.status,
          channel_id: this.channelsId,
          begin_pubdate: this.artTime ? this.artTime[0] : null,
          end_pubdate: this.artTime ? this.artTime[1] : null
        })
        // console.log(data)
        this.artTotal = data.data.total_count
        this.articles = data.data.results
        this.loading = false
      } catch (error) {
        this.loading = false
      }
    },
    onSubmit () {
      // console.log('submit!')
    },
    changePage (page) {
      // console.log(page)
      this.getList(page)
    },
    async getChannels () {
      const { data } = await getChanel()
      this.channels = data.data.channels
    },
    deleteArt (id) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteArticle(id.toString()).then((res) => {
            // console.log(res)
            this.getList(this.page)
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
.cover-img {
  width: 100px;
  background-image: ;
}
</style>
