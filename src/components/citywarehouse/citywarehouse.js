
// 暂存
import { getcitylist } from '@/api/api'

export default {
  data () {
    return {
      filter: {
        city_id: '',
        warehouse_id: ''
      },
      // 城市 & 仓库
      optionsWarehouse: {
        cityList: [],
        warehouseList: []
      }
    }
  },
  created () {
    this.getCitylist()
  },
  methods: {
    getCitylist () {
      getcitylist().then((res) => {
        const data = res.data
        if (data.error_no === 0) {
          const cityList = data.result && data.result.city_list
          this.optionsWarehouse.cityList = cityList.map((val) => {
            return {
              label: val.city_name,
              id: val.city_id
            }
          })
        } else {
          this.$message.error(data.error_msg || '查询出错，试试刷新页面')
        }
      })
    },
    handleSelectCity () {
      this.$emit('change', this.filter.city_id)
    }
    // getWarehouselist () {
    //   const paras = {
    //     city_id: this.filter.city_id,
    //     page_num: 1000,
    //     page_size: 1
    //   }
    //   getwarehouselist(paras).then((res) => {
    //     const data = res.data
    //     if (data.error_no === 0) {
    //       const warehouseList = data.result && data.result.warehouse_info
    //       this.optionsWarehouse.warehouseList = warehouseList.map((val) => {
    //         return {
    //           label: val.warehouse_name,
    //           id: val.warehouse_id
    //         }
    //       })
    //     } else {
    //       this.$message.error(data.error_msg || '查询出错，试试刷新页面')
    //     }
    //   })
    // },
  }
}
