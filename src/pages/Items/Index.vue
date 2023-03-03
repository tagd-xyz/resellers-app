<template>
  <q-table
    class="q-pa-lg"
    :loading="isLoading"
    :rows="list"
    :columns="columns"
    row-key="name"
    @row-click="onRowClicked"
    :pagination="{
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 50,
    }"
  />
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { date } from 'quasar';
import { useItemsStore } from 'stores/items';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useItemsStore();

const isLoading = computed(() => {
  return store.isLoading;
});

const list = computed(() => {
  return store.list;
});

function onRowClicked(evt, row) {
  router.push({ name: 'items', id: row.id });
  router.push({
    name: 'itemsShow',
    params: {
      id: row.id,
    },
  });
  // console.log(row.id);
}

onMounted(() => {
  store.fetchAll();
});

const columns = [
  {
    name: 'retailer',
    required: true,
    label: 'Retailer',
    align: 'left',
    field: (row) => row.retailer,
    format: (val) => `${val}`,
    sortable: true,
  },
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
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'brand',
    required: false,
    label: 'Brand',
    align: 'left',
    field: (row) => row.properties.brand,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'model',
    required: false,
    label: 'Model',
    align: 'left',
    field: (row) => row.properties.model,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Description',
    align: 'left',
    field: (row) => row.description.substring(0, 50),
    format: (val) => `${val}...`,
    sortable: true,
  },
];
</script>
