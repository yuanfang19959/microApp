<template>
  <div class="form">
    <Form @submit="onSubmit">
      <div class="formBox">
        <!-- 来电信息 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">来电信息</span>
          </div>
          <Field
            v-model="formData.clientname"
            required
            name="clientname"
            label="联系人"
            placeholder="请输入联系人"
            :rules="[{ required: true, message: '请输入联系人' }]"
          />
          <Field
            v-model="formData.incomingtel"
            required
            name="incomingtel"
            label="来电号码"
            placeholder="请输入来电号码"
            :rules="[{ required: true, message: '请输入来电号码' }]"
          />

          <Field
            v-model="formData.userno"
            name="userno"
            label="用户编码"
            placeholder="请输入用户编码"
          />
          <Field
            v-model="formData.address"
            name="address"
            label="地址"
            placeholder="请输入地址"
          />
          <Field
            v-model="serviceUnit"
            is-link
            readonly
            name="serviceUnit"
            label="服务单位"
            placeholder="请选择服务单位"
            @click="choosePicker('unitnoselect')"
          />
          <Field
            v-model="repairPerson"
            is-link
            readonly
            name="repairPerson"
            label="维修人员"
            placeholder="请选择维修人员"
            @click="choosePicker('childuserlist')"
          />
        </div>
        <!-- 工单类型 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">工单类型</span>
          </div>
          <Field
            v-model="formData.reflecttypeval"
            is-link
            required
            readonly
            name="reflecttypeval"
            label="工单小类"
            placeholder="请选择工单小类"
            @click="choosePicker('apptype')"
            :rules="[{ required: true, message: '请选择工单小类' }]"
          />
          <Field
            v-model="formData.dealinfo"
            rows="2"
            autosize
            name="dealinfo"
            label="工单内容"
            type="textarea"
            maxlength="50"
            placeholder="请输入工单内容"
            show-word-limit
          />
        </div>
        <!-- 完成结果 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">完成结果</span>
          </div>
          <Field
            v-if="
              formData.reflecttypeval === '不热' ||
              formData.reflecttypeval === '测温'
            "
            v-model="formData.temperature"
            required
            name="temperature"
            label="温度"
            type="number"
            placeholder="请输入测量温度"
            :rules="[{ required: true, message: '请输入测量温度' }]"
          />
          <Field
            v-if="
              formData.reflecttypeval === '不热' ||
              formData.reflecttypeval === '测温'
            "
            v-model="formData.reason"
            is-link
            readonly
            name="reason"
            label="产生原因"
            placeholder="请选择产生原因"
            @click="chooseCause('cause')"
          />
          <Field
            v-if="
              formData.reflecttypeval === '漏水' ||
              formData.reflecttypeval === '水淹'
            "
            v-model="formData.reason"
            is-link
            readonly
            name="reason"
            label="漏水位置"
            placeholder="请选择漏水位置"
            @click="chooseCause('waterLeakage')"
          />
          <Field
            v-show="
              formData.reason != '其它原因' &&
              formData.reason != '其它' &&
              formData.reason
            "
            v-model="formData.detailreason"
            is-link
            readonly
            name="detailreason"
            :label="formData.reason"
            placeholder="请选择具体原因"
            @click="chooseCause(formData.reason)"
          />
          <Field
            v-show="
              formData.reason === '其它原因' || formData.reason === '其它'
            "
            v-model="formData.detailreason"
            name="detailreason"
            :label="formData.reason"
            placeholder="请输入其它原因"
          />
          <Field
            v-if="formData.reflecttypeval === '测温'"
            v-model="ischecktemperature"
            is-link
            readonly
            name="ischecktemperature"
            label="是否测温"
            placeholder="请选择是否测温"
            @click="chooseCause('ischecktemperature')"
          />
          <Field
            v-show="formData.ischecktemperature === 0"
            v-model="formData.isnotcheckreason"
            is-link
            readonly
            name="isnotcheckreason"
            label="未测温原因"
            placeholder="请选择未测温原因"
            @click="chooseCause('isnotcheckreason')"
          />
          <Field
            v-show="
              formData.isnotcheckreason || ischecktemperature === '已测温'
            "
            v-model="formData.usersituation"
            autosize
            name="usersituation"
            label="用户状况"
            type="textarea"
            placeholder="请输入用户状况"
            show-word-limit
          />
          <Field
            v-model="formData.finishsign"
            is-link
            readonly
            name="finishsign"
            label="完成情况"
            placeholder="请选择完成情况"
            @click="chooseCause('finishsign')"
          />
          <Field
            v-model="finishtime"
            is-link
            readonly
            name="finishtime"
            label="完成时间"
            placeholder="请选择完成时间"
            @click="chooseTime('finishtime')"
          />
          <Field
            v-model="userduty"
            is-link
            readonly
            name="userduty"
            label="责任范围"
            placeholder="请选择责任范围"
            @click="choosePicker('userduty')"
          />

          <Field
            v-model="formData.remark"
            name="remark"
            required
            autosize
            label="处理结果"
            type="textarea"
            maxlength="50"
            placeholder="请选择处理结果"
            show-word-limit
            :rules="[{ required: true, message: '请选择处理结果' }]"
          />
        </div>
        <!-- 附件信息 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">附件信息</span>
          </div>
          <div class="uploadTitle">上传工单图片</div>
          <Uploader
            v-model="fileList"
            class="uploadLayout"
            preview-size="85px"
            :after-read="afterRead"
          >
            <div class="uploadBox">
              <img :src="phone" alt="" class="phone" />
            </div>
          </Uploader>
        </div>
      </div>
      <Popup v-model:show="showPicker" position="bottom">
        <Picker
          :columns="columns"
          @confirm="onConfirmsPicker"
          value-key="info"
          @cancel="showPicker = false"
        />
      </Popup>
      <Popup v-model:show="showCalendar" position="bottom">
        <DatetimePicker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          @confirm="onConfirmTime"
        />
      </Popup>

      <div class="bottomBox">
        <div class="userbox" @click="toSelectUser">
          <img :src="user" alt="" class="user" />
          <span class="userText"> 选择用户 </span>
        </div>
        <Button
          type="primary"
          size="large"
          round
          native-type="submit"
          class="btn"
          >提 交</Button
        >
      </div>
    </Form>
  </div>
</template>

<script setup>
import user from "@/assets/user.png";
import phone from "@/assets/phone.png";
import moment from "moment";
import axios from "axios";
import {
  RadioGroup,
  Radio,
  Field,
  Form,
  Uploader,
  Button,
  Dialog,
  Popup,
  Calendar,
  Picker,
  Toast,
  DatetimePicker,
} from "vant";
import { reactive, ref, toRefs, watch, onMounted } from "vue";
import { service } from "@/utils/request";
import { BASEURL, UPLOADIMG, GET_PICKER_DATA, ADD_BILL } from "@/utils/api";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const VanDialog = Dialog.Component;
const state = reactive({
  formData: {},
});

let { formData } = toRefs(state);
const result = ref("");
const showCalendar = ref(false);
const cardno = ref("");
const showPicker = ref(false);
const currentDate = ref(new Date());
const columns = ref([]); // 下拉数据
const fileList = ref([]); // 上传图片数据
const imgList = ref([]);
const currentPickerName = ref("");
const serviceUnit = ref(""); // 服务单位
const repairPerson = ref(""); // 维修人员
const userduty = ref(""); // 责任范围
const fileno = ref(""); // 文件上传字符串拼接
const finishtime = ref(""); //完成时间
const causeList = ref([
  { code: 0, info: "室外原因" },
  { code: 1, info: "室内原因" },
  { code: 2, info: "故障类原因" },
  { code: 3, info: "其它原因" },
]); // 原因列表
const outDoorReasonList = ref([
  // 室外原因
  { code: 0, info: "室外设施堵塞" },
  { code: 1, info: "室外气阻" },
  { code: 2, info: "分户阀门未开启或损坏" },
  { code: 3, info: "楼上楼下未供热/靠山" },
  { code: 4, info: "非节能建筑" },
  { code: 5, info: "放水" },
  { code: 6, info: "循环泵" },
]);
const inDoorReasonList = ref([
  // 室内原因
  { code: 0, info: "室内设施堵塞" },
  { code: 1, info: "室内阀门未开启或损坏" },
  { code: 2, info: "室内散热器少或布局不合理" },
  { code: 3, info: "室内气阻" },
  { code: 4, info: "遮挡散热器" },
  { code: 5, info: "私改供热设施" },
  { code: 6, info: "供热设施有缺陷" },
]);
const isnotcheckreasonList = ref([
  // 未测温原因
  // 室内原因
  { code: 0, info: "室内设施安装放水阀" },
  { code: 1, info: "私自改动供热设施" },
  { code: 2, info: "擅自扩大供热面积" },
  { code: 3, info: "改变用热性质安装换热器" },
  { code: 4, info: "用户室内遮挡散热器" },
]);
const isnotcheckreasonCode = ref("");
const faultCauses = ref([
  // 故障类原因
  { code: 0, info: "停电" },
  { code: 1, info: "一级网故障" },
  { code: 2, info: "二级网故障" },
  { code: 3, info: "运行站设备故障" },
]);
const ischecktemperatureList = ref([
  { code: 0, info: "未测温" },
  { code: 1, info: "已测温" },
]);
const ischecktemperature = ref(""); // 是否测温
const waterLeakageList = ref([
  // 漏水位置
  { code: 0, info: "室外设施漏水" },
  { code: 1, info: "室内设施漏水" },
  { code: 2, info: "其它" },
]);
const outDoorLeakageList = ref([
  // 室外设施漏水
  { code: 0, info: "小区管道老化漏水" },
  { code: 1, info: "楼座管道锈蚀漏水" },
  { code: 2, info: "单元管道锈蚀漏水" },
  { code: 3, info: "单元管道排污阀漏水" },
  { code: 4, info: "单元管道分户丝头锈蚀漏水" },
  { code: 5, info: "单元排气阀漏水" },
  { code: 6, info: "单元阀门填料及垫片漏水" },
  { code: 7, info: "分户阀门破损漏水" },
  { code: 8, info: "分户阀门后活接松动漏水" },
  { code: 9, info: "分户阀门后排气阀漏水" },
  { code: 10, info: "分户阀门后管道漏水" },
]);
const inDoorLeakageList = ref([
  // 室内设施漏水
  { code: 0, info: "室内暖气片老化漏水" },
  { code: 1, info: "室内暖气片连接管道老化漏水" },
  { code: 2, info: "室内供热设施连接部件老化漏水" },
  { code: 3, info: "室内供热设施连接松动漏水" },
  { code: 4, info: "室内排气阀及跑风老化损坏漏水" },
]);
const finishsignList1 = ref([
  { code: 0, info: "已明显改善" },
  { code: 1, info: "有改善" },
  { code: 2, info: "无改善" },
  { code: 3, info: "延后处理" },
]);
const finishsignList2 = ref([
  { code: 0, info: "完成" },
  { code: 1, info: "延后处理" },
  { code: 2, info: "无法完成" },
]);
watch(isnotcheckreasonCode, (newValue, oldValue) => {
  if (newValue === 0) {
    formData.value.usersituation =
      "未测温;用户违反《青岛市供热条例》第三十九条禁止行为，室内设施安装放水阀，不具备测温条件，不予测温。";
  } else if (newValue === 1) {
    formData.value.usersituation =
      "未测温;用户违反《青岛市供热条例》第三十九条禁止行为，私自改动供热设施，不具备测温条件，不予测温。";
  } else if (newValue === 2) {
    formData.value.usersituation =
      "未测温;用户违反《青岛市供热条例》第三十九条禁止行为，擅自扩大供热面积，不具备测温条件，不予测温。";
  } else if (newValue === 3) {
    formData.value.usersituation =
      "未测温;用户违反《青岛市供热条例》第三十九条禁止行为，改变用热性质安装换热器，不具备测温条件，不予测温。";
  } else if (newValue === 4) {
    formData.value.usersituation =
      "未测温;用户违反《青岛市供热条例》第五十一条规定，因用户遮蔽散热器等原因，致使供热质量不达标和造成相关损失的，责任由用户承担。用户室内遮挡散热器，不具备测温条件，不予测温。";
  }
});

onMounted(() => {
if(useRoute().query.info) {
let data = JSON.parse((useRoute().query.info));
 formData.value.clientname = data.username;
  formData.value.incomingtel = data.phone;
  formData.value.address = data.address;
  formData.value.userno = data.userid;
}
  
});
// 图片上传 
const afterRead = (file) => {
  console.log(file, '文件');
  let formData = new FormData();
  formData.append("file", file.file);
  service({
    url: UPLOADIMG,
    method: "post",
    data: formData,
  }).then((res) => {
    console.log(res, "成功");
    if (res.data.code == 200) {
      imgList.value.push(res.data.data);
      fileno.value = imgList.value.toString();
      console.log(str);
    }
  });
};
// 下拉框显示（需要请求接口的)
const choosePicker = (val) => {
  let info = JSON.parse(localStorage.getItem("usreInfo"));
  currentPickerName.value = val;
  let param1 = "";
  if (val === "childuserlist") {
    console.log(formData.value.repairdept);
    if (!formData.value.repairdept) {
      Toast("请先选择服务单位");
      return false;
    }
    param1 = formData.value.repairdept;
  } else {
    param1 = info.area;
  }
  if (val === "apptype") {
    formData.value.temperature = "";
    formData.value.reason = "";
    formData.value.detailreason = "";
    formData.value.ischecktemperature = "";
    formData.value.isnotcheckreason = "";
    formData.value.finishsign = "";
  }
  service({
    url: GET_PICKER_DATA,
    method: "get",
    params: {
      userno: info.userno,
      name: val,
      param1: param1,
    },
  }).then((res) => {
    console.log(res, "下拉列表");
    columns.value = JSON.parse(res.data.data);
    showPicker.value = true;
  });
};
// 下拉选择（不需要请求接口）
const chooseCause = (val) => {
  currentPickerName.value = val;
  if (val === "cause") {
    columns.value = causeList.value;
    formData.value.detailreason = "";
  } else if (val === "室外原因") {
    columns.value = outDoorReasonList.value;
  } else if (val === "室内原因") {
    columns.value = inDoorReasonList.value;
  } else if (val === "故障类原因") {
    columns.value = faultCauses.value;
  } else if (val === "ischecktemperature") {
    columns.value = ischecktemperatureList.value;
  } else if (val === "isnotcheckreason") {
    columns.value = isnotcheckreasonList.value;
  } else if (val === "waterLeakage") {
    columns.value = waterLeakageList.value;
  } else if (val === "室外设施漏水") {
    columns.value = outDoorLeakageList.value;
  } else if (val === "室内设施漏水") {
    columns.value = inDoorLeakageList.value;
  } else if (val === "finishsign") {
    if (
      formData.value.reflecttypeval === "不热" ||
      formData.value.reflecttypeval === "测温"
    ) {
      columns.value = finishsignList1.value;
    } else {
      columns.value = finishsignList2.value;
    }
  }
  showPicker.value = true;
};
/**
 * 下拉选择确认
 */
const onConfirmsPicker = (value) => {
  console.log(value);
  if (currentPickerName.value === "unitnoselect") {
    formData.value.repairdept = value.code;
    serviceUnit.value = value.info;
  } else if (currentPickerName.value === "childuserlist") {
    formData.value.repair = value.code;
    repairPerson.value = value.info;
  } else if (currentPickerName.value === "apptype") {
    formData.value.reflecttype = value.code;
    formData.value.reflecttypeval = value.info;
  } else if (
    currentPickerName.value === "cause" ||
    currentPickerName.value === "waterLeakage"
  ) {
    formData.value.reason = value.info;
  } else if (
    currentPickerName.value === "室外原因" ||
    currentPickerName.value === "室内原因" ||
    currentPickerName.value === "故障类原因" ||
    currentPickerName.value === "室外设施漏水" ||
    currentPickerName.value === "室内设施漏水"
  ) {
    formData.value.detailreason = value.info;
  } else if (currentPickerName.value === "ischecktemperature") {
    formData.value.ischecktemperature = value.code;
    ischecktemperature.value = value.info;
    if (value.info === "已测温") {
      formData.value.usersituation = value.info;
    }
  } else if (currentPickerName.value === "isnotcheckreason") {
    formData.value.isnotcheckreason = value.info;
    isnotcheckreasonCode.value = value.code;
  } else if (currentPickerName.value === "userduty") {
    formData.value.userduty = value.code;
    userduty.value = value.info;
  } else if (currentPickerName.value === "finishsign") {
    formData.value.finishsign = value.info;
  }
  showPicker.value = false;
};

// 选择时间
const chooseTime = (val) => {
  console.log(val);
  showCalendar.value = true;
};
// 确认时间
const onConfirmTime = (time) => {
  console.log(time);
  // formData.value.finishtime = time
  finishtime.value = moment(time).format("YYYY-MM-DD hh:mm");
  showCalendar.value = false;
};
/**
 * 日期选择确认
 */
const onConfirm = (date) => {
  result.value = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  showCalendar.value = false;
  console.log(result.value);
};

/**
 * 表单提交
 */
const onSubmit = (values) => {
  formData.value.fileno = fileno.value;
  if (formData.value.finishtime && formData.value.finishtime != "") {
    formData.value.finishtime = finishtime.value + ":00";
  }
  axios({
    url: BASEURL + ADD_BILL,
    method: "post",
    data: JSON.stringify(formData.value),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.data.code === 200) {
      Toast.success("提交成功");
      router.go(-1)
    }
  });
};
 const toSelectUser = () => {
    router.push({
    path:"/selectUser"
  });
 }
</script>

<style lang="scss" scoped>
.form {
  padding: 20px 0 0;
  box-sizing: border-box;
  background: #f5f5f5;
  :deep(.van-field) {
    padding-left: 10px;
  }
  .formBox {
    padding: 0 20px 158px;
  }
  .uploadTitle {
    font-size: 26px;
    color: #646566;
    padding-left: 20px;
  }
  .uploadLayout {
    padding: 20px 40px;
    box-sizing: border-box;
  }
  .uploadBox {
    width: 170px;
    height: 170px;
    background: #ffffff;
    border: 1px dotted #73b4ff;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    .phone {
      width: 50px;
      height: 38px;
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
}
</style>
