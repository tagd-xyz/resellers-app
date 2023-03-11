<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      My Profile
      <q-spinner v-if="isFetching" color="black" />
    </p>
    <q-form @submit.prevent="onSubmit">
      <q-input
        v-model="data.name"
        label="Name"
        hint="Enter the name of the reseller"
        placeholder="i.e. eBay"
        :rules="[(val) => (val && val.length > 0) || 'This field is required']"
        :disable="isFetching"
      />

      <q-input
        v-model="data.logo"
        label="Logo"
        hint="Enter the logo URL"
        placeholder="i.e. https://cdn-icons-png.flaticon.com/512/888/888848.png"
        :disable="isFetching"
      />

      <q-input
        v-model="data.website"
        label="Website"
        hint="Enter the website URL"
        placeholder="i.e. https::/www.ebay.co.uk"
        :disable="isFetching"
      />

      <q-separator color="primary" class="q-my-md" />

      <div class="column items-end">
        <div class="col">
          <q-btn
            label="Update"
            type="submit"
            color="primary"
            :loading="isFetching"
            :disabled="!isSubmitEnabled"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMeStore } from 'stores/me';
// import { useItemsStore } from 'stores/items';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';

const route = useRoute();

// const store = useItemsStore();
const storeMe = useMeStore();

const $q = useQuasar();

const initialData = {
  name: '',
  logo: '',
  website: '',
};

const data = ref(initialData);

const isSubmitEnabled = computed(() => {
  return data.value.name;
});

const isFetching = computed(() => {
  return storeMe.is.fetching;
  // return store.isFetching;
});

const actorId = computed(() => {
  return route.params.id;
});

onMounted(() => {
  console.log('actor', actorId.value);
  storeMe.fetch().then(() => {
    const actor = storeMe.data.actors.find(
      (actor) => actor.id == actorId.value
    );
    data.value.name = actor.name;
    data.value.logo = actor.logo;
    data.value.website = actor.website;
  });
});

async function onSubmit() {
  const payload = {
    // retailer: this.currentRetailer,
    name: data.value.name,
    logo: data.value.logo,
    website: data.value.website,
  };

  storeMe
    .update(actorId.value, payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Profile updated successfully',
      });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}
</script>
