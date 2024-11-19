<template>
  <div class="center-container">
    <div class="overflow-container">
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

const placeWord = (word_len, startRow, startCol, orientation, id) => {
  let col = startCol;
  let row = startRow;
  for (let i = 0; i < word_len; i++) {
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
    } else if (i === 0 && occupiedCells[cellKey].id) {
      occupiedCells[cellKey].crossedId = id;
    }

    if (orientation === 'Горизонтально') col++;
    else row++;
  }
};

const initCrossword = () => {
  props.crosswordData.words.forEach((wordObj) =>
    placeWord(wordObj.word_len, wordObj.start_row, wordObj.start_col, wordObj.orientation, wordObj.id)
  );
  cells.value = { ...occupiedCells };
};

const checkWord = async (wordObj) => {
  let col = wordObj.start_col;
  let row = wordObj.start_row;
  let userWord = '';
  for (let i = 0; i < wordObj.word_len; i++) {
    userWord += cells.value[`${row}-${col}`]?.value.toUpperCase() || '';
    if (wordObj.orientation === 'Горизонтально') col++;
    else row++;
  }
  const response = await fetch(`http://5.35.124.40:8000/api/check-data/?id=${wordObj.id_db}&answer=${userWord}`);
  const data = await response.json();
  return data;
};

const updateCrosswordState = async () => { 
  for (const wordObj of props.crosswordData.words) {
    const flag = await checkWord(wordObj);
    if (flag) {
      wordObj.correct = true
      let col = wordObj.start_col;
      let row = wordObj.start_row;
      for (let i = 0; i < wordObj.word_len; i++) {
        const cell = cells.value[`${row}-${col}`];
        if (cell) cell.correct = true;
        if (wordObj.orientation === 'Горизонтально') col++;
        else row++;
      }
      emit('wordCorrect', wordObj.id);
    }
  }
};


watch(() => props.crosswordData, initCrossword, { immediate: true });
</script>

<style scoped>
.center-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  padding: 20px;
}

.overflow-container {
  overflow: auto;
  max-width: 100vw;
  max-height: 80vh;
  padding: 10px;
  box-sizing: border-box;
}

#crossword-container {
  display: grid;
  gap: 4px;
  width: max-content;
  position: relative;
}

.cell {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.cell input {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  background-color: #ccc;
}

.correct-word input {
  background-color: rgb(22, 178, 22);
  color: white;
  pointer-events: none;
}

.question-number {
  position: absolute;
  top: 2px;
  left: 5px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}


@media (min-width: 768px) {
  .overflow-container {
    overflow: hidden;
    max-width: 100%; 
    max-height: 100%;
  }
}


@media (max-width: 768px) {
  .cell {
    width: 40px;
    height: 40px;
  }
  .cell input {
    font-size: 16px;
  }
}

@media (max-width: 400px) {
  .cell {
    width: 30px;
    height: 30px;
  }
  .cell input {
    font-size: 14px;
  }
  .question-number {
    font-size: 10px;
  }
}
</style>
