<template>
  <q-btn
    :disabled="depositPeriod"
    color="secondary"
    text-color="primary"
    class="q-pa-sm"
    @click="beginDepositTransaction"
  >
    Deposit
  </q-btn>
</template>

<script>
export default {
  name: 'BeginDepositTransactionButton',
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
    depositPeriod() {
      if (this.proposal.status === 'DepositPeriod') {
        return false;
      }
      return true;
    },
  },
  methods: {
    beginDepositTransaction() {
      this.$store.dispatch('governance/deposit', this.proposal.id);
    },
  },
};
</script>
