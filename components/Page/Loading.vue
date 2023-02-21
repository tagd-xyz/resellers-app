<template>
  <div v-if="isBusy">
    <b-spinner small></b-spinner>
    loading ...
  </div>
</template>

<script>
export default {
  props: ['isBusy'],
};
</script>

<style></style>
