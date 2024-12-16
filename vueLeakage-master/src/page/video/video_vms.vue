<template>
    <div class="loncom_content">
       <div class="loncom_public_top">
            <div class="loncom_fl">用户管理</div>
            <div class="loncom_fr">
                <el-button type="primary" size="mini" @click="add"><i class="fa fa-plus-circle loncom_mr5"></i>新建</el-button>
                <el-button type="primary" size="mini" @click="remove"><i class="fa fa-minus-circle loncom_mr5"></i>删除</el-button>
            </div>
        </div>
        <div class="loncom_public_con loncom_scroll_con">
            <el-search-table-pagination  type="local"
                url=""
                list-field="list"
                total-field="total"
                method='post'
                :formOptions="table_forms"
                border :data="table_data" :columns="table_columns" ref="thisRef">
                <el-table-column slot="prepend" type="selection"></el-table-column>
                <template slot-scope="scope" slot="preview-handle">
                    <div>
                        <a href="javascript:;" class="loncom_color" @click="show (scope.row)">预览</a>
                        <em>|</em>
                        <a href="javascript:;" class="loncom_color" @click="edit (scope.row)">编辑</a>
                        <em>|</em>
                        <a href="javascript:;" class="loncom_color" @click="confirmRemove (scope.row)">删除</a>
                    </div>
                </template>
            </el-search-table-pagination>
       </div>
       <Add v-bind:dialogInfo="addInfo" v-if="addInfo.visible"></Add>
       <Show v-bind:dialogInfo="showInfo" v-if="showInfo.visible"></Show>
      <ChangePassword v-bind:dialogInfo="changePasswordInfo" v-if="changePasswordInfo.visible"></ChangePassword>
    </div>
</template>


<script>

import Add from '@/components/video_vms_add.vue'
import Show from '@/components/video_show.vue'
import ChangePassword from '@/components/ChangePassword.vue'
var axios = require('axios');
export default {
    created () {
      this.fetchData();
    },
    mounted() {
        scrollCon();
    },
    data() {
       return {
          　table_data:[],
            selectedRows: [],
            table_forms: {
            inline: true,
            size:'small',
            initParams:{queryKey:""},
            forms: []
            },
            table_columns:[
              { prop: 'id', label: '用户编码',minWidth:10},
              { prop: 'username', label: '用户名',minWidth:10},
              { prop: 'photo', label: '头像',minWidth:30},
              { prop: 'handle', label: '操作',slotName:'preview-handle',width:140},
            ],
            addInfo:{
                title:"新增视频信息",
                visible:false,
            },
            showInfo:{
                title:"头像预览",
                visible:false,
                imageSrc: '' // 存储头像URL
            },
         changePasswordInfo: {
           title: "修改密码",
           visible: false,
           userId: null, // 存储当前用户ID
           token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwYjM5MGZmZmVkODE0OTdkYWMzYzJiMTEyMDc2ZjU3YiIsInN1YiI6IjkiLCJpc3MiOiJzZyIsImlhdCI6MTczNDMzMjE3MywiZXhwIjoxNzM1NTQxNzczfQ.ToVI6fKoFau7YkWinmkcdZxq8HUKmkevUV3X8j09MOk'
         },
         token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwYjM5MGZmZmVkODE0OTdkYWMzYzJiMTEyMDc2ZjU3YiIsInN1YiI6IjkiLCJpc3MiOiJzZyIsImlhdCI6MTczNDMzMjE3MywiZXhwIjoxNzM1NTQxNzczfQ.ToVI6fKoFau7YkWinmkcdZxq8HUKmkevUV3X8j09MOk'
       }
   },
    methods:{
      fetchData() {
        axios.get('http://localhost:3000/user/account/users/',{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        }
        )
          .then(response => {
            let data = Array.isArray(response.data) ? response.data : [response.data];
            // 假设后端返回的数据格式为 [{id: '1', username: 'user1', photo: 'photo1'}, ...]
            this.table_data = data.map((item) => {
              return {
                id: item.id,
                username: item.username,
                photo: item.headsculpture
              };
            });
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      },
       add:function(){
           this.addInfo.visible=true;
       },
      confirmRemove(row) {
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.remove(row);
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      },
      confirmRemoveSelected() {
        if (this.selectedRows.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的项',
          });
          return;
        }
        this.$confirm('此操作将永久删除选中文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            this.removeSelected();
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            });
          });
      },
       remove:function(row){
         axios.delete(`http://localhost:3000/user/account/users/${row.id}`, {
           headers: {
             'Authorization': `Bearer ${this.token}`,
           },
         })
           .then((response) => {
             this.fetchData();
             this.$message({
               type: 'success',
               message: '删除成功!',
             });
           })
           .catch((error) => {
             console.error('Error:', error);
             this.$message({
               type: 'error',
               message: '删除失败!',
             });
           });
       },
      removeSelected() {
        this.selectedRows.forEach((row) => {
          axios.delete(`http://localhost:3000/user/account/users/${row.id}`, {
            headers: {
              'Authorization': `Bearer ${this.token}`,
            },
          })
            .then((response) => {
              this.fetchData();
            })
            .catch((error) => {
              console.error('Error:', error);
            });
        });
        this.selectedRows = [];
      },
       edit:function(row){
         this.changePasswordInfo.userId = row.id;
         this.changePasswordInfo.visible = true;
       },
       show:function(row){
           this.showInfo.imageSrc = row.photo;
           this.showInfo.visible=true;
       },

    },
    components:{Add,Show,ChangePassword}
}
</script>
