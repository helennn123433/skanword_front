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

console.log(props.questions)
const answeredQuestions = computed(() =>
  props.questions.map((q) => ({
    ...q,
    answered: q.correct,
  }))
);

</script>

<style scoped>
#questions-container {
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.question  {
  margin-bottom: 10px;
  font-size: 20px;
}
.question strong {
  font-size: 20px;
}

.answered-question {
  color: gray;
  text-decoration: line-through;
}
</style>
