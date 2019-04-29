<template>
  <div class="main_container">
    <NavBar></NavBar>
    <div class="video">
      <div class="swf">
        <object>
          <embed
            id="rtmp-streamer"
            src="./static/swf/RtmpStreamer.swf"
            bgcolor="#000000"
            quality="high"
            width="750"
            height="400"
            allowScriptAccess="sameDomain"
            type="application/x-shockwave-flash"></embed>
        </object>
      </div>

      <div class="btn-group">
        <Button type="primary" @click="push">开始直播</Button>
        <Button type="error" @click="disconnect">结束直播</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import RtmpStreamer from 'rtmp-streamer';

  const FIELDS = [
    "quality",
    "camFrameInterval",
    "camHeight",
    "camWidth",
    "camFps",
    "bandwidth"
  ];
  export default {
    name: "Video",
    components: {NavBar},

    data() {
      return {
        rtmp: "",
        quality: 90,
        camFrameInterval: 15,
        camWidth: 400,
        camHeight: 300,
        camFps: 15,
        bandwidth: 16384
      }
    },
    mounted: function () {
      this.streamer = document.getElementById('rtmp-streamer');
    },
    methods: {
      push: function () {
        if (this.rtmp.length === 0) {
          return
        }
        let urls = this.rtmp.split('/');
        let name = urls.pop();
        let url = urls.join("/");
        this.streamer.publish(url, name);
      },
      disconnect: function () {
        this.streamer.disconnect();
      },
    }
  }


</script>

<style scoped>
  .main_container {
    height: 100%;
    width: 100%;

  }

  .video {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .swf {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .btn-group {
    margin-top: 10px;
    width: 40%;
    display: flex;
    justify-content: space-between;
  }
</style>
