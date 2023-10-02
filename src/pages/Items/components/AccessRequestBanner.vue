<template>
  <div>
    <q-banner class="bg-secondary text-white" v-if="showPendingAccessRequestBanner">
      Waiting for the consumer to grant you access to his/her items. Code
      <code>{{ pendingAccessRequestCode }}</code>
    </q-banner>
    <q-banner class="bg-secondary text-white" v-else-if="showRequestAccessBanner">
      <span v-if="showRejectedAccessRequestBanner">
        The consumer has already rejected or revoked the grant to access his/her
        items. You can request access again.
      </span>
      <span v-else>
        The consumer has not granted you access to his/her items yet.
      </span>
      <template v-slot:action>
        <q-btn flat color="white" label="Request access" :loading="isRequestingAccess" @click="onRequestAccessClick" />
      </template>
    </q-banner>
  </div>
</template>

<script setup>
import { onMounted, computed, watch } from 'vue';
import { useAccessRequestsStore } from 'stores/accessRequests';
import { useQuasar } from 'quasar';

const accessRequestsStore = useAccessRequestsStore();

const $q = useQuasar();

const props = defineProps(['consumer']);

const consumerEmail = computed(() => {
  return props.consumer;
});

const isConsumerFilled = computed(() => {
  return null !== props.consumer;
});

const showRequestAccessBanner = computed(() => {
  return (
    isConsumerFilled.value &&
    !isFetchingAccessRequests.value &&
    !hasConsumerApprovedAccessRequest.value
  );
});

const showRejectedAccessRequestBanner = computed(() => {
  return (
    isConsumerFilled.value &&
    !isFetchingAccessRequests.value &&
    hasConsumerRejectedAccessRequest.value
  );
});

const showPendingAccessRequestBanner = computed(() => {
  return (
    isConsumerFilled.value &&
    !isFetchingAccessRequests.value &&
    isWaitingConsumerToAccept.value
  );
});

const hasConsumerApprovedAccessRequest = computed(() => {
  return accessRequestsStore.list.filter((accessRequest) => {
    return (
      accessRequest.consumer.email == consumerEmail.value &&
      accessRequest.isApproved
    );
  }).length;
});

const hasConsumerRejectedAccessRequest = computed(() => {
  return accessRequestsStore.list.filter((accessRequest) => {
    return (
      accessRequest.consumer.email == consumerEmail.value &&
      (accessRequest.isRejected || accessRequest.isRevoked)
    );
  }).length;
});

const isWaitingConsumerToAccept = computed(() => {
  return accessRequestsStore.list.filter((accessRequest) => {
    return (
      accessRequest.consumer.email == consumerEmail.value &&
      accessRequest.isPending
    );
  }).length;
});

const pendingAccessRequestCode = computed(() => {
  const list = accessRequestsStore.list.filter((accessRequest) => {
    return (
      accessRequest.consumer.email == consumerEmail.value &&
      accessRequest.isPending
    );
  });
  return list[0]?.code ?? null;
});

const isFetchingAccessRequests = computed(() => {
  return accessRequestsStore.is.fetching;
});

const isRequestingAccess = computed(() => {
  return accessRequestsStore.is.posting;
});

watch(consumerEmail, () => {
  accessRequestsStore.fetch();
});

function onRequestAccessClick() {
  accessRequestsStore
    .add({
      consumer: consumerEmail.value,
    })
    .then(() => {
      $q.notify({
        type: 'positive',
        message: 'Access requested',
      });
    })
    .catch(() => {
      $q.notify({
        type: 'negative',
        message: 'There has been an error',
      });
    })
    .finally(() => {
      accessRequestsStore.fetch();
    });
}

onMounted(() => { });
</script>
