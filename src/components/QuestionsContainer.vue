<template>
  <div id="questions-container">
    <div
      v-for="question in answeredQuestions"
      :key="question.id"
      class="question"
      :class="{ 'answered-question': question.answered }"
    >
      <strong>{{ question.id }}.</strong> {{ question.question }} ({{ question.orientation }})
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps } from 'vue';

const props = defineProps({
  questions: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const answeredQuestions = computed(() =>
  props.questions.map((q) => ({
    ...q,
    answered: q.word.toUpperCase() === (q.userWord || '').toUpperCase(),
  }))
);

</script>

<style scoped>
#questions-container {
  margin: 20px;
}

.question {
  margin-bottom: 10px;
}

.answered-question {
  color: gray;
  text-decoration: line-through;
}
</style>
