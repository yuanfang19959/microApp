<!-- 延期popup -->
<template>
  <Popup v-model:show="pendingInput" position="bottom">
    <div class="wait-pending">
      <Form @submit="onSubmit">
        <div class="card bodernone">
          <div class="title">
            <span>|</span>
            <span class="titleText">申请延期</span>
          </div>
          <Field
            v-model="formData.oldtime"
            name="oldtime	"
            label="原始时间"
            readonly
          />
          <Field
            v-model="formData.newtime"
            is-link
            readonly
            name="newtime"
            label="延期时间"
            placeholder="请选择延期时间"
            @click="showDatetimePicker('newtime')"
            :rules="[{ required: true, message: '请选择延期时间' }]"
          />
          <div class="tips">延长了时长: <span>89</span>小时</div>
          <Field
            v-model="formData.answerway_label"
            is-link
            readonly
            name="answerway"
            label="回复方式"
            placeholder="请选择回复方式"
            @click="showColumePopup('answerway')"
            :rules="[{ required: true, message: '请选择回复方式' }]"
          />
          <Field
            v-model="formData.answertime"
            is-link
            readonly
            name="answertime"
            label="回复时间"
            placeholder="请选择回复时间"
            @click="showDatetimePicker('answertime')"
            :rules="[{ required: true, message: '请选择回复时间' }]"
          />
          <Field
            v-model="formData.applyinfo"
            label="延期原因"
            rows="2"
            autosize
            type="textarea"
            placeholder="请输入延期原因"
            show-word-limit
          />
        </div>

        <!-- 待反馈延期start -->
        <div class="btn-grounp">
          <Row justify="center">
            <Col span="6">
              <Button color="#7232dd" @click=" pendingInput = false " plain size="normal" class="btns"
                >取消</Button
              >
            </Col>
            <Col span="6">
              <Button
                type="danger"
                native-type="submit"
                size="normal"
                class="btns"
                >确认申请</Button
              >
            </Col>
          </Row>
        </div>
        <!-- 待反馈延期end -->
      </Form>
    </div>
  </Popup>

  <!-- 选择picker -->
  <Popup v-model:show="showColume" position="bottom">
    <Picker
      :columns="columns"
      @confirm="onConfirms"
      @cancel="showColume = false"
    />
  </Popup>

  <!-- 日历 -->
  <!-- <Calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" /> -->
  <Popup v-model:show="showCalendar" position="bottom">
    <DatetimePicker
      v-model="currentDate"
      @confirm="currentDateOnConfirm"
      type="datetime"
      title="选择完整时间"
    />
  </Popup>
</template>

<script setup>
import { reactive, ref, toRefs, defineExpose, defineProps } from "vue";
import {
  Field,
  Form,
  Button,
  Popup,
  Calendar,
  Picker,
  Row,
  Col,
  DatetimePicker,
  Toast
} from "vant";
import { GET_PICKER_DATA, BILLDELAYED } from "@/utils/api";
import { service } from "@/utils/request";

const state = reactive({
  formData: {
    billno: "", //工单编号
    userno: "", //用户编号
    oldtime: "", //原始时间
    newtime: "", //延期时间‘
    answerway: "", //回复方式
    answertime: "", //回复时间
    applyinfo: "", //延期原因
  },

  formDataTimeName: "",
  columns: [],
  currentDate: new Date(),
});
const pendingInput = ref(false);
const showColume = ref(false);
const showCalendar = ref(false);
let { formData, infoList, minDate, maxDate, currentDate, columns } = toRefs(
  state
);

/**
 * 控制popup显示隐藏
 */
const toggle = (obj) => {
  console.log(obj, "obj");
  getDictionary("answerway");
  state.formData.oldtime = obj.completelimit;
  state.formData.billno = obj.billno;
  state.formData.userno = obj.clientid;
  pendingInput.value = !pendingInput.value;
};

/**
 * 数据字典
 */
const getDictionary = (name) => {
  service({
    url: GET_PICKER_DATA,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno,
      name,
      param1: JSON.parse(localStorage.getItem("usreInfo")).area,
    },
  }).then((res) => {
    let arr = JSON.parse(res.data.data);
    arr.forEach((item) => {
      (item.text = item.info), (item.formName = name), (item.value = item.code);
    });
    state[name] = arr;
    console.log(arr, name);
  });
};

/**
 * 打开单选
 */
const showColumePopup = (name) => {
  showColume.value = true;
  state.columns = state[name];
};

/**
 * 单选确定
 */
const onConfirms = (value) => {
  state.formData[`${value.formName}_label`] = value.text;
  state.formData[`${value.formName}`] = value.code;
  showColume.value = false;
};

/**
 * 打开时间弹框
 */
const showDatetimePicker = (name) => {
  state.formDataTimeName = name;
  showCalendar.value = true;
  console.log(showCalendar.value);
};

/**
 * 日期选择确认
 */
const currentDateOnConfirm = (date) => {
  console.log(
    `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  );
  state.formData[`${state.formDataTimeName}`] = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  showCalendar.value = false;
};

/**
 * 表单提交
 */
const onSubmit = (values) => {
  console.log(state.formData, "formData");
  for (var item in state.formData) {
    if (item.includes("_label")) {
      delete state.formData[item];
    }
  }
  service({
    url: BILLDELAYED,
    method: "post",
    data: state.formData,
  }).then((res) => {
    if (res.data.code == '200') {
      Toast("操作成功");
      pendingInput.value = false
      state.formData = {}
    }
  });
};

defineExpose({
  toggle,
});
</script>

<style lang="scss" scoped>
.wait-pending {
  max-height: 90vh;
  position: relative;
  .bodernone {
    border: none;
  }
  .btn-grounp {
    padding: 20px 0 50px 0;
    width: 100%;
    border: 0;
    .btns {
      height: 60px;
    }
  }
  .nbsp {
    height: 180px;
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
.tips {
  padding: 20px 50px;
  text-align: right;
  font-size: 24px;
  span {
    color: red;
  }
}
</style>
