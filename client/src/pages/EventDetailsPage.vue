<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { ticketsService } from "../services/TicketsService";
import ModalWrapper from "../components/ModalWrapper.vue";
import EventAttendeeCard from "../components/EventAttendeeCard.vue";
import CommentForm from "../components/CommentForm.vue";
import CommentCard from "../components/CommentCard.vue";
import { commentsService } from "../services/CommentsService";

const account = computed(() => AppState.account)
const towerEvent = computed(() => AppState.activeTowerEvent)
const attendees = computed(() => AppState.eventAttendees)
const eventComments = computed(() => AppState.eventComments)
const route = useRoute()

onMounted(() => {
  getTowerEventById()
  getEventAttendees()
  getEventComments()
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

async function getEventComments() {
  try {
    await commentsService.getEventComments(route.params.eventId)
  } catch (error) {
    Pop.toast(`Could not retrieve comments for ${towerEvent.value.name}`, 'error')
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
          <div v-if="towerEvent.isCanceled" class="canceled-tag position-absolute end-0 bottom-0">
            <p class="px-5 fs-2 fw-semibold m-0">Canceled</p>
          </div>
          <div v-else-if="towerEvent.ticketsRemaining <= 0" class=" ps-1 sold-out-tag position-absolute end-0 bottom-0">
            <p class="px-5 fs-2 fw-semibold m-0">Sold Out</p>
          </div>
        </div>
      </div>

      <div class="col-8">
        <div class="row">
          <div class="col-6 mb-3">
            <div class="d-flex text-capitalize align-items-center">
              <h2 class="me-3">{{ towerEvent.name }}</h2>
              <small class="bg-success-subtle border border-solid rounded-pill px-2 py-1">
                {{ towerEvent.type }}
              </small>
            </div>
          </div>
          <div class="col-6 d-flex justify-content-end">
            <div v-if="account?.id == towerEvent.creatorId" class="mt-2 text-end">
              <button class="btn edit-event-btn fs-4 py-0 px-2" data-bs-toggle="dropdown">
                <i class="mdi mdi-dots-horizontal"></i>
              </button>
              <ul class="dropdown-menu">
                <li>
                  <p @click="cancelTowerEvent()" class="dropdown-item selectable fw-semibold m-0 text-center">
                    <span v-if="!towerEvent.isCanceled" class="text-danger">Cancel Event</span>
                    <span v-else class="text-success">Reopen Event</span>
                  </p>
                </li>
              </ul>
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
        <div class="col-12 mt-5 mb-2">
          <h4>See what others are saying...</h4>
          <div class="row justify-content-center">
            <div class="col-12">
              <p class="fs-6 fw-bold text-end text-success">Join the conversation</p>

              <CommentForm />

            </div>
            <div class="col-10 justify-content-center">
              <div class="text-center">

              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="row justify-content-center">
            <div v-for="comment in eventComments" :key="comment.id" class="col-10">
              <CommentCard :comment="comment" :account="account" />
            </div>
          </div>
        </div>
      </div>

      <div class="col-3 mt-5">
        <div class="row justify-content-center">
          <div class="col-12 text-center mt-3">
            <p class="fs-4">Interested in going?</p>
            <p v-if="account">Get a ticket now!</p>
            <p v-else>Set up account to get tickets!</p>
          </div>
          <div class="col-lg-6 col-md-8 col-10 mb-2">
            <div class="d-grid">
              <button v-if="account" :disabled="towerEvent.ticketsRemaining <= 0 || towerEvent.isCanceled"
                @click="createTicket()" class="btn btn-info">Attend</button>
            </div>
          </div>
          <div class="col-12 text-center mb-5 mt-2">
            <p v-if="!towerEvent.isCanceled" class="text-subtle">{{ towerEvent.ticketsRemaining }} tickets left!</p>
            <p v-else>This event has been canceled</p>
            <small>
              You <span>{{ towerEvent.isCanceled ? `had` : `have` }}</span> {{ attendees.filter((attendee) =>
                attendee.accountId == account?.id).length }}
              tickets to this event
            </small>
          </div>
          <div class="col-12">
            <div>
              <h3>Attendees</h3>
            </div>
            <hr>
            <div class="row">
              <div v-for="attendee in attendees.slice(0, 20)" :key="attendee.id" class="col-3 text-center px-0 mb-1">
                <img class="img-fluid attendee-card" :src="attendee.profile.picture" :alt="attendee.profile.name"
                  :title="attendee.profile.name">
              </div>
              <div class="col-12 text-end">
                <small class="selectable text-subtle" role="button" data-bs-toggle="modal"
                  data-bs-target="#modal-wrapper">And {{ attendees.length - 20
                  }} more...</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <ModalWrapper>
    <div class="container">
      <div class="row">
        <div v-for="attendee in attendees" :key="attendee.id" class="col-lg-4 col-12 col-md-6 mb-3">
          <EventAttendeeCard :attendee="attendee" />
        </div>
      </div>
    </div>
  </ModalWrapper> />
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

.sold-out-tag {
  border-top-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
  background-color: #29a5d6b4;
  backdrop-filter: blur(25px);
  color: var(--bs-text);
}

.attendee-card {
  height: 8vh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>