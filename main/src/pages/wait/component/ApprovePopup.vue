<!-- 流程节点popup -->
<template>
  <Popup v-model:show="showPicker" position="bottom">
    <div class="pop-content">
      <Steps direction="vertical" :active="0">
        <Step v-for="(item, idx) of processList" :key="idx">
          <div class="step-top">
            <div>{{item.operatetype}}</div>
            <!-- <div>已同意</div> -->
          </div>
          <div class="step-item">
            <div>{{item.operateuser}}</div>
            <div>{{item.operatetime}}</div>
          </div>
          <div class="step-remark">{{item.operatedescripe}}</div>
        </Step>
      </Steps>
    </div>
  </Popup>
</template>

<script setup>
import { reactive, ref, toRefs, defineExpose } from "vue";
import { BILLLOGLIST } from "@/utils/api";
import { service } from "@/utils/request";
import { Popup, Toast, Step, Steps } from "vant";
const showPicker = ref(false);
const state = reactive({
  processList: [],
});
const { processList } = toRefs(state);

/**
 * 控制popup显示隐藏
 */
const toggle = (billno) => {
  getProcess(billno);
  showPicker.value = !showPicker.value;
};

const getProcess = (billno) => {
  service({
    url: BILLLOGLIST,
    method: "get",
    params: {
      billno: billno,
    },
  }).then((res) => {
    state.processList = res.data.data.reverse()
    console.log(state.processList)
  });
};

defineExpose({
  toggle,
});
</script>

<style lang="scss" scoped>

.pop-content {
  padding: 20px;
  .step-top {
    display: flex;
    justify-content: space-between;
  }

  .step-item {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
  }

  .step-remark {
  }
}
</style>
