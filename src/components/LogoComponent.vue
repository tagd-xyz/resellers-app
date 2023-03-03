<template>
  <span>
    <img
      v-if="variant == 'dark'"
      class="tagd-logo"
      src="~/assets/logo-white.png"
    />
    <img
      v-if="variant == 'light'"
      class="tagd-logo"
      src="~/assets/logo-black.png"
    />
  </span>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  variant: {
    type: String,
    default: 'light',
  },
});
</script>

<style scoped>
.tagd-logo {
  height: 16px;
}
</style>
