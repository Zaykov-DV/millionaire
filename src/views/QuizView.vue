<template>
  <div class="quiz" v-if="!loading">
    <div>
      <h4 class="quiz__question" v-html="currentQuestion"></h4>
      <ul class="quiz__answers">
        <li class="quiz__answer" v-for="(answer, id) in currentAnswers || undefined" :key="answer.id" v-html="answer"
            @click="chooseAnswer(answer, id)" ref="refAnswer"
            :class="correctAnswer"
        ></li>
      </ul>
    </div>
    <div class="quiz__rewards">
      <div class="quiz__reward" v-for="(reward, id) in store.rewards" :key="reward.id"
           :class="{'is-active': id === store.currentQuestionIndex, 'is-protected' : id === 4 || id === 9 || id === 14 }">
        <span>{{ id + 1 }}</span>
        <span>{{ reward }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.quiz {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10%;

  &__question {
    padding: 10px 20px;
    border: 1px solid white;
    border-bottom-left-radius: 20px;
    border-top-right-radius: 20px;
    font-size: 24px;
    margin-bottom: 40px;
  }

  &__answers {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    padding: 0;
    counter-reset: answers;
    font-size: 20px;
  }

  &__answer {
    display: flex;
    list-style: none;
    padding: 10px 20px;
    border: 1px solid white;
    border-radius: 20px;
    transition: all 0.3s ease-in-out;

    &::before {
      content: counter(answers, lower-latin) ":";
      counter-increment: answers;
      margin-right: 8px;
      text-transform: uppercase;
      color: darkorange;
    }

    &:hover {
      background-color: rgba(255, 165, 0, 0.8);
      cursor: pointer;
    }

    &.is-selected {
      background-color: orange;
    }

    &.is-wrong {
      background-color: red;
    }

    &.is-correct {
      background-color: green;
    }
  }

  &__rewards {
    display: flex;
    flex-direction: column-reverse;
    padding: 20px;
    border: 1px solid #fff;
    border-radius: 8px;
    background-color: #3a3a6c;
    min-width: 200px;
    margin-left: 60px;
  }

  &__reward {
    display: flex;
    justify-content: space-between;
    color: yellow;
    transition: all 0.3s ease-in-out;

    &.is-active {
      color: wheat;
      background-color: chocolate;
      padding: 0 8px;
      margin: 0 -8px;
      border-radius: 4px;
    }

    &.is-protected {
      color: white;
    }
  }
}
</style>

<script setup>

import {ref, computed, onBeforeMount} from "vue";
import {useQuestionsStore} from "@/stores/questions-store";
import router from "@/router";

const loading = ref(true)

const store = useQuestionsStore()

const currentQuestion = computed(() => {
  return store.getCurrentQuestion?.question
})

// const answers =
const currentAnswers = computed(() => {
  return store.shuffleArray([...store.getCurrentQuestion?.incorrect_answers, store.getCurrentQuestion?.correct_answer])
})

const refAnswer = ref()
const correctAnswer = ref('')

const chooseAnswer = (answer, id) => {
  refAnswer.value[id].classList.add('is-selected')

  let correctAnswerIndex = currentAnswers.value.indexOf(store.getCurrentQuestion.correct_answer)

  setTimeout(() => {
    refAnswer.value[correctAnswerIndex].classList.add('is-correct')
  }, 1500)

  if (answer === store.getCurrentQuestion.correct_answer) {
    return setTimeout(() => {
      refAnswer.value[correctAnswerIndex].classList.remove('is-correct')
      refAnswer.value[correctAnswerIndex].classList.remove('is-selected')
      store.currentQuestionIndex += 1
    }, 3000)
  }

  setTimeout(() => {
    router.push({name: 'EndGame'})
  }, 3000)
  refAnswer.value[id].classList.remove('is-selected')
  refAnswer.value[id].classList.add('is-wrong')
  return store.setWonAmount()
}

onBeforeMount(async () => {
  await store.getData().then(() => {
    if (store.questions.length === 0) {
      alert('Игры с такими параметрами нет!')
      router.push('/')
    }
    loading.value = false
  })
})
</script>