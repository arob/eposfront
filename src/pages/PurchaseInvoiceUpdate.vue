<template>
  <q-page>
    <q-card flat square bordered>
      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-sm-9 col-md-9 col-xs-12">
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
              <div class="col-sm-4 col-md-4 col-xs-7">
                <q-field dense filled>
                  <template v-slot:prepend>
                    <span class="text-caption">No.</span>
                  </template>
                  <template v-slot:control>
                    {{purchase_invoice.invoice_number}}
                  </template>
                </q-field>
              </div>
              <div class="col-sm-5 col-md-5 col-xs-12">
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
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-card flat>
              <q-card-section class="q-pa-none">
                <q-field dense class="bg-black" style="height:90px">
                  <template v-slot:control>
                    <div v-cloak class="full-width text-right q-pr-md">
                      <span class="text-h4 text-lime-14">
                        {{purchase_invoice.invoice_total | currency}}
                      </span>
                    </div>
                  </template>
                </q-field>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-col-gutter-xs q-mb-none q-mt-md">
          <div class="col-sm-5 col-md-5 col-xs-12">
            <q-select
              use-input square outlined
              transition-show="scale"
              transition-hide="scale"
              dense no-error-icon
              hide-dropdown-icon
              ref="selectProduct"
              input-debounce="0"
              label="Product"
              v-model="selected"
              :options="productOptions"
              :option-label="product => product ? product.name + ': ' + product.model : ''"
              option-value="id"
              map-options
              @filter="filterProducts"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label class="text-primary text-bold">
                      {{scope.opt.model}}
                    </q-item-label>
                    <q-item-label caption>{{ scope.opt.name }}</q-item-label>
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
          <div class="col-sm-2 col-md-2 col-xs-4 text-right">
            <q-input
              dense no-error-icon square outlined
              ref="purchase_rate"
              label="Rate"
              v-model="purchase_rate"
              type="number"
              @keypress.enter="addItem"
            ></q-input>
          </div>
          <div class="col-sm-2 col-md-2 col-xs-4">
            <q-input
              dense no-error-icon square outlined
              ref="qty" type="number" :min="0"
              label="Quantity"
              v-model.number="product_qty"
              @keypress.enter="addItem"
            ></q-input>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-4">
            <q-field dense filled square>
              <template v-slot:control>
                <div class="full-width text-right">
                  {{subtotal | currency}}
                </div>
              </template>
              <template v-slot:after>
                <q-btn
                  dense square color="secondary"
                  class="full-width" icon="add"
                  @click="addItem"
                >
                  <q-tooltip
                    content-class="bg-amber text-black shadow-4"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    Add selected item
                  </q-tooltip>
                </q-btn>
              </template>
            </q-field>
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
            <q-card flat square bordered>
              <q-table
                flat
                :data="purchase_invoice.items"
                :columns="tableColumns"
                no-data-label="No items added"
                row-key="__index"
              >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    round
                    icon="remove" size="12px" color="secondary"
                    @click="removeItem(props.row.__index)"
                  >
                    {{ props.value }}
                  </q-btn>
                </q-td>
                <template v-slot:bottom>
                  <div class="col-sm-5 col-md-5 col-xs-5">
                    <span class="text-subtitle2 text-bold">Records: </span>
                    <span class="text-subtitle2 text-bold text-black">
                      {{purchase_invoice.items.length}}</span>
                  </div>
                  <div class="col-sm-7 col-md-7 col-xs-7 text-right">
                    <span class="text-subtitle2 text-bold">Total: </span>
                    <span class="text-subtitle2 text-bold text-black">
                      {{purchase_invoice.invoice_total | currency}}
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
                  {{purchase_invoice.paid_amount | currency}}
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
                  {{purchase_invoice.due_amount | currency}}
                </div>
              </template>
            </q-field>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
            <q-btn
              label="save" color="secondary"
              class="full-width" icon="save"
              @click="saveInvoice"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PurchaseInvoiceUpdate',
  data: () => ({
    purchase_invoice: {
      // invoice_number: date.formatDate(Date.now(), 'YYYYMMDD-HHmmss-SSS'),
      // invoice_date: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      notes: '',
      supplier_id: '',
      invoice_total: 0,
      paid_amount: 0,
      items: [],
      user_id: 1
    },
    products: [],
    productOptions: [],
    selectedItem: '',
    selected: null,
    product_qty: '',
    purchase_rate: '',
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
      },
      { name: 'update', align: 'right', label: 'Update' }
    ],
    pagination: {
      rowsNumber: 0
    }
  }),
  methods: {
    getPurchaseInvoice () {
      this.$axios.get(`purchase-invoices/${this.$route.params.id}`, this.headers)
        .then(response => {
          if (response !== null) {
            this.purchase_invoice = response.data.data
            console.log(response.data.data)
          }
        })
    },
    saveInvoice () {
      // console.log('saved')
      console.log(this.purchase_invoice)
      this.$axios.put(`purchase-invoices/${this.$route.params.id}`,
        this.purchase_invoice, this.headers)
        .then(response => {
          if (response !== undefined) {
            console.log(response)
            this.$q.notify({
              color: 'green',
              icon: 'success',
              position: 'bottom-right',
              message: 'Update successfull'
            })
          } else {
            this.$q.notify({
              color: 'orange',
              icon: 'success',
              position: 'bottom-right',
              message: 'Error updating record'
            })
          }
        })
        .catch(error => console.log(error))
    },
    getProducts () {
      this.loading = true
      this.$axios.get(`active-products`, this.headers)
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
    addItem () {
      if (this.selected !== null && this.product_qty > 0 && this.purchase_rate > 0) {
        this.selectedItem = {
          product_id: this.selected.id,
          product_name: this.selected.name,
          product_model: this.selected.model,
          product_qty: this.product_qty,
          purchase_rate: this.purchase_rate,
          subtotal: this.subtotal
        }
        // console.log(this.subtotal)
        this.purchase_invoice.items.push(this.selectedItem)
        this.purchase_invoice.invoice_total = this.grandTotal
        this.purchase_invoice.paid_amount = this.grandTotal
        this.selected = null
        if (this.$q.platform.is.desktop) {
          this.$refs.selectProduct.focus()
        }
        this.product_qty = ''
        this.purchase_rate = ''
      } else {
        this.$q.notify({
          color: 'red',
          icon: 'warning',
          position: 'bottom-right',
          message: 'Please check product, quantity and rate'
        })
      }
    },
    removeItem (index) {
      this.purchase_invoice.items.splice(index, 1)
      this.purchase_invoice.invoice_total = this.grandTotal
      this.purchase_invoice.paid_amount = this.grandTotal
    }
  },
  computed: {
    subtotal () {
      return this.purchase_rate * this.product_qty
    },
    grandTotal () {
      if (this.purchase_invoice.items.length > 0) {
        let amount = this.purchase_invoice.items
          .map(item => item.subtotal)
          .reduce((acc, curr) => acc + curr)
        return amount
      } else {
        return 0
      }
    },
    headers () {
      return {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    }
  },
  created () {
    this.getPurchaseInvoice()
    this.getProducts()
    this.$store.dispatch('pageTitle', 'Purchase Invoice Update')
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>
