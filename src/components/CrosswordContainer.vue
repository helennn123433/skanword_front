<template>
  <div id="crossword-container">
    <div
      v-for="(cell, key) in cells"
      :key="key"
      :class="['cell', cell.correct ? 'correct-word' : '']"
      :style="{ gridRowStart: cell.row + 1, gridColumnStart: cell.col + 1 }"
    >
      <input v-model="cell.value" type="text" maxlength="1" @input="updateCrosswordState" />
      <div v-if="cell.id" class="question-number">
        {{ cell.id }}<span v-if="cell.crossedId">({{ cell.crossedId }})</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

const emit = defineEmits(['wordCorrect']);

const props = defineProps({
  crosswordData: {
    type: Object,
    required: true,
    default: () => ({ words: [] }),
  },
});

const cells = ref({});
const occupiedCells = {};

const placeWord = (word, startRow, startCol, orientation, id) => {
  let col = startCol;
  let row = startRow;
  for (let i = 0; i < word.length; i++) {
    const cellKey = `${row}-${col}`;
    if (!occupiedCells[cellKey]) {
      occupiedCells[cellKey] = {
        row,
        col,
        value: '',
        correct: false,
        firstLetter: i === 0,
        id: i === 0 ? id : null,
        crossedId: null,  
      };
    }

    if (i === 0 && orientation === 'vertical') {
      const crossCellKey = `${startRow}-${startCol}`;
      if (occupiedCells[crossCellKey] && occupiedCells[crossCellKey].id) {
        occupiedCells[cellKey].crossedId = occupiedCells[crossCellKey].id;
      }
    }
    if (orientation === 'horizontal') col++;
    else row++;
  }
};

const initCrossword = () => {
  props.crosswordData.words.forEach((wordObj) =>
    placeWord(wordObj.word, wordObj.start_row, wordObj.start_col, wordObj.orientation, wordObj.id)
  );
  cells.value = { ...occupiedCells };
};

const checkWord = (wordObj) => {
  let col = wordObj.start_col;
  let row = wordObj.start_row;
  let userWord = '';
  for (let i = 0; i < wordObj.word.length; i++) {
    userWord += cells.value[`${row}-${col}`]?.value.toUpperCase() || '';
    if (wordObj.orientation === 'horizontal') col++;
    else row++;
  }
  return userWord === wordObj.word.toUpperCase();
};

const updateCrosswordState = () => {
  props.crosswordData.words.forEach((wordObj) => {
    if (checkWord(wordObj)) {
      let col = wordObj.start_col;
      let row = wordObj.start_row;
      for (let i = 0; i < wordObj.word.length; i++) {
        const cell = cells.value[`${row}-${col}`];
        if (cell) cell.correct = true;
        if (wordObj.orientation === 'horizontal') col++;
        else row++;
      }
      emit('wordCorrect', wordObj.id);
    }
  });
};

watch(() => props.crosswordData, initCrossword, { immediate: true });
</script>

<style scoped>
#crossword-container {
  display: grid;
  grid-template-columns: repeat(19, 40px);
  grid-template-rows: repeat(14, 40px);
  gap: 4px;
  background-color: #f1f1f1;
  width: max-content;
  margin: 20px;
  position: relative;
}

.cell {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cell input {
  width: 100%;
  height: 100%;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background-color: #fff;
}

.correct-word input {
  background-color: green;
  color: white;
  pointer-events: none;
}

.question-number {
  position: absolute;
  top: 2px;
  left: 2px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}
</style>
