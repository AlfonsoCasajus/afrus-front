import type { Buyer } from '../types/buyers'

import { ref } from 'vue'
import type { Filters } from '../types/buyers'
import { useToast } from 'primevue/usetoast'
import { fetchBuyers } from '../services/buyers.service'

export const useBuyers = () => {
  const toast = useToast()

  const buyersList = ref<Buyer[]>([])
  const totalBuyers = ref(0)

  const isLoadingBuyers = ref(false)

  const getBuyers = async (filters: Filters) => {
    isLoadingBuyers.value = true
    try {
      const buyersResponse = await fetchBuyers(filters)
      buyersList.value = buyersResponse.buyers
      totalBuyers.value = buyersResponse.total
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Ups algo fallo!',
        detail: `Vuelve a intentarlo mas tarde`,
        life: 3000,
      })
      console.error('Error fetching buyers: ', error)
    }
    isLoadingBuyers.value = false
  }

  return {
    isLoadingBuyers,
    getBuyers,
    buyersList,
    totalBuyers,
  }
}
