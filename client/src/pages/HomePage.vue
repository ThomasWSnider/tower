<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";

const towerEvents = computed(() => AppState.towerEvents)

onMounted(() => {
  getTowerEvents()
})

async function getTowerEvents() {
  try {
    await towerEventsService.getTowerEvents()
  } catch (error) {
    Pop.toast('Could not retrieve Events', 'error');
  }
}
</script>

<template>
{{ towerEvents }}
</template>

<style scoped lang="scss"></style>
