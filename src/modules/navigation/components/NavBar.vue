<script setup lang="ts">
import { ref } from 'vue'
import Button from 'primevue/button'
import { IconShoppingCart, IconUsers } from '@tabler/icons-vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navItems = ref([
  {
    label: 'Productos',
    path: '/productos',
    icon: IconShoppingCart,
  },
  {
    label: 'Compradores',
    path: '/compradores',
    icon: IconUsers,
  },
])
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in navItems" :key="item.path">
        <Button
          as="router-link"
          :to="item.path"
          size="small"
          :variant="router.currentRoute.value.path === item.path ? undefined : 'text'"
          severity="primary"
        >
          <component :is="item.icon" />
          {{ item.label }}
        </Button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;

  ul {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    list-style: none;

    li {
      text-decoration: none;
    }
  }
}
</style>
