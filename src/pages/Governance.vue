<template>
  <q-page>
    <template>
      <div>
        <q-splitter
          v-model="splitterModel"
          style="height: 100%x"
        >
          <template v-slot:before>
            <q-tabs
              v-model="tab"
              vertical
            >
              <q-tab
                name="cosmos"
                icon="language"
                label="Cosmos"
                class="bg-primary text-secondary text-center"
              />
              <q-tab
                name="iris"
                icon="power"
                label="IRIS"
                class="bg-primary text-secondary text-center"
              />
            </q-tabs>
          </template>

          <template v-slot:after>
            <q-tab-panels
              v-model="tab"
              animated
              transition-prev="jump-up"
              transition-next="jump-up"
            >
              <q-tab-panel name="cosmos">
                <div class="text-h4 q-mb-md">
                  <CosmosGovernanceProposals />
                </div>
              </q-tab-panel>

              <q-tab-panel name="iris">
                <div class="text-h4 q-mb-md">
                  Iris
                </div>
              </q-tab-panel>
            </q-tab-panels>
          </template>
        </q-splitter>
      </div>
    </template>
  </q-page>
</template>

<script>
import CosmosGovernanceProposals from '../components/governance/CosmosGovernanceProposals';

export default {
  name: 'Governance',
  components: {
    CosmosGovernanceProposals,
  },
  data() {
    return {
      tab: 'cosmos',
      splitterModel: 15,
    };
  },
  mounted() {
    this.fetchGovernanceData();
  },
  methods: {
    fetchGovernanceData() {
      this.$store.dispatch('governance/fetchGovernanceProposals');
    },
  },
};
</script>
