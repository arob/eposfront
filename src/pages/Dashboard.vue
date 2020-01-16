<template>
  <q-page padding class="q-pa-xs">
  </q-page>
</template>

<script>
export default {
  name: 'Dashboard',
  data () {
    return {
      totalPurchase: '',
      tableColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'amount', align: 'right', label: 'Amount', field: 'amount', sortable: true },
        { name: 'due_date', align: 'left', label: 'Due Date', field: 'due_date', sortable: true },
        {
          name: 'contact_number',
          align: 'left',
          label: 'Contact Number',
          field: 'contact_number',
          sortable: true
        },
        { name: 'update', align: 'right', field: 'id' }
      ]
    }
  },
  methods: {
  },
  computed: {
    pageTitle: () => this.$store.state.pageTitle
  },
  created () {
    this.$store.dispatch('pageTitle', 'Main Dashboard')
  }
}
</script>
