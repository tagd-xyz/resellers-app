<template>
  <div class="q-pa-lg">
    <q-input
      outlined
      v-model="consumer"
      label="Consumer's email"
      hint="Type the consumer's email to see items available for resale"
      type="email"
      class="q-mb-lg"
      @change="onConsumerChange"
    />

    <access-request-banner :consumer="consumerAccessRequestLookup" />

    <div>
      <q-table
        flat
        bordered
        title="Available for resale"
        :loading="isLoading"
        :rows="list"
        :columns="columns"
        row-key="id"
        selection="single"
        v-model:selected="selected"
        :pagination="{
          sortBy: 'desc',
          descending: false,
          page: 1,
          rowsPerPage: 50,
        }"
      />

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            :loading="isPosting"
            :disabled="!isSubmitEnabled"
            @click="onSubmitClicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useItemsAvailableStore } from 'stores/itemsAvailable';
import { useTagdsStore } from 'src/stores/tagds';
import { date, useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import AccessRequestBanner from './components/AccessRequestBanner.vue';

const router = useRouter();

const selected = ref([]);

const consumer = ref('');
const consumerAccessRequestLookup = ref(null);

const $q = useQuasar();

const availableStore = useItemsAvailableStore();
const tagdsStore = useTagdsStore();

const list = computed(() => {
  return availableStore.list;
});

const isConsumerFilled = computed(() => {
  return consumer.value.trim().length > 3;
});

const isLoading = computed(() => {
  return availableStore.isFetching;
});

const isPosting = computed(() => {
  return tagdsStore.isPosting;
});

const isSubmitEnabled = computed(() => {
  return selected.value.length > 0;
});

function onConsumerChange() {
  if (isConsumerFilled.value) {
    consumerAccessRequestLookup.value = consumer.value;
    availableStore.fetch(consumer.value);
  } else {
    availableStore.clear();
    consumerAccessRequestLookup.value = null;
  }
}

function onSubmitClicked() {
  tagdsStore
    .add(selected.value[0].id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item posted for resale',
      });
      router.push({ name: 'items' });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}

onMounted(() => {
  availableStore.clear();
  // accessRequestsStore.fetch();
});

const columns = [
  {
    name: 'createdAt',
    required: true,
    label: 'Created at',
    align: 'left',
    field: (row) => row.createdAt,
    format: (val) => date.formatDate(val, 'MMMM Do, YYYY H:m:s'),
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'left',
    field: (row) => row.status,
    format: (val) => `${val.toUpperCase()}`,
    sortable: true,
  },
  {
    name: 'tagdSlug',
    required: true,
    label: 'Tag ID',
    align: 'left',
    field: (row) => row.slug,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'consumer',
    required: false,
    label: 'Consumer',
    align: 'left',
    field: (row) => row.consumer.name ?? row.consumer.email,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'retailer',
    required: false,
    label: 'Retailer',
    align: 'left',
    field: (row) => row.item.retailer,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'item',
    required: false,
    label: 'Item',
    align: 'left',
    field: (row) => row.item.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'type',
    required: false,
    label: 'Type',
    align: 'left',
    field: (row) => row.item.type,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'brand',
    required: false,
    label: 'Brand',
    align: 'left',
    field: (row) => row.item.properties.brand ?? '',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'model',
    required: false,
    label: 'Model',
    align: 'left',
    field: (row) => row.item.properties.model ?? '',
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'size',
    required: false,
    label: 'Size',
    align: 'left',
    field: (row) => row.item.properties.size ?? '',
    format: (val) => `${val}`,
    sortable: true,
  },
];
</script>
