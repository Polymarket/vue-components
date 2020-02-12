<template>
  <div class="q-pa-none q-gutter-sm">
    <q-dialog
      v-model="visible"
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card
        flat
      >
        <q-card-section class="row items-center q-pa-none">
          <!-- <div class="text-h6">
            Close icon
          </div> -->
          <!-- <q-space /> -->
          <q-btn
            v-close-popup
            class="q-pa-sm"
            icon="close"
            flat
            round
            dense
          />
        </q-card-section>
        <q-card-section>
          <LedgerVoteSteps v-show="ledgerVoteStepsVisible" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import LedgerVoteSteps from '../components/governance/LedgerVoteSteps';

export default {
  name: 'LedgerStepsContainer',
  components: {
    LedgerVoteSteps,
  },
  data() {
    return {
    };
  },
  computed: {
    visible: {
      get() {
        return this.$store.state.session.stepsContainerVisible;
      },
      set() {
        this.$store.commit('session/HIDE_STEPS_CONTAINER');
      },
    },
    ledgerVoteStepsVisible: {
      get() {
        return this.$store.state.session.ledgerVoteStepsVisible;
      },
    },
  },
};
</script>
