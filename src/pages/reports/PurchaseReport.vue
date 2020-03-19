<template>
    <q-page-container>
    <q-page>
      <q-card-section class="q-pa-sm">
        <div class="q-mb-md">
          <span class="text-h6 my-0 text-center q-mb-sm">Purchase Report</span><br>
          (From: {{this.fromDate}} To: {{this.toDate}})
        </div>
        <div class="row q-col-gutter-sm q-mb-md print-hide">
          <div class="col-sm-3 col-xs-6">
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
          <div class="col-sm-3 col-xs-6">
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
          <div class="col-sm-5 col-xs-12">
            <q-select
              clearable clear-icon="close"
              dense use-input no-error-icon
              hide-dropdown-icon outlined square
              transition-show="scale"
              transition-hide="scale"
              label="Supplier"
              ref="selectSupplier"
              v-model="supplierId"
              :options="supplierOptions"
              @filter="filterSuppliers"
              option-value="id"
              :option-label="supplier => supplier ? supplier.name + ' (' + supplier.contact_number +')' : ''"
              map-options emit-value
              class="print-hide"
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
            <q-table
                flat square bordered wrap-cells dense
                :table-header-style="{ backgroundColor: '#f0f0f0' }"
                :loading="loading"
                :data="invoices"
                :columns="tableColumns"
                :filter="filter"
                row-key="id"
                :pagination.sync="pagination"
            >
              <template v-slot:bottom>
                <div class="text-right text-bold">Grand Total</div>
                <div style="width:59%" class="text-right text-bold">Total: {{ paidTotal|currency }}</div>
                <div style="width:16%" class="text-right text-bold">Total: {{ paidTotal|currency }}</div>
                <div style="width:16%" class="text-right text-bold">{{ dueTotal|currency }}</div>
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
          </div>
        </div>
      </q-card-section>
    </q-page>
  </q-page-container>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'PurchaseInvoiceList',
  data: () => ({
    loading: false,
    filter: '',
    invoices: [],
    suppliers: [],
    supplierOptions: [],
    supplierId: 0,
    fromDate: date.formatDate(date.startOfDate(new Date(), 'month'), 'YYYY-MM-DD'),
    toDate: date.formatDate(date.endOfDate(new Date(), 'month'), 'YYYY-MM-DD'),
    tableColumns: [
      {
        name: 'invoice_number',
        align: 'left',
        label: 'Invoice No.',
        field: 'invoice_number',
        sortable: true,
        style: 'width:155px'
      },
      {
        name: 'invoice_date',
        align: 'left',
        label: 'Invoice Date',
        field: 'invoice_date',
        sortable: true
      },
      {
        name: 'supplier',
        align: 'left',
        label: 'Supplier',
        field: 'supplier_name',
        sortable: true
      },
      {
        name: 'total',
        align: 'right',
        label: 'Invoice Total',
        field: 'invoice_total',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'paid',
        align: 'right',
        label: 'Paid Amount',
        field: 'paid_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'due',
        align: 'right',
        label: 'Due Amount',
        field: 'due_amount',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 10
    }
  }),
  methods: {
    getInvoices () {
      this.loading = true
      this.$axios.get(`purchase-report/${this.fromDate}/${this.toDate}/${this.supplierId}`, this.headers)
        .then(response => {
          if (response !== null) {
            this.invoices = response.data.data
            this.loading = false
          }
        })
        .catch(error => console.log(error))
    },
    getSuppliers () {
      this.$axios.get(`suppliers`, this.headers)
        .then(response => {
          if (response !== null) {
            this.suppliers = response.data.data
          }
        })
        .catch(error => console.log(error))
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
    printPreview () {
      window.print()
    },
    showInvoiceList () {
      this.$router.push({ name: `purchase-invoice-list` })
    }
  },
  computed: {
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
    paidTotal () {
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
    this.getSuppliers()
    this.$store.dispatch('pageTitle', 'Purchase Invoices')
    // this.getInvoices()
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>
