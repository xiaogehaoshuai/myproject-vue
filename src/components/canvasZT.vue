<template>
    <div>
      <div style="width: 600px;height: 600px;background: red;float: left">
        <img src="" id="save_img">
      </div>
      <div style="float: left">
        <div id="functionbtn">
          <input type="button" value="清除画布" class="clear fun" @click="clearb()" />
          <input type="button" value="下载图片" class="downloadImageBtn fun" id="downloadImageBtn" @click="saveAsLocalImage" />
          <a href="" download="canvas_love.png" id="save_href"/>
        </div>
        <div id="penweight">
          <input type="button" value="细" class="thin btn" @click="checkpen(1)" />
          <input type="button" value="中" class="middle btn" @click="checkpen(5)" />
          <input type="button" value="粗" class="bold btn" @click="checkpen(10)" />
          <input type="button" value="橡皮擦" class="eraser btn"   id="eraser" @click="checkeraser()" />
          <input type="button" value="取消橡皮擦" class="uneraser btn" id="uneraser" @click="canceleraser()" />
        </div>
        <canvas id="canvas" width="600px" height="600px" style=""></canvas>
      </div>
    </div>
</template>

<script>
    export default {
        name: "canvasZT",
      data(){
          return {
            drawing:''
          }
      },
      mounted() {
        var canvas = document.getElementById('canvas');
        var cvs = canvas.getContext('2d');
        this.drawing=false;
        function getBoundingClientRect(x,y){
          var box = canvas.getBoundingClientRect();    //获取canvas的距离浏览器视窗的上下左右距离
          return {x:x-box.left,
            y:y-box.top
          }
        }
        canvas.onmousedown = function(e){
          var first = getBoundingClientRect(e.clientX,e.clientY);
          cvs.save();
          cvs.beginPath();
          cvs.moveTo(first.x,first.y);
          this.drawing  = true;
        }
        canvas.onmousemove = function(e){
          if(this.drawing ){
            var move = getBoundingClientRect(e.clientX,e.clientY);
            cvs.save();
            cvs.lineTo(move.x,move.y);
            cvs.stroke()
            cvs.restore()
          }
        }
        canvas.onmouseup = function(){
          this.drawing  = false;
        }
        canvas.onmouseleave = function(){
          this.drawing  = false;
          canvas.onmouseup();
        }
      },
      methods:{
        //清除画布功能
        clearb (){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          cvs.clearRect(0,0,800,800);
        },
        //设置笔的粗细
        checkpen(width){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          cvs.lineWidth = width;

        },
        //设置颜色
        changecolor(pencolor){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          cvs.strokeStyle =pencolor;
        },
        //选中橡皮擦
        checkeraser(){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          document.getElementById("eraser").value = "正在使用...";
          cvs.lineWidth = 20;
          cvs.globalCompositeOperation = "destination-out";
        },

        //取消橡皮擦
        canceleraser(){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          document.getElementById("eraser").value = "橡皮擦";
          cvs.globalCompositeOperation = "destination-over";
          cvs.lineWidth = 1;
        },
        //保存图片
        fn(){
          var canvas = document.getElementById('canvas');
          var cvs = canvas.getContext('2d');
          var penWeight = 0;      //画笔粗细
          var penColor = '';  //画笔颜色
          canvas.onmousedown = function(e){
            /*找到鼠标（画笔）的坐标*/
            var start_x = e.clientX - canvas.offsetLeft + document.body.scrollLeft;
            var start_y = e.clientY - canvas.offsetTop + document.body.scrollTop;

            cvs.beginPath();    //开始本次绘画

            cvs.moveTo(start_x, start_y);   //画笔起始点

            /*设置画笔属性*/
            cvs.lineCap = 'round';
            cvs.lineJoin ="round";
            cvs.strokeStyle = penColor;     //画笔颜色
            cvs.lineWidth = penWeight;      //画笔粗细
            canvas.onmousemove = function(e){

              /*找到鼠标（画笔）的坐标*/
              var move_x = e.clientX - canvas.offsetLeft + document.body.scrollLeft;
              var move_y = e.clientY - canvas.offsetTop + document.body.scrollTop;
              cvs.lineTo(move_x, move_y);     //根据鼠标路径绘画
              cvs.stroke();   //立即渲染
            }
            canvas.onmouseup = function(e){
              cvs.closePath();    //结束本次绘画
              canvas.onmousemove = null;
              canvas.onmouseup = null;
            }
            canvas.onmouseleave = function(){
              cvs.closePath();
              canvas.onmousemove = null;
              canvas.onmouseup = null;
            }
          }

          var dlButton = document.getElementById("downloadImageBtn");
          this.bindButtonEvent(dlButton,"click",this.saveAsLocalImage())
        },

        bindButtonEvent(element, type, handler) {
          if(element.addEventListener) {
            element.addEventListener(type, handler, false);
          } else {
            element.attachEvent('on'+type, handler);
          }
        },
        saveAsLocalImage () {

          var svaeHref = document.getElementById("save_href");
          var img = document.getElementById("save_img");
          var tempSrc = canvas.toDataURL("image/png");
          svaeHref.href=tempSrc;
          img.src=tempSrc;
          console.log(this.dataURLtoFile(tempSrc,'m'))
          // var myCanvas = document.getElementById("canvas");
          // var image = canvas.toDataURL("image/png")
          // var img = document.getElementById("save_img");
          // myCanvas.href=image;
          // img.src=image;

          //window.location.href=image;
        },
        // 将base64转换为文件
        dataURLtoFile (dataurl, filename) {
          let arr = dataurl.split(',')
          let mime = arr[0].match(/:(.*?);/)[1]
          let bstr = atob(arr[1])
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          return new File([u8arr], filename, { type: mime })
        }
    }
    }
</script>

<style scoped>
  #canvas{
    border: 2px purple solid;
    background-color: white;
  }
  .item{
    width: 80px;
    height: 70px;
  }
  .btn{
    width: 100px;
    height: 45px;
  }
  .fun{
    width: 100px;
    height: 55px;
  }
</style>
<style>
  @import "../../css/draw.css";
</style>
