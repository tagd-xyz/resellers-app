<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>{{ actorName }} items</template>
        <template v-slot:actions>
          <b-button size="sm" @click="addNewClicked"> Add new </b-button>
        </template>
      </page-heading>
      <hr />
      <items-table :isBusy="isBusy" :items="items" @itemClicked="itemClicked" />
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ItemsIndexPage',
  layout: 'default',
  middleware: 'auth',

  data() {
    return {
      isBusy: false,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Items',
          href: '/items',
          active: true,
        },
      ],
    };
  },
  computed: {
    items() {
      return this.$store.state.items.data;
    },
    actor() {
      return this.$store.state.actor;
    },
    actorName() {
      const actors = this.$store.state.me?.actors ?? [];
      const o = actors.find((a) => a.id == this.actor);

      return o?.name ?? '';
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
    itemClicked(item, index) {
      this.$router.push({ path: '/items/' + item.id });
    },
    addNewClicked() {
      this.$router.push({ path: '/items/add' });
    },
    ...mapActions({
      fetch: 'items/fetch',
    }),
  },
};
</script>
