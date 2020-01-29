<template>
  <q-page padding>
    <AddressTable />
  </q-page>
</template>

<script>
import AddressTable from '../components/AddressTable';

export default {
  name: 'GetAddress',
  components: {
    AddressTable,
  },
};
</script>
