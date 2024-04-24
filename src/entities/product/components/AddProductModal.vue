<template>
	<section>
		<el-button type="primary" @click="dialog = true">
			Add new product
		</el-button>
		<el-dialog destroy-on-close v-model="dialog" title="Create new product" width="500">
			<el-form @submit.prevent="submit">
				<FormProduct ref="productInputs" />
				<div class="dialog-footer">
					<el-button @click="dialog = false">Cancel</el-button>
					<el-button type="primary" native-type="submit" :loading="loading">
						Confirm
					</el-button>
				</div>
			</el-form>
		</el-dialog>
	</section>
</template>

<script setup lang="ts">
import FormProduct from './ProductInputs.vue'
import { useProduct } from '@/entities/product'
import { ref, type Ref } from 'vue'
const dialog: Ref<boolean> = ref(false)
const productInputs = ref()
const loading = ref(false)


async function submit() {
	productInputs.value.formData.created_at = new Date()
	loading.value = true
	await productStore.create(productInputs.value.formData)
	loading.value = false
	dialog.value = false
}

const productStore = useProduct()

</script>