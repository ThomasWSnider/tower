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
  <section class="container mt-5">
    <div class="row">
      <div class="col-12 text-center my-5">
        <img class="img-fluid event-cover-img" :src="towerEvent.coverImg" alt="">
      </div>

      <div class="col-8">
        <div class="row">
          <div class="col-12 mb-3">
            <div class="d-flex text-capitalize align-items-center">
              <h2 class="me-3">{{ towerEvent.name }}</h2>
              <small class="bg-success-subtle border border-solid rounded-pill px-2 py-1">
                {{ towerEvent.type }}
              </small>
            </div>
          </div>
          <div class="col-12 lh-lg mb-5">
            {{ towerEvent.description }}
          </div>
          <div class="col-12">
            <h5>Date and Time</h5>
            <hr>
            <p><i class="mdi mdi-calendar"></i> Begins {{ towerEvent.startDate.toLocaleString() }}</p>
          </div>
          <div class="col-12">
            <h5>Location</h5>
            <hr>
            <p><i class="mdi mdi-map-marker-alert-outline"></i> Begins {{ towerEvent.startDate.toLocaleString() }}</p>
          </div>
        </div>
      </div>

      <div class="col-4 mt-5">
        <div class="row justify-content-center">
          <div class="col-12 text-center mt-3">
            <h3>Interested?</h3>
            <p>Get a ticket now!</p>
          </div>
          <div class="col-6 mb-2">
            <div class="d-grid">
              <button class="btn btn-info">Attend</button>
            </div>
          </div>
          <div class="col-12 text-end mb-5">
            <p class="text-subtle">0 tickets left, sorry!</p>
          </div>
          <div class="col-12">
            <h3>Attendees</h3>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.event-cover-img {
  object-fit: cover;
  width: 60%;
  height: 50vh;
}
</style>