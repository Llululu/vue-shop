<script setup>
import { onMounted } from 'vue';
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue';

import useCategoryStore from '@/stores/categoryStore'

const categoryStore = useCategoryStore()
categoryStore.getCategory()

</script>

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <RouterView />
  <LayoutFooter />
</template>

<style scoped>
.layout {
    
}
</style>