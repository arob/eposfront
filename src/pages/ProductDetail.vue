<template>
  <q-page>
    <q-card flat bordered>
      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-xs">
          <div class="col-sm-9 col-md-9 col-xs-12">
            <q-card flat bordered square class="full-height">
              <q-card-section class="q-pa-sm">
                <div class="row q-col-gutter-xs">
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Code</span>
                      </template>
                      <template v-slot:control>
                        {{product.code}}
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Name</span>
                      </template>
                      <template v-slot:control>
                        {{product.name}}
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Model</span>
                      </template>
                      <template v-slot:control>
                        {{product.model}}
                      </template>
                    </q-field>
                  </div>
                </div>
                <div class="row q-col-gutter-xs q-mt-xs">
                  <div class="col-sm-8 col-md-8 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Description</span>
                      </template>
                      <template v-slot:control>
                        <span class="text-caption">{{product.model}}</span>
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Warranty Period</span>
                      </template>
                      <template v-slot:control>
                        {{product.warranty_period > 0 ? product.warranty_period + ' (Month)' : 'No Warranty'}}
                      </template>
                    </q-field>
                  </div>
                </div>
                <div class="row q-col-gutter-xs q-mt-xs">
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Created At</span>
                      </template>
                      <template v-slot:control>
                        {{product.created_at | dateFormat}}
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Updated At</span>
                      </template>
                      <template v-slot:control>
                        {{product.updated_at | dateFormat}}
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense square filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Created By</span>
                      </template>
                      <template v-slot:control>
                        {{product.created_by}}
                      </template>
                    </q-field>
                  </div>
                </div>
                <div class="row q-col-gutter-xs q-mt-xs">
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Manufacturer</span>
                      </template>
                      <template v-slot:control>
                        {{product.manufacturer ? product.manufacturer.name : null}}
                      </template>
                    </q-field>
                  </div>
                  <div class="col-sm-4 col-md-4 col-xs-12">
                    <q-field dense filled>
                      <template v-slot:prepend>
                        <span class="text-caption">Origin</span>
                      </template>
                      <template v-slot:control>
                        {{product.origin ? product.origin.name : null}}
                      </template>
                    </q-field>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-card flat square bordered class="full-height">
              <q-card-section class="q-pa-sm">
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">Sale Price</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold">{{product.sales_rate}}</span>
                    </template>
                  </q-field>
                </div>
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">VAT (%)</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold">{{product.vat_pct}}</span>
                    </template>
                  </q-field>
                </div>
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">Tax (%)</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold text-right">{{product.tax_pct}}</span>
                    </template>
                  </q-field>
                </div>
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">Discount (%)</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold">{{product.discount_pct}}</span>
                    </template>
                  </q-field>
                </div>
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">Stock Quantity (%)</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold">
                        {{Number(product.stock_qty).toFixed(0)}}
                      </span>
                    </template>
                  </q-field>
                </div>
                <div class="col-auto">
                  <q-field dense borderless>
                    <template v-slot:prepend>
                      <span class="text-body2">Reorder Level</span>
                    </template>
                    <template v-slot:control>
                      <span class="text-bold">
                        {{product.reorder_level}}
                      </span>
                    </template>
                  </q-field>
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

import { date } from 'quasar'

export default {
  name: 'ProductDetail',
  data: () => ({
    product: {}
  }),
  methods: {
    getProduct () {
      this.$axios.get(`products/${this.$route.params.id}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          console.log(response.data.data)
          this.product = response.data.data
        })
    }
  },
  beforeMount () {
    this.getProduct()
  },
  created () {
    this.$store.dispatch('pageTitle', 'Product Detail')
  },
  filters: {
    dateFormat (d) {
      return date.formatDate(d, 'DD-MM-YYYY HH:mm:ss')
    }
  }
}
</script>
