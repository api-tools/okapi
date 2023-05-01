<template>
  <div class="flex-items-center button-dropdown">
      <div>Collections</div>
      <div class="marl05 flex-items-center">
          <img src="@/assets/images/ico-dropdown.svg" alt="dropdown" class="ico">
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.button-dropdown {
    background-color: var(--col-light-one);
    border: 1px solid var(--col-light);
    border-radius: 0.2rem;
    padding: 0.2rem;
}

.x {
    background-color: var(--col-light-one);
    color: var(--col-txt-gray);
    border: 1px solid var(--col-light);
    cursor: pointer;
    font-size: inherit;
    padding: 0.5rem;
}
</style>
