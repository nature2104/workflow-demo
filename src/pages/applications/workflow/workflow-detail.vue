<template>
  <h-view class="public-style" style="height: 100%" title="工作流">
    <h-header :has-border="false" class="bar-custom">
      <div slot="left" class="h-header-btn" @click="$routeGo()">
        <i class="ion-ios-arrow-back"/>
      </div>
      <div slot="center">工作流</div>
    </h-header>
    <s-tab class="" @tabClick="switchTab">
      <tab-item>明细</tab-item>
      <tab-item>审批记录</tab-item>
    </s-tab>
    <h-content :class="{'gray':index[1]}" class="has-footer">
      <!-- 项目、合同明细组件-->
      <div v-if="workflow_code == 'WFL_PRJ_N' && index[0]">
        <workflow-prj
          :projects="projects" :quote="quote" :project_bp="project_bp" :prj_item_list="prj_item_list"
          :dowload_list="dowload_list"/>
      </div>
      <div v-if="workflow_code == 'CONTRACT_SIGN' && index[0]">
        <workflow-con
          :contract="contract" :cashflows="cashflows" :cdd_item="cdd_item"
          :dowload_list="dowload_list"/>
      </div>
      <!--审批历史记录-->
      <div v-show="index[1]">
        <div class="workflow-type">
          <div class="workflow-type-icon">
            <img src="../../../assets/workflow/workflowTypeIcon@2x.png">
          </div>
          <div class="workflow-type-text">{{ workflow_desc }}</div>
        </div>
        <div class="apply-name">
          <div class="apply-name-icon">
            <div class="apply-name-icon-divide-top">
              <div class="apply-name-top-line"/>
            </div>
            <div class="apply-name-icon-box">
              <div class="icon-box-box"/>
            </div>
            <div class="apply-name-icon-divide-bottom">
              <div class="apply-name-bottom-line"/>
            </div>
          </div>
          <div class="apply-name-title">申请人:</div>
          <div class="apply-name-text">{{ submitted_by_name }}</div>
        </div>
        <div class="apply-info">
          <div v-for="(history,index) in histories" :key="index" class="apply-info-wrap">
            <div class="apply-info-line">
              <div class="line-divide-top">
                <div class="divide-top"/>
              </div>
              <div class="line-divide-icon">
                <div class="divide-icon-box"/>
              </div>
              <div class="line-divide-bottom">
                <div class="divide-bottom"/>
              </div>
            </div>
            <div class="wrap-content">
              <div class="wrap-content-arrow">
                <div class="wrap-content-arrow-box"/>
              </div>
              <div class="wrap-content-info">
                <div class="content-info-top">
                  <div class="info-top-name">{{ history.approver }}</div>
                  <div class="info-top-time">{{ history.create_date_fmt }}</div>
                  <div class="info-top-status">{{ history.action_type_desc }}</div>
                </div>
                <div class="content-info-bottom">
                  <div class="info-bottom-advise">审批意见  :</div>
                  <div class="info-bottom-description">{{ history.comment_text || '无' }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 审批意见-->
      <div v-show="index[0] && to_do_flag==='Y'" class="advise-input">
        <textarea v-model="areaInput" class="advise-input-area" placeholder="请输入审批意见" rows="4"/>
      </div>
    </h-content>
    <!--审批按钮-->
    <div v-if="to_do_flag==='Y'">
      <bottom-tab :show-divider="true">
        <tab-button
          v-for="(btn,index) in actions"
          :key="index" :class="btn.icon" @click="submit(btn.node_action_id,btn.action_type,btn.node_action_desc)">{{ btn.node_action_desc }}</tab-button>
      </bottom-tab>
    </div>
    <div v-if="to_do_flag!=='Y'">
      <bottom-tab>
        <tab-button>处理完成</tab-button>
      </bottom-tab>
    </div>
  </h-view>
</template>

<script>
import workflowPrj from './workflow-prj'
import workflowCon from './workflow-con'
export default {
  components: {
    workflowPrj,
    workflowCon,
  },
  data () {
    return {
      showInfo: [
        {
          show_flag: true,
        },
        {
          show_flag: false,
        },
        {
          show_flag: false,
        },
        {
          show_flag: false,
        },
      ],
      areaInput: '', // 审批意见
      selectItem: [],
      to_do_flag: this.$route.params.to_do_flag,
      workflow_code: this.$route.params.data.workflow_code,
      workflow_desc: this.$route.params.data.workflow_desc,
      submitted_by_name: this.$route.params.data.submitted_by_name,
      loading: false,
      index: [1, 0],
      dowload_list: [],
      histories: [], // 审批记录
      actions: [], // 按钮
      contract: {},
      cashflows: [],
      cdd_item: [],
      projects: {},
      project_bp: {},
      quote: {},
      prj_item_list: [],
    }
  },
  created: function () {
  },
  mounted: function () {
    this.initLoad()
  },
  activated: function () {
  },
  deactivated: function () {
  },
  methods: {
    switchTab: function (index) {
      let vm = this
      vm.index = [0, 0]
      vm.index[index] = 1
      if (index === 1) {
        // 查找审批历史
        vm.load_comment()
      }
    },
    /**
       * 查找按钮
       */
    load_btn: function () {
      let vm = this
      if (vm.$route.params.to_do_flag === 'Y') {
        let url = process.env.basePath + 'wfl_btn_action'
        let param = {
          node_id: this.$route.params.data.node_id,
          rcpt_record_id: this.$route.params.data.rcpt_record_id,
        }
        // hlsPopup.showLoading('请稍候');
        vm.$post(url, param).then(function (res) {
          if (res.result === 'S') {
            let arr = res.approved_action_list
            for (let i = 0; i < arr.length; i++) {
              let action = arr[i]
              if (action.action_type === '1') {
                action.icon = 'hls-icon-agree'
              } else if (action.action_type === '3' || action.action_type === '2') {
                action.icon = 'hls-icon-reject'
              }
              vm.actions.push(action)
            }
            vm.loading = true
            // hlsPopup.hideLoading();
          } else if (res.result === 'E') {
            vm.hlsPopup.showLongCenter(res.message)
            vm.loading = true
          }
        })
      }
    },
    /**
       * 查询照片
       * @param check_id
       */
    load_picture: function (checkId, index) {
      let vm = this
      let url = process.env.basePath + 'attment_download' + '&index' + index // 附件查询
      let param = {
        'check_id': checkId,
      }
      vm.$post(url, param).then(function (res) {
        if (res.result === 'S') {
          let list = res.cdd_atm_list
          vm.dowload_list.push(list)
        } else if (res.result === 'E') {
          hlsPopup.showLongCenter(res.message)
        }
      })
    },
    /**
       * 加载合同信息
       */
    load_contract: function () {
      let vm = this
      let url = process.env.basePath + 'wfl_con_sign_query' // 合同维护信息查询
      let param = {
        'contract_id': this.$route.params.data.document_id,
      }
      vm.hlsPopup.showLoading('请稍候')
      vm.$post(url, param).then(function (res) {
        if (res.result === 'S') {
          vm.contract = res.contract_list[0]
          vm.cashflows = res.contract_cashflow
          vm.cdd_item = res.con_item_list
          for (let i = 0; i < vm.cdd_item.length; i++) {
            // 查询照片
            vm.load_picture(vm.cdd_item[i].check_id)
          }
          vm.hlsPopup.hideLoading()
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
        }
      })
    },
    // 查询项目相关信息
    load_project: function () {
      let vm = this
      let url = process.env.basePath + 'wfl_prj_project_query'
      let param = {
        project_id: this.$route.params.data.document_id,
      }
      vm.hlsPopup.showLoading('请稍候')
      vm.$post(url, param).then(function (res) {
        if (res.result === 'S') {
          vm.projects = res.prj_project[0]
          vm.project_bp = res.prj_bp_list[0]
          vm.quote = res.prj_lease_list[0]
          vm.prj_item_list = res.prj_item_list
          for (let i = 0; i < vm.prj_item_list.length; i++) {
            // 查询照片
            vm.load_picture(vm.prj_item_list[i].check_id, i)
          }
          vm.hlsPopup.hideLoading()
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
        }
      })
    },
    /**
       * 加载单据信息
       */
    load_document_info: function () {
      let vm = this
      if (vm.workflow_code === 'WFL_PRJ_N') {
        vm.load_project()
      } else if (vm.workflow_code === 'CONTRACT_SIGN') {
        vm.load_contract()
      } else {
        // TODO 其他类型的工作流单据明细写在此处
      }
    },
    initLoad: function () {
      let vm = this
      // 查找按钮
      vm.load_btn()
      // 加载单据信息
      vm.load_document_info()
    },
    /**
       * 查询工作流审批历史记录
       */
    load_comment: function () {
      let vm = this
      let url = process.env.basePath + 'wfl_comment'
      let param = {
        instance_id: this.$route.params.data.instance_id,
      }
      vm.hlsPopup.showLoading('请稍候')
      vm.$post(url, param).then(function (res) {
        vm.hlsPopup.hideLoading()
        if (res.result === 'S') {
          vm.histories = res.approved_history_list
          vm.loading = true
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
          vm.loading = true
        }
      })
    },
  },

  submit: function (nodeActionId, actionType, nodeActionDesc) {
    let vm = this
    if (!vm.areaInput) {
      vm.hlsPopup.showLongCenter('请输入审批意见!')
    } else {
      let url = process.env.basePath + 'wfl_approve_agree'
      let param = {
        rcpt_record_id: this.$route.params.data.rcpt_record_id,
        node_action_id: nodeActionId,
        comment_text: vm.areaInput,
      }
      vm.hlsPopup.showLoading('请稍候')
      vm.$post(url, param).then(function (res) {
        vm.hlsPopup.hideLoading()
        if (res.result === 'S') {
          vm.hlsPopup.showLongCenter('操作成功!')
          /* $scope.$emit("back");//广播事件，向父级传送事件
            $state.go('tab.application-workflow', {}); */
        } else if (res.result === 'E') {
          vm.hlsPopup.showLongCenter(res.message)
          vm.loading = true
        }
      })
    }
  },
}
</script>

<style scoped lang="less" rel="stylesheet">
  .public-style {
    .hls-switch-tab-top {
      position: relative;
    }
    .content {
       padding-bottom: 200px;
      // margin-top: 40px;
      background-color: #fafafa;
      margin-bottom: 45px;
      padding-top: 0;
      //标准化
      .workflow-type {
        width: 100%;
        height: 30px;
        margin-top: 20px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        .workflow-type-icon {
          width: 10%;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-end;
          -webkit-justify-content: flex-end;
          align-items: center;
          -webkit-align-items: center;
          img {
            width: 50%;
          }
        }
        .workflow-type-text {
          width: 90%;
          height: 100%;
          padding-left: 2%;
          color: #6F7D81;
          font-size: 15px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          -webkit-justify-content: flex-start;
          align-items: center;
          -webkit-align-items: center;
        }
      }

      .apply-name {
        width: 100%;
        height: 30px;
        margin-top: 6px;
        margin-bottom: -3px;
        display: flex;
        display: -webkit-flex;
        justify-content: center;
        -webkit-justify-content: center;
        align-items: center;
        -webkit-align-items: center;
        .apply-name-icon {
          width: 10%;
          height: 100%;
          display: flex;
          display: -webkit-flex;
          flex-direction: column;
          -webkit-flex-direction: column;
          justify-content: center;
          -webkit-justify-content: center;
          align-items: center;
          -webkit-align-items: center;
          .apply-name-icon-divide-top {
            width: 100%;
            height: 54%;
            padding-right: 10px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;
            align-items: center;
            -webkit-align-items: center;
            .apply-name-top-line {
              width: 1px;
              height: 100%;
              background-color: #5D98F6;
            }
          }
          .apply-name-icon-box {
            width: 100%;
            //height: 20%;
            padding-right: 5px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;
            align-items: center;
            -webkit-align-items: center;
            .icon-box-box {
              width: 11px;
              height: 11px;
              background-color: #5D98F6;
              border-radius: 5px;
            }
          }
          .apply-name-icon-divide-bottom {
            width: 100%;
            height: 34%;
            padding-right: 10px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;
            align-items: center;
            -webkit-align-items: center;
            .apply-name-bottom-line {
              width: 1px;
              height: 100%;
              background-color: #5D98F6;
            }
          }
        }
        .apply-name-title {
          width: 20%;
          height: 100%;
          padding-left: 2%;
          color: #6F7D81;
          font-size: 15px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          -webkit-justify-content: flex-start;
          align-items: center;
          -webkit-align-items: center;
        }
        .apply-name-text {
          width: 70%;
          height: 100%;
          color: #6F7D81;
          font-size: 15px;
          display: flex;
          display: -webkit-flex;
          justify-content: flex-start;
          -webkit-justify-content: flex-start;
          align-items: center;
          -webkit-align-items: center;
        }
      }

      .apply-info {
        width: 100%;
        .apply-info-wrap {
          width: 100%;
          margin-bottom: -5px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          align-items: center;
          -webkit-align-items: center;
          .apply-info-line {
            width: 10%;
            height: 85px;
            display: flex;
            display: -webkit-flex;
            flex-direction: column;
            -webkit-flex-direction: column;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            .line-divide-top {
              width: 100%;
              height: 54%;
              padding-right: 10px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-end;
              -webkit-justify-content: flex-end;
              align-items: center;
              -webkit-align-items: center;
              .divide-top {
                width: 1px;
                height: 100%;
                background-color: #5D98F6;
              }
            }
            .line-divide-icon {
              width: 100%;
              //height: 20%;
              padding-right: 5px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-end;
              -webkit-justify-content: flex-end;
              align-items: center;
              -webkit-align-items: center;
              .divide-icon-box {
                width: 11px;
                height: 11px;
                background-color: #5D98F6;
                border-radius: 5px;
              }
            }
            .line-divide-bottom {
              width: 100%;
              height: 34%;
              padding-right: 10px;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-end;
              -webkit-justify-content: flex-end;
              align-items: center;
              -webkit-align-items: center;
              .divide-bottom {
                width: 1px;
                height: 100%;
                background-color: #5D98F6;
              }
            }
          }
          .wrap-content {
            width: 90%;
            margin-top: 20px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            align-items: center;
            -webkit-align-items: center;
            .wrap-content-arrow {
              width: 4%;
              display: flex;
              display: -webkit-flex;
              justify-content: flex-end;
              -webkit-justify-content: flex-end;
              align-items: center;
              -webkit-align-items: center;
              .wrap-content-arrow-box {
                width: 0px;
                height: 0px;
                border-top: 5px solid transparent;
                border-right: 10px solid #FFFFFF;
                border-bottom: 5px solid transparent;
              }
            }
            .wrap-content-info {
              width: 90%;
              padding-top: 5px;
              padding-right: 10px;
              padding-left: 10px;
              padding-bottom: 5px;
              border-radius: 5px;
              background-color: #FFFFFF;
              display: flex;
              display: -webkit-flex;
              flex-direction: column;
              -webkit-flex-direction: column;
              justify-content: center;
              -webkit-justify-content: center;
              align-items: center;
              -webkit-align-items: center;
              .content-info-top {
                width: 100%;
                height: 30px;
                display: flex;
                display: -webkit-flex;
                justify-content: space-between;
                -webkit-justify-content: space-between;
                align-items: center;
                -webkit-align-items: center;
                .info-top-name {
                  height: 100%;
                  color: #6F7D81;
                  font-size: 14px;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: flex-start;
                  -webkit-justify-content: flex-start;
                  align-items: center;
                  -webkit-align-items: center;
                }
                .info-top-time {
                  //width: 50%;
                  height: 100%;
                  color: #BABCBD;
                  font-size: 12px;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: flex-start;
                  -webkit-justify-content: flex-start;
                  align-items: center;
                  -webkit-align-items: center;
                }
                .info-top-status {
                  //width: 30%;
                  height: 100%;
                  color: #55D5A7;
                  font-size: 14px;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: flex-end;
                  -webkit-justify-content: flex-end;
                  align-items: center;
                  -webkit-align-items: center;
                  line-height: 16px;
                  max-width: 30%;
                  text-align: right;
                }
              }
              .content-info-bottom {
                width: 100%;
                height: 30px;
                display: flex;
                display: -webkit-flex;
                justify-content: flex-start;
                -webkit-justify-content: flex-start;
                align-items: center;
                -webkit-align-items: center;
                .info-bottom-advise {
                  height: 100%;
                  color: #A7A9AB;
                  font-size: 13px;
                  display: flex;
                  display: -webkit-flex;
                  justify-content: flex-start;
                  -webkit-justify-content: flex-start;
                  align-items: center;
                  -webkit-align-items: center;
                }
                .info-bottom-description {
                  width: 70%;
                  height: 100%;
                  color: #A7A9AB;
                  font-size: 13px;
                  overflow: hidden;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  margin-top: 15px;
                  line-height: 15px;
                  margin-left: 7px;
                  /*display: flex;
                  display: -webkit-flex;
                  justify-content: flex-start;
                  -webkit-justify-content: flex-start;
                  align-items: center;
                  -webkit-align-items: center;*/
                }
              }
            }
          }
        }
      }

      .list-type {
        margin-bottom: 10px;
        .list-type-title {
          width: 100%;
          height: 50px;
          background-color: #F3F3F3;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          align-items: center;
          -webkit-align-items: center;
          border-bottom: 1px solid rgba(0, 0, 0, 0.10);
          .list-type-title-icon {
            height: 100%;
            padding-left: 15px;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            img {
              //width: 40px;
              //height: 40px;
            }
          }
          .list-type-title-text {
            width: 70%;
            height: 100%;
            color: #6F7D81;
            font-size: 15px;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            align-items: center;
            -webkit-align-items: center;
          }
          .list-show {
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            -webkit-justify-content: center;
            align-items: center;
            -webkit-align-items: center;
            .list-show-text {
              height: 100%;
              color: #5D98F6;
              font-size: 12px;
              padding-right: 5px;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              -webkit-justify-content: center;
              align-items: center;
              -webkit-align-items: center;
            }
            .list-show-icon {
              height: 100%;
              padding-right: 15px;
              display: flex;
              display: -webkit-flex;
              justify-content: center;
              -webkit-justify-content: center;
              align-items: center;
              -webkit-align-items: center;
              img {
                width: 10px;
                height: 5px;
              }
            }
          }
        }
        .cashflow {
          background-color: #FFFFFF;
          .cashflow-table {
            margin-top: 10px;
            //background-color: rgb(241, 242, 245);
          }
          table {
            background-color: #FFFFFF;
            width: 95%;
            margin: 0 10px;
            font-family: verdana, arial, sans-serif;
            font-size: 14px;
            border: 1px solid #ccc;
          }
          table tr {
            border: 1px solid #ccc;
            margin-bottom: 20px;
          }
          table td {
            border: 1px solid #ccc;
            //width: 400px;
            height: 30px;
            line-height: 30px;
            margin-bottom: 10px;
          }
          table tr th {
            background: #5D98F6;
            text-align: center;
            color: white;
            line-height: 2.5em;
          }
        }
        .list {
          background-color: #fff;
          border: 1px solid rgba(0, 0, 0, 0.10);
          //margin-bottom: 20px;
          .item:last-child {
            .contents {
              border-bottom: none;
            }
          }
          .item.activated {
            background-color: #fff;
          }

          .item {
            padding: 0;
            min-height: 50px;
            height: auto;
            border: none;
            //margin-bottom: 2px;
            .info-board {
              width: 100%;
              height: 100%;
              padding:15px;
              background-color: #5D98F6;
              color: white;
              -webkit-border-radius: 5px;
              border-radius: 5px;
              .board-line1 {
                font-size: 15px;
              }
              .board-line2 {
                font-size: 22px;
                margin-top: 15px;
                margin-bottom: 35px;
              }
              .board-line3 {
                height: 35px;
                display: -webkit-flex;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .board-block {
                  width: 100%;
                  height: 100%;
                  padding-left: 10px;
                  display: -webkit-flex;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  align-items: center;
                  -webkit-align-items: center;
                  -webkit-flex-direction: column;
                  -webkit-justify-content: space-between;
                  font-size: 14px;
                  div {
                    height: 50%;
                  }
                  div:first-child {
                    line-height: 15px;
                  }
                  div:last-child {
                    line-height: 20px;
                  }
                }
                .board-block:first-child {
                  padding-left: 0
                }
                .board-block-divider {
                  width: 3px;
                  height: 100%;
                  background-color: rgb(148, 196, 246);
                }
              }
            }
            .contents {
              height: 100%;
              width: calc(100% - 15px);
              border-bottom: 2px solid #F3F3F3;
              float: right;
              display: -webkit-flex;
              display: flex;
              justify-content: space-between;
              align-items: center;
              -webkit-justify-content: space-between;
              -webkit-align-items: center;
              padding-right: 15px;
              .add-name {
                display: -webkit-flex;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                -webkit-justify-content: flex-start;
                -webkit-align-items: center;
                color: #707E83;
                font-size: 14px;
              }
              .add-content {
                display: -webkit-flex;
                display: flex;
                justify-content: flex-end;
                align-items: center;
                -webkit-justify-content: flex-end;
                -webkit-align-items: center;
                width: 100%;
                font-size: 14px;
                color: #3C3C3C;
                min-height: 50px;
                white-space: normal;
                word-break: break-all;
                word-wrap: break-word;
                line-height: 20px;
                input {
                  text-align: right;
                  font-size: 15px;
                  padding: 0;
                  color: #333333;
                  letter-spacing: -0.39px;
                  width: 100%;
                  margin-left: 5px;
                  background-color: #fff;
                }
              }
              .attach-icon-box {
                width: 5%;
                .attach-icon {
                  width: 10px;
                  height: 10px;
                  background-color: #5D98F6;
                  border-radius: 10px;
                  float: left;
                }
              }
              .attach-name {
                width: 95%;
                display: -webkit-flex;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                -webkit-justify-content: flex-start;
                -webkit-align-items: center;
                font-size: 15px;
                color: #5D98F6;
                //margin-right: 75%;
              }
              .attach-content {
                width: 100%;
                .add-button {
                  .picture {
                    float: left;
                    .close {
                      position: absolute;
                      font-size: 16px;
                      color: #ff3b30;
                      margin-top: -7px;
                      margin-left: 20px;
                    }
                  }
                  img {
                    margin-right: 5px;
                    width: 50px;
                    height: 50px;
                    float: left;
                    margin-bottom: 10px
                  }
                }
              }
            }
            .attach-hint {
              padding: 0 10px 0 20px;
              color: rgb(181, 181, 181);
              font-size: 14px;
              margin: 10px 0;
              white-space: normal;
            }
          }
          .work-board {
            height: 150px;
            padding: 0 10px;
          }
          .attach-item-title {
            height: 40px;
          }
          .attach-item {
            min-height: 80px;
            height: auto;
            padding-bottom: 10px;
          }
          .list-title {
            height: 50px;
            color: #5D98F6;
            line-height: 45px;
            border-bottom: 2px solid #F3F3F3;
            padding-left: 15px;
            .list-title-text {
              font-size: 15px;
              color: #5D98F6;
              width: 90%;
            }
          }
        }
        .financing-list {
          .list {
            padding-top: 10px;
          }
        }
      }

        .transfer-people {
          width: 100%;
          height: 50px;
          background-color: #FFFFFF;
          border-bottom: 1px solid #F3F3F3;
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;
          .transfer-people-text {
            width: 40%;
            height: 100%;
            font-size: 14px;
            padding-left: 5px;
            color: #218DEB;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            align-items: center;
            -webkit-align-items: center;
          }
          .transfer-people-icon {
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-start;
            -webkit-justify-content: flex-start;
            align-items: center;
            -webkit-align-items: center;
            img {
              width: 7px;
              height: 14px;
            }
          }
          .transfer-people-switch {
            width: 40%;
            height: 100%;
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;
            align-items: center;
            -webkit-align-items: center;
            input {
              width: 100%;
              height: 100%;
              font-size: 14px;
              line-height: 14px;
              text-align: right;
              padding-right: 5px;
              background-color: #FFFFFF;
            }
          }
        }
        .advise-input {
          width: 100%;
          .advise-input-area {
            padding: 15px;
            width: 100%;
            font-size: 14px;
            line-height: 20px;
          }
        }
    }
    .gray {
      background-color: #f3f3f3;
    }
    .hls-icon-agree {
      color: #4AD2A1;
    }
    .hls-icon-reject {
      color: #F8746D;
    }
    .hls-icon-transfer {
      color: #F3A823;
    }
  }

</style>
