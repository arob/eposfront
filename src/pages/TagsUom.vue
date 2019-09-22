<template>
  <q-page>
    <div class="row q-col-gutter-none">
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="tagsForm">
              <div class="row q-col-gutter-sm">
                <div class="col-12">
                  <q-input dense no-error-icon
                    v-model="tag.name"
                    label="Tag"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Required']"
                  >
                    <template v-slot:after>
                      <q-btn dense @click="saveTag"
                        icon="save" type="submit" color="primary">
                      </q-btn>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-form>
          </q-card-section>
            <q-card flat bordered>
              <q-card-section class="q-pa-sm">
                <q-table
                  flat
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :data="tags"
                  :loading="tagsLoading"
                  :columns="tagColumns"
                  :pagination.sync="tagsPagination"
                  row-key="name"
                  >
                  <q-td slot="body-cell-update" slot-scope="props" :props="props">
                    <q-btn round icon="mdi-square-edit-outline" size="12px"
                      color="primary"
                    ></q-btn>
                  </q-td>
                </q-table>
              </q-card-section>
            </q-card>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="uomForm">
              <div class="row q-col-gutter-sm">
                <div class="col-sm-12 col-md-12 col-sx-12">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-7 col-md-7 col-xs-12">
                      <q-input dense no-error-icon
                        v-model="uom.name"
                        label="Measurement unit"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input dense no-error-icon
                        v-model="uom.short_name"
                        label="Short"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      >
                        <template v-slot:after>
                          <q-btn dense @click="saveUom"
                            icon="save" type="submit" color="primary">
                          </q-btn>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
            <q-card flat bordered>
              <q-card-section class="q-pa-sm">
                <q-table
                  flat
                  :table-header-style="{ backgroundColor: '#f0f0f0' }"
                  :data="uoms"
                  :loading="uomsLoading"
                  :columns="tableColumns"
                  :pagination.sync="uomPagination"
                  row-key="uoms"
                >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    icon="mdi-square-edit-outline"
                    round size="12px"
                    color="primary">
                  </q-btn>
                </q-td>
              </q-table>
              </q-card-section>
            </q-card>
        </q-card>
      </div>
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="capacityUnitForm">
              <div class="row q-col-gutter-sm">
                <div class="col-sm-12 col-md-12 col-sx-12">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-7 col-md-7 col-xs-12">
                      <q-input dense no-error-icon
                        v-model="sizeUnit.name"
                        label="Capacity unit"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-5 col-md-5 col-xs-12">
                      <q-input dense no-error-icon
                        v-model="sizeUnit.short_name"
                        label="Short"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      >
                        <template v-slot:after>
                          <q-btn dense @click="saveCapacityUnit"
                            icon="save" type="submit" color="primary">
                          </q-btn>
                        </template>
                      </q-input>
                    </div>
                  </div>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <q-card flat bordered>
            <q-card-section class="q-pa-sm">
              <q-table
                flat
                :table-header-style="{ backgroundColor: '#f0f0f0' }"
                :data="capacityUnits"
                :columns="tableColumns"
                :loading="capacityUnitsLoading"
                :pagination.sync="capacityPagination"
                row-key="id"
                >
                <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    icon="mdi-square-edit-outline"
                    round size="12px"
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
  name: 'TagUom',
  data () {
    return {
      tag: {
        name: ''
      },
      tags: [],
      tagUpdate: false,
      tagsLoading: false,
      tagColumns: [
        { name: 'name', align: 'left', label: 'Tag', field: 'name', sortable: true },
        { name: 'update', align: 'right', label: 'Update', field: 'id' }
      ],
      uom: {
        name: '',
        short_name: ''
      },
      uoms: [],
      uomUpdate: false,
      uomsLoading: false,
      tableColumns: [
        { name: 'name', align: 'left', label: 'Unit Name', field: 'name', sortable: true },
        { name: 'short_name', align: 'left', label: 'Short', field: 'short_name', sortable: true },
        { name: 'update', align: 'right', label: 'Update', field: 'id' }
      ],
      sizeUnit: {
        name: '',
        short_name: ''
      },
      capacityUnits: [],
      capacityUnitUpdate: false,
      capacityUnitsLoading: false,
      tagsPagination: {
        rowsPerPage: 7
      },
      uomPagination: {
        rowsPerPage: 7
      },
      capacityPagination: {
        rowsPerPage: 7
      }
    }
  },
  methods: {
    saveTag () {
      this.$axios.post(`tags`, this.tag)
        .then((response) => {
          console.log(response)
          this.tags.push(response.data.data)
          this.tagUpdate = false
          this.$refs.tagsForm.reset()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getTags () {
      this.tagsLoading = true
      this.$axios.get(`tags`)
        .then(response => {
          this.tags = response.data.data
          this.tagsLoading = false
        })
        .catch(error => console.log(error))
    },
    saveUom () {
      this.$axios.post(`uoms`, this.uom)
        .then((response) => {
          console.log(response)
          this.uoms.push(response.data.data)
          this.uomUpdate = false
          this.$refs.tagsForm.reset()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getUoms () {
      this.uomsLoading = true
      this.$axios.get(`uoms`)
        .then(response => {
          this.uoms = response.data.data
          this.uomsLoading = false
        })
        .catch(error => console.log(error))
    },
    saveCapacityUnit () {
      this.$axios.post(`capacity-units`, this.sizeUnit)
        .then((response) => {
          console.log(response)
          this.capacityUnits.push(response.data.data)
          this.capacityUnitUpdate = false
          this.$refs.capacityUnitForm.reset()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getCapacityUnits () {
      this.capacityUnit = true
      this.$axios.get(`capacity-units`)
        .then(response => {
          this.capacityUnits = response.data.data
          this.capacityUnitsLoading = false
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.getTags()
    this.getUoms()
    this.getCapacityUnits()
    this.$store.dispatch('pageTitle', 'Tags, UOMS & Measurement Units')
  }
}
</script>
