<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section>
        <div class="row"><span class="text-h6">Purchase Invoice</span></div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-3 col-md-3 col-xs-7">
            <q-input
              dense no-error-icon
              ref="invoice_number"
              v-model="purchase_invoice.invoice_number"
              label="Invoice Number"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Required']"
            ></q-input>
          </div>
          <div class="col-sm-2 col-md-2 col-xs-5">
            <q-input
              dense no-error-icon ref="date"
              v-model="purchase_invoice.invoice_date"
              label="Invoice Date"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Required']"
            ></q-input>
          </div>
          <div class="col-sm-4 col-md-4 col-xs-12">
            <q-select
              dense label="Supplier"
              :options="suppliers"
              v-model="purchase_invoice.supplier_id"
              option-value="id" option-label="name"
              emit-value map-options
            />
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-card flat bordered class="bg-black">
              <q-card-section class="text-right">
                <span class="text-h4 text-yellow text-weight-bold">{{grandTotal}}</span>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm q-mb-sm">
          <div class="col-sm-4 col-md-4 col-xs-12 offset-sm-3 offset-md-3 offset-xs-none">
            <q-select
              dense use-input ref="selectProduct"
              hide-selected input-debounce="0"
              label="Select product"
              v-model="selected"
              :options="options"
              :option-label="(product) => product ? product.name + ': ' + product.model : ''"
              option-value="id" options-selected-class="text-teal"
              @filter="filterFn" @input="productSelected"
            >
              <template v-slot:option="scope">
                <q-item v-bind="scope.itemProps" v-on="scope.itemEvents">
                  <q-item-section>
                    <q-item-label v-text="scope.opt.model" />
                    <q-item-label caption>{{ scope.opt.name }}</q-item-label>
                  </q-item-section>
                </q-item>
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
          <div class="col-sm-1 col-md-1 col-xs-4">
            <q-input
              dense ref="qty"
              type="number"
              label="Quantity"
              v-model.number="product_qty"
            ></q-input>
          </div>
          <div class="col-sm-1 col-md-1 col-xs-4 text-right">
            <q-input
              dense ref="rate"
              label="Rate" type="number"
              v-model.number="purchase_rate"
              @keypress.enter="addItem"
            ></q-input>
          </div>
          <div class="col-sm-2 col-md-2 col-xs-4 text-right q-mt-md"
            style="border-bottom: 1px solid #bcbcbd">
            <span>{{subtotal}}</span>
          </div>
          <div class="col-sm-1 col-md-1 col-xs-12 text-right">
            <q-btn
              dense color="teal"
              class="full-width" icon="add"
              @click="addItem"
            ></q-btn>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-9 col-md-9 col-xs-12 offset-sm-3 offset-md-3 offset-xs-none">
            <q-card flat bordered>
              <q-table
                flat
                :pagination.sync="pagination"
                :data="purchase_invoice.purchase_items"
                :columns="tableColumns"
                no-data-label="No items added"
                row-key="id"
              >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn round icon="remove" size="12px" color="orange">
                    {{props.value}}
                  </q-btn>
                </q-td>
                <template v-slot:bottom>
                  <div class="col-sm-5 col-md-5 col-xs-5">
                    <span class="text-subtitle2 text-bold">Records: </span>
                    <span class="text-subtitle2 text-bold text-black">
                      {{purchase_invoice.purchase_items.length}}</span>
                  </div>
                  <div class="col-sm-7 col-md-7 col-xs-7 text-right">
                    <span class="text-subtitle2 text-bold">Total: </span>
                    <span class="text-subtitle2 text-bold text-black">{{grandTotal}}</span>
                  </div>
                </template>
              </q-table>
            </q-card>
          </div>
        </div>
        <div class="row q-col-gutter-sm q-mt-sm">
          <div class="col-sm-1 col-md-1 col-xs-12 offset-sm-11 offset-md-11 offset-xs-none">
            <q-btn
              v-show="purchase_invoice.purchase_items.length > 0"
              dense label="save"
              color="teal" class="full-width"
              @click="saveInvoice"></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
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
      invoice_date: date.formatDate(Date.now(), 'YYYY-MM-DD'),
      supplier_id: '',
      purchase_items: []
    },
    suppliers: [],
    products: [],
    options: [],
    selectedItem: '',
    selected: '',
    product_qty: '',
    purchase_rate: '',
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'model', align: 'left', label: 'Model', field: 'model', sortable: true },
      { name: 'quantity', align: 'right', label: 'Quantity', field: 'product_qty', sortable: true },
      { name: 'rate', align: 'right', label: 'Rate', field: 'purchase_rate', sortable: true },
      { name: 'subtotal', align: 'right', label: 'Subtotal', field: 'subtotal', sortable: true },
      { name: 'update', align: 'right', label: 'Remove', field: '' }
    ],
    pagination: {
      rowsNumber: 0
    }
  }),
  methods: {
    getSuppliers () {
      this.$axios.get(`suppliers`)
        .then(response => {
          if (response !== null) {
            this.suppliers = response.data.data
          }
        })
        .catch(error => console.log(error))
    },
    getProducts () {
      this.loading = true
      this.$axios.get(`products`)
        .then(response => {
          if (response !== null) {
            this.products = response.data.data
            this.loading = false
          }
        })
        .catch(error => console.log(error))
    },
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.products
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.products.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1 ||
            v.model.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    addItem () {
      this.selectedItem = {
        product_id: this.selected.id,
        name: this.selected.name,
        model: this.selected.model,
        product_qty: this.product_qty,
        purchase_rate: this.purchase_rate,
        subtotal: this.subtotal
      }
      this.purchase_invoice.purchase_items.push(this.selectedItem)
      this.selected = ''
      this.$refs.selectProduct.focus()
      this.product_qty = ''
      this.purchase_rate = ''

      // console.log(this.selectedItem)
      // console.log(this.purchase_invoice.purchase_items)
    },
    removeItem (item) {
      console.log(item)
      console.log(item[0].key)
      // this.purchase_invoice.purchase_items.splice(index, 1)
    },
    productSelected () {
      // console.log(this.selected.id)
    },
    saveInvoice () {
      console.log('save invoice')
    }
  },
  created () {
    this.getSuppliers()
    this.getProducts()
  },
  computed: {
    subtotal () {
      return this.purchase_rate * this.product_qty
    },
    grandTotal () {
      if (this.purchase_invoice.purchase_items.length > 0) {
        let amount = this.purchase_invoice.purchase_items
          .map(item => item.subtotal)
          .reduce((acc, curr) => acc + curr)
        return new Intl.NumberFormat('en-IN').format(amount)
      } else {
        return 0
      }
    }
  }
}
</script>

<style>
</style>
