<template>
  <q-list
    v-if="votes.length > 0"
    class="text-primary"
  >
    <q-item
      v-for="(vote,index) in votes"
      :key="index"
    >
      <q-item-section>
        <q-item-label overline>
          {{ vote.option }}
        </q-item-label>
        <q-item-label caption>
          {{ vote.voter }}
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
export default {
  name: 'GovProposalVotesList',
  props: {
    votes: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>

</style>
