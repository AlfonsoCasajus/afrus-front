<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

// Components
import AfrusTable from '@/modules/utils/components/AfrusTable.vue'

// Composables
import { useProducts } from '../composables/useProducts'

// PrimeVue
import ProgressSpinner from 'primevue/progressspinner'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

// Icons
import { IconSearch, IconRefresh } from '@tabler/icons-vue'

// Types
import type { Filters } from '../types/products'

const { getProducts, isLoadingProducts, productsList, totalProducts } = useProducts()

onMounted(() => {
  getProducts({})
})

const filters = ref<Filters>({})

const searchProducts = () => {
  if (!filters.value.name) delete filters.value.name
  if (!filters.value.minPrice) delete filters.value.minPrice
  if (!filters.value.maxPrice) delete filters.value.maxPrice
  if (!filters.value.minStock) delete filters.value.minStock
  if (!filters.value.maxStock) delete filters.value.maxStock

  filters.value.page = 1

  getProducts(filters.value)
}

const resetFilters = () => {
  filters.value = {}
  getProducts({})
}

const hasFilters = computed(() => {
  return (
    filters.value.name ||
    filters.value.minPrice ||
    filters.value.maxPrice ||
    filters.value.minStock ||
    filters.value.maxStock
  )
})

const columns = [
  { field: 'name', header: 'Nombre' },
  { field: 'description', header: 'Descripción' },
  { field: 'price', header: 'Precio' },
  { field: 'stock', header: 'Stock' },
]

const updateCurrentPage = (page: number) => {
  filters.value.page = page
  getProducts({ ...filters.value })
}
</script>

<template>
  <div class="products-view">
    <div class="filters">
      <div class="filter-header">
        <h3>Filtros</h3>
        <Button
          v-tooltip="'Reestablecer'"
          class="btn-search"
          @click="resetFilters"
          rounded
          severity="info"
        >
          <IconRefresh :size="16" />
        </Button>
      </div>
      <span>
        <label for="name">Nombre</label>
        <InputText
          v-model="filters.name"
          size="small"
          id="name"
          type="text"
          placeholder="Buscar por nombre"
          clearable
        />
      </span>
      <span>
        <label for="price">Precio</label>

        <InputNumber
          v-model="filters.minPrice"
          id="price"
          size="small"
          prefix="$"
          inputId="integeronly"
          placeholder="Minimo"
        />
        <InputNumber
          v-model="filters.maxPrice"
          id="price"
          size="small"
          prefix="$"
          inputId="integeronly"
          placeholder="Maximo"
          inputClass="input"
        />
      </span>
      <span>
        <label for="stock">Stock</label>
        <InputNumber
          v-model="filters.minStock"
          id="stock"
          size="small"
          inputId="integeronly"
          placeholder="Minimo"
        />
        <InputNumber
          v-model="filters.maxStock"
          id="stock"
          size="small"
          inputId="integeronly"
          placeholder="Maximo"
        />
      </span>

      <Button
        v-tooltip="'Buscar'"
        class="btn-search"
        severity="info"
        :disabled="!hasFilters"
        @click="searchProducts"
      >
        <IconSearch :size="16" />
        Filtrar
      </Button>
    </div>
    <div class="products-container">
      <div class="products-header">
        <h1>PRODUCTOS</h1>
        <p>Total: {{ totalProducts }}</p>
      </div>

      <AfrusTable
        v-if="!isLoadingProducts"
        :items="productsList"
        :columns="columns"
        :total="totalProducts"
        :currentPage="filters.page"
        :perPage="filters.limit"
        @update:currentPage="updateCurrentPage"
      >
        <template #price="{ item }">
          <span>${{ item.price }}</span>
        </template>
        <template #stock="{ item }">
          <Tag
            :value="item.stock"
            :severity="item.stock >= 75 ? 'success' : item.stock >= 25 ? 'warn' : 'danger'"
          />
        </template>
      </AfrusTable>

      <ProgressSpinner v-else />
    </div>
  </div>
</template>

<style scoped>
.products-view {
  display: flex;
  gap: 2rem;

  .filters {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .filter-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    span {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }

  .products-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .products-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
