<template>
  <div class="row justify-center">
    <q-card
      v-for="(holdings, index) in cosmos_delegations"
      :key="index"
      bordered
      class="my-card transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          {{ holdings.delegator_address }}
        </div>
        <q-list
          dense
          class="q-ma-none q-pa-sm"
        >
          <q-item>
            <q-item-section>
              <q-item-label overline />
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label caption>
                Delegated
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                <!-- {{ account.coins[0].amount }} {{ account.coins[0].denom }} -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>
                Unbonding
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                <!-- {{ account.coins[0].amount }} {{ account.coins[0].denom }} -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>
                Redelegating
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                <!-- {{ account.coins[0].amount }} {{ account.coins[0].denom }} -->
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section>
              <q-item-label overline>
                Rewards
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                {{ holdings.rewards_amount }} {{ holdings.denom }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
      <q-card-section>
        <q-expansion-item
          dark
          icon="account_balance"
          label="Delegations"
          header-class="text-white"
        >
          <q-list dark>
            <q-item dark>
              <q-item-section>
                <q-item-label caption>
                  <span>{{ holdings.validator_address }}</span>
                  <!-- <span class="text-grey-8"> - GitHub repository</span> -->
                </q-item-label>
                <q-item-label
                  caption
                  lines="1"
                >
                  {{ (holdings.delegation_amount / 1000000).toFixed(4) }}
                </q-item-label>
              </q-item-section>
              <q-item-section
                top
                side
              >
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    dark
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
                      dark
                      auto-close
                      content-class="bg-grey-3"
                    >
                      <q-list style="min-width: 100px">
                        <q-item clickable>
                          <q-item-section>Unbond</q-item-section>
                        </q-item>
                        <q-item clickable>
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
          </q-list>
        </q-expansion-item>
      </q-card-section>
      <q-card-actions>
        <q-btn
          dark
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
import gql from 'graphql-tag';

export default {
  name: 'AccountsTable',
  apollo: {
    cosmos_delegations: {
      query: gql`
        query CosmosHoldingsByDelegator($address: String) {
          cosmos_delegations(where: { delegator_address: { _eq: $address } }) {
            delegation_amount
            delegation_denom
            delegator_address
            rewards_amount
            rewards_denom
            validator_address
          }
          cosmos_delegator_metrics(where: { delegator_address: { _eq: $address } }) {
            total_delegated
            total_delegations
            mean_delegation_size
            stddev_delegation_size
          }
        }
      `,
      variables() {
        return {
          address: 'cosmos1fhj7pkuvwflr7z7ngp2v9tj7g58aq2tjtl56r4',
        };
      },
    },
  },
  data() {
    return {
      cosmos_delegations: [{}],

      prompt: false,
    };
  },
  methods: {
    delegate(index) {
      const address = this.activeAccounts[index];
      this.$store.commit('delegation/SET_DELEGATION_ACCOUNT', address);
      this.$store.commit('session/TOGGLE_DELEGATION_STEPS', true);
    },
    redelegate(val) {
      this.$store.dispatch('delegation/beginRedelegation', val);
    },
    getValidatorMoniker(address) {
      const validators = this.$store.state.session.validatorCandidates;
      const res = validators.find(e => e.operator_address === address);
      if (!res.description) {
        return res.operator_address;
      }
      return res.description.moniker;
    },
  },
};
</script>

<style lang="stylus" scoped></style>
