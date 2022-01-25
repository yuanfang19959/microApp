<template>
  <div>当前是微应用-1(vue3)</div>
  <p>接收到的消息： {{ msg }}</p>
  <button @click="sendMsg">点击向主框架发送消息</button>
</template>

<script setup>
import actions from "../send/index";
import { ref, onMounted } from "vue";

const msg = ref('')

onMounted(() => {
  actions.onGlobalStateChange((state) => {
    msg.value = state;
  }, true);
});

/**
 * 向父级发送消息
 */
const sendMsg = () => {
  actions.setGlobalState({ msg: "这是来自微应用2的数据" });
};
</script>