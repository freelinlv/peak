<template>
  <section>
    <el-select v-model="value1" placeholder="一级目录" @change='handleSelect'>
      <el-option
        v-for="item in options1"
        :key="item.cat_id"
        :label="item.cat_name"
        :value="item.cat_id">
      </el-option>
    </el-select>
    <el-select v-model="value2" placeholder="二级目录" @change='handleSelectTwo'>
      <el-option
        v-for="item in options2"
        :key="item.cat_id"
        :label="item.cat_name"
        :value="item.cat_id">
      </el-option>
    </el-select>
    <el-select v-model="value3" placeholder="三级目录" @change='handleSelectThree'>
      <el-option
        v-for="item in options3"
        :key="item.cat_id"
        :label="item.cat_name"
        :value="item.cat_id">
      </el-option>
    </el-select>
  </section>
</template>

<script>
import { getUpcCategory } from '../../api/api'
export default {
  data () {
    return {
      value1: '',
      value2: '',
      value3: '',
      options1: [],
      options2: [],
      options3: [],
      loading: false
    }
  },
  created () {
    this.edit_sku_id = this.$route.query.sku_id
    if (this.edit_sku_id) {

    } else {
      this.getUpcCategory(1)
    }
  },
  methods: {
    // get category
    getUpcCategory (deepth, parentId) {
      let params = {
        depth: deepth,
        parent_id: parentId || ''
      }
      getUpcCategory(params).then((res) => {
        let _options = `options${deepth}`
        if (res.data.result) {
          this[_options] = res.data.result
        }
      })
    },
    handleSelect (val) {
      this.value2 = ''
      this.value3 = ''
      this.getUpcCategory(2, val)
    },
    handleSelectTwo (val) {
      this.value3 = ''
      this.getUpcCategory(3, val)
    },
    handleSelectThree (val) {
      let category = {
        value1: this.value1,
        value2: this.value2,
        value3: val
      }
      this.$emit('handleSelectThree', category)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
