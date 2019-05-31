<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-slide-transition>
          <div v-show="showForm">
            <q-card flat bordered class="q-pt-sm">
              <q-card-section>
                <q-form ref="supplierForm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.name"
                        label="Name *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.contact_person"
                        label="Contact Person *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.contact_number"
                        label="Contact Number *"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.address"
                        label="Address"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        dense
                        label="Thana"
                        v-model="supplier.thana_id"
                        :options="thanas"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                      >
                        <template v-slot:append>
                          <q-btn flat icon="refresh" dense outlined tabindex="0"
                            color="grey" @click="getThanas">
                          </q-btn>
                        </template>
                        <template v-slot:after>
                          <q-btn icon="add" dense outline
                            color="primary">
                          </q-btn>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        dense
                        label="District"
                        v-model="supplier.district_id"
                        :options="districts"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                      >
                        <template v-slot:append>
                          <q-btn flat icon="refresh" dense
                            outlined color="grey"
                            @click="getDistricts">
                          </q-btn>
                        </template>
                        <template v-slot:after>
                          <q-btn icon="add" dense outline
                            color="primary">
                          </q-btn>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-select
                        dense
                        label="Country"
                        v-model="supplier.country_id"
                        :options="countries"
                        option-value="id"
                        option-label="name"
                        emit-value map-options
                      >
                      <template v-slot:append>
                          <q-btn flat icon="refresh"
                            dense outlined color="grey"
                            @click="getCountries">
                          </q-btn>
                        </template>
                        <template v-slot:after>
                          <q-btn icon="add" dense outline
                            color="primary">
                          </q-btn>
                        </template>
                      </q-select>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.email"
                        label="Email"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="supplier.website"
                        label="Website"
                        lazy-rules
                      ></q-input>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12 q-mt-sm">
                      <q-toggle
                        v-model="supplier.status"
                        label="Status" left-label color="primary"
                      ></q-toggle>
                    </div>
                  </div>
                  <div class="row q-col-gutter-sm q-pl-sm q-mt-xs">
                    <q-btn
                      @click="saveSupplier"
                      label="Save" icon="save"
                      color="primary" class="q-mt-sm">
                    </q-btn>
                    <q-btn
                      @click="clearForm"
                      label="Clear" icon="clear_all"
                      color="grey" class="q-mt-sm q-ml-sm">
                    </q-btn>
                  </div>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
          </q-slide-transition>
          <q-card flat>
            <q-table
              flat
              :filter="filter"
              :data="suppliers"
              :loading="loading"
              :columns="tableColumns"
              row-key="id"
              :pagination.sync="pagination"
            >
            <template v-slot:top-left>
              <span class="text-h6">Suppliers</span>
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn
                round size="12px" color="red"
                :icon="showFormIcon" class="q-ml-md float-right"
                @click="showForm = !showForm">
              </q-btn>
            </template>
            <q-td slot="body-cell-update" slot-scope="props" :props="props">
              <q-btn-group>
                <q-btn
                  dense color="primary" icon="visibility"
                  class="q-px-sm"
                  :to="{name: 'supplier-detail', params: {id: props.value}}"
                />
                <q-btn
                  dense color="secondary"
                  icon="mdi-square-edit-outline"
                  class="q-px-sm"
                  @click="updateSupplier(props.row)"
                >
                </q-btn>
              </q-btn-group>
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
      address: '',
      thana_id: '',
      district_id: '',
      country_id: '',
      email: '',
      website: '',
      status: true,
      user_id: 1
    },
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
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
      { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
      { name: 'update', align: 'right', field: 'id' }
    ],
    thanas: [],
    districts: [],
    countries: [],
    pagination: {
      rowsPerPage: 10
    }
  }),
  methods: {
    saveSupplier () {
      this.$axios.post(`suppliers`, this.supplier)
        .then(response => {
          if (response !== null) {
            this.suppliers.push(response.data.data)
            this.$q.notify({
              color: 'green',
              textColor: 'white',
              position: 'bottom-left',
              message: 'Save successful'
            })
            this.clearForm()
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
    },
    clearForm () {
      this.supplier.name = ''
      this.supplier.contact_person = ''
      this.supplier.contact_number = ''
      this.supplier.address = ''
      this.supplier.thana_id = ''
      this.supplier.district_id = ''
      this.supplier.country_id = ''
      this.supplier.email = ''
      this.supplier.website = ''
      this.$refs.supplierForm.resetValidation()
    },
    updateSupplier (supplier) {
      console.log(supplier)
      // this.updateMode = true
      // this.showForm = true
      // this.supplier.id = supplier.id
      // this.supplier.name = supplier.name
      // this.supplier.contact_person = supplier.contact_person
      // this.supplier.contact_number = supplier.contact_number
      // this.supplier.address = supplier.address
      // this.supplier.thana_id = supplier.thana_id
      // this.supplier.district_id = supplier.district_id
      // this.supplier.country_id = supplier.country_id
      // this.supplier.email = supplier.email
      // this.supplier.website = supplier.website
    }
  },
  created () {
    this.getSuppliers()
    this.getThanas()
    this.getDistricts()
    this.getCountries()
  },
  computed: {
    showFormIcon () {
      if (this.showForm === false) {
        return 'add'
      } else {
        return 'clear'
      }
    }
  }
}
</script>
