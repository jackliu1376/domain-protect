<template>
  <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="700px" :append-to-body="true" center>
    <el-form :model="passwordForm" ref="passwordForm" label-width="100px">
      <el-form-item label="新密码" :class="{'is-error': passwordForm.newPassword === ''}">
        <el-input type="password" v-model="passwordForm.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" :class="{'is-error': passwordForm.confirmPassword!== passwordForm.newPassword}">
        <el-input type="password" v-model="passwordForm.confirmPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item style="display: flex; justify-content: center;"> <!-- 添加样式 -->
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="dialogInfo.visible = false">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
var axios = require('axios');
export default {
  props: ['dialogInfo'],
  data() {
    return {
      passwordForm: {
        newPassword: '',
        confirmPassword: ''
      },
      token:'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIwYjM5MGZmZmVkODE0OTdkYWMzYzJiMTEyMDc2ZjU3YiIsInN1YiI6IjkiLCJpc3MiOiJzZyIsImlhdCI6MTczNDMzMjE3MywiZXhwIjoxNzM1NTQxNzczfQ.ToVI6fKoFau7YkWinmkcdZxq8HUKmkevUV3X8j09MOk'
    };
  },
  methods: {
    submitForm() {
      if (this.passwordForm.newPassword === '' || this.passwordForm.confirmPassword === '') {
        this.$message.error('密码不能为空');
        return;
      }
      if (this.passwordForm.newPassword!== this.passwordForm.confirmPassword) {
        this.$message.error('两次输入的密码不一致');
        return;
      }
      // 发送更新密码的请求
      axios.patch('http://localhost:3000/user/account/change-password/', {
        id: this.dialogInfo.userId,
        password: this.passwordForm.newPassword
      }, {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      })
        .then(response => {
          this.$message.success('密码修改成功');
          this.dialogInfo.visible = false;
        })
        .catch(error => {
          console.error('Error:', error);
          this.$message.error('密码修改失败');
        });
    }
  }
};
</script>

<style>
/* 根据需要添加样式 */
</style>
