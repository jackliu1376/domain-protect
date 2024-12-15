<template>
  <div class="loncom_register">
    <div class="loncom_register_con loncom_public_shadow">
      <div class="loncom_logo_img"></div>
      <div class="loncom_logo_text">Domain-protect</div>
      <div class="loncom_register_input">
        <el-form :model="user" :rules="rules" ref="registerForm">
          <div class="loncom_user">
            <el-form-item prop="userid">
              <el-input v-model.trim="user.userid" placeholder="请输入用户名"></el-input>
            </el-form-item>
          </div>
          <div class="loncom_pass">
            <el-form-item prop="psword">
              <el-input v-model.trim="user.psword" type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </div>
          <div class="loncom_confirm_pass">
            <el-form-item prop="confirmPsword">
              <el-input v-model.trim="user.confirmPsword" type="password" placeholder="请确认密码"></el-input>
            </el-form-item>
          </div>
          <div class="loncom_buttons">
          <el-button type="primary" @click="register('registerForm')">注册</el-button>
          <el-button @click="goToLogin">已有账号？</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style>
.loncom_register_input .loncom_buttons {
  display: flex;
  justify-content: space-between;
}

.loncom_register_input button {
  width: 48%; /* 使按钮宽度为容器宽度的48% */
  height: 40px; /* 减少按钮高度 */
  font-size: 14px; /* 减少字体大小 */
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  background: #199ED8;
  color: #fff;
  margin-top: 10px; /* 增加按钮的上边距 */
}
.loncom_register {
  width: 100%;
  height: 420px; /* 根据实际内容调整高度 */
  background: #199ED8 url(../../static/images/login_bg.png) no-repeat right bottom;
  position: relative;
  top: 50%;
  margin-top: -210px; /* 根据实际高度调整 */
}

.loncom_register_con {
  width: 350px;
  height: 420px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -175px;
  margin-top: -210px;
  background: #fff;
  padding: 20px 25px;
  border-top: 10px solid #199ED8;
}

.loncom_register_con .loncom_logo_img {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  background: url(../../static/images/small_logo.png) no-repeat center center;
  background-size: contain;
}

.loncom_register_con .loncom_logo_text {
  text-align: center;
  font-style: normal;
  font-size: 24px;
  color: #199ED8;
  font-weight: bold;
  margin: 20px 0;
}

.loncom_register_input input {
  width: 100%;
  border: 1px solid #DBDBDB;
  border-radius: 3px;
  padding-left: 40px;
  color: #999;
}

.loncom_register_input p {
  margin-bottom: 20px;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0px 1000px white inset;
}

.loncom_register_input .loncom_user,
.loncom_register_input .loncom_pass,
.loncom_register_input .loncom_confirm_pass {
  position: relative;
}

.loncom_register_input .loncom_user:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  background: url(../../static/images/login_user.png) no-repeat 10px center !important;
}

.loncom_register_input .loncom_pass:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  background: url(../../static/images/login_pass.png) no-repeat 10px center !important;
}

.loncom_register_input .loncom_confirm_pass:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  background: url(../../static/images/login_pass.png) no-repeat 10px center !important; /* 假设你有一个确认密码的图标 */
}

.loncom_register_input {
  margin-left: 0 !important;
}

.loncom_register_input button {
  width: 100%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  border-radius: 3px;
  background: #199ED8;
  color: #fff;
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
    register:function(formName){
      var _this=this;
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // this.$message.success('登录成功！');
          //存登录信息
          var registerInfo={};
          if(sessionStorage.registerInfo){
            registerInfo=JSON.parse(sessionStorage.registerInfo);
          }
          registerInfo.username=this.user.userid;
          registerInfo.psword=this.user.psword;
          registerInfo.confirmPsword=this.user.confirmPsword;
          sessionStorage.registerInfo = JSON.stringify(registerInfo);

// 使用axios发送POST请求
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
              console.log(errorMessage);
              if(errorMessage === 'success'){
                // _this.$router.push({path:'/'});
                _this.$message.success('注册成功');
                _this.$router.push({ path: '/login' });
              }else if(errorMessage === '用户名已存在'){
                _this.$message.success('用户名已存在');

              }
              console.log('Response:', response.data);
            })
            .catch(function (error) {
              _this.$message.warning('账号或密码错误，请重新登录');
              console.log('Error:', error.response ? error.response.data : error.message);
            });
        }
      });
    },
    // register(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$message.success('注册成功！');
    //       // 这里添加注册逻辑
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
    //   });
    // },
    goToLogin() {
      this.$router.push({ path: '/login' });
    }
  }
};
</script>
