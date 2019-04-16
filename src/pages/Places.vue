<template>
  <div>
    <q-page padding>
      <q-card flat bordered>
        <q-card-section class="q-py-sm">
            <div class="row">
              <div class="col-sm-12 col-md-12 col-xs-12">
                <span class="text-h6">Places</span>
              </div>
            </div>
        </q-card-section>
      </q-card>
      <div class="row q-col-gutter-sm">
        <div class="col-md-4 col-sm-12 col-xs-12">
            <q-card flat bordered>
              <q-card-section>
                <q-form ref="countryForm">
                  <div class="row q-col-gutter-sm">
                    <div class="col-md-8  col-sm-8 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="country.name"
                        label="Country"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-md-4 col-sm-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="country.short_name"
                        label="Short"
                      ></q-input>
                    </div>
                  </div>
                  <q-btn @click="addCountry" label="Add" type="submit" color="teal"></q-btn>
                </q-form>
              </q-card-section>
              <div class="q-pt-sm">
                <q-table
                  flat
                  :data="countries"
                  :columns="countryColumns"
                  :loading="countryLoading"
                  row-key="name"
                >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    @click="updateCountry(props.row)"
                    icon="edit"
                    round
                    size="12px"
                    color="teal"
                  >
                    {{props.value}}
                  </q-btn>
                </q-td>
                </q-table>
              </div>
            </q-card>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
            <q-card flat bordered>
              <q-card-section>
                <q-form ref="districtForm">
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model="district.name"
                    label="District"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Required']"
                  ></q-input>
                  <q-btn @click="addDistrict" label="Add" type="submit" color="teal"/>
                </q-form>
              </q-card-section>
              <div class="q-pt-sm">
                <q-table
                  flat
                  :data="districts"
                  :loading="districtLoading"
                  :columns="districtColumns"
                  row-key="name"
                >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn
                      @click="updateDistrict(props.row)"
                      icon="edit"
                      round
                      size="12px"
                      color="teal">
                      {{props.value}}
                    </q-btn>
                  </q-td>
                </q-table>
              </div>
            </q-card>
        </div>
        <div class="col-md-4 col-sm-12 col-xs-12">
            <q-card flat bordered>
              <q-card-section>
                <q-form ref="thanaForm">
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model="thana.name"
                    label="Upazilla"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Required']"
                  ></q-input>
                  <q-btn @click="addThana" label="Add" type="submit" color="teal"/>
                </q-form>
              </q-card-section>
              <div class="q-pt-sm">
                <q-table
                  flat
                  :data="thanas"
                  :loading="thanaLoading"
                  :columns="thanaColumns"
                  row-key="name"
                >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn
                      @click="updateThana(props.row)"
                      icon="edit"
                      round
                      size="12px"
                      color="teal">
                      {{props.value}}
                    </q-btn>
                  </q-td>
                </q-table>
              </div>
            </q-card>
        </div>
      </div>
    </q-page>
  </div>
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
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'short_name',
          align: 'left',
          label: 'Short Name',
          field: 'short_name',
          sortable: true
        },
        {
          name: 'update',
          align: 'right',
          label: 'Update',
          field: 'id',
          sortable: true
        }
      ],
      district: {
        name: ''
      },
      districts: [],
      districtUpdate: false,
      districtLoading: false,
      districtColumns: [
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'update',
          align: 'right',
          label: 'Update',
          field: 'id'
        }
      ],
      thana: {
        name: ''
      },
      thanas: [],
      thanaUpdate: false,
      thanaLoading: false,
      thanaColumns: [
        {
          name: 'name',
          align: 'left',
          label: 'Name',
          field: 'name',
          sortable: true
        },
        {
          name: 'update',
          align: 'right',
          label: 'Update',
          field: 'id'
        }
      ]
    }
  },
  methods: {
    addCountry () {
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
  }
}
</script>
