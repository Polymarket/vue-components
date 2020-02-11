<template>
  <div class="row justify-center">
    <q-card
      bordered
      class="transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          Detailed Account Information
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
                {{ networkName }}
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
    accountButtonText() {
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
    getAccountDetails() {
      this.$store.dispatch('ledger/viewLedgerAddress');
    },
  },
};
</script>
