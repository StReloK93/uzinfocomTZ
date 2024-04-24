import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { ICategory } from '@/entities/category'
import config from '@/config'

export const useCategory = defineStore('useCategory', () => {
  const host = `${config.backend_url}/categories`

  const categories: Ref<ICategory[]> = ref([])

  function getCategories() {
    axios.get<ICategory[]>(host).then(({ data }) => (categories.value = data))
  }

  function selectCategoryWithId<ICategory>(id: number) {
    return categories.value.find((category) => category.id == id)
  }
  return { categories, getCategories, selectCategoryWithId }
})
