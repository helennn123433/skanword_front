<template>
    <h3>Выберете сложность сканворда</h3>

    <div class="diff_butns">
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
  </div>

  </template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'

</script>


<style scoped>

.diff_butns{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
h3{
  font-size: 30px;
  text-align: center;
}

</style>