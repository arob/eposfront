<template>
  <q-page>
    <q-card flat square>
      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-sm-9 col-md-9 col-xs-12">
            <q-card flat square bordered>
              <q-card-section class="q-pa-sm">
                <div class="row q-col-gutter-md">
                  <div class="col-sm-3 col-md-3 col-xs-12">
                    <q-select
                      dense no-error-icon
                      transition-show="scale"
                      transition-hide="scale"
                      v-model="sales_invoice.sales_type"
                      :options="sales_types"
                      label="Type"
                      option-value="id"
                      option-label="type"
                      map-options emit-value
                      @input="setPaidAmount"
                    ></q-select>
                  </div>
                   <div class="col-sm-3 col-md-3 col-xs-6">
                    <q-input
                      dense
                      label="Invoice Date"
                      v-model="sales_invoice.invoice_date"
                    ></q-input>
                  </div>
                  <div class="col-sm-6 col-md-6 col-xs-12">
                    <q-select
                      required
                      dense use-input no-error-icon
                      hide-dropdown-icon
                      transition-show="scale"
                      transition-hide="scale"
                      label="Customer"
                      ref="selectCustomer"
                      v-model="sales_invoice.customer_id"
                      :options="customerOptions"
                      @filter="filterCustomers"
                      option-value="id"
                      :option-label="customer => customer ? customer.name + ' (' + customer.contact_number +')' : ''"
                      map-options emit-value
                    ></q-select>
                  </div>
                </div>
                <div class="row q-col-gutter-md q-mt-sm">
                  <div class="col-xs-12">
                    <q-input
                      dense no-error-icon
                      label="Notes"
                      v-model="sales_invoice.notes"
                    ></q-input>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-card flat square>
              <q-field dense class="bg-black">
                <template v-slot:control>
                  <div class="full-width text-right q-pr-sm">
                    <span class="text-h4 text-lime-14">
                      {{ grandTotal | currency }}
                    </span>
                  </div>
                </template>
              </q-field>
            </q-card>
          </div>
        </div>
            <div class="row q-col-gutter-xs q-mt-md">
              <div class="col-sm-3 col-md-3 col-xs-12">
                <q-select
                    dense no-error-icon use-input
                    outlined square hide-dropdown-icon
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
                    @input="selectedProduct"
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
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense filled readonly square
                  no-error-icon stack-label
                  ref="productPrice"
                  label="Price"
                  v-model="product_rate"
                ></q-input>
              </div>

              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense filled square
                  no-error-icon stack-label
                  label="VAT"
                  ref="vatAmount"
                  v-model.number="vat_amount"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense filled square
                  no-error-icon stack-label
                  label="Tax"
                  ref="taxAmount"
                  v-model.number="tax_amount"
                ></q-input>
              </div>
              <div class="col-sm-2 col-md-2 cl-xs-12">
                <q-input
                  dense no-error-icon outlined
                  square stack-label
                  label="Product Serial"
                  v-model="product_serial"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input
                  dense no-error-icon outlined square stack-label
                  ref="discountAmount"
                  label="Discount"
                  type="number"
                  min="0"
                  v-model.number="discount_amount"
                  @keypress.enter="addItem"
                ></q-input>
              </div>
              <div class="col-sm-1 col-md-1 col-xs-4">
                <q-input class="text-right full-width"
                  dense no-error-icon outlined square stack-label
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
                      dense outline color="secondary"
                      class="full-width" icon="add"
                      @click="addItem"
                    ></q-btn>
                  </template>
                </q-field>
              </div>
            </div>
          <q-table
            flat grid
            hide-header
            :data="sales_invoice.items"
            :columns="salesItemsColumns"
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
                    v-show="props.row.product_rate > 0"
                    >
                      Price {{props.row.product_rate | currency}}
                    </span>
                    <span
                      class="text-caption text-italic"
                      v-show="props.row.vat_pct > 0"
                    >
                      VAT ({{props.row.vat_pct}}%): {{props.row.vat_amount | currency}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="props.row.tax_pct > 0"
                    >
                      Tax ({{props.row.tax_pct}}%): {{props.row.tax_amount | currency}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="props.row.product_serial != ''"
                    >
                      Product Serial: {{product_serial}}
                    </span>
                    <span class="text-caption text-italic"
                      v-show="props.row.discount_amount > 0"
                    >
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
              <span class="text-subtitle2 text-bold">Total Records: </span>
              <span class="text-subtitle2 text-bold text-black">
                {{ sales_invoice.items.length }}</span>
            </div>
            <div class="col-sm-7 col-md-7 col-xs-7 text-right">
              <span class="text-subtitle2 text-bold">Total Amount: </span>
              <span class="text-subtitle2 text-bold text-black">
                {{ grandTotal | currency }}
              </span>
            </div>
          </template>
        </q-table>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-7 col-md-7 col-xs-12">
            <q-card
              flat square bordered
              class="q-pa-sm"
              v-show="sales_invoice.sales_type !== 0"
            >
              <q-form ref="installmentForm" id="installmentForm" @submit="addInstallment">
                <div class="row q-col-gutter-sm">
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense required no-error-icon
                        ref="installmentNumber"
                        label="EMI Number"
                        v-model="installment.installment_number"
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        dense required no-error-icon
                        ref="installmentAmount"
                        label="Amount"
                        v-model="installment.installment_amount"
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense filled no-error-icon
                        ref="installmentDate"
                        v-model="installment.due_date"
                        mask="date"
                        :rules="['date']">
                        <template v-slot:prepend>
                          <q-icon
                            name="event"
                            class="cursor-pointer">
                            <q-popup-proxy ref="qDateProxy"
                              transition-show="scale" transition-hide="scale">
                              <q-date
                                v-model="installment.due_date"
                                @input="() => $refs.qDateProxy.hide()"
                              />
                            </q-popup-proxy>
                          </q-icon>
                        </template>
                      </q-input>
                    </div>
                    <div class="col-sm-1 col-md-1 col-xs-12">
                      <q-btn
                        outline dense
                        icon="add"
                        type="submit"
                        color="secondary"
                        @submit.prevent="addInstallment"
                      ></q-btn>
                    </div>
                  <div class="col-sm-2 col-md-2 col-xs-12">
                    <div class="text-grey-7 text-right">Remains: <br>
                    {{dueAmount - remainingAmount}}</div>
                  </div>
                </div>
              </q-form>
              <div class="row q-col-gutter-sm">
                <div class="col-sm-12 col-md-12 col-xs-12">
                  <q-table
                    flat dense
                    :table-header-style="{ backgroundColor: '#f0f0f0' }"
                    no-data-label="No installment added"
                    :columns="installmentTableColumns"
                    :data="sales_invoice.installments"
                  >
                    <q-td slot="body-cell-update" slot-scope="props" :props="props">
                      <q-btn
                        round icon="remove" size="12px" color="secondary"
                        @click="removeInstallment(props.row.__index)"
                      >
                        {{ props.value }}
                      </q-btn>
                    </q-td>
                  </q-table>
                </div>
              </div>
            </q-card>
          </div>
          <div class="col-sm-4 col-md-4 col-xs-12 offset-sm-1 offset-md-1 offset-xs-none">
            <q-card flat bordered class="q-pa-sm full-height">
              <q-input
                dense outlined square
                class="full-width text-right"
                :input-style="{textAlign: 'right'}"
                v-model="sales_invoice.paid_amount"
                :readonly="sales_invoice.sales_type === 0"
              >
                <template v-slot:prepend>
                  <div class="full-width text-right">
                    <span class="text-body1">Paid</span>
                  </div>
                </template>
              </q-input>
              <q-field class="q-mt-sm"
                dense filled square
              >
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
              <div class="row q-col-gutter-sm">
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn
                    square dense
                    v-show="sales_invoice.items.length > 0"
                    label="save" icon="save" color="primary"
                    class="full-width print-hide q-mt-md"
                    @click="saveInvoice"
                  >
                  </q-btn>
                </div>
                <div class="col-sm-6 col-md-6 col-xs-12">
                  <q-btn
                    square dense
                    v-show="sales_invoice.items.length > 0"
                    label="save & preview" color="primary"
                    class="full-width print-hide q-mt-md"
                    @click="savenPreview"
                  >
                  </q-btn>
                </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'SalesInvoice',
  data: () => ({
    sales_types: [
      { id: 0, type: 'Cash' },
      { id: 1, type: 'Credit' },
      { id: 2, type: 'EMI / Installment' }
    ],
    sales_invoice: {
      sales_type: 0,
      invoice_number: date.formatDate(Date.now(), 'YYYY.MM.'),
      // invoice_number: this.invoiceNumber(),
      invoice_date: date.formatDate(Date.now(), 'YYYY-MM-DD HH:mm:ss'),
      customer_id: '',
      invoice_total: '',
      paid_amount: 0,
      user_id: 1,
      notes: '',
      items: [],
      installments: []
    },
    product_qty: '',
    product_serial: '',
    product_rate: '',
    discount_pct: '',
    discount_amount: '',
    vat_pct: '',
    tax_pct: '',
    vat_amount: '',
    tax_amount: '',
    sales_rate: '',
    customers: [],
    customerOptions: [],
    products: [],
    productOptions: [],
    selectedItem: '',
    selected: null,
    salesItemsColumns: [
      {
        name: 'name',
        field: 'name',
        label: 'Name',
        align: 'left',
        sortable: true
      },
      {
        name: 'model',
        field: 'model',
        label: 'Model',
        align: 'left',
        sortable: true
      },
      {
        name: 'price',
        field: 'product_rate',
        label: 'Sales Rate',
        align: 'right'
      },
      {
        name: 'discount_amount',
        field: 'discount_amount',
        label: 'Discount',
        align: 'right'
      },
      {
        name: 'vat_Amount',
        field: 'vat_amount',
        label: 'VAT Amount',
        align: 'right'
      },
      {
        name: 'tax_amount',
        field: 'tax_amount',
        label: 'Tax Amount',
        align: 'right'
      },
      {
        name: 'sales_rate',
        field: 'sales_rate',
        label: 'Sales Price',
        align: 'right'
      },
      {
        name: 'product_qty',
        field: 'product_qty',
        label: 'Quantity',
        align: 'right'
      },
      {
        name: 'subtotal',
        field: 'subtotal',
        label: 'Subtotal',
        align: 'right'
      }
    ],
    installmentTableColumns: [
      {
        name: 'installment_number',
        field: 'installment_number',
        label: 'EMI Number',
        align: 'left'
      },
      {
        name: 'installment_amount',
        field: 'installment_amount',
        label: 'Amount',
        align: 'right'
      },
      {
        name: 'due_date',
        field: 'due_date',
        label: 'Due Date',
        align: 'left'
      },
      { name: 'update', align: 'right', label: 'Update' }
    ],
    installment: {
      installment_number: '',
      installment_amount: '',
      due_date: ''
    }
  }),
  methods: {

    getCustomers () {
      this.$axios.get(`customers`, this.headers)
        .then(response => {
          if (response !== null) {
            this.customers = response.data.data
          }
        })
        .catch(error => console.log(error))
    },
    filterCustomers (val, update) {
      if (val === '') {
        update(() => {
          this.customerOptions = this.customers
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.customerOptions = this.customers.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1 ||
            v.contact_number.indexOf(needle) > -1
        )
      })
    },
    getProducts () {
      this.loading = true
      this.$axios.get(`salable-products`, this.headers)
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
    selectedProduct () {
      this.product_rate = this.selected.sales_rate
      this.product_qty = 1
      this.product_serial = this.product_serial
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
          product_serial: this.product_serial,
          subtotal: this.subtotal
        }
        this.sales_invoice.items.push(this.selectedItem)
        this.sales_invoice.invoice_total = this.grandTotal
        if (this.sales_invoice.sales_type === 0) {
          this.sales_invoice.paid_amount = this.grandTotal
        }

        if (this.sales_invoice.customer_id === null || this.sales_invoice.customer_id === '') {
          this.$q.notify({
            message: 'Please select a customer',
            color: 'red',
            position: 'bottom-right',
            closeBtn: 'close'
          })
          this.$refs.selectCustomer.focus()
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
    saveInvoice () {
      console.log(this.sales_invoice)
      this.$axios.post(`sales-invoices`, this.sales_invoice, this.headers)
        .then(response => {
          console.log(response)
          this.$q.notify({
            color: 'green',
            icon: 'success',
            position: 'bottom-right',
            message: 'Save successfull',
            closeBtn: 'close'
          })
          this.$router.push(`/sales-invoice-list`)
        })
        .catch(error => console.log(error))
    },
    savenPreview () {
      console.log(this.sales_invoice)
      this.$axios.post(`sales-invoices`, this.sales_invoice, this.headers)
        .then(response => {
          // console.log(response)
          this.$q.notify({
            color: 'green',
            icon: 'success',
            position: 'bottom-right',
            message: 'Save successfull',
            closeBtn: 'close'
          })
          // console.log(response.data.data.id)
          this.$router.push(`/print/sales-invoices/${response.data.data.id}`)
        })
        // .catch(error => console.log(error))
    },
    setPaidAmount () {
      if (this.sales_invoice.sales_type === 0) {
        this.sales_invoice.paid_amount = this.grandTotal
        console.log(this.grandTotal)
      }
    },
    addInstallment () {
      console.log('add installment')
      let installment = {
        installment_number: this.installment.installment_number,
        installment_amount: this.installment.installment_amount,
        due_date: this.installment.due_date
      }
      this.sales_invoice.installments.push(installment)
      this.$refs.installmentNumber = ''
      this.$refs.installmentAmount.focus()
      this.$refs.installmentForm.reset()
    },
    removeInstallment (index) {
      console.log(index)
      this.sales_invoice.installments.splice(index, 1)
    },
    saveInstallments () {
      console.log('save installment')
    }
  },
  computed: {
    subtotal () {
      return (Number(this.sales_rate) + this.vat_amount + this.tax_amount) * this.product_qty - this.discount_amount
    },
    invoiceNumber () {
      return this.sales_invoice.id
    },
    grandTotal () {
      if (this.sales_invoice.items.length > 0) {
        let amount = this.sales_invoice.items
          .map(item => item.subtotal)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        return amount
      } else {
        return 0
      }
    },
    remainingAmount () {
      if (this.sales_invoice.installments.length > 0) {
        let amount = this.sales_invoice.installments
          .map(item => item.installment_amount)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        console.log(amount)
        return amount
      } else {
        return Number(this.dueAmount)
      }
    },
    installmentNumber () {
      return this.installments.length + 1
    },
    headers () {
      return {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    },
    dueAmount () {
      return this.grandTotal - this.sales_invoice.paid_amount
    }
  },
  created () {
    this.getCustomers()
    this.getProducts()
    this.$store.dispatch('pageTitle', 'Sales Invoice')
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>
