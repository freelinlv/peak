<template>
  <div class="check-all">
    <span class="set-name">{{allRenderData.set_name + '：'}}</span>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange">
      全选
    </el-checkbox>
    <el-checkbox-group
      v-model="checkData"
      @change="handleCheckedChange">
      <el-checkbox
        v-for="item in allRenderData.permissions"
        :label="item.permission_id"
        :key="item.permission_id">
        {{item.permission_name}}
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 是否全选状态判断，boolean
        checkAll: false,
        // 是否半选状态判断，boolean
        isIndeterminate: false,
        // 所有选中的id
        checkData: this.checkedDataFromProps
      }
    },
    watch:{
      // 选中的数据有更改时，修改props
      checkData: function() {
        this.$emit('update:checkedDataFromProps', this.checkData)
      }
    },
    props: {
      // 从父元素传过来的，已经选中的元素
      checkedDataFromProps: {
        type: Array,
        default: []
      },
      // 所有渲染数据
      allRenderData: {
        type: Object,
        default: {}
      },
      // 渲染数据中抽出id部分，方便做全选判断
      allCheckData: {
        type: Array,
        default: []
      }
    },
    mounted() {
      // vue声明周期问题，临时处理，未来再研究
      setTimeout(() => {
        this.checkData = this.checkedDataFromProps
        this.checkAll = this.checkData.length == this.allCheckData.length
        this.isIndeterminate = this.checkData.length < this.allCheckData.length && this.checkData.length > 0
      }, 100)
    },
    methods: {
      // 全选按钮点击事件
      handleCheckAllChange(val) {
        // 判断是否全选
        this.checkData = val ? this.allCheckData : [];
        this.isIndeterminate = false;
      },
      // 某个checkbox点击事件
      handleCheckedChange(value) {
        // 获取选中的数量
        let checkedCount = value.length;
        // 判断是否全选
        this.checkAll = checkedCount == this.allCheckData.length;
        // 判断是否半选
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.allCheckData.length;
      }
    }
  };
</script>

<style scoped lang="scss">
  .set-name{
    display: inline-block;
    width: 106px;
  }

  .el-checkbox-group{
    margin-left: 110px;
  }

  .check-all{
    margin-bottom: 10px;
  }

  .el-checkbox{
    margin: 0 30px 0 0;
  }
</style>
