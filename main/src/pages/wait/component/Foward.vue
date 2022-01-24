<!-- 转发popup -->
<template>
  <Popup v-model:show="pendingInput" position="bottom">
    <div class="wait-pending">
      <Form @submit="onSubmit">
        <div class="card bodernone">
          <div class="title">
            <span>|</span>
            <span class="titleText">工单转发</span>
          </div>
          <Field
            v-model="formData.todeptno_label"
            is-link
            readonly
            name="todeptno_label"
            label="处理部门"
            placeholder="请选择处理部门"
            @click="showPopup('childdepartment')"
            :rules="[{ required: true, message: '请选择处理部门' }]"
          />
          <Field
            v-model="formData.touserno_label"
            name="phone"
            label="短信发送"
            readonly
            placeholder="请选择短信发送"
            :rules="[{ required: true, message: '请选择短信发送' }]"
          >
            <template #button>
              <Button
                size="small"
                @click="showPopup('childuserlist')"
                type="primary"
                >通讯录</Button
              >
            </template>
          </Field>
          <Field
            v-model="formData.message"
            label="短信内容"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入短信内容"
            show-word-limit
          />
        </div>

        <div class="btn-grounp">
          <Row justify="center">
            <Col span="6">
              <Button color="#7232dd" @click=" pendingInput = false" plain size="normal" class="btns"
                >取消</Button
              >
            </Col>
            <Col span="6">
              <Button type="danger" @click="forward" size="normal" class="btns"
                >确认转发</Button
              >
            </Col>
          </Row>
        </div>
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
</template>

<script setup>
import { reactive, ref, toRefs, defineExpose, onMounted } from "vue";
import { Field, Form, Button, Popup, Picker, Row, Col, Cascader, Toast } from "vant";
import { service } from "@/utils/request";
import { FORWARD, GET_PICKER_DATA } from "@/utils/api";

const state = reactive({
  formData: {
    todeptno: "",
    touserno: "",
    phone: "",
    message: "",
  },
  columns: [],
  childdepartment: [],
  childuserlist: [],
});
const cascaderValue = ref("");
const pendingInput = ref(false);
const showColume = ref(false);
const show = ref(true);
let { formData, infoList, columns, childdepartment, childuserlist } = toRefs(
  state
);
onMounted(() => {
  getDictionary("childdepartment");
  getDictionary("childuserlist");
});

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

const showPopup = (name) => {
  showColume.value = true;
  state.columns = state[name];
};

const onConfirms = (value) => {
  if (value.formName == "childdepartment") {
    state.formData.todeptno = value.code;
    state.formData.todeptno_label = value.text;
  } else {
    state.formData.touserno = value.code;
    state.formData.touserno_label = `${value.phone} - ${value.text}`;
    state.formData.phone = value.phone;
  }

  showColume.value = false;
  console.log(state.formData);
};

/**
 * 工单转发
 */
const forward = () => {
  // for (var item in state.formData) {
  //   if (item.includes("_label")) {
  //     delete state.formData[item];
  //   }
  // }
  service({
    url: FORWARD,
    method: "POST",
    data: JSON.stringify(state.formData),
  }).then((res) => {
    if (res.data.code == "200") {
      Toast("操作成功");
      pendingInput.value = false;
    }else{
       Toast(res.data.msg);
    }
  });
};

/**
 * 控制popup显示隐藏
 */
const toggle = (obj) => {
  state.formData = {}
  console.log(obj.value);
  state.formData.billno = obj.value.billno;
  state.formData.userno = obj.value.clientid;
  pendingInput.value = !pendingInput.value;
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
</style>
