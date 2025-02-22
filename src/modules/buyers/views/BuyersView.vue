<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'

// Components
import AfrusTable from '@/modules/utils/components/AfrusTable.vue'

// Composables
import { useBuyers } from '../composables/useBuyers'

// PrimeVue
import ProgressSpinner from 'primevue/progressspinner'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Tag from 'primevue/tag'

// Icons
import { IconSearch, IconRefresh } from '@tabler/icons-vue'

// Types
import type { Filters } from '../types/buyers'

const { getBuyers, isLoadingBuyers, buyersList, totalBuyers } = useBuyers()

onMounted(() => {
  getBuyers({})
})

const filters = ref<Filters>({})

const searchBuyers = () => {
  if (!filters.value.firstName) delete filters.value.firstName

  filters.value.page = 1

  getBuyers(filters.value)
}

const resetFilters = () => {
  filters.value = {}
  getBuyers({})
}

const hasFilters = computed(() => {
  return filters.value.firstName || filters.value.lastName
})

const columns = [
  { field: 'firstName', header: 'Nombre' },
  { field: 'lastName', header: 'Apellido' },
  { field: 'idType', header: 'Tipo de documento' },
  { field: 'createdAt', header: 'Fecha de creación' },
]

const updateCurrentPage = (page: number) => {
  filters.value.page = page
  getBuyers({ ...filters.value })
}

const getDocumentTypeColor = (documentType: 'DNI' | 'Passport' | 'Driver License') => {
  if (documentType === 'DNI') return 'primary'
  if (documentType === 'Passport') return 'secondary'
  if (documentType === 'Driver License') return 'info'
}
</script>

<template>
  <div class="buyers-view">
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
          v-model="filters.firstName"
          size="small"
          id="firstName"
          type="text"
          placeholder="Buscar por nombre"
          clearable
        />
      </span>
      <span>
        <label for="lastName">Apellido</label>
        <InputText
          v-model="filters.lastName"
          size="small"
          id="lastName"
          type="text"
          placeholder="Buscar por apellido"
          clearable
        />
      </span>
      <Button
        v-tooltip="'Buscar'"
        class="btn-search"
        severity="info"
        :disabled="!hasFilters"
        @click="searchBuyers"
      >
        <IconSearch :size="16" />
        Filtrar
      </Button>
    </div>
    <div class="buyers-container">
      <div class="buyers-header">
        <h1>COMPRADORES</h1>
        <p>Total: {{ totalBuyers }}</p>
      </div>

      <AfrusTable
        v-if="!isLoadingBuyers"
        :items="buyersList"
        :columns="columns"
        :total="totalBuyers"
        :currentPage="filters.page"
        :perPage="filters.limit"
        @update:currentPage="updateCurrentPage"
      >
        <template #idType="{ item }">
          <Tag :value="item.idType" :severity="getDocumentTypeColor(item.idType)" />
        </template>
        <template #createdAt="{ item }">
          {{
            new Intl.DateTimeFormat('es-AR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(item.createdAt))
          }}
        </template>
      </AfrusTable>

      <ProgressSpinner v-else />
    </div>
  </div>
</template>

<style scoped>
.buyers-view {
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

  .buyers-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .buyers-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
