<template>
  <section>
    <div class="table-header" style="padding: 15px;">
      <el-space :size="15">
        <el-select style="width: 150px" clearable @change="productStore.getProducts(filters)" v-model="filters.category"
          placeholder="Category">
          <el-option v-for="category in categoryStore.categories" :key="category.id" :label="category.name" :value="category.id!" />
        </el-select>
        <el-input v-model="filters.name" @input="searchInputChange" style="width: 200px" placeholder="Search"
          :suffix-icon="Search" clearable />
      </el-space>
      <AddProductModal></AddProductModal>
    </div>
    <el-table :data="productStore.products" style="width: 100%">

      <el-table-column prop="name" label="Name" width="180" />

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

      <el-table-column fixed="right" width="120">
        <template #default="product">
          <EditProductModal :product=product.row />
          <el-popconfirm width="200" confirm-button-text="Delete" title="Are you sure to delete this?"
            @confirm="productStore.remove(product.row.id)">
            <template #reference>
              <el-button type="danger" plain :icon="Delete" circle />
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>
  </section>
</template>

<script setup lang="ts">
import { useProduct, AddProductModal, EditProductModal } from '@/entities/product'
import { useCategory } from '@/entities/category'
import { Delete, Hide, View, Search } from '@element-plus/icons-vue'
import moment from 'moment'
import { reactive, ref } from 'vue'
const filters: any = reactive({
  category: null,
  name: null,
})

const searchTimer: any = ref(null)

function searchInputChange() {
  const timeAwait = 777
  clearTimeout(searchTimer.value)
  searchTimer.value = setTimeout(() => {
    productStore.getProducts(filters)
  }, timeAwait)
}

const productStore = useProduct()
productStore.getProducts(null)

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