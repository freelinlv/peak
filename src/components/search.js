const str = `
<template>
  <div>
    <div class="filterContainer" @dblclick="dbclicka(_self)">
      <el-form  class="searchZoom" ref="filter" :model="filter" :rules="rules" :inline="true" label-width="100px" label-position="right">
        <el-form-item  label="冻结单号" prop="stockFrozenOrderId">
          <el-input v-model.trim="filter.stockFrozenOrderId" placeholder="请输入冻结单号"></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    let checkFromDate = (rule, value, callback, source, options) => {
      if (!value) {
        callback(new Error('请选择创建时间'))
      }
      if (util.beyoundNinetyDays(value)) {
        callback(new Error('创建时间查询不可以超过90天'))
      }
      callback()
    }
    return {
      _self:this,
      filter: {
        warehouseId: '',
        stockFrozenOrderId: '',
        skuId: '',
        skuName: '',
        createType: '',
        orderStatus: '',
        time: '',
        startTime: '',
        endTime: ''
      },
      timeOptions: [{
        label: '冻结时间',
        value: '1'
      }, {
        label: '关闭时间',
        value: '2'
      }],
      timeVal: '1',
      rules: {
        warehouseId: [{required: true, message: '请选择仓库', trigger: 'change'}],
        time: [{ required: true, validator: checkFromDate, trigger: 'change blur' }],
        stockFrozenOrderId: [{
          required: false,
          message: '请输入有效的冻结单号',
          trigger: 'change'
        }]
      },
      wareComponent: {
        showOrNot: false,
        params: {
          query_type: 1
        },
        url: '/warehouse/main/getwarehouseincitylist'
      },
      showOrNot: false,
      // 列表展示
      businessTabel: {
        orders: [],
        currentPage: 1,
        currentPageSize: 20,
        total: 0
      }
    }
  },
  watch: {
    'filter.time': function (val) {
      if (val) {
        this.filter.startTime = val[0].getTime() / 1000
        this.filter.endTime = val[1].getTime() / 1000
      } else {
        this.filter.startTime = ''
        this.filter.endTime = ''
      }
    }
  },
  created () {
  },
  
  methods: {
    dbclicka(a){
      console.log(a,window.event)
    }
  }
}

</script>

<style>
  .filterContainer {
    padding: 10px 30px;
    background-color: #fff;
    
  }
  .headTab {
    margin-bottom: 20px;
  }
  .el-form-item {
    margin-right: 30px;
    
  }
  .filterTimeBox{
    display: inline-block;
  }
  .el-form-item__content {
    width: auto!important;
  }
  .el-button {
    margin-left: 90px;
  }
</style>



`
export default str
