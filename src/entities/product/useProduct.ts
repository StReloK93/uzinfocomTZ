import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IProduct } from '@/entities/product/interface'
export const useProduct = defineStore('useProduct', () => {
  const products = ref()

  function getProducts() {
    axios.get<IProduct[]>('https://uzinfocomtz.onrender.com/products').then((result) => {
      console.log(result)

      products.value = result.data
    })
  }

  function create() {
    axios
      .post<IProduct>('https://uzinfocomtz.onrender.com/products', {
        name: 'Uzinfocom',
        year_of_release: '2009',
        category: 1,
        price: 300,
        created_at: new Date(),
        Hide: true
      })
      .then((result) => {
        products.value.push(result.data)
      })
  }

  function remove(id: string) {
    axios.delete(`https://uzinfocomtz.onrender.com/products/${id}`).then((result) => {
      products.value = products.value.filter((product: IProduct) => product.id != id)
    })
  }

  function update(id: string) {
    axios
      .patch(`https://uzinfocomtz.onrender.com/products/${id}`, {
        name: 'Uzinfocom',
        year_of_release: '2009',
        category: 1,
        price: 300,
        created_at: new Date(),
        Hide: true
      })
      .then((result) => {
        products.value.push(result.data)
      })
  }

  return { products, getProducts, create, remove }
})
