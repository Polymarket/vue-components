<template>
  <div class="row justify-center">
    <q-card
      v-for="(account, index) in activeAccounts"
      :key="index"
      :dark="dark"
      bordered
      class="my-card transparent q-ma-lg q-pa-none"
      style="width: 100%; max-width: 500px"
    >
      <q-card-section>
        <div class="text-h7">
          {{ account.address }}
        </div>
        <q-list
          :dark="dark"
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
              <q-item-label overline>
                Available
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-item-label overline>
                {{ account.coins[0].amount }} {{ account.coins[0].denom }}
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
                {{ totalDelegated(account) }}
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
                {{ account.pendingRewards }}
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
          <q-list
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
                  <!-- <span class="text-grey-8"> - GitHub repository</span> -->
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
          </q-list>
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
import theme from '../mixins/theme';

export default {
  name: 'AccountsTable',
  mixins: [theme],
  data() {
    return {
      prompt: false,
    };
  },
  computed: {
    accounts: {
      get() {
        return this.$store.state.account.accounts;
      },
    },
    activeAccounts: {
      get() {
        return this.accounts.filter(e => e.address !== '');
      },
    },
  },
  methods: {
    totalDelegated(account) {
      let total = 0;
      account.delegations.forEach((delegation) => {
        if (delegation.shares > 0) {
          total += parseFloat(delegation.shares);
          console.log(delegation);
        }
      });
      return total;
    },
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
    claimRewards(delegation) {
      console.log(delegation);
    },
  },
};
</script>

<style lang="stylus" scoped>

</style>
