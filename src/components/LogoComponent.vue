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
import { computed } from 'vue';
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  variant: {
    type: String,
    default: 'light',
  },
  height: {
    type: String,
    default: '16px',
  },
});

const logoHeight = computed(() => {
  return props.height;
});
</script>

<style scoped>
.tagd-logo {
  height: v-bind(logoHeight);
}
</style>
