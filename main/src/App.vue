<template>
  <div>
    <Overlay z-index="999999999999999" :show="$store.state.show">
      <div class="wrapper">
        <Loading size="24px" vertical>加载中...</Loading>
      </div>
    </Overlay>
    <router-view />
  </div>
</template>

<script setup>
import { Overlay, Loading } from "vant";
</script>

<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
body {
  max-width: 750px;
}
</style>
