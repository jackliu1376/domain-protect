<template>
  <div class="register-container">
    <!-- 左侧背景 -->
    <div class="register-bg"></div>

    <!-- 右侧表单 -->
    <div class="register-form">
      <div class="form-wrapper">
        <div class="header">
          <h1>用户注册</h1>
          <p class="sub-title">创建您的DGA Safe Watch账号</p>
        </div>

        <el-form :model="user" :rules="rules" ref="registerForm">
          <!-- 用户名 -->
          <el-form-item prop="userid">
            <el-input
              v-model.trim="user.userid"
              placeholder="请输入用户名"
              class="modern-input"
              prefix-icon="el-icon-user">
            </el-input>
          </el-form-item>

          <!-- 密码 -->
          <el-form-item prop="psword">
            <el-input
              v-model.trim="user.psword"
              type="password"
              placeholder="请输入密码"
              class="modern-input"
              prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>

          <!-- 确认密码 -->
          <el-form-item prop="confirmPsword">
            <el-input
              v-model.trim="user.confirmPsword"
              type="password"
              placeholder="确认密码"
              class="modern-input"
              prefix-icon="el-icon-lock">
            </el-input>
          </el-form-item>

          <div class="action-buttons">
            <el-button
              type="primary"
              class="register-btn"
              @click="register('registerForm')">
              立即注册
            </el-button>
            <div class="login-link">
              已有账号？<a @click="goToLogin">立即登录</a>
            </div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register-container {
  display: flex;
  height: 100vh;
}

.register-bg {
  flex: 1;
  background: url(../../static/images/12.png) no-repeat center center;
  background-size: cover;
}

.register-form {
  width: 660px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper {
  width: 480px;
  padding: 40px;
}

.header {
  margin-bottom: 40px;
  text-align: left;
}

.header h1 {
  font-size: 32px;
  color: #0d1833;
  margin-bottom: 8px;
}

.sub-title {
  color: #909399;
  font-size: 14px;

}

.modern-input >>> .el-input__inner {
  height: 48px;
  border-radius: 4px;
  padding-left: 40px;
  border: 1px solid #DCDFE6;
}

.action-buttons {
  margin-top: 30px;
}

.register-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  border-radius: 4px;
  background: #199ED8;
  border-color: #199ED8;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  color: #606266;
}

.login-link a {
  color: #199ED8;
  cursor: pointer;
  margin-left: 5px;
}
</style>

<script>
var axios = require('axios');
export default {
  data() {
    return {
      user: {
        userid: "",
        psword: "",
        confirmPsword: ""
      },
      rules: {
        userid: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        psword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 13, message: '密码长度必须在5到13位之间', trigger: 'blur' },
        ],
        confirmPsword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: (rule, value, callback) => {
              if (value !== this.user.psword) {
                callback(new Error('两次输入密码不一致'));
              } else {
                callback();
              }
            }, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    register: function (formName) {
      var _this = this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post('http://localhost:3000/user/account/register/', {
            "username": this.user.userid,
            "password": this.user.psword,
            "confirmedPassword": this.user.confirmPsword
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
            .then(function (response) {
              const errorMessage = response.data.error_message;
              if (errorMessage === 'success') {
                _this.$message.success('注册成功');
                _this.$router.push({path: '/login'});
              } else if (errorMessage === '用户名已存在') {
                _this.$message.error('用户名已存在');
              }
            })
            .catch(function (error) {
              _this.$message.error('注册失败：' + (error.response ? error.response.data : error.message));
            });
        }
      });
    },
    goToLogin() {
      this.$router.push({path: '/login'});
    }
  }
};
</script>
