<template>
  <div>
    <div v-if="tagd?.isExpired">
      <b-badge variant="secondary"> Expired </b-badge>
    </div>
    <div v-else-if="tagd?.isTransferred">
      <b-badge variant="success"> Transferred </b-badge>
    </div>
    <div v-else-if="tagd?.isActive ?? null">
      <b-badge variant="primary"> Active </b-badge>
      <!-- <br>
        <small>
        since {{ tagd.activatedAt ?? null | formatDate }}
        </small> -->
    </div>
    <div v-else-if="tagd">
      <b-badge variant="danger"> Inactive </b-badge>
    </div>
    <div v-else>Unknown</div>
  </div>
</template>

<script>
export default {
  name: 'StatusBadge',

  props: ['tagd'],
};
</script>

<style></style>
