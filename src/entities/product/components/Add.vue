<template>
   <el-space direction="vertical" alignment="start" :size="15">
      <el-button plain @click="dialog = true">
         Add new product
      </el-button>
      <el-dialog v-model="dialog" title="Create new product" width="500">
         <el-form :model="formData">
            <el-form-item>
               <el-input placeholder="Name" v-model="formData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item>
               <el-input placeholder="Year of release" v-model="formData.year_of_release" autocomplete="off" />
            </el-form-item>
            <el-form-item>
               <el-select v-model="formData.category" placeholder="Category">
                  <el-option v-for="category in categories" :label="category.name" :value="category.id" />
               </el-select>
            </el-form-item>
         </el-form>
         <template #footer>
            <div class="dialog-footer">
               <el-button @click="dialog = false">Cancel</el-button>
               <el-button type="primary" @click="dialog = false">
                  Confirm
               </el-button>
            </div>
         </template>
      </el-dialog>
   </el-space>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useProduct, type IProduct } from '@/entities/product'

const dialog = ref(false)
const formData: IProduct = reactive({
   name: "",
   year_of_release: null,
   category: undefined,
   price: null,
   created_at: new Date(),
   hide: true,
})



const categories = reactive([
   {
      "id": 1,
      "name": "Shoes"
   },
   {
      "id": 2,
      "name": "Trousers"
   },
   {
      "id": 3,
      "name": "Shirt"
   },
   {
      "id": 4,
      "name": "Jacket"
   }
])

</script>