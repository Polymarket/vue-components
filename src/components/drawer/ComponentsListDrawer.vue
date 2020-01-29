<template>
  <q-drawer
    v-model="leftDrawer"
    side="left"
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>
        {{ header }}
      </q-item-label>
      <q-item
        v-for="(entry, index) in listEntries"
        :key="index"
        clickable
        :to="entry.routerTo"
        exact
        tag="a"
      >
        <q-item-section avatar>
          <q-icon :name="entry.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ entry.label }}</q-item-label>
          <q-item-label
            v-if="entry.caption"
            caption
          >
            {{ entry.caption }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'ComponentsListDrawer',
  data() {
    return {
      header: 'Components',
      listEntries: [
        {
          icon: 'visibility',
          label: 'Get Address',
          caption: '',
          routerTo: 'address',
        },
        {
          icon: 'trending_flat',
          label: 'Delegation',
          caption: '',
          routerTo: 'delegation',
        },
        {
          icon: 'local_atm',
          label: 'Rewards',
          caption: '',
          routerTo: 'rewards',
        },
        {
          icon: 'gavel',
          label: 'Governance',
          caption: '',
          routerTo: 'governance',
        },
      ],
    };
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

  },
};
</script>
