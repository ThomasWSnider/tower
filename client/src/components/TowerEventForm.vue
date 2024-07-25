<script setup>
import { ref } from "vue";
import Pop from "../utils/Pop";
import { towerEventsService } from "../services/TowerEventsService";
import { Modal } from "bootstrap";
import { useRouter } from "vue-router";

const router = useRouter()
const editableTowerEventData = ref({
  name: '',
  location: '',
  coverImg: '',
  capacity: '',
  type: '',
  startDate: '',
  description: ''
})

async function createTowerEvent() {
  try {
    const newTowerEvent = await towerEventsService.createTowerEvent(editableTowerEventData.value)
    Pop.success(`Created new Event`)
    resetForm()
    Modal.getOrCreateInstance(`#modal-wrapper`).hide()
    router.push({ name: 'Event Details', params: { eventId: `${newTowerEvent.id}` } })
  } catch (error) {
    Pop.toast(`Could not create new Tower event`, 'error');
  }
}

function resetForm() {
  editableTowerEventData.value = {
    name: '',
    location: '',
    coverImg: '',
    capacity: '',
    type: '',
    startDate: '',
    description: ''
  }
}
</script>


<template>
  <form @submit.prevent="createTowerEvent()" class="container-fluid">
    <div class="row align-items-start">
      <label class="form-label">Image Preview</label>
      <div class="col d-flex d-lg-block justify-content-center">
        <div v-if="!editableTowerEventData.coverImg"
          class="bg-subtle rounded img-preview d-flex justify-content-center align-items-center">
          <i class="mdi mdi-image display-1"></i>
        </div>
        <div v-else>
          <img class="rounded" :src="editableTowerEventData.coverImg" :alt="`${editableTowerEventData.coverImg}`">
        </div>
        <!-- <div class="row d-lg-none">
          <div class="col-12">
            <div class="mb-3 mt-3">
              <label for="description" class="form-label">Event Description</label>
              <textarea v-model="editableTowerEventData.description" class="form-control" id="description" rows="3"
                placeholder="Description" minlength="15" maxlength="1000" required></textarea>
            </div>
          </div>
        </div> -->
      </div>
      <div class="col-lg-7 col-12 mt-lg-0 mt-3">

        <div class="row">
          <div class="col-6 mb-3">
            <label for="name" class="form-label">Event Name</label>
            <input v-model="editableTowerEventData.name" type="text" class="form-control" id="name" placeholder="Name"
              minlength="3" maxlength="50" required>
          </div>

          <div class=" col-6 mb-3">
            <label for="location" class="form-label">Event Location</label>
            <input v-model="editableTowerEventData.location" type="text" class="form-control" id="location"
              placeholder="Location" minlength="1" maxlength="500" required>
          </div>

          <div class=" col-6 mb-3">
            <label for="coverImg" class="form-label">Event Image URL</label>
            <input v-model="editableTowerEventData.coverImg" type="text" class="form-control" id="coverImg"
              placeholder="URL" maxlength="1000" required>
          </div>

          <div class=" col-6 mb-3">
            <label for="capacity" class="form-label">Capacity</label>
            <input v-model="editableTowerEventData.capacity" type="text" class="form-control" id="capacity"
              placeholder="1-100000" min="1" max="100000" required>
          </div>

          <div class="col-6">
            <label for="type" class="form-label">Event Type</label>
            <select v-model="editableTowerEventData.type" class="form-select" id="type"
              aria-label="Default select example" required>
              <option value="" disabled>Select Event Type</option>
              <option value="concert">Concert</option>
              <option value="convention">Convention</option>
              <option value="sport">Sport</option>
              <option value="digital">Digital</option>
              <option value="theatre">Theatre</option>
            </select>
          </div>

          <div class="col-6">
            <label for="startDate" class="form-label">Start Date</label>
            <input v-model="editableTowerEventData.startDate" type="date" class="form-control" name="date"
              id="startDate" required max="2049-12-31" min="2024-01-01">
          </div>

        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="mb-3 mt-3">
          <label for="description" class="form-label">Event Description</label>
          <textarea v-model="editableTowerEventData.description" class="form-control" id="description" rows="3"
            placeholder="Description" minlength="15" maxlength="1000" required></textarea>
        </div>
      </div>
    </div>
    <div class="modal-footer mt-3">
      <button type="submit" class="btn btn-primary">Submit Event</button>
    </div>

  </form>
</template>


<style lang="scss" scoped>
.img-preview {
  height: 45vh;
  width: 45vh;
  border: 2px dashed var(--gray-accent);
  color: var(--gray-accent);
  background-color: var(--bs-page);
}

img {
  height: 45vh;
  width: 45vh;
  object-fit: cover;
  object-position: center;
}
</style>