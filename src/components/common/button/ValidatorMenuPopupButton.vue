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
        >
          <q-item-section>Delegate</q-item-section>
        </q-item>
        <q-separator />

        <q-item
          v-close-popup
          clickable
        >
          <q-item-section>Claim Rewards</q-item-section>
        </q-item>
        <q-separator />
        <q-item
          v-close-popup
          clickable
        >
          <q-item-section>Redelegate</q-item-section>
        </q-item>
        <q-separator />

        <q-item
          v-close-popup
          clickable
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
  data() {
    return {};
  },
};
</script>
