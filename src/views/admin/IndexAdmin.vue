<template>
  <el-container class="general-container">
    <el-container>
      <el-header class="el-pepe-header">
        UZINFOCOM TZ
      </el-header>
      <el-main>
        <el-card shadow="never" body-style="padding: 0px">
          <template #default>
            <router-view></router-view>
          </template>
        </el-card>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>
