<template>
  <div>
    <q-tabs
      v-model="tab"
      active-color="secondary"
      indicator-color="secondary"
      align="center"
      class="text-primary"
    >
      <q-tab
        label="Info"
        name="description"
      />
      <q-tab
        label="Results"
        name="tally"
      />
      <q-tab
        label="Timeline"
        name="timeline"
      />
      <q-tab
        v-if="proposal.votes"
        label="Votes"
        name="votes"
      />
    </q-tabs>
    <q-separator />
    <q-card-section class="q-ma-xs q-pa-xs">
      <q-tab-panels v-model="tab">
        <q-tab-panel name="description">
          <div class="text-grey-8 items-center">
            <q-scroll-area style="height: 200px; max-width: 300px;">
              {{ proposal.description }}
            </q-scroll-area>
          </div>
        </q-tab-panel>
        <q-tab-panel name="tally">
          <GovTallyChart :proposal="proposal" />
        </q-tab-panel>
        <q-tab-panel name="timeline">
          <GovProposalCalendarList :proposal="proposal" />
        </q-tab-panel>
        <q-tab-panel
          v-if="proposal.votes"
          name="votes"
        >
          <GovProposalVotesList :votes="proposal.votes" />
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
  </div>
</template>


<script>
import GovTallyChart from '../chart/GovTallyChart';
import GovProposalCalendarList from './GovProposalCalendarList';
import GovProposalVotesList from './GovProposalVotesList';


export default {
  name: 'GovernanceCardTabPanel',
  components: {
    GovTallyChart,
    GovProposalCalendarList,
    GovProposalVotesList,
  },
  props: {
    proposal: {
      type: Object,
      required: false,
      default: Object.assign({}),
    },
  },
  data() {
    return {
      tab: 'tally',
    };
  },
};
</script>

<style>

</style>
