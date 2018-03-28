
<template>
 <div class="citywarehouse-box">
    <el-form :inline='true' :model='filter' label-position='left'>
      <el-form-item label-width='50px' prop="city_id"  label="城市" class="category">
          <el-select v-model="filter.city_id" clearable placeholder="城市" @change='handleSelectCity'>
            <el-option
              v-for="item in optionsWarehouse.cityList"
              :key="item.id"
              :label="item.label"
              :value="item.id">
            </el-option>
          </el-select>
      </el-form-item>
      <!-- <el-form-item prop="warehouse_id" class="category">
        <el-select v-model="filter.warehouse_id" placeholder="仓库" @change='handleSelectWarehouse'>
          <el-option
            v-for="item in optionsWarehouse.warehouseList"
            :key="item.id"
            :label="item.label"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item> -->
    </el-form>
 </div>
</template>

<script src="./citywarehouse.js"></script>

<style scoped lang='scss'>
  .citywarehouse-box{
    display: inline-block;
  }
</style>
