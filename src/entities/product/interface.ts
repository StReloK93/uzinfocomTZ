export interface IProduct {
  id?: string
  created_at?: Date | null
  name: string
  year_of_release: string
  description: string
  category: number | undefined
  price: number | null
  hide: boolean
  image: string | null
}
