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
                        <p><i></i>池塘总数</p>
                        <span id="ConnectStationCount">11</span>
                    </div>
                    <div class="index_top_left_box">
                        <p><i></i>养殖品种数</p>
                        <span id="PowerCount">11</span>
                    </div>
                    <div class="index_top_left_box">
                        <p><i></i>健康池塘数</p>
                        <span id="BatteryCount">11</span>
                    </div>
                    <div class="index_top_left_box">
                        <p><i class="danger"></i>危险池塘数</p>
                        <span id="TemperatureCount" class="danger">11</span>
                    </div>
                </div>
              <div class="loncom_fr">
                <div class="input-button-group">
                  <el-input
                    v-model="input2"
                    style="width: 240px"
                    placeholder="输入需要预测的域名"
                  />
                  <el-button type="primary" @click="performSearch">搜索</el-button>
                  <el-button type="primary" id="start-btn" v-if="!isDetecting" @click="real_time_detect">启动实时检测</el-button>
                  <el-button type="primary" class="stop" id="stop-btn" v-if="isDetecting" @click="stop_real_time_detect">停止实时检测</el-button>
                </div>
              </div>
            </div>
        </div>

        <div class="index index_box3 index_box3_1">
            <div class="echartbox boxshow">
                <div class="echart_left">
                    <div class="echartbox_title">
                        告警统计(按区域)
                    </div>
                    <div class="echartbox_con" id="barChar"></div>
                </div>
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
              <th>等级</th>
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

.stop {
  background-color: #f44336;
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
  align-items: center; /* 垂直居中对齐 */
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
        display: flex;
        flex-direction: row-reverse;
        padding-top: 1px;
    }
    .index_box3_1{
        float:left;
        height: calc(100% - 130px);
    }
    .index_box3_2{
        float:left;
        height: calc(100% - 130px);
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
    .index_center_title{
        height: 30px;
        line-height:25px;
        color:#000;
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
    .echart_right{
        width: 200%;
        height: 50%;
        float: right;
        border-left: 1px solid #eaeaea;
    }
    .echartbox_title{
        width: 100%;
        height: 35px;
        line-height:35px;
        text-indent: 15px;
        color:#000;
    }
    .echartbox_con{
        width: 100%;
        height: calc(100% - 50px);
    }
</style>
<script>
import Search from "el-table-pagination/packages/search";
import { io } from 'socket.io-client';

var axios = require('axios')
export default {
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
        var myDate = new Date();
        var theDate=myDate.Format("yyyy年MM月dd日");
        $("#myDate").html(theDate);
        var str = "星期" + "日一二三四五六".charAt(new Date().getDay());
        $("#week").html(str);

        hbarChar("barChar")

        var xData=["PH值","溶解氧","水位","温度"]
        var yData=[
            { value: 5, name: "PH值" },
            { value: 5, name: "溶解氧"},
            { value: 2, name: "水位" },
            { value: 6, name: "温度"}
            ]
        var allAlarm= 18;
        piemoreChar("piemoreChar",xData,yData,allAlarm)


    },
    data() {
       return {
         input2: '',
         domainList: [
         ],
         socket: null,
         realTimeData: null,
         newDomain: {},
         isDetecting: false

       }
   },
    methods:{
      real_time_detect() {
        this.isDetecting = !this.isDetecting;
        // 将输入框中的值发送给后台
        axios.get('http://localhost:5000/start_realtime_detection')
          .then(response => {
            // 处理响应
            console.log(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
          });
        this.socket = io('http://localhost:5000'); // 确保使用正确的协议和端口
        this.socket.on('connect', () => {
          console.log('WebSocket connection established');
        });
        this.socket.on('dns_query_result', (data) => {
          this.newDomain = { num: data.domain, res: data.result, time: '', level: '' };
          this.domainList.unshift(this.newDomain); // 将新人员添加到数组的最前面
        });
      },
      stop_real_time_detect(){
        this.isDetecting = !this.isDetecting;
        // 将输入框中的值发送给后台
        axios.get('http://localhost:5000/stop_realtime_detection')
          .then(response => {
            // 处理响应
            console.log(response.data);
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
          });

      },

      performSearch() {
        // 将输入框中的值发送给后台
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
          })
          .catch(error => {
            // 处理错误
            console.error('Error:', error);
          });
      }
    },
    components:{}
}
</script>
