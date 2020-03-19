<template>
  <q-page-container>
    <q-page>
      <q-card-section class="q-pa-sm">
        <div class="q-mb-md">
          <span class="text-subtitle1 my-0 text-center q-mb-sm">Product Stock and Total Value on
            <strong>{{ new Intl.DateTimeFormat('en-GB').format(new Date()) }}</strong><br>
            Purchased Products
          </span>
        </div>
        <div class="row q-col-gutter-sm">
            <div class="col-sm-12 col-md-12 col-xs-12">
            <q-table
                flat square bordered wrap-cells dense
                :table-header-style="{ backgroundColor: '#f0f0f0' }"
                :loading="loading"
                :data="soldProducts"
                :columns="tableColumns"
                :filter="filter"
                row-key="id"
                :pagination.sync="pagination"
            >
              <template v-slot:bottom>
                <div class="text-bold">Grand Total</div>
                <div style="width:51%" class="text-right text-bold">Total: {{ stockQty|currency }}</div>
                <div style="width:40%" class="text-right text-bold">Total Value: {{ totalValue|currency }}</div>
              </template>
            </q-table>
            <div class="row q-mt-md">
              <span class="text-subtitle1 my-0 text-center q-mb-sm">Product Stock and Total Value on
                <strong>{{ new Intl.DateTimeFormat('en-GB').format(new Date()) }}</strong>
              </span>
            </div>
            <q-table
                flat square bordered wrap-cells dense
                :table-header-style="{ backgroundColor: '#f0f0f0' }"
                :loading="loading"
                :data="soldProducts"
                :columns="tableColumns"
                :filter="filter"
                row-key="id"
                :pagination.sync="pagination"
            >
              <template v-slot:bottom>
                <div class="text-bold">Grand Total</div>
                <div style="width:51%" class="text-right text-bold">Total: {{ stockQty|currency }}</div>
                <div style="width:40%" class="text-right text-bold">Total Value: {{ totalValue|currency }}</div>
              </template>
            </q-table>
            <q-btn
                  icon="list"
                  size='12px'
                  label="Product List"
                  color='info'
                  class='q-mt-md float-right'
                  @click="showProductList"
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
export default {
  name: 'PurchaseInvoiceList',
  data: () => ({
    loading: false,
    filter: '',
    purchasedProducts: [],
    soldProducts: [],
    tableColumns: [
      {
        name: 'name',
        align: 'left',
        label: 'Name.',
        field: 'name',
        sortable: true
        // style: 'width:155px'
      },
      {
        name: 'model',
        align: 'left',
        label: 'Model',
        field: 'model',
        sortable: true
      },
      {
        name: 'purchase_quantity',
        align: 'right',
        label: 'Purchase Qty.',
        field: 'purchase_quantity',
        format: (val, row) => Intl.NumberFormat('en-IN').format(val),
        sortable: true
      },
      {
        name: 'avg_purchase_rate',
        align: 'right',
        label: 'Avg. Purchase Rate',
        field: 'avg_purchase_rate',
        format: (val, row) => Intl.NumberFormat('en-IN',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        ).format(val),
        sortable: true
      },
      {
        name: 'subtotal',
        align: 'right',
        label: 'Subtotal',
        field: 'subtotal',
        format: (val, row) => Intl.NumberFormat('en-IN',
          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
        ).format(val),
        sortable: true
      }
    ],
    pagination: {
      rowsPerPage: 10
    }
  }),
  methods: {
    getSoldProducts () {
      this.loading = true
      this.$axios.get(`products-stock-report`, this.headers)
        .then(response => {
          if (response !== null) {
            this.purchasedProducts = response.data.data
            this.loading = false
            console.log(response.data.data)
          }
        })
        .catch(error => console.log(error))

      this.$axios.get(`products-sold-report`, this.headers)
        .then(response => {
          if (response !== null) {
            this.soldProducts = response.data.data
            this.loading = false
            console.log(response.data.data)
          }
        })
        .catch(error => console.log(error))
    },
    printPreview () {
      window.print()
    },
    showProductList () {
      this.$router.push({ name: `products` })
    }
  },
  computed: {
    stockQty () {
      if (this.soldProducts.length > 0) {
        let amount = this.soldProducts
          .map(item => item.purchase_quantity)
          .reduce((acc, curr) => Number(acc) + Number(curr))
        return amount
      } else {
        return 0
      }
    },
    totalValue () {
      if (this.soldProducts.length > 0) {
        let amount = this.soldProducts
          .map(item => item.subtotal)
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
    this.getSoldProducts()
    this.$store.dispatch('pageTitle', 'Product Stock Report')
  },
  filters: {
    currency (v) {
      return Intl.NumberFormat('en-IN',
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      ).format(v)
    }
  }
}
</script>
