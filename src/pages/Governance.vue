<template>
  <q-page padding>
    Governance
  </q-page>
</template>

<script>
export default {
  name: 'Governance',
  mounted() {
    this.fetchGovernanceData();
  },
  methods: {
    fetchGovernanceData() {
      this.$store.dispatch('governance/fetchGovernanceProposals');
    },
  },
};
</script>
