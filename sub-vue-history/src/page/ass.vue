<template>
  <button @click="openMicro">打开微应用2的窗口</button>
</template>

<script setup>
import actions from "../send/index";

/**
 * 向父级发送消息
 */
const openMicro = () => {
  actions.setGlobalState({ type: 'open@@@' });
};
</script>