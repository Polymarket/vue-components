<template>
  <div
    class="q-pa-md"
    style="max-width: 500px"
  >
    <div class="q-gutter-md">
      <DelegationValidatorSelect />


      <DelegationAmountInput />
      <BeginDelegationButton />
    </div>
  </div>
  <!-- <div
    class="q-pa-md"
    style="max-width: 600px"
  >
    <div
      class="self-center no-outline"
      tabindex="0"
    >BeginDelegationDelegationAmountInputButton
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
import BeginDelegationButton from '../../components/delegation/BeginDelegationButton';
import DelegationAmountInput from '../../components/delegation/DelegationAmountInput';
import DelegationValidatorSelect from '../../components/delegation/DelegationValidatorSelect';

export default {
  components: {
    BeginDelegationButton,
    DelegationAmountInput,
    DelegationValidatorSelect,
  },


  // name: 'ComponentName',
  data() {
    return {
    };
  },


};
</script>

<style>
</style>
