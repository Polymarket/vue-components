<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      reveal
      elevated
      class="bg-primary text-secondary"
    >
      <q-toolbar class="bg-primary text-secondary">
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Cosmos Ledger Vue Components
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          icon="dynamic_feed"
          @click="rightDrawer = !rightDrawer"
        />
      </q-toolbar>
    </q-header>
    <!-- <q-tabs>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs> -->

    <!-- (Optional) The Footer -->
    <q-footer>
      <!-- <q-tabs switch-indicator>
        <q-route-tab
          icon="map"
          to="/your/route"
          replace
          label="One Tab"
        />
        <q-route-tab
          icon="assignment"
          to="/some/other/route"
          replace
          label="Other Tab"
        />
      </q-tabs> -->

      <!-- <q-toolbar>
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Footer
        </q-toolbar-title>
      </q-toolbar> -->
    </q-footer>

    <ComponentsListDrawer />
    <MessageDrawer />
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <q-page-container>
        <router-view />
        <q-page-scroller
          position="bottom-left"
          :scroll-offset="150"
          :offset="[18, 18]"
        >
          <q-btn
            fab
            icon="keyboard_arrow_up"
            color="white"
            text-color="secondary"
          />
        </q-page-scroller>
      </q-page-container>
    </transition>
  </q-layout>
</template>

<script>
import ComponentsListDrawer from '../components/drawer/ComponentsListDrawer';
import MessageDrawer from '../components/drawer/MessageDrawer';

export default {
  name: 'Layout',
  components: {
    ComponentsListDrawer,
    MessageDrawer,
  },
  computed: {
    leftDrawer: {
      get() {
        return this.$store.state.session.leftDrawer;
      },
      set(val) {
        this.$store.dispatch('session/toggleLeftDrawer', val);
      },
    },
    rightDrawer: {
      get() {
        return this.$store.state.session.rightDrawer;
      },
      set(val) {
        this.$store.dispatch('session/toggleRightDrawer', val);
      },
    },
  },
};
</script>
