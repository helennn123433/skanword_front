<template>
    <div class="auth_container">
        <h2>Введите пароль для администратора</h2>
        <input type="password" v-model="password"/> 
        <ButtonComponent
            text="Авторизоваться"
            @click="authorize"/>  
    </div>
</template>


<script setup>
import { ref, onBeforeMount } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const password = ref('');


const authorize = async () => {
    if (!password.value) {
        alert('Введите пароль!');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8000/admin/login/?password=${encodeURIComponent(password.value)}`);
        const data = await response.json();
        if (data) {
            window.location.href = '/#/getalldata/';
        } else {
            alert('Ошибка авторизации');
        }
    } catch (err) {
        console.error('Ошибка подключения', err);
        alert('Ошибка подключения');
    }
};

onBeforeMount(() =>{

})

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