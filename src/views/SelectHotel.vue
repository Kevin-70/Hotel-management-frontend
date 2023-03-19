<template>
  <div class="block">
    <div>
      <h2>请选择酒店的地址</h2>
    </div>

    <span class="demonstration"></span>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleSelChange">
    </el-cascader>

    <div id="input_price">
      <el-input
        placeholder="请输入酒店价格区间（格式为 x-y）"
        v-model="inputPrice"
        @change="handlePriceChange"
        :disabled="!selectedCity">
      </el-input>
    </div>

    <div id="input_type">
      <el-input
        placeholder="请输入酒店房型（格式为 'a'/'b'）"
        v-model="inputType"
        @change="handleTypeChange"
        :disabled="!selectedCity">
      </el-input>
    </div>

    <div id="map">
      <img src="@/assets/plane_hotel.png" alt="" @click="mouse_click($event)" v-show="selectedCity">
    </div>

    <div id="grid1">
      <img src="@/assets/grid/grid(1).png" alt="" @click="mouse_click1($event)" v-show="selectedCity && !rsvd[1] && !query_last[1]">
      <img src="@/assets/grid/grid2(1).png" alt="" @click="mouse_click1($event)" v-show="selectedCity && query_last[1]">
    </div>

    <div id="grid2">
      <img src="@/assets/grid/grid(2).png" alt="" @click="mouse_click2($event)" v-show="selectedCity && !rsvd[2] && !query_last[2]">
      <img src="@/assets/grid/grid2(2).png" alt="" @click="mouse_click2($event)" v-show="selectedCity && query_last[2]">
    </div>

    <div id="grid3">
      <img src="@/assets/grid/grid(3).png" alt="" @click="mouse_click3($event)" v-show="selectedCity && !rsvd[3] && !query_last[3]">
      <img src="@/assets/grid/grid2(3).png" alt="" @click="mouse_click3($event)" v-show="selectedCity && query_last[3]">
    </div>

    <div id="grid4">
      <img src="@/assets/grid/grid(4).png" alt="" @click="mouse_click4($event)" v-show="selectedCity && !rsvd[4] && !query_last[4]">
      <img src="@/assets/grid/grid2(4).png" alt="" @click="mouse_click4($event)" v-show="selectedCity && query_last[4]">
    </div>

    <div id="grid5">
      <img src="@/assets/grid/grid(5).png" alt="" @click="mouse_click5($event)" v-show="selectedCity && !rsvd[5] && !query_last[5]">
      <img src="@/assets/grid/grid2(5).png" alt="" @click="mouse_click5($event)" v-show="selectedCity && query_last[5]">
    </div>

    <div id="grid6">
      <img src="@/assets/grid/grid(6).png" alt="" @click="mouse_click6($event)" v-show="selectedCity && !rsvd[6] && !query_last[6]">
      <img src="@/assets/grid/grid2(6).png" alt="" @click="mouse_click6($event)" v-show="selectedCity && query_last[6]">
    </div>

    <div id="grid7">
      <img src="@/assets/grid/grid(7).png" alt="" @click="mouse_click7($event)" v-show="selectedCity && !rsvd[7] && !query_last[7]">
      <img src="@/assets/grid/grid2(7).png" alt="" @click="mouse_click7($event)" v-show="selectedCity && query_last[7]">
    </div>

    <div id="grid8">
      <img src="@/assets/grid/grid(8).png" alt="" @click="mouse_click8($event)" v-show="selectedCity && !rsvd[8] && !query_last[8]">
      <img src="@/assets/grid/grid2(8).png" alt="" @click="mouse_click8($event)" v-show="selectedCity && query_last[8]">
    </div>

    <div id="grid9">
      <img src="@/assets/grid/grid(9).png" alt="" @click="mouse_click9($event)" v-show="selectedCity && !rsvd[9] && !query_last[9]">
      <img src="@/assets/grid/grid2(9).png" alt="" @click="mouse_click9($event)" v-show="selectedCity && query_last[9]">
    </div>

    <div id="grid10">
      <img src="@/assets/grid/grid(10).png" alt="" @click="mouse_click10($event)" v-show="selectedCity && !rsvd[10] && !query_last[10]">
      <img src="@/assets/grid/grid2(10).png" alt="" @click="mouse_click10($event)" v-show="selectedCity && query_last[10]">
    </div>
    <el-button id="sure" @click="filter($event)" v-if="selectedRoom==0">筛选</el-button>

    <el-button id="sure" @click="doOrder($event)" v-if="selectedRoom!==0">下单</el-button>
    <el-button id="toPlayer" @click="enterPlayer()">查看视频评论</el-button>

    <el-button id="favor" @click="doFavor()" v-if="selectedRoom!==0"type="warning" >收藏</el-button>


    <div id="tips">
      <h2 v-show="selectedCity">蓝色格子为现在空闲的房间</h2>
    </div>

    <div id="Comments">

      <el-card>
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="(comment, index) in comments"
            :key="index"
            :title="`Comment #${index + 1} by ${comment.username}`"
            name="1"
          >
            <p>{{ comment.content }}</p>
            <el-rate
              :value="comment.rating"
              :disabled="true"
              :show-text="true"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
            ></el-rate>
          </el-collapse-item>
        </el-collapse>
      </el-card>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      activeNames: [],
      comments: [
        // {
        //   username: 'John Doe',
        //   content: 'Great product!',
        //   rating: 4
        // },
        // {
        //   username: 'Jane Doe',
        //   content: 'Love it!',
        //   rating: 5
        // },
        // {
        //   username: 'Tom Smith',
        //   content: 'Okay, but could be better',
        //   rating: 2
        // }
      ],
      selectedCity: false,
      selectedRoom: 0,
      query_last: [false, false, false, false, false, false, false, false, false, false, false],
      inputPrice: '',
      inputType: '',
      // soc: 'http://10.25.1.105:8080',
      soc: '',
      value: [],
      current_hotel: '',
      rsvd: [false, false, false, false, false, false, false, false, false, false, false],
      rooms: [
        {
          id: 1,
          name: 'A',
          price: 114
        },
        {
          id: 2,
          name: 'B',
          price: 514
        },
      ],
      options: [
        // =====================省份========================
        {
          value: 'GD',
          label: '广东',
          children: [
            {
              value: 'GZ',
              label: '广州',
              children: [
                {
                  value: '1',
                  label: '分店1',
                },
                {
                  value: '2',
                  label: '分店2',
                }
              ]
            },
            {
              value: 'SZ',
              label: '深圳',
              children: [
                {
                  value: '1',
                  label: '分店1',
                },
                {
                  value: '2',
                  label: '分店2',
                }
              ]
            },
            {
              value: 'ZH',
              label: '珠海',
              children: [
                {
                  value: '1',
                  label: '分店1',
                },
              ]
            },
          ]
        },
        {
          value: 'HA',
          label: '海南',
          children: [
            {
              value: 'HK',
              label: '海口',
              children: [
                {
                  value: '1',
                  label: '分店1',
                },
                {
                  value: '2',
                  label: '分店2',
                }
              ]
            },
            {
              value: 'SY',
              label: '三亚',
              children: [
                {
                  value: '1',
                  label: '分店1',
                }
              ]
            },
          ]
        }
        // =====================省份========================
      ]

    }
  },
  created() {
    // let data = JSON.parse(this.getData('http://192.168.43.39:8080/consumer/commentArea/' + this.curHotel + '/' + this.selRoom)).data;
    this.soc = 'http://' + sessionStorage.getItem("ip") + ':8080';
  },
  methods: {
    doFavor(){
      let state1=JSON.parse(sessionStorage.getItem("state"));
      console.log(state1.user);
      axios.post('http://' + sessionStorage.getItem('ip') + ':8080/consumer/collect/'+state1.user.name+"/"
        +this.current_hotel+"/" + this.selectedRoom).then((res)=>{
        console.log(res.data)
      }).catch((error)=> {
        console.log(error)
      });

    },
    handleSelChange(value) {
      // value 格式为：省份，城市
      let list = value.toString().split(',');
      let hotel_name = list[1] + list[2];
      this.current_hotel = hotel_name;

      alert('http://' + sessionStorage.getItem('ip') + '/consumer/rooms/' + hotel_name);
      let data = JSON.parse(this.getData('http://' + sessionStorage.getItem('ip') + ':8080/consumer/rooms/' + hotel_name)).data;
      this.selectedCity = true;

      for (let i = 0; i < data.length; i++) {
        this.rsvd[i + 1] = data[i]['reserved'];
      }

      let comment_data = JSON.parse(this.getData( 'http://' + sessionStorage.getItem('ip') + ':8080/consumer/commentArea/' + hotel_name)).data;

      this.comments = [];

      for (let i = 0; i < comment_data.length; i++) {
        if(comment_data[i]['star'] && comment_data[i]['comments']) {
          let t = {};
          t.username = comment_data[i]['consumerName'];
          t.content = comment_data[i]['comments'];
          t.rating = comment_data[i]['star'];

          this.comments.push(t);
        }
      }

    },

    getData(url) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
        // IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xmlhttp = new XMLHttpRequest();
      } else {
        // IE6, IE5 浏览器执行代码
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.open("GET", url, false);
      xmlhttp.send();
      return xmlhttp.response;
    },

    handlePriceChange(value) {
      if(value==null||value==""){
        let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
        let res = [];
        for (let i = 0; i < data.length; i++) if (data[i]['reserved'] === false) {
           res.push(data[i]['roomNumber']);
        }
        return res
      }
      var buf = value.toString().split('-');

      let l = parseInt(buf[0]);
      let r = parseInt(buf[1]);

      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      let res = [];
      for (let i = 0; i < data.length; i++) if (data[i]['reserved'] === false) {
        let val = parseInt(data[i]['price']);
        if (val >= l && val <= r) res.push(data[i]['roomNumber']);
      }
      return res
      // alert(res);
    },

    handleTypeChange(value) {
      if ( value==null||value==""){
        let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
        let res = [];
        for (let i = 0; i < data.length; i++) if (data[i]['reserved'] === false) {
          res.push(data[i]['roomNumber']);
        }
        return res
      }
      var buf = value.toString();

      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      let res = [];

      for (let i = 0; i < data.length; i++) if (data[i]['reserved'] === false) {
        let val = data[i]['roomType'];
        if (val === buf) res.push(data[i]['roomNumber']);
      }
      return res
      // alert(res);
    },

    enterPlayer(){
      this.$router.push({
        path: '/player',
        name: 'Player',
        params: {
          curHotel: this.current_hotel,
          selRoom: this.selectedRoom,
        }
      });
    },

    doOrder(e) {
      this.$router.push({
        path: '/pay',
        name: 'Pay',
        params: {
          curHotel: this.current_hotel,
          selRoom: this.selectedRoom,
        }
      });
      },
    filter(e){
      let res1=this.handleTypeChange(this.inputType);
      let res2=this.handlePriceChange(this.inputPrice);
      console.log(res1,res2);
      let  _arr1Set = new Set(res1);let _arr2Set = new Set(res2);
      let intersection = res1.filter(item => _arr2Set.has(item));
      console.log(res1,res2,intersection);
      for (let i=0;i<intersection.length;i++){
        intersection[i]= intersection[i]-100;
      }
      console.log(intersection);
      this.query_last=[false, false, false, false, false, false, false, false, false, false, false];
      for (let i = 0; i < intersection.length; i++) {
        this.query_last[intersection[i]]=true;
      }
    },
    mouse_click(e) {
    },

    mouse_click1(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[0]['roomNumber'] + '\n' +
        '房间类型: ' + data[0]['roomType'] + '\n' +
        '价格: ' + data[0]['price'] + '\n' +
        '介绍: ' + data[0]['introduction'] + '\n'
      );
      this.selectedRoom = 101;
    },

    mouse_click2(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[1]['roomNumber'] + '\n' +
        '房间类型: ' + data[1]['roomType'] + '\n' +
        '价格: ' + data[1]['price'] + '\n' +
        '介绍: ' + data[1]['introduction'] + '\n'
      );
      this.selectedRoom = 102;
    },

    mouse_click3(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[2]['roomNumber'] + '\n' +
        '房间类型: ' + data[2]['roomType'] + '\n' +
        '价格: ' + data[2]['price'] + '\n' +
        '介绍: ' + data[2]['introduction'] + '\n'
      );
      this.selectedRoom = 103;
    },

    mouse_click4(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[3]['roomNumber'] + '\n' +
        '房间类型: ' + data[3]['roomType'] + '\n' +
        '价格: ' + data[3]['price'] + '\n' +
        '介绍: ' + data[3]['introduction'] + '\n'
      );
      this.selectedRoom = 104;
    },

    mouse_click5(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[4]['roomNumber'] + '\n' +
        '房间类型: ' + data[4]['roomType'] + '\n' +
        '价格: ' + data[4]['price'] + '\n' +
        '介绍: ' + data[4]['introduction'] + '\n'
      );
      this.selectedRoom = 105;
    },

    mouse_click6(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[5]['roomNumber'] + '\n' +
        '房间类型: ' + data[5]['roomType'] + '\n' +
        '价格: ' + data[5]['price'] + '\n' +
        '介绍: ' + data[5]['introduction'] + '\n'
      );
      this.selectedRoom = 106;
    },

    mouse_click7(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[6]['roomNumber'] + '\n' +
        '房间类型: ' + data[6]['roomType'] + '\n' +
        '价格: ' + data[6]['price'] + '\n' +
        '介绍: ' + data[6]['introduction'] + '\n'
      );
      this.selectedRoom = 107;
    },

    mouse_click8(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[7]['roomNumber'] + '\n' +
        '房间类型: ' + data[7]['roomType'] + '\n' +
        '价格: ' + data[7]['price'] + '\n' +
        '介绍: ' + data[7]['introduction'] + '\n'
      );
      this.selectedRoom = 108;
    },

    mouse_click9(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[8]['roomNumber'] + '\n' +
        '房间类型: ' + data[8]['roomType'] + '\n' +
        '价格: ' + data[8]['price'] + '\n' +
        '介绍: ' + data[8]['introduction'] + '\n'
      );
      this.selectedRoom = 109;
    },

    mouse_click10(e) {
      let data = JSON.parse(this.getData(this.soc + '/consumer/rooms/' + this.current_hotel)).data;
      alert('您选择的房间介绍：\n' +
        '房间号: ' + data[9]['roomNumber'] + '\n' +
        '房间类型: ' + data[9]['roomType'] + '\n' +
        '价格: ' + data[9]['price'] + '\n' +
        '介绍: ' + data[9]['introduction'] + '\n'
      );
      this.selectedRoom = 110;
    },
  }
};
</script>

<style>
#map {
  position: absolute;
  left: 430px;
  top: 210px;
}

#grid1 {
  position: absolute;
  left: 430px;
  top: 210px;
}

#grid2 {
  position: absolute;
  left: 530px;
  top: 210px;
}

#grid3 {
  position: absolute;
  left: 630px;
  top: 210px;
}

#grid4 {
  position: absolute;
  left: 730px;
  top: 210px;
}

#grid5 {
  position: absolute;
  left: 430px;
  top: 310px;
}

#grid6 {
  position: absolute;
  left: 730px;
  top: 310px;
}

#grid7 {
  position: absolute;
  left: 430px;
  top: 410px;
}

#grid8 {
  position: absolute;
  left: 530px;
  top: 410px;
}

#grid9 {
  position: absolute;
  left: 630px;
  top: 410px;
}

#grid10 {
  position: absolute;
  left: 730px;
  top: 410px;
}

#tips {
  position: absolute;
  left: 500px;
  top: 530px;
}

#input_price {
  position: absolute;
  left: 100px;
  top: 200px;
  width: 250px;
}

#input_type {
  position: absolute;
  left: 100px;
  top: 250px;
  width: 250px;
}

#sure {
  position: absolute;
  left: 100px;
  top: 300px;
  width: 100px;
}
#favor {
  position: absolute;
  left: 100px;
  top: 400px;
  width: 100px;
}

#Comments {
  position: absolute;
  left: 100px;
  top: 600px;
  width: 700px;
}

#toPlayer {
  position: absolute;
  left: 100px;
  top: 350px;
  width: 150px;
}
</style>
