<template>
  <v-main>
    <v-navigation-drawer
      rail-width="74" 
      :width="270" 
      class="pa-2"
      v-model="showSidebar" 
      :rail="rail" 
      expand-on-hover>

      <v-row>
        <v-col class="pa-6">
          <h1 :style="'color:#1A237E;'">
            <v-icon icon="mdi-view-list" color="#6A1B9A" class="mr-1"></v-icon>{{rail ? '' : 'Todo list'}}
          </h1>
        </v-col>
      </v-row>

      <v-list nav v-model:opened="sectionOpen">
        <v-list-item
          prepend-icon="mdi-format-list-bulleted"
          to="/tasks"
          link
          title="Tasks"
          class="v-list-item-text"
        ></v-list-item>

      </v-list>
    </v-navigation-drawer>

    <div class="page-body">
      <v-app-bar color="white" :elevation="0">

        <v-app-bar-title>
          <v-app-bar-nav-icon @click.stop="showNavDrawer()"></v-app-bar-nav-icon>
        </v-app-bar-title>

      </v-app-bar>

      <router-view />
    </div>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const showSidebar = ref(null)
const sectionOpen = ref(null)
const rail = ref(null)

function showNavDrawer(){    
  if (width.value < 860) {
    rail.value = false
    return showSidebar.value = !showNavDrawer.value
  } else if (width.value > 860) {
    showSidebar.value = !showNavDrawer.value
    return rail.value = !rail.value
  }
}


</script>

<style scoped>
.v-list-item-text :deep(.v-list-item-title) {
  font-size: 14px;
}
</style>