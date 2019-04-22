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
        <div class="setting_item user_photo">
          <span>头像： </span>
          <Upload class="upload_photo"
                  ref="upload"
                  :show-upload-list="false"
                  :default-file-list="defaultList"
                  :on-success="handleSuccess"
                  :format="['jpg','jpeg','png']"
                  :max-size="2048"
                  :on-format-error="handleFormatError"
                  :on-exceeded-size="handleMaxSize"
                  :before-upload="handleBeforeUpload"
                  multiple
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/"
                  style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <img type="ios-camera" size="20" :src="teacherInfo.avatar"/>
            </div>
          </Upload>
        </div>
        <div class="setting_item">
          性别：
          <RadioGroup v-model="sex">
            <Radio label="男"></Radio>
            <Radio label="女"></Radio>
          </RadioGroup>
        </div>
        <div class="setting_item">
          电话： <Input prefix="ios-call" placeholder="Enter telephone" class="input_item" clearable/>
        </div>
        <div class="setting_item">
          职称： <Select v-model="model1" style="width:200px">
          <Option v-for="item in title" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import {Tabs, TabPane, Input, Upload, Icon, Radio, RadioGroup,} from 'iview'
  import NavBar from "../components/NavBar";
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "Modify",
    components: {NavBar},
    data() {
      return {
        formData:{
          username:'',
          email:'',
          sex:'',
          tel:'',
          school:'',
          department:'',
          position:''
        },
        title: []
      }
    },
    computed: {
        ...mapGetters(['teacherInfo'])
    },
    watch:{
      teacherInfo:function (value) {
        this.formData.username = value.username;
        this.formData.email = value.email;
        this.formData.sex = value.sex;
        this.formData.tel = value.tel;
        this.formData.school = value.school;
        this.formData.department = value.department;
        this.formData.position = value.position;
      }
    }
  }
</script>

<style lang="less" scoped>

  .info {
    margin-top: 40px;
    margin-left: 100px;
    width: 65%;
    /*position: relative;*/
    .user_setting {
      font-size: 30px;

    }
    .user_photo {
      height: 60px;
    }

    .setting {
      width: 100%;
      margin-top: 25px;
      margin-left: 30px;
      .setting_item {
        position: relative;
        margin-bottom: 15px;
        font-size: 15px;

        .upload_photo {
          position: absolute;
          top: 0;
          left: 49px;
        }
        .input_item {
          width: 65%;
        }
      }

    }

  }

</style>