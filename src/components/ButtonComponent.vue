<template>
    <button @click="handleClick">
      {{ text }}
    </button>
  </template>
  
  <script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue'
  
  const props = defineProps({
    text: String,
    route: String,
    wordCount: Number
  });
  
  const router = useRouter();
  
const handleClick = () => {
  router.push({ path: props.route, query: { count: props.wordCount } });
  }
  </script>
  
  <style scoped>
 
  </style>