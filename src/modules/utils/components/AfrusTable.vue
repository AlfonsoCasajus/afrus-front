<script lang="ts" setup>
import { gsap } from 'gsap'
import { useTransitions } from '../composables/useTransitions'
import type { PropType } from 'vue'
import { onMounted } from 'vue'

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
})

defineEmits(['delete', 'details'])

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
  <table>
    <thead>
      <tr>
        <th v-for="col of columns" :key="col.field" :field="col.field" :header="col.header">
          {{ col.header }}
        </th>
      </tr>
    </thead>
    <TransitionGroup
      tag="tbody"
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @leave="onLeave"
    >
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
  }

  tr {
    border-radius: 1rem;
    background-color: var(--sidebar-bg);
    text-wrap: nowrap;
  }
}
</style>
