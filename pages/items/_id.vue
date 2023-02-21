<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>Item details</template>
        <template v-slot:actions>
          <b-button size="sm" variant="outline" @click="cancelClicked">
            Back
          </b-button>
        </template>
      </page-heading>
      <hr />
      <items-details
        :is-busy="isBusy"
        :item="item"
        :allow-expire="true"
        :allow-transfer="true"
      />
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ItemsIdPage',
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
      isSettingAsActive: false,
      path: [
        {
          text: 'Home',
          href: '/',
        },
        {
          text: 'Items',
          href: '/items',
        },
        {
          text: 'Details',
          active: true,
        },
      ],
    };
  },
  computed: {
    item() {
      return this.$store.state.item.data;
    },
    rootTagd() {
      return this.item.tagds?.filter((tagd) => tagd.isRoot)[0] || null;
    },
  },
  mounted() {
    // eslint-disable-next-line no-unused-vars
    this.fetch(this.id).then((res) => {
      this.isBusy = false;
    });
  },
  methods: {
    activeClicked() {
      this.isSettingAsActive = true;
      // eslint-disable-next-line no-unused-vars
      this.setAsActive(this.rootTagd?.id).then((res) => {
        // eslint-disable-next-line no-unused-vars
        this.fetch(this.id).then((res) => {
          this.isSettingAsActive = false;
        });
      });
    },
    cancelClicked() {
      this.$router.push({ path: '/items' });
    },
    ...mapActions({
      fetch: 'item/fetchById',
      setAsActive: 'item/setAsActive',
    }),
  },
};
</script>
