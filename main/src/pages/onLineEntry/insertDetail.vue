<!-- 待审批 -->
<template>
  <div class="form">
    <div class="formBox">
      <!-- 基础信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">基础信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in infoList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>
          <div class="base-right">{{ obj[i.value] || "-" }}</div>
        </div>
      </div>

      <!-- 补充信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">补充信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in extendList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>
          <div class="base-right">{{ obj[i.value] || "-" }}</div>
        </div>
      </div>

      <!-- 其他信息 -->
      <div class="card" v-if="step != 2">
        <div class="title">
          <span>|</span>
          <span class="titleText">其他信息</span>
        </div>
        <Row justify="space-around">
          <Col v-for="(item, idx) in urlArr" :key="idx">
            <div class="uploadBox">
              <img :src="item" alt="" class="phone" />
            </div>
          </Col>
        </Row>
      </div>

    </div>
  </div>
</template>

<script setup>
import user from "@/assets/user.png";
import phone from "@/assets/phone.png";
import ApprovePopup from "@/pages/wait/component/ApprovePopup.vue";
import PendInput from "@/pages/wait/component/PendInput.vue";
import Foward from "@/pages/wait/component/Foward.vue";
import Extend from "@/pages/wait/component/Extend.vue";
import {
  Field,
  Form,
  Uploader,
  Button,
  Popup,
  Calendar,
  Picker,
  Toast,
  Row,
  Col,
} from "vant";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import { BILLINFO, LOADFILE, GET_PICKER_DATA, BILLCONFIRM } from "@/utils/api";

const state = reactive({
  obj: {},
  infoList: [
    {
      name: "工单编号:",
      value: "billno",
    },
    {
      name: "派单时间:",
      value: "notetime",
    },
    {
      name: "工单状态:",
      value: "billstatus",
    },
    {
      name: "紧急程度:",
      value: "urgencyval",
    },
    {
      name: "诉求类型:",
      value: "problemtypeval",
    },
    {
      name: "工单类型:",
      value: "reflecttype",
    },
    {
      name: "反应来源:",
      value: "reflectsource",
    },
  ],
  extendList: [
    {
      name: "户号:",
      value: "clientid",
    },
    {
      name: "联系人:",
      value: "clientname",
    },
    {
      name: "联系方式:",
      value: "tel",
    },
    {
      name: "联系地址:",
      value: "address",
    },
    {
      name: "来电号码:",
      value: "incomingtel",
    },
    {
      name: "维修人员:",
      value: "repairval",
    },
    {
      name: "维修电话:",
      value: "repairtel",
    },
    {
      name: "工单概况:",
      value: "dealinfo",
    },
  ],
  urlArr: [],
  contacttime:"", //预计用户时间,
  remark:"" , // 备注
});
const step = ref("");
const billno = ref("");
let { infoList, obj, extendList, urlArr, contacttime,remark } = toRefs(state);

onMounted(() => {
  billno.value = useRoute().query.billno;
  console.log(billno.value);
  getInfo();
});

/**
 * 获取详情信息
 */
const getInfo = () => {
  service({
    url: BILLINFO,
    method: "get",
    params: {
      billno: billno.value,
    },
  }).then((res) => {
    obj.value = res.data.data[0];
    if (obj.value.fileno) {
      let arr = obj.value.fileno.split(",");
      arr.forEach((item) => {
        getLoadFile(item);
      });
    }
  });
};
const getLoadFile = (item) => {
  service({
    url: LOADFILE,
    method: "get",
    responseType: "arraybuffer",
    params: {
      fileId: item,
      type: "preview",
    },
  }).then((res) => {
    let url =
      "data:image/png;base64," +
      btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
    state.urlArr = [...state.urlArr, url];
  });
};

</script>

<style lang="scss" scoped>
:deep(.van-popup){
  max-height: 80%;
}
.form {
  padding: 20px 0 0;
  box-sizing: border-box;
  background: #f5f5f5;
  min-height: 100vh;
  :deep(.van-field) {
    padding-left: 10px;
  }
  .formBox {
    padding: 0 20px 20px;
  }
  .uploadBox {
    width: 170px;
    height: 170px;
    background: #ffffff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .phone {
      width: 100%;
      height: 100%;
    }
  }
}
.card {
  margin-bottom: 20px;
  width: 100%;
  background: #ffffff;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 0 20px 20px;
  box-sizing: border-box;
  .title {
    padding: 20px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #6fb2ff;
    .titleText {
      margin-left: 20px;
    }
  }

  @mixin flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .base-info {
    @include flex;
    margin-bottom: 25px;
    margin-top: 5px;
    padding-left: 30px;
    .base-left {
      min-width: 200px;
      @include flex;
      color: #666666;
      span {
        font-size: 28px;
        padding-right: 35px;
      }
    }
    .base-right {
      font-size: 28px;
    }
  }
}
</style>
