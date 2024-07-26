<script setup>
import { RouterLink } from "vue-router";
import { TowerEvent } from "../models/TowerEvent";


defineProps({ towerEvent: TowerEvent })


</script>


<template>
  <RouterLink :to="{ name: `Event Details`, params: { eventId: towerEvent.id } }">
    <div class="card bg-page mb-md-3 mb-2">
      <div class="position-relative">
        <img class="img-fluid rounded" :src="towerEvent.coverImg" :alt="`${towerEvent.creator.name}'s event`">
        <div v-if="towerEvent.isCanceled" class="canceled-tag position-absolute end-0 bottom-0">
          <p class="px-5 fs-2 fw-semibold m-0">Canceled</p>
        </div>
        <div v-else-if="towerEvent.ticketsRemaining <= 0" class="ps-1 sold-out-tag position-absolute end-0 bottom-0">
          <p class="px-5 fs-2 fw-semibold m-0">Sold Out</p>
        </div>
      </div>
      <div class="card-body ps-0 d-flex flex-column justify-content-between align-items-between">
        <p class="card-title fs-5 m-0">{{ towerEvent.name }}</p>
        <div class="d-flex flex-column justify-content-between align-items-between">
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
  height: 50vh;
  border: none;
}

.canceled-tag {
  border-top-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-color: #d6293db4;
  backdrop-filter: blur(10px);
  color: var(--bs-text);
}

.sold-out-tag {
  border-top-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-color: #29a5d6b4;
  backdrop-filter: blur(25px);
  color: var(--bs-text);
}
</style>