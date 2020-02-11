<template>
  <q-card
    style="width: 100%;"
    bordered
    class="text-secondary q-ma-xs q-pa-none shadow-11"
  >
    <q-card-section>
      <div class="text-h6 q-mx-sm">
        {{ proposal.id }} - {{ proposal.title }} ({{ proposal.status }})
      </div>
    </q-card-section>

    <GovernanceCardTabPanel
      :proposal="proposal"
    />
    <q-separator />
    <q-card-actions class="q-pa-md">
      <q-btn
        :disabled="votingPeriod"
        color="secondary"
        text-color="primary"
        class="q-pa-sm"
        @click="beginVoteTransaction"
      >
        Vote
      </q-btn>
      <q-btn
        :disabled="depositPeriod"
        color="secondary"
        text-color="primary"
        class="q-pa-sm"
        @click="beginDepositTransaction"
      >
        Deposit
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import GovernanceCardTabPanel from './GovernanceCardTabPanel';

export default {
  name: 'GovProposalContainer',
  components: {
    GovernanceCardTabPanel,
  },
  props: {
    proposal: {
      type: Object,
      required: true,
      default: Object.assign({}),
    },
  },
  data() {
  },
  computed: {
    votingPeriod() {
      if (this.proposal.status === 'VotingPeriod') {
        return false;
      }
      return true;
    },
    depositPeriod() {
      if (this.proposal.status === 'DepositPeriod') {
        return false;
      }
      return true;
    },
  },
  methods: {
    asPercent(val) {
      const perc = (val * 100).toFixed(2);
      return `${perc}%`;
    },
    beginDepositTransaction() {
      this.$store.dispatch('governance/deposit', this.proposal.id);
    },
    beginVoteTransaction() {
      this.$store.dispatch('governance/vote', this.proposal.id);
    },
  },
};
</script>

<style>

</style>
