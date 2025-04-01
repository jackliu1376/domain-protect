<template>
    <div class="loncom_content">
       <div class="index index_box1">
            <div class="index_top boxshow">
                <div class="loncom_fl">
                    <div class="index_top_left_title">
                        <p>
                            <i></i><span>今日数据</span>
                        </p>
                        <div id="myDate"></div>
                        <div id="week"></div>
                    </div>
                    <div class="index_top_left_box">
                        <p><i class="total"></i>检测总数</p>
                        <span id="ConnectStationCount" class="total">{{ totalCountStr }}</span>
                    </div>
                    <div class="index_top_left_box">
                        <p><i></i>正常域名数</p>
                        <span id="BatteryCount">{{ normalCountStr }}</span>
                    </div>
                    <div class="index_top_left_box">
                        <p><i class="danger"></i>危险域名数</p>
                        <span id="TemperatureCount" class="danger">{{ maliciousCountStr }}</span>
                    </div>
                </div>
              <div class="loncom_fr">
                <div>
                  <!-- 按钮 -->
                  <el-button :disabled="isButtonDisabled_1" type="primary" onclick="window.location='http://127.0.0.1:5002/download-file'">下载结果报告</el-button>
                  <el-button :disabled="isButtonDisabled" type="primary" @click="stop_detection">停止检测</el-button>
                  <el-button type="primary" v-if="!isDetecting_1" @click="showModal = true">上传文件</el-button>
                  <el-button type="primary" v-if="isDetecting_1" @click="filePredict">开始检测</el-button>
                  <el-button :disabled="isButtonDisabled_1" type="success" @click="saveData">保存</el-button>
                  <div v-if="fileName" class="file-selected">
                    {{ fileName }}<span class="delete" @click="clearFile">&times;</span>
                  </div>
                  <!-- 弹窗 -->
                  <transition name="modal">
                    <div v-if="showModal" class="modal">
                      <div class="modal-content">
                        <span class="close" @click="showModal = false">&times;</span>
                        <h2>上传文件</h2>
                        <input type="file" @change="handleFileUpload" />
                        <el-button type="primary" @click="uploadFile">上传</el-button>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>
              <div class="loncom_fl">
                <div class="input-button-group">
                  <el-input
                    v-model="input2"
                    style="width: 240px"
                    placeholder="输入需要预测的域名"
                  />
                  <el-button type="primary" @click="performSearch">预测</el-button>
                </div>
                <div v-if="searchResult === 1" class="status-indicator green">正常域名</div>
                <div v-else-if="searchResult === 2" class="status-indicator red">危险域名</div>
                <div v-else class="status-indicator">正在验证...</div>
              </div>
              <div class="loncom_fl" style="margin-left: 15px">
                <el-button type="primary" id="start-btn" v-if="!isDetecting" @click="realTimeDetect">启动实时检测</el-button>
                <el-button type="primary" class="stop" id="stop-btn" v-if="isDetecting" @click="stopRealTimeDetect">停止实时检测</el-button>
              </div>
              <div class="loncom_fl" style="margin-left: 15px">
                <el-select v-model="selectedModel" placeholder="请选择模型" @change="handleModelChange">
                  <el-option label="模型一" value="model1"></el-option>
                  <el-option label="模型二" value="model2"></el-option>
                </el-select>
<!--                <el-button type="primary" @click="performSearch">预测</el-button>-->
              </div>
            </div>
        </div>

        <div class="index index_box3_1 index_box4">
            <div class="echartbox boxshow">
                <div class="echart_left">
                    <div class="echartbox_title">
                        告警统计(按等级)
                    </div>
                    <div class="echartbox_con" id="barChar"></div>
                </div>
            </div>
            <div class="echartbox boxshow">
                <div class="echart_left">
                    <div class="echartbox_title">
                        当前告警统计
                    </div>
                    <div class="echartbox_con" id="piemoreChar"></div>
                </div>
            </div>
         </div>

      <div class="index index_box3 index_box3_2">
        <div class="boxshow_2">
          <div class="table-container">
          <table class="scrollable-table">
            <thead>
            <tr>
              <th>域名</th>
              <th>检测结果</th>
              <th>时间</th>
              <th>模型版本</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(domain, index) in domainList" :key="index">
              <td>{{ domain.num }}</td>
              <td>{{ domain.res }}</td>
              <td>{{ domain.time }}</td>
              <td>{{ domain.level }}</td>
            </tr>
            <!-- 更多行数据 -->
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
.status-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px; /* 与el-input的高度一致 */
  border-radius: 4px;
  color: white;
  font-size: 14px;
  padding: 0 10px; /* 增加一些内边距 */
  margin-top: 10px;
}
.green {
  background-color: #00AF5C;
}
.red {
  background-color: #C5051B;
}
.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000; /* 增加z-index以确保弹窗在最上层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  position: relative; /* 确保内容在弹窗内相对定位 */
  z-index: 1001; /* 确保内容在弹窗内层级最高 */
}

.close, .delete {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.file-selected {
  display: flex;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.stop {
  background-color: #C5051B;
}
.table-container {
  max-height: 650px; /* 根据需要调整最大高度 */
  overflow-y: scroll; /* 垂直方向上的滚动条 */
  width: 100%; /* 根据需要调整宽度 */
}

.scrollable-table {
  width: 100%;

  border-collapse: collapse;
}
.scrollable-table thead {
  background-color: #f5f7fa;
}

.scrollable-table th,
.scrollable-table td {
  width: 264px;
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

.input-button-group {
  display: flex; /* 使用Flexbox布局 */
}
    .index{
        padding: 15px;
        box-sizing:border-box;
    }
    .index_box1{
        height: 160px;
    }
    .index_box2{
        height: 260px;
    }
    .index_box3{
        width: 70%;
        display: flex;
        flex-direction: row-reverse;
        padding-top: 1px;
    }
    .index_box3_1{
        width: 30%;
        margin-top: -12px;
        float:left;
        height: calc(100% - 110px);
    }
    .index_box3_2{
        float:left;
        margin-left: -12px;
        height: calc(100% - 130px);
    }
.index_box4{
  float:left;
  height: calc(100% - 470px);
}
.index_box3_2:after {
  content: "";
  display: table;
  clear: both;
}
    .boxshow{
      background: #fff;
      width: 100%;
      /* 移除高度设置，避免限制表格高度 */
      box-shadow: 0 0 6px #dadada;
      border-radius: 5px;
    }
.boxshow_2{
  background: #fff;
  width: 100%;
  /* 移除高度设置，避免限制表格高度 */
  box-shadow: 0 0 6px #dadada;
  border-radius: 5px;
}
    .index_top{
        width: 100%;
        height: 130px;
        padding: 15px;
    }
    .index_top_left_title{
        float:left;
        height: 100%;
        font-size: 16px;
        border-right:1px solid #e4e4e4;
    }
    .index_top_left_title p{
        width: 160px;
        height: 25px;
        line-height: 25px;
        font-size: 14px;
        margin-bottom: 10px;
        color:#000;
    }
    .index_top_left_title p i{
            width: 12px;
        height: 12px;
        display: block;
        border: 3px solid #00AF5C;
        border-radius: 50%;
        float: left;
        margin: 7px 5px 0 0;
    }
    .index_top_left_title p span{
        display:block;
        float:left;
    }
    #week{
        font-size:20px;
    }
    .index_top_left_box{
        width: 147px;
        float:left;
        height: 100%;
        text-align:center;
    }
    .index_top_left_box p,
    .index_top_right_box p{
        margin: 10px 0 5px 0;
    }
    .index_top_left_box p i,
    .index_top_right_box p i{
        width: 7px;
        height: 7px;
        display:inline-block;
        border-radius: 50%;
        background:#fff;
        margin: 0 5px 0 10px;
    }
    .index_top_left_box p i{
        background:#00AF5C;
    }
.index_top_left_box p i.total{
  background: #b51da1;
}
    .index_top_left_box p i.danger{
        background:#C5051B;
    }
    .index_top_left_box span,
    .index_top_right_box span{
        font-size: 40px;
        font-weight:bold;
        width: 100%;
        text-align: center;
        display: block;
    }
    .index_top_left_box span{
        color:#00AF5C;
    }
.index_top_left_box span.total{
  color: #b51da1;
}
    .index_top_left_box span.danger{
        color:#C5051B;
    }
    .index_center li{
        width: 33.33%;
        float:left;
        padding-right: 15px;
    }
    .index_center_con dt{
        border-bottom: 2px solid #d3e3ef;
        overflow:hidden;
        height: 35px;
        line-height: 35px;
    }
    .index_center_con dd{
        border-bottom: 1px solid #d3e3ef;
        overflow:hidden;
        height: 35px;
        line-height: 35px;
    }

    .index_center_con1 i{
        font-style: normal;
        width: 60px;
        margin-top: 8px;
        height: 20px;
        line-height:20px;
        text-align:center;
        color:#fff;
        background:#00cc66;
        display:block;
    }
    .index_center_con1 .alarm{
        color:#ff0000;
    }
    .index_center_con1 .alarm i{
        background: #ff0000;
        color:#fff;
    }

    .echartbox,.body_con{
        display: flex;
        flex-direction: column-reverse;
        width: 100%;
        height: 100%;
    }
    .echart_left{
        width: 200%;
        height:100%;
        float: left;
    }
    .echartbox_title{
        width: 100%;
        height: 35px;
        line-height:35px;
        text-indent: 15px;
        color:#000;
    }
    .echartbox_con{
        width: 480px;
        height: calc(100% - 100px);
    }
</style>
<script>
import Search from "el-table-pagination/packages/search";
import { io } from 'socket.io-client';

var axios = require('axios')
export default {
  data() {
    return {
      input2: '',
      domainList: [
      ],
      isDetecting_1: false,
      isDetecting_2: false,
      token: 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI4M2FiNWM5N2M2Nzc0N2YwYmY1NTRlYTEwOGYzNmQ5NyIsInN1YiI6IjIyIiwiaXNzIjoic2ciLCJpYXQiOjE3NDMyMzUxNDcsImV4cCI6MTc0NDQ0NDc0N30.tocsab416bzBkZAYWgrqgn5a-5XEfPiAJJ6KAtoP85I',
      socket: null,
      realTimeData: null,
      newDomain: {},
      isDetecting: false,
      showModal: false,
      selectedFile: null,
      fileName: '',
      isButtonDisabled: true,
      isButtonDisabled_1: true,
      searchResult: 0, // 搜索结果，true表示有效，false表示无效
      totalCountStr: 0,
      normalCountStr: 0,
      maliciousCountStr: 0,
      connectStationCount: 0,
      timestamp: null,
      sumData: [0,0,0,0,0],
      selectedModel: 'model1'
    }
  },
  computed: {
    Search() {
      return Search
    }
  },
    created () {
        axios.get('static/config.json').then(r=>{
            console.log(r)
        });

    },
    mounted() {
        axios.get('http://localhost:3000/api/domain-analysis/result',{
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
          .then(response => {
            console.log(response.data);
            this.totalCountStr = response.data.totalCountStr;
            this.normalCountStr = response.data.normalCountStr;
            this.maliciousCountStr = response.data.maliciousCountStr
            ;
            var xData=["危险","正常"]
            var yData=[
              { value: this.normalCountStr, name: "正常"},
              { value: this.maliciousCountStr, name: "危险" },
            ]
            console.log( this.maliciousCountSt);
            var allAlarm= this.totalCountStr;
            piemoreChar("piemoreChar",xData,yData,allAlarm)
          })
        // console.log(this.normalCountStr);
        var myDate = new Date();
        var theDate=myDate.Format("yyyy年MM月dd日");
        $("#myDate").html(theDate);
        var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
        $("#week").html(str);

        hbarChar("barChar",this.sumData)

    },
    methods:{
      // 处理模型变更
      handleModelChange(newModel) {
        this.selectedModel = newModel;
      },
      handleFileUpload(event) {
        this.selectedFile = event.target.files[0];
        if (this.selectedFile) {
          this.fileName = this.selectedFile.name; // 设置文件名称
        }
      },
      uploadFile() {
        if (this.selectedFile) {
          const formData = new FormData();
          formData.append('file', this.selectedFile);
          // 这里使用axios进行文件上传，你需要安装axios并导入
          // import axios from 'axios';
          axios.post('http://127.0.0.1:5002/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
            .then(response => {
              console.log('文件上传成功', response);
              this.$message.success('文件上传成功');
              this.isDetecting_1 = !this.isDetecting_1;
              // 处理上传成功的逻辑
            })
            .catch(error => {
              console.error('文件上传失败', error);
              // 处理上传失败的逻辑
            })
            .finally(() => {
              this.selectedFile = null;
              this.showModal = false;
            });
        } else {
          alert('请先选择一个文件');
        }
    },
      filePredict(){
        this.isButtonDisabled = false; // 满足条件，按钮可点击
        const url = this.selectedModel === 'model1' ? 'http://127.0.0.1:5001/batch_detect' : 'http://127.0.0.1:5004/kongbatch_detect';
        console.log(url)
        axios.get(url)
          .then(response => {
            console.log('文件检测完成', response);
            this.isButtonDisabled = true; // 满足条件，按钮可点击
            this.isButtonDisabled_1 = false; // 满足条件，按钮可点击
            this.$message.success('预测完成');
            // 处理上传成功的逻辑
          })
          .catch(error => {
            console.error('请求失败:', error);
            this.$message.error('请求失败，请检查网络连接或服务器状态'); // 显示错误提示
          });

      },
      clearFile() {
        axios.get('http://127.0.0.1:5002/delete')
          .then(response => {
            console.log('文件删除成功', response);
          })
        this.selectedFile = null;
        this.fileName = ''; // 清除文件名称
        this.isDetecting_1 = !this.isDetecting_1;
        this.isButtonDisabled_1=true
      },
      realTimeDetect() {
        this.isDetecting = !this.isDetecting;
        this.startRealTimeDetectionByModel(this.selectedModel);
      },
      stopRealTimeDetect() {
        this.isDetecting = !this.isDetecting;
        this.stopRealTimeDetectionByModel(this.selectedModel);
      },
      startRealTimeDetectionByModel(model) {
        const url = model === 'model1' ? 'http://localhost:5000/start_realtime_detection' : 'http://localhost:5005/start_realtime_detection';
        axios.get(url)
          .then(response => {
            console.log(response.data);
            // 处理响应
          })
          .catch(error => {
            console.error('Error:', error);
            // 处理错误
          });
        this.socket = model === 'model1' ?io('http://localhost:5000'):io('http://localhost:5005'); // 确保使用正确的协议和端口
        this.socket.on('connect', () => {
          console.log('WebSocket connection established');
        });
        this.socket.on('dns_query_result', (data) => {
          this.timestamp = new Date().getTime();
          const date = new Date(this.timestamp);
          const readableDate = date.toLocaleString();
          console.log(readableDate);
          if(data.result==="恶意域名"){
            var some = Math.floor(Math.random() * 5) + 1;
            this.sumData[some] += 1;
          }
          this.newDomain = { num: data.domain, res: data.result, time: readableDate, level: model === 'model1' ?'Qing':'Kong' };
          this.domainList.unshift(this.newDomain); // 将新人员添加到数组的最前面
        });
      },
      stopRealTimeDetectionByModel(model) {
        const url = model === 'model1' ? 'http://localhost:5000/stop_realtime_detection' : 'http://localhost:5005/stop_realtime_detection';
        axios.get(url)
          .then(response => {
            // 处理响应
            console.log(this.sumData);
            hbarChar("barChar",this.sumData)
          })
          .catch(error => {
            console.error('Error:', error);
            // 处理错误
          });

      },
      // real_time_detect() {
      //   this.isDetecting = !this.isDetecting;
      //   // 将输入框中的值发送给后台
      //   axios.get('http://localhost:5000/start_realtime_detection')
      //     .then(response => {
      //       // 处理响应
      //       console.log(response.data);
      //     })
      //     .catch(error => {
      //       // 处理错误
      //       console.error('Error:', error);
      //     });
      //   this.socket = io('http://localhost:5000'); // 确保使用正确的协议和端口
      //   this.socket.on('connect', () => {
      //     console.log('WebSocket connection established');
      //   });
      //   this.socket.on('dns_query_result', (data) => {
      //     this.timestamp = new Date().getTime();
      //     const date = new Date(this.timestamp);
      //     const readableDate = date.toLocaleString();
      //     console.log(readableDate);
      //     if(data.result==="恶意域名"){
      //       var some = Math.floor(Math.random() * 5) + 1;
      //       this.sumData[some] += 1;
      //     }
      //     this.newDomain = { num: data.domain, res: data.result, time: readableDate, level: '2.3' };
      //     this.domainList.unshift(this.newDomain); // 将新人员添加到数组的最前面
      //   });
      // },
      // stop_real_time_detect(){
      //   this.isDetecting = !this.isDetecting;
      //   // 将输入框中的值发送给后台
      //   axios.get('http://localhost:5000/stop_realtime_detection')
      //     .then(response => {
      //       // 处理响应
      //       console.log(this.sumData);
      //       hbarChar("barChar",this.sumData)
      //     })
      //     .catch(error => {
      //       // 处理错误
      //       console.error('Error:', error);
      //     });
      // },
      stop_detection(){
        const url = this.selectedModel === 'model1' ? 'http://127.0.0.1:5001/stop_detection' : 'http://127.0.0.1:5004/kongstop_detection';
        console.log(url)
        axios.get(url)
          .then(response => {
            // 处理响应
            console.log(this.sumData);
            this.$message.error('文件检测中断');
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
          });
      },
      // 模型一的预测请求
      performSearchModel1() {
        axios.post('http://localhost:5001/detect', {
          "domain": this.input2,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            // 处理响应
            console.log(response.data);
            if(response.data.prediction === '正常'){
              this.searchResult = 1;
            }else if(response.data.prediction === '恶意'){
              this.searchResult = 2;
            } else {
              this.searchResult = 0;
            }
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
            this.searchResult = 0;
          });
      },

      // 模型二的预测请求
      performSearchModel2() {
        axios.post('http://localhost:5004/kongdetect', {
          "domain": this.input2,
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            // 处理响应
            console.log(response.data);
            if(response.data.prediction === '正常'){
              this.searchResult = 1;
            }else if(response.data.prediction === '恶意'){
              this.searchResult = 2;
            } else {
              this.searchResult = 0;
            }
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
            this.searchResult = 0;
          });
      },
      saveData() {
        // 发送 POST 请求
        axios.post('http://localhost:3000/api/file/saveContents', {
          headers: {
            'Authorization': `Bearer ${this.token}`
          }
        })
          .then(response => {
            console.log('数据保存成功', response);
            this.$message.success('数据保存成功');
          })
          .catch(error => {
            console.error('数据保存失败', error);
            this.$message.error('数据保存失败');
          });
      },
      performSearch() {
        // // 将输入框中的值发送给后台
        // axios.post('http://localhost:5004/kongdetect', {
        //   "domain": this.input2,
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // })
        //   .then(response => {
        //     // 处理响应
        //     console.log(response.data);
        //     if(response.data.prediction === '正常'){
        //       this.searchResult = 1;
        //     }else if(response.data.prediction === '恶意'){
        //       this.searchResult = 2;
        //     } else {
        //       this.searchResult = 0;
        //     }
        //   })
        //   .catch(error => {
        //     // 处理错误
        //     console.error('Error:', error);
        //     this.searchResult = 0;
        //   });
        if (this.selectedModel === 'model1') {
          this.performSearchModel1();
        } else if (this.selectedModel === 'model2') {
          this.performSearchModel2();
        }
      }
    },
    components:{}
}
</script>
