<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      Tag ID {{ tagd?.slug }}
      <q-badge outline color="primary" :label="tagd?.status" />
      <q-spinner v-if="isLoading" color="black" />
    </p>
    <div class="row q-col-gutter-lg">
      <div class="col">
        <q-card class="q-my-sm">
          <q-card-section>
            <div class="text-h6">
              {{ tagd?.item?.name }}
            </div>
            <div class="text-subtitle2">
              sold by {{ tagd?.item?.retailer ?? 'Unknown' }}
            </div>
            <q-separator class="q-my-md" />
            <div
              class="text"
              v-html="
                tagd?.item?.description.replace(/(?:\r\n|\r|\n)/g, '<br />')
              "
            />
          </q-card-section>
        </q-card>

        <q-card class="q-my-sm">
          <q-card-section>
            <div class="text-h6">Properties</div>
            <div>
              <strong>Type:</strong> {{ tagd?.item?.type?.name ?? 'Unknown' }}
            </div>
            <div>
              <strong>Brand:</strong>
              {{ tagd?.item?.properties.brand ?? 'Unknown' }}
            </div>
            <div>
              <strong>Model:</strong>
              {{ tagd?.item?.properties.model ?? 'Unknown' }}
            </div>
            <div>
              <strong>Size:</strong>
              {{ tagd?.item?.properties.size ?? 'Unknown' }}
            </div>
            <div>
                <strong>Year of production:</strong>
                {{ tagd?.item?.properties.yearOfProduction ?? 'Unknown' }}
              </div>
              <div>
                <strong>Manufacturer's Serial Number:</strong>
                {{ tagd?.item?.properties.manufacturerSerialNumber ?? 'Unknown' }}
              </div>
              <div>
                <strong>Retailer Serial Number:</strong>
                {{ tagd?.item?.properties.retailerSerialNumber ?? 'Unknown' }}
              </div>
              <div>
                <strong>Recommended Retail Price:</strong>
                {{ tagd?.item?.properties.rrp ?? 'Unknown' }}
              </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col">
        <q-card class="q-my-sm">
          <q-card-section>
            <div class="text-h6">Transaction ID</div>
            <div v-if="tagd?.meta?.transaction">
              <div class="text-subtitle2">
                {{ tagd.meta.transaction }}
              </div>
              <div class="text-subtitle2">
                on
                {{ date.formatDate(tagd?.createdAt, 'MMMM Do, YYYY HH:mm:ss') }}
              </div>
            </div>
            <div v-else>Not available</div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- <q-table
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
    /> -->

    <q-separator color="primary" class="q-my-md" />

    <div class="column items-end">
      <div class="col q-gutter-sm">
        <q-btn
          label="Confirm Sale"
          type="button"
          color="primary"
          :loading="isConfirming"
          :disabled="!isConfirmEnabled"
          @click="onConfirmClicked"
        />
        <q-btn
          label="End auction"
          type="button"
          color="secondary"
          :loading="isDeleting"
          :disabled="!isCancelEnabled"
          @click="onCancelClicked"
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
import { useTagdStore } from 'stores/tagd';
import { useTagdsStore } from 'stores/tagds';
import { useRoute, useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';

const router = useRouter();
const route = useRoute();

const storeTagd = useTagdStore();
const storeTagds = useTagdsStore();

const $q = useQuasar();

const tagdId = computed(() => {
  return route.params.id;
});

const isLoading = computed(() => {
  return storeTagd.is.fetching;
});

const isConfirming = computed(() => {
  return false;
});

const isDeleting = computed(() => {
  return storeTagds.is.deleting;
});

const isConfirmEnabled = computed(() => {
  return !isLoading.value && tagd.value?.status == 'resale';
});

const isDeleteEnabled = computed(() => {
  return !isLoading.value && tagd.value?.status == 'resale';
});

const isCancelEnabled = computed(() => {
  return !isLoading.value && tagd.value?.status == 'resale';
});

const tagd = computed(() => {
  return storeTagd.data;
});

onMounted(() => {
  storeTagd.fetch(tagdId.value);
});

function onDeleteClicked() {
  storeTagds
    .delete(tagdId.value)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Auction deleted successfully',
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
  $q.dialog({
    title: 'Transfer to consumer',
    message: 'What is the email?',
    prompt: {
      model: '',
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  })
    .onOk((email) => {
      storeTagds
        .confirm(tagdId.value, email)
        .then(() => {
          $q.notify({
            type: 'positive',
            message: 'Auction confirmed successfully',
          });
          router.push({ name: 'items' });
        })
        .catch(() => {
          $q.notify({
            type: 'negative',
            message: 'There has been an error',
          });
        });
    })
    .onCancel(() => {
      // cancelled
    })
    .onDismiss(() => {
      // finally
    });
}

function onCancelClicked() {
  storeTagds
    .cancel(tagdId.value)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Auction cancelled successfully',
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
</script>
