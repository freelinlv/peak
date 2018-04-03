<template>
  <el-row>
    <el-col :span="8" v-for="(item, index) in dataArray" :key="index" class='card'>
      <el-card>
        <figure class="snip1584">
          <div class="img-container">
            <img :src=item.imgUrl class="image" width='100%'>
          </div>
          <div class="info">
            <span>{{item.name}}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.create_time}}</time>
            </div>
          </div>
          <figcaption @click="jump(item.id)">
            <h3>{{item.desc}}</h3>
            <h5 style="cursor: pointer;">详情</h5>
          </figcaption>
        </figure>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import { getDetail } from '@/api/api'
export default {
  data () {
    return {
      dataArray: []
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      let params = {

      }
      getDetail(params).then((res) => {
        if (res.data.code === 200) {
          this.dataArray = res.data.resultList
          // console.log(this.dataArray)
        }
      })
    },
    jump (id) {
      let url = `/detail/${id}`
      this.$router.push(url)
    }
  }
}
</script>
<style scoped>
.card {
  width: 330px;
  margin: 5px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.button a {
  text-decoration: none;
  color: #409eff;
}

.img-container {
  width: 90%;
  height: 120px;
  margin: 0 auto;
}

.image {
  display: block;
  width: auto;
  height: 100%;
  margin: 0 auto;
}

.info {
  margin: 0 10px;
  color: #000;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

</style>
