<template>
  <div
    class="q-pa-md"
    style="max-width: 500px"
  >
    <div class="q-gutter-md">
      <q-select
        v-model="selectedValidator"

        :options="cosmos_cosmosproviders"
        label="Validator"
        clearable
        hint="Select a validator for delegation"
        color="white"
        standout
        outlined
        text-color="white"
      />


      <q-input
        v-model="amount"
        dark
        outlined
        bottom-slots
      >
        <template v-slot:hint>
          Delegation Amount
        </template>
      </q-input>
      <q-btn
        text-color="white"
        dark
        :disabled="disabled"
        outline
        label="Delegate"
        @click="beginDelegation()"
      />
    </div>
  </div>
  <!-- <div
    class="q-pa-md"
    style="max-width: 600px"
  >
    <div
      class="self-center no-outline"
      tabindex="0"
    >
      <q-select
        v-model="selectedValidator"
        :optons="validators"
        dark
        filled
        label="Single"
        style="width: 250px"
      >
        <template v-slot:hint>
              Select a validator
            </template>

            <template v-slot:after>
              <q-btn
                dark
                round
                flat
                icon="send"
                @click="addAddress()"
              />
            </template> -->
  <!-- </q-select> -->
  <!--
          <q-input
            v-model="address"
            dark
            outlined
            bottom-slots
            counter
            maxlength="45"
          >
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>

            <template v-slot:hint>
              Enter an address
            </template>

            <template v-slot:after>
              <q-btn
                dark
                round
                flat
                icon="send"
                @click="addAddress()"
              />
            </template>
          </q-input>

          <q-input
            v-model="address"
            dark
            outlined
            bottom-slots
            counter
            maxlength="45"
          >
            <template v-slot:append>
              <q-icon
                v-if="text !== ''"
                name="close"
                class="cursor-pointer"
                @click="text = ''"
              />
            </template>

            <template v-slot:hint>
              Enter an address
            </template>

            <template v-slot:after>
              <q-btn
                dark
                round
                flat
                icon="send"
                @click="addAddress()"
              />
            </template>
          </q-input>
    </div>
  </div> -->
</template>
<script>

import gql from 'graphql-tag';

const validators = gql`
  query {
  cosmos_cosmosproviders {
    value: address
    operator_address: address
    description: union_score
    label: provider_name
  }
}`;

export default {
  apollo: {
    cosmos_cosmosproviders: {
      query: validators,
    },
  },


  // name: 'ComponentName',
  data() {
    return {
      cosmos_cosmosproviders: [{}],
    };
  },
  computed: {
    selectedValidator: {
      get() {
        return this.$store.state.delegation.targetValidator;
      },
      set(val) {
        this.$store.commit('delegation/SET_TARGET_VALIDATOR', val);
      },
    },
    amount: {
      get() {
        return this.$store.state.delegation.amount;
      },
      set(val) {
        this.$store.commit('delegation/SET_AMOUNT', val);
      },
    },
    disabled() {
      if (this.selectedValidator !== null && parseFloat(this.amount) > 0) {
        return false;
      }
      return true;
    },
  },
  methods: {
    beginDelegation() {
      this.$store.dispatch('delegation/beginDelegation', parseFloat(this.amount));
    },
  },
};
</script>

<style>
</style>
