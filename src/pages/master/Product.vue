<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-slide-transition>
          <div v-show="showForm">
            <q-card flat bordered class="q-pa-sm">
              <q-card-section>
                <q-form ref="productForm">
                  <div class="row q-col-gutter-sm  q-mb-sm">
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        ref="code" dense no-error-icon readonly
                        v-model="product.code"
                        label="Code (Auto)"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input
                        dense no-error-icon autofocus
                        v-model="product.name"
                        label="Name *"
                        lazy-rules
                        :error="nameErrorStatus"
                        :error-message="product.nameError"
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.model"
                        label="Model *"
                        lazy-rules
                        :error="modelErrorStatus"
                        :error-message="product.modelError"
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        label="Rate *"
                        v-model="product.sales_rate"
                        :rules="[
                          val => val && val.length > 0 || 'Required',
                          val => !isNaN(val) || 'Must be number'
                        ]"
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-mb-md">
                    <div class="col-sm-8 col-md-8 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.description"
                        label="Description"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.warranty_period"
                        type="number"
                        label="Warranty (Months)"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.reorder_level"
                        type="number"
                        label="Re-order Level"
                        lazy-rules
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-mb-md">
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.discount_pct"
                        type="number"
                        label="Discount (%)"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.vat_pct"
                        type="number"
                        label="VAT (%)"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="product.tax_pct"
                        type="number"
                        label="Tax (%)"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-6">
                      <q-input
                        dense no-error-icon
                        v-model="product.capacity"
                        type="number"
                        label="Size / Capacity"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-6">
                      <q-select
                        dense no-error-icon
                        :options="capacityUnits"
                        label="Capacity Unit"
                        v-model="product.capacity_unit_id"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        use-input dense no-error-icon clearable
                        label="Manufacturer"
                        transition-show="scale"
                        transition-hide="scale"
                        :options="manufacturerOptions"
                        v-model="product.manufacturer_id"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                        input-debounce="0"
                        @filter="filterManufacturers"
                      />
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        use-input dense no-error-icon clearable
                        label="Origin"
                        transition-show="scale"
                        transition-hide="scale"
                        :options="countryOptions"
                        v-model="product.country_id"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                        input-debounce="0"
                        @filter="filterCountries"
                      />
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12 q-mt-sm">
                      <q-toggle
                        v-model="product.status"
                        label="Status" left-label color="primary">
                      </q-toggle>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-mt-xs">
                    <div class="col-sm-4 col-md-4 col-xl-12">
                      <q-btn
                        unelevated
                        @click="saveProduct"
                        icon="save" label="Save"
                        color="primary" class="q-mt-sm">
                      </q-btn>
                      <q-btn
                        unelevated
                        @click="clearForm"
                        label="Clear" icon="clear_all"
                        type="reset" color="grey-6"
                        class="q-mt-sm q-ml-sm">
                      </q-btn>
                    </div>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-slide-transition>
        <q-card flat bordered>
          <q-card-section class="q-pa-sm">
            <q-table
              flat dense
              :table-header-style="{ backgroundColor: '#f0f0f0' }"
              :filter="filter"
              :data="products"
              :loading="loading"
              :columns="tableColumns"
              :pagination.sync="pagination"
              row-key="id"
            >
              <template v-slot:top-left>
                <q-btn
                  size="12px" color="primary" outline
                  label="Reload"
                  icon="mdi-refresh"
                  class="q-mb-none"
                  @click="getProducts"
                >
                </q-btn>
              </template>
              <template v-slot:top-right>
                <q-input dense debounce="300"
                  color="primary" v-model="filter"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
                <q-btn
                  round size="12px" color="red"
                  :icon="showFormIcon"
                  class="q-mb-none q-ml-md float-right"
                  @click="showForm = !showForm"
                >
                </q-btn>
              </template>
              <q-td slot="body-cell-status" slot-scope="props" :props="props">
                <q-checkbox dense :value="!!props.row.status"></q-checkbox>
              </q-td>
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                <q-btn-group>
                  <q-btn
                    dense outlined
                    color="primary"
                    class="q-pa-none"
                    icon="mdi-eye-outline"
                    :to="{name: 'product-detail', params: {id: props.value}}"
                  >
                    <q-tooltip
                        content-class='bg-yellow text-black shadow-3'
                        transition-show='scale'
                        transition-hide='scale'
                      >
                        Product record details
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    dense color="secondary"
                    icon="mdi-square-edit-outline"
                    class="q-pa-none"
                    @click="updateProduct(props.row)"
                  >
                    <q-tooltip
                        content-class='bg-yellow text-black shadow-3'
                        transition-show='scale'
                        transition-hide='scale'
                      >
                        Update product record
                    </q-tooltip>
                  </q-btn>
                </q-btn-group>
              </q-td>
            </q-table>
          </q-card-section>
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
      id: '',
      code: '',
      name: '',
      nameError: '',
      model: '',
      modelError: '',
      capacity: '',
      capacity_unit_id: '',
      uom_id: '',
      description: '',
      sales_rate: '',
      vat_pct: '',
      tax_pct: '',
      discount_pct: '',
      reorder_level: '',
      warranty_period: '',
      supplier_id: '',
      manufacturer_id: '',
      country_id: '',
      status: true,
      user_id: 1
    },
    tableColumns: [
      { name: 'code', align: 'left', label: 'Code', field: 'code', sortable: true },
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'model', align: 'left', label: 'Model', field: 'model', sortable: true },
      {
        name: 'price',
        align: 'right',
        label: 'Sales Rate',
        field: 'sales_rate',
        sortable: true
      },
      // {
      //   name: 'stock',
      //   align: 'right',
      //   label: 'Stok Quantity',
      //   field: 'stock_qty',
      //   format: (val, row) => Number(val).toFixed(0),
      //   sortable: true
      // },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'update', align: 'right', label: 'Update', field: 'id' }
    ],
    pagination: {
      rowsPerPage: 10
    },
    manufacturers: [],
    manufacturerOptions: [],
    capacityUnits: [],
    uoms: [],
    countries: [],
    countryOptions: []
  }),
  methods: {
    getProducts () {
      this.loading = true
      this.$axios.get(`products`, this.headers)
        .then(response => {
          if (response !== null) {
            this.products = response.data.data
            this.loading = false
          }
        },
        error => {
          console.log(error)
        })
        .catch(error => console.log(error))
    },
    saveProduct () {
      this.$refs.productForm.validate()
        .then(result => {
          if (result === true) {
            if (this.updateMode !== true) {
              this.$axios.post(`products`, this.product, this.headers)
                .then(response => {
                  if (response !== null) {
                    // console.log(response.data.data)
                    this.products.push(response.data.data)
                    this.$q.notify({
                      message: 'Save successfull!',
                      position: 'bottom-right',
                      color: 'green'
                    })
                    this.clearForm()
                  }
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response.data.errors['code'][0])
                    // this.product.codeError = error.response.data.errors['code'][0]
                  }
                })
            } else {
              this.$axios.put(`products/${this.product.id}`, this.product, this.headers)
                .then(response => {
                  if (response !== null) {
                    console.log(response.data.data)
                    this.getProducts()
                    this.$q.notify({
                      message: 'Update successfull!',
                      position: 'bottom-right',
                      color: 'green'
                    })
                    this.clearForm()
                  }
                })
                .catch(error => {
                  if (error.response) {
                    console.log(error.response.data.errors['code'][0])
                    // this.product.codeError = error.response.data.errors['code'][0]
                  }
                })
            }
          }
        })
        .catch(formError => console.log(formError))
    },
    updateProduct (product) {
      console.log(product)
      this.showForm = true
      this.updateMode = true
      this.product.id = product.id
      this.product.code = product.code
      this.product.name = product.name
      this.product.model = product.model
      this.product.sales_rate = product.sales_rate
      this.product.description = product.description
      this.product.warranty_period = product.warranty_period
      this.product.capacity = product.capacity
      this.product.reorder_level = product.reorder_level
      this.product.discount_pct = product.discount_pct
      this.product.vat_pct = product.vat_pct
      this.product.tax_pct = product.tax_pct
      this.product.capacity_unit_id = product.capacityUnit ? product.capacityUnit.id : null
      this.product.uom_id = product.uom ? product.uom.id : null
      this.product.manufacturer_id = product.manufacturer ? product.manufacturer.id : null
      this.product.country_id = product.origin ? product.origin.id : null
      this.product.status = !!product.status
    },
    clearForm () {
      this.product.code = ''
      this.product.name = ''
      this.product.model = ''
      this.product.sales_rate = ''
      this.product.description = ''
      this.product.reorder_level = ''
      this.product.warranty_period = ''
      this.product.capacity = ''
      this.product.capacity_unit_id = ''
      this.product.uom_id = ''
      this.product.manufacturer_id = ''
      this.product.country_id = ''
      this.$refs.productForm.resetValidation()
      this.updateMode = false
    },
    getManufacturers () {
      this.$axios.get(`manufacturers`, this.headers)
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
    filterManufacturers (val, update) {
      if (val === '') {
        update(() => {
          this.manufacturerOptions = this.manufacturers
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.manufacturerOptions = this.manufacturers.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterCountries (val, update) {
      if (val === '') {
        update(() => {
          this.countryOptions = this.countries
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.countryOptions = this.countries.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
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
    this.getManufacturers()
    this.getCountries()
    this.$store.dispatch('pageTitle', 'Products')
  },
  computed: {
    nameErrorStatus () {
      return this.product.nameError !== ''
    },
    modelErrorStatus () {
      return this.product.modelError !== ''
    },
    showFormIcon () {
      if (this.showForm === false) {
        return 'add'
      } else {
        return 'clear'
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
  }
}
</script>
