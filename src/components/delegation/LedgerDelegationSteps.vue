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
        icon="bank_account_balance"
        :done="step > 2"
      >
        <div class="text-h6">
          {{targetValidator}}
        </div>

        <!--        <p>{{ voteProposal.id }} - {{ voteProposal.title }}</p>-->
        <!--        <p>{{ voteProposal.description }}</p>-->

        <div class="q-pa-md">
          <q-input v-model="delegationAmount">

          </q-input>
          <!--          <q-option-group-->
          <!--            v-model="voteOption"-->
          <!--            :options="options"-->
          <!--            label="Options"-->
          <!--            type="radio"-->
          <!--          />-->
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
        title="Confirm Vote Transaction"
        icon="send"
      >
        <div class="text-h6">
          Sign Tx
        </div>

        Click submit to generate the transaction.
        You will be prompted to sign the transaction on your Ledger.
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Submit"
          />
          <q-btn
            flat
            color="primary"
            label="Cancel"
            class="q-ml-sm"
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

        <!--        Tx Hash: {{ stepMsg.txhash }}-->
        <!--        Successful: {{ stepMsg.logs[0].success }}-->

        <q-stepper-navigation>
          <q-btn
            flat
            color="primary"
            label="Exit"
            class="q-ml-sm"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LedgerDelegationSteps',
  data() {
    return {
    };
  },
  computed: {
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
    ...mapState('ledger', ['detected', 'locked']),
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
        return this.$store.session.ledgerTxInProgress;
      },
    },
    targetValidator: {
      get() {
        return this.$store.state.delegation.targetValidator;
      },
    },
    delegationAmount: {
      get() {
        return this.$store.state.delegation.delegationAmount;
      },
      set(val) {
        this.$store.dispatch('delegation/setDelegationAmount', val);
      },
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

  },
};
</script>
