<template>
  <div class="q-pa-none">
    <q-stepper
      v-model="step"
      class="shadow-0 q-ma-none q-pa-none"
      vertical
      color="primary"
      animated
    >
      <q-step
        :name="1"
        title="Connect Account"
        icon="settings"
        :done="step > 1"
      >
        <div v-if="loading">
          Loading your account info..
        </div>
        <div v-if="!loading && address == ''">
          Unable to load your address info. Did you connect to your Ledger?
        </div>
        <div v-if="!loading && address != ''">
          Your address for delegating: {{ address }}
        </div>


        <q-stepper-navigation>
          <q-btn
            :disabled="loading"
            color="primary"
            label="Confirm"
            @click="step = 2"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Delegation Selection"
        caption="Please enter the amount you wish to delegate"
        icon="account_balance"
        :done="step > 2"
      >
        <q-item
          class="q-ma-sm"
        >
          <q-item-section
            avatar
            top
          >
            <q-avatar>
              <img :src="targetProvider.logo">
            </q-avatar>
          </q-item-section>

          <q-item-section top>
            <q-item-label overflow-auto>
              <span class="text-weight-bold">{{ targetProvider.label }}</span>
            </q-item-label>
            <q-item-label>
              {{ targetProvider.location }}
            </q-item-label>
          </q-item-section>
        </q-item>

        <div class="q-pa-md">
          <AmountInput />
        </div>

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Confirm"
            @click="step = 3"
          />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 1"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Confirm Delegation Transaction"
        icon="send"
      >
        <div class="text-h6">
          Sign Tx
        </div>
        Click submit to generate the transaction.
        You will be prompted to sign the transaction on your Ledger.
        <q-stepper-navigation>
          <q-btn
            text-color="secondary"
            :disabled="disabled"
            outline
            color="primary"
            label="Submit"
            @click="delegate"
          />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 2"
          />
          <q-btn
            flat
            color="primary"
            label="Cancel"
            class="q-ml-sm"
            @click="endDelegation"
          />
        </q-stepper-navigation>
      </q-step>
      <q-step
        :name="4"
        title="Tx Status"
        icon="all_inclusive"
      >
        <div class="text-h6">
          Transaction sent.
        </div>
        Tx Hash: {{ stepMsg.txhash }}
        <!--        Successful: {{ stepMsg.logs[0].success }}-->
        <q-stepper-navigation>
          <q-btn
            flat
            color="primary"
            label="Exit"
            class="q-ml-sm"
            @click="endDelegation"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AmountInput from '../common/form/AmountInput';

export default {
  name: 'LedgerDelegationSteps',
  components: {
    AmountInput,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapState('ledger', ['detected', 'locked']),
    step: {
      get() {
        return this.$store.state.session.ledgerTxCurrentStep.number;
      },
      set(val) {
        this.$store.dispatch('session/setLedgerTxCurrentStepNumber', val);
      },
    },
    stepMsg: {
      get() {
        return this.$store.state.session.ledgerTxCurrentStep.optionalMsg;
      },
      set(val) {
        this.$store.dispatch('session/setLedgerTxCurrentStepOptionalMsg', val);
      },
    },
    currentNetwork: {
      get() {
        return this.$store.state.session.networkConfig.networkNameLC;
      },
    },
    address: {
      get() {
        return this.$store.state.ledger.address[this.currentNetwork];
      },
    },
    loading: {
      get() {
        return this.$store.state.session.loading.ledger;
      },
    },
    txInProgress: {
      get() {
        return this.$store.state.session.ledgerTxInProgress;
      },
    },
    targetProvider: {
      get() {
        return this.$store.state.delegation.targetProvider;
      },
    },
    disabled() {
      if (this.$store.state.delegation.targetProvider !== null
        && this.$store.state.delegation.delegationAmount > 0) {
        return false;
      }
      return true;
    },
  },
  beforeMount() {
    this.getAccountDetails();
    this.step = 1;
  },
  methods: {
    getAccountDetails() {
      this.$store.dispatch('ledger/getLedgerAccountDetails');
    },
    delegate() {
      // this.$store.dispatch('ledger/delegate');
      this.$store.dispatch('delegation/createDelegationTx');
    },
    endDelegation() {
      this.$store.dispatch('session/endLedgerTransaction');
    },
  },
};
</script>
