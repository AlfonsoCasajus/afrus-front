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
}
