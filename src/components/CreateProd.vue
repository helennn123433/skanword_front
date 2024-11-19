<template>
    <div class="modal__overlay">
        <div class="modal__content">
            <button class="close__modal" @click="closeModal">&#10006;</button>
            <h4>Создание нового продукта</h4>  
            <div class="main__inputs">
                <input v-model="question" type="text" placeholder="Вопрос">
                <input v-model="answer" type="text" placeholder="Ответ на вопрос">
                <button @click="createWord" class="create__word">Создать</button>
            </div>
        </div>
    </div>    
</template>

<script setup>
import { defineEmits, ref } from 'vue';
const question = ref('');
const answer = ref('');
const emit = defineEmits(['closeModal']);

const closeModal = () => {
    emit('closeModal');
}
const createWord = async () => {
    try {
        await fetch(`http://5.35.124.40:8000/admin/add-solution/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question.value,
                answer: answer.value
            }),
        })
    window.location.reload();
    } catch (err) {
        console.error(err);
    }
}
</script>

<style scoped>
.modal__overlay {
    background-color: rgba(0, 0, 0, 0.5); 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.modal__content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
}
.close__modal{
    position: absolute;
    left: 58%;
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    font-size: 15px;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 10px;
}
.main__inputs{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 10px;
}
.create__word{
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    font-size: 18px;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 10px;
}
input{
    height: 30px;
    border: 2px solid #4a90e2;
    outline: #4a90e2;
    border-radius: 15px;
}
</style>