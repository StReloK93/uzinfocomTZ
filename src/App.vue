<template>
  <el-container class="general-container">
    <el-container>
      <el-header>
        <img style="width: 100px" src="/element-plus-logo.svg" alt="Element logo" />
      </el-header>
      <el-main>
        <AddProductModal></AddProductModal>
        <el-table :data="productStore.products" border style="width: 100%">
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="year_of_release" label="Year of release" width="180" />
          <el-table-column prop="category" label="Category" />
          <el-table-column prop="price" label="Price" />
          <el-table-column prop="created_at" label="Created_at" />
          <el-table-column prop="Hide" label="Hide" />
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
<script setup lang="ts">
import { useProduct, AddProductModal } from '@/entities/product'
const productStore = useProduct()
productStore.getProducts()
</script>
<style>
.general-container {
  height: 100%;
}
</style>
