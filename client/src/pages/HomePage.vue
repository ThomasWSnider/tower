<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import TowerEventCard from "../components/TowerEventCard.vue";

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
  <section class="container-fluid">
    <div class="row">
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-6">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
