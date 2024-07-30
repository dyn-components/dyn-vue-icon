<script lang="tsx" setup>
import "./styles/index.scss";

defineProps({
  color: String,
});
</script>

<template>
  <i class="dyn-component--vue dyn-icon" :style="{ color }">
    <slot></slot>
  </i>
</template>

<style lang="scss" scoped></style>
