<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>评论管理</span>
      </div>
      <el-table :data="articles" style="width: 100%" border>
        <el-table-column prop="title" label="标题" width="180" align="center">
        </el-table-column>
        <el-table-column
          prop="total_comment_count"
          label="总评论数"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="fans_comment_count"
          label="粉丝评论数据"
          align="center"
        >
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>{{ scope.row.comment_status ? "开启" : "关闭" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <!-- 开关组件绑定的数据是一个布尔值，它会根据布尔值的真假来决定开关状态 -->
            <el-switch
              :disabled="scope.row.load"
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change='changeStatus(scope.row)'
            >
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
          <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="artTotal">
    </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, updateStatus } from '@/api/article'
export default {
  // 组件的 name 最好起名为两个单词，尽量少用一个单词
  // 为什么？为了避免和原生的 html 标签冲突
  name: 'CommentIndex',
  components: {},
  props: {},
  data () {
    return {
      articles: [], // 文章列表（文章的评论数据字段）
      pageSize: 10,
      page: 1,
      artTotal: 0
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  methods: {
    handleSizeChange (pagesize) {
      // console.log(pagesize)
      this.pageSize = pagesize
      this.loadArticles()
      // this.loadArticles()
    },
    handleCurrentChange (page) {
      this.loadArticles(page)
    },
    loadArticles (page = 1) {
      this.page = page
      getArticles({ response_type: 'comment', page, per_page: this.pageSize }).then((res) => {
        // console.log(res)
        res.data.data.results.forEach((item) => {
          item.load = false
        })
        this.articles = res.data.data.results
        this.artTotal = res.data.data.total_count
        // console.log(this.articles)
      })
    },
    changeStatus (data) {
      // 这里是为了把被Bignumber处理的ID转换成正常的
      updateStatus({ article_id: data.id.toString() }, { allow_comment: data.comment_status }).then(res => {
        if (res.status === 201) {
          this.$message({
            type: 'success',
            message: `${data.comment_status ? '启用' : '关闭'}成功`
          })
        }
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    }
  }
}
</script>

<style scoped></style>
