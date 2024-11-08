<template>
  <div>
    <CrosswordContainer 
      :crosswordData="crosswordData" 
      @wordCorrect="handleWordCorrect" 
    />
    <QuestionsContainer 
      :questions="crosswordData.words" 
    />
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

onMounted(async () => {
  try {
    const count = route.query.count || 5;
    const response = await fetch(`http://127.0.0.1:8000/api/get-data/?count=${count}`);
    const data = await response.json();
    if (Array.isArray(data) && data[0]?.words) {
      crosswordData.value = data[0];
    } else {
      console.error('Ошибка: неверный формат данных');
    }
  } catch (error) {
    console.error('Ошибка при загрузке данных:', error);
  }
});


const handleWordCorrect = (wordId) => {
  const question = crosswordData.value.words.find(q => q.id === wordId);
  if (question) {
    question.userWord = question.word; 
  }
};


const isCompleted = computed(() => {
  return crosswordData.value.words.every(q => q.word.toUpperCase() === (q.userWord || '').toUpperCase());
});


const restartCrossword = () => {
  router.push('/selectdifficulty')
};
</script>

<style scoped>
.completion-message {
  margin-top: 20px;
  font-size: 18px;
  text-align: center;
}

.completion-message button {
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}
</style>
