<template>
  <q-page>
    <q-card flat square>
      <q-card-section square flat class="q-pa-sm">
        <div class="row q-col-gutter-sm">
          <div class="col-sm-8 col-md-8 col-xs-12">
            <q-card flat square bordered class="full-height">
              <q-card-section>
                <div class="row q-col-gutter-xs">
                  <div class="col-sm-7 col-md-7 col-xs-8">
                    <span class="text-h6">{{supplier.name}}</span> <br />
                    <span class="text-bold">{{supplier.contact_number}}</span><br />
                  </div>
                  <div class="col-sm-5 col-md-5 col-xs-8">
                    {{supplier.address}},
                    {{supplier.thana ? supplier.thana.name : ''}} <br />
                    {{supplier.district ? supplier.district.name : ''}},
                    {{supplier.country ? supplier.country.name : ''}} <br />
                    {{supplier.email}}
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-sm-4 col-md-4 col-xs-12">
            <q-card flat square bordered class="full-height">
              <q-card-section>
                <q-field
                  dense square class="bg-grey-14"
                >
                  <template v-slot:prepend>
                    <div class="full-width q-px-md">
                      <span class="text-body1 text-white">Total</span>
                    </div>
                  </template>
                  <template v-slot:control>
                    <div class="full-width text-right text-h4 text-light-green-14 q-px-md">
                      {{supplierTotal | currency}}
                    </div>
                  </template>
                </q-field>
                <q-field
                  dense square class="bg-grey-14 q-mt-xs"
                >
                  <template v-slot:prepend>
                    <div class="full-width q-px-md">
                      <span class="text-body1 text-white">Paid</span>
                    </div>
                  </template>
                  <template v-slot:control>
                    <div class="full-width text-right text-h4 text-light-green-14 q-px-md">
                      {{paidTotal | currency}}
                    </div>
                  </template>
                </q-field>
                <q-field
                  dense square class="bg-grey-14 q-mt-xs"
                >
                  <template v-slot:prepend>
                    <div class="full-width q-px-md">
                      <span class="text-body1 text-white">Due</span>
                    </div>
                  </template>
                  <template v-slot:control>
                    <div class="full-width text-right text-h4 text-yellow-9 q-px-md">
                      {{dueTotal | currency}}
                    </div>
                  </template>
                </q-field>
              </q-card-section>
            </q-card>
          </div>
        </div>
        <div class="row q-col-gutter-xs q-mt-xs">
          <div class="col-sm-8 col-md-8 col-xs-12">
            <q-card flat bordered>
              <q-card-section bordered class="q-pa-xs">
                <div class="row q-col-gutter-xs">
                  <div class="col-sm-12 col-md-12 col-xs-12">
                    <q-table
                      title="Purchase History"
                      dense flat square wrap-cells
                      :data="supplier.invoices"
                      :loading="loading"
                      :columns="tableColumns"
                      no-data-label="No purchase yet!"
                      row-key="id"
                      :pagination.sync="pagination"
                      :filter="filter"
                    >
                    <template v-slot:top-right>
                      <q-input
                        borderless dense
                        debounce="300" v-model="filter" placeholder="Search"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>
                      <q-td slot="body-cell-action" slot-scope="props" :props="props">
                        <q-btn
                          dense color="primary" icon="visibility"
                          class="q-px-sm"
                          :to="{name: 'purchase-invoice-detail', params: {id: props.value}}"
                        />
                      </q-td>
                    </q-table>
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
  name: 'SupplierDetail',
  data: () => ({
    loading: false,
    filter: '',
    supplier: {},
    tableColumns: [
      {
        name: 'invoice_number',
        align: 'left',
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
        name: 'total',
        align: 'right',
        label: 'Invoice Total',
        field: 'invoice_total',
        sortable: true
      },
      {
        name: 'paid',
        align: 'right',
        label: 'Paid Amount',
        field: 'paid_amount',
        sortable: true
      },
      {
        name: 'due',
        align: 'right',
        label: 'Due Amount',
        field: 'due_amount',
        format: v => v.toFixed(2),
        sortable: true
      },
      {
        name: 'action',
        align: 'right',
        label: 'Action',
        field: 'id'
      }
    ],
    pagination: {
      rowsPerPage: 3
    }
  }),
  methods: {
    getSupplier () {
      this.$axios.get(`suppliers/${this.$route.params.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          console.log(response.data.data)
          this.supplier = response.data.data
        })
    }
  },
  computed: {
    supplierTotal () {
      if (this.supplier.invoices) {
        let amount = this.supplier.invoices
          .map(item => parseFloat(item.invoice_total))
          .reduce((acc, curr) => acc + curr, 0)
        return amount
      } else {
        return 0
      }
    },
    paidTotal () {
      if (this.supplier.invoices) {
        let amount = this.supplier.invoices
          .map(item => parseFloat(item.paid_amount))
          .reduce((acc, curr) => acc + curr, 0)
        return amount
      }
      return 0
    },
    dueTotal () {
      return this.supplierTotal - this.paidTotal
    }
  },
  created () {
    this.getSupplier()
    this.$store.dispatch('pageTitle', 'Supplier Detail')
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN').format(v)
    }
  }
}
</script>
