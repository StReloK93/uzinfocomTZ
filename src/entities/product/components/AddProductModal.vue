<template>
	<section>
		<el-button type="primary" @click="dialog = true">
			Add new product
		</el-button>
		<el-dialog destroy-on-close v-model="dialog" title="Create new product" width="500">
			<Form as="el-form" :validation-schema="schema" @submit="submit">
				<Field name="name" class="form-control" v-slot="{ value, field, errorMessage }">
					<el-form-item :error="errorMessage" required>
						<el-input placeholder="Email Address" v-bind="field" :validate-event="false" :model-value="value" />
					</el-form-item>
				</Field>
				<el-button type="primary" native-type="submit" :loading="loading">
					Confirm
				</el-button>
			</Form>
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
import { Form, Field } from 'vee-validate'
import * as yup from "yup"
import FormProduct from './ProductInputs.vue'
import { useProduct } from '@/entities/product'
import { ref, type Ref } from 'vue'
const dialog: Ref<boolean> = ref(false)
const productInputs = ref()
const loading = ref(false)


const schema = yup.object({
	name: yup.string().required().label("name"),
	year_of_release: yup.string().matches(/^\d{4}$/, "Year must be four digits").required().label("Year of release"),
	category: yup.number().required().label('category'),
	price: yup.number().required().label('price'),
	created_at: yup.date().default(() => new Date()),
	hide: yup.boolean().required().label("hide"),
	image: yup.string().required().label("image"),
});

async function submit() {
	productInputs.value.formData.created_at = new Date()
	loading.value = true
	await productStore.create(productInputs.value.formData)
	loading.value = false
	dialog.value = false
}

const productStore = useProduct()

</script>