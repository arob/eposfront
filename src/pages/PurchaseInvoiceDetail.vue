<template>
  <q-page>
      <q-card flat bordered>
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-9 col-md-9 col-xs-12">
              <div class="row q-col-gutter-sm">
                <span class="text-h6">Purchase Invoice</span>
              </div>
              <div class="row q-col-gutter-sm">
                <div class="col-sm-3 col-md-3 col-xs-5">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Date:</span>
                    </template>
                    <template v-slot:control>
                      {{purchase_invoice.invoice_date}}
                    </template>
                  </q-field>
                </div>
                <div class="col-sm-3 col-md-3 col-xs-7">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">No.</span>
                    </template>
                    <template v-slot:control>
                      {{purchase_invoice.invoice_number}}
                    </template>
                  </q-field>
                </div>
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Supplier:</span>
                    </template>
                    <template v-slot:control>
                      {{purchase_invoice.supplier}}
                    </template>
                  </q-field>
                </div>
              </div>
              <div class="row q-col-gutter-sm q-mt-xs">
                <div class="col-sm-12 col-md-12 col-xs-12">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Notes:</span>
                    </template>
                    <template v-slot:control>
                      {{purchase_invoice.notes}}
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
                          {{ new Intl.NumberFormat('en-IN').format(purchase_invoice.invoice_total) }}
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
                  :data="purchase_invoice.items"
                  :columns="tableColumns"
                  no-data-label="No items added"
                  row-key="__index"
                >
                  <template v-slot:bottom>
                    <div class="col-sm-5 col-md-5 col-xs-5">
                      <span class="text-subtitle2 text-bold">Records: </span>
                      <span class="text-subtitle2 text-bold text-black">
                        {{purchase_invoice.items.length}}</span>
                    </div>
                    <div class="col-sm-7 col-md-7 col-xs-7 text-right">
                      <span class="text-subtitle2 text-bold">Total: </span>
                      <span class="text-subtitle2 text-bold text-black">
                        {{ new Intl.NumberFormat('en-IN')
                          .format(purchase_invoice.invoice_total) }}
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
                    {{new Intl.NumberFormat('en-IN').format(purchase_invoice.paid_amount)}}
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
                    {{new Intl.NumberFormat('en-IN').format(purchase_invoice.due_amount)}}
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
  name: 'PurchaseInvoiceDetail',
  data: () => ({
    purchase_invoice: {},
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'product_name', sortable: true },
      { name: 'model', align: 'left', label: 'Model', field: 'product_model', sortable: true },
      { name: 'rate', align: 'right', label: 'Rate', field: 'purchase_rate', sortable: true },
      { name: 'quantity', align: 'right', label: 'Quantity', field: 'product_qty', sortable: true },
      {
        name: 'subtotal',
        align: 'right',
        label: 'Subtotal',
        field: 'subtotal',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      }
    ]
  }),
  methods: {
    getPurchaseInvoice () {
      this.$axios.get(`purchase-invoices/${this.$route.params.id}`)
        .then(response => {
          if (response !== null) {
            this.purchase_invoice = response.data.data
            console.log(response.data.data)
          }
        })
    }
  },
  computed: {
  },
  created () {
    this.getPurchaseInvoice()
  }
}
</script>
