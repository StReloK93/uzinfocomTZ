export interface IProduct {
  id?: string
  name: string
  year_of_release: number | null
  category: number | undefined
  price: number | null
  created_at: Date | null
  hide: Boolean
  image: string | null
}
