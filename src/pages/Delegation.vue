<template>
  <q-page padding>
    <ValidatorList />
  </q-page>
</template>

<script>
import ValidatorList from '../components/common/ValidatorList';

export default {
  name: 'Delegation',
  components: {
    ValidatorList,
  },
};
</script>
