<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="q-py-sm">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <span class="text-h6">Customers</span>
              <q-btn
                round
                size="12px"
                color="red"
                :icon="showFormIcon"
                class="q-mb-none float-right"
                @click="showForm = !showForm"
              >
              </q-btn>
            </div>
          </div>
      </q-card-section>
    </q-card>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-slide-transition>
          <div v-show="showForm">
            <q-card flat bordered>
              <q-card-section>
                <form ref="customerForm" @reset="resetForm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input
                        ref="name"
                        outlined
                        dense
                        no-error-icon
                        v-model="customer.name"
                        label="Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        ref="contact_number"
                        outlined
                        dense
                        no-error-icon
                        v-model="customer.contact_number"
                        label="Contact Number"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        ref="email"
                        outlined
                        dense
                        no-error-icon
                        v-model="customer.email"
                        label="Email"
                        lazy-rules
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input
                        ref="address"
                        outlined
                        dense
                        no-error-icon
                        v-model="customer.address"
                        label="Address"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-select
                        outlined
                        dense
                        label="Thana / Upazilla"
                        :options="thanas"
                        v-model="customer.thana_id"
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
                        label="District"
                        :options="districts"
                        v-model="customer.district_id"
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
                        label="Country"
                        :options="countries"
                        v-model="customer.country_id"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input
                        ref="name"
                        outlined
                        dense
                        no-error-icon
                        v-model="customer.reference"
                        label="Reference"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12 q-mt-sm">
                      <q-toggle
                        v-model="customer.status"
                        label="Status"
                        left-label
                        color="teal"
                      ></q-toggle>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-pl-sm q-mt-xs">
                    <q-btn
                      @click="saveCustomer"
                      label="Save"
                      icon="save"
                      color="teal"
                      class="q-mt-sm">
                    </q-btn>
                    <q-btn
                      label="Clear"
                      type="reset"
                      icon="clear_all"
                      color="grey"
                      class="q-mt-sm q-ml-sm">
                    </q-btn>
                  </div>
                </form>
              </q-card-section>
            </q-card>
          </div>
        </q-slide-transition>
        <q-card flat bordered>
          <q-table
            flat
            title="Treats"
            :filter="filter"
            :data="customers"
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
                round
                icon="edit"
                size="12px"
                color="teal">
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
  name: 'Customer',
  data: () => ({
    showForm: false,
    updateMode: true,
    loading: false,
    filter: '',
    customers: [],
    customer: {
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
      {
        name: 'update',
        align: 'right',
        label: 'Update',
        field: 'id'
      }
    ],
    thanas: [],
    districts: [],
    countries: []
  }),
  methods: {
    getCustomers () {
      this.$axios.get(`customers`)
        .then(response => {
          this.customers = response.data.data
        })
        .catch(error => {
          console.log(error.response)
        })
    },
    saveCustomer () {
      this.$axios.post(`customers`, this.customer)
        .then(response => {
          if (response !== null) {
            this.customers.push(response.data.data)
            this.$q.notify({ message: 'Save successful' })
            this.showForm = false
          } else {
            this.$q.notify({ message: 'Something went wrong' })
          }
        })
        .catch(error => console.log(error))
    },
    getThanas () {
      this.$axios.get(`thanas`)
        .then(response => {
          this.thanas = response.data.data
        })
    },
    getDistricts () {
      this.$axios.get(`districts`)
        .then(response => {
          this.districts = response.data.data
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
    resetForm () {
      this.updateMode = false
    }
  },
  computed: {
    showFormIcon () {
      if (this.showForm === false) {
        return 'add'
      } else {
        return 'clear'
      }
    }
  },
  created () {
    this.getCustomers()
    this.getThanas()
    this.getDistricts()
    this.getCountries()
  }
}
</script>

<style>
</style>
