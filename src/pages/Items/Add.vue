<template>
  <div class="q-pa-lg">
    <q-form @submit.prevent="onSubmit">
      <div class="row q-col-gutter-lg">
        <div class="col">
          <p class="text-h5">Item details</p>
          <q-input
            v-model="data.name"
            label="Name"
            hint="Enter the name of the item"
            placeholder="i.e. LEATHER TOTE BAG"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-input
            type="textarea"
            v-model="data.description"
            label="Description"
            hint="Enter the description of the item"
            placeholder="i.e. Leather tote bag with a crackled effect."
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-select
            v-model="data.type"
            :options="['Fashion', 'Sneakers']"
            label="Type"
            hint="Enter the type of the item"
            placeholder="i.e. Fashion"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />

          <q-input
            v-model="data.brand"
            label="Brand"
            hint="Enter the brand of the item"
            placeholder="i.e. Zara"
            :disable="isPosting"
          />

          <q-input
            v-model="data.model"
            label="Model"
            hint="Enter the model of the item"
            placeholder="i.e. Leather Totem 2023 White"
            :disable="isPosting"
          />

          <q-input
            v-model="data.size"
            label="Size"
            hint="Enter the size of the item"
            placeholder="i.e. L"
            :disable="isPosting"
          />
        </div>
        <div class="col">
          <p class="text-h5">Sales details</p>
          <q-input
            v-model="data.consumer"
            label="Consumer"
            hint="Enter the email of the consumer"
            placeholder="i.e. john@gmail.com"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
              (val) =>
                val.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/) ||
                'Please write a valid email address',
            ]"
            :disable="isPosting"
          />

          <q-input
            v-model="data.transaction"
            label="Transaction ID"
            hint="Enter the transaction ID"
            placeholder="i.e. 4926687623010"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
            :disable="isPosting"
          />
        </div>
      </div>

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn
            label="Submit"
            type="submit"
            color="primary"
            :loading="isPosting"
            :disabled="!isSubmitEnabled"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useItemsStore } from 'stores/items';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();

const store = useItemsStore();

const $q = useQuasar();

const initialData = {
  name: '',
  description: '',
  type: '',
  brand: '',
  model: '',
  size: '',
  consumer: '',
  transaction: '',
};

const data = ref(initialData);

const isSubmitEnabled = computed(() => {
  return (
    data.value.name &&
    data.value.description &&
    data.value.type &&
    data.value.consumer &&
    data.value.transaction
  );
});

const isPosting = computed(() => {
  return store.isPosting;
});

async function onSubmit() {
  const payload = {
    // retailer: this.currentRetailer,
    name: data.value.name,
    description: data.value.description,
    type: data.value.type,
    consumer: data.value.consumer,
    transaction: data.value.transaction,
    properties: {
      brand: data.value.brand,
      model: data.value.model,
      size: data.value.size,
    },
  };

  store
    .add(payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Item added successfully',
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
