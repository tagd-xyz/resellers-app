<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>Consumer details</template>
        <template v-slot:actions>
          <b-button size="sm" variant="outline" @click="cancelClicked">
            Back
          </b-button>
        </template>
      </page-heading>
      <hr />
      <p>Id: {{ consumer.id }}</p>
      <p>Email: {{ consumer.email }}</p>
      <hr />
      <tagds-table v-if="!isBusy" :tagds="consumer.tagds" :allowResale="true" />
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ConsumersIdPage',
  layout: 'retailers',
  middleware: 'auth',

  async asyncData({ params }) {
    // eslint-disable-line require-await
    const id = params.id;
    return { id };
  },
  data() {
    return {
      isBusy: true,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Consumers',
          href: '/consumers',
        },
        {
          text: 'Details',
          active: true,
        },
      ],
    };
  },
  computed: {
    consumer() {
      return this.$store.state.consumer.data;
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    this.fetch(this.id).then((res) => {
      this.isBusy = false;
    });
  },
  methods: {
    cancelClicked() {
      this.$router.push({ path: '/consumers' });
    },
    ...mapActions({
      fetch: 'consumer/fetchById',
    }),
  },
};
</script>
