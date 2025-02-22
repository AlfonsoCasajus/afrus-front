<script lang="ts" setup>
import { gsap } from 'gsap'
import { useTransitions } from '../composables/useTransitions'
import type { PropType } from 'vue'
import { onMounted } from 'vue'
import Button from 'primevue/button'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue'

interface Columns {
  field: string
  header: string
}

defineProps({
  items: {
    type: Array as PropType<any[]>,
    required: false,
    default: () => [],
  },
  columns: {
    type: Array as PropType<Columns[]>,
    required: false,
    default: () => [],
  },
  total: {
    type: Number,
    required: false,
    default: 0,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
})

defineEmits(['delete', 'details', 'update:currentPage'])

// Transitions and animations
onMounted(() => {
  gsap.from(['table', '.table-row'], {
    y: 10,
    opacity: 0,
    stagger: 0.08,
    duration: 0.6,
    ease: 'ease.out',
  })
})

const { onBeforeEnter, onEnter, onLeave } = useTransitions()
</script>

<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
            {{ col.header }}
          </th>
        </tr>
      </thead>
      <TransitionGroup tag="tbody" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <tr v-for="(item, rowIndex) in items" :key="`item-${rowIndex}`" :data-index="rowIndex">
          <td
            v-for="(colTd, index) in columns"
            :key="`colTd-${index}`"
            :field="colTd.field"
            :header="colTd.header"
          >
            {{ item[colTd.field] }}
          </td>
        </tr>
      </TransitionGroup>
    </table>

    <div class="pagination" v-if="total > perPage">
      <Button
        rounded
        size="small"
        :disabled="currentPage === 1"
        severity="info"
        @click="$emit('update:currentPage', currentPage - 1)"
      >
        <IconChevronLeft />
      </Button>

      <span>Página {{ currentPage }} of {{ Math.ceil(total / perPage) }}</span>

      <Button
        size="small"
        rounded
        :disabled="currentPage >= Math.ceil(total / perPage)"
        severity="info"
        @click="$emit('update:currentPage', currentPage + 1)"
      >
        <IconChevronRight />
      </Button>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  display: table-row-group;
  overflow: hidden;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  border-collapse: separate;
  border-spacing: 0 10px;
  color: var(--text-secondary);

  th,
  td {
    width: 100%;
    text-align: left;
    font-size: 14px;
    font-weight: 500;
    padding: 0.5rem 1rem;
    text-overflow: ellipsis;
    max-width: 350px;
    overflow: hidden;
    white-space: nowrap;
  }

  tbody tr {
    border-radius: 1rem;
    background-color: #011c2f;
    text-wrap: nowrap;
  }
}

.table-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
