<template>
  <div class="row justify-center">
    <q-card
      bordered
      class="transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          Account Details
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
                <span class="text-weight-bold">{{ account.cosmos }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-item class="q-ma-sm q-pa-sm">
            <q-item-section avatar>
              <q-avatar rounded>
                <img src="statics/logos/iris.svg">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>Iris</q-item-label>
              <q-item-label caption>
                <span class="text-weight-bold">{{ account.iris }}</span>
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
                <span class="text-weight-bold">{{ account.terra }}</span>
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
                <span class="text-weight-bold">{{ account.kava }}</span>
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <q-separator />

        <q-card-actions>
          <q-btn
            color="secondary"
            :disabled="buttonEnabled"
            @click="getAccountDetails"
          >
            {{ accountButtonText }}
          </q-btn>
        </q-card-actions>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AddressViewer',
  data() {
    return {};
  },
  computed: {
    ...mapState('ledger', ['account', 'detected', 'locked']),
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
    networkName: {
      get() {
        return this.$store.state.session.networkConfig.networkNameProper;
      },
    },
    accountButtonText() {
      if (this.detected === true && this.locked === false) {
        return `View Account Info for ${this.networkConfig.networkNameProper}`;
      } if (this.detected === true && this.locked === true) {
        return 'Your ledger is locked';
      } if (this.detected !== true) {
        return 'Ledger not detected. Connect first.';
      }
      return false;
    },
  },
  methods: {
    getAccountDetails() {
      this.$store.dispatch('ledger/getLedgerAccountDetails');
    },
  },
};
</script>
