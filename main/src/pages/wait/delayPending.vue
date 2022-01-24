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

      <!-- 延时信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">延时信息</span>
        </div>

        <div class="base-info" v-for="(i, index) in extendList" :key="index">
          <div class="base-left">
            <span>{{ i.name }}</span>
          </div>
          <div class="base-right">{{ obj[i.value] || "-" }}</div>
        </div>
      </div>

      <!-- 审核信息 -->
      <div class="card">
        <div class="title">
          <span>|</span>
          <span class="titleText">审核信息</span>
        </div>

        <div class="card">
          <Form label-width="120px">
            <Field
              v-model="formData.approvetime"
              is-link
              readonly
              name="approvetime"
              label="审核时间"
              placeholder="请选择审核时间"
              @click="showDatetimePicker('approvetime')"
              :rules="[{ required: true, message: '请选择审核时间' }]"
            />
            <Field name="radio" label="是否领导审核">
              <template #input>
                <RadioGroup
                  v-model="formData.isleadapprove"
                  direction="horizontal"
                >
                  <Radio name="1">是</Radio>
                  <Radio name="0">否</Radio>
                </RadioGroup>
              </template>
            </Field>
            <Field
              v-model="formData.approveremark"
              rows="2"
              autosize
              type="textarea"
              maxlength="50"
              label="处理结果"
              placeholder="请输入处理结果"
              show-word-limit
            />
          </Form>
        </div>
      </div>
    </div>

    <div class="bottomBox">
      <!-- 待确认按钮展示展示 end-->

      <!-- 待反馈按钮组 -->
      <div class="btn-box">
        <Row justify="center" gutter="10">
          <Col>
            <Button type="primary" size="small" round @click="commit(0)"
              >驳回</Button
            >
          </Col>
          <Col>
            <Button type="success" size="small" round @click="commit(1)"
              >同意</Button
            >
          </Col>
        </Row>
      </div>
      <!-- 待反馈按钮组 -->
    </div>

    <!-- 日历 -->
    <Popup v-model:show="showCalendar" position="bottom">
      <DatetimePicker
        v-model="currentDate"
        @confirm="currentDateOnConfirm"
        type="datetime"
        title="选择完整时间"
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
  RadioGroup,
  Radio,
  DatetimePicker,
} from "vant";
import { onMounted, reactive, ref, toRefs } from "vue";
import { useRoute, useRouter } from "vue-router";
import { service } from "@/utils/request";
import {
  BILLINFO,
  LOADFILE,
  GET_PICKER_DATA,
  BILLCONFIRM,
  DELAYINFO,
  DELAYREVIEW,
} from "@/utils/api";

const state = reactive({
  formData: {
    approvetime: "",
    isleadapprove: "1",
    approveremark: "",
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
  extendList: [
    {
      name: "原始时间:",
      value: "oldtime",
    },
    {
      name: "延迟时间:",
      value: "newtime",
    },
    {
      name: "总共延期:",
      value: "totalhour",
    },
    {
      name: "本期延期:",
      value: "currenthour",
    },
    {
      name: "延期理由:",
      value: "applyinfo",
    },
  ],
  urlArr: [],
  contacttime: "", //预计用户时间,
  remark: "", // 备注
  currentDate: new Date(),
  formDataTimeName: "",
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
const delayedid = ref("");
const isPend = ref(true); // 此字段用于判断当前是否在待审批以及待反馈用
let {
  formData,
  infoList,
  obj,
  extendList,
  urlArr,
  contacttime,
  remark,
  currentDate,
  formDataTimeName,
} = toRefs(state);

onMounted(() => {
  billno.value = useRoute().query.billno;
  delayedid.value = useRoute().query.delayedid;
  console.log(billno.value);
  getInfo();
});

const showDatetimePicker = (name) => {
  state.formDataTimeName = name;
  showCalendar.value = true;
};

const currentDateOnConfirm = (date) => {
  state.formData[`${state.formDataTimeName}`] = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  showCalendar.value = false;
};

/**
 *待确认=> 立即提交
 */
const commit = (approvestate) => {
  console.log(state.formData, "formData");
  state.formData.billno = obj.value.billno;
  state.formData.delayedid = obj.value.delayedid;
  state.formData.userno = obj.value.clientid;
  state.formData.newtime = obj.value.newtime;
  state.formData.approvetotalstate = obj.value.approvetotalstate;
  state.formData.approvestate = approvestate;
  service({
    url: DELAYREVIEW,
    method: "POST",
    data: state.formData,
  }).then((res) => {
    if (res.data.code == "200") {
      Toast("操作成功");
    } else {
      Toast(res.data.msg);
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
    getDelayedInfo();
  });
};
/**
 * 获取延时信息
 */
const getDelayedInfo = () => {
  service({
    url: DELAYINFO,
    method: "get",
    params: {
      delayedid: delayedid.value,
    },
  }).then((res) => {
    obj.value = Object.assign(obj.value, res.data.data[0]);
    console.log(obj.value, "33");
  });
};

/**
 * 待反馈延期
 */
const showExtend = () => {
  extendRef.value.toggle(obj.value);
};
</script>

<style lang="scss" scoped>
:deep(.van-popup) {
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
      width: 465px;
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
