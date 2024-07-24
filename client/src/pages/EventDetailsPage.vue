<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";


const towerEvent = computed(() => AppState.activeTowerEvent)
const route = useRoute()

onMounted(() => {
  getTowerEventById()
})

async function getTowerEventById() {
  try {
    const towerEventId = route.params.eventId
    await towerEventsService.getTowerEventById(towerEventId)
  } catch (error) {
    Pop.error(error);
  }
}
</script>


<template>
  d
</template>


<style lang="scss" scoped></style>