<template>
  <div>
    <NavBar></NavBar>
    <div class="info">
      <p class="user_setting">用户信息</p>
      <hr>
      <div class="setting">
        <div class="setting_item">
          姓名： <Input v-model="formData.username" prefix="ios-contact" placeholder="Enter name" class="input_item" clearable/>
        </div>
        <div class="setting_item">
          邮箱： <Input v-model="formData.email" prefix="ios-mail" placeholder="Enter email" class="input_item" clearable/>
        </div>

        <div class="avatar setting_item" >
          头像：
          <div class="changeavatar"   >
            <input
                    type="file"
                    accept="image/jpeg, image/jpg, image/png"
                    @change.stop="handleFile"
                    class="hiddenInput"
            >
          </div>
          <div class="avatar_img" :class="{avatar_blur:isBlur}"  @click="handleChange">
            <img :src="formData.avatar">
          </div>
          <Icon type="ios-camera"  size="30" class="camera" v-show="!isDisplay"/>
        </div>

        <div class="setting_item">
          性别：
          <RadioGroup v-model="formData.sex">
            <Radio label="m">男</Radio>
            <Radio label="f">女</Radio>
          </RadioGroup>
        </div>
        <div class="setting_item">
          学校：
          <Select class='select_message' v-model="formData.school" prefix="ios-school" placeholder="Enter school"
                  style="width:300px">
            <Option v-for="(item, index) in schoolArr" :value="item.name" :key="item.id">{{item.name}}</Option>
          </Select>
        </div>
        <div class="setting_item">
          部门：
          <Select class='select_message' v-model="formData.department" prefix="ios-people"
                  placeholder="Enter department" style="width:300px">
            <Option v-for="(item, index) in departmentArr" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>

        <div class="setting_item">
          职位：
          <Select class='select_message' v-model="formData.position" prefix="ios-ribbon" placeholder="Enter position"
                  style="width:300px">
            <Option v-for="(item, index) in positionArr" :value="item.name" :key="item.id">{{ item.name }}</Option>
          </Select>
        </div>
      </div>
      <button class="submit" @click="submitChange">提交</button>
    </div>
  </div>

</template>

<script>
  import {Tabs, TabPane, Input, Upload, Icon, Radio, RadioGroup, Button} from 'iview'
  import NavBar from "../components/NavBar";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "Modify",
    components: {NavBar},
    data() {
      return {
        formData: {},
        title: [],
        isBlur:false,
        isDisplay:false
      }
    },
    computed: {
      ...mapGetters(['teacherInfo', 'schoolArr', 'departmentArr', 'positionArr'])
    },

    methods: {
      // 修改头像
      handleFile(e) {
        let $target = e.target || e.srcElement;
        let file = $target.files[0];
        var reader = new FileReader();
        reader.onload = data => {
          let res = data.target || data.srcElement;
          // 修改页面和vuex中的图片路径
          this.formData.avatar = res.result;
          this.teacherInfo.avatar = res.result;
        };
        reader.readAsDataURL(file);
      },
      handleChange(){
        this.$el.querySelector(".hiddenInput").click();
      },
      submitChange(){

      }
    },

    mounted() {
      this.formData = {...this.teacherInfo}
    }
  }
</script>

<style lang="less" scoped>
  .avatar {
    width: 100%;
    height: 100px;
    margin: 0 auto;
    display: flex;
    .avatar_img {
      position: relative;
      width: 100px;
      height: 100px;
      top: 0;
      left:0;
      right: 0;
      bottom: 0;
      margin:0px -60px 40px 10px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
      img:hover{
        filter:blur(3px);
      }
    }
    .replace {
      font-size: 12px;
      background-color: #b2b2b2;
      color: white;
      padding: 3px;
      border: 0px;
      border-radius: 30px;
      display: none;
    }
  }

  .changeavatar {

    .hiddenInput {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: none;
    }
  }

  .info {
    margin-top: 40px;
    margin-left: 100px;
    width: 65%;
    /*position: relative;*/
    .user_setting {
      font-size: 30px;

    }
    .user_photo {
      height: 100px;
      display: flex;
    }

    .setting {
      width: 100%;
      margin-top: 25px;
      margin-left: 30px;
      .setting_item {
        position: relative;
        margin-bottom: 15px;
        font-size: 15px;

        .input_item {
          width: 65%;
        }
      }

    }

  }
.submit{
  background: #51d3b2;
  border-radius: 20px;
  border: 0;
  width: 80px;
  color: white;
  font-size: 12px;
  padding: 5px;
  margin-left: 10px;
  margin-top: 20px;
}
</style>