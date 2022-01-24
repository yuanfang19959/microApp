<template>
  <div @click="goApp(0)">microApp</div>
  <div @click="goApp(1)">子应用React</div>
  <div @click="goApp(2)">子应用Vue</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const goApp = (type) => {
  if(!type) {
    router.push('/home')
  } else if(type === 1) {
    router.push('/app-react')
  } else {
    router.push('/app-vue')
  }
}
</script>