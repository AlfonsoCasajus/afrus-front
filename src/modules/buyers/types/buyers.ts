import type { Product } from '@/modules/products/types/products'

export interface Filters {
  firstName?: string
  lastName?: string
  idType?: string
  createdAt?: string
  page?: number
  limit?: number
}

export interface Buyer {
  id: number
  firstName: string
  lastName: string
  idType: string
  createdAt: string
  transactions: Transaction[]
}

export interface Transaction {
  id: number
  paidPrice: number
  createdAt: string
  tax: number
  date: Date
  product: Product
}
