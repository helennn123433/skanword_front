<template>
    <div class="auth_container">
        <h2>Введите пароль для администратора</h2>
        <input 
            :class="{ error: isError }"
            type="password" 
            v-model="password"/> 
        <ButtonComponent
            text="Авторизоваться"
            @click="authorize"/>  
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ButtonComponent from '@/components/ButtonComponent.vue';

const password = ref('');
const isError = ref(false); 

const authorize = async () => {
    isError.value = false;
    if (!password.value) {
       isError.value = true;
        return;
    }
    try {
        const response = await fetch(`http://5.35.124.40:8000/admin/login/?password=${encodeURIComponent(password.value)}`);
        const data = await response.json();
        if (data) {
            sessionStorage.setItem('adminPassword', password.value);
            window.location.href = '/#/getalldata/';
        } else {
           isError.value = true;
        }
    } catch (err) {
        console.error('Ошибка подключения', err);
        alert('Ошибка подключения');
    }
};
</script>

<style scoped>
.auth_container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    text-align: center;
}

input{
    width: 400px;
    height: 30px;
    border: 2px solid #4a90e2;
    outline: #4a90e2;
    border-radius: 15px;
    margin-bottom: 50px;
}

.error {
    border: 2px solid red;
}


@media (max-width: 768px) {
    input {
        width: 300px;
    }
}

@media (max-width: 485px) {
    h2 {
        font-size: 18px;
    }

    input {
        width: 250px;
        height: 28px;
    }
}
</style>
