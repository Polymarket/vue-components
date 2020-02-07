<template>
  <q-list class="text-primary">
    <q-item>
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="calendar_today"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Submit Time</q-item-label>
        <q-item-label caption>
          {{ proposal.submit_time }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon
          color="secondary"
          name="how_to_vote"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Deposit End Time</q-item-label>
        <q-item-label caption>
          {{ proposal.deposit_end_time }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon
          color="grey"
          name="ballot"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Voting Start Time</q-item-label>
        <q-item-label caption>
          {{ proposal.voting_start_time }}
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item>
      <q-item-section avatar>
        <q-icon
          color="primary"
          name="poll"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>Voting End Time</q-item-label>
        <q-item-label caption>
          {{ proposal.voting_end_time }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>

export default {
  name: 'GovProposalCalendarList',
  props: {
    proposal: {
      type: Object,
      required: false,
      default: Object.assign({}),
    },
  },
};
</script>

<style>

</style>
