<template>
  <q-page>
    <q-card flat bordered>
      <q-card-section>
        <q-form ref="voucherFrom">
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'AccVoucher',
  data () {
    return {
      AccVoucher: {},
      AccVouchers: []
    }
  },
  methods: {
  },
  mounted () {
    this.$store.dispatch('pageTitle', 'Account Voucher')
  },
  created () {
    this.getCategories()
    this.getHeads()
  }
}
</script>
