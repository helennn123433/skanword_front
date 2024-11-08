<template>
    <div class="container">
    <ButtonComponent 
    text="Начало"
    route="/selectdifficulty" />
    </div>
</template>

<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue'
</script>

<style scoped>
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

</style>