<template>
    <div class="data__container">
        <div v-if="password !== null" class="data__title">
            <h4>Все данные кроссворда</h4>
            <button class="create__word" @click="openCreateModel">Создать</button>
        </div>
        <div v-for="item in items" :key="item.id_solution" class="data__item">
            <template v-if="!item.isEditing">
                <span>{{ item.id_question__question }}</span>
                <span><b>{{ item.id_answer__answer }}</b></span>
                <div class="save__changes">
                    <button class="delete__word" @click="deleteWord(item.id_solution)">&#128465;</button>
                    <button class="edit__word" @click="enableEditMode(item)">&#9998;</button>
                </div>
            </template>
            <template v-else>
                <div class="edit-group">
                    <input
                        v-model="item.editQuestion"
                        placeholder="Редактировать вопрос"
                        class="edit-input"
                    />
                </div>
                <div class="edit-group">
                    <input
                        v-model="item.editAnswer"
                        placeholder="Редактировать ответ"
                        class="edit-input"
                    />
                </div>
                <div class="save__changes">
                    <button class="save__word" @click="saveEdit(item)">✔</button>
                    <button class="cancel__word" @click="cancelEdit(item)">✖</button>
                </div>
            </template>

        </div>
    </div>
    <CreateProd @closeModal="closeModal" v-if="createModal" />
</template>

<script setup>
import { onMounted, ref } from 'vue';
import CreateProd from '@/components/CreateProd.vue';

const password = sessionStorage.getItem('adminPassword');
const items = ref([]);
const createModal = ref(false);

const openCreateModel = () => {
    createModal.value = true;
};
const closeModal = () => {
    createModal.value = false;
};

const enableEditMode = (item) => {
    item.isEditing = true;
    item.editQuestion = item.id_question__question;
    item.editAnswer = item.id_answer__answer;
};

const saveEdit = async (item) => {
    try {
        await fetch(`http://5.35.124.40:8000/admin/update-solution/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id_solution: item.id_solution,
                question: item.editQuestion,
                answer: item.editAnswer,
            }),
        });
        item.id_question__question = item.editQuestion;
        item.id_answer__answer = item.editAnswer;
        item.isEditing = false;
    } catch (err) {
        console.error(err);
    }
};

const cancelEdit = (item) => {
    item.isEditing = false;
};

const deleteWord = async (id_solution) => {
    
    try {
        await fetch(`http://5.35.124.40:8000/admin/delete-solution/?id_solution=${id_solution}`, {
            method: 'DELETE',
        });
        items.value = items.value.filter(word => word.id_solution !== id_solution);
    } catch (err) {
        console.error(err);
    }
};

const getAllData = async () => {
    const password = sessionStorage.getItem('adminPassword');
    try {
        const response = await fetch(`http://5.35.124.40:8000/admin/get-data/?password=${password}`)
            items.value = await response.json();
    } catch (err) {
        console.error(err);
    }
};

onMounted(() => {
    getAllData();
});
</script>

<style scoped>
.data__container {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.data__title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.data__item {
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    margin: 15px;
    gap: 10px;
    border: 3px solid #4a90e2;
    width: 90%;
    padding: 10px;
    align-items: center;
}
.create__word {
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
}
.button__delete span{
    max-width: 800px; 
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: normal;
}
.delete__word,
.edit__word,
.save__word,
.cancel__word {
    background-color: #4a90e2;
    color: #ffffff;
    border: none;
    font-size: 25px;
    font-weight: 500;
    cursor: pointer;
    padding: 10px 15px;
    border-radius: 10px;
    margin-left: 10px;
}
.save__word {
    background-color: #4CAF50;
}
.cancel__word {
    background-color: #f44336;
}
.edit-input {
    padding: 5px;
    font-size: 16px;
    width: 500px;
    border: 2px solid #4a90e2;
    border-radius: 5px;
}
.edit-group {
    display: flex;
    align-items: center;
    gap: 10px;
}
.save__changes{
    display: flex;
}
</style>
