<script setup>
import { Comment } from "../models/Comment";

defineProps({ comment: Comment })
</script>


<template>


  <div class="card mb-3  position-relative">
    <div class="row g-0 justify-content-between">
      <i class="mdi mdi-dots-horizontal position-absolute top-0 end-0"></i>
      <div class="col-2">
        <img :src="comment.creator.picture" class="img-fluid rounded-start" :alt="comment.creator.picture">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <p class="card-text">
            {{ comment.body }}
          </p>
          <p class="card-text"><small class="text-body-secondary">Commented on {{ comment.createdAt }}</small></p>
        </div>
      </div>
    </div>
  </div>

</template>


<style lang="scss" scoped></style>