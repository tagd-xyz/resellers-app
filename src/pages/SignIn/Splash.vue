<template>
  <q-page class="flex flex-center row">
    <q-spinner color="primary" size="3em" v-if="!showMessage" />

    <q-card v-if="showMessage" class="my-card bg-negative text-white">
      <q-card-section>
        <div class="text-h6">Your account is not enabled</div>
        <div class="text-subtitle2">{{ store.user.email }}</div>
      </q-card-section>

      <q-card-section>
        This demo is not open to everyone.
        <br />
        Please contact an administrator to enable your account.
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat @click="signOutClick">Try with a different account</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'stores/auth';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { auth } from 'boot/firebase';

const store = useAuthStore();
const showMessage = ref(false);
const router = useRouter();

function signOutClick() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}

onMounted(() => {
  setTimeout(() => {
    if (store.isSignedIn) {
      if (store.isEnabled) {
        router.push({ name: 'items' });
      } else {
        showMessage.value = true;
      }
    } else {
      router.push({ name: 'signIn' });
    }
  }, 1500);
});
</script>
