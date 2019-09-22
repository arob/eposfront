<template>
  <q-page>
    <q-card flat bordered>
      <q-card-section class="q-pa-sm">
        <q-form ref="accHeads" @submit="saveHead">
          <div class="row q-col-gutter-sm">
            <div class="col-sm-4 col-md-4 col-xs-12">
             <q-select
                dense no-error-icon required
                :options="accCategories"
                label="Category"
                v-model="accHead.category_id"
                option-value="id"
                option-label="name"
                emit-value map-options
              />
            </div>
            <div class="col-sm-6 col-md-6 col-xs-12">
              <q-input
                dense required
                label="Head"
                v-model="accHead.name"
              >
                <template v-slot:after>
                  <q-btn
                    demse
                    color="secondary"
                    icon="save"
                    type="submit"
                  ></q-btn>
                </template>
              </q-input>
            </div>
            <div class="col-sm-2 col-md--2 col-xs-12">
              <q-input dense debounce="300" color="primary" v-model="filter">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-4 col-md-4 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <q-table
              flat bordered hide-bottom square
              :table-header-style="{ backgroundColor: '#f0f0f0' }"
              :data="accCategories"
              :selected.sync="selectedCategory"
              :columns="accCategoryColumns"
              row-key="id"
            >
            </q-table>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-8 col-md-8 col-xs-12">
        <q-card flat square class="full-height">
          <q-card-section class="q-pa-sm">
            <q-table
              flat bordered square
              :filter="filter"
              :table-header-style="{ backgroundColor: '#f0f0f0' }"
              :columns="accHeadColumns"
              :data="accHeads"
              :loading="accHeadsLoading"
              :pagination.sync="accHeadPagination"
              row-key="id"
            >
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                <q-btn
                  dense color="secondary"
                  icon="mdi-square-edit-outline"
                  class="q-px-sm"
                  @click="updateHead(props.row)"
                >
                  <q-tooltip
                    content-class="bg-amber text-black shadow-4"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    Update record
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
  name: 'AccountingHeads',
  data () {
    return {
      updateMode: false,
      loading: false,
      accCategoryLoading: false,
      accHeadsLoading: false,
      accCategories: [],
      selectedCategory: [],
      accHeads: [],
      filter: '',
      accHead: {
        name: '',
        category_id: ''
      },
      accCategoryColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true }
      ],
      accHeadColumns: [
        { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
        { name: 'category', align: 'left', label: 'Category', field: 'category_name', sortable: true },
        { name: 'update', align: 'right', label: 'Update', field: 'id' }
      ],
      accHeadPagination: {
        rowsPerPage: 10
      }
    }
  },
  methods: {
    getCategories () {
      // this.accCategoryLoading = true
      this.$axios.get(`acc-categories`, this.headers)
        .then(response => {
          console.log(response.data)
          this.accCategories = response.data.data
        })
        .catch(error => console.log(error))
    },
    getHeads () {
      this.accHeadsLoading = true
      this.$axios.get(`acc-heads`, this.headers)
        .then(response => {
          console.log(response.data.data)
          this.accHeads = response.data.data
          this.accHeadsLoading = false
        })
        .catch(error => console.log(error))
    },
    saveHead () {
      if (this.updateMode === false) {
        this.$axios.post(`acc-heads`, this.accHead, this.headers)
          .then(response => {
            console.log(response.data.data)
            // this.accHead.push(response.data.data)
            this.getHeads()
            this.$refs.accHeads.reset()
          })
          .catch(error => console.log(error))
      } else {
        this.$axios.put(`acc-heads/${this.accHead.id}`, this.accHead, this.headers)
          .then(response => {
            console.log(response.data.data)
            // this.accHead.push(response.data.data)
            this.getHeads()
            this.updateMode = false
          })
          .catch(error => console.log(error))
      }
    },
    updateHead (head) {
      this.updateMode = true
      this.accHead.id = head.id
      this.accHead.name = head.name
      this.accHead.category_id = head.category_id
    }
  },
  computed: {
    pageTitle: () => this.$store.state.pageTitle,
    headers () {
      return {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      }
    }
  },
  mounted () {
    this.$store.dispatch('pageTitle', 'Accounting Heads')
  },
  created () {
    this.getCategories()
    this.getHeads()
  }
}
</script>
