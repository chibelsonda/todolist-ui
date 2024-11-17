<template>
  <v-app>
    <RouterView />
    <Alert />
  </v-app>
</template>

<script setup>
  import Alert from '@/components/Alert'
</script>

<style>

.v-btn {
  text-transform: none !important;
}
</style>
