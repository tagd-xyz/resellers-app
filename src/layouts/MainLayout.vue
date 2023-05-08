<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <logo-component variant="dark" />
          Tagd for Resellers
        </q-toolbar-title>
        <q-btn-dropdown flat icon="person" :label="userName">
          <q-list bordered separator>
            <q-item
              clickable
              v-close-popup
              v-for="actor in me.actors"
              :key="actor.id"
              @click="onProfileClicked(actor.id)"
            >
              <q-item-section>
                <q-item-label>{{ actor.name }}</q-item-label>
                <q-item-label caption>Reseller</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="showDialog = true">
              <q-item-section>
                <q-item-label>Sign Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/items" label="My Items" />
        <q-route-tab to="/items/add" label="Add item" />
        <q-route-tab to="/charts" label="Charts" />
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
import { computed, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import LogoComponent from 'components/LogoComponent.vue';
import { auth } from 'boot/firebase';
import { useAuthStore } from 'stores/auth';
import { useMeStore } from 'stores/me';

const router = useRouter();
const showDialog = ref(false);
const store = useAuthStore();
const storeMe = useMeStore();

const userName = computed(() => {
  return store.user.displayName;
});

const me = computed(() => {
  return storeMe.data;
});

function onSignOutClicked() {
  auth.signOut().then(() => {
    router.push({ name: 'signIn' });
  });
}

function onProfileClicked(actorId) {
  router.push({
    name: 'profileShow',
    params: {
      id: actorId,
    },
  });
}

onMounted(() => {
  storeMe.fetch();
});
</script>
