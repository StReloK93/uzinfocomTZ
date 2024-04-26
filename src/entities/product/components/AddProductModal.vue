<template>
	<el-button type="primary" @click="dialog = true">
		Add new product
	</el-button>
	<el-dialog destroy-on-close v-model="dialog" title="Create new product" width="500" draggable>
		<Form :validation-schema="productSchema" @submit="submit">
			<FormProduct />
			<div class="dialog-footer">
				<el-button @click="dialog = false">Cancel</el-button>
				<el-button type="primary" native-type="submit" :loading="loading">
					Confirm
				</el-button>
			</div>
		</Form>
	</el-dialog>
</template>

<script setup lang="ts">
import { Form } from 'vee-validate'
import FormProduct from './ProductInputs.vue'
import { useProduct, productSchema, type IProduct } from '@/entities/product'
import { ref, type Ref } from 'vue'
const dialog: Ref<boolean> = ref(false)
const loading = ref(false)

async function submit(values: any) {
	const data = productSchema.cast(values) as IProduct
	loading.value = true
	await productStore.create(data)
	loading.value = false
	dialog.value = false
}

const productStore = useProduct()

</script>