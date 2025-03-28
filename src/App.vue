<script setup>
import { ref } from 'vue'
import Tiptap from './components/Tiptap.vue'
const content = ref("<p>I'm running Tiptap with Vue.js. 🎉</p>")

const setContent = () => {
  content.value = "<p>Hello World</p>"
}
</script>

<template>
  <div>
    <button @click="setContent">设置内容</button>
  </div>
  <Tiptap v-model="content"></Tiptap>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
