import axios from 'axios'
import type { Buyer, Filters } from '../types/buyers'

export const fetchBuyers = async (
  filters: Filters,
): Promise<{ buyers: Buyer[]; total: number }> => {
  try {
    const response = await axios.get('/buyers', { params: filters })
    return response.data
  } catch (error) {
    console.error('Error fetching buyers', error)
    throw error
  }
}
