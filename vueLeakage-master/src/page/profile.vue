<template>
  <div class="user-profile">
    <div class="user-profile-con">
      <div class="user-profile-header">
        <img :src="user.avatar" alt="User Avatar" class="user-avatar">
        <h2>{{ user.name }}</h2>
      </div>
      <div class="user-profile-content">
        <p>欢迎回来，{{ user.name }}！</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  data() {
    return {
      user: {
        name: '', // 用户名
        avatar: '' // 用户头像
      }
    };
  },
  created() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      // 假设的API调用，你需要替换成实际的API
      const apiUser = {
        name: 'admin',
        avatar: 'static/images/head.png' // 默认头像路径
      };
      // 模拟API请求
      setTimeout(() => {
        this.user = apiUser;
      }, 1000);
    }
  }
};
</script>

<style scoped>
.user-profile {
  width: 350px;
  height: 420px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #199ED8 url('../../static/images/login_bg.png') no-repeat right bottom;
  background-size: cover;
  padding: 20px 25px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保内容在水平方向上居中 */
  justify-content: center; /* 确保内容在垂直方向上居中 */
  text-align: center; /* 确保文本居中 */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 添加动画效果 */
  animation: slideIn 0.5s ease-out forwards; /* 添加滑入效果 */
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.user-profile:hover {
  transform: translate(-50%, -50%) scale(1.05); /* 鼠标悬停时放大 */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* 鼠标悬停时阴影加深 */
}

.user-profile-con {
  display: flex;
  flex-direction: column;
  align-items: center; /* 确保头像和用户名在水平方向上居中 */
  margin-bottom: 20px;
}

.user-profile-header img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #fff;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.user-profile-header h2 {
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
}

.user-profile-content p {
  color: #fff;
  font-size: 16px;
}
</style>
