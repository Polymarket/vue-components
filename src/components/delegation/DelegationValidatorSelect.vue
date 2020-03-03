<template>
  <div>
    <q-select
      v-model="selectedValidator"
      :options="providers"
      label="Validator"
      clearable
      hint="Select a validator for delegation"
      color="primary"
      outlined
      text-color="secondary"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag';

const validatorsQuery = gql`
 query providers($token_name: String!) {
  providers: unionmarket_provider_union(where: {token_name: {_eq: $token_name}}) {
    value: address
    operator_address: address
    description: provider_name
    label: provider_name
  }
}`;

export default {
  name: 'ComponentName',
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
        return this.$store.state.session.networkConfig.networkNameProper;
      },
    },
    selectedValidator: {
      get() {
        return this.$store.state.delegation.targetProvider;
      },
      set(val) {
        this.$store.commit('delegation/SET_TARGET_VALIDATOR', val);
      },
    },
  },
};
</script>
