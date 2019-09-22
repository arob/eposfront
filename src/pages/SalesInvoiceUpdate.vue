<template>
  <q-page id="printMe">
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
                      <!-- ({{sales_invoice.customer.contact_number}}) -->
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
            <div class="col-sm-3 col-md-3 col-xs-12">
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
          <div class="row q-col-gutter-xs q-mt-md">
              <div class="col-sm-4 col-md-4 col-xs-12">
                <q-select
                    dense no-error-icon use-input outlined square
                    hide-dropdown-icon
                    transition-show="scale"
                    transition-hide="scale"
                    ref="selectProduct"
                    input-debounce="0"
                    stack-label label="Product"
                    v-model="selected"
                    :options="productOptions"
                    :option-label="(product) => product ? product.name + ': ' + product.model : ''"
                    option-value="id"
                    map-options
                    @filter="filterProducts"
                    @input="productSelected"
                  >
                    <template v-slot:option="scope">
                      <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                        <q-item-section>
                          <q-item-label class="text-primary text-bold">
                            {{scope.opt.model}}
                          </q-item-label>
                          <q-item-label caption>
                            {{ scope.opt.name }} ({{scope.opt.sales_rate}})
                          </q-item-label>
                          <q-item-label caption>
                            VAT: {{ scope.opt.vat_pct }}% Tax: {{scope.opt.tax_pct}}%
                            Discount:{{scope.opt.vat_pct}}%
                          </q-item-label>
                        </q-item-section>
                      </q-item>
                    </template>
                    <template v-slot:selected-item="scope">
                      <span class="text-primary text-bold">{{scope.opt.model}} </span>
                      <span class="text-grey-7 q-ml-xs">{{scope.opt.name}}</span>
                    </template>
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-red">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>
                  </q-select>
              </div>
              <div class="col-sm-2 col-md-2 col-xs-4">
                <q-input
                  dense filled readonly square no-error-icon
                  stack-label
                  ref="productPrice"
                  label="Price"
                  v-model="product_rate"
                ></q-input>
              </div>

              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense filled readonly square no-error-icon
                  stack-label label="VAT"
                  ref="vatAmount"
                  v-model.number="vat_amount"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense filled readonly square no-error-icon
                  stack-label
                  label="Tax"
                  ref="taxAmount"
                  v-model.number="tax_amount"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense no-error-icon outlined square
                  ref="discountAmount"
                  stack-label label="Discount"
                  type="number"
                  min="0"
                  v-model="discount_amount"
                  @keypress.enter="addItem"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input class="text-right full-width"
                  dense no-error-icon outlined square
                  stack-label
                  label="Quantity"
                  type="number"
                  ref="quantity"
                  min="1"
                  v-model="product_qty"
                  @keypress.enter="addItem"
                ></q-input>
              </div>
              <div class="col-sm-2 col-md-2 col-xs-4">
                <q-field dense filled square>
                  <template v-slot:control>
                    <span class="full-width text-right">
                      {{subtotal | currency}}
                    </span>
                  </template>
                  <template v-slot:after>
                    <q-btn
                      dense color="secondary"
                      class="full-width" icon="add"
                      @click="addItem"
                    ></q-btn>
                  </template>
                </q-field>
              </div>
            </div>
          <!-- <div class="row q-col-gutter-sm q-mb-sm">
            <div class="col-sm-2 col-md-2 col-xs-4 text-right">
            </div>
            <div class="col-sm-2 col-md-2 col-xs-4">
            </div>
            <div class="col-sm-2 col-md-2 col-xs-4">
            </div>
          </div> -->
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <q-table
            flat grid bordered
            hide-header
            :data="sales_invoice.items"
            :columns="tableColumns"
            :pagination.sync="pagination"
            no-data-label="No items added"
            row-key="__index"
          >
          <template v-slot:item="props">
            <q-card square flat class="full-width q-mt-xs">
              <q-card-section class="q-pa-sm">
                <div class="row q-col-gutter-xs">
                  <div class="col-sm-9 col-md-9 col-xs-12">
                    <span class="text-subtitle1">
                      {{props.row.model}} ({{props.row.name}})
                    </span>
                    <br />
                    <span class="text-caption text-italic"
                    v-show="props.row.sales_rate > 0"
                    >
                      Price {{props.row.sales_rate | currency}}
                    </span>
                    <span
                      class="text-caption text-italic"
                      v-show="props.row.vat_amount > 0"
                    >
                      VAT: {{props.row.vat_amount | currency}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="props.row.tax_amount > 0"
                    >
                      Tax: {{props.row.tax_amount | currency}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="props.row.discount_amount > 0">
                      Discount: {{props.row.discount_amount | currency}}
                    </span>
                  </div>
                  <div class="col-sm-1 col-md-1 col-xs-6 q-mt-sm">
                    {{props.row.product_qty}}
                  </div>
                  <div class="col-sm-2 col-md-2 col-xs-4">
                    <q-field dense borderless>
                      <template v-slot:control>
                        <div class="full-width text-right no-outline">
                          {{props.row.subtotal | currency}}
                        </div>
                      </template>
                      <template v-slot:after>
                        <q-btn
                          round
                          color="secondary"
                          size="11px"
                          icon="remove"
                          @click="removeItem(props.row.__index)"
                        ></q-btn>
                      </template>
                    </q-field>
                  </div>
                </div>
              </q-card-section>
              <q-separator />
            </q-card>
          </template>
          <template v-slot:bottom>
            <div class="col-sm-5 col-md-5 col-xs-5">
              <span class="text-subtitle2 text-bold">Records: </span>
              <span class="text-subtitle2 text-bold text-black">
                {{ sales_invoice.items.length }}</span>
            </div>
            <div class="col-sm-7 col-md-7 col-xs-7 text-right">
              <span class="text-subtitle2 text-bold">Total: </span>
              <span class="text-subtitle2 text-bold text-black">
                {{ grandTotal | currency }}
              </span>
            </div>
          </template>
        </q-table>
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
                    {{sales_invoice.paid_amount | currency}}
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
                    {{sales_invoice.due_amount | currency}}
                  </div>
                </template>
              </q-field>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <div class="row q-col-gutter-sm">
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn
                    dense label="update" color="primary"
                    class="full-width print-hide" icon="edit"
                    @click="updateInvoice"
                    >
                  </q-btn>
                </div>
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn
                    dense label="invoice list" color="primary"
                    class="full-width print-hide" icon="list"
                    :to="{path: '/sales-invoice-list'}"
                    >
                  </q-btn>
                </div>
              </div>
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
    product_qty: '',
    product_rate: '',
    discount_pct: '',
    discount_amount: '',
    vat_pct: '',
    tax_pct: '',
    vat_amount: '',
    tax_amount: '',
    sales_rate: '',
    // customers: [],
    customerOptions: [],
    products: [],
    productOptions: [],
    selectedItem: '',
    selected: null,
    sales_invoice: '',
    isFullScreen: false,
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
    },
    getProducts () {
      this.loading = true
      this.$axios.get(`salable-products`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          if (response !== null) {
            this.products = response.data.data
            this.loading = false
          }
        })
        .catch(error => console.log(error))
    },
    filterProducts (val, update) {
      if (val === '') {
        update(() => {
          this.productOptions = this.products
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.productOptions = this.products.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1 ||
            v.model.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    productSelected () {
      this.product_rate = this.selected.sales_rate
      this.product_qty = 1
      this.vat_pct = this.selected.vat_pct
      this.tax_pct = this.selected.tax_pct
      this.discount_pct = this.selected.discount_pct
      this.sales_rate = this.selected.sales_rate
      this.vat_amount = this.selected.sales_rate * this.selected.vat_pct / 100
      this.tax_amount = this.selected.sales_rate * this.selected.tax_pct / 100
      this.discount_amount = this.selected.sales_rate * this.selected.discount_pct / 100
      this.$refs.discountAmount.focus()
    },
    addItem () {
      if (this.selected !== null) {
        this.selectedItem = {
          product_id: this.selected.id,
          name: this.selected.name,
          model: this.selected.model,
          product_qty: this.product_qty,
          product_rate: this.selected.sales_rate,
          sales_rate: this.sales_rate,
          discount_pct: this.discount_pct,
          discount_amount: this.discount_amount,
          vat_pct: this.vat_pct,
          tax_pct: this.tax_pct,
          vat_amount: this.vat_amount,
          tax_amount: this.tax_amount,
          subtotal: this.subtotal
        }
        this.sales_invoice.items.push(this.selectedItem)
        this.sales_invoice.invoice_total = this.grandTotal
        if (this.sales_invoice.sales_type === 0) {
          this.sales_invoice.paid_amount = this.grandTotal
        }

        this.selected = null
        this.product_rate = ''
        this.discount_amount = ''
        this.vat_amount = ''
        this.tax_amount = ''
        if (this.$q.platform.is.desktop) {
          this.$refs.selectProduct.focus()
        }

        // console.log('item added')
      } else {
        this.$q.notify({
          message: 'Please select a product',
          color: 'red',
          position: 'bottom-right',
          closeBtn: 'close'
        })
      }
    },
    removeItem (index) {
      this.sales_invoice.items.splice(index, 1)
      this.sales_invoice.invoice_total = this.grandTotal
      if (this.sales_invoice.sales_type === 0) {
        this.sales_invoice.paid_amount = this.grandTotal
      }
    },
    updateInvoice () {
      console.log(this.sales_invoice)
      this.$axios.put(`sales-invoices/${this.$route.params.id}`, this.sales_invoice, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          console.log(response)
          this.$q.notify({
            color: 'green',
            icon: 'success',
            position: 'bottom-right',
            message: 'Save successfull',
            closeBtn: 'close'
          })
        })
        .catch(error => console.log(error))
    }
  },
  computed: {
    subtotal () {
      return (this.product_rate -
        this.discount_amount +
        this.vat_amount +
        this.tax_amount) * this.product_qty
    },
    grandTotal () {
      if (this.sales_invoice.items.length > 0) {
        let amount = this.sales_invoice.items
          .map(item => item.subtotal)
          .reduce((acc, curr) => acc + curr)
        return amount
      } else {
        return 0
      }
    },
    dueAmount () {
      return this.grandTotal - this.sales_invoice.paid_amount
    }
  },
  beforeMount () {
    this.getProducts()
    this.getSalesInvoice()
    this.$store.dispatch('pageTitle', 'Sales Invoice Update')
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
