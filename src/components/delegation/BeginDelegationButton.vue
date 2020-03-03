<template>
  <div>
    <q-btn
      text-color="secondary"
      :disabled="disabled"
      outline
      label="Delegate"
      @click="beginDelegation()"
    />
  </div>
</template>

<script>
export default {
  name: 'BeginDelegationButton',
  data() {
    return {};
  },
  computed: {
    disabled() {
      if (this.$store.state.delegation.targetProvider !== null
      && this.$store.state.delegation.delegationAmount > 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    beginDelegation() {
      this.$store.dispatch('delegation/beginDelegation');
    },
  },
};
</script>

<style>
</style>
