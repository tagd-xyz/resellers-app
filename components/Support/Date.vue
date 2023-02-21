<template>
  <span> {{ nice }} </span>
</template>

<script>
export default {
  props: {
    date: String,
  },
  computed: {
    nice() {
      return new Date(this.date).toLocaleString(['en-US'], {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    },
  },
};
</script>
