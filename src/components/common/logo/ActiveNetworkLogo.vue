<template>
  <q-avatar>
    <img :src="logoURL">
  </q-avatar>
</template>

<script>
export default {
  name: 'ActiveNetworkLogo',
  data() {
    return {};
  },
  computed: {
    logoURL: {
      get() {
        return `statics/logos/${this.$store.state.session.networkConfig.networkNameLC}.svg`;
      },
    },
  },
};
</script>
