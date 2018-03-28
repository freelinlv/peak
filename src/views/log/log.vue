<template>
  <section>
    <section class="table-area">
      <!-- 列表 -->
      <template>
        <el-table
          :data="tableData"
          v-loading="loading"
          style="margin: 0 20px; width: 100%; background: #fff;">
          <el-table-column
            v-if="source !== 'purchase'"
            prop="log_content"
            label="操作描述">
          </el-table-column>
          <el-table-column
            v-if="source !== 'purchase'"
            prop="create_time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            v-if="source !== 'purchase'"
            prop="operator"
            label="操作人">
          </el-table-column>
          <el-table-column
            v-if="source === 'purchase'"
            prop="operation_type"
            label="操作类型">
          </el-table-column>
          <el-table-column
            v-if="source === 'purchase'"
            prop="content"
            label="操作描述">
          </el-table-column>
          <el-table-column
            v-if="source === 'purchase'"
            prop="create_time"
            label="操作时间">
          </el-table-column>
          <el-table-column
            v-if="source === 'purchase'"
            prop="operator_name"
            label="操作人">
          </el-table-column>
        </el-table>
        <div class="page">
          <el-pagination
            @current-change="changePage"
            @size-change="changeSize"
            :current-page="pageData.page"
            :page-size="pageData.count"
            :page-sizes="[10, 20, 50, 100]"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total">
          </el-pagination>
      </div>
      </template>
    </section>
  </section>
</template>

<script>

import { getVendorLog, getQuotationLog, getPurchaseLog ,getSkuLog} from '@/api/api'
export default {
  data () {
    return {
      vendorId: this.$route.query.vendor_id,
      quotationId: this.$route.query.quotation_id,
      poId: this.$route.query.po_id,
      source: this.$route.query.source,
      pageData: {
        page: 1,
        total: 0,
        count: 20,
        page_num: 0
      },
      tableData: [],
      loading: false
    }
  },
  created () {
    this.getLog()
  },
  methods: {
    // 获取日志
    getLog () {
      let params = {
        page_size: this.pageData.count,
        page_num: this.pageData.page
      }
      switch (this.source) {
        case 'vendor':
          params.vendor_id = this.vendorId
          getVendorLog(params).then((res) => {
            if (res.data.error_no === 0) {
              this.tableData = res.data.result.log_list
              this.pageData.total = res.data.result.total
            }
          })
          break
        case 'quotation':
          params.quotation_id = this.quotationId
          this.loading = true
          getQuotationLog(params).then((res) => {
            if (res.data.error_no === 0) {
              this.tableData = res.data.result.log_list
              this.pageData.total = res.data.result.total
              this.loading = false
            }
          })
          break
        case 'purchase':
          params.po_id = this.poId
          this.loading = true
          getPurchaseLog(params).then((res) => {
            if (res.data.error_no === 0) {
              this.tableData = res.data.result.log_list
              this.pageData.total = res.data.result.total
              this.loading = false
            }
          })
          break
        case 'product':
          params.sku_id = this.vendorId
          this.loading = true
          getSkuLog(params).then((res) => {
            if (res.data.error_no === 0) {
              this.tableData = res.data.result.log_list
              this.pageData.total = res.data.result.total
              this.loading = false
            }
          })
          break
        default:
          break
      }
    },
    /**
     * @function
     * @description 翻页触发事件
     */
    changePage (val) {
      this.pageData.page = val
      this.getLog()
    },
    /**
     * @function
     * @description 改变翻页size触发事件
     */
    changeSize (val) {
      this.pageData.page = 1
      this.pageData.count = val
      this.getLog()
    }
  }
}
</script>

<style scoped lang="scss">

</style>
