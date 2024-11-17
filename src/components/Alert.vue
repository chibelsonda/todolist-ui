<template>
  <div class="alert-container">
    <v-card
      v-if="alert.show"
      class="mb-3 alert"
      elevation="4"
      max-width="500"
      width="450"
      :color="alert.type"
    >
    
      <v-card-text :class="`bg-${alert.type}-bg alert-${alert.type}`">
        <v-row>
          <v-col style="flex: 0 1 50px"><v-icon :color="alert.type">{{ alert.icon }}</v-icon></v-col>

          <v-col v-html="alert.message"></v-col>

          <v-col class="text-right" style="flex: 0 1 50px">
            <v-btn
              class="ml-5 pa-0"
              density="compact"
              color="grey"
              icon="mdi-close"
              variant="text"
              @click="alertStore.clear()"
            ></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useAlertStore } from '@/stores/AlertStore'

const alertStore = useAlertStore()

const { alert } = storeToRefs(alertStore)
</script>

<style>
.alert-container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 99999;
}

.alert-container .alert-error {
  border-top: 4px solid rgb(var(--v-theme-error));
}

.alert-container .alert-success {
  border-top: 4px solid rgb(var(--v-theme-success));
}

.alert-container .alert-info {
  border-top: 4px solid rgb(var(--v-theme-info));
}

.alert-container .alert-warning {
  border-top: 4px solid rgb(var(--v-theme-warning));
}
</style>
