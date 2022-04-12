<script lang="ts" setup>
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import {NButton} from 'naive-ui'
</script>

<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

    <HelloWorld :msg="'Welcome to Your Vue.js + TypeScript App'"/>
    <n-button>Hello</n-button>
  </div>
</template>
