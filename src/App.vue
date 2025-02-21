<script setup lang="ts">
import { RouterView } from 'vue-router'
import Sidebar from './modules/navigation/components/SideBar.vue'
import Toast from 'primevue/toast'
</script>

<template>
  <div class="wrapper">
    <Toast />
    <Sidebar />
    <div class="view">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  min-height: 100vh;
  display: flex;
  background-color: var(--primary-bg);

  .view {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    color: white;
  }
}
</style>
