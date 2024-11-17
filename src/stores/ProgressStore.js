import { defineStore } from 'pinia';

export const useProgressStore = defineStore({
    id: 'progress',
    state: () => ({
        isInProgress: false
    }),
});