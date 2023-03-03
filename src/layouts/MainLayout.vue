<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <logo-component variant="dark" />
          Tagd for Resellers
        </q-toolbar-title>
        <q-btn-dropdown flat icon="person" :label="userName">
          <q-list>
            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label @click="showDialog = true">Sign Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/items" label="My Items" />
        <q-route-tab to="/items/add" label="Add item" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-dialog v-model="showDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <span class="q-ml-sm">Do you want to sign out?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="No" color="primary" v-close-popup />
          <q-btn
            flat
            label="Yes, sign out"
            color="primary"
            v-close-popup
            @click="onSignOutClicked"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';
import { auth } from 'boot/firebase';
import { useAuthStore } from 'stores/auth';

const router = useRouter();
const showDialog = ref(false);
const store = useAuthStore();

const userName = computed(() => {
  return store.user.displayName;
});

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}
</script>
