<template>
    <div class="loncom_login">
        <div class="loncom_login_con loncom_public_shadow">
            <div class="loncom_logo_img"></div>
            <div class="loncom_logo_text">Domain-protect</div>
            <div class="loncom_login_input">
                <el-form :model="user" :rules="rules" ref="userName">
                    <div class="loncom_user">
                        <el-form-item prop="userid">
                            <el-input v-model.trim="user.userid" placeholder="请输入用户名称"></el-input>
                        </el-form-item>
                    </div>
                    <div class="loncom_pass">
                        <el-form-item prop="psword">
                            <el-input v-model.trim="user.psword" type="password" placeholder="请输入登录密码" @keyup.native="keyLogin($event,'userName')"></el-input>
                        </el-form-item>
                    </div>
                  <!-- 验证码组件和输入框 -->
                  <div class="loncom_captcha">
                    <s-identify :identifyCode="identifyCode" @refresh="refreshCode"></s-identify>
                    <el-form-item prop="captcha">
                      <el-input v-model.trim="user.captcha" placeholder="请输入验证码"></el-input>
                    </el-form-item>
                  </div>
                  <div class="loncom_buttons">
                    <el-button type="primary" @click="loginIn('userName')" >登录</el-button>
              <el-button @click="goToRegister">没有账号？</el-button>
                  </div>
                </el-form>
            </div>
        </div>

    </div>
</template>

<style>
.loncom_buttons {
  display: flex;
  justify-content: space-between;
}
.loncom_register_input .loncom_buttons {
  display: flex;
  justify-content: space-between;
}
    .loncom_login {
    width: 100%;
    height: 220px;
    background: #199ED8 url(../../static/images/login_bg.png) no-repeat right bottom;
    position: relative;
    top: 50%;
    margin-top: -110px;
    }

    .loncom_login_con {
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

    .loncom_login_con .loncom_logo_img {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    background: url(../../static/images/small_logo.png) no-repeat center center;
    background-size: contain;
    }

    .loncom_login_con .loncom_logo_text {
    text-align: center;
    font-style: normal;
    font-size: 24px;
    color: #199ED8;
    font-weight: bold;
    margin: 20px 0;
    }

    .loncom_login_input input {
    width: 100%;
    border: 1px solid #DBDBDB;
    border-radius: 3px;
    padding-left: 40px;
    color: #999;
    }

    .loncom_login_input p {
    margin-bottom: 20px;
    }
    input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    }
    .loncom_login_input .loncom_user,
    .loncom_login_input .loncom_pass{
    position: relative;
    }
    .loncom_login_input .loncom_user:after{
        content: "";
        position: absolute;
        width: 40px;
        height: 40px;
        top: 0;
        background: url(../../static/images/login_user.png) no-repeat 10px center !important;
    }
    .loncom_login_input .loncom_pass:after{
    content: "";
    position: absolute;
    width: 40px;
    height: 40px;
    top: 0;
    background: url(../../static/images/login_pass.png) no-repeat 10px center !important;
    }

    .loncom_login_input {
    margin-left:0 !important;
    }

    .loncom_login_input button {
    width: 100%;
    height: 50px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    border-radius: 3px;
    background: #199ED8;
    color: #fff;
    }
.loncom_captcha {

  display: flex;
  align-items: center;
  //margin-bottom: 20px;
  margin-top: -25px;
  margin-left: -7px;

}

.loncom_captcha input {
  margin-top: 25px;
  margin-left: 2px;
  flex: 1;
}

.message {
  margin-top: 10px;
  color: red;
}

</style>

<script>
import SIdentify from './identify.vue'
var axios = require('axios');
export default {
  components: { SIdentify },
  created () {
 },
 data(){

  	return {
          loginFlag:false,
        user:{
            userid:"",
            psword:"",
          captcha: "" // 用户输入的验证码
        },
      identifyCode: '',
      identifyCodes: '3456789ABCDEFGHGKMNPQRSTUVWXY',
      message: '',
        rules: {
			userid:[
				{ required: true, message: '请输入用户名', trigger: 'blur' },
			],
			psword:[
				{ required: true, message: '请输入密码', trigger: 'blur' },
			]
		 },
      drawerTitle: '新用户注册',
      drawer: false,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogFormVisible: false,
  	}
  },
  methods:{
    goToRegister(){
      this.$router.push({ path: '/register' });
    },

    keyLogin(ev, formName) {
      if (ev.keyCode === 13) { // 监听回车键
        this.loginIn(formName);
      }
    },
    loginIn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.verifyCode(); // 校验验证码
          if (this.message === '校验成功！') {
            // 执行登录逻辑
            this.doLogin();
          } else {
            // 显示验证码错误信息
            this.message = '验证码错误，请重试。';
          }
        }
      });
    },
    verifyCode() {
      if (this.user.captcha.toUpperCase() === this.identifyCode.toUpperCase()) {
        this.message = '校验成功！';
        console.log(this.message)
      } else {
        this.message = '校验失败，请重试。';
      }
    },
    doLogin() {
      axios.post('http://localhost:3000/user/account/token/', {
        "username": this.user.userid,
        "password": this.user.psword
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          const errorMessage = response.data.error_message;
          console.log(errorMessage)
          if (errorMessage === 'success') {
            console.log("success")
            sessionStorage.loginInfo = JSON.stringify("aaa");
            this.$router.push({ path: '/' });
          } else {
            this.$message.error('登录失败：' + errorMessage);
          }
        })
        .catch(error => {
          this.$message.error('登录失败：' + (error.response ? error.response.data : error.message));
        });
    },
    refreshCode() {
      this.identifyCode = '';
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      this.identifyCode = '';
      for (let i = 0; i < l; i++) {
        this.identifyCode += o[Math.floor(Math.random() * o.length)];
      }
    }
    },
  mounted() {
    this.makeCode(this.identifyCodes, 4); // 组件加载时生成验证码
  },
    watch:{
        loginFlag: {
            handler: function(val) {
                if(this.$store.state.navList.length>0){
                    this.$router.push({path:this.$store.state.navList[0].url});
                }else{
                    this.$message.warning("你没有一个菜单权限！");
                }
            },
            deep: true
        },
    },
}
</script>
