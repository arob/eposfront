<template>
  <q-page>
    <div class="absolute-center"><h3>Manufacturer ID: {{this.$route.params.id}}</h3></div>
  </q-page>
</template>

<script>
export default {
  name: 'ManufacturerDetail',
  created () {
    this.$store.dispatch('pageTitle', 'Manufacturer Detail')
  }
}
</script>
