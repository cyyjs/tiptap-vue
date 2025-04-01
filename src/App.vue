<script setup>
import { ref } from 'vue'
import Tiptap from './components/Tiptap.vue'
const content = ref(`<p>I'm running Tiptap with Vue.js. 🎉</p><h1 id="62070a5f-1f81-494e-a666-b386fdc7f04f" data-toc-id="62070a5f-1f81-494e-a666-b386fdc7f04f">标题一</h1><h2 id="62c0ce31-b028-4764-bf52-3d3dce6c70ac" data-toc-id="62c0ce31-b028-4764-bf52-3d3dce6c70ac">标题1.1</h2><pre><code class="language-js">console.log("xxx"); </code></pre><pre><code class="language-css">font-size: 12px;</code></pre><h1 id="263ed3e4-9f34-46cd-b9a0-a09440d7c2b7" data-toc-id="263ed3e4-9f34-46cd-b9a0-a09440d7c2b7">数学公式</h1><p>$sin(x)$</p>`)

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
