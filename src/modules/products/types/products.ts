export interface Filters {
  name?: string
  minStock?: number
  maxStock?: number
  minPrice?: number
  maxPrice?: number
  page?: number
  limit?: number
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
}
