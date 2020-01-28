<template>
  <q-page class="flex flex-center">
    Welcome
    <LedgerConnectButton />
  </q-page>
</template>

<script>
import LedgerConnectButton from '../components/LedgerConnectButton';

export default {
  name: 'PageIndex',
  components: {
    LedgerConnectButton,
  },
};
</script>
