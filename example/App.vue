<script setup lang="ts">
import DynComponent from "../src";
</script>

<template>
  <main class="dyn-container">
    <DynComponent>
      <i-svg-inline-foo />
    </DynComponent>
    <DynComponent class="icon">
      <i-svg-inline-foo />
    </DynComponent>
    <DynComponent class="icon" color="red">
      <i-svg-inline-foo />
    </DynComponent>
    
    1234
  </main>
</template>

<style lang="scss" scoped>
.dyn-container {
  color: #000;

  .icon {
    color: purple;
  }
}
</style>
