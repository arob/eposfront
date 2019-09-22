<template>
  <q-page>
    <q-card flat id="invoice">
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-6 col-md-6 col-xs-6">
            <span class="text-caption">To</span><br>
            <span class="text-subtitle2">
              {{sales_invoice.customer ? sales_invoice.customer.name : ''}}
            </span>
            <span class="text-caption">
              ({{sales_invoice.customer ? sales_invoice.customer.contact_number : ''}})
            </span><br>
            <span class="text-caption">
              {{sales_invoice.customer ? sales_invoice.customer.address: ''}},
            </span>
            <span class="text-caption">
              {{sales_invoice.customer ? sales_invoice.customer.thana.name : ''}},
            </span><br>
            <span class="text-caption">
              {{sales_invoice.customer ? sales_invoice.customer.district.name: ''}},
            </span>
            <span class="text-caption">
              {{sales_invoice.customer ? sales_invoice.customer.country.name: ''}}
            </span>
          </div>
          <div class="col-sm-6 col-md-6 col-xs-6 text-right">
            <span class="text-subtitle2">
              Date: {{sales_invoice.invoice_date}}
            </span><br>
              SALES INVOICE NO. <br>
            <span class="invoice-number text-subtitle2">
              {{sales_invoice.invoice_number}}
            </span><br>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-12 col-md-12 col-xs-12">
            <table id="items" class="q-mt-lg">
              <tr>
                <th>Details</th>
                <th class="text-right">Subtotal</th>
              </tr>
              <tr v-for="(item, index) in sales_invoice.items" :key="index">
                <td style="width:70%">
                  <span class="text-subtitle2">
                      {{item.model}} ({{item.name}})
                    </span>
                    <br />
                    <span class="text-caption text-italic"
                    v-show="item.sales_rate > 0"
                    >
                      Unit Price {{item.sales_rate | currency}}
                    </span>
                    <span
                      class="text-caption text-italic"
                      v-show="item.vat_amount > 0"
                    >
                      VAT: {{item.vat_amount | currency}}
                    </span>
                    <span
                      class="text-caption text-italic"
                      v-show="item.tax_amount > 0"
                    >
                      Tax: {{item.tax_amount | currency}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="item.discount_amount > 0">
                      Discount: {{item.discount_amount | currency}}
                    </span>
                </td>
                <td class="text-right">{{item.subtotal | currency}}</td>
              </tr>
            </table>
            <table class="q-mt-md">
              <tr>
                <td style="width:70%">Invoice Total</td>
                <td style="width:30%" class="text-right">
                  {{sales_invoice.invoice_total}}
                </td>
              </tr>
              <tr>
                <td style="width:70%">Paid Amount</td>
                <td style="width:30%" class="text-right">
                  {{sales_invoice.paid_amount}}
                </td>
              </tr>
              <tr>
                <td style="width:70%">Due Amount</td>
                <td style="width:30%" class="text-right">
                  {{sales_invoice.due_amount}}
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="row q-col-gutter-sm signatures">
          <div class="col-sm-6 col-md-6 col">
            <span class="text-caption text-overline">
              {{sales_invoice.created_by}} (Salesperson) </span>
          </div>
          <div class="col-sm-6 col-md-6 col text-right text-overline">
            <span class="text-caption">
              {{sales_invoice.customer ? sales_invoice.customer.name : ''}} (Customer)
            </span>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-md-auto">
            <q-btn small class="print-hide q-mt-lg q-mr-sm"
              label="print"
              icon="print"
              color="red"
              @click="printInvoice"
            ></q-btn>
            <q-btn small class="print-hide q-mt-lg q-mr-sm"
              label="invoice list"
              icon="list"
              color="red"
              :to="{path: `/sales-invoice-list`}"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PrintSalesInvoice',
  data: () => ({
    sales_invoice: {},
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
            console.log(this.sales_invoice)
          }
        })
    },
    printInvoice () {
      window.print()
    }
  },
  computed: {
  },
  beforeMount () {
    this.getSalesInvoice()
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>

<style scoped>
  .invoice-number {
    border: 1px solid #ddd;
    padding: 5px 8px;
  }

  table, td {
    width: 100%;
    padding: 5px;
    border: 1px solid #eee;
    border-collapse: collapse;
  }
 #items td, #items th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  #items {
    padding: 5px;
    border-collapse: collapse;
  }

  .signatures {
    margin-top: 75px;
  }

  .text-overline {
    text-decoration: overline;
  }
  #invoice {
    width: 800px;
    margin: 0 auto;
  }
</style>
