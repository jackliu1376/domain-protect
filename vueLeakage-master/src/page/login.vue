
<template>
  <div class="login-container">
    <!-- 左侧背景 -->
    <div class="login-bg"></div>

    <!-- 右侧表单 -->
    <div class="login-form">
      <div class="form-wrapper">
        <div class="loncom_logo_img"></div>
        <div class="loncom_logo_text">欢迎回来</div>
        <p class="sub-title">请输入账号和密码</p>
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
            <div class="slider-verify" :class="sliderClass">
              <div class="slider-track" :style="trackStyle">
                <div
                  class="slider-button"
                  :style="buttonStyle"
                  @mousedown="startDrag"
                >
                  <i class="el-icon-d-arrow-right"></i>
                </div>
              </div>
              <span class="slider-text">{{ sliderText }}</span>
            </div>
            <div class="action-container">
              <el-button
                type="primary"
                class="login-btn"
                @click="loginIn('userName')">
                登录
              </el-button>

              <div class="register-link">
                <span>没有账号？</span>
                <a @click="goToRegister">立即注册</a>
              </div>
            </div>
          </el-form>

        </div>

      </div>
    </div>

  </div>
</template>

<style>
.login-container {
  display: flex;
  height: 100vh;
}

/* 左侧背景区域 */
.login-bg {
  flex: 1;
  background: url(../../static/images/12.png) no-repeat center center;
  background-size: cover;
}

/* 右侧表单区域 */
.login-form {
  width: 660px;
  display: flex;
  min-height: 100vh; /* 增加全屏高度 */
  padding: 40px 0; /* 增加上下间距 */
  align-items: center;
  justify-content: center;
  background: #fff;
}

.form-wrapper {
  width: 460px;
  padding: 40px;
}

/* 保留原有表单样式 */
.loncom_logo_img {
  width: 60px;
  height: 60px;
  margin: 0 auto;
  background: url(../../static/images/1.png) no-repeat center center;
  background-size: contain;
}

.sub-title {
  margin-bottom: 16px;
}

.loncom_logo_text {
  text-align: left;
  font-size: 32px;
  color: #0d1833;
  font-weight: bold;
  margin: 10px 0;
}

.loncom_login_input input {
  height: 50px; /* 增加高度 */
  padding-left: 20px;
  font-size: 16px; /* 增大字体 */
  border-radius: 6px; /* 微调圆角 */
}

.loncom_login_input .loncom_user:after,
.loncom_login_input .loncom_pass:after {
  content: "";
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0;
  background-repeat: no-repeat;
  background-position: 10px center;
}

.loncom_login_input .loncom_user:after {
  /* background-image: url(../../static/images/login_user.png) !important; */
}

.loncom_login_input .loncom_pass:after {
  /* background-image: url(../../static/images/login_pass.png) !important; */
}

.loncom_buttons {
  display: flex;
  justify-content: space-between;
}

.loncom_buttons .el-button {
  width: 48%;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
}

/* 验证码区域 */
.loncom_captcha {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.loncom_captcha .el-form-item {
  flex: 1.5;
}

.slider-verify {
  display: flex;
  align-items: center; /* 垂直居中 */
  margin: 25px 0;
}

.slider-track {
  height: 40px;
  background: #aaacb1;
  border-radius: 20px;
  position: relative;
  width: 300px;
  flex: 1; /* 让滑块轨道占据剩余空间 */
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: flex-start; /* 水平起始位置 */
}

.slider-button {
  position: absolute;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(159, 4, 4, 0.1);
  cursor: grab;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: left 0.1s;
}

.slider-button i {
  transform: rotate(90deg);
  color: #199ED8;
}

.slider-track::after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: #199ED8;
  border-radius: 20px;
  width: 0;
  transition: width 0.3s;
}

.slider-text {
  display: inline-block; /* 使文本不独占一行 */
  margin-left: 10px; /* 与滑块轨道保持一定距离 */
  color: #666;
}

.slider-verified .slider-track::after {
  background: #4CAF50; /* 绿色 */
  width: 100%;
}

.slider-verified .slider-button {
  background: #4CAF50; /* 绿色 */
}

.slider-verified .slider-button i {
  color: #fff; /* 白色文字 */
}

/* 调整已有样式 */
.action-container {
  margin-top: 30px;
}

.login-btn {
  width: 100%;
  height: 50px;
  font-size: 16px;
  border-radius: 4px;
  background: #199ED8;
  border-color: #199ED8;
}

.login-btn:hover {
  background: #147cad;
  border-color: #147cad;
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: #606266;
}

.register-link a {
  color: #199ED8;
  cursor: pointer;
  margin-left: 5px;
}

.register-link a:hover {
  text-decoration: underline;
}
.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}

.remember-forgot .el-checkbox {
  display: flex;
  align-items: center;
}

.remember-forgot a {
  color: #199ED8;
  cursor: pointer;
}

.remember-forgot a:hover {
  text-decoration: underline;
}
</style>

<script>
import SIdentify from './identify.vue'
var axios = require('axios');
export default {
  components: { SIdentify },
  created() {
  },
  data() {
    return {
      loginFlag: false,
      user: {
        userid: "",
        psword: "",
        captcha: "" // 用户输入的验证码
      },
      identifyCode: '',
      identifyCodes: '3456789ABCDEFGHGKMNPQRSTUVWXY',
      message: '',
      rules: {
        userid: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        psword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ]
      },
      drawerTitle: '新用户注册',
      drawer: false,
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      dialogFormVisible: false,
      isDragging: false,
      sliderLeft: 0,
      maxWidth: 305, // 滑块轨道宽度
      isVerified: false
    }
  },
  methods: {
    goToRegister() {
      this.$router.push({ path: '/register' });
    },

    keyLogin(ev, formName) {
      if (ev.keyCode === 13) { // 监听回车键
        this.loginIn(formName);
      }
    },
    startDrag(e) {
      // 获取滑块轨道元素的固定位置
      const track = this.$el.querySelector('.slider-track')
      this.trackRect = track.getBoundingClientRect()

      this.isDragging = true
      document.addEventListener('mousemove', this.onDrag)
      document.addEventListener('mouseup', this.stopDrag)
    },
    onDrag(e) {
      if (!this.isDragging) return

      // 使用轨道固定位置计算
      let newLeft = e.clientX - this.trackRect.left - 20
      console.log('newLeft:', newLeft); // 20是滑块半径
      newLeft = Math.max(0, Math.min(newLeft, this.maxWidth))

      // 使用滑块宽度计算阈值
      const sliderWidth = 40
      console.log('sliderWidth:', sliderWidth); // 与CSS中的滑块宽度一致
      if (newLeft >= this.maxWidth - sliderWidth) {
        this.isVerified = true
        this.sliderLeft = this.maxWidth - sliderWidth // 确保完全对齐
        this.stopDrag()
        return
      }

      this.sliderLeft = newLeft
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.onDrag)
      document.removeEventListener('mouseup', this.stopDrag)

      if (!this.isVerified) {
        this.sliderLeft = 0
      }
    },
    loginIn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.isVerified) {
          this.doLogin();
          // 原有登录逻辑
        } else if (!this.isVerified) {
          this.$message.error('请完成滑块验证')
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
  computed: {
    trackStyle() {
      return {
        width: this.isVerified ? '100%' : this.sliderLeft + 'px'
      }
    },
    buttonStyle() {
      return {
        left: this.isVerified ? this.maxWidth - 28 + 'px' : this.sliderLeft + 'px'
      }
    },
    sliderText() {
      return this.isVerified ? '验证通过' : '按住滑块拖动'
    },
    sliderClass() {
      return this.isVerified ? 'slider-verified' : '';
    }
  },
  mounted() {
    this.makeCode(this.identifyCodes, 4); // 组件加载时生成验证码
  },
  watch: {
    loginFlag: {
      handler: function(val) {
        if (this.$store.state.navList.length > 0) {
          this.$router.push({ path: this.$store.state.navList[0].url });
        } else {
          this.$message.warning("你没有一个菜单权限！");
        }
      },
      deep: true
    },
  },
}
</script>
```

这样，滑块验证通过后，滑块和滑块轨道的颜色会变成绿色，并且滑块内的图标颜色会变成白色。同时，“按住滑块拖动”文本会在滑块上显示并且不独占一行。
