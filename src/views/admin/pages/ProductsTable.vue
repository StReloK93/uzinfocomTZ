<template>
	<section>
		<div class="table-header default-padding">
			<el-space :size="15">
				<el-select style="width: 150px" clearable @change="searchInputChange()" v-model="filters.category"
					placeholder="Category">
					<el-option v-for="category in categoryStore.categories" :key="category.id" :label="category.name"
						:value="category.id!" />
				</el-select>
				<el-input v-model="filters.name_like" @input="searchInputChange(onInputAwaitTimer)" style="width: 200px"
					placeholder="Search" :suffix-icon="Search" clearable />
				<el-icon color="#409efc" v-if="loadingRequest" class="is-loading">
					<Loading />
				</el-icon>
			</el-space>
			<AddProductModal @create="paginateProducts(pagenateConfig.currentPage)" />
		</div>
		<el-table :data="productStore.products" style="width: 100%">
			<el-table-column prop="name" label="Name" width="180" />
			<el-table-column label="Image" width="88">
				<template #default="product">
					<img v-if="product.row.image" :src="product.row.image"
						style="width: 40px; height: 40px;object-fit: cover">
					<img v-else src="/nofoto.png" style="width: 40px; height: 40px;object-fit: cover">
				</template>
			</el-table-column>
			<el-table-column prop="year_of_release" label="Year of release" width="180" />

			<el-table-column label="Category">
				<template #default="product">
					{{ categoryStore.selectCategoryWithId(product.row.category)?.name }}
				</template>
			</el-table-column>

			<el-table-column label="Price">
				<template #default="product">
					$ {{ product.row.price }}
				</template>
			</el-table-column>

			<el-table-column prop="created_at" label="Created at">
				<template #default="product">
					{{ moment(product.row.created_at).format('YYYY-MM-DD HH:mm') }}
				</template>
			</el-table-column>

			<el-table-column label="Hide">
				<template #default="product">
					<el-icon color="teal" v-if="product.row.hide">
						<View />
					</el-icon>
					<el-icon color="red" v-else>
						<Hide />
					</el-icon>
				</template>
			</el-table-column>
			<el-table-column label="Description">
				<template #default="product">
					<div class="no-wrap">
						{{ product.row.description }}
					</div>
				</template>
			</el-table-column>
			<el-table-column fixed="right" width="120">
				<template #default="product">
					<EditProductModal :product=product.row />
					<el-popconfirm width="200" confirm-button-text="Delete" title="Are you sure to delete this?"
						@confirm="deleteProductIntable(product.row.id)">
						<template #reference>
							<el-button type="danger" plain :icon="Delete" circle />
						</template>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div class="default-padding">
			<el-pagination background layout="prev, pager, next" v-model:current-page="pagenateConfig.currentPage"
				:page-count="pagenateConfig.pagesCount" @change="(page) => paginateProducts(page)" />
		</div>
	</section>
</template>

<script setup lang="ts">
import { useProduct, AddProductModal, EditProductModal } from '@/entities/product'
import { useCategory } from '@/entities/category'
import { Delete, Hide, View, Search, Check, Loading } from '@element-plus/icons-vue'
import moment from 'moment'
import { reactive, ref } from 'vue'

const pagenateConfig = reactive({
	perpage: 10,
	currentPage: 1,
	pagesCount: 0
})

const filters: any = reactive({
	category: null,
	name_like: null,
})


const loadingRequest = ref(true)
const searchTimer: any = ref(null)
const onInputAwaitTimer = 800 //Milliseconds


function searchInputChange(timer: number = 0) {
	clearTimeout(searchTimer.value)
	searchTimer.value = setTimeout(() => {
		paginateProducts(pagenateConfig.currentPage)
	}, timer)
}

async function deleteProductIntable(id:string){
	await productStore.remove(id)
	paginateProducts(pagenateConfig.currentPage)
}

const productStore = useProduct()
async function paginateProducts(page: any) {
	loadingRequest.value = true
	const result = await productStore.getProducts({
		...filters,
		_page: page,
		_limit: pagenateConfig.perpage,
		_sort: 'created_at',
		_order:'desc'
	})
	loadingRequest.value = false


	pagenateConfig.currentPage = page
	pagenateConfig.pagesCount = Math.ceil(result.headers['x-total-count'] / pagenateConfig.perpage)
}

paginateProducts(pagenateConfig.currentPage)
const categoryStore = useCategory()
categoryStore.getCategories()
</script>

<style>
.table-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>