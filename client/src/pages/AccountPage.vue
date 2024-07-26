<script setup>
import { computed, onMounted, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import TowerEventCard from "../components/TowerEventCard.vue";
import { ticketsService } from "../services/TicketsService.js";
import Pop from "../utils/Pop.js";

const account = computed(() => AppState.account)
const accountTickets = computed(() => AppState.accountTickets)

watchEffect(() => {
  getAccountTickets()
})

async function getAccountTickets() {
  try {
    await ticketsService.getAccountTickets()
  } catch (error) {
    Pop.error(error);
  }
}
</script>

<template>
  <div class="about text-center">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>
      <section class="container">
        <div class="row">
          <div v-for="ticket in accountTickets" :key="ticket.id" class="col-6">
            <TowerEventCard :towerEvent="ticket.event" />
          </div>
        </div>
      </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>

</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
