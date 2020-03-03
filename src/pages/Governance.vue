<template>
  <q-page padding>
    <div

      class="q-pa-sm row items-start q-gutter-xs"
    >
      <GovProposalContainer
        v-for="(proposal, index) in activeNetworkProposals"
        :key="index"
        :proposal="proposal"
      />
    </div>
  </q-page>
</template>

<script>
import GovProposalContainer from '../components/governance/GovProposalContainer';

export default {
  name: 'Governance',
  components: {
    GovProposalContainer,
  },
  computed: {
    activeNetwork: {
      get() {
        return this.$store.state.session.networkConfig.networkNameLC;
      },
    },
    activeNetworkProposals: {
      get() {
        return this.$store.state.governance.govProposals[this.activeNetwork];
      },
    },
  },
  beforeMount() {
    this.fetchGovernanceData();
  },
  methods: {
    async fetchGovernanceData() {
      await this.$store.dispatch('governance/fetchGovernanceProposals');
    },
  },
};
</script>
