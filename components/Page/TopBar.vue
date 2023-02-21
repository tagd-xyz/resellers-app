<template>
  <div>
    <b-navbar variant="dark" type="dark">
      <b-navbar-brand href="/">
        <page-logo variant="dark" />
        Resellers Portal
      </b-navbar-brand>
      <b-navbar-nav> </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item
          :to="{
            name: 'consumers',
            hash: '#consumers',
            replace: true,
          }"
          exact
        >
          Consumers
        </b-nav-item>
        <b-nav-item
          :to="{
            name: 'items',
            hash: '#items',
            replace: true,
          }"
          exact
        >
          Items
        </b-nav-item>
        <b-nav-item-dropdown
          v-if="currentUser"
          :text="currentUser.displayName"
          right
        >
          <b-dropdown-group id="dropdown-group-1" header="Acting as">
            <b-dropdown-item disabled v-if="!currentActor">
              Not available
            </b-dropdown-item>
            <b-dropdown-item-button
              v-else
              v-for="actor in actors"
              :key="actor.id"
              @click="setActor(actor.id)"
              :active="currentActor == actor.id"
            >
              {{ actor.name }}
            </b-dropdown-item-button>
            <b-dropdown-divider />
          </b-dropdown-group>
          <b-dropdown-item-button href="#" @click="signOut">
            Sign Out
          </b-dropdown-item-button>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'PageHeader',
  data() {
    return {};
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    actors() {
      // console.log(this.$store.state.me.actors);
      // return [];
      return this.$store.state.me?.actors ?? [];
    },
    currentActor() {
      return this.$store.state.actor ?? false;
    },
  },
  mounted() {
    // do not fetch me if I'm already fetched
    this.fetchMe();
  },
  methods: {
    signOut() {
      this.$fire.auth.signOut();
      window.location = '/signIn';
    },
    ...mapActions({
      fetchMe: 'fetchMe',
      setActor: 'setActor',
    }),
  },
};
</script>

<style></style>
