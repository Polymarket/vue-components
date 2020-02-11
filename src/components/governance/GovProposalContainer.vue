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
        color="secondary"
        text-color="primary"
        class="q-pa-sm"
      >
        Vote
      </q-btn>
      <q-btn
        color="secondary"
        text-color="primary"
        class="q-pa-sm"
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
