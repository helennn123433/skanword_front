<template>
    <h3>Выберете сложность сканворда</h3>
    <div class="diff_butns">
      <ButtonComponent 
        text="5 слов"
        route="/crossword"
        :wordCount="5"
        color="green" />
      <ButtonComponent 
        text="7 слов"
        route="/crossword"
        :wordCount="7"
        color="#ffd800" />
      <ButtonComponent 
        text="10 слов"
        route="/crossword"
        :wordCount="10" 
        color="red"/>
        <ButtonComponent 
        text="Случайный"
        route="/crossword"
        :wordCount="0" 
        />
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