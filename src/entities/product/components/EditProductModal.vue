<template>
	<el-button type="success" plain :icon="Edit" circle @click="dialog = true" />
	<Teleport to="body">
		<el-dialog destroy-on-close v-model="dialog" title="Create new product" width="500">
			<el-form @submit.prevent="submit">
				<FormProduct ref="productInputs" @vue:mounted="mounted" />
				<div class="dialog-footer">
					<el-button @click="dialog = false">Cancel</el-button>
					<el-button type="primary" native-type="submit" :loading="loading">
						Confirm
					</el-button>
				</div>
			</el-form>
		</el-dialog>
	</Teleport>
</template>

<script setup lang="ts">
import { Edit } from '@element-plus/icons-vue'
import { useProduct, type IProduct } from '@/entities/product'
import { ref, type Ref } from 'vue'
import FormProduct from './ProductInputs.vue'
const props = defineProps<{ product: IProduct }>()
const dialog: Ref<boolean> = ref(false)
const loading: Ref<boolean> = ref(false)
const productInputs = ref()


async function submit() {
	const formData = productInputs.value.formData as IProduct
	loading.value = true
	await productStore.update(props.product.id!, formData)
	loading.value = false
	dialog.value = false
}

const productStore = useProduct()

function mounted() {
	for (const iterator in productInputs.value.formData) {
		const key = iterator as keyof IProduct
		productInputs.value.formData[iterator] = props.product[key]
	}
}
</script>