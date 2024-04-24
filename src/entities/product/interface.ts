export interface IProduct {
  id?: string
  name: string
  year_of_release: string
  category: number | undefined
  price: number | null
  created_at: Date | null
  hide: boolean
  image: string | null
}
