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

    <q-dialog v-model="showDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm sale</div>
          <div class="text-subtitle2">
            Are you sure you want to confirm the sale of this tag?
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="saleConsumerEmail"
            type="email"
            label="Consumer email"
            hint="Enter the consumer email"
            :rules="['email']"
          />
          <q-input
            v-model.number="salePriceAmount"
            type="number"
            label="Price amount"
            hint="Enter the price amount"
          />
          <q-select
            v-model="salePriceCurrency"
            :options="currencies"
            label="Currency"
            hint="Select a currency from list"
            :loading="isFetchingCurrencies"
          />
        </q-card-section>

        <q-separator class="q-my-md" />

        <q-card-actions align="right">
          <q-btn
            label="Cancel"
            flat
            color="primary"
            @click="showDialog = false"
          />
          <q-btn
            label="Confirm"
            flat
            color="red"
            @click="onConfirmDialogClicked"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useTagdStore } from 'stores/tagd';
import { useTagdsStore } from 'stores/tagds';
import { useRefStore } from 'stores/ref';
import { useRoute, useRouter } from 'vue-router';
import { date } from 'quasar';
import { useQuasar } from 'quasar';

const showDialog = ref(false);

const saleConsumerEmail = ref(null);
const salePriceAmount = ref(null);
const salePriceCurrency = ref(null);

const router = useRouter();
const route = useRoute();

const storeTagd = useTagdStore();
const storeTagds = useTagdsStore();
const storeRef = useRefStore();

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
  storeRef.fetchCurrencies();
});

const isFetchingCurrencies = computed(() => {
  return storeRef.is.fetching;
});

const currencies = computed(() => {
  return (
    storeRef.data.currencies?.map((currency) => {
      return {
        label: `${currency.name} (${currency.symbol})`,
        value: currency.code,
      };
    }) ?? []
  );
});

watch(currencies, () => {
  const currency = currencies.value.find((currency) => {
    return currency.value === 'GBP';
  });
  salePriceCurrency.value = currency;
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
  showDialog.value = true;
}

function onConfirmDialogClicked() {
  storeTagds
    .confirm(tagdId.value, saleConsumerEmail.value, {
      amount: salePriceAmount.value,
      currency: salePriceCurrency.value.value,
    })
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
