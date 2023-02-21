<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>All consumers</template>
        <template v-slot:actions></template>
      </page-heading>
      <hr />
      <consumers-table
        :isBusy="isBusy"
        :items="consumers"
        @itemClicked="consumerClicked"
      />
    </b-container>
  </div>
</template>

<script>
import {
  // mapMutations,
  mapActions,
} from 'vuex';

// import page from '@/layout/SimplePage';

export default {
  name: 'ConsumersIndexPage',
  layout: 'default',
  middleware: 'auth',
  // components: { page },

  data() {
    return {
      isBusy: false,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Consumers',
          href: '/consumers',
          active: true,
        },
      ],
    };
  },
  computed: {
    consumers() {
      return this.$store.state.consumers.data;
    },
    actor() {
      return this.$store.state.actor;
    },
  },
  watch: {
    // eslint-disable-next-line no-unused-vars
    actor(after, before) {
      if (after) {
        this.isBusy = true;
        this.fetch().then(() => {
          this.isBusy = false;
        });
      }
    },
  },
  methods: {
    // eslint-disable-next-line no-unused-vars
    consumerClicked(item, index) {
      this.$router.push({ path: '/consumers/' + item.id });
    },
    ...mapActions({
      fetch: 'consumers/fetch',
    }),
  },
};
</script>
