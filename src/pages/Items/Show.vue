<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Item {{ route.params.id }}
      <q-spinner v-if="isLoading" color="black" />
    </p>
    <div class="row q-col-gutter-lg">
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ item?.name }}
            </div>
            <div class="text-subtitle2">
              sold by {{ item?.retailer ?? 'Unknown' }}
            </div>
            <q-separator class="q-my-md" />
            <div class="text">{{ item?.description }}</div>
          </q-card-section>
        </q-card>

        <q-card>
          <q-card-section>
            <div class="text-h6">Properties</div>
            <div><strong>Type:</strong> {{ item?.type ?? 'Unknown' }}</div>
            <div>
              <strong>Brand:</strong> {{ item?.properties.brand ?? 'Unknown' }}
            </div>
            <div>
              <strong>Model:</strong> {{ item?.properties.model ?? 'Unknown' }}
            </div>
            <div>
              <strong>Size:</strong> {{ item?.properties.size ?? 'Unknown' }}
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card>
          <q-card-section>
            <div class="text-h6">Transaction ID</div>
            <div class="text-subtitle2">sold to consumer A</div>
            <div class="text-subtitle2">
              on {{ date.formatDate(item?.createdAt, 'MMMM Do, YYYY H:m:s') }}
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-table
      class="q-my-lg"
      title="Tags"
      :loading="isLoading"
      :rows="list"
      :columns="columns"
      row-key="id"
      :pagination="{
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 50,
      }"
    />

    <q-separator color="primary" class="q-my-md" />

    <div class="column items-end">
      <div class="col q-gutter-sm">
        <q-btn
          label="Confirm"
          type="button"
          color="primary"
          :loading="isConfirming"
          :disabled="!isConfirmEnabled"
          @click="onConfirmClicked"
        />
        <q-btn
          label="Delete"
          type="button"
          color="negative"
          :loading="isDeleting"
          :disabled="!isDeleteEnabled"
          @click="onDeleteClicked"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useItemsStore } from 'stores/items';
import { useRoute, useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();

const store = useItemsStore();

const $q = useQuasar();

const isLoading = computed(() => {
  return store.isLoading;
});

const isConfirming = computed(() => {
  return store.isDeleting;
});

const isDeleting = computed(() => {
  return store.isDeleting;
});

const isConfirmEnabled = computed(() => {
  return true;
});

const isDeleteEnabled = computed(() => {
  return true;
});

const item = computed(() => {
  return store.single;
});

const list = computed(() => {
  return store.single?.tagds ?? [];
});

const columns = [
  {
    name: 'slug',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row) => row.slug,
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
    name: 'isActive',
    required: true,
    label: 'Active',
    align: 'left',
    field: (row) => row.isActive,
    format: (val) => (val ? 'Yes' : 'No'),
    sortable: true,
  },
  {
    name: 'isExpired',
    required: true,
    label: 'Expired',
    align: 'left',
    field: (row) => row.isExpired,
    format: (val) => (val ? 'Yes' : 'No'),
    sortable: true,
  },
  {
    name: 'isTransferred',
    required: true,
    label: 'Transferred',
    align: 'left',
    field: (row) => row.isTransferred,
    format: (val) => (val ? 'Yes' : 'No'),
    sortable: true,
  },
];

onMounted(() => {
  store.fetch(route.params.id);
});

function onDeleteClicked() {
  store
    .delete(route.params.id)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item deleted successfully',
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

function onConfirmClicked() {
  console.log('will confirm');
}
</script>
