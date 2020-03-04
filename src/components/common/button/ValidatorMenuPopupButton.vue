<template>
  <q-btn
    size="12px"
    flat
    dense
    round
    icon="more_vert"
    color="primary"
  >
    <q-menu
      anchor="center middle"
      self="top left"
      transition-show="rotate"
      transition-hide="rotate"
    >
      <q-list style="min-width: 200px">
        <q-item
          v-close-popup
          clickable
          @click="delegate"
        >
          <q-item-section>Delegate</q-item-section>
        </q-item>
        <q-separator />

        <q-item
          v-close-popup
          clickable
          @click="claimRewards"
        >
          <q-item-section>Claim Rewards</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-close-popup
          clickable
          @click="redelegate"
        >
          <q-item-section>Redelegate</q-item-section>
        </q-item>
        <q-separator />

        <q-item
          v-close-popup
          clickable
          @click="unbond"
        >
          <q-item-section>Unbond</q-item-section>
        </q-item>
        <q-separator />
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script>
export default {
  name: 'ValidatorMenuPopupButton',
  props: {
    validator: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  // computed: {
  //   selectedValidator: {
  //     get() {
  //       return this.$store.state.delegation.targetProvider;
  //     },
  //     set(val) {
  //       this.$store.commit('delegation/SET_TARGET_VALIDATOR', val);
  //     },
  //   },
  // },
  methods: {
    delegate() {
      this.$store.dispatch('session/beginDelegationTransaction', this.validator);
    },
    claimRewards() {
      this.$store.dispatch('delegation/createRewardClaimTx', this.validator);
    },
    redelegate() {
      this.$store.dispatch('delegation/createRedelegationTx', this.validator);
    },
    unbond() {
      this.$store.dispatch('delegation/createUnbondTx', this.validator);
    },
  },
};
</script>
