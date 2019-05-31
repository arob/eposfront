<template>
  <q-page>
      <q-card flat bordered>
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-9 col-md-9 col-xs-12">
              <div class="row q-col-gutter-sm">
                <span class="text-h6">Sales Invoice</span>
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-sm-3 col-md-3 col-xs-6">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Type</span>
                    </template>
                    <template v-slot:control>
                      {{ sales_invoice ? sales_types[sales_invoice.sales_type].type : ''}}
                    </template>
                  </q-field>
                </div>
                <div class="col-sm-3 col-md-3 col-xs-6">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Date</span>
                    </template>
                    <template v-slot:control>
                      {{sales_invoice.invoice_date}}
                    </template>
                  </q-field>
                </div>
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">No.</span>
                    </template>
                    <template v-slot:control>
                      {{sales_invoice.invoice_number}}
                    </template>
                  </q-field>
                </div>
              </div>
              <div class="row q-col-gutter-sm q-mt-xs">
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Customer</span>
                    </template>
                    <template v-slot:control>
                      {{sales_invoice.customer}}
                    </template>
                  </q-field>
                </div>
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Notes:</span>
                    </template>
                    <template v-slot:control>
                      {{sales_invoice.notes}}
                    </template>
                  </q-field>
                </div>
              </div>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 q-mt-lg">
              <q-card flat class="q-mt-sm">
                <q-card-section class="q-pa-none">
                  <q-field dense class="bg-black" style="height:90px">
                    <template v-slot:control>
                      <div v-cloak class="full-width text-right q-pr-md">
                        <span class="text-h4 text-lime-14">
                          {{ new Intl.NumberFormat('en-IN').format(sales_invoice.invoice_total) }}
                        </span>
                      </div>
                    </template>
                  </q-field>
                </q-card-section>
              </q-card>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mb-sm">
            <div class="col-sm-2 col-md-2 col-xs-4 text-right">
            </div>
            <div class="col-sm-2 col-md-2 col-xs-4">
            </div>
            <div class="col-sm-2 col-md-2 col-xs-4">
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <q-card flat bordered>
                <q-table
                  flat
                  :data="sales_invoice.items"
                  :columns="tableColumns"
                  no-data-label="No items added"
                  row-key="__index"
                >
                  <template v-slot:bottom>
                    <div class="col-sm-5 col-md-5 col-xs-5">
                      <span class="text-subtitle2 text-bold">Records: </span>
                      <span class="text-subtitle2 text-bold text-black">
                        {{sales_invoice.items.length}}</span>
                    </div>
                    <div class="col-sm-7 col-md-7 col-xs-7 text-right">
                      <span class="text-subtitle2 text-bold">Total: </span>
                      <span class="text-subtitle2 text-bold text-black">
                        {{ new Intl.NumberFormat('en-IN')
                          .format(sales_invoice.invoice_total) }}
                      </span>
                    </div>
                  </template>
                </q-table>
              </q-card>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-md">
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-field dense filled>
                <template v-slot:prepend>
                  <span class="text-body2">Paid</span>
                </template>
                <template v-slot:control>
                  <div class="full-width text-right">
                    {{new Intl.NumberFormat('en-IN').format(sales_invoice.paid_amount)}}
                  </div>
                </template>
              </q-field>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-field dense filled>
                 <template v-slot:prepend>
                  <span class="text-body2">Due</span>
                </template>
                <template v-slot:control>
                  <div class="full-width text-right">
                    {{new Intl.NumberFormat('en-IN').format(sales_invoice.due_amount)}}
                  </div>
                </template>
              </q-field>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-btn
                label="print" color="primary"
                class="full-width" icon="printer">
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'SalesInvoiceDetail',
  data: () => ({
    sales_types: [
      { id: 0, type: 'Cash' },
      { id: 1, type: 'Credit' },
      { id: 2, type: 'EMI / Installment' }
    ],
    sales_invoice: '',
    tableColumns: [
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'model',
        align: 'left',
        label: 'Model',
        field: 'model',
        sortable: true
      },
      {
        name: 'sales_rate',
        align: 'right',
        label: 'Rate',
        field: 'sales_rate'
      },
      {
        name: 'discount',
        align: 'right',
        label: 'Discount',
        field: 'discount_amount'
      },
      {
        name: 'vat',
        align: 'right',
        label: 'VAT Amount',
        field: 'vat_amount'
      },
      {
        name: 'tax',
        align: 'right',
        label: 'Tax Amount',
        field: 'tax_amount'
      },
      {
        name: 'quantity',
        align: 'right',
        label: 'Quantity',
        field: 'product_qty'
      },
      {
        name: 'subtotal',
        align: 'right',
        label: 'Subtotal',
        field: 'subtotal'
      }
    ]
  }),
  methods: {
    getPurchaseInvoice () {
      this.$axios.get(`sales-invoices/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.sales_invoice = response.data.data
            // console.log(response.data.data)
          }
        })
    }
  },
  computed: {
  },
  created () {
    this.getPurchaseInvoice()
    console.log(this.sales_invoice)
  }
}
</script>
