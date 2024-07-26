<script setup>
import { EventAttendee } from "../models/Ticket";

defineProps({ attendee: EventAttendee })
</script>


<template>
  <div class="row align-items-center justify-content-center">
    <div class="col-3 p-0">
      <img class="img-fluid rounded-4" :src="attendee.profile.picture" :alt="attendee.profile.name">
    </div>
    <div class="col-9">
      <p class="mb-0 text-capitalize fw-semibold fs-4 text-center">{{ attendee.profile.name }}</p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 10vh;
  width: 10vh;
}
</style>