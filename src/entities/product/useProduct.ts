import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { IProduct } from '@/entities/product/interface'
import config from '@/config'

export const useProduct = defineStore('useProduct', () => {
	const host = `${config.backend_url}/products`

	const products: Ref<IProduct[]> = ref([])

	async function getProducts(params: any) {
		const result = await axios.get<IProduct[]>(host, { params })
		products.value = result.data
		return result
	}
	
	async function create(product: IProduct) {
		await axios.post<IProduct>(host, product)
		// products.value.push(data)
	}

	async function remove(id: string) {
		await axios.delete(`${host}/${id}`)

		// products.value = products.value.filter((product: IProduct) => product.id != id)
	}

	async function update(id: string, productData: IProduct) {
		await axios.patch(`${host}/${id}`, productData).then(({ data }) => {
			const index = products.value.findIndex((product) => product.id == id)
			products.value[index] = data
		})
	}


	return { products, getProducts, create, update, remove }
})
