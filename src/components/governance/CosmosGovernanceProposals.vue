<template>
  <div class="row justify-center">
    <q-card
      v-for="(proposal, index) in governanceProposals"
      :key="index"

      bordered
      class="my-card transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div>
          {{ proposal.id }} - {{ proposal.title }}
        </div>
        <q-list
          dense
          text-secondary
          class="q-ma-none q-pa-sm"
        >
          <q-item>
            <q-item-section>
              <q-item-label overline>
                {{ proposal.description }}
                <!-- {"id":"2","title":"ATOM Transfer Enablement","description":"A plan is proposed to set up a testnet using the Cosmos SDK v0.34.0 release, along with mainnet conditions, plus transfer enablement and increased block size, as a testing ground. Furthermore, a path for upgrading the cosmoshub-1 chain to use the Cosmos SDK release v0.34.0, along with the necessary updates to the genesis file, at block 425000, is outlined. IPFS: https://ipfs.io/ipfs/QmaUaMjXPE6i4gJR1NakQc15TZpSqjSrXNmrS1vA5veF9W","status":"Rejected","tally":{"yes":5195610593628,"abstain":2619844783500,"no":58322135404940,"no_with_veto":43483296883256,"total":109620887665324,"yes_percent":0.04739617334143801,"abstain_percent":0.02389913856106026,"no_percent":0.5320348762637218,"no_with_veto_percent":0.3966698118337799},"submit_time":"2019-03-25T21:42:19.240550245Z","deposit_end_time":"2019-04-08T21:42:19.240550245Z","voting_start_time":"2019-03-25T23:44:04.098630937Z","voting_end_time":"2019-04-08T23:44:04.098630937Z","total_deposit":[{"denom":"uatom","amount":"521400000"}],"donutValues":[0.04739617334143801,0.5320348762637218,0.02389913856106026,0.3966698118337799],"donutPercentValues":[4.739617334143801,53.20348762637218,2.389913856106026,39.66698118337799]} -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>
                {{ proposal.description }}
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label overline>
                Delegated
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                asdf
              </q-item-label>
            </q-item-section>
          </q-item>


          <q-item>
            <q-item-section>
              <q-item-label overline>
                Pending Rewards
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                asdf
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <q-expansion-item
          :dark="dark"
          icon="account_balance"
          label="Delegations"
          header-class="text-white"
        >
          <!-- <q-list
            :dark="dark"
          >
            <q-item
              v-for="(validator, indextwo) in account.delegations"
              :key="indextwo"
              :dark="dark"
            >
              <q-item-section>
                <q-item-label caption>
                  <span>{{ validator.validator_name }}</span>
                 <span class="text-grey-8"> - GitHub repository</span>
                </q-item-label>
                <q-item-label
                  caption
                  lines="1"
                >
                  {{ (validator.shares / 1000000).toFixed(4) }}
                </q-item-label>
              </q-item-section>
              <q-item-section
                top
                side
              >
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    :dark="dark"
                    color="white"
                    size="14px"
                    flat
                    round
                    icon="more_vert"
                  >
                    <q-menu
                      transition-show="flip-right"
                      transition-hide="flip-left"
                      anchor="center left"
                      self="center right"
                      :dark="dark"
                      auto-close
                      content-class="bg-grey-3"
                    >
                      <q-list style="min-width: 100px">
                        <q-item clickable>
                          <q-item-section>Unbond</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          @click="claimRewards(account.delegations[indextwo])"
                        >
                          <q-item-section>Claim Rewards</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          @click="redelegate(validator)"
                        >
                          <q-item-section>Redelegate</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
          </q-list> -->
        </q-expansion-item>
      </q-card-section>
      <q-card-actions>
        <q-btn
          :dark="dark"
          outline
          class="q-ma-md"
          @click="delegate(index)"
        >
          Delegate
        </q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'CosmosGovernanceProposals',
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    governanceProposals: {
      get() {
        return this.$store.state.governance.govProposals.Cosmos;
      },
    },
  },
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
