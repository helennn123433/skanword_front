<template>
    <div class="auth_container">
        <h2>Введите пароль для администратора</h2>
        <input type="password" /> 
        <ButtonComponent
            text="Авторизоваться"
            route="/getalldata"/>  
    </div>
</template>


<script setup>
import ButtonComponent from '@/components/ButtonComponent.vue';
</script>

<style scoped>
.auth_container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
}

input{
    width: 400px;
    height: 30px;
    border: 2px solid #4a90e2;
    outline: #4a90e2;
    border-radius: 15px;
    margin-bottom: 50px;
}
</style>