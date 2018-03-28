<template>
  <div class='export-container'>
    <span class='explain-text'>说明：导出任务文件最多保留30天，过期请重新导出</span>
    <el-table :data="exportList" style='width: 100%' :fit='true'>
      <el-table-column prop="id" label="任务ID"></el-table-column>
      <el-table-column prop="task_name" label="任务名称"></el-table-column>
      <el-table-column label="任务创建时间">
        <template slot-scope='scope'>
          <span>{{ stampToDate(scope.row.create_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任务完成时间">
        <template slot-scope='scope'>
          <span v-if='scope.row.status === 1 || scope.row.status === 5'>{{ stampToDate(scope.row.update_time) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="当前状态">
        <template slot-scope='scope'>
          <span>{{ scope.row.status === 1 ? '已完成' : scope.row.status === 2 ? '排队中' : scope.row.status === 3 ? '任务失败' : scope.row.status === 4 ? '正在生成文件' : '文件过期' }}</span>
          <span v-if='scope.row.status === 2'>(已有{{ scope.row.numberOfQueues }}个任务排队中)</span>
        </template>
      </el-table-column>
      <el-table-column prop="user_name" label="操作人"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope='scope'>
          <a class='el-button--text' :href="scope.row.url" v-if='scope.row.status === 1 || scope.row.status === 5' :class='{unDownLoad: scope.row.status === 5}'>下载</a>
          <span v-if='scope.row.status === 3'>失败原因：{{ scope.row.err_msg }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class='page-box'>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<style lang='scss' scoped>
  .export-container {
    padding: 20px 30px;
    background-color: #fff;
    .explain-text {
      color: #999;
    }
    .page-box {
      margin-top: 20px;
      height: 32px;
      .el-pagination {
        float: right;
      }
    }
    a {
      text-decoration: none;
    }
    .unDownLoad {
      color: #909399;
      pointer-events: none;
    }
  }
</style>

<script>
  import axios from 'axios'
  import qs from 'qs'
  const getReportTaskList = params => {
    return axios({
      method: 'post',
      url: '/authui/report/getreporttasklist',
      data: qs.stringify(params)
    })
  }

  export default {
    data () {
      return {
        app_id: this.$route.query.app_id,
        exportList: [],
        currentPage: 1,
        pageSize: 20,
        total: 0
      }
    },
    created () {
      this.getExportList()
    },
    methods: {
      getExportList () {
        let params = {}
        params.app_id = this.app_id
        params.page = this.currentPage
        params.limit = this.pageSize
        getReportTaskList(params).then((res) => {
          if (res && res.data && res.data.error_no === 0) {
            let result = res.data.result || {}
            this.total = result.total || 0
            this.exportList = result.detail || []
          } else {
            this.$message.error(res.data.error_msg || '请求数据出错，请稍候重试')
          }
        })
      },
      stampToDate (time) {
        let date = new Date(time * 1000)
        let y = date.getFullYear()
        let m = date.getMonth() + 1
        m = m < 10 ? ('0' + m) : m
        let d = date.getDate()
        d = d < 10 ? ('0' + d) : d
        let h = date.getHours()
        let min = date.getMinutes()
        let s = date.getSeconds()
        min = min < 10 ? ('0' + min) : min
        s = s < 10 ? ('0' + s) : s
        return y + '-' + m + '-' + d + ' ' + h + ':' + min + ':' + s
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getExportList()
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getExportList()
      }
    }
  }
</script>


