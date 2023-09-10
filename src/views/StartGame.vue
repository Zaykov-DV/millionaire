<template>
  <main class="main">
    <div class="main__wrapper">
      <p>Select Category</p>
      <select required class="main__select select" v-model="selectedCategory">
        <option :selected="true" value="">All questions</option>
        <option v-for="category in store.categories"
                :key="category.id"
                :value="category.id"
                :selected="selectedCategory">
          {{ category.name }}
        </option>
      </select>

      <p>Select Difficulty:</p>
      <select required class="main__select select" v-model="selectedDifficulty">
        <option v-for="difficulty in store.difficulties"
                :key="difficulty.id"
                :value="difficulty.query"
                :selected="selectedDifficulty">
          {{ difficulty.name }}
        </option>
      </select>
      <button @click="startGame">start game</button>
    </div>
  </main>
</template>

<script setup>
import {computed} from "vue";
import {useQuestionsStore} from "@/stores/questions-store";
import router from "@/router";

const store = useQuestionsStore()

const selectedCategory = computed({
  get() {
    return store.getCategories;
  },
  set(payload) {
    store.setCategory(payload);
  }
})

const selectedDifficulty = computed({
  get() {
    return store.difficulties;
  },
  set(payload) {
    store.setDifficulty(payload);
  }
})

const startGame = () => {
  if (store.selectedDifficulty && store.selectedCategory) router.push({name: 'quiz'})
}

</script>

<style lang="scss">
  .main {
    display: flex;
    align-items: center;
    background: url("../assets/images/background.png") no-repeat right/contain;
    min-height: 100vh;
    padding: 100px;

    &__wrapper {
      display: flex;
      flex-direction: column;
      border: 1px solid #fff;
      border-radius: 20px;
      width: 30vw;
      padding: 20px;
      background: rgba(52, 73, 94, 0.8);
    }

    &__select {
      min-height: 30px;
      margin: 4px 0 20px;
    }
  }
</style>