<template>
  <q-page>
      <q-card flat bordered>
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-9 col-md-9 col-xs-12">
              <div class="row q-col-gutter-sm">
                <div class="col-sm-3 col-md-3 col-xs-6">
                  <q-field dense filled>
                    <template v-slot:prepend>
                      <span class="text-caption">Type</span>
                    </template>
                    <template v-slot:control>
                      {{ sales_invoice ? sales_types[sales_invoice.sales_type].type : '' }}
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
                      {{sales_invoice.customer ? sales_invoice.customer.name : ''}}
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
            <div class="col-sm-3 col-md-3 col-xs-12 print-hide">
              <q-card flat>
                <q-card-section class="q-pa-none">
                  <q-field dense class="bg-black" style="height:90px">
                    <template v-slot:control>
                      <div v-cloak class="full-width text-right q-pr-md">
                        <span class="text-h4 text-lime-14">
                          {{ sales_invoice.invoice_total | currency }}
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
            <div class="col-sm-12 col-md-12 col-xs-12 q-mt-md">
              <q-card flat square bordered>
                <q-table
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :data="sales_invoice.items"
                  :columns="itemColumns"
                  :pagination.sync="pagination"
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
                        {{ sales_invoice.invoice_total | currency }}
                      </span>
                    </div>
                  </template>
                </q-table>
              </q-card>
            </div>
          </div>
          <div class="row q-col-gutter-xs q-mt-md">
            <div class="col-sm-7 col-md-7 col-xs-12">
              <q-card
                class="full-height"
                flat square bordered
                v-show="showInstallments"
              >
                <q-table
                  falt
                  :table-header-style="{ backgroundColor: '#f7f7f7' }"
                  :data="sales_invoice.installments"
                  :columns="installmentColumns"
                ></q-table>
              </q-card>
            </div>
            <div class="col-sm-4 col-md-4 col-xs-12 offset-sm-1 offset-md-1 offset-xs-none">
              <q-card flat square bordered class="full-height">
                <q-card-section class="q-pa-sm">
                  <div class="row q-col-gutter-xs">
                    <div class="col-sm-12 col-md-12 col-xs-12">
                      <q-field dense filled>
                        <template v-slot:prepend>
                          <span class="text-body2">Paid</span>
                        </template>
                        <template v-slot:control>
                          <div class="full-width text-right">
                            {{sales_invoice.paid_amount | currency}}
                          </div>
                        </template>
                      </q-field>
                    </div>
                  </div>
                  <div class="row q-col-gutter-xs q-mt-xs">
                    <div class="col-sm-12 col-md-12 col-xs-12">
                      <q-field dense filled>
                         <template v-slot:prepend>
                          <span class="text-body2">Due</span>
                        </template>
                        <template v-slot:control>
                          <div class="full-width text-right">
                            {{sales_invoice.due_amount | currency}}
                          </div>
                        </template>
                      </q-field>
                    </div>
                  </div>
                  <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
                    <div class="row q-col-gutter-sm q-mt-sm">
                      <div class="col-sm-6 col-md-6 col-xs-12">
                        <q-btn
                          dense label="preview" color="primary"
                          class="full-width print-hide" icon="printer"
                          :to="{path: `/print/sales-invoices/${this.$route.params.id}`}"
                          >
                        </q-btn>
                      </div>
                      <div class="col-sm-6 col-md-6 col-xs-12">
                        <q-btn
                          dense label="invoice list" color="secondary"
                          class="full-width print-hide" icon="list"
                          :to="{path: '/sales-invoice-list'}"
                          >
                        </q-btn>
                      </div>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
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
    itemColumns: [
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
        label: 'Sales Rate',
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
    ],
    installmentColumns: [
      {
        name: 'installment_number',
        align: 'right',
        label: 'EMI Number',
        field: 'installment_number'
      },
      {
        name: 'installment_amount',
        align: 'right',
        label: 'EMI Amount',
        field: 'installment_amount'
      },
      {
        name: 'due_date',
        align: 'center',
        label: 'Due Date',
        field: 'due_date'
      }
    ],
    pagination: {
      rowsPerPage: 0
    }
  }),
  methods: {
    getSalesInvoice () {
      this.$axios.get(`sales-invoices/${this.$route.params.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          if (response !== null) {
            this.sales_invoice = response.data.data
            // console.log(this.sales_invoice)
          }
        })
    }
  },
  computed: {
    showInstallments () {
      if (this.sales_invoice.installments && this.sales_invoice.installments.length) {
        return true
      }
      return false
    }
  },
  beforeMount () {
    this.getSalesInvoice()
    this.$store.dispatch('pageTitle', `Sales Invoice Detail`)
    // console.log(this.sales_invoice)
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>

<style scoped>
</style>
