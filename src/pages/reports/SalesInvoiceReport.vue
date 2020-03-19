<template>
  <q-page-container>
    <q-page>
      <q-card flat square>
        <q-card-section class="q-pa-sm">
          <div class="q-mb-md">
            <span class="text-subtitle1 my-0 text-center q-mb-sm">Sales Report (Invoice List)</span><br>
            (From: {{this.fromDate}} To: {{this.toDate}})
          </div>
          <div class="row q-col-gutter-sm q-mb-md print-hide">
            <div class="col-sm-2 col-xs-12">
              <q-input square dense readonly outlined v-model="fromDate" label="From">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qFromDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="fromDate" mask="YYYY-MM-DD" @input="() => $refs.qFromDateProxy.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-sm-2 col-xs-12">
              <q-input square dense readonly outlined v-model="toDate" label="To">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qToDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="toDate"  mask="YYYY-MM-DD"  class="text-center" @input="() => $refs.qToDateProxy.hide()" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-sm-4 col-xs-12">
              <q-select
                clearable clear-icon="close"
                dense use-input no-error-icon outlined
                hide-dropdown-icon square
                transition-show="scale"
                transition-hide="scale"
                label="Customer"
                ref="selectCustomer"
                v-model="customerId"
                :options="customerOptions"
                @filter="filterCustomers"
                option-value="id"
                :option-label="customer => customer ? customer.name + ' (' + customer.contact_number +')' : ''"
                map-options emit-value
                class="print-hide"
              >
                <template v-slot:no-option>
                  No match found.
                </template>
              </q-select>
            </div>
            <div class="col-sm-3 col-xs-12">
              <q-select
                clearable clear-icon="close"
                dense use-input no-error-icon
                hide-dropdown-icon outlined square
                transition-show="scale"
                transition-hide="scale"
                label="Salesperson"
                v-model="userid"
                :options="users"
                :option-value="opt => Object(opt) === opt && 'id' in opt ? opt.id : null"
                :option-label="opt => Object(opt) === opt && 'name' in opt ? opt.name : ''"
                emit-value
                map-options
                style="min-width: 250px; max-width: 300px"
              />
            </div>
            <div class="col-sm-1 col-xs-12">
              <q-btn
                label="Show"
                block
                color='info'
                class='q-mb-none q-ml-md float-right print-hide'
                @click="getInvoices"
              >
              </q-btn>
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <q-card square flat bordered>
                <q-table
                  flat square wrap-cells dense
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :loading="loading"
                  :data="invoices"
                  :columns="tableColumns"
                  :pagination.sync="pagination"
                  row-key="id"
                >
                <template v-slot:bottom>
                  <div cla style="width:9%" class="text-right text-bold">Grand Total</div>
                  <div cla style="width:60%" class="text-right text-bold">Total: {{ invoiceTotal|currency }}</div>
                  <div cla style="width:15%" class="text-right text-bold">Total: {{ receivedTotal|currency }}</div>
                  <div cla style="width:16%" class="text-right text-bold">Total: {{ dueTotal|currency }}</div>
                </template>
                </q-table>
                <q-btn
                  icon="list"
                  size='12px'
                  label="Invoice List"
                  color='info'
                  class='q-mt-md float-right'
                  @click="showInvoiceList"
                >
                </q-btn>
                <q-btn
                  icon="print"
                  size='12px'
                  label="Print"
                  color='primary'
                  class='q-mt-md q-mr-sm float-right'
                  @click="printPreview"
                >
                </q-btn>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-page>
  </q-page-container>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'SalesInvoiceList',
  data: () => ({
    loading: false,
    customers: [],
    customerOptions: [],
    filter: '',
    sales_invoice: {},
    invoices: [],
    fromDate: date.formatDate(date.startOfDate(new Date(), 'month'), 'YYYY-MM-DD'),
    toDate: date.formatDate(date.endOfDate(new Date(), 'month'), 'YYYY-MM-DD'),
    customerId: 0,
    users: [],
    userid: 0,
    tableColumns: [
      {
        name: 'invoice_number',
        align: 'left',
        style: 'width:145px;',
        label: 'Invoice No.',
        field: 'invoice_number',
        sortable: true
      },
      {
        name: 'invoice_date',
        align: 'left',
        label: 'Invoice Date',
        field: 'invoice_date',
        sortable: true
      },
      {
        name: 'customer',
        align: 'left',
        label: 'Customer',
        field: 'customer',
        sortable: true
      },
      {
        name: 'invoice_total',
        align: 'right',
        label: 'Invoice Total',
        field: 'invoice_total',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'paid_amount',
        align: 'right',
        label: 'Paid Amount',
        field: 'paid_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'due_amount',
        align: 'right',
        label: 'Due Amount',
        field: 'due_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 0
    }
  }),
  methods: {
    getInvoices () {
      this.loading = true
      this.$axios.get(`sales-invoice-report/${this.fromDate}/${this.toDate}/${this.customerId}/${this.userid}`, this.headers)
        .then(response => {
          if (response !== null) {
            console.log(response)
            this.invoices = response.data.data
            this.loading = false
          }
        })
        .catch(error => console.log(error))
    },
    getCustomers () {
      this.$axios.get(`customers`, this.headers)
        .then(response => {
          if (response !== null) {
            this.customers = response.data.data
          }
        })
        .catch(error => console.log(error))
    },
    getUsers () {
      this.$axios.get(`users`, this.headers)
        .then(response => {
          if (response !== null) {
            this.users = response.data.data
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
    printPreview () {
      window.print()
    },
    showInvoiceList () {
      this.$router.push({ name: `sales-invoice-list` })
    }
  },
  created () {
    // this.getInvoices()
    this.getCustomers()
    this.$store.dispatch('pageTitle', 'Sales Invoice Report')
    this.getUsers()
  },
  computed: {
    headers () {
      return {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    },
    invoiceTotal () {
      if (this.invoices.length > 0) {
        let amount = this.invoices
          .map(item => item.invoice_total)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        return amount
      } else {
        return 0
      }
    },
    receivedTotal () {
      if (this.invoices.length > 0) {
        let amount = this.invoices
          .map(item => item.paid_amount)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        return amount
      } else {
        return 0
      }
    },
    dueTotal () {
      if (this.invoices.length > 0) {
        let amount = this.invoices
          .map(item => item.due_amount)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        return amount
      } else {
        return 0
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
