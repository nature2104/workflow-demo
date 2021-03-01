<template>
  <div>
    <!--合同基本信息-->
    <div class="list-type">
      <div class="list-type-title">
        <div class="list-type-title-icon">
          <img src="../../../assets/workflow/item@2x.png">
        </div>
        <div class="list-type-title-text">合同基本信息</div>
        <div class="list-show" @click="changeShow(0)">
          <div v-if="showInfo[0].show_flag" class="list-show-text">收起</div>
          <div v-if="!showInfo[0].show_flag" class="list-show-text">展开</div>
          <div class="list-show-icon">
            <img v-if="!showInfo[0].show_flag" src="../../../assets/workflow/show@2x.png">
            <img v-if="showInfo[0].show_flag" src="../../../assets/workflow/close@2x.png">
          </div>
        </div>
      </div>
      <div v-if="showInfo[0].show_flag" class="list">
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>主承租人</div>
            </div>
            <div class="add-content">{{ contract.bp_id_tenant_n }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>项目编号</div>
            </div>
            <div class="add-content">{{ contract.project_number }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>合同编号</div>
            </div>
            <div class="add-content">{{ contract.contract_number }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>公司名称</div>
            </div>
            <div class="add-content">{{ contract.company_id_n }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>业务类型</div>
            </div>
            <div class="add-content">{{ contract.business_type_n }}</div>
          </div>
        </div>

        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>产品线</div>
            </div>
            <div class="add-content">{{ contract.division_n }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>自动扣款银行</div>
            </div>
            <div class="add-content">{{ contract.direct_debit_bank_id_n }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>账户名</div>
            </div>
            <div class="add-content">{{ contract.dd_bank_account_name }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>账户号</div>
            </div>
            <div class="add-content">{{ contract.dd_bank_account_num }}</div>
          </div>
        </div>
        <div class="item">
          <div class="contents">
            <div class="add-name">
              <div>账户类型</div>
            </div>
            <div class="add-content">{{ contract.ebank_account_prop_n }}</div>
          </div>
        </div>
      </div>
    </div>
    <!--资金信息-->
    <div class="list-type">
      <div class="list-type-title">
        <div class="list-type-title-icon">
          <img src="../../../assets/workflow/item@2x.png">
        </div>
        <div class="list-type-title-text">资金信息</div>
        <div class="list-show" @click="changeShow(1)">
          <div v-if="showInfo[1].show_flag" class="list-show-text">收起</div>
          <div v-if="!showInfo[1].show_flag" class="list-show-text">展开</div>
          <div class="list-show-icon">
            <img v-if="!showInfo[1].show_flag" src="../../../assets/workflow/show@2x.png">
            <img v-if="showInfo[1].show_flag" src="../../../assets/workflow/close@2x.png">
          </div>
        </div>
      </div>
      <div v-if="showInfo[1].show_flag" class="list">
        <div class="financing-list list">
          <div class="work-board item">
            <div class="info-board">
              <div class="board-line1">融资额 (元)</div>
              <div class="board-line2">{{ contract.finance_amount | currency }}</div>
              <div class="board-line3">
                <div class="board-block">
                  <div>月供 (元)</div>
                  <div>{{ contract.pmt | currency }}</div>
                </div>
                <div class="board-block-divider"/>
                <div class="board-block">
                  <div>还款频率</div>
                  <div>{{ contract.annual_pay_times_n }}</div>
                </div>
                <div class="board-block-divider"/>
                <div class="board-block">
                  <div>合同期数</div>
                  <div>{{ contract.lease_times }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>价目表</div>
              </div>
              <div class="add-content">{{ contract.price_list_n }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>租赁物款总价款(元)</div>
              </div>
              <div class="add-content">{{ contract.lease_item_amount | currency }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>租金总额(元)</div>
              </div>
              <div class="add-content">{{ contract.net_lease_item_amount | currency }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>租赁年限(年)</div>
              </div>
              <div class="add-content">{{ contract.lease_term }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>首付款比例/金额</div>
              </div>
              <div class="add-content">{{ contract.down_payment_ratio_together }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>保证金比例/金额</div>
              </div>
              <div class="add-content">{{ contract.deposit_ratio_together }}</div>
            </div>
          </div>
          <div class="item">
            <div class="contents">
              <div class="add-name">
                <div>手续费比例/金额</div>
              </div>
              <div class="add-content">{{ contract.lease_charge_ratio_together }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--现金流信息-->
    <div class="list-type">
      <div class="list-type-title">
        <div class="list-type-title-icon">
          <img src="../../../assets/workflow/item@2x.png">
        </div>
        <div class="list-type-title-text">现金流信息</div>
        <div class="list-show" @click="changeShow(2)">
          <div v-if="showInfo[2].show_flag" class="list-show-text">收起</div>
          <div v-if="!showInfo[2].show_flag" class="list-show-text">展开</div>
          <div class="list-show-icon">
            <img v-if="!showInfo[2].show_flag" src="../../../assets/workflow/show@2x.png">
            <img v-if="showInfo[2].show_flag" src="../../../assets/workflow/close@2x.png">
          </div>
        </div>
      </div>
      <div v-if="showInfo[2].show_flag" class="cashflow list">
        <table class="cashflow-table" cellspacing="5">
          <tr>
            <th>期数</th>
            <th>计算日</th>
            <th>还本计划</th>
            <th>利息计划</th>
          </tr>
          <tr v-for="cash in cashflows">
            <td style="text-align:center">
              {{ cash.times }}
            </td>
            <td style="text-align:center">
              {{ cash.due_date }}
            </td>
            <td style="text-align:center">
              {{ cash.principal | currency }}
            </td>
            <td style="text-align:center">
              {{ cash.interest | currency }}
            </td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 附件信息-->
    <div class="list-type">
      <div class="list-type-title">
        <div class="list-type-title-icon">
          <img src="../../../assets/workflow/item@2x.png">
        </div>
        <div class="list-type-title-text">附件信息</div>
        <div class="list-show" @click="changeShow(3)">
          <div v-if="showInfo[3].show_flag" class="list-show-text">收起</div>
          <div v-if="!showInfo[3].show_flag" class="list-show-text">展开</div>
          <div class="list-show-icon">
            <img v-if="!showInfo[3].show_flag" src="../../../assets/workflow/show@2x.png">
            <img v-if="showInfo[3].show_flag" src="../../../assets/workflow/close@2x.png">
          </div>
        </div>
      </div>
      <div v-for="item_list in cdd_item" v-if="showInfo[3].show_flag" class="list">
        <div class="attach-item-title item">
          <div class="contents">
            <div class="attach-icon-box">
              <div class="attach-icon"/>
            </div>
            <div class="attach-name">
              <div>{{ item_list.cdd_item_desc }}</div>
            </div>
          </div>
        </div>
        <div class="attach-item item">
          <div class="contents">
            <div class="attach-content">
              <div class="add-button">
                <!--从服务器上下载的图片-->
                <div v-for="list in dowload_list">
                  <div v-for="pic in list" v-if="pic.check_id==item_list.check_id" class="picture">
                    <img :src="pic.dataBase64String" @click="showBigPicture(pic.dataBase64String)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contract: {
      type: Object,
      default: function () {
        return { }
      },
    },
    cashflows: {
      type: Array,
      default: function () {
        return Array()
      },
    },
    cdd_item: {
      type: Array,
      default: function () {
        return Array()
      },
    },
    dowload_list: {
      type: Array,
      default: function () {
        return Array()
      },
    },
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
    }
  },
  created: function () {
  },
  mounted: function () {
  },
  activated: function () {
  },
  deactivated: function () {
  },
  methods: {
    // 明细页面展开收起事件
    changeShow: function (i) {
      debugger
      let vm = this
      vm.showInfo[i].show_flag = !vm.showInfo[i].show_flag
    },
    /**
       * 图片放大预览
       * @param imgObject.imgUrl
       */
    showPicture: function (imgUrl) {
      hlsPopup.showBigPicture({
        imgUrl: imgUrl,
      })
    },
  },
}
</script>

<style scoped lang="less" rel="stylesheet">
  .s-tab {
    width: 100%;
    background: #fff;
    padding: 0 20px;
    margin-top: 44px;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    justify-content: space-around;
    -webkit-align-items: center;
    -webkit-justify-content: space-around;
    -webkit-box-shadow: 0 1px 1px rgb(234, 235, 236);
    box-shadow: 0 1px 1px rgb(226, 229, 231);
    .s-tab-title {
      font-size: 12px;
      height: 40px;
      color: rgb(124, 130, 141);
      display: -webkit-flex;
      display: flex;
      align-items: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-justify-content: center;
    }
    .s-tab-title.active {
      color: #5D98F6;
    }
  }

  .content {
    margin-top: 0;
    background-color: #fafafa;
    margin-bottom: 45px;
    padding-top: 0;
    position: fixed;
    top: 85px;
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
            width: 50%;
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
            padding: 15px;
            background-color: #5D98F6;
            color: white;
            -webkit-border-radius: 5px;
            border-radius: 5px;
            .board-line1 {
              font-size: 15px;
              display: flex;
            }
            .board-line2 {
              font-size: 22px;
              margin-top: 15px;
              margin-bottom:35px;
              display: flex;
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
            width: calc(~"100% - 15px");
            border-bottom: 1px solid #F3F3F3;
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
              width: 60%;
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
            display: flex;
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
            display: flex;
          }
        }
      }
      .financing-list {
        padding-top: 10px;
        .list {

        }
      }
    }
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
        img{
          width: 50%;
        }
      }
      .workflow-type-text {
        width: 90%;
        height: 100%;
        padding-left: 2%;
        color: #6F7D81;
        font-size: 30px;
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
        font-size:15px;
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
        font-size:15px;
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
                line-height:16px;
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
          line-height:14px;
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

  .bottom-tab {
    height: 45px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    display: -webkit-flex;
    display: flex;
    align-items: center;
    -webkit-align-items: center;
    justify-content: flex-start;
    -webkit-justify-content: flex-start;
    -webkit-box-shadow: 0 -1px 1px rgb(234, 235, 236);
    box-shadow: 0 -1px 1px rgb(226, 229, 231);
    font-size: 15px;
    .button-box {
      flex: 1;
      height: 60%;
      border-right: 1px solid #ccc;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      .button-btn {
        font-size: 15px;
        color: #5D98F6;
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
    .button-box:last-child {
      border: none;
    }
    .button-divide {
      width: 1px;
      height: 80%;
      background-color: #E7E7E7;
      display: -webkit-flex;
      display: flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
    }
  }
</style>
