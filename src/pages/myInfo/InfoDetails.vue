<template>
  <h-view class="public-style info-detail" style="height:100%;">
    <div class="head-content">
      <h-header :has-border="false" class="header bar-custom">
        <!--<div class="buttons">
          <button class="button button-left button-icon ion-ios-arrow-back" @click="$routeGo(-1)">
          </button>
        </div>-->
        <div slot="left" class="h-header-btn" @click="$routeGo()">
          <i class="ion-ios-arrow-back"/>
        </div>
      </h-header>
      <div class="content-img">
        <div class="header" @click="takePicture">
          <img v-if="info.dataBase64String" :src="info.dataBase64String" class="logo">
        </div>
        <div class="edit-logo">
          <img src="@/assets/image/myInfo/camera@2x.png" class="edit">
        </div>
        <div class="name" v-text="info.name_n"/>
      </div>
      <div class="back-img">
        <img src="@/assets/image/myInfo/wave@3x.png">
      </div>
    </div>
    <h-content class="content-style">
      <list-item>
        <item :proportion="[2,1]">
          <div slot="name" v-text="info.company_n"/>
        </item>
        <item>
          <div slot="name">工号</div>
          <div slot="content" v-text="info.employee_code"/>
        </item>
        <item>
          <div slot="name">部门</div>
          <div slot="content" v-text="info.department_n"/>
        </item>
        <item>
          <div slot="name">职位</div>
          <div slot="content" v-text="info.position_n"/>
        </item>
        <item>
          <div slot="name">状态</div>
          <div slot="content" v-text="info.employee_status"/>
        </item>
        <item>
          <div slot="name">邮箱</div>
          <div slot="content" style="color: rgb(44,129,255)" @click="callEmail(info.email)" v-text="info.email"/>
        </item>
        <item>
          <div slot="name">手机</div>
          <div slot="content" style="color: rgb(44,129,255)" @click="callPhone(info.mobil)" v-text="info.mobil"/>
        </item>
      </list-item>
    </h-content>
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      info: {},
    }
  },
  created: function () {
    let vm = this
    let url = $config.basePath + 'person_information'
    let param = {}
    vm.hlsHttp.post(url, param).then(function (res) {
      vm.hlsPopup.hideLoading()
      vm.info = res.person_informatio[0]
      if (window.localStorage.userImg) {
        window.localStorage.removeItem('userImg')
      }
      window.localStorage.setItem('userImg', vm.info.dataBase64String)
    })
  },
  methods: {
    takePicture () {
      let vm = this
      vm.hlsPopup.showActionSheet({
        buttonArray: ['拍照', '相册'],
        callback (index) {
          if (index === 0) {
            vm.openCamera()
          } else {
            vm.getPicture()
          }
        },
      })
    },
    openCamera () {
      let vm = this
      let cameraoptions = {
        quality: 90,
        targetWidth: 90,
        targetHeight: 90,
        allowEdit: true,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        encodingType: Camera.EncodingType.JPEG,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: window.localStorage.savePhoto || false,
        correctOrientation: true,
      }
      navigator.camera.getPicture(function (imageData) {
        vm.info.dataBase64String = 'data:image/png;base64,' + imageData
        if (window.localStorage.userImg) {
          window.localStorage.removeItem('userImg')
        }
        window.localStorage.setItem('userImg', vm.info.dataBase64String)
        let date = imageData.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
        vm.card_save(date)
      }, function (err) {
      }, cameraoptions)
    },
    getPicture () {
      let vm = this
      window.imagePicker.getPictures(
        function (results) {
          for (var i = 0; i < results.length; i++) {
            vm.info.dataBase64String = results[i]
            if (window.localStorage.userImg) {
              window.localStorage.removeItem('userImg')
            }
            window.localStorage.setItem('userImg', vm.info.dataBase64String)
            vm.getImageToBase64(results[i])
          }
        }, function (error) {
          // console.log('Error: ' + error);
        }, {
          maximumImagesCount: 1,
          quality: 90,
          width: 90,
          height: 90,
        }
      )
    },
    getImageToBase64 (imgUrl) {
      let vm = this
      // 临时的图片对象
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let img = new Image()
      img.src = imgUrl
      let dataURL = ''
      img.onload = function () {
        canvas.height = img.height
        canvas.width = img.width
        ctx.drawImage(img, 0, 0)
        dataURL = canvas.toDataURL('image/jpg', 0.9)
        let baseVal = dataURL.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')
        vm.card_save(baseVal)
      }
    },
    card_save (imgdate) {
      let obj = {
        'table_pk_value': window.localStorage.user_id,
        'table_name': 'SYS_USER',
        'user_id': window.localStorage.user_id,
        'file_size': '560000',
        'picture': 'data:image/jpg;base64,' + encodeURIComponent(imgdate),
      }

      let pictureList = []
      pictureList.push(obj)
      let url = process.env.basePath + 'attment_upload_public'
      let param = {
        'picturelist': pictureList,
      }
      hlsHttp.post(url, param).then(function (res) {
        hlsPopup.hideLoading()
        // alert(vum.toJson(res));
        if (res.result === 'S') {
        }
      })
    },
    callPhone (number) {
      let vm = this
      if (number) {
        vm.hlsUtil.callPhone(number)
      }
    },
    callEmail (email) {
      let vm = this
      if (email) {
        vm.hlsUtil.callEmail(email);
      }
    },
  },
}
</script>

<style lang="less" rel="stylesheet">
  .info-detail {
    .head-content {
      .header {
        width: 100%;
        background-color: @headerColor;
        display: flex;
        display: -webkit-flex;
        align-items: flex-start;
        -webkit-align-items: flex-start;
        .button {
          color: #ffffff;
          font-size: 32px;
          padding-left: 10px;
          padding-right: 12px;

        }
      }
      .content-img {
        background-color: @headerColor;
        width: 100%;
        height: 103px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        justify-content: center;
        -webkit-justify-content: center;
        flex-direction: column;
        -webkit-flex-direction: column;
        margin-top: -1px; /*no*/
        .header {
          width: 60px;
          height: 60px;
          background-color: #FC9766;
          border-radius: 30px;
          align-items: center;
          //border: none;
          border: 1px solid #ffffff;
          .logo {
            width: 60px;
            height: 60px;
            border-radius: 30px;
            align-items: center;
            border: 1px solid #ffffff;
          }
        }
        .edit-logo {
          width: 17px;
          height: 17px;
          border-radius: 10px;
          margin-top: -15px;
          margin-right: -45px;
          background-color: #1E3255;
          display: flex;
          align-items: center;
          justify-content: center;
          img{
            height: 8px;
          }
        }
        .name {
          font-size: 17px;
          color: #EBF5FF;
          letter-spacing: 0.1px;
          text-align: center;
          height: 12px;
          margin-top: 15px;
        }
      }
      .back-img {
        //background: url('./../img/myInfo/wave@3x.png');
        background-color: @headerColor;
        width: 100%;
        height: 50px;
        border: 1px solid rgba(0, 0, 0, 0); /*no*/
        margin-top: -1px; /*no*/
        img{
          height: 50px;
        }
      }
    }
    .content-style {
      background-color: #fafafa;
      .hls-list-item {
        .hls-item {
          .contents {
            .add-name {
              font-size: @font-size-small;
              color: #666;
            }
            .add-content {
              color: #666;
              font-size: @font-size-small;
            }
          }
        }
      }
    }
  }

  .platform-ios {
    .info-detail {
      .content-style {
       // margin-top: 220px;
      }
    }
  }

  // iPhoneX适配
  @media (device-width: 375px) and (device-height: 812px) and (-webkit-min-device-pixel-ratio: 3) {
    .platform-ios{
      .info-detail {
        .content-style {
         // margin-top: 240px;
        }
      }
    }
  }
  // iPhoneX适配
  @media (device-width: 414px) and (device-height: 896px) {
    .platform-ios{
      .info-detail {
        .content-style {
         // margin-top: 240px;
        }
      }
    }
  }

</style>
