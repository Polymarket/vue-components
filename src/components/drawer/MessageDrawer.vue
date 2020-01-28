<template>
  <q-drawer
    v-model="rightDrawer"
    side="right"
    bordered
    content-class="bg-grey-2"
  >
    <q-list>
      <q-item-label header>
        {{ header }}
      </q-item-label>
      <q-item
        v-for="(msg, index) in messages"
        :key="index"
      >
        <q-item-section avatar>
          <q-icon :name="msg.severity" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ msg.message }}</q-item-label>
          <!-- <q-item-label
            v-if="entry.caption"
            caption
          >
            {{ entry.caption }}
          </q-item-label> -->
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {
  name: 'MessageDrawer',
  data() {
    return {
      header: 'Messages',
    };
  },
  computed: {
    rightDrawer: {
      get() {
        return this.$store.state.session.rightDrawer;
      },
    },
    messages: {
      get() {
        return this.$store.state.session.messages;
      },
    },
  },
};
</script>
