<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { Identity } from "@bcwdev/auth0provider-client";
import { ticketsService } from "../services/TicketsService";

const account = computed(() => AppState.account)
const towerEvent = computed(() => AppState.activeTowerEvent)
const route = useRoute()
const ticketsRemaining = computed(() => towerEvent.value.capacity - towerEvent.value.ticketCount)

onMounted(() => {
  getTowerEventById()
  getEventAttendees()
})

async function getTowerEventById() {
  try {
    const towerEventId = route.params.eventId
    await towerEventsService.getTowerEventById(towerEventId)
  } catch (error) {
    Pop.error(error);
  }
}

async function getEventAttendees() {
  try {
    await ticketsService.getEventAttendees(route.params.eventId)
  } catch (error) {
    Pop.error(error);
  }
}

async function cancelTowerEvent() {
  try {
    const confirm = await Pop.confirm(`Are you sure you want to cancel ${towerEvent.value.name}?`, `You may uncancel at any time, but there attendees may not get the news.`, `Yes, I'm sure`)
    if (!confirm) {
      if (!towerEvent.value.isCanceled) {
        Pop.toast(`${towerEvent.value.name} is still on!`, `info`)
      } else {
        Pop.toast(`${towerEvent.value.name} is still canceled!`, 'info')
      }
      return
    }
    const towerEventId = route.params.eventId
    towerEventsService.cancelTowerEvent(towerEventId)
    if (!towerEvent.value.isCanceled) {
      Pop.success(`${towerEvent.value.name} was successfully canceled`)
    } else {
      Pop.success(`${towerEvent.value.name} is back on!`)
    }
  } catch (error) {
    Pop.error(error);
  }
}

async function createTicket() {
  try {
    const eventData = { eventId: route.params.eventId }
    await ticketsService.createTicket(eventData)
  } catch (error) {
    Pop.error(error);
  }
}
</script>


<template>
  <section class="container mt-5">
    <div v-if="towerEvent" class="row justify-content-between">
      <div class="col-12 text-center my-5 cover-img-bg rounded px-0">
        <div class="blur-filter rounded-2 position-relative">
          <img class="img-fluid event-cover-img" :src="towerEvent.coverImg" :alt="`${towerEvent.coverImg}`">
          <div class="canceled-tag position-absolute end-0 bottom-0">
            <p v-if="towerEvent.isCanceled" class="px-5 fs-2 fw-semibold m-0">Canceled</p>
          </div>
        </div>
      </div>

      <div class="col-8">
        <div class="row">
          <div v-if="account?.id == towerEvent.creatorId" class="col-12 mt-2 text-end">
            <button class="btn edit-event-btn fs-4 py-0 px-2" data-bs-toggle="dropdown">
              <i class="mdi mdi-dots-horizontal"></i>
            </button>
            <ul class="dropdown-menu">
              <li>
                <p @click="cancelTowerEvent()" class="dropdown-item selectable fw-semibold m-0 text-center">
                  <span v-if="!towerEvent.isCanceled" class=" text-danger">Cancel Event</span>
                  <span v-else class="text-success">Reopen Event</span>
                </p>
              </li>
            </ul>
          </div>
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
          <div class="col-12 mb-3">
            <h5>Date and Time</h5>
            <hr>
            <p><i class="mdi mdi-calendar"></i> Begins {{ towerEvent.startDate.toLocaleString() }}</p>
          </div>
          <div class="col-12 mb-5">
            <h5>Location</h5>
            <hr>
            <p><i class="mdi mdi-map-marker-alert-outline"></i> {{ towerEvent.location }}</p>
          </div>
        </div>
        <!-- TODO Add Form functionality -->
        <div class="col-12 mt-5 mb-2">
          <h4>See what others are saying...</h4>
          <div class="row justify-content-center">
            <div class="col-12">
              <p class="fs-6 fw-bold text-end text-success">Join the conversation</p>
              <form class="mb-3">
                <div class="form-floating mb-2">
                  <textarea class="form-control" style="resize: none;" placeholder="Leave a comment here..."
                    id="comment"></textarea>
                  <label for="comment">Leave a comment here</label>
                </div>
                <div class="text-end">
                  <button type="button" class="btn btn-success">Post Comment</button>
                </div>
              </form>
            </div>
            <div class="col-10 justify-content-center">
              <div class="text-center">
                **Comment Cards Here**
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 mt-5">
        <div class="row justify-content-center">
          <div class="col-12 text-center mt-3">
            <p class="fs-4">Interested in going?</p>
            <p>Get a ticket now!</p>
          </div>
          <div class="col-6 mb-2">
            <div class="d-grid">
              <button :disabled="ticketsRemaining <= 0 || towerEvent.isCanceled" @click="createTicket()"
                class="btn btn-info">Attend</button>
            </div>
          </div>
          <div class="col-12 text-center mb-5 mt-2">
            <p class="text-subtle">{{ ticketsRemaining }} tickets left!</p>
          </div>
          <div class="col-12">
            <div>
              <h3>Attendees</h3>
            </div>
            <hr>
            <div class="row">
              <div class="col-12">
                **ProfileCards Here**
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>


<style lang="scss" scoped>
.event-cover-img {
  object-fit: cover;
  object-fit: center;
  width: 60%;
  height: 50vh;
}

.cover-img-bg {
  background-image: v-bind('towerEvent?.backgroundImg');
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 50vh;
}

.blur-filter {
  backdrop-filter: blur(10px);
}

.edit-event-btn {
  background-color: var(--bs-page);
  border: none;
}

.edit-event-btn:hover {
  background-color: #a8a8a856;
  border: none;
}

.dropdown-item:active {
  background-color: #7e7d7d56;
}

.canceled-tag {
  border-top-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-color: #d6293db4;
  backdrop-filter: blur(25px);
  color: var(--bs-text);
}
</style>