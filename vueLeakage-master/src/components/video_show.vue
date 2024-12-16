<template>
  <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="500px" :append-to-body="true" center>
    <div class="loncom_dialog_con" style="display: flex; justify-content: center; align-items: center; height: 300px; overflow:hidden;">
      <!-- 头像容器 -->
      <div class="avatar-container">
        <!-- 头像 -->
        <img :src="dialogInfo.imageSrc" alt="Preview Avatar" class="preview-avatar" />
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: ['dialogInfo','imageSrc'],
  data() {
    return {
      // 头像的URL，这里需要替换成实际的头像URL
      //imageSrc: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202107%2F19%2F20210719150601_4401e.thumb.1000_0.jpg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1685017530&t=eaf36530f8ef00861e3da301dac72b60',
    };
  },
  mounted() {
    // 可以在这里添加代码来动态设置头像的URL
  },
  methods: {
    // 可以在这里添加方法来处理头像的点击事件或其他交互
  },
};
</script>

<style>
.avatar-container {
  width: 100%;
  max-width: 200px; /* 指定头像的最大宽度 */
  height: 100%;
  max-height: 200px; /* 指定头像的最大高度 */
  position: relative;
  overflow: hidden;
}

.preview-avatar {
  width: 100%; /* 使图片宽度填满容器 */
  height: 100%; /* 使图片高度填满容器 */
  object-fit: cover; /* 裁剪图片以填充容器 */
  border-radius: 50%; /* 使头像显示为圆形 */
}
</style>
