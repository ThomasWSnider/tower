<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import TowerEventCard from "../components/TowerEventCard.vue";
import ModalWrapper from "../components/ModalWrapper.vue";
import TowerEventForm from "../components/TowerEventForm.vue";

const eventFilter = ref('all')

const towerEvents = computed(() => {
  if (eventFilter.value == 'all') {
    return AppState.towerEvents
  }
  return AppState.towerEvents.filter((towerEvent) => towerEvent.type == eventFilter.value)
})

const eventTypes = ['all', 'concert', 'convention', 'sport', 'digital', 'theatre']

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
    <div class="row mt-5">

      <div class="col-12 mb-3">
        <div class="row justify-content-center mb-5">
          <div class="col-12">
            <h4 class="">How Tower Works</h4>
          </div>
          <div class="col-lg-4 col-md-6 my-3 me-lg-5">
            <div class="card px-2 pb-5">
              <div class="row">
                <div class="col-2 text-center card-body">
                  <i class="mdi mdi-magnify display-6"></i>
                </div>
                <div class="col-10">
                  <div class="card-body">
                    <p class="fs-5 my-2 fw-bold card-title">Discover Events</p>
                    <p class="card-text">Browse our wide selection of events to find the gathering you are looking for
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 my-3 ms-lg-5">
            <div class="card px-2">
              <div class="row">
                <div class="col-2 text-center card-body">
                  <i class="mdi mdi-plus display-6"></i>
                </div>
                <div class="col-10">
                  <div class="card-body pb-2">

                    <p class="fs-5 my-2 fw-bold card-title">Create Event</p>
                    <p class="card-text">
                      Create your own Tower Event and invite your friends or draw from a community of millions
                    </p>
                    <p data-bs-toggle="modal" data-bs-target="#modal-wrapper" class="fw-bold text-end event-button">
                      Create an Event
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12">
        <h4 class=" mb-4">Explore Top Categories</h4>
        <div class="row mb-5">
          <div v-for="eventType in eventTypes" :key="eventType" class="col-md-4 col-6 mb-2">

            <div @click="eventFilter = eventType" class="card event-filter-card">
              <div class="card-body">
                <p class="card-title fs-3 text-capitalize text-center">{{ eventType }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>


    <div class="row">
      <div class="col-12 mb-4">
        <h4>Upcoming Events</h4>
      </div>
      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-lg-4 col-sm-6">
        <TowerEventCard :towerEvent="towerEvent" />
      </div>
    </div>
  </section>
  <ModalWrapper>
    <TowerEventForm />
  </ModalWrapper>
</template>

<style scoped lang="scss">
.landing-img {
  height: var(--main-height);
  width: 100vw;
  object-fit: cover;
  object-position: 50% 25%;
}

.event-button {
  color: var(--bs-success);
  cursor: pointer;
  transition: color 0.2s;
}

.event-filter-card {
  cursor: pointer;
}

.event-button:hover {
  color: #076649 !important;
  text-decoration: underline;
}
</style>
