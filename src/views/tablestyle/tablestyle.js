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
      show: '',
      rowNum: 3,
      lineNum: 2,
      size: [],
      orderInfoList: [],
      arraySpanMethod: [
        // ({ row, column, rowIndex, columnIndex }) => {
        //   if (rowIndex === 2) {
        //     if (columnIndex === 1) {
        //       return [1, 5]
        //     }
        //   }
        // }
      ]
    }
  },
  created () {
    this.getInfo()
    // this.addOrderInfo()
    this.getList()
    // this.spanMethod(0, 1, 1)
    // this.getcitylist()
  },
  methods: {
    getInfo () {
      // let res = {}
      // this.orderInfo = []
    },
    addOrderInfo () {
      this.size.push([ Number(this.rowNum), Number(this.lineNum) ])
      let arr = []
      let obj = {}
      // let checkArr = []
      for (let i = 0; i < this.rowNum; i++) {
        obj['line' + i] = ''
      }
      for (let i = 0; i < this.lineNum; i++) {
        arr.push({})
      }
      // let carr = [[2, 1]]
      this.arraySpanMethod.push(({row, column, rowIndex, columnIndex}, returnFlag) => {
        // if (rowIndex === 2) {
        //   if (columnIndex === 1) {
        //     return [1, 5]
        //   }
        // }
        [[2, 1, 5]].forEach((item) => {
          console.log('for')
          if (rowIndex === 2 && columnIndex === 1) {
            console.log(234)
            return [1, 5]
          }
          // if (rowIndex === 0 && columnIndex === 1) {
          //   console.log(234)
          //   return [0, 2]
          // }
        })

        // if (returnFlag) {
        //   return []
        // }
        // [[0, 1, 1]].forEach((item) => {
        //   console.log('for')
        //   // if (rowIndex === item[0] && columnIndex === item[1]) {
        //   //   console.log(234)
        //   //   return [item[1], item[2]]
        //   // }
        //   if (rowIndex === 0 && columnIndex === 1) {
        //     console.log(234)
        //     return [0, 2]
        //   }
        // })
      })
      this.orderInfoList.push(arr)
    },
    deleteOrder (n) {
      this.size.splice(n, 1)
      this.orderInfoList.splice(n, 1)
      this.arraySpanMethod.splice(n, 1)
    },
    tableCheck (arg) {
      this.spanIndex = arg
    },
    spanMethod (listNum, rowNum, lineNum) {
      // console.log(listNum, rowNum, lineNum)
      // this.arraySpanMethod = []
      let checkArr = this.arraySpanMethod[listNum]({}, true)
      console.log(checkArr)
      if (checkArr.length === 0) {
        checkArr.push([rowNum, lineNum, 1])
      } else {
        checkArr.forEach((item) => {
          if (item[0] === rowNum) {
            item[2] += 1
          }
        })
      }
      console.log(checkArr)
      let fn = ({ row, column, rowIndex, columnIndex }, returnFlag) => {
        if (returnFlag) {
          return checkArr
        }
        checkArr.forEach((item) => {
          if (rowIndex === item[0] && columnIndex === item[1]) {
            return [item[1], item[2]]
          }
        })
      }

      // console.log(listNum, rowNum, lineNum)
      this.$set(this.arraySpanMethod, listNum, fn)
      // this.arraySpanMethod.push(fn)
      // this.arraySpanMethod[listNum] = fn
      // console.log(this.arraySpanMethod[listNum])

      // console.log(row)
      // console.log(line)
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
