<template>
  <div>
    <div v-if="isLoading" class="loading-overlay">
      <div class="spinner"></div>
    </div>
    
    <div v-else>
      <CrosswordContainer 
        :crosswordData="crosswordData" 
        @wordCorrect="handleWordCorrect" 
      />
      <QuestionsContainer 
        :questions="crosswordData.words" 
      />
    </div>
    <div v-if="isCompleted" class="completion-message">
        <p>Сканворд завершён. Можете пройти снова.</p>
        <button @click="restartCrossword">Пройти снова</button>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import CrosswordContainer from '@/components/CrosswordContainer.vue';
import QuestionsContainer from '@/components/QuestionsContainer.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const crosswordData = ref({ words: [] });
const isLoading = ref(true); 

onMounted(async () => {
  try {
    const count = route.query.count || 5;
    const response = await fetch(`http://127.0.0.1:8000/api/get-cross/?count=${count}`);
    // const response = await fetch(`http://5.35.124.40:8000/api/get-cross/?count=${count}`);
    const data = await response.json();
    if (Array.isArray(data) && data[0]?.words) {
      crosswordData.value = data[0];
    } else {
      console.error('Ошибка: неверный формат данных');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  } finally {
    isLoading.value = false; 
  }
});

const handleWordCorrect = (wordId) => {
  const question = crosswordData.value.words.find(q => q.id === wordId);
  if (question) {
    question.userWord = question.word; 
  }
};

const isCompleted = computed(() => {
  return crosswordData.value.words.every(q => q.correct);
});

const restartCrossword = () => {
  router.push('/selectdifficulty')
};
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(240, 240, 240, 1); 
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; 
}

.spinner {
  width: 50px;
  height: 50px;
  border: 6px solid rgba(74, 144, 226, 0.3); 
  border-top-color: #4a90e2; 
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.completion-message {
  margin: 20px 0px;
  font-size: 18px;
  text-align: center;
}

.completion-message button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
button{
  padding: 20px 35px;
  font-size: 20px;
  color: #ffffff;
  background-color: #4a90e2; 
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
 }
 button:hover {
    background-color: #2c5f8a;
  }
</style>
