<template>
    <div class="header-container rounded mx-2 mx-md-0"> 
        <div class="title-info">

            <h1 class="font-weight-bold">{{ route.meta.label }}</h1>
            <v-breadcrumbs :items="crumbs" color="#a0a0a0" active-color="primary" density="compact">

                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item :to="item.link" :disabled="item.disabled">
                        {{ item.name }}
                    </v-breadcrumbs-item>
                </template>
                <template v-slot:prepend>
                    <v-icon color="#bcbcbc" class="mr-2" size="small" icon="mdi-home-outline"></v-icon> <span
                        class="mr-2">/</span>
                </template>
            </v-breadcrumbs>
        </div>

        <div class="action-slot text-right pa-5">
            <slot name="action">

            </slot>
        </div>
    </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const route = useRoute()
const items = ref([ 
    {
        title: route.name,
        disabled: false,
        href: '/dashboard'
    }
])

const crumbs = computed(() => {
    let pathArray = route.path.split("/")
    
    //  pathArray.shift()
      let breadcrumbs = pathArray.reduce((breadcrumbArray, path, idx) => {
        breadcrumbArray.push({
          path: path,
          to: breadcrumbArray[idx - 1]
            ? "/" + breadcrumbArray[idx - 1].path + "/" + path
            : "/" + path,
          name: route.matched[idx].name || path,
        });
        return breadcrumbArray;
      }, [])

      return breadcrumbs.slice(0, -1);
})
</script>

<style scoped>
.header-container {
    background-color: #F5F5F5;
    padding: 5px;
    display: flex;
}

.header-container h1 {
    font-size: 18px;
    color: #495057;
    margin: 10px 0 0 15px;
    font-weight: 500;
}

.title-info,
.action-slot {
    flex: 1
}

.action-slot {
    justify-content: flex-end;
    display: flex;
}
</style>
