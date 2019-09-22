<template>
  <q-page>
    <q-form v-on:submit.prevent="saveInvoice" ref="invoiceForm">
      <q-card flat bordered>
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-9 col-md-9 col-xs-12">
              <q-card flat square bordered class="q-mb-md">
                <q-card-section class="q-pa-sm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-3 col-md-3 col-xs-5">
                      <q-input
                        dense no-error-icon ref="invoice_date"
                        v-model="purchase_invoice.invoice_date"
                        label="Date"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-7">
                      <q-input
                        dense no-error-icon
                        ref="invoice_number"
                        label="Number"
                        v-model="purchase_invoice.invoice_number"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-6 col-md-6 col-xs-12">
                      <q-select
                        dense no-error-icon use-input
                        required hide-dropdown-icon
                        transition-show="scale"
                        transition-hide="scale"
                        ref="supplier_id"
                        label="Supplier"
                        input-debounce="0"
                        :options="supplierOptions"
                        v-model="purchase_invoice.supplier_id"
                        option-value="id" option-label="name"
                        map-options emit-value
                        @filter="filterSuppliers"
                      >
                        <template v-slot:append>
                          <q-btn flat dense icon="mdi-refresh"></q-btn>
                        </template>
                        <template v-slot:after>
                          <q-btn dense outline icon="add" color="secondary">
                            <q-tooltip
                              content-class="bg-amber text-black shadow-4"
                              transition-show="scale"
                              transition-hide="scale"
                            >
                              Add a new supplier
                            </q-tooltip>
                          </q-btn>
                        </template>
                      </q-select>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-12 col-md-12 col-xs-12">
                      <q-input
                        dense no-error-icon
                        ref="notes"
                        label="Notes"
                        v-model="purchase_invoice.notes"
                      ></q-input>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12">
              <q-card flat square>
                <q-field dense square class="bg-grey-14">
                  <template v-slot:control>
                    <q-tooltip
                      content-class="bg-amber text-black shadow-4"
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      Grand total
                    </q-tooltip>
                    <div class="full-width text-right q-pr-sm">
                      <span class="text-h4 text-lime-14">
                        {{grandTotal | currency}}
                      </span>
                    </div>
                  </template>
                </q-field>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-sm">
          <div class="row q-col-gutter-xs q-mb-sm">
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
                    dense outline color="secondary"
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
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <q-table
                flat square bordered
                :table-header-style="{ backgroundColor: '#f0f0f0'}"
                :pagination.sync="pagination"
                :data="purchase_invoice.items"
                :columns="tableColumns"
                no-data-label="No items added"
                row-key="__index"
              >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    round icon="remove" size="12px" color="secondary"
                    @click="removeItem(props.row.__index)"
                  >
                    {{ props.value }}
                  </q-btn>
                </q-td>
                <template v-slot:bottom>
                  <div class="col-sm-5 col-md-5 col-xs-5">
                    <span class="text-subtitle2 text-bold">Records: </span>
                    <span class="text-subtitle2 text-bold text-black">
                      {{ purchase_invoice.items.length }}
                    </span>
                  </div>
                  <div class="col-sm-7 col-md-7 col-xs-7 text-right">
                    <span class="text-subtitle2 text-bold">Total: </span>
                    <span class="text-subtitle2 text-bold text-black">
                      {{grandTotal | currency }}
                    </span>
                  </div>
                </template>
              </q-table>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-mt-md">
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-input
                dense outlined square class="q-pr-xs"
                :input-style="{textAlign: 'right'}"
                v-model="purchase_invoice.paid_amount"
              >
                <template v-slot:prepend>
                  <div class="full-width text-right">
                    <span class="text-body1 q-pr-sm">Paid</span>
                  </div>
                </template>
              </q-input>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-field
                dense filled square class="q-pr-xs">
                <template v-slot:control>
                  <div class="full-width text-right">
                    {{dueAmount | currency}}
                  </div>
                </template>
                <template v-slot:prepend>
                  <div class="full-width">
                    <span class="text-body1">Due</span>
                  </div>
                </template>
              </q-field>
            </div>
            <div class="col-sm-3 col-md-3 col-xs-12 offset-sm-9 offset-md-9 offset-xs-none">
              <q-btn
                v-show="purchase_invoice.items.length > 0"
                label="save" icon="save" color="primary" class="full-width"
                @click="saveInvoice"
              >
              </q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-form>
  </q-page>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'PurchaseInvoice',
  data: () => ({
    filter: '',
    loading: false,
    purchase_invoice: {
      invoice_number: date.formatDate(Date.now(), 'YYYYMMDD-HHmmss-SSS'),
      invoice_date: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      notes: '',
      supplier_id: '',
      invoice_total: 0,
      paid_amount: 0,
      items: [],
      user_id: 1
    },
    products: [],
    productOptions: [],
    suppliers: [],
    supplierOptions: [],
    selectedItem: '',
    selected: null,
    product_qty: '',
    purchase_rate: '',
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'model', align: 'left', label: 'Model', field: 'model', sortable: true },
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
    getSuppliers () {
      this.$axios.get(`suppliers`, this.headers)
        .then(response => {
          if (response !== null) {
            this.suppliers = response.data.data
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
    filterSuppliers (val, update) {
      if (val === '') {
        update(() => {
          this.supplierOptions = this.suppliers
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.supplierOptions = this.suppliers.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    productSelected () {
      this.$refs.purchase_rate.focus()
    },
    addItem () {
      if (this.selected !== null && this.product_qty > 0 && this.purchase_rate > 0) {
        this.selectedItem = {
          product_id: this.selected.id,
          name: this.selected.name,
          model: this.selected.model,
          product_qty: this.product_qty,
          purchase_rate: this.purchase_rate,
          subtotal: this.subtotal
        }
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
    },
    saveInvoice () {
      console.log(this.purchase_invoice)
      this.$axios.post(`purchase-invoices`, this.purchase_invoice, this.headers)
        .then(response => {
          console.log(response)
          this.$q.notify({
            color: 'green',
            icon: 'success',
            position: 'bottom-right',
            message: 'Save successfull'
          })
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.getSuppliers()
    this.getProducts()
    this.$store.dispatch('pageTitle', 'Purchase Invoice')
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
    dueAmount () {
      return this.grandTotal - this.purchase_invoice.paid_amount
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
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>
