<script setup>

</script>


<template>
  <div class="modal fade" id="modal-wrapper" aria-labelledby="modal-wrapperLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-fullscreen-sm-down">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="modal-wrapperLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped></style>