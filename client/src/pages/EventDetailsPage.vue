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
    <div v-if="towerEvent" class="row justify-content-between">
      <div class="col-12 text-center my-5 cover-img-bg rounded px-0">
        <div class="blur-filter rounded-2">
          <img class="img-fluid event-cover-img" :src="towerEvent.coverImg" :alt="`${towerEvent.coverImg}`">
        </div>
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
              <button class="btn btn-info">Attend</button>
            </div>
          </div>
          <div class="col-12 text-center mb-5 mt-2">
            <p class="text-subtle">0 tickets left, sorry!</p>
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
</style>