<template>
  <q-input
    v-model="amount"
    outlined
    bottom-slots
  >
    <template v-slot:hint>
      Delegation Amount
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'DelegationAmountInput',
  data() {
    return {};
  },
  computed: {
    amount: {
      get() {
        return this.$store.state.delegation.delegationAmount;
      },
      set(val) {
        this.$store.commit('delegation/SET_DELEGATION_AMOUNT', val);
      },
    },
  },
};
</script>
