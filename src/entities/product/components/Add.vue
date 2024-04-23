<template>
   <div>
      <el-button plain @click="dialog = true">
         Open a Form nested Dialog
      </el-button>
      <el-dialog v-model="dialog" title="Shipping address" width="500">
         <el-form :model="formData">
            <el-form-item label="Promotion name" :label-width="true">
               <el-input v-model="formData.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones" :label-width="true">
               <el-select v-model="formData.category" placeholder="Please select a zone">
                  <el-option label="Zone No.1" value="shanghai" />
                  <el-option label="Zone No.2" value="beijing" />
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
   </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useProduct, type IProduct } from '@/entities/product'

const dialog = ref(false)
const formData = reactive({
   name: null,
   year_of_release: null,
   category: null,
   price: null,
   created_at: Date,
   Hide: Boolean,
})

</script>