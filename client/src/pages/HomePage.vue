<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import TowerEventCard from "../components/TowerEventCard.vue";
import ModalWrapper from "../components/ModalWrapper.vue";
import TowerEventForm from "../components/TowerEventForm.vue";

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
    <div class="row mt-5">

      <div class="col-12 mb-3">
        <div class="row justify-content-around mb-5">
          <div class="col-12">
            <h4 class="">How Tower Works</h4>
          </div>
          <div class="col-md-4 my-3">
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
          <div class="col-md-4 my-3">
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
                      Create an Event</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-for="towerEvent in towerEvents" :key="towerEvent.id" class="col-lg-4">
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

.event-button:hover {
  color: #076649 !important;
  text-decoration: underline;
}
</style>
