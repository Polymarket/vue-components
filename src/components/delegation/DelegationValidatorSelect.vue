<template>
  <q-select
    v-model="selectedValidator"
    :options="currentNetworkProviders"
    label="Validator"
    clearable
    hint="Select a validator for delegation"
    color="primary"
    outlined
    text-color="secondary"
  />
</template>

<script>
import gql from 'graphql-tag';

const validators = gql`
  query {
  cosmos: cosmos_cosmosproviders {
    value: address
    operator_address: address
    description: provider_name
    label: provider_name
  }
  iris: irisnet_irisproviders {
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
      query: validators,
      update(data) {
        return data;
      },
    },
  },
  data() {
    return {
      providers: {
        cosmos: [{}],
        iris: [{}],
      },

    };
  },
  computed: {
    currentNetwork: {
      get() {
        return this.$store.state.session.network;
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
