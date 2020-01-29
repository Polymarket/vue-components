<template>
  <div class="row justify-center">
    <q-card


      bordered
      class="my-card transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          Ledger Addresses
        </div>
        <q-list
          dense
          class="q-ma-none q-pa-sm"
        >
          <q-item>
            <q-item-section>
              <q-item-label overline />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>
                Cosmos
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{ address.cosmos }}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>
                Iris
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label caption>
                {{ address.iris }}
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
            {{ buttonText }}
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
    buttonText() {
      if (this.detected === true && this.locked === false) {
        return 'View Your Address';
      } if (this.detected === true && this.locked === true) {
        return 'Your ledger is locked';
      } if (this.detected !== true) {
        return 'Ledger not detected. Connect first.';
      }
      return false;
    },
    // cosmosAddress: {
    //   get() {
    //     return this.$store.state.ledger.address.cosmos;
    //   },
    // },
    // irisAddress: {
    //   get() {
    //     return this.$store.state.ledger.address.iris;
    //   },
    // },
    // ledgerStatus: {
    //   get() {

    //   },
    // },
  },
  methods: {
    getLedgerAddress() {
      this.$store.dispatch('ledger/viewLedgerAddress');
    },
  },
};
</script>
