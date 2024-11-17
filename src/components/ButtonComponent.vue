<template>
    <button :style="{background : props.color}" @click="handleClick">
      {{ text }}
    </button>
  </template>
  
<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue'
  
const props = defineProps({
  text: String,
  route: String,
  wordCount: Number,
  color: String
});
  
const router = useRouter();
  
const handleClick = () => {
  router.push({ path: props.route, query: { count: props.wordCount } });
  }
</script>
  
<style scoped>
 button{
  padding: 20px 35px;
  font-size: 50px;
  font-weight: bold;
  color: #ffffff;
  background-color: #4a90e2; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
 }
 button:hover {
    background-color: #2c5f8a;
  }
</style>