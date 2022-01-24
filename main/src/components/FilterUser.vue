<script setup>
import { Popup, Cascader } from "vant";
import { reactive, ref, toRefs, onMounted, defineProps } from "vue";
import { FINDUSER } from "@/utils/api";
import { service } from "@/utils/request";
import { createLetter } from "@/utils";

const props = defineProps({
  getSelectFromSon: {
    type: Function,
  },
});

const state = reactive({
  showColume: false,
  firstletter: "",
  areaname: "",
  floornumber: "",
  unitnumber: "",
  akali: "",
});

let options = ref(createLetter());
let cascaderValue = ref("");

const fieldNames = {
  text: "name",
  value: "names",
};
let { showColume } = toRefs(state);

/**
 * 地址选择一次并赋值
 */
const onFinish = ({ selectedOptions }) => {
  state.akali = selectedOptions.map((option) => option.name).join("/");
};

/**
 * 关闭picker 并把值给父页面
 */
const closeAndSendVal = () => {
  showColume.value = false;
  props.getSelectFromSon(state.akali);
};

/**
 * 过滤用户
 */
const findSon = ({ tabIndex, value, selectedOptions }) => {
  if (tabIndex > 3) return;
  if (tabIndex == 0) {
    state.firstletter = value;
    state.areaname = "";
    state.floornumber = "";
    state.unitnumber = "";
  }

  if (tabIndex == 1) {
    state.areaname = value;
    state.floornumber = "";
    state.unitnumber = "";
  }

  if (tabIndex == 2) {
    state.floornumber = value;
    state.unitnumber = "";
  }

  if (tabIndex == 3) {
    state.unitnumber = value.replace("@@@", "");
  }
  service({
    url: FINDUSER,
    method: "get",
    params: {
      firstletter: state.firstletter,
      areaname: state.areaname,
      floornumber: state.floornumber,
      unitnumber: state.unitnumber,
    },
  }).then((res) => {
    let { data } = res.data;
    selectedOptions[tabIndex].children = handleArray(data, tabIndex);
  });
};

/**
 * 处理数组
 */
const handleArray = (array, tabIndex) => {
  array.map((v) => {
    if ([0, 1, 3].includes(tabIndex)) {
      v.names = v.name;
    } else if (tabIndex == 2) {
      v.names = `${v.name}@@@`;
    }
  });
  return array;
};
</script>

<template>
  <!-- 筛选按钮 -->
  <div class="circle-btn" @click="showColume = true">筛选</div>

  <!-- 级联选择picker start -->
  <Popup v-model:show="showColume" position="bottom">
    <Cascader
      v-model="cascaderValue"
      title="选择用户"
      :options="options"
      @close="closeAndSendVal"
      @finish="onFinish"
      @change="findSon"
      :field-names="fieldNames"
      active-color="#1989fa"
    />
  </Popup>
  <!-- 级联选择picker end -->
</template>

<style scoped>
.circle-btn {
  position: fixed;
  font-size: 28px;
  bottom: 150px;
  right: 20px;
  border-radius: 50%;
  width: 120px;
  line-height: 120px;
  height: 120px;
  background: linear-gradient(0deg, #428ee5, #71b3ff);
  color: #fff;
  text-align: center;
  vertical-align: middle;
  box-shadow: 1px 2px 5px #888888;
  box-sizing: border-box;
}
</style>
