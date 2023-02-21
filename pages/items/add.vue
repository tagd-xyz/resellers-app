<template>
  <div>
    <b-breadcrumb :items="path"></b-breadcrumb>
    <b-container>
      <page-heading>
        <template v-slot:title>Add new item</template>
        <template v-slot:actions>
          <b-button size="sm" variant="outline" @click="cancelClicked">
            Cancel
          </b-button>
        </template>
      </page-heading>
      <hr />
      <items-add @update="formUpdated" />
      <hr />
      <b-row>
        <b-col class="text-right">
          <b-button variant="outline" :disabled="isBusy" @click="cancelClicked">
            <span>Back</span>
          </b-button>
          <b-button
            variant="primary"
            :disabled="isBusy || !submitEnabled"
            @click="submitClicked"
          >
            <b-spinner v-if="isBusy" small></b-spinner>
            <span v-if="isBusy">Loading...</span>
            <span v-else>Submit</span>
          </b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {
  // mapMutations,
  mapActions,
} from 'vuex';

export default {
  name: 'ItemsAddPage',
  layout: 'default',
  middleware: 'auth',

  data() {
    return {
      isBusy: false,
      form: {},
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
          text: 'Add',
          href: '/add',
          active: true,
        },
      ],
    };
  },
  computed: {
    types() {
      return [
        { value: 'Fashion', text: 'Fashion' },
        { value: 'Sneakers', text: 'Sneakers' },
      ];
    },
    payload() {
      return {
        name: this.form.name ?? '',
        description: this.form.desc ?? '',
        type: this.form.type ?? '',
        consumerId: this.form.consumer ?? '',
        transaction: this.form.transaction ?? '',
        properties: {
          brand: this.form.brand ?? '',
          model: this.form.model ?? '',
          size: this.form.size ?? '',
        },
      };
    },
    submitEnabled() {
      return (
        this.form.consumer &&
        this.form.transaction &&
        this.form.name &&
        this.form.type
      );
    },
  },
  methods: {
    formUpdated(form) {
      this.form = form;
    },
    cancelClicked() {
      this.$router.push({ path: '/items/' });
    },
    submitClicked() {
      this.isBusy = true;
      this.add(this.payload)
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          this.$router.push({ path: '/retailersDemo/items' });
        })
        .finally(() => {
          this.isBusy = false;
        });
    },
    ...mapActions({
      add: 'items/add',
    }),
  },
};
</script>
