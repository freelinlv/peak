const str = `
<template>
  <div>
    <div class="filterContainer">
      <el-form  class="searchZoom" ref="filter" :model="filter" :rules="rules" :inline="true" label-width="100px" label-position="right">
      <!-- form -->
      <el-row :gutter="100" class="searchBtnBox">
        <el-col>   
          <el-button type="primary" @click="search(1)">查询</el-button>
          <el-button class="resetBtn" @click="resetFilter">重置</el-button>
        </el-col>  
      </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //data
      filter: {
        //filter
      },
      rules: {
      }
    }
  },

  watch: {
  },

  created () {
  },

  methods: {
    /**
     * 重置查询条件
     *
     */
    resetFilter () {
      this.filter = Object.assign({}, this.filter, {
        //重置查询条件
      })
    },
    /**
     * 查询操作
     *
     */
    search (pageNum) {
      this.$refs['filter'].validate((valid) => {
        if (!valid) return false
        // this.opeartionTabel = Object.assign({}, this.opeartionTabel, {
        //   orders: []
        // })
        // let params = this.filter
        // getstockoutorderlist(params).then((res) => {
        //   if (res.data.error_no === 0) {
        //     this.opeartionTabel = Object.assign({}, this.opeartionTabel, res.data.result)
        //   } else {
        //     this.$message({message: res.data.error_msg, type: 'error'})
        //   }
        // })
      })
    }
  }
}

</script>

<style>
.filterContainer {
  padding: 10px 30px;
  background-color: #fff;
  .headTab {
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-right: 30px;
    .el-form-item__content {
      width: auto!important;
    }
    .el-button {
      margin-left: 90px;
    }
  }
}
.searchBtnBox{
  margin-left: 50px;
  .resetBtn{
    margin-left: 15px;
  }
}
</style>



`
export default str
