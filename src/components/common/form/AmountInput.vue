<template>
  <q-input
    v-model="delegationAmount"
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
    delegationAmount: {
      get() {
        return this.$store.state.delegation.delegationAmount;
      },
      set(val) {
        this.$store.dispatch('delegation/setDelegationAmount', val);
      },
    },
  },
};
</script>
