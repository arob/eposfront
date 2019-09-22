<template>
  <q-page padding class="q-pa-xs">
    <div class="row q-col-gutter-xs">
      <div class="col-sm-3 com-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-sm">
              <div class="text-caption text-grey">Total Purchase</div>
            </div>
            <div class="row q-col-gutter">
              <div class="text-h5 text-grey-7">812580.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 com-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter">
              <div class="text-caption text-grey">Total Sales</div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="text-h5 text-grey-7">1001580.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 com-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-sm">
              <div class="text-caption text-grey">Gross Profit</div>
            </div>
            <div class="row q-col-gutter">
              <div class="text-h5 text-grey-7">189000.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 com-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-xs q-mt-none">
      <div class="col-sm-3 col-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-xs">
              <div class="text-caption text-grey">Cash Sales</div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="text-h5 text-grey-7">210000.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 col-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-xs">
              <div class="text-caption text-grey">Credit Sales</div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="text-h5 text-grey-7">240000.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 col-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <div class="row q-col-gutter-sm">
              <div class="text-caption text-grey">EMI Sales</div>
            </div>
            <div class="row q-col-gutter-sm">
              <div class="text-h5 text-grey-7">551580.00</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-3 col-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="row q-col-gutter-xs q-mt-none">
      <div class="col-sm-9 col-md-9 col-xs-12">
        <q-card flat square class="full-height">
          <q-table
            flat square
            :columns="tableColumns"
            row-key="id"
          >
            <template v-slot:top-left>
              <div class="text-caption text-grey-7">Upcoming Installments</div>
            </template>
          </q-table>
        </q-card>
      </div>
      <div class="col-sm-3 col-md-3 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-xs">
            <div class="text-caption">Tags / Category</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
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
    this.$store.dispatch('pageTitle', 'Dashboard')
  }
}
</script>
