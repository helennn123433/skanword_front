<template>
    <div class="container">
    <ButtonComponent 
    text="Войти как игрок"
    route="/selectdifficulty"
    color="green" />

    <ButtonComponent
    text="Войти как администратор"
    route="/authadmin" />
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
    flex-direction: column;
    gap: 10px;
}

</style>