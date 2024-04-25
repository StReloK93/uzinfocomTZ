import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IProduct } from '@/entities/product/interface'
import config from '@/config'

export const useProduct = defineStore('useProduct', () => {
  const host = `${config.backend_url}/products`

  const products: Ref<IProduct[]> = ref([])

  async function getProducts(params: any) {
    await axios.get<IProduct[]>(host, { params }).then(({ data }) => (products.value = data))
  }
  async function create(product: IProduct) {
    await axios.post<IProduct>(host, product).then(({ data }) => {
      products.value.push(data)
    })
  }

  function remove(id: string) {
    axios.delete(`${host}/${id}`).then(() => {
      products.value = products.value.filter((product: IProduct) => product.id != id)
    })
  }

  async function update(id: string, productData: IProduct) {
    await axios.patch(`${host}/${id}`, productData).then(({ data }) => {
      const index = products.value.findIndex((product) => product.id == id)
      products.value[index] = data
    })
  }

  return { products, getProducts, create, update, remove }
})
