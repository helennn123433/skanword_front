<template>
    <h3>Выберете сложность сканворда</h3>
    <ButtonComponent 
      text="5 слов"
      route="/crossword"
      :wordCount="5" />
    <ButtonComponent 
      text="7 слов"
      route="/crossword"
      :wordCount="7" />
    <ButtonComponent 
      text="10 слов"
      route="/crossword"
      :wordCount="10" />
  </template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'

</script>


<style scoped>


</style>