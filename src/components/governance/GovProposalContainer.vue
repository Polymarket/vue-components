<template>
  <q-card
    style="width: 100%; max-width: 400px"
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
      <BeginVoteTransactionButton :proposal="proposal" />
      <BeginDepositTransactionButton :proposal="proposal" />
    </q-card-actions>
  </q-card>
</template>

<script>
import GovernanceCardTabPanel from './GovernanceCardTabPanel';
import BeginVoteTransactionButton from '../common/button/BeginVoteTransactionButton';
import BeginDepositTransactionButton from '../common/button/BeginDepositTransactionButton';

export default {
  name: 'GovProposalContainer',
  components: {
    GovernanceCardTabPanel,
    BeginVoteTransactionButton,
    BeginDepositTransactionButton,
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
  methods: {
    asPercent(val) {
      const perc = (val * 100).toFixed(2);
      return `${perc}%`;
    },
  },
};
</script>

<style>

</style>
