<script setup>
import { RouterLink } from "vue-router";
import { TowerEvent } from "../models/TowerEvent";


defineProps({ towerEvent: TowerEvent })


</script>


<template>
  <RouterLink :to="{ name: `Event Details`, params: { eventId: towerEvent.id } }">
    <div class="card mb-3">
      <div class="row g-0">
        <div class="col-4">
          <img class="img-fluid rounded-start" :src="towerEvent.coverImg" :alt="`${towerEvent.creator.name}'s event`">
        </div>
        <div class="col-8">
          <div class="card-body">
            <p class="card-title fs-5">{{ towerEvent.name }}</p>
            <hr>
            <div class="d-flex flex-column justify-content-between">
              <p class="card-text">{{ towerEvent.description.length > 75 ? `${towerEvent.description.slice(0, 75)}...` :
                towerEvent.description }}</p>
              <p class="card-text">
                <small class="text-body-secondary">Event begins on {{ towerEvent.startDate.toLocaleDateString() }}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
div.card {
  height: 30vh;
}

img {
  height: 29.7vh;
  width: 25vw;
  object-fit: cover;
}
</style>