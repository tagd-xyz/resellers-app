<template>
  <div class="q-pa-lg">
    <p class="text-h5">
      My Profile
      <q-spinner v-if="isFetching" color="black" />
    </p>

    <div class="row q-col-gutter-lg">
      <div class="col-2">
        <avatar-upload
          :actorId="actorId"
          :logo="data.logoSmallUrl"
          @uploaded="onUpload"
          :disable="isFetching"
          ref="uploader"
        />
      </div>
      <div class="col">
        <q-form @submit.prevent="onSubmit">
          <q-input
            v-model="data.name"
            label="Name"
            hint="Enter the name of the reseller"
            placeholder="i.e. eBay"
            :rules="[
              (val) => (val && val.length > 0) || 'This field is required',
            ]"
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useMeStore } from 'stores/me';
// import { useItemsStore } from 'stores/items';
import { useQuasar } from 'quasar';
import { useRoute } from 'vue-router';
import AvatarUpload from './components/AvatarUpload.vue';

const route = useRoute();

// const store = useItemsStore();
const storeMe = useMeStore();

const $q = useQuasar();

const initialData = {
  name: '',
  avatarUploadId: '',
  website: '',
  logoSmallUrl: '',
  logoUrl: '',
};

const data = ref(initialData);
const uploader = ref(null);

// const uploadFailMessage = ref('');
// const uploadDetails = ref(null);

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

// const uploadLogoMessage = computed(() => {
//   return data.value.logo ? 'Replace logo' : 'Upload a logo';
// });

function fetch() {
  storeMe.fetch().then(() => {
    const actor = storeMe.data.actors.find(
      (actor) => actor.id == actorId.value
    );
    data.value.name = actor.name;
    data.value.avatarUploadId = actor.avatarUploadId;
    data.value.website = actor.website;
    data.value.logoSmallUrl = actor.logoSmallUrl;
    data.value.logoUrl = actor.logoUrl;
  });
}

onMounted(() => {
  fetch();
});

// function onUploadAdd(files) {
//   const fileName = files[0].name;
//   storeMe
//     .requestAvatarUpload(actorId.value, fileName)
//     .then((response) => {
//       uploadDetails.value = response.data.data;
//     })
//     .catch(() => {
//       uploadFailMessage.value =
//         'Something went wrong. Try again or choose a different file';
//     });
// }

// function onUploadSuccess() {
//   data.value.avatarUploadId = uploadDetails.value.id;
// }

// function onUploadFail() {
//   uploadFailMessage.value =
//     'Something went wrong. Try again or choose a different file';
// }

function onUpload(uploadId) {
  data.value.avatarUploadId = uploadId;
}

function onSubmit() {
  const payload = {
    // retailer: this.currentRetailer,
    name: data.value.name,
    avatarUploadId: data.value.avatarUploadId ?? null,
    website: data.value.website,
  };

  storeMe
    .update(actorId.value, payload)
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Profile updated successfully',
      });
      fetch();
      uploader.value.reset();
    })
    .catch((error) => {
      console.error(error);
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    });
}
</script>
