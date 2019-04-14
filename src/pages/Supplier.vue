<template>
  <q-page padding>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-6 col-md-6 col-xs-12">
        <h5 class="q-my-none">Suppliers</h5>
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
                <q-form ref="supplierForm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.name"
                        label="Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.contact_person"
                        label="Contact Person"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.contact_number"
                        label="Contact Number"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-mb-md">
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.email"
                        label="Email"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.address"
                        label="Address"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="supplier.website"
                        label="Website"
                        lazy-rules
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        outlined
                        dense
                        label="Thana"
                        v-model="supplier.thana_id"
                        :options="thanas"
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
                        label="District"
                        v-model="supplier.district_id"
                        :options="districts"
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
                        label="Country"
                        v-model="supplier.country_id"
                        :options="countries"
                        option-value="id"
                        option-label="name"
                        emit-value
                        map-options
                      />
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12 q-mt-sm">
                      <q-toggle
                        v-model="supplier.status"
                        label="Status"
                        left-label
                        color="teal"
                      ></q-toggle>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-pl-sm q-mt-xs">
                    <q-btn
                      @click="saveSupplier"
                      label="Save"
                      icon="save"
                      type="submit"
                      color="teal"
                      class="q-mt-sm">
                    </q-btn>
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
              :data="suppliers"
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
  name: 'Supplier',
  data: () => ({
    showForm: false,
    updateMode: false,
    loading: false,
    filter: '',
    suppliers: [],
    supplier: {
      name: '',
      contact_person: '',
      contact_number: '',
      email: '',
      address: '',
      thana_id: '',
      district_id: '',
      country_id: '',
      website: null,
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
        name: 'contact_person',
        align: 'left',
        label: 'Contact Person',
        field: 'contact_person',
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
        name: 'email',
        align: 'left',
        label: 'Email',
        field: 'email',
        sortable: true
      },
      {
        name: 'payable',
        align: 'right',
        type: 'number',
        label: 'Payable',
        field: 'payable',
        sortable: true
      },
      {
        name: 'update',
        align: 'right',
        field: 'id'
      }
    ],
    thanas: [],
    districts: [],
    countries: []
  }),
  methods: {
    saveSupplier () {
      this.$axios.post(`suppliers`, this.supplier)
        .then(response => {
          if (response !== null) {
            this.suppliers.push(response.data.data)
            this.$q.notify({ message: 'Save successful' })
            this.showForm = false
          } else {
            this.$q.notify({ message: 'Something went wrong' })
          }
        },
        error => console.log(error)
        )
        .catch(error => console.log(error))
    },
    getSuppliers () {
      this.$axios.get(`suppliers`)
        .then(response => {
          this.suppliers = response.data.data
        },
        error => console.log(error)
        )
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
          this.countries = response.data.data
        })
    }
  },
  created () {
    this.getSuppliers()
    this.getThanas()
    this.getDistricts()
    this.getCountries()
  }
}
</script>
