<script setup>

</script>


<template>
  <form class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="bg-subtle rounded img-preview d-flex justify-content-center align-items-center">
          <i class="mdi mdi-image display-1"></i>
        </div>
      </div>
      <div class="col-lg-7 col-4">
        <div class="row">
          <div class="col-6 mb-3">
            <label for="formGroupExampleInput" class="form-label">Example label</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
          <div class=" col-6 mb-3">
            <label for="formGroupExampleInput" class="form-label">Example label</label>
            <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input placeholder">
          </div>
        </div>
      </div>
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
</style>