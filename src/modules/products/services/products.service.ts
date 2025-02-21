import axios from 'axios'
import type { Product, Filters } from '../types/products'

export const fetchProducts = async (
  filters: Filters,
): Promise<{ products: Product[]; total: number }> => {
  try {
    const response = await axios.get('/products', { params: filters })
    return response.data
  } catch (error) {
    console.error('Error fetching products', error)
    throw error
  }
}
