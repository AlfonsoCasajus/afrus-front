<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './modules/navigation/components/NavBar.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="wrapper">
    <Toast />
    <NavBar />
    <section class="view">
      <RouterView />
    </section>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-bg);
  max-width: 1200px;
  margin: auto;

  .view {
    padding: 1rem;
    color: white;
    overflow: hidden;
  }
}
</style>
