<template>
  <q-page padding>
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
                        outlined
                        dense
                        no-error-icon
                        v-model="manufacturer.name"
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
                        v-model="manufacturer.short_name"
                        label="Short Name"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="manufacturer.website"
                        label="Website"
                        lazy-rules
                      ></q-input>
                    </div>
                    <div class="col-sm-3 col-md-3 col-xs-12">
                      <q-select
                        outlined
                        dense
                        label="Country"
                        v-model="manufacturer.country_id"
                        :options="countries"
                        option-value="id"
                        option-label="name"
                        option-disable="inactive"
                        emit-value
                        map-options
                      />
                    </div>
                    <div class="col-sm2 col-md-2 col-xs-12">
                      <q-toggle
                        v-model="manufacturer.status"
                        label="Status"
                        left-label
                        color="teal"
                      ></q-toggle>
                    </div>
                  </div>
                  <q-btn @click="saveManufacturer"
                    label="Save"
                    type="submit"
                    color="teal"
                    class="q-mt-sm">
                  </q-btn>
                </q-form>
              </q-card-section>
            </q-card>
          </div>
        </q-slide-transition>
        <q-card flat bordered>
          <q-table
            flat
            :filter="filter"
            :data="manufacturers"
            :loading="loading"
            :columns="tableColumns"
            row-key="id"
          >
            <template v-slot:top-left>
              <span class="text-h6">Manufacturers</span>
            </template>
            <template v-slot:top-right>
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <q-btn
                round
                size="12px"
                color="red"
                :icon="showFormIcon"
                class="q-mb-none q-ml-md float-right"
                @click="showForm = !showForm"
              >
              </q-btn>
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
  name: 'Manufacturer',
  data: () => ({
    showForm: false,
    updateMode: false,
    filter: '',
    manufacturers: [],
    loading: false,
    manufacturer: {
      name: '',
      short_name: '',
      country_id: '',
      status: true
      // user_id: ''
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
        name: 'short_name',
        align: 'left',
        label: 'Short Name',
        field: 'short_name',
        sortable: true
      },
      {
        name: 'website',
        align: 'left',
        label: 'Website',
        field: 'website',
        sortable: true
      },
      {
        name: 'country',
        align: 'left',
        label: 'Country',
        field: 'country',
        sortable: true
      },
      {
        name: 'update',
        align: 'right',
        field: 'id'
      }
    ],
    countries: []
  }),
  methods: {
    getCountries () {
      this.$axios.get(`countries`)
        .then(response => {
          this.countries = response.data.data
        })
    },
    saveManufacturer () {
      this.$axios.post(`manufacturers`, this.manufacturer)
        .then(response => {
          if (response !== undefined) {
            this.$q.notify({
              color: 'green',
              textColor: 'white',
              position: 'top-right',
              message: 'Saved successfully!'
            })
          }
        })
        .catch(error => console.log(error))
    },
    getManufacturers () {
      this.loading = true
      this.$axios.get(`manufacturers`)
        .then(response => {
          this.manufacturers = response.data.data
          this.loading = false
        })
    }
  },
  created () {
    this.getCountries()
    this.getManufacturers()
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
