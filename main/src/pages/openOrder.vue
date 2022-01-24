<template>
  <div class="form">
    <Form @submit="onSubmit">
      <div class="formBox">
        <!-- 工单类型 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">基础信息</span>
          </div>

          <div class="base-info" v-for="(i, index) in infoList" :key="index">
            <div class="base-left">
              <img :src="i.icon" alt="icon" />
              <span>{{ i.name }}</span>
            </div>

            <div class="base-right">黄先生</div>
          </div>
        </div>
        <!-- 完成结果 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">反馈填写</span>
          </div>
          <Field
            v-model="formData.finishTime"
            is-link
            readonly
            required
            name="finishTime"
            label="完成情况"
            placeholder="请选择完成情况"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择完成情况' }]"
          />
          <Field
            v-model="formData.workContent"
            is-link
            required
            readonly
            name="workContent"
            label="关闭结果"
            placeholder="请选择关闭结果"
            @click="showPicker = true"
            :rules="[{ required: true, message: '请选择关闭结果' }]"
          />
        </div>
        <!-- 备注 -->
        <div class="card">
          <div class="title">
            <span>|</span>
            <span class="titleText">备注</span>
          </div>
          <Field
            v-model="formData.message"
            rows="2"
            autosize
            label=""
            type="textarea"
            placeholder="请输入工单备注"
            show-word-limit
          />
        </div>
      </div>
      <Popup v-model:show="showPicker" position="bottom">
        <Picker :columns="columns" @confirm="onConfirms" @cancel="showPicker = false" />
      </Popup>
      <Calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" />

      <div class="bottomBox">
        <Button type="primary" round native-type="submit" class="btn">提 交</Button>
      </div>
    </Form>
  </div>
</template>

<script setup>
import icon1 from "@/assets/openOrder/icon1.png";
import icon2 from "@/assets/openOrder/icon2.png";
import icon3 from "@/assets/openOrder/icon3.png";
import icon4 from "@/assets/openOrder/icon4.png";
import icon5 from "@/assets/openOrder/icon5.png";
import icon6 from "@/assets/openOrder/icon6.png";

import { Field, Form, Button, Popup, Calendar, Picker, Toast, Dialog } from "vant";
import { reactive, ref, toRefs } from "vue";

const VanDialog = Dialog.Component;
const state = reactive({
  formData: {
    username: "",
    value: "",
    showCalendar: false,
  },
  infoList: [
    {
      icon: icon1,
      name: "开通用户：",
      value: "",
    },
    {
      icon: icon2,
      name: "联系方式：",
      value: "",
    },
    {
      icon: icon3,
      name: "开通地址：",
      value: "",
    },
    {
      icon: icon4,
      name: "工单编号：",
      value: "",
    },
    {
      icon: icon5,
      name: "派单时间：",
      value: "",
    },
    {
      icon: icon6,
      name: "工单状态：",
      value: "",
    },
  ],
});

let { formData, infoList } = toRefs(state);
const result = ref("");
const showCalendar = ref(false);
const cardno = ref("");
const showPicker = ref(false);
const columns = [10000, 10002, 10003];
const fileList = ref([]);
/**
 * 日期选择确认
 */
const onConfirm = (date) => {
  result.value = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  showCalendar.value = false;
  console.log(result.value);
};

/**
 * 户号选择确认
 */
const onConfirms = (value) => {
  cardno.value = value;
  showPicker.value = false;
};

/**
 * 表单提交
 */
const onSubmit = (values) => {
  console.log("submit", values);
};
</script>

<style lang="scss" scoped>
.form {
  padding: 20px 0 0;
  box-sizing: border-box;
  background: #f5f5f5;
  height: 100vh;
  :deep(.van-field) {
    padding-left: 10px;
  }
  .formBox {
    padding: 0 20px 158px;
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

    .btn {
      width: 94%;
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
    .base-left {
      min-width: 240px;
      @include flex;
      color: #666666;
      img {
        width: 26px;
        margin-left: 20px;
        margin-right: 10px;
      }
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
