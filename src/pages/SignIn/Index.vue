<template>
  <q-page class="flex flex-center">
    <div class="text-right">
      <logo-component height="75px" class="q-ma-lg" />
      <h4 class="q-mr-lg text-primary">Resellers Demo</h4>
    </div>
    <div id="firebaseui-auth-container"></div>
  </q-page>
</template>

<script setup>
import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import { onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';
import { auth, authUI } from 'boot/firebase';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';

const store = useAuthStore();
const router = useRouter();

onMounted(() => {
  const config = {
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    signInSuccessUrl: '/items',
    callbacks: {
      signInSuccessWithAuthResult(authResult) {
        store.signIn(authResult.user);
        return true;
      },
    },
  };

  auth.onAuthStateChanged(async (user) => {
    if (user) {
      // user is logged in, redirect
      router.push({ name: 'items' });
    } else {
      // user is logged out, start FirebaseUI
      authUI.start('#firebaseui-auth-container', config);
    }
  });
});
</script>
