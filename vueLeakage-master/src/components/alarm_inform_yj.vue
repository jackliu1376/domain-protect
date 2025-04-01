<template>
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.visible" width="600px" :append-to-body='true'>
        <el-scrollbar style="height:350px;" class="loncom_scrollbar">
            <div class="loncom_dialog_con">
                <el-form :model="form_info" :rules="formRules" ref="formInfo" label-width="120px">
                    <el-form-item prop="user" label="邮箱号">
                            <el-input v-model="form_info.user" size="small" placeholder="请输入邮箱号"></el-input>
                        </el-form-item>
                    <el-form-item prop="password" label="邮箱授权码">
                        <el-input v-model="form_info.password" size="small" placeholder="请输入邮箱授权码"></el-input>
                    </el-form-item>
                    <el-form-item prop="smtp_addr" label="服务器域名">
                        <el-input v-model="form_info.smtp_addr" size="small" placeholder="请输入服务器域名"></el-input>
                    </el-form-item>
                    <el-form-item prop="pop_addr" label="收件人地址">
                        <el-input v-model="form_info.pop_addr" size="small" placeholder="请输入收件人地址"></el-input>
                    </el-form-item>
                    <el-form-item prop="smtp_port" label="SMTP端口">
                        <el-input v-model="form_info.smtp_port" size="small" placeholder="请输入SMTP端口" disabled></el-input>
                    </el-form-item>


                </el-form>
            <!--结束-->
            </div>
        </el-scrollbar>
        <dialogBtnInfo v-bind:dialogInfobtn="dialogInfo" v-on:dialogSure="dialogSure('formInfo')"></dialogBtnInfo>
    </el-dialog>
</template>
<style>

</style>
<script>
var axios = require('axios');
import dialogBtnInfo from './dialogBtnInfo.vue'
export default {
    created () {

    },
    mounted() {

    },
    data() {

        return {
            form_info:{
                user:'',
                password:'',
                smtp_addr:'smtp.qq.com',
                smtp_port:'465',
                pop_addr:'',
            },
            //验证规则
            formRules:{
                user:[
                    { required: true, message: '请输入邮箱号', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入邮箱授权码', trigger: 'blur' }
                ],
                smtp_addr:[
                    { required: true, message: '请输入服务器域名', trigger: 'blur' }
                ],
                smtp_port:[
                    { required: true, message: '请输入SMTP端口', trigger: 'blur' }
                ],
                pop_addr:[
                    { required: true, message: '请输入收件人地址', trigger: 'blur' }
                ],

           },
          token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJlZTkzYWQ5NjRmZmQ0OGYwOGY4MGMyOWQ4ZTgxM2JhZCIsInN1YiI6IjIyIiwiaXNzIjoic2ciLCJpYXQiOjE3NDMyMTg2NDgsImV4cCI6MTc0NDQyODI0OH0.sYbGLxm-sEye9slsMyxWcfQjI4l7aVzvCtKQRjsJG-w'

        }
    },
    methods:{
        //保存的操作
      dialogSure() {
        this.$refs.formInfo.validate((valid) => {
          if (valid) {
            // const dataToSend = {
            //   "sendEmail": this.form_info.user,
            //   "sendCode": this.form_info.password,
            //   "receiveEmail": this.form_info.pop_addr
            // };
            // 发送请求到后台
            axios.post('http://localhost:3000/email/add',
              {
                "sendEmail": this.form_info.user,
                "sendCode": this.form_info.password,
                "receiveEmail": this.form_info.pop_addr
              }
            ,{
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${this.token}`
                }})
              .then(response => {
                // 处理响应
                console.log(response);
                this.dialogInfo.visible = false;
                this.$message.success('邮件发送成功！');
              })
              .catch(error => {
                // 处理错误
                console.error('Error:', error);
               // this.$message.error('保存失败，请检查网络或联系管理员！');
              });
            axios.post('http://localhost:5003/sendEmail',
              {
                "receiver_email": this.form_info.pop_addr,
                "sender_email": this.form_info.user,
                "password": this.form_info.password,
                "smtp_server": "smtp.qq.com"
              }
              ,{
                headers: {
                  'Content-Type': 'application/json',
                }})
              .then(response => {
                // 处理响应
                console.log(response);
                this.dialogInfo.visible = false;
                // this.$message.success('邮件发送成功！');
              })
              .catch(error => {
                // 处理错误
                console.error('Error:', error);
                // this.$message.error('保存失败，请检查网络或联系管理员！');
              });
          } else {
            this.$message.error('请检查输入是否正确');
          }
        });
      },

    },

    props:["dialogInfo"],
    components:{dialogBtnInfo}

}
</script>

