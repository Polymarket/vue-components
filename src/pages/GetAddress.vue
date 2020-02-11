<template>
  <q-page padding>
    <AddressViewerBasic />
    <AddressViewerDetailed />
  </q-page>
</template>

<script>
import AddressViewerBasic from '../components/address/AddressViewerBasic';
import AddressViewerDetailed from '../components/address/AddressViewerDetailed';

export default {
  name: 'GetAddress',
  components: {
    AddressViewerBasic,
    AddressViewerDetailed,
  },
};
</script>
