<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import TowerEventCard from "../components/TowerEventCard.vue";
import { RouterLink } from "vue-router";

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
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 p-0">
        <img class="img-fluid landing-img"
          src="https://images.unsplash.com/photo-1518709368567-b22d4217b91f?q=80&w=1450&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="A tower of giraffes">
      </div>
    </div>
  </div>
  <section class="container">
    <div class="row mt-5 mb-3">
      <div class="col-12">
        <h4>How Tower Works</h4>
        <div class="col-6">
          <div class="row">
            <div class="col-1">
              <i class="mdi mdi-magnify display-6"></i>
            </div>
            <div class="col-11">
              <p class="fs-5">Discover Events</p>
              <p>Browse our wide selection of events to find the gathering you are looking for!</p>
            </div>
          </div>
        </div>
        <div class="col-6"></div>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-lg-4">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.landing-img {
  height: var(--main-height);
  width: 100vw;
  object-fit: cover;
  object-position: 50% 25%;
}
</style>
