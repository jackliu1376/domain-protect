<template>
  <div class="loncom_content">
    <div class="loncom_public_top">
      <div class="loncom_fl">域名历史管理</div>
      <div class="loncom_fr">
        <el-button type="primary" size="mini" @click="add"><i class="fa fa-plus-circle loncom_mr5"></i>新建</el-button>
        <el-button type="primary" size="mini" @click="remove"><i class="fa fa-minus-circle loncom_mr5"></i>删除</el-button>
      </div>
    </div>
    <div class="loncom_public_con loncom_scroll_con">
      <el-search-table-pagination type="local"
                                  url=""
                                  list-field="list"
                                  total-field="total"
                                  method='post'
                                  :formOptions="table_forms"
                                  border :data="table_data" :columns="table_columns" ref="thisRef">
        <el-table-column slot="prepend" type="selection"></el-table-column>
        <el-table-column label="结果" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.result === '正常' ? 'success' : 'danger'">{{ scope.row.result }}</el-tag>
          </template>
        </el-table-column>
        <template slot-scope="scope" slot="preview-handle">
          <div>
            <a href="javascript:;" class="loncom_color" @click="edit(scope.row)">编辑</a>
            <em>|</em>
            <a href="javascript:;" class="loncom_color" @click="remove(scope.row)">删除</a>
          </div>
        </template>
      </el-search-table-pagination>
    </div>
    <Add v-bind:dialogInfo="addInfo" v-if="addInfo.visible"></Add>
  </div>
</template>

<script>
import Add from '@/components/record_pool_add.vue';
var axios = require('axios');// 确保已经安装axios

export default {
  created() {
    this.fetchData();
  },
  mounted() {
    scrollCon();
  },
  data() {
    return {
      table_data: [], // 初始化为空数组
      table_forms: {
        inline: true,
        size: 'small',
        initParams: {queryKey: ""},
        forms: []
      },
      table_columns: [
        {prop: 'id', label: '域名编号', minWidth: 10},
        {prop: 'name', label: '域名名称', minWidth: 10},
        {prop: 'result', label: '结果', minWidth: 10},
        {prop: 'time', label: '检测时间', minWidth: 30},
        {prop: 'handle', label: '操作', slotName: 'preview-handle', width: 100},
      ],
      addInfo: {
        title: "新增鱼塘信息",
        width: '850px',
        visible: false,
      },
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwYjM5MGZmZmVkODE0OTdkYWMzYzJiMTEyMDc2ZjU3YiIsInN1YiI6IjkiLCJpc3MiOiJzZyIsImlhdCI6MTczNDMzMjE3MywiZXhwIjoxNzM1NTQxNzczfQ.ToVI6fKoFau7YkWinmkcdZxq8HUKmkevUV3X8j09MOk'
    };
  },
  methods: {
    fetchData() {
      axios.get('http://localhost:3000/getlist/',
        {
          headers: {
        'Authorization': `Bearer ${this.token}`
      }}
      ).then(response => {
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
  components: {Add},
};
</script>
