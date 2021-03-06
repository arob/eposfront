<template>
  <q-page>
    <div class='row q-col-gutter-sm'>
      <div class='col-sm-12 col-md-12 col-xs-12'>
        <q-slide-transition>
          <div v-show='showForm'>
            <q-card flat square bordered class='q-pa-sm'>
              <q-card-section>
                <q-form ref='customerForm'>
                  <div class='row q-col-gutter-sm'>
                    <div class='col-sm-5 col-md-5 col-xs-12'>
                      <q-input
                        ref='name'
                        dense
                        no-error-icon
                        v-model='customer.name'
                        label='Name *'
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Required']"
                      ></q-input>
                    </div>
                    <div class='col-sm-4 col-md-4 col-xs-12'>
                      <q-input
                        ref='contact_number'
                        dense
                        no-error-icon
                        v-model='customer.contact_number'
                        label='Contact Number *'
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Required']"
                      ></q-input>
                    </div>
                    <div class='col-sm-3 col-md-3 col-xs-12'>
                      <q-input
                        ref='email'
                        dense
                        no-error-icon
                        v-model='customer.email'
                        label='Email'
                      ></q-input>
                    </div>
                  </div>
                  <div class='row q-col-gutter-sm'>
                    <div class='col-sm-5 col-md-5 col-xs-12'>
                      <q-input
                        ref='address'
                        dense
                        no-error-icon
                        v-model='customer.address'
                        label='Address'
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Required']"
                      ></q-input>
                    </div>
                    <div class='col-sm-4 col-md-4 col-xs-12'>
                      <q-select
                        dense
                        use-input
                        clearable
                        transition-show='scale'
                        transition-hide='scale'
                        label='Thana / Upazilla'
                        :options='thanaOptions'
                        v-model='customer.thana_id'
                        option-value='id'
                        option-label='name'
                        emit-value
                        map-options
                        input-debounce='0'
                        @filter='filterThanas'
                      ></q-select>
                    </div>
                    <div class='col-sm-3 col-md-3 col-xs-12'>
                      <q-select
                        use-input
                        dense
                        clearable
                        label='District'
                        transition-show='scale'
                        transition-hide='scale'
                        :options='districtOptions'
                        v-model='customer.district_id'
                        option-value='id'
                        option-label='name'
                        emit-value
                        map-options
                        input-debounce='0'
                        @filter='filterDistricts'
                      ></q-select>
                    </div>
                  </div>
                  <div class='row q-col-gutter-sm'>
                    <div class='col-sm-5 col-md-5 col-xs-12'>
                      <q-select
                        use-input
                        dense
                        clearable
                        label='Country'
                        transition-show='scale'
                        transition-hide='scale'
                        :options='countryOptions'
                        v-model='customer.country_id'
                        option-value='id'
                        option-label='name'
                        emit-value
                        map-options
                        input-debounce='0'
                        @filter='filterCountries'
                      ></q-select>
                    </div>
                    <div class='col-sm-4 col-md-4 col-xs-12'>
                      <q-input
                        ref='name'
                        dense
                        no-error-icon
                        v-model='customer.reference'
                        label='Reference'
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class='col-sm-3 col-md-3 col-xs-12 q-mt-sm'>
                      <q-toggle
                        v-model='customer.status'
                        label='Status'
                        left-label
                        color='primary'
                      ></q-toggle>
                    </div>
                  </div>
                  <div class='row q-col-gutter-sm q-pl-sm q-mt-xs'>
                    <q-btn
                      @click='saveCustomer'
                      size="12px"
                      label='Save'
                      icon='save'
                      color='primary'
                      class='q-mt-sm'
                    >
                      <q-tooltip
                        content-class='bg-amber text-black shadow-4'
                        transition-show='scale'
                        transition-hide='scale'
                      >
                        Save Record
                      </q-tooltip>
                    </q-btn>
                    <q-btn
                      @click='clearForm'
                      label='Clear'
                      icon='clear_all'
                      color='grey'
                      class='q-mt-sm q-ml-sm'
                    >
                    </q-btn>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-slide-transition>
        <q-card flat square bordered>
          <q-card-section class='q-pa-sm'>
            <q-table
              flat dense
              wrap-cells
              :filter='filter'
              :table-header-style="{ backgroundColor: '#f0f0f0'}"
              :data='customers'
              :loading='loading'
              :columns='tableColumns'
              :pagination.sync='pagination'
              row-key='id'
            >
              <template v-slot:top-left>
                <q-btn
                  size="12px" color="primary" outline
                  label="Reload"
                  icon="mdi-refresh"
                  class="q-mb-none"
                  @click="getCustomers"
                >
                </q-btn>
              </template>
              <template v-slot:top-right class='float-right'>
                <q-input
                  dense
                  debounce='300'
                  color='primary'
                  v-model='filter'
                >
                  <template v-slot:append>
                    <q-icon name='search' />
                  </template>
                </q-input>
                <q-btn
                  round
                  size='12px'
                  color='red'
                  :icon='showFormIcon'
                  class='q-mb-none q-ml-md float-right print-hide'
                  @click='showForm = !showForm'
                >
                </q-btn>
              </template>
              <q-td slot="body-cell-status" slot-scope="props" :props="props">
                <q-checkbox dense :value="!!props.row.status"></q-checkbox>
              </q-td>
              <q-td slot='body-cell-update' slot-scope='props' :props='props'>
                <q-btn-group>
                  <q-btn
                    dense
                    color='primary'
                    icon='visibility'
                    class='q-pa-none'
                    :to="{name: 'customer-detail', params: {id: props.value}
                    }"
                  >
                    <q-tooltip
                      content-class='bg-yellow text-black shadow-3'
                      transition-show='scale'
                      transition-hide='scale'
                    >
                      View customer details
                    </q-tooltip>
                  </q-btn>
                  <q-btn
                    dense
                    color='secondary'
                    icon='mdi-square-edit-outline'
                    class='q-pa-none'
                    @click='updateCustomer(props.row)'
                  >
                    <q-tooltip
                      content-class='bg-yellow text-black shadow-3'
                      transition-show='scale'
                      transition-hide='scale'
                    >
                      Update customer record
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
  name: 'Customer',
  data: () => ({
    showForm: false,
    updateMode: false,
    loading: false,
    filter: '',
    customers: [],
    customer: {
      id: '',
      name: '',
      contact_number: '',
      email: '',
      address: '',
      thana_id: '',
      district_id: '',
      country_id: '',
      reference: '',
      user_id: 1,
      status: true
    },
    tableColumns: [
      {
        name: 'name',
        align: 'left',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'contact_number',
        align: 'left',
        label: 'Contact Number',
        field: 'contact_number',
        sortable: true
      },
      {
        name: 'address',
        align: 'left',
        label: 'Address',
        field: 'address',
        sortable: true
      },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'update', align: 'right', label: 'Update', field: 'id' }
    ],
    pagination: {
      rowsPerPage: 10
    },
    thanas: [],
    thanaOptions: [],
    districts: [],
    districtOptions: [],
    countries: [],
    countryOptions: []
  }),
  methods: {
    getCustomers () {
      this.loading = true
      this.$axios
        .get(`customers`, this.headers)
        .then(response => {
          this.customers = response.data.data
          this.loading = false
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    saveCustomer () {
      if (this.updateMode === false) {
        this.$axios
          .post(`customers`, this.customer, this.headers)
          .then(response => {
            if (response.data.data !== null) {
              this.customers.push(response.data.data)
              this.$q.notify({
                color: 'green',
                position: 'bottom-right',
                message: 'Save successful'
              })
              // this.showForm = false
            } else {
              this.$q.notify({
                color: 'red',
                position: 'bottom-right',
                message: 'Error saving data!'
              })
            }
          })
          .catch(error => console.log(error))
      } else {
        this.$axios
          .put(`customers/${this.customer.id}`, this.customer, this.headers)
          .then(response => {
            if (response !== null) {
              this.getCustomers()
              this.$q.notify({
                color: 'green',
                position: 'bottom-right',
                message: 'Save successful'
              })
              // this.showForm = false
            } else {
              this.$q.notify({
                color: 'red',
                position: 'bottom-left',
                message: 'Something went wrong'
              })
            }
          })
          .catch(error => console.log(error))
      }
    },
    updateCustomer (customer) {
      this.showForm = true
      this.updateMode = true
      this.customer.id = customer.id
      this.customer.name = customer.name
      this.customer.contact_number = customer.contact_number
      this.customer.address = customer.address
      this.customer.email = customer.email
      this.customer.thana_id = customer.thana.id
      this.customer.district_id = customer.district.id
      this.customer.country_id = customer.country.id
      this.customer.reference = customer.reference
      this.customers.status = customer.status
      this.$refs.customerForm.resetValidation()
      console.log(customer)
    },
    getThanas () {
      this.$axios.get(`thanas`).then(response => {
        this.thanas = response.data.data
      })
    },
    getDistricts () {
      this.$axios.get(`districts`).then(response => {
        this.districts = response.data.data
      })
    },
    getCountries () {
      this.$axios.get(`countries`).then(response => {
        if (response !== null) {
          this.countries = response.data.data
        }
      })
    },
    filterThanas (val, update) {
      if (val === '') {
        update(() => {
          this.thanaOptions = this.thanas
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.thanaOptions = this.thanas.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1
        )
      })
    },
    filterDistricts (val, update) {
      if (val === '') {
        update(() => {
          this.districtOptions = this.districts
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.districtOptions = this.districts.filter(
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
    clearForm () {
      this.customer.name = ''
      this.customer.contact_number = ''
      this.customer.address = ''
      this.customer.email = ''
      this.customer.thana_id = ''
      this.customer.district_id = ''
      this.customer.country_id = ''
      this.customer.reference = ''
      this.$refs.customerForm.resetValidation()
    },
    print () {
      this.$htmlToPaper('printCustomers')
    }
  },
  computed: {
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
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + this.$store.state.token
        }
      }
    }
  },
  created () {
    this.getCustomers()
    this.getThanas()
    this.getDistricts()
    this.getCountries()
    this.$store.dispatch('pageTitle', 'Customers')
  }
}
</script>
