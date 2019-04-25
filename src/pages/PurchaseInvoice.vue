<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="q-py-sm">
        <span class="text-h6">Purchase Invoice</span>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section class="q-py-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-input
              ref="invoice_number"
              outlined
              dense
              no-error-icon
              v-model="purchase_invoice.invoice_number"
              label="Invoice Number"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Required']"
            ></q-input>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-input
              ref="date"
              outlined
              dense
              no-error-icon
              v-model="purchase_invoice.invoice_date"
              label="Invoice Date"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Required']"
            ></q-input>
          </div>
          <div class="col-sm-6 col-md-6 col-xs-12">
            <q-select
              outlined
              dense
              label="Supplier"
              :options="suppliers"
              v-model="purchase_invoice.supplier_id"
              option-value="id"
              option-label="name"
              emit-value
              map-options
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm q-mb-lg">
          <div class="col-sm-4 col-md-4 col-xs-12 offset-sm-3 offset-md-3">
            <q-select
              dense
              use-input
              v-model="selected"
              hide-selected
              input-debounce="0"
              label="Find"
              :options="options"
              :option-label="(product) => product ? product.name + ': ' + product.model : ''"
              option-value="id"
              options-selected-class="text-teal"
              @filter="filterFn"
              @input="productSelected"
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
          <div class="col-sm-1 col-md-1 col-xs-12 text-right">
            <q-input
              dense
              type="number"
              label="Quantity"
              v-model.number="product_qty"
            ></q-input>
          </div>
          <div class="col-sm-2 col-md-2 col-xs-12 text-right">
            <q-input
              dense
              type="number"
              label="Rate"
              v-model.number="purchase_rate"
              @keypress.enter="addItem"
            ></q-input>
          </div>
          <div class="col-sm-2 col-md-2 col-xs-12 text-right">
            <p>{{subtotal}}</p>
          </div>
          <div class="col-sm-1 col-md-1 col-xs-12">
            <q-btn
              dense
              color="teal"
              icon="add"
              @click="addItem"
            ></q-btn>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-9 col-md-9 col-xs-12 offset-sm-3 offset-md-3">
            <q-card
              flat bordered
              class="border-bottom"
              v-for="(item, index) in purchase_invoice.purchase_items"
              :key="index">
              <q-card-section>
                <div class="row q-col-gutter-sm">
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    {{item.name}} ({{item.model}})
                  </div>
                  <div class="col-sm-1 col-md-1 col-xs-12 text-right offset-sm-2">
                    <span class="xs">Quantity: </span>{{item.product_qty}}
                  </div>
                  <div class="col-sm-1 col-md-1 col-xs-12 text-right">
                    <span class="xs">Rate: </span>{{item.purchase_rate}}
                  </div>
                  <div class="col-sm-2 col-md-2 col-xs-12 text-right">
                    <span class="xs">Rate: </span>{{item.subtotal}}
                  </div>
                  <div class="col-sm-1 col-md-1 col-xs-12 text-right">
                    <q-btn
                      round
                      dense
                      size="12px"
                      color="orange"
                      icon="remove"
                      @click="removeItem(item)"
                    ></q-btn>
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
  name: 'PurchaseInvoice',
  data: () => ({
    filter: '',
    loading: false,
    purchase_invoice: {
      invoice_number: '',
      invoice_date: '',
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
      {
        name: 'code',
        align: 'left',
        label: 'Code',
        field: 'code',
        sortable: true
      },
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
        name: 'update',
        align: 'left',
        label: 'Qty',
        field: 'update',
        sortable: true
      }
    ]
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
        product_qty: this.product_qty,
        purchase_rate: this.purchase_rate,
        name: this.selected.name,
        model: this.selected.model,
        subtotal: this.subtotal
      }
      this.purchase_invoice.purchase_items.push(this.selectedItem)

      // console.log(this.selectedItem)
      // console.log(this.purchase_invoice.purchase_items)
    },
    removeItem (item) {
      let valueToRemove = item
      console.log(valueToRemove)

      // this.purchase_invoice.purchase_items.filter(item => !valueToRemove.includes(item))
      // console.log(item)
    },
    productSelected () {
      // console.log(this.selected.id)
    }
  },
  created () {
    this.getSuppliers()
    this.getProducts()
  },
  computed: {
    subtotal () {
      return this.purchase_rate * this.product_qty
    }
  }
}
</script>

<style>
</style>
