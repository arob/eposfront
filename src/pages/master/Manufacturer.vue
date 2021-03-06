<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-slide-transition>
          <div v-show="showForm">
            <q-card flat bordered>
              <q-card-section>
                <q-form ref="manufacturer">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="manufacturer.name"
                        label="Name"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-2 col-md-2 col-xs-12">
                      <q-input
                        dense o-error-icon
                        v-model="manufacturer.short_name"
                        label="Short Name"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        dense no-error-icon
                        v-model="manufacturer.website"
                        label="Website"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-select
                        dense use-input no-error-icon
                        label="Country"
                        v-model="manufacturer.country_id"
                        :options="countryOptions"
                        option-value="id"
                        option-label="name"
                        option-disable="inactive"
                        emit-value map-options
                        input-debounce="0"
                        @filter="filterCountries"
                      />
                    </div>
                    <div class="col-sm2 col-md-2 col-xs-12">
                      <q-toggle
                        v-model="manufacturer.status"
                        label="Status"
                        left-label color="primary"
                      ></q-toggle>
                    </div>
                  </div>
                  <q-btn
                    @click="saveManufacturer"
                    label="Save" type="submit"
                    color="primary" class="q-mt-sm">
                  </q-btn>
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
              :data="manufacturers"
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
                  @click="getManufacturers"
                >
                </q-btn>
              </template>
              <template v-slot:top-right>
                <q-input dense debounce="300" color="primary" v-model="filter">
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
                <q-btn
                  dense color="secondary"
                  icon="mdi-square-edit-outline"
                  class="q-pa-none"
                  @click="updateManufacturer(props.row)"
                >
                  <q-tooltip
                    content-class='bg-yellow text-black shadow-3'
                    transition-show='scale'
                    transition-hide='scale'
                  >
                    Update manufacturer record.
                  </q-tooltip>
                </q-btn>
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
  name: 'Manufacturer',
  data: () => ({
    showForm: false,
    updateMode: false,
    filter: '',
    manufacturers: [],
    loading: false,
    manufacturer: {
      id: '',
      name: '',
      short_name: '',
      country_id: '',
      status: true,
      user_id: 1
    },
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'short_name', align: 'left', label: 'Short', field: 'short_name', sortable: true },
      { name: 'website', align: 'left', label: 'Website', field: 'website', sortable: true },
      { name: 'country', align: 'left', label: 'Country', field: 'country', sortable: true },
      { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
      { name: 'update', align: 'right', field: 'id' }
    ],
    pagination: {
      rowsPerPage: 10
    },
    countries: [],
    countryOptions: []
  }),
  methods: {
    getCountries () {
      this.$axios.get(`countries`)
        .then(response => {
          this.countries = response.data.data
        })
    },
    saveManufacturer () {
      if (this.updateMode === false) {
        this.$axios.post(`manufacturers`, this.manufacturer, this.headers)
          .then(response => {
            if (response !== undefined) {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Saved successfully!'
              })
              this.manufacturers.push((response.data.data))
            }
          })
          .catch(error => console.log(error))
      } else {
        this.$axios.put(`manufacturers/${this.manufacturer.id}`, this.manufacturer, this.headers)
          .then(response => {
            if (response !== undefined) {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Update successfull'
              })
              this.manufacturers.push((response.data.data))
            }
          })
          .catch(error => console.log(error))
      }
    },
    getManufacturers () {
      this.loading = true
      this.$axios.get(`manufacturers`, this.headers)
        .then(response => {
          this.manufacturers = response.data.data
          this.loading = false
        })
        .catch(error => console.log(error))
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
    updateManufacturer (manufacturer) {
      this.manufacturer.id = manufacturer.id
      this.manufacturer.name = manufacturer.name
      this.manufacturer.short_name = manufacturer.short_name
      this.manufacturer.website = manufacturer.website
      this.manufacturer.country_id = manufacturer.country_id
      this.updateMode = true
      this.showForm = true
      // console.log(manufacturer)
    }
  },
  created () {
    this.getCountries()
    this.getManufacturers()
    this.$store.dispatch('pageTitle', 'Manufacturers')
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
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    }
  }
}
</script>
