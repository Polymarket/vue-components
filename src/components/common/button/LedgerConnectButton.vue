<template>
  <div class="q-pa-md">
    <q-btn
      :text-color="textColor"
      :outline="outline"
      :loading="loading"
      :label="label"
      :icon="icon"
      :dark="dark"
      @click="connectLedger()"
    >
      <template v-slot:loading>
        <q-spinner-gears />
      </template>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'LedgerConnectButton',
  data() {
    return {
      label: 'connect ledger',
      icon: 'camera_rear',
      textColor: 'primary',
      outline: true,
      dark: true,
    };
  },
  computed: {
    loading: {
      get() {
        return this.$store.state.session.loading.ledger;
      },
    },
  },
  methods: {
    connectLedger() {
      this.$store.dispatch('ledger/connectLedger');
    },
  },
};
</script>

<style>
</style>
