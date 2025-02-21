import type { Product } from '../types/products'

import { ref } from 'vue'
import { fetchProducts } from '../services/products.service'
import type { Filters } from '../types/products'
import { useToast } from 'primevue/usetoast'

export const useProducts = () => {
  const toast = useToast()

  const productsList = ref<Product[]>([])
  const totalProducts = ref(0)

  const isLoadingProducts = ref(false)

  const getProducts = async (filters: Filters) => {
    isLoadingProducts.value = true
    try {
      const productsResponse = await fetchProducts(filters)
      productsList.value = productsResponse.products
      totalProducts.value = productsResponse.total
    } catch (error) {
      toast.add({
        severity: 'error',
        summary: 'Ups algo fallo!',
        detail: `Vuelve a intentarlo mas tarde`,
        life: 3000,
      })
      console.error('Error fetching products: ', error)
    }
    isLoadingProducts.value = false
  }

  return {
    isLoadingProducts,
    getProducts,
    productsList,
    totalProducts,
  }
}
