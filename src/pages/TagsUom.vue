<template>
  <q-page padding>
    <q-card flat bordered>
      <q-card-section class="q-py-sm">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-xs-12">
              <span class="text-h6">Tags, UOM and Capacity Units</span>
            </div>
          </div>
      </q-card-section>
    </q-card>
    <div class="row q-col-gutter-sm">
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="tagsForm">
              <div class="row q-col-gutter-sm">
                <div class="col-md-12 col-sm-4 col-sx-12">
                  <q-input
                    outlined
                    dense
                    no-error-icon
                    v-model="tag.name"
                    label="Tag"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Required']"
                  ></q-input>
                </div>
                <div class="col-md-12">
                  <q-btn @click="saveTag" label="Add" type="submit" color="teal"></q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <div class="q-pt-sm">
              <q-table
                flat
                :data="tags"
                :loading="tagsLoading"
                :columns="tagColumns"
                row-key="name"
              >
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                <q-btn
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
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="tagsForm">
              <div class="row q-col-gutter-sm">
                <div class="col-md-12 col-sm-4 col-sx-12">
                  <div class="row q-col-gutter-sm">
                    <div class="col-md-8">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="uom.name"
                        label="Measurement unit"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-md-4">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="uom.short_name"
                        label="Short"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <q-btn @click="saveUom" label="Add" type="submit" color="teal"></q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <div class="q-pt-sm">
              <q-table
                flat
                :data="uoms"
                :loading="uomsLoading"
                :columns="uomColumns"
              >
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                <q-btn
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
      <div class="col-md-4 col-sm-4 col-xs-12">
        <q-card flat bordered>
          <q-card-section>
            <q-form ref="sizeUnitForm">
              <div class="row q-col-gutter-sm">
                <div class="col-md-12 col-sm-4 col-sx-12">
                  <div class="row q-col-gutter-sm">
                    <div class="col-sm-8 col-md-8 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="sizeUnit.name"
                        label="Capacity unit"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                    <div class="col-sm-4 col-md-4 col-xs-12">
                      <q-input
                        outlined
                        dense
                        no-error-icon
                        v-model="sizeUnit.short_name"
                        label="Short"
                        lazy-rules
                        :rules="[ val => val && val.length > 0 || 'Required']"
                      ></q-input>
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <q-btn @click="saveSizeUnit" label="Add" type="submit" color="teal"></q-btn>
                </div>
              </div>
            </q-form>
          </q-card-section>
          <div class="q-pt-sm">
              <q-table
                flat
                :data="sizeUnits"
                :columns="sizeUnitColumns"
                :loading="sizeUnitsLoading"
                row-key="name"
              >
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                <q-btn
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
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Tags',
  data () {
    return {
      tag: {
        name: ''
      },
      tags: [],
      tagUpdate: false,
      tagsLoading: false,
      tagColumns: [
        {
          name: 'name',
          align: 'left',
          label: 'Tag',
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
      uom: {
        name: '',
        short_name: ''
      },
      uoms: [],
      uomUpdate: false,
      uomsLoading: false,
      uomColumns: [
        {
          name: 'name',
          align: 'left',
          label: 'UOM',
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
          field: 'id'
        }
      ],
      sizeUnit: {
        name: '',
        short_name: ''
      },
      sizeUnits: [],
      sizeUnitUpdate: false,
      sizeUnitsLoading: false,
      sizeUnitColumns: [
        {
          name: 'name',
          align: 'left',
          label: 'Unit Name',
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
          field: 'id'
        }
      ]
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
    saveSizeUnit () {
      this.$axios.post(`size-units`, this.sizeUnit)
        .then((response) => {
          console.log(response)
          this.sizeUnits.push(response.data.data)
          this.sizeUnitUpdate = false
          this.$refs.sizeUnitForm.reset()
        })
        .catch(error => {
          console.log(error)
        })
    },
    getSizeUnits () {
      this.sizeUnitsLoading = true
      this.$axios.get(`capacity-units`)
        .then(response => {
          this.sizeUnits = response.data.data
          this.sizeUnitsLoading = false
        })
        .catch(error => console.log(error))
    }
  },
  created () {
    this.getTags()
    this.getUoms()
    this.getSizeUnits()
  }
}
</script>
