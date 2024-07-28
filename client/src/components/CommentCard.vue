<script setup>
import { Account } from "../models/Account";
import { Comment } from "../models/Comment";
import { commentsService } from "../services/CommentsService";
import Pop from "../utils/Pop";

defineProps({ comment: Comment, account: Account })

async function destroyComment(commentId) {
  try {
    const confirm = await Pop.confirm('Are you sure you want to delete your comment?')
    if (!confirm) return
    await commentsService.destroyComment(commentId)
    Pop.success('Comment Deleted')
  }
  catch (error) {
    Pop.error('Could not delete comment');
  }
}
</script>


<template>


  <div class="card mb-3 position-relative">
    <div v-if="account?.id == comment.creatorId" @click="destroyComment(comment.id)"
      class="position-absolute comment-options" data-bs-toggle="dropdown" role="button">
      <i class="mdi mdi-dots-vertical selectable rounded-5"></i>
      <ul class="dropdown-menu">
        <li class="text-center">
          <p class="dropdown-item fw-semibold mb-0 selectable">
            <span class="text-danger">Delete Comment</span>
          </p>
        </li>
      </ul>
    </div>
    <div class="row g-0 justify-content-between">
      <div class="col-2">
        <img :src="comment.creator.picture" class="img-fluid comment-card-img" :alt="comment.creator.picture">
      </div>
      <div class="col-10 d-flex align-items-center">
        <p class="fs-5 ms-3 mb-0 text-capitalize d-flex">
          {{ comment.creator.name }}
        </p>
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


<style lang="scss" scoped>
.comment-options {
  top: 2px;
  right: 5px;
}

.dropdown-item:active {
  background-color: #7e7d7d56;
}

.comment-card-img {
  border-bottom-right-radius: 25%;
  border-top-left-radius: 0.375rem;
}
</style>