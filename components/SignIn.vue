<template>
  <div id="firebaseui-auth-container"></div>
</template>

<script>
export default {
  // https://firebase.google.com/docs/auth/web/firebaseui

  mounted() {
    const firebaseui = require('firebaseui');

    require('firebaseui/dist/firebaseui.css');

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(this.$fire.auth);

    const config = {
      signInOptions: [
        this.$fireModule.auth.EmailAuthProvider.PROVIDER_ID,
        // this.$fireModule.auth.GoogleAuthProvider.PROVIDER_ID,
      ],
      signInSuccessUrl: '/items',
      callbacks: {
        signInSuccessWithAuthResult() {
          window.location = '/items';
        },
      },
    };

    ui.start('#firebaseui-auth-container', config);
  },
};
</script>

<style></style>
