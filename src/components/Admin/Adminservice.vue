
<template>
  <div>
    <el-select v-model="value" placeholder="请选择客户姓名" @change="reloadData">
      <el-option
        v-for="(item) in options"
        :key="item"
        :label="item"
        :value="item"
        >
      </el-option>
    </el-select>
    <el-button type="primary" @click="dialogFormVisible=true">点此发布通知</el-button>
    <!--  <Modal title="在线沟通" v-model="chatVisible"-->
    <!--         draggable-->
    <!--         footer-hide-->
    <!--         :width="580" @on-cancel="cancel">-->
    <div class="chat">
      <div class="chat-message-body" id="chatform" @scroll="scroll">
<!--        <Spin v-if="loading">-->
<!--          <Icon type="ios-loading" size=18 class="spin-icon-load"></Icon>-->
<!--        </Spin>-->
        <div dis-hover v-for="(item,index) in data"
             :key="index" class="message-card">
          <div :class="item.author=='true'?'message-row-right': 'message-row-left'">
            <!--            如果是自己就在right，否则left-->
            <img :src="item.author=='true'?service:defualt"
                 height="35" width="35">
            <div class="message-content">
              <!--              item.isOneself == 1-->
              <div :style="item.author=='true'?'text-align:right;display: flex;flex-direction:row-reverse':''">
                {{ item.author=='true'?item.manager:item.consumer }}
                <span class="message-time">
                   {{ item.time }}</span>
              </div>
              <div class="message-body">
                {{ item.contents }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <el-input
        v-model="form.contents"
        type="textarea"
        id="input_class"
        placeholder="主动一点，世界会更大！"
        :rows="4"
      />
    </div>
    <div class="footer-btn">
      <!--      <el-button @click="cancel" type="text">清空</el-button>-->
      <el-button type="primary" @click="sendMsg">发送</el-button>
      <!--      <el-button type="primary" @click="reshow1">重新显示</el-button>-->
    </div>
    <el-dialog title="发布通知" :visible.sync="dialogFormVisible">
      <el-form :model="message_form">
        <el-form-item label="全体通知内容" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            resize="none"
            :autosize="{ minRows: 6, maxRows: 6 }"
            placeholder="请输入通知"
            v-model="message_form.message"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="totalMessage();dialogFormVisible=false">确 定</el-button>
      </div>
    </el-dialog>

  </div>
  <!--  </Modal>  -->
</template>


<script>
// import {listMsg,sendMsg } from ".../api/index"; //@表示src/
import axios from "axios";
let timer;
export default {
  name: "adminservice",
  props: {

  },
  data() {
    return { options: [],value: {
        type: String,
        default: "请选择客户姓名"
      },dialogFormVisible:false,
      formLabelWidth:'200px',message_form:{
      message:""
      },
      chattingname:"",
      chatVisible:this.value,
      loading:false,state1:{},
      defualtAvatar:require('../../assets/default-avatar.svg'), // 后端没有返回头像默认头像，注意：需要用require请求方式才能动态访问本地文件
      data:[],//消息数组
      defualt: require('../../assets/default-avatar.svg'), // 后端没有返回头像默认头像，注意：需要用require请求方式才能动态访问本地文件
      service: require('../../assets/server.svg'),
      distincData:[], // 消息去重数组
      offsetMax:0, // 最大偏移位，记录当前获取的最大id，往后的定时轮询数据时每次只获取比这个id大的数据
      offsetMin:0,  // 最小偏移位，记录当前获取的最小id，往上滑动时每次只获取比这小id大的数据
      searchForm:{ // 每次定时获取数据或首次加载数据提交的form表单数据
        pageNumber: 1,
        pageSize: 20
      },
      form:{ // 发送数据提交数据表单
        content:"",
        msg:""
      },
      timerSwitch:0 // 定时器开关，默认关闭
    };
  },
  methods: {
    init(){
      axios.put("http://" + sessionStorage.getItem('ip') + ":8080/user/service/chatWith/" ,{manager:this.state1.user.name}).then((res)=>{
        this.options=res.data.data;
        console.log(this.options)
      });
    },
    loadMsg() { // 窗体打开默认加载一页数据，窗体什么周期中值运行一次
      this.searchForm.offsetMax = this.offsetMax;
      // let state1=JSON.parse(sessionStorage.getItem("state"));
      // axios.put("http://" + sessionStorage.getItem('ip') + ":8080/user/service/managerHistory",
      //   {"manager": ""}).then(res => {
      //   console.log(res.data)
      //   if (res.data.flag == true) {
      //     res.data.data.forEach(e => {
      //       // 标记最大偏移位
      //       if (this.offsetMax < e.index) {
      //         this.offsetMax = e.index;
      //       }
      //       e.content = JSON.parse(e.content);
      //       this.data.unshift(e)
      //       this.distincData.push(e.index);
      //       // 标记最大偏移位，后端返回数据是逆序，所以最后一条id最新
      //       this.offsetMin = e.index;
      //     });
      //     // 数据加载完成，滚动条滚动到窗体底部
      //     this.scrollToBottom();
      //   }
      // });
    },
    show(){ // 打开窗体初始化数据
      // 初始化数据
      this.data =[];
      this.distincData =[];
      this.offsetMax = 0;
      this.offsetMin = 0;
      this.searchForm.pageNumber = 1;
      this.searchForm.pageSize = 20;
      this.form ={
        content:"",
        msg:""
      };
      // this.loadMsg();
      this.chatVisible = true;
      // 开启定时器
      this.timerSwitch = 1;
      this.reloadData();
    },
    sendMsg() { // 发送消息
      if (!this.form.contents) {
        this.$message.warning("不能发送空白信息");
        return;
      }else if (!this.value==="请选择客户姓名"){
        return;
      }
      // this.data=[]
      console.log(this.value)
      axios.get("http://" + sessionStorage.getItem('ip') + ":8080/user/service/"+this.value+"/"+this.state1.user.name+"/"+
        this.form.contents+"/"+this.state1.user.name).then(res => {
        res.data.data.forEach(e => {
          // 标记最大偏移位
          if (this.offsetMax < e.msgId) {
            this.offsetMax = e.msgId;
          }
          // e.content = JSON.parse(e.content);
          console.log(e, e.content)
          // this.data.push(e)
          this.distincData.push(e.index);
          // 标记最大偏移位，后端返回数据是逆序，所以最后一条id最新
          this.offsetMin = e.index;
          // 收到新消息，判断高度，如果当前滚动条高度距底部小于100，则动滑到底部
          this.scrollToBottom();
        });
      }).catch((error)=> {
        console.log(error)});

    },
    scrollToBottom() { // 滚动到窗体底部
      this.$nextTick(() => {
        let chatform = document.getElementById("chatform");
        chatform.scrollTop = chatform.scrollHeight;
      });
    },
    // 滚动到最上方，取历史数据，根据分页参数取。不用修改偏移标记位，但是需要判重
    scroll() {
      let chatform = document.getElementById("chatform");
      let scrollTop = chatform.scrollTop;
      if (scrollTop === 0) {
        this.loading = true;
        this.searchForm.offsetMin = this.offsetMin;
        this.searchForm.offsetMax = "";
        // axios.put('', this.searchForm).then(res => {
        //   this.loading = false;
        //   this.data=[]
        //   res.data.forEach(e => {
        //     if (this.distincData.indexOf(e.msgId) < 0) {
        //       e.contents = JSON.parse(e.contents);
        //       this.data.push(e);
        //       this.distincData.push(e.index)
        //       // 修改最小偏移位
        //       if (this.offsetMin > e.index) {
        //         this.offsetMin = e.index;
        //       }
        //     }
        //   });
        // });
      }
    },
    reloadData(){
      // 判断定时器开关是否开启，如果开启，则执行定时器
      if(this.timerSwitch){
          let params = {};
          params.pageNumber = 1;
          params.pageSize = 20;
          params.offsetMax = this.offsetMax;
          let that = this;  //指that为this
          //listMsgByOrder
          this.data=[]
          axios.put("http://"+sessionStorage.getItem('ip')+":8080/user/service/managerChattingTo",{manager:this.state1.user.name.toString(),consumer:this.value.toString()}).then(
            (res)=>{
            if (res.data) { //有返回
              res.data.data.forEach(e => {
                // 标记最大偏移位
                if (this.offsetMax < e.index) {
                  this.offsetMax = e.index;
                }
                // e.contents = JSON.parse(e.contents);
                this.data.push(e)
                this.distincData.push(e.msgId);
                // 标记最大偏移位，后端返回数据是逆序，所以最后一条id最新
                this.offsetMin = e.index;

                // 收到新消息，判断高度，如果当前滚动条高度距底部小于100，则动滑到底部
                let chatform = document.getElementById("chatform");
                let gap = chatform.scrollHeight - chatform.scrollTop;
                if (gap > 0 && gap < 400) {
                  this.scrollToBottom();
                }
              });
            }
          });
        }

    },
    cancel(){ // 关闭窗体需要把提示任务开关一起关闭调
      this.chatVisible = false;
      this.timerSwitch = 0;
    },totalMessage(){
      if (this.message_form.message!==""){
        axios.put("http://" + sessionStorage.getItem('ip') + ":8080/user/service/chatAll",{cont:this.message_form.message }).then((res)=>{})
          .catch((error)=> {console.log(error)});
      }
    }
  },
  mounted() {
    console.log("mounted");
    let that=this;
    timer= setInterval(function (){
      that.reloadData();
    },1000*2);
    this.state1=JSON.parse(sessionStorage.getItem("state"));
    this.init();
    this.show()
  },beforeRouteLeave:(to, from, next) => {
    this.timerSwitch=0;
    clearInterval(timer);
    next();
  },
};
</script>

<style scoped lang="less">
.message {
  height: 350px;
}
.ivu-card-body {
  padding:5px;
}
.ivu-modal-body{
  padding: 0px 16px 16px  16px;
}
.chat-message-body {
  background-color:#F8F8F6;
  width:545px;
  height: 350px;
  overflow: auto;
}
.message-card {
  margin:5px;
}
.message-row-left {
  display: flex;
  flex-direction:row;
}
.message-row-right {
  display: flex;
  flex-direction:row-reverse;
}
.message-content {
  margin:-5px 5px 5px 5px;
  display: flex;
  flex-direction:column;
}
.message-body {
  border:1px solid #D9DAD9;
  padding:5px;
  border-radius:3px;
  background-color:#FFF;
}
.message-time {
  margin:0 5px;
  font-size:5px;
  color:#D9DAD9;
}
.footer-btn {
  float:right;
  margin-bottom: 5px;
}
.spin-icon-load {
  animation:ani-spin 1s linear infinite;
}
@keyframes ani-spin{
  form{transform: rotate(0deg);}
  50% {transform: rotate(180deg);}
  to  {transform: rotate(360deg);}
}
#input_class{
  margin:10px 0;

}
</style>
