<template>
  <q-btn
    :disabled="votingPeriod"
    color="secondary"
    text-color="primary"
    class="q-pa-sm"
    @click="beginVoteTransaction"
  >
    Vote
  </q-btn>
</template>

<script>
export default {
  name: 'BeginVoteTransactionButton',
  props: {
    proposal: {
      type: Object,
      required: true,
      default: Object.assign({}),
    },
  },
  data() {
    return {};
  },
  computed: {
    votingPeriod() {
      if (this.proposal.status === 'VotingPeriod') {
        return false;
      }
      return true;
    },
  },
  methods: {
    beginVoteTransaction() {
      this.$store.dispatch('governance/beginVoteTransaction', this.proposal);
    },
  },
};
</script>
