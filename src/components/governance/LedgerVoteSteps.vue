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
        <div v-if="!loading">
          Your address for voting: {{ address }}
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
        title="Vote Selection"
        caption="Please choose your vote selection"
        icon="ballot"
        :done="step > 2"
      >
        <div class="text-h6">
          Proposal Details
        </div>

        <p>{{ voteProposal.id }} - {{ voteProposal.title }}</p>
        <p>{{ voteProposal.description }}</p>

        <div class="q-pa-md">
          <q-option-group
            v-model="voteOption"
            :options="options"
            label="Options"
            type="radio"
          />
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
        Click submit to generate the transaction.
        You will be prompted to sign the transaction on your Ledger.
        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Submit Vote"
            @click="vote"
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
        :name="4"
        title="Create an ad"
        icon="add_comment"
      >
        Try out different ad text to see what brings in the most customers, and learn how to
        enhance your ads using features like ad extensions. If you run into any problems with
        your ads, find out how to tell if they're running and how to resolve approval issues.

        <q-stepper-navigation>
          <q-btn
            color="primary"
            label="Finish"
          />
          <q-btn
            flat
            color="primary"
            label="Back"
            class="q-ml-sm"
            @click="step = 2"
          />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LedgerVoteSteps',
  data() {
    return {
      step: 1,
      voteOption: null,
      options: [
        { label: 'Yes', value: 'Yes', color: 'green' },
        { label: 'No', value: 0x03, color: 'red' },
        { label: 'No with Veto', value: 0x04, color: 'orange' },
        { label: 'Abstain', value: 0x02, color: 'grey' },
      ],
    };
  },
  mounted() {
    this.getAccountDetails();
  },
  computed: {
    ...mapState('ledger', ['detected', 'locked']),
    currentNetwork: {
      get() {
        return this.$store.state.session.network;
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
    voteProposal: {
      get() {
        return this.$store.state.governance.voteProposal;
      },
    },
  },
  methods: {
    getAccountDetails() {
      this.$store.dispatch('ledger/getLedgerAccountDetails');
    },
    vote() {
      this.$store.dispatch('governance/vote', this.voteOption);
    },
  },
};
</script>
