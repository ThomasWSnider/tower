<script setup>
import { ref } from "vue";
import Pop from "../utils/Pop";
import { commentsService } from "../services/CommentsService";
import { useRoute } from "vue-router";

const route = useRoute()

const editableCommentData = ref({
  body: '',
  eventId: route.params.eventId
})

async function createComment() {
  try {
    await commentsService.createComment(editableCommentData.value)
    resetForm()
  } catch (error) {
    Pop.toast('Could not create comment', 'error');
  }
}

function resetForm() {
  editableCommentData.value = {
    body: '',
    eventId: route.params.eventId
  }
}
</script>


<template>
  <form @submit="createComment()" class="mb-3">
    <div class="form-floating mb-2">
      <textarea v-model="editableCommentData.body" class="form-control" style="resize: none;"
        placeholder="Leave a comment here..." id="comment" minlength="1" maxlength="500" required></textarea>
      <label for="comment">Leave a comment here</label>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-success">Post Comment</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>