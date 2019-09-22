<template>
  <q-page>
    <div class="row q-col-gutter-none">
      <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered>
            <q-card-section>
              <q-form ref="countryForm">
                <div class="row q-col-gutter-sm">
                  <div class="col-md-7  col-sm-7 col-xs-12">
                    <q-input
                      dense
                      no-error-icon
                      v-model="country.name"
                      label="Country"
                      lazy-rules
                      :rules="[ val => val && val.length > 0 || 'Required']"
                    ></q-input>
                  </div>
                  <div class="col-md-5 col-sm-5 col-xs-12">
                    <q-input
                      dense
                      no-error-icon
                      v-model="country.short_name"
                      label="Short"
                    >
                      <template v-slot:after>
                        <q-btn dense @click="saveCountry"
                          icon="save" type="submit" color="primary">
                        </q-btn>
                      </template>
                    </q-input>
                  </div>
                </div>
              </q-form>
            </q-card-section>
              <q-card flat bordered square>
                <q-card-section class="q-pa-sm">
                  <q-table
                    flat
                    :table-header-style="{ backgroundColor: '#f0f0f0' }"
                    :data="countries"
                    :columns="countryColumns"
                    :loading="countryLoading"
                    :pagination.sync="countryPagination"
                    row-key="name"
                  >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn
                      @click="updateCountry(props.row)"
                      icon="mdi-square-edit-outline"
                      round
                      size="12px"
                      color="primary"
                    >
                    </q-btn>
                  </q-td>
                  </q-table>
                </q-card-section>
              </q-card>
          </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="districtForm">
              <q-input
                dense
                no-error-icon
                v-model="district.name"
                label="District"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Required']"
              >
                <template v-slot:after>
                  <q-btn dense @click="addDistrict"
                    icon="save" type="submit" color="primary">
                  </q-btn>
                </template>
              </q-input>
            </q-form>
          </q-card-section>
            <q-card flat bordered square>
              <q-card-section class="q-pa-sm">
                <q-table
                  flat
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :data="districts"
                  :loading="districtLoading"
                  :columns="tableColumns"
                  :pagination.sync="districtPagination"
                  row-key="name"
                >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn
                      @click="updateDistrict(props.row)"
                      icon="mdi-square-edit-outline"
                      round
                      size="12px"
                      color="primary">
                    </q-btn>
                  </q-td>
                </q-table>
              </q-card-section>
            </q-card>
          </q-card>
      </div>
      <div class="col-md-4 col-sm-12 col-xs-12">
          <q-card flat bordered>
            <q-card-section>
              <q-form ref="thanaForm">
                <q-input
                  dense
                  no-error-icon
                  v-model="thana.name"
                  label="Upazilla"
                  lazy-rules
                  :rules="[ val => val && val.length > 0 || 'Required']"
                >
                  <template v-slot:after>
                    <q-btn dense @click="addThana"
                      icon="save" type="submit" color="primary">
                    </q-btn>
                  </template>
                </q-input>
              </q-form>
            </q-card-section>
            <q-card flat square bordered>
              <q-card-section class="q-pa-sm">
                <q-table
                  flat
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :data="thanas"
                  :loading="thanaLoading"
                  :columns="tableColumns"
                  :pagination.sync="thanaPagination"
                  row-key="name"
                >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn
                      @click="updateThana(props.row)"
                      icon="mdi-square-edit-outline"
                      round
                      size="12px"
                      color="primary">
                    </q-btn>
                  </q-td>
                </q-table>
              </q-card-section>
            </q-card>
          </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Places',
  data () {
    return {
      country: {
        name: '',
        short_name: ''
      },
      countries: [],
      countryUpdate: false,
      countryLoading: false,
      countryColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'short_name', align: 'left', label: 'Short', field: 'short_name', sortable: true },
        { name: 'update', align: 'right', label: 'Update', field: 'id', sortable: true }
      ],
      district: { name: '' },
      districts: [],
      districtUpdate: false,
      districtLoading: false,
      tableColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'update', align: 'right', label: 'Update', field: 'id' }
      ],
      thana: { name: '' },
      thanas: [],
      thanaUpdate: false,
      thanaLoading: false,
      countryPagination: {
        rowsPerPage: 7
      },
      districtPagination: {
        rowsPerPage: 7
      },
      thanaPagination: {
        rowsPerPage: 7
      }
    }
  },
  methods: {
    saveCountry () {
      if (this.countryUpdate === false) {
        this.$axios.post(`countries`, this.country)
          .then((response) => {
            console.log(response)
            this.countries.push(response.data.data)
            this.countryUpdate = false
            this.$refs.countryForm.reset()
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$axios.put(`countries/${this.country.id}`, this.country)
          .then((response) => {
            console.log(response)
            this.countries.push(response.data.data)
            this.getCountries()
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    getCountries () {
      this.countryLoading = true
      this.$axios.get('countries')
        .then(response => {
          // console.log(response.data.data)
          this.countries = response.data.data
          this.countryLoading = false
        })
    },
    updateCountry (country) {
      this.country.id = country.id
      this.country.name = country.name
      this.country.short_name = country.short_name
      this.country.short_name = country.short_name
      this.country.status = country.status
      this.countryUpdate = true
      this.$refs.countryForm.reset()
    },
    addDistrict () {
      this.$axios.post('districts', this.district)
        .then((response) => {
          this.districts.push(response.data.data)
          console.log('district added')
        })
    },
    getDistricts () {
      this.districtLoading = true
      this.$axios.get('districts')
        .then(response => {
          // console.log(response.data.data)
          this.districts = response.data.data
          this.districtLoading = false
        })
    },
    updateDistrict (district) {
      this.district.id = district.id
      this.district.name = district.name
      this.district.short_name = district.short_name
      this.district.short_name = district.short_name
      this.district.status = district.status
      this.districtUpdate = true
      this.$refs.districtForm.reset()
    },
    addThana () {
      this.$axios.post('thanas', this.thana)
        .then((response) => {
          this.thanas.push(response.data.data)
          console.log('thana added')
        })
    },
    getThanas () {
      this.thanaLoading = true
      this.$axios.get('thanas')
        .then(response => {
          // console.log(response.data.data)
          this.thanas = response.data.data
          this.thanaLoading = false
        })
    },
    updateThana (thana) {
      this.thana.id = thana.id
      this.thana.name = thana.name
      this.thana.status = thana.status
      this.districtUpdate = true
      this.$refs.districtForm.reset()
    }
  },
  created () {
    this.getCountries()
    this.getDistricts()
    this.getThanas()
    this.$store.dispatch('pageTitle', 'Places')
  }
}
</script>
