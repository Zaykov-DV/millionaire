<template>
  <main class="main">
    <div class="main__wrapper">
      <h3>Game over!</h3>
      <p>You won {{store.wonMoney}}</p>
    </div>
  </main>
</template>

<script setup>
import {useQuestionsStore} from "@/stores/questions-store";
const store = useQuestionsStore()
</script>

<style lang="scss" scoped>

</style>