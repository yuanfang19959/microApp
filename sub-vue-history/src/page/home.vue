<template>
  <div @click="goPage">子应用</div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goPage = () => {
  router.push('/ass')
}
</script>