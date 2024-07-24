<script setup>
import { RouterLink } from "vue-router";
import { TowerEvent } from "../models/TowerEvent";


defineProps({ towerEvent: TowerEvent })


</script>


<template>
  <RouterLink :to="{ name: `Event Details`, params: { eventId: towerEvent.id } }">
    <div class="card bg-page mb-3">
      <img class="img-fluid card-img-top" :src="towerEvent.coverImg" :alt="`${towerEvent.creator.name}'s event`">
      <div class="card-body ps-0">
        <p class="card-title fs-5 m-0">{{ towerEvent.name }}</p>
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
  </RouterLink>
</template>


<style lang="scss" scoped>
img {
  width: 100%;
  height: 25vh;
  object-fit: cover;
  object-position: center;
}

div.card {
  height: 55vh;
  border: none;
}
</style>