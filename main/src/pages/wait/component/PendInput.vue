<!-- 待审批 待反馈输入popup -->
<template>
  <Popup v-model:show="pendingInput" position="bottom">
    <div class="wait-pending">
      <Form @submit="onSubmit">
        <div class="card bodernone">
          <div class="title">
            <span>|</span>
            <span class="titleText">审核信息</span>
          </div>
          <Field
            v-model="formData.approveremark"
            name="approveremark"
            label="审核意见"
            placeholder="请输入审核意见"
            type="textarea"
            rows="1"
            autosize
            maxlength="100"
          />
        </div>

        <div class="card bodernone">
          <div class="title">
            <span>|</span>
            <span class="titleText">申请信息</span>
          </div>
          <Field
            v-model="formData.billno"
            name="billno"
            label="工单编号"
            readonly
            :rules="[{ required: true, message: '请选择工单编号' }]"
          />
          <Field
            v-model="formData.dealuser_label"
            is-link
            readonly
            name="dealuser"
            label="维修人员"
            placeholder="请选择维修人员"
            @click="showFn('childuserlist')"
            :rules="[{ required: true, message: '请选择维修人员' }]"
          />
          <Field
            v-model="formData.finishsign_label"
            is-link
            readonly
            name="finishsign"
            label="完成情况"
            placeholder="请选择完成情况"
            @click="showFn('finishsign')"
            :rules="[{ required: true, message: '请选择完成情况' }]"
          />
          <Field
            v-model="formData.dealtime"
            is-link
            readonly
            name="dealtime"
            label="处理完毕时间"
            placeholder="请选择处理完毕时间"
            @click="showCalendarPopup('dealtime')"
            :rules="[{ required: true, message: '请选择处理完毕时间' }]"
          />
          <Field
            v-model="formData.arrivetime"
            is-link
            readonly
            name="arrivetime"
            label="到达现场时间"
            placeholder="请选择到达现场时间"
            @click="showCalendarPopup('arrivetime')"
            :rules="[{ required: true, message: '请选择到达现场时间' }]"
          />
          <Field
            v-model="formData.answerway_label"
            is-link
            readonly
            value-key="text"
            label="回复方式"
            placeholder="请选择回复方式"
            @click="showFn('answerway')"
            :rules="[{ required: true, message: '请选择回复方式' }]"
          />
          <Field
            v-model="formData.answertime"
            is-link
            readonly
            name="answertime"
            label="回复时间"
            placeholder="请选择回复时间"
            @click="showCalendarPopup('answertime')"
            :rules="[{ required: true, message: '请选择回复时间' }]"
          />
          <Field
            v-model="formData.satisfaction_label"
            is-link
            readonly
            name="satisfaction"
            label="满意度"
            placeholder="请选择满意度"
            @click="showFn('satisfaction')"
            :rules="[{ required: true, message: '请选择满意度' }]"
          />
          <Field
            v-model="formData.remark"
            name="remark"
            label="处理结果"
            placeholder="请选择处理结果"
          />
          <Field
            v-model="formData.userduty_label"
            is-link
            readonly
            name="userduty"
            label="责任范围"
            placeholder="请选择责任范围"
            @click="showFn('userduty')"
            :rules="[{ required: true, message: '请选择责任范围' }]"
          />
          <Field
            v-model="formData.problem"
            is-link
            readonly
            name="problem"
            label="预留功能"
            placeholder="请选择预留功能"
            @click="showFnCascader('fourlevelselect')"
            :rules="[{ required: true, message: '请选择预留功能' }]"
          />
          <Field
            v-model="formData.dealtype_label"
            is-link
            readonly
            name="dealtype"
            label="所属类别"
            placeholder="请选择所属类别"
            @click="showFn('dealtype')"
            :rules="[{ required: true, message: '请选择所属类别' }]"
          />

          <Field
            v-if="formShow"
            v-model="formData.dutysign_label"
            is-link
            readonly
            name="dutysign"
            label="认定责任单位"
            placeholder="请选择认定责任单位"
            @click="showFn('dutysign')"
            :rules="[{ required: true, message: '请选择认定责任单位' }]"
          />
          <Field
            v-if="formShow"
            v-model="formData.dutypercent"
            name="dutypercent"
            label="责任占比(%)"
            placeholder="请输入责任占比"
          />

          <Field
            v-if="formShow"
            v-model="formData.paymoney"
            name="paymoney"
            label="赔偿金额"
            placeholder="请输入赔偿金额"
          />

          <Field
            v-if="formShow"
            v-model="formData.paycompany_label"
            is-link
            readonly
            name="paycompany"
            label="赔付方"
            placeholder="请选择赔付方"
            @click="showFn('paycompany')"
            :rules="[{ required: true, message: '请选择赔付方' }]"
          />

          <Field
            v-if="formShow"
            v-model="formData.paycompany"
            name="paycompany"
            label="  "
            placeholder="请输入赔付方"
          />

          <Field
            v-if="formShow"
            v-model="formData.paytype_label"
            is-link
            readonly
            name="paytype"
            label="类别"
            placeholder="请选择类别"
            @click="showFn('paytype')"
            :rules="[{ required: true, message: '请选择类别' }]"
          />
        </div>

        <!-- 待审批显示start -->
        <div class="btn-grounp" v-if="p.isPend">
          <Row justify="center">
            <Col span="6">
              <Button color="#7232dd" plain size="normal" class="btns"
                >取消</Button
              >
            </Col>
            <Col span="6">
              <Button type="danger" @click="reject" size="normal" class="btns"
                >驳回</Button
              >
            </Col>
            <Col span="6">
              <Button
                type="primary"
                size="normal"
                native-type="submit"
                class="btns"
                >同意</Button
              >
            </Col>
          </Row>
        </div>
        <!-- 待审批显示end -->

        <!-- 待反馈显示start -->
        <div class="btn-grounp" v-else>
          <Row justify="center">
            <Col span="6">
              <Button
                @click="pendingInput = false"
                color="#7232dd"
                plain
                size="normal"
                class="btns"
                >取消</Button
              >
            </Col>
            <Col span="6">
              <Button type="danger" size="normal" @click="feedback" class="btns"
                >确认反馈</Button
              >
            </Col>
          </Row>
        </div>
        <!-- 待反馈显示end -->
      </Form>
    </div>
  </Popup>

  <!-- 选择picker -->
  <Popup :show="popupShow" position="bottom">
    <Picker
      :columns="columns"
      @confirm="onConfirms"
      @cancel="popupShow = false"
    />
  </Popup>

  <Popup v-model:show="CascaderShow" position="bottom">
    <Cascader
      v-model="cascaderValue"
      title="请选择所在地区"
      :options="options"
      @close="CascaderShow = false"
      @change="onChange"
      @finish="onFinish"
    />
  </Popup>

  <!-- 日历 -->
  <Calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" />
</template>

<script setup>
import { reactive, ref, toRefs, defineExpose, defineProps } from "vue";
import { GET_PICKER_DATA, REVIEW, FEEDBACK } from "@/utils/api";
import { service } from "@/utils/request";
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
  Step,
  Steps,
  Row,
  Col,
  Cascader,
} from "vant";

const p = defineProps({
  isPend: {
    type: Boolean,
    default: true,
  },
});
console.log(p.isPend.value);

const state = reactive({
  formData: {
    approveremark: "", //审核意见
    billno: "", //工单编号
    dealuser: "", //维修人员
    finishsign: "", //完成情况
    dealtime: "", //完成时间
    arrivetime: "", //到达时间
    answerway: "", //回复方式
    answertime: "", //回复时间
    satisfaction: "", //满意度
    remark: "", //处理结果
    userduty: "", //责任范围
    dealtype: "", //所属类比
    problem: "", //预留功能

    dutysign: "", //责任认定单位
    dutypercent: "", //责任占比
    paymoney: "", //赔偿金额
    paycompany: "", //赔付方
    paytype: "", //类别
  },
  columns: [],
  options: [],
  cascaderValue: "",
  answerway: [],
  popupShow: false,
  CascaderShow: false,
  showCalendar: false,

  formShow: false,
  param1: "",
  timeName: "",
});
const pendingInput = ref(false);
const showColume = ref(false);

let {
  formData,
  infoList,
  answerway,
  columns,
  options,
  popupShow,
  CascaderShow,
  cascaderValue,
  param1,
  formShow,
  showCalendar,
  timeName,
} = toRefs(state);
/**
 * 控制popup显示隐藏
 */
const toggle = (obj) => {
  console.log(obj);
  state.formData.billno = obj.billno;
  pendingInput.value = !pendingInput.value;
  getDictionary("answerway");
  getDictionary("finishsign");
  getDictionary("childuserlist");
  getDictionary("satisfaction");
  getDictionary("dutysign");
  getDictionary("dealtype");
  getDictionary("fourlevelselect");
  getDictionary("paycompany");
  getDictionary("paytype");
  getDictionary("userduty");
};

/**
 * 数据字典()
 */
const getDictionary = (name) => {
  service({
    url: GET_PICKER_DATA,
    method: "get",
    params: {
      userno: JSON.parse(localStorage.getItem("usreInfo")).userno,
      name,
      param1: state.param1 || JSON.parse(localStorage.getItem("usreInfo")).area,
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

const showFn = (name) => {
  state.popupShow = true;
  state.columns = state[name];
};
const showFnCascader = (name) => {
  state.CascaderShow = true;
  state.options = state[name];
};
/**
 * 及联选择
 */
const onChange = ({ value }) => {
  state.param1 = value;
  getDictionary("fivelevelselect");
  setTimeout(() => {
    let item = state.fourlevelselect.find((el) => {
      return el.code == value;
    });
    item.children = state.fivelevelselect;
  }, 1000);
};
/**
 * 及联选择确定
 */
const onFinish = ({ selectedOptions, tabIndex }) => {
  console.log(selectedOptions, "selectedOptions");
  if (tabIndex == 1) {
    state.CascaderShow = false;
    state.formData.problem = selectedOptions
      .map((option) => option.text)
      .join("/");
    state.formData.problemfour = selectedOptions[0].code;
    state.formData.problemfive = selectedOptions[1].code;
  }
};
/**
 * 单选确定
 */
const onConfirms = (value) => {
  if (value.formName == "childuserlist") {
    state.formData.dealuser_label = value.text;
    state.formData.dealuser = value.code;
  } else {
    state.formData[`${value.formName}_label`] = value.text;
    state.formData[`${value.formName}`] = value.code;
  }
  if (state.formData.dealtype == "3") {
    state.formShow = true;
  } else {
    state.formShow = false;
  }
  popupShow.value = false;
};
/**
 * 打开日期
 */
const showCalendarPopup = (value) => {
  console.log(value);
  state.timeName = value;
  state.showCalendar = true;
};
/**
 * 日期选择确认
 */
const onConfirm = (date) => {
  state.formData[state.timeName] = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  state.showCalendar = false;
};

/**
 * 待审批=>表单提交
 */
const onSubmit = (values) => {
  for (var item in state.formData) {
    if (item.includes("_label")) {
      delete state.formData[item];
    }
  }
  delete state.formData.problem;
  state.formData.approvestate = 1;
  service({
    url: REVIEW,
    method: "POST",
    data: JSON.stringify(state.formData),
  }).then((res) => {
    console.log(res, "res");
    if (res.data.code == "200") {
      Toast("操作成功");
      pendingInput.value = false;
    }
  });
};

/**
 * 待审批=>驳回
 */
const reject = () => {
  for (var item in state.formData) {
    if (item.includes("_label")) {
      delete state.formData[item];
    }
  }
  delete state.formData.problem;
  state.formData.approvestate = 0;
  service({
    url: REVIEW,
    method: "POST",
    data: JSON.stringify(state.formData),
  }).then((res) => {
    if (res.data.code == "200") {
      Toast("操作成功");
      pendingInput.value = false;
    }
  });
};

/**
 * 待反馈=>确认反馈
 */
const feedback = () => {
  console.log(123)
  for (var item in state.formData) {
    if (item.includes("_label")) {
      delete state.formData[item];
    }
  }
  delete state.formData.problem;
  service({
    url: FEEDBACK,
    method: "POST",
    data: JSON.stringify(state.formData),
  }).then((res) => {
    if (res.data.code == "200") {
      Toast("操作成功");
      pendingInput.value = false;
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
    padding: 0.2rem 0 0.5rem 0;
    width: 100%;
    border: 0;
    .btns {
      height: 1.6rem;
    }
  }
  .nbsp {
    height: 1.8rem;
  }
}
.card {
  margin-bottom: 0.2rem;
  width: 100%;
  background: #ffffff;
  border: 0.01rem solid #e5e5e5;
  border-radius: 0.12rem;
  padding: 0 0.2rem 0.2rem;
  box-sizing: border-box;
  .title {
    padding: 0.2rem;
    font-size: 0.32rem;
    font-family: PingFang SC;
    font-weight: bold;
    color: #6fb2ff;
    .titleText {
      margin-left: 0.2rem;
    }
  }

  @mixin flex {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .base-info {
    @include flex;
    margin-bottom: 0.25rem;
    margin-top: 0.05rem;
    padding-left: 0.3rem;
    .base-left {
      min-width: 2rem;
      @include flex;
      color: #666666;
      span {
        font-size: 0.28rem;
        padding-right: 0.35rem;
      }
    }
    .base-right {
      font-size: 0.28rem;
    }
  }
}
</style>
