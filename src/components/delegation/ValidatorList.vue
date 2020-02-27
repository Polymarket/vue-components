<template>
  <div>
    <q-list
      bordered
      class="rounded-borders"
      style="max-width: 900px"
    >
      <q-item-label header>
        Providers
      </q-item-label>

      <q-item
        v-for="(p, index) in providers"
        :key="index"
        v-ripple
        clickable
        class="q-ma-sm"
      >
        <q-item-section
          avatar
          top
        >
          <q-avatar>
            <img :src="p.logo">
          </q-avatar>
        </q-item-section>

        <q-item-section top>
          <q-item-label overflow-auto>
            <span class="text-weight-bold">{{ p.label }}</span>
          </q-item-label>
          <q-item-label>
            {{ p.location }}
          </q-item-label>
        </q-item-section>
        <q-item-section
          top
          side
        >
          <div class="text-grey-9 q-gutter-xs">
            <ValidatorMenuPopupButton />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import ValidatorMenuPopupButton from 'src/components/common/button/ValidatorMenuPopupButton';

const validatorsQuery = gql`
 query providers($token_name: String!) {
  providers: unionmarket_provider_union(where: {token_name: {_eq: $token_name}}) {
    value: address
    operator_address: address
    description: provider_name
    label: provider_name
    logo
    location
    token_name
  }
}`;

export default {
  name: 'ValidatorList',
  components: {
    ValidatorMenuPopupButton,
  },
  apollo: {
    providers: {
      query: validatorsQuery,
      variables() {
        return {
          token_name: this.currentNetwork,
        };
      },
    },
  },
  data() {
    return {
      providers: [{}],
    };
  },
  computed: {
    currentNetwork: {
      get() {
        return this.$store.state.session.networkName;
      },
    },
    currentNetworkProviders: {
      get() {
        return this.providers[this.currentNetwork];
      },
    },
    selectedValidator: {
      get() {
        return this.$store.state.delegation.targetValidator;
      },
      set(val) {
        this.$store.commit('delegation/SET_TARGET_VALIDATOR', val);
      },
    },
  },
};
</script>
