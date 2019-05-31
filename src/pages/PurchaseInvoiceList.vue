<template>
  <q-page>
    <q-card flat square bordered>
      <div class="row q-col-gutter-sm">
          <div class="col-sm-12 col-md-12 col-xs-12">
            <q-table
              flat square bordered wrap-cells
              :loading="loading"
              :data="invoices"
              :columns="tableColumns"
              :filter="filter"
              row-key="id"
              :pagination.sync="pagination"
            >
              <template v-slot:top-left>
                <span class="text-h6">Purchase Invoice List</span>
              </template>
              <template v-slot:top-right>
                <q-input dense debounce="300" color="primary" v-model="filter">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn
                  round size="12px" color="red"
                  icon="add"
                  class="q-mb-none q-ml-md float-right"
                  :to="{name: 'purchase_invoice'}"
                >
                </q-btn>
              </template>
              <q-td slot="body-cell-action" slot-scope="props" :props="props">
                <q-btn-group>
                  <q-btn
                    dense color="primary" icon="visibility"
                    class="q-px-sm"
                    :to="{name: 'purchase-invoice-detail', params: {id: props.value}}"
                  />
                  <q-btn
                    dense color="secondary"
                    icon="mdi-square-edit-outline"
                    class="q-px-sm"
                  >
                  </q-btn>
                </q-btn-group>
              </q-td>
            </q-table>
          </div>
        </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PurchaseInvoiceList',
  data: () => ({
    loading: false,
    filter: '',
    invoices: [],
    tableColumns: [
      {
        name: 'invoice_number',
        align: 'left',
        label: 'Invoice No.',
        field: 'invoice_number',
        sortable: true
      },
      {
        name: 'invoice_date',
        align: 'left',
        label: 'Invoice Date',
        field: 'invoice_date',
        sortable: true
      },
      {
        name: 'supplier',
        align: 'left',
        label: 'Supplier',
        field: 'supplier_name',
        sortable: true
      },
      {
        name: 'total',
        align: 'right',
        label: 'Invoice Total',
        field: 'invoice_total',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'paid',
        align: 'right',
        label: 'Paid Amount',
        field: 'paid_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'due',
        align: 'right',
        label: 'Due Amount',
        field: 'due_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'action',
        align: 'right',
        label: 'Action',
        field: 'id'
      }
    ],
    pagination: {
      rowsPerPage: 10
    }
  }),
  methods: {
    getInvoices () {
      this.loading = true
      this.$axios.get(`purchase-invoices`)
        .then(response => {
          if (response !== null) {
            this.invoices = response.data.data
            this.loading = false
          }
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.getInvoices()
  }
}
</script>
