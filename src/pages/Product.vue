<template>
  <q-page padding doc-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-6 col-md-6 col-xs-12">
        <h5 class="q-my-none">Products</h5>
      </div>
      <div class="col-sm-6 col-md-6 col-xs-12 text-right">
        <q-btn
          round
          size="12px"
          color="red"
          icon="add"
          class="q-mb-sm"
          @click="showForm = !showForm"
        >
        </q-btn>
      </div>
    </div>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-slide-transition>
          <div v-show="showForm">
            <q-card flat bordered>
              <q-card-section>
                <q-form ref="productForm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.code"
                        label="Code"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input
                        outlined
                        dense
                        standout
                        no-error-icon
                        v-model="product.name"
                        label="Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.model"
                        label="Model"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.sales_rate"
                        type="number"
                        label="Rate"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-8 col-md-8 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.description"
                        label="Description"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.reorder_level"
                        type="number"
                        label="Re-order Level"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.warranty_period"
                        type="number"
                        label="Warranty (Months)"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.discount_pct"
                        type="number"
                        label="Discount (%)"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.vat_pct"
                        type="number"
                        label="VAT (%)"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.tax_pct"
                        type="number"
                        label="Tax (%)"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="product.capacity"
                        type="number"
                        label="Size / Capacity"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-select
                        outlined
                        dense
                        :options="capacityUnits"
                        label="Capacity Unit"
                        v-model="product.capacity_unit_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-select
                        outlined
                        dense
                        :options="uoms"
                        label="Measuring Unit"
                        v-model="product.uom_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        outlined
                        dense
                        :options="suppliers"
                        label="Supplier"
                        v-model="product.supplier_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        outlined
                        dense
                        :options="manufacturers"
                        label="Manufacturer"
                        v-model="product.manufacturer_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-select
                        outlined
                        dense
                        label="Origin"
                        :options="countries"
                        v-model="product.country_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12 q-mt-sm">
                      <q-toggle
                        v-model="product.status"
                        label="Status"
                        left-label
                        color="teal"
                      ></q-toggle>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-mt-xs">
                    <div class="col-sm-4 col-md-4 col-xl-12">
                      <q-btn
                        @click="saveProduct"
                        icon="save"
                        label="Save"
                        type="submit"
                        color="teal"
                        class="q-mt-sm">
                      </q-btn>
                      <q-btn
                        label="Clear"
                        icon="clear_all"
                        type="reset"
                        color="grey-6"
                        class="q-mt-sm q-ml-sm">
                      </q-btn>
                    </div>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-slide-transition>
        <q-card flat bordered class="q-mt-xs">
          <q-table
            flat
            title="Treats"
            :filter="filter"
            :data="products"
            :loading="loading"
            :columns="tableColumns"
            row-key="id"
          >
            <template v-slot:top>
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </template>
            <q-td slot="body-cell-update" slot-scope="props" :props="props">
              <q-btn
                icon="edit"
                round
                size="12px"
                color="teal">
                {{props.value}}
              </q-btn>
            </q-td>
          </q-table>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Product',
  data: () => ({
    updateMode: false,
    showForm: false,
    loading: false,
    filter: '',
    products: [],
    product: {
      code: '',
      name: '',
      model: '',
      capacity: '',
      capacity_unit_id: '',
      uom_id: '',
      description: '',
      sales_rate: '',
      vat_pct: 0,
      tax_pct: 0,
      discount_pct: 0,
      reorder_level: 0,
      warranty_period: '',
      supplier_id: '',
      manufacturer_id: '',
      country_id: '',
      status: true,
      user_id: 1
    },
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
        name: 'price',
        align: 'right',
        label: 'Rate',
        field: 'sales_rate',
        sortable: true
      },
      {
        name: 'update',
        align: 'right',
        label: 'Update',
        field: 'id'
      }
    ],
    suppliers: [],
    manufacturers: [],
    capacityUnits: [],
    uoms: [],
    countries: []
  }),
  methods: {
    getProducts () {
      this.$axios.get(`products`)
        .then(response => {
          if (response !== null) {
            this.products = response.data.data
          }
        },
        error => console.log(error)
        )
    },
    saveProduct () {
      console.log(this.product)
      this.$axios.post(`products`, this.product)
        .then(response => {
          if (response !== null) {
            console.log(response.data.data)
            this.products.push(response.data.data)
          }
        },
        error => console.log(error)
        )
    },
    resetForm () {
      this.refs.productForm.reset()
    },
    getSuppliers () {
      this.$axios.get(`suppliers`)
        .then(response => {
          if (response !== null) {
            this.suppliers = response.data.data
          }
        })
    },
    getManufacturers () {
      this.$axios.get(`manufacturers`)
        .then(response => {
          if (response !== null) {
            this.manufacturers = response.data.data
          }
        })
    },
    getCapacityUnits () {
      this.$axios.get(`capacity-units`)
        .then(response => {
          if (response !== null) {
            this.capacityUnits = response.data.data
          }
        })
    },
    getCountries () {
      this.$axios.get(`countries`)
        .then(response => {
          if (response !== null) {
            this.countries = response.data.data
          }
        })
    },
    getUoms () {
      this.$axios.get(`uoms`)
        .then(response => {
          if (response !== null) {
            this.uoms = response.data.data
          }
        })
    }
  },
  created () {
    this.getProducts()
    this.getCapacityUnits()
    this.getUoms()
    this.getSuppliers()
    this.getManufacturers()
    this.getCountries()
  }
}
</script>
