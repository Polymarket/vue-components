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
          @click="delegate"
        >
          <q-item-section>Claim Rewards</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-close-popup
          clickable
          @click="delegate"
        >
          <q-item-section>Redelegate</q-item-section>
        </q-item>
        <q-separator />

        <q-item
          v-close-popup
          clickable
          @click="delegate"
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
  computed: {
    selectedValidator: {
      get() {
        return this.$store.state.delegation.targetValidator;
      },
      set(val) {
        this.$store.commit('delegation/SET_TARGET_VALIDATOR', val);
      },
    },
  },
  methods: {
    delegate() {
      this.$store.dispatch('delegation/beginDelegation', this.validator);
    },
    claimRewards() {
      this.$store.dispatch('kava/beginDelegation');
    },
    redelegate() {
      this.$store.dispatch('kava/beginDelegation');
    },
    unbond() {
      this.$store.dispatch('kava/beginDelegation');
    },
  },
};
</script>
