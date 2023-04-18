<template>
  <div>
    <!-- <div class="text-caption">Logo</div> -->

    <div class="text-caption q-mt-sm text-grey-9">Current Logo</div>
    <div v-if="!logo">None</div>
    <img v-else :src="logo" />

    <q-separator class="q-my-md" />

    <p class="text-negative">
      {{ errorMessage }}
    </p>

    <p class="text-info">
      {{ infoMessage }}
    </p>

    <q-uploader
      :disable="disable"
      square
      flat
      color="primary"
      class="full-width"
      accept=".jpg, image/*"
      method="PUT"
      :url="uploadUrl"
      :label="uploadMessage"
      @added="onUploadAdd"
      @removed="onUploadRemoved"
      @failed="onUploadFail"
      @uploaded="onUploadSuccess"
      ref="uploader"
    />

    <!-- <q-uploader
      flat
      color="primary"
      class="full-width q-ml-lg"
      :url="uploadDetails?.url ?? null"
      :label="uploadLogoMessage"
      accept=".jpg, image/*"
      method="PUT"
      @added="onUploadAdd"
      @failed="onUploadFail"
      @uploaded="onUploadSuccess"
    />

    <p class="text-negative" v-if="uploadFailMessage">
      {{ uploadFailMessage }}
    </p>
     -->
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useMeStore } from 'stores/me';
const emit = defineEmits(['uploaded']);

defineExpose({ reset });

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  disable: {
    type: Boolean,
    default: false,
  },
  logo: {
    type: String,
    default: null,
  },
  actorId: {
    type: String,
    default: null,
  },
});

const uploader = ref(null);
const uploadUrl = ref(null);
const uploadId = ref(null);
const errorMessage = ref(null);
const infoMessage = ref(null);

const uploadMessage = computed(() => {
  return props.logo ? 'Replace logo' : 'Upload a logo';
});

const storeMe = useMeStore();

function onUploadAdd(files) {
  const fileName = files[0].name;
  storeMe
    .requestAvatarUpload(props.actorId, fileName)
    .then((response) => {
      const { id, url } = response.data.data;
      uploadUrl.value = url;
      uploadId.value = id;
      errorMessage.value = null;
    })
    .catch(() => {
      errorMessage.value =
        'Something went wrong. Try again or choose a different file';
    });
}

function onUploadRemoved() {
  errorMessage.value = null;
}

function onUploadSuccess(info) {
  const { name } = info.files[0];
  emit('uploaded', uploadId.value);
  uploader.value.reset();
  errorMessage.value = null;
  infoMessage.value = name + ' uploaded. Click update to confirm changes';
}

function onUploadFail() {
  errorMessage.value =
    'Something went wrong. Try again or choose a different file';
}

function reset() {
  infoMessage.value = null;
  errorMessage.value = null;
  uploader.value.reset();
}
</script>
