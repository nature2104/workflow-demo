<template>
  <h-view class="public-style workflow-list" style="height: 100%" title="工作流">
    <h-header :has-border="false" class="bar-custom">
      <!--      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>-->
      <div slot="center">工作流</div>
    </h-header>
    <!-- <h-content class="scroll-content has-header">-->
    <div class="s-tab">
      <div :class="{'active':index[0]}" class="s-tab-title" @click="buttonClicked(0)">待办</div>
      <div v-if="!tranShow" :class="{'active':index[1]}" class="s-tab-title" @click="buttonClicked(1)">已办
      </div>
      <div v-if="!tranShow" :class="{'active':index[2]}" class="s-tab-title" @click="buttonClicked(2)">我的
      </div>
    </div>
    <scroll
      ref="scroll"
      :updateData="[list]"
      :pullUp="true"
      :hasFoot="hasFoot"
      class="content-scroll"
      @pullingUp="loadMore">
      <div v-if="index[0]">
        <div v-for="(li,index) in list" class="workflow-list" :key="index">
          <div class="workflow-list-item">
            <div class="workflow-info">
              <div class="workflow-info-applyPeople">
                <div class="workflow-info-people">
                  <div class="workflow-info-people-text">{{ li.name }}</div>
                </div>
              </div>
              <div class="unapprove-workflow-info-apllyType">
                <div class="unapprove-workflow-info-apllyType-text">{{ li.workflow_desc }}</div>
                <div class="unapprove-workflow-info-people-text">{{ li.submitted_by_name }}</div>
              </div>
            </div>
            <div class="node-info" @click="goDetais(li)">
              <div class="node-info-title">
                <div class="title-content">当前节点</div>
                <div class="title-content">申请时间</div>
              </div>
              <div class="node-info-text">
                <div class="text-content">{{ li.node_desc }}</div>
                <div class="text-content">{{ li.create_time }}</div>
              </div>
              <div class="node-info-icon">
                <img src="../../../assets/workflow/rightIcon@2x.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--已办-->
      <div v-if="index[1]">
        <div v-for="(li,index) in list" class="workflow-list" :key="index">
          <div class="workflow-list-item">
            <div class="workflow-info">
              <div class="workflow-info-applyPeople">
                <div class="workflow-info-people">
                  <div class="workflow-info-people-text">{{ li.name }}</div>
                </div>
              </div>
              <div class="workflow-info-apllyType">
                <div class="workflow-info-type">
                  <div class="workflow-info-apllyType-text">{{ li.workflow_desc }}</div>
                  <div
                    :class="{'status-end': li.instance_status_desc == '结束审批通过','status-refused':li.instance_status_desc == '拒绝未通过'}"
                    class="workflow-info-status">
                    {{ li.instance_status_desc }}
                  </div>
                </div>
                <div class="workflow-info-people-text">{{ li.submitted_by_name }}</div>
              </div>
            </div>
            <div class="node-info" @click="goDetais(li)">
              <div class="node-info-title">
                <div class="title-content">当前节点</div>
                <div class="title-content">申请时间</div>
              </div>
              <div class="node-info-text">
                <div class="text-content">{{ li.node_desc }}</div>
                <div class="text-content">{{ li.last_approve_date }}</div>
              </div>
              <div class="node-info-icon">
                <img src="../../../assets/workflow/rightIcon@2x.png">
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--  我的-->
      <div v-if="index[2]">
        <div v-for="(li,index) in list" class="workflow-list" :key="index">
          <div class="workflow-list-item">
            <div class="workflow-info">
              <div class="workflow-info-applyPeople">
                <div class="workflow-info-people">
                  <div class="workflow-info-people-text">{{ li.name }}</div>
                </div>
              </div>
              <div class="workflow-info-apllyType">
                <div class="workflow-info-type">
                  <div class="workflow-info-apllyType-text">{{ li.workflow_desc }}</div>
                  <div
                    :class="{'status-end': li.instance_status_desc == '结束审批通过','status-refused':li.instance_status_desc == '拒绝未通过'}"
                    class="workflow-info-status">
                    {{ li.instance_status_desc }}
                  </div>
                </div>
                <div class="workflow-info-people-text">{{ li.submitted_by_name }}</div>
              </div>
            </div>
            <div class="node-info" @click="goDetais(li)">
              <div class="node-info-title">
                <div class="title-content">当前节点</div>
                <div class="title-content">申请时间</div>
              </div>
              <div class="node-info-text">
                <div class="text-content">{{ li.current_node_desc }}</div>
                <div class="text-content">{{ li.last_approve_date }}</div>
              </div>
              <div class="node-info-icon">
                <img src="../../../assets/workflow/rightIcon@2x.png">
              </div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <!--</h-content>-->
  </h-view>
</template>

<script>
export default {
  data () {
    return {
      to_do_flag: 'Y',
      exit: true,
      select_flag: 'Y',
      api_name: 'unapprove_wfl',
      wfl_list: [],
      selectItem: [],
      buttons: [],
      tranShow: false,
      show: true,
      index: [1, 0, 0],
      list: [],
      hasFoot: {
        footFlag: true,
        height: 60,
      },
    }
  },
  created: function () {

  },
  mounted: function () {
    let vm = this
    vm.index = [1, 0, 0]
    vm.offsize = 1
    vm.pageSize = 10
    vm.api_name = 'unapprove_wfl'
    vm.to_do_flag = 'Y'
    // 查找我的代办
    vm.workflow_query(vm.api_name)
  },
  updated: function () {
  },
  destroyed: function () {
  },
  methods: {
    buttonClicked (index) {
      let vm = this
      // 单据转交还原
      vm.tranShow = false
      vm.scrollBusy = true
      vm.offsize = 1
      vm.index = [0, 0, 0]
      vm.index[index] = 1
      if (index === 0) {
        vm.to_do_flag = 'Y'
        vm.api_name = 'unapprove_wfl'
        this.workflow_query('unapprove_wfl')
      } else if (index === 1) {
        vm.to_do_flag = 'N'
        vm.api_name = 'wfl_approved'
        this.workflow_query('wfl_approved')
      } else if (index === 2) {
        vm.to_do_flag = 'N'
        vm.api_name = 'my_wfl'
        this.workflow_query('my_wfl')
      }
    },
    /**
       * 工作流查询
       */
    workflow_query (apiName) {
      let vm = this
      vm.list = []
      let url = process.env.basePath + apiName
      let param = {
        'offsize': vm.offsize,
      }
      vm.hlsPopup.showLoading('请稍候')
      vm.$post(url, param).then(function (res) {
        if (res.result === 'S') {
          if (apiName === 'my_wfl') {
            vm.list = res.my_wfl_list
            for (let i = 0; i < vm.list.length; i++) { // 将每个对象中的提交人的首字提取出来，并将该属性添加到对象中
              vm.list[i]['name'] = vm.list[i].submitted_by_name.substring(0, 1)
            }
          } else if (apiName === 'unapprove_wfl') {
            vm.list = res.wfl_unapprove_list
            for (let i = 0; i < vm.list.length; i++) { // 将每个对象中的提交人的首字提取出来，并将该属性添加到对象中
              vm.list[i]['name'] = vm.list[i].submitted_by_name.substring(0, 1)
            }
          } else if (apiName === 'wfl_approved') {
            vm.list = res.wfl_approved_list
            for (let i = 0; i < vm.list.length; i++) { // 将每个对象中的提交人的首字提取出来，并将该属性添加到对象中
              vm.list[i]['name'] = vm.list[i].submitted_by_name.substring(0, 1)
            }
          } else {
          }
          if (vm.list.length > 0 && vm.list.length < vm.pageSize) {
            vm.$refs.scroll.update(true) // 关闭上拉，不再滚动
          } else if (vm.list.length === 0) {
            vm.$refs.scroll.update(true)// 关闭上拉，不再滚动
          } else {
          }
          vm.hlsPopup.hideLoading()
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongBottom(res.message)
        }
      })
    },
    loadMore () {
      let vm = this
      vm.offsize = vm.offsize + 1
      let url = process.env.basePath + vm.api_name
      let param = {
        'offsize': vm.offsize,
      }
      vm.$post(url, param).then(function (res) {
        let returnData = []
        if (res.result === 'S') {
          if (vm.api_name === 'my_wfl') {
            returnData = res.my_wfl_list
          } else if (vm.api_name === 'unapprove_wfl') {
            returnData = res.wfl_unapprove_list
          } else if (vm.api_name === 'wfl_approved') {
            returnData = res.wfl_approved_list
          }
          if (returnData.length === 0) {
            vm.$refs.scroll.update(true) // 关闭上拉，不再滚动
          } else if (returnData.length > 0 && returnData.length < vm.pageSize) {
            vum.forEach(returnData, function (data, index, array) {
              vm.list.push(array[index])
            })
            vm.$refs.scroll.update(true)
          } else if (returnData.length === vm.pageSize) {
            vum.forEach(returnData, function (data, index, array) {
              vm.list.push(array[index])
            })
            vm.$refs.scroll.update(true)
          } else {

          }
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
        }
      })
    },
    /**
       * 跳转到下一页面
       * @param data
       */
    goDetais (data) {
      this.$router.push({
        name: 'WorkflowDetail',
        params: {
          data: data,
          to_do_flag: this.to_do_flag,
        },
      })
    },
  },
  submit: function () {
    let vm = this
    let num = 0
    let recordUploadInterval = setInterval(function () {
      if (num === vm.buttons.length) {
        clearInterval(recordUploadInterval)
        vm.workflow_query(vm.api_name) // 操作成功后重新查询
        vm.workFlag = true // 操作与取消按钮标识
        vm.switchALlFlag = false // 全选按钮标识
        vm.hlsPopup.hideLoading()
        vm.hlsPopup.showLongCenter('操作成功!')
      }
    }, 100)
    for (let i = 0; i < vm.buttons.length; i++) {
      num++
      let url = process.env.basePath + 'wfl_approve_agree'
      let param = {
        rcpt_record_id: vm.buttons[i].rcpt_record_id,
        node_action_id: vm.buttons[i].node_action_id,
        // comment_text: vm.areaInput
      }

      vm.$post(url, param).then(function (res) {
        if (res.result === 'S') {

        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
        }
      })
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet">
  .workflow-list {
/*    .content {
      overflow: hidden;
    }*/
    .scroll-content {
      position: absolute;
      bottom: 0;
      height: auto;
      overflow: hidden;
      -webkit-overflow-scrolling: touch;
      overflow-scrolling: touch;
    }
    .s-tab {
      z-index: 999;
      width: 100%;
      background: #fff;
      display: -webkit-flex;
      display: flex;
      -webkit-justify-content: space-around;
      justify-content: space-around;
      position: fixed;

      .s-tab-title {
        height: 40px;
        width: 50%;
        font-size: 14px;
        color: rgb(124, 130, 141);
        display: -webkit-flex;
        display: flex;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
        box-sizing: content-box;
      }

      .s-tab-title.active {
        color: #5D98F6;
        border-bottom: 1px solid #5D98F6;
      }
    }
    .workflow-list {
      margin-top: 10px;
      width: 100%;
      background-color: #FFFFFF;

      .workflow-list-item {
        width: 100%;
        height: 130px;
        border: none;
        padding: 0 0 0 15px;
        display: flex;
        display: -webkit-flex;
        flex-direction: column;
        -webkit-flex-direction: column;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;

        .workflow-info {
          width: 100%;
          height: 65px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          align-items: center;
          -webkit-align-items: center;

          .workflow-info-applyPeople {
            width: 30%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            .workflow-info-switch {
              width: 40%;
              height: 100%;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              -webkit-justify-content: center;
              align-items: center;
              -webkit-align-items: center;
            }

            .workflow-info-people {
              width: 90%;
              height: 100%;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;

              .workflow-info-people-text {
                width: 42px;
                height: 42px;
                background-color: #D8D8D8;
                border-radius: 21px;
                color: #F6A85D;
                font-size: 15px;
                display: flex;
                display: -webkit-flex;
                justify-content: center;
                -webkit-justify-content: center;
                align-items: center;
                -webkit-align-items: center;
              }
            }
          }

          .unapprove-workflow-info-apllyType {
            width: 70%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            .unapprove-workflow-info-apllyType-text {
              width: 100%;
              height: 50%;
              padding-top: 10px;
              font-size: 16px;
              color: #5D98F6;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;
            }

            .unapprove-workflow-info-people-text {
              width: 100%;
              height: 50%;
              padding-bottom: 10px;
              color: #68767D;
              font-size: 14px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;
            }
          }

          .workflow-info-apllyType {
            width: 70%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            .workflow-info-type {
              width: 100%;
              height: 50%;
              padding-top: 7px;
              font-size: 16px;
              color: #5D98F6;
              display: flex;
              display: -webkit-flex;
              justify-content: space-between;
              -webkit-justify-content: space-between;
              align-items: center;
              -webkit-align-items: center;

              .workflow-info-apllyType-text {
                width: 60%;
                height: 100%;
                padding-top: 7px;
                font-size: 16px;
                color: #5D98F6;
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                -webkit-justify-content: flex-start;
                align-items: center;
                -webkit-align-items: center;
              }

              .workflow-info-status {
                width: 40%;
                height: 100%;
                padding-top: 7px;
                padding-right: 10px;
                font-size: 14px;
                color: #5D98F6;
                display: flex;
                display: -webkit-flex;
                justify-content: flex-end;
                -webkit-justify-content: flex-end;
                align-items: center;
                -webkit-align-items: center;
              }

              .status-end {
                color: #B0B0B0;
              }

              .status-refused {
                color: #F96C66;
              }
            }

            .workflow-info-people-text {
              width: 100%;
              height: 50%;
              padding-bottom: 7px;
              color: #68767D;
              font-size: 14px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;
            }
          }
        }

        .node-info {
          width: 100%;
          height: 65px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;

          .node-info-title {
            width: 30%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            .title-content {
              width: 100%;
              height: 50%;
              color: #6B7980;
              font-size: 14px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;
            }
          }

          .node-info-text {
            width: 60%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            .text-content {
              width: 100%;
              height: 50%;
              color: #515151;
              font-size: 14px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-start;
              -webkit-justify-content: flex-start;
              align-items: center;
              -webkit-align-items: center;
            }
          }

          .node-info-icon {
            width: 10%;
            height: 100%;
            isplay: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;

            img {
              width: 20%;
            }
          }
        }
      }
    }
  }
</style>
