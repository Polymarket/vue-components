<template>
  <q-page padding>
    <DelegationEntry />
  </q-page>
</template>

<script>
import DelegationEntry from '../components/delegation/DelegationEntry';

export default {
  name: 'Delegation',
  components: {
    DelegationEntry,
  },
};
</script>
