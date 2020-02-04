<template>
  <div>
    <q-btn-dropdown
      flat
      icon="account_balance_wallet"
      label="Ledger"
    >
      <!-- dropdown content -->
      <q-list
        no-border
        link
        inset-delimiter
        class="q-ma-xs q-pa-xs"
      >
        <q-item>
          <LedgerConnectButton />
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Detected
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>
              {{ detected }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Version
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>
              {{ version }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Locked
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>
              {{ locked }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label caption>
              Test Mode
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label overline>
              {{ test_mode }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import LedgerConnectButton from './LedgerConnectButton';

export default {
  name: 'LedgerDropdown',
  components: {
    LedgerConnectButton,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState('ledger', [
      'version',
      'locked',
      'test_mode',
      'detected',
    ]),
  },
};
</script>

<style>
</style>
