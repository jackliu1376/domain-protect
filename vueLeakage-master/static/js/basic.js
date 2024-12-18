var rootUrl="/iSmacSite/ismacsite";
//超出滚动
function scrollCon(){
	$('.loncom_scroll_con').niceScroll({
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "2px",//以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
}

$(window).resize(function () {
	scrollCon();
});
function numScroll(num){
    $('.numScroll'+num).niceScroll(".numScrollCon"+num,{
        cursorcolor: "#ccc",//#CC0071 光标颜色
        cursoropacitymax: 1, //改变不透明度非常光标处于活动状态（scrollabar“可见”状态），范围从1到0
        touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备
        cursorwidth: "5px", //像素光标的宽度
        cursorborder: "0", // 游标边框css定义
        cursorborderradius: "2px",//以像素为光标边界半径
        autohidemode: true //是否隐藏滚动条
    });
}
//日期格式化
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

function hbarChar(ID,data) {
  var myChart = echarts.init(document.getElementById(ID));

  var option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      nameLocation: 'middle', // 将x轴名称放在轴的末端
      name: '次数'
    },
    yAxis: {
      type: 'category',
      data: ['一级', '二级', '三级', '四级', '五级'],
      name: '警报等级'
    },
    series: [{
      name: '警报数量',
      type: 'bar',
      data: data, // 假设的数据，表示每个警报等级的数量
      barWidth: '60%'
    }]
  };

  myChart.setOption(option, true);
  return myChart;
}

//首页当前告警统计
function piemoreChar(ID, xData, yData, allAlarm, color) {
    var myChart = echarts.init(document.getElementById(ID));
    var _color = ["#00AF5C", "#C5051B", "#A3E8DE", "#579CFF"];
    if (color) {
        for (var i = 0; i < color.length; i++) {
            if (color[i] != "") {
                _color[i] = color[i];
            }
        }
    }
    var option = {
        color: _color,
        title: {
            text: "告警总数：" + allAlarm,
            top: 15,
            left: 15,
            textStyle: {
                color: _color[0],
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)"
        },
        legend: {
            y: 'center',
            orient: 'vertical',
            x: '20px',
            textStyle: {
                color: '#000'
            },
            data: xData
        },
        series: [
            {
                type: 'pie',
                radius: ['70%', '80%'],
                center:['60%','50%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: yData
            }
        ]
    };
    myChart.setOption(option, true);
    return myChart;
}

//权限管理
function serachList(){
    $(".serach_list").find("span").on("click",function(){
        if($(this).hasClass("all")){
            $(".serach_list").find("span").removeClass("active");
            $(this).addClass("active");
        }else{
            if($(".serach_list .all").hasClass("active")){
                $(".serach_list .all").removeClass("active");
            }
            if($(this).hasClass("active")){
                $(this).removeClass("active");
            }else{
                $(this).addClass("active");
            }
        }
    })
}


























