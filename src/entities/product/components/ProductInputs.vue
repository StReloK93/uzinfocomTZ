<template>
	<section>
		<section class="image-parent">
			<main v-if="formData.image">
				<el-button @click="clearImage" class="float-button" type="danger" :icon="Delete" circle />
				<img :src="formData.image">
			</main>
			<label class="image-label" for="imageInputProduct" v-else>
				<aside>Select image</aside>
				<el-icon>
					<Picture />
				</el-icon>
			</label>
		</section>
		<Field name="image" v-model="formData.image" v-slot="{ errorMessage }">
			<el-form-item :error="errorMessage">
				<input type="file" @change="PreviewImage" ref="imageInput" id="imageInputProduct" accept="image/*" hidden>
			</el-form-item>
		</Field>
		<Field name="name" v-model="formData.name" v-slot="{ errorMessage }">
			<el-form-item :error="errorMessage">
				<el-input placeholder="Name" v-model="formData.name" />
			</el-form-item>
		</Field>
		<el-row :gutter="10">
			<Field name="year_of_release" v-model="formData.year_of_release" v-slot="{ errorMessage }">
				<el-col :span="12">
					<el-form-item :error="errorMessage">
						<el-date-picker value-format="YYYY" v-model="formData.year_of_release" style="width: 100%;" type="year"
							placeholder="Year of release" />
					</el-form-item>
				</el-col>
			</Field>
			<el-col :span="12">
				<Field name="category" v-model="formData.category" v-slot="{ errorMessage }">
					<el-form-item :error="errorMessage">
						<el-select v-model="formData.category" placeholder="Category">
							<el-option v-for="category in categoryStore.categories" :label="category.name" :value="category.id!"
								:key="category.id" />
						</el-select>
					</el-form-item>
				</Field>
			</el-col>
		</el-row>
		<Field name="description" v-model="formData.description" v-slot="{ errorMessage }">
			<el-form-item :error="errorMessage">
				<el-input v-model="formData.description" :autosize="{ minRows: 2, maxRows: 2 }" type="textarea"
					placeholder="Description" />
			</el-form-item>
		</Field>
		<Field name="price" v-model="formData.price" v-slot="{ errorMessage }">
			<el-form-item :error="errorMessage">
				<el-input placeholder="Price" type="number" v-model="formData.price" autocomplete="off" />
			</el-form-item>
		</Field>
		<Field name="hide" v-model="formData.hide">
			<el-form-item>
				<el-switch v-model="formData.hide" active-text="Show" inactive-text="Hide" />
			</el-form-item>
		</Field>
	</section>
</template>

<script setup lang="ts">
import { Field } from 'vee-validate'
import { Picture, Delete } from '@element-plus/icons-vue'
import { useCategory } from '@/entities/category'
import { type IProduct } from '@/entities/product'
import { reactive, ref } from 'vue'
const imageInput = ref()
const formData: IProduct = reactive({
	name: "",
	year_of_release: "",
	description: "",
	category: undefined,
	price: null,
	hide: true,
	image: null,
})


const categoryStore = useCategory()
categoryStore.getCategories()


function PreviewImage() {
	const file = imageInput.value.files[0]
	const reader = new FileReader()
	reader.onloadend = () => {
		const base64String = reader.result as string
		formData.image = base64String
	}

	if (file) reader.readAsDataURL(file)
}

function clearImage() {
	formData.image = null
	imageInput.value.value = ""
}

defineExpose({ formData })
</script>
<style scoped>
.image-parent {
	position: relative;
	box-sizing: border-box;
	border: 1px solid #dddddd;
	border-radius: 4px;
	padding: 5px;
}

.image-label {
	width: 100%;
	display: block;
}

.image-parent img {
	width: 100%;
	object-fit: cover;
}

.image-parent label {
	cursor: pointer;
	box-sizing: border-box;
	border: 1px dashed #dddddd;
	border-radius: 3px;
	padding: 50px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: #666;
	font-size: 22px;
	height: 100%;
	transition: background 0.4s;
}

.image-parent label:hover {
	background: #ccc;
}

.float-button {
	position: absolute;
	right: 10px;
	top: 10px;
}
</style>