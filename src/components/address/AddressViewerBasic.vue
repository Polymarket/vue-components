<template>
  <div class="row justify-center">
    <q-card
      bordered
      class="transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          Ledger Addresses
        </div>
        <q-list>
          <q-item class="q-ma-sm q-pa-sm">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/logos/cosmos.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Cosmos</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold">{{ address.cosmos }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item class="q-ma-sm q-pa-sm">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/logos/irisnet.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Iris</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold">{{ address.iris }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item class="q-ma-sm q-pa-sm">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/logos/terra.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Terra</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold">{{ address.terra }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item class="q-ma-sm q-pa-sm">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/logos/kava.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Kava</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold">{{ address.kava }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-actions>
          <q-btn
            color="secondary"
            :disabled="buttonEnabled"
            @click="getLedgerAddress"
          >
            {{ addressButtonText }}
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddressViewerBasic',
  data() {
    return {};
  },
  computed: {
    ...mapState('ledger', ['address', 'detected', 'locked']),
    buttonEnabled() {
      if (this.detected === true && this.locked === false) {
        return false;
      } if (this.detected === true && this.locked === true) {
        return true;
      } if (this.detected !== true) {
        return true;
      }
      return true;
    },
    addressButtonText() {
      if (this.detected === true && this.locked === false) {
        return 'View Your Address';
      } if (this.detected === true && this.locked === true) {
        return 'Your ledger is locked';
      } if (this.detected !== true) {
        return 'Ledger not detected. Connect first.';
      }
      return false;
    },
  },
  methods: {
    getLedgerAddress() {
      this.$store.dispatch('ledger/viewLedgerAddress');
    },
  },
};
</script>
