<template>
  <div>
    <q-tabs
      v-model="tab"
      active-color="secondary"
      indicator-color="secondary"
      align="justify"
      class="text-primary"
    >
      <q-tab
        label="Description"
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
        label="Votes"
        name="votes"
      />
    </q-tabs>
    <q-separator />
    <q-card-section>
      <q-tab-panels v-model="tab">
        <q-tab-panel name="description">
          <q-scroll-area
            s
            class="q-ma-none"
          >
            <div class="text-grey-8 items-center">
              {{ proposal.description }}
            </div>
          </q-scroll-area>
        </q-tab-panel>
        <q-tab-panel name="tally">
          <GovTallyChart :proposal="proposal" />
        </q-tab-panel>
        <q-tab-panel name="timeline">
          <GovProposalCalendarList :proposal="proposal" />
        </q-tab-panel>
        <q-tab-panel name="votes">
          Coming Soon
        </q-tab-panel>
      </q-tab-panels>
    </q-card-section>
    <q-separator />
  </div>
</template>


<script>
import GovTallyChart from '../chart/GovTallyChart';
import GovProposalCalendarList from './GovProposalCalendarList';

export default {
  name: 'GovernanceCardTabPanel',
  components: {
    GovTallyChart,
    GovProposalCalendarList,
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
