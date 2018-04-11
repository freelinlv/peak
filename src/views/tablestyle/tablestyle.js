import preview from '@/components/preview/preview'
import { getDetailData } from '@/api/api'
// import util from '@/common/js/util'
export default {
  components: {
    'get-preview': preview
  },
  data () {
    return {
      loading: false,
      increaseOrder: true,
      pageData: {
        page: 1,
        total: 0,
        count: 20,
        page_num: 0
      },
      tableData: [],
      orderInfo: [],
      orderInfoList: [],
      show: '',
      tit: [],
      lineNum: 2,
      rowNum: 3,
      arraySpanMethod: [
        ({ row, column, rowIndex, columnIndex }) => {
          if (rowIndex === 2) {
            if (columnIndex === 1) {
              return [1, 5]
            }
          }
        }
      ]
    }
  },
  created () {
    this.getInfo()
    this.addOrderInfo()
    this.getList()
    // this.getcitylist()
  },
  methods: {
    getInfo () {
      let res = {}
      this.orderInfo = [
        {
          oneLine: '调整单号',
          twoLine: res.stock_adjust_order_id,
          threeLine: '调整类型',
          fourLine: res.adjust_type,
          fiveLine: '调整数量',
          sixLine: res.total_adjust_amount
        },
        {
          oneLine: '仓库名称',
          twoLine: res.warehouse_name,
          threeLine: '创建人',
          fourLine: res.creator_name,
          fiveLine: '创建时间'
            // sixLine: util.formatTime(orderObj.create_time)
        },
        {
          oneLine: '备注',
          twoLine: res.remark
          // threeLine: '',
          // fiveLine: ''

        }
      ]
    },
    addOrderInfo () {
      let arr = []
      for (let i = 0; i < this.lineNum; i++) {
        arr.push({
          oneLine: '',
          twoLine: '',
          threeLine: '',
          fourLine: '',
          fiveLine: '',
          sixLine: ''
        })
      }
      this.arraySpanMethod.push(() => {})
      this.orderInfoList.push(arr)
    },
    deleteOrder (n) {
      this.orderInfoList.splice(n, 1)
      this.arraySpanMethod.splice(n, 1)
    },
    changePage (val) {
      this.pageData.page = val
      this.getInfo()
    },
    changeSize (val) {
      this.pageData.count = val
      this.getInfo()
    },
    // 表格备注项合并单元格
    arraySpanMethod0 ({ row, column, rowIndex, columnIndex }) {
      console.log({ row, column, rowIndex, columnIndex })
      if (rowIndex === 2) {
        if (columnIndex === 1) {
          return [1, 5]
        }
      }
    },
    // 去掉表格鼠标划入的背景颜色，项目名增加背景色
    tableCellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex % 2 === 0) {
        return {background: '#f5f7fa', textIndent: '20px'}
      } else {
        return {background: '#fff'}
      }
    },
    getList () {
      let params = {
        id: this.$router.currentRoute.params.id
      }
      getDetailData(params).then((res) => {
        if (res.data.code === 200) {
          this.template = res.data.resultList[0].code
          // this.imgUrl = res.data.resultList[0].imgUrl
        }
      })
    }
  }
}
