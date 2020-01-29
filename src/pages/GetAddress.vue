<template>
  <q-page padding>
    <AddressViewer />
  </q-page>
</template>

<script>
import AddressViewer from '../components/AddressViewer';

export default {
  name: 'GetAddress',
  components: {
    AddressViewer,
  },
};
</script>
