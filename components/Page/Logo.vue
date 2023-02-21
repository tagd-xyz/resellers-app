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

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'light',
    },
  },
};
</script>

<style>
.tagd-logo {
  height: 24px;
}
</style>
