<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/sad.svg"
        style="width:100vw; max-width:220px;"
      >
    </p>
    <h6>Sorry, nothing here...<strong>(404)</strong></h6>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Go home</q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  created () {
    this.$store.dispatch('pageTitle', 'Error!')
  }
}
</script>
