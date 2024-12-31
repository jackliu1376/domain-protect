<template>
  <div class="loncom_content">
    <div class="loncom_public_top1">
      <div class="loncom_fl">域名模糊查询</div>
      <div class="loncom_fr">
        <el-form :model="searchParams" inline>
          <el-form-item label="检测结果">
            <el-input v-model="searchParams.detectionResult" placeholder="检测结果"></el-input>
          </el-form-item>
          <el-form-item label="域名">
            <el-input v-model="searchParams.domain" placeholder="域名"></el-input>
          </el-form-item>
          <el-form-item label="检测时间">
            <el-date-picker
              v-model="searchParams.detectionTime"
              type="datetime"
              placeholder="选择日期时间"
              value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="medium" @click="fetchData" class="custom-button">
          <i class="fa fa-search"></i>查询
        </el-button>
      </div>
    </div>
    <div class="loncom_public_con loncom_scroll_con">
      <el-table :data="table_data" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="域名编号" width="360"></el-table-column>
        <el-table-column prop="name" label="域名名称" width="720"></el-table-column>
        <el-table-column label="结果" width="213">
          <template slot-scope="scope">
            <el-tag :type="scope.row.result === '正常' ? 'success' : 'danger'">{{ scope.row.result }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="time" label="检测时间" width="480"></el-table-column>
      </el-table>
    </div>
    <Add v-bind:dialogInfo="addInfo" v-if="addInfo.visible"></Add>
  </div>
</template>

<script>
import Add from '@/components/record_pool_add.vue';
var axios = require('axios');

export default {
  data() {
    return {
      table_data: [],
      searchParams: {
        detectionResult: '',
        domain: '',
        detectionTime: ''
      },
      addInfo: {
        title: "新增鱼塘信息",
        width: '850px',
        visible: false,
      },
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5MWQxZThkOTJmZjI0NmQzYTUwMTY0ZmFkZTRjMWE3ZCIsInN1YiI6IjkiLCJpc3MiOiJzZyIsImlhdCI6MTczNTYyOTk0MywiZXhwIjoxNzM2ODM5NTQzfQ.HTh22qFfZaBMVJCWpSicKoLYnC5l6T8r6Ex5KRU2Rno' // 请替换成您的实际token
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const params = {
        detectionResult: this.searchParams.detectionResult,
        domain: this.searchParams.domain,
        detectionTime: this.searchParams.detectionTime
      };
      axios.get('http://localhost:3000/detection/query', {
        params,
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }).then(response => {
        let data = Array.isArray(response.data) ? response.data : [response.data];
        this.table_data = data.map(item => ({
          id: item.id,
          name: item.domain,
          result: item.detectionResult,
          time: item.detectionTime,
        }));
      }).catch(error => {
        console.error('Error:', error);
      });
    },
    add() {
      this.addInfo.visible = true;
    },
    remove(row) {
      // 删除逻辑
    },
    edit(row) {
      // 编辑逻辑
    },
  },
  components: { Add },
};
</script>

<style>
.loncom_search {
  margin-bottom: 20px;
}
.loncom_color {
  color: #409EFF;
}
.loncom_public_top {
  display: flex;
  align-items: center;
}
.loncom_fl {
  flex-grow: 1;
}

.loncom_public_top1 {
  display: flex;
  align-items: center;
  height: 100px; /* 或您希望的任何高度 */
  max-height: 100px; /* 设置最大高度 */
}
.loncom_fr {
  display: flex;
  align-items: center;
  height:80%; /* 使高度适应 loncom_public_top */
}

.search-form {
  display: flex;
  align-items: center;
  height: 100%; /* 使高度适应 loncom_public_top */
}
.custom-button {
  height: 63px; /* 自定义高度 */
  line-height: 10px; /* 使文本垂直居中 */
  padding: 0px 10px; /* 根据需要调整内边距 */
}
.loncom_public_top1 {
  width: 100%;
  height: 100px;
  line-height: 28px;
  background: #f9f9f9;
  border-bottom: 1px solid #d2d2d2;
  padding: 5px 15px;
  color: #333;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  position: relative;
}
</style>
