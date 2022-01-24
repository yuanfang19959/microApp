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

      <!-- 备注 -->
      <div class="card" v-if="step == 2">
        <Form label-width="120px">
          <Field
            v-model="contacttime"
            autosize
            label="预计联系用户日期"
            placeholder="预计联系用户日期"
            required
            title-width="160"
            @click="showCalendar = true"
          />
          <Field
            v-model="remark"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            label="备注"
            placeholder="请输入备注"
            show-word-limit
          />
        </Form>
      </div>
    </div>

    <div class="bottomBox">
      <div class="userbox" @click="showPickers">
        <img :src="user" alt="" class="user" />
        <span class="userText"> 流程 </span>
      </div>
      <!-- 待审批审按钮展示展示 start-->
      <Button
        v-if="step == 1"
        type="primary"
        size="large"
        round
        native-type="submit"
        class="btn"
        @click="showPend"
        >审 批</Button
      >
      <!-- 待审批审按钮展示展示 end-->

      <!-- 待确认按钮展示展示 start-->
      <Button
        v-if="step == 2"
        type="primary"
        size="large"
        round
        @click="commit"
        class="btn"
        >立即提交</Button
      >
      <!-- 待确认按钮展示展示 end-->

      <!-- 待反馈按钮组 -->
      <div class="btn-box" v-if="step == 3">
        <Row justify="center" gutter="20">
          <Col>
            <Button type="primary" size="small" round @click="showFoward"
              >转发</Button
            >
          </Col>
          <Col>
            <Button type="success" size="small" round @click="showPend"
              >反馈</Button
            >
          </Col>
          <Col>
            <Button type="danger" size="small" round @click="showExtend"
              >延期</Button
            >
          </Col>
        </Row>
      </div>
      <!-- 待反馈按钮组 -->
    </div>

    <!-- 流程节点 -->
    <ApprovePopup ref="approveRef" />

    <!-- 待审批审批按钮 -->
    <PendInput ref="pendInputRef" :isPend="isPend" />

    <!-- 待反馈转发 -->
    <Foward ref="fowardRef" />

    <!-- 待反馈延期 -->
    <Extend ref="extendRef" />

    <!-- 日历 -->
    <Calendar
      v-model:show="showCalendar"
      @confirm="onConfirm"
      color="#1989fa"
    />

    <!-- 选择picker -->
    <Popup v-model:show="showColume" position="bottom">
      <Picker
        :columns="columns"
        @confirm="onConfirms"
        @cancel="showColume = false"
      />
    </Popup>
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
  formData: {
    username: "",
    value: "",
    showCalendar: false,
  },
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
const result = ref("");
const showCalendar = ref(false);
const showColume = ref(false);
const approveRef = ref(null);
const pendInputRef = ref(null);
const fowardRef = ref(null);
const extendRef = ref(null);
const step = ref("");
const billno = ref("");
const isPend = ref(true); // 此字段用于判断当前是否在待审批以及待反馈用
let { formData, infoList, obj, extendList, urlArr, contacttime,remark } = toRefs(state);
/**
 * 1 待审批 2 待确认 3 待反馈  4 已办理
 */
onMounted(() => {
  let { type } = useRoute().query;
  billno.value = useRoute().query.billno;
  console.log(billno.value);
  getInfo();

  if (type == 0) {
    step.value = 2;
  } else if (type == 1) {
    step.value = 3;
    isPend.value = false;
  } else if (type == 2) {
    step.value = 1;
  } else if (type == 3) {
    step.value = 4;
  }
});

/**
 *待确认=> 立即提交
 */
const commit = () => {
  console.log(obj,'obj')
  let { contacttime, remark } = state
  service({
    url: BILLCONFIRM,
    method: "POST",
    data: {
      billno:obj.value.billno,
      contacttime,
      remark,
      userno: obj.value.clientid,
    },
  }).then((res) => {
    if (res.data.code == '200'){
      Toast("操作成功")
    }else{
      Toast(res.data.msg)
    }
  });
};

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
/**
 *日期选择确认
 */
const onConfirm = (date) => {
  state.contacttime = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  showCalendar.value = false;
  console.log(state.contacttime,'state.contacttime');
};

/**
 * 流程弹窗显示
 */
const showPickers = () => {
  approveRef.value.toggle(billno.value);
};

/**
 * 待审批以及待反馈流程输入
 */
const showPend = () => {
  pendInputRef.value.toggle(obj.value);
};

/**
 * 待反馈转发
 */
const showFoward = () => {
  fowardRef.value.toggle(obj);
};

/**
 * 待反馈延期
 */
const showExtend = () => {
  extendRef.value.toggle(obj.value);
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
    padding: 0 20px 158px;
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
  .bottomBox {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 138px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .userbox {
      width: 300px;
      height: 98px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .user {
        height: 42px;
        width: 56px;
      }
      .userText {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #666666;
      }
    }
    .btn-box {
    }
    .btn {
      width: 365px;
      height: 98px;
      background: #73b4ff;
      border-radius: 12px;
      border: none;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
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
