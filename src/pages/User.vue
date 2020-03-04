<template>
  <q-page>
    <q-card flat square>
      <q-card-section class="q-pa-sm">
        <div class="row q-col-gutter-xs">
          <div class="col-sm-9 col-md-9 col-xs-12">
            <q-card flat square bordered class="full-height">
              <q-table
                flat
                :table-header-style="{ backgroundColor: '#f0f0f0' }"
                :filter="filter"
                :data="users"
                :loading="loading"
                :columns="tableColumns"
                row-key="id"
                :pagination.sync="pagination"
              >
              <q-td slot="body-cell-update" slot-scope="props" :props="props">
                  <q-btn
                    dense color="primary"
                    icon="mdi-square-edit-outline"
                    class="q-px-sm"
                    @click="updateUser(props.row)"
                  >
                  </q-btn>
              </q-td>
              </q-table>
            </q-card>
          </div>
          <div class="col-sm-3 col-md-3 col-xs-12">
            <q-card flat square bordered class="full-height">
              <q-card-section class="q-pa-sm">
                <q-input
                  dense no-error-icon
                  label="Name *"
                  v-model="user.name"
                  :rules="[ val => val.length > 0 || 'Required']"
                ></q-input>
                <q-input
                  dense no-error-icon
                  label="Username *"
                  v-model="user.username"
                  :rules="[ val => val.length > 0 || 'Required']"
                ></q-input>
                <q-input
                  dense no-error-icon
                  label="Email"
                  type="email"
                  v-model="user.email"
                ></q-input>
                <q-input
                  dense no-error-icon
                  label="Contact"
                  v-model="user.contact_number"
                ></q-input>
                <q-input
                  ref="password"
                  dense no-error-icon
                  label="Password"
                  type="password"
                  v-model="user.password"
                  :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']"
                ></q-input>
                <q-input
                  dense no-error-icon
                  label="Confirm Password"
                  type="password"
                  v-model="user.c_password"
                  :rules="[ val => val === this.user.password || 'Password mismatch']"
                ></q-input>
                <q-select
                  dense no-error-icon
                  label="Type"
                  v-model="user.type"
                  :options="userTypes"

                ></q-select>
                <q-btn
                  class="q-mt-sm q-mr-xs"
                  :label="saveButtonLabel"
                  icon="save"
                  color="secondary"
                  @click="register"
                ></q-btn>
                <q-btn
                  class="q-mt-sm"
                  :label="cancelButtonLabel"
                  icon="clear_all"
                  color="orange"
                  @click="clearForm"
                ></q-btn>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Users',
  data: () => ({
    updateMode: false,
    loading: false,
    filter: '',
    user: {
      id: '',
      name: '',
      username: '',
      email: '',
      contact_number: '',
      password: '',
      c_password: '',
      type: ''
    },
    userTypes: [
      'admin', 'manager', 'salesperson', 'user'
    ],
    users: [],
    tableColumns: [
      { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
      { name: 'username', align: 'left', label: 'Username', field: 'username', sortable: true },
      { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: true },
      { name: 'email', align: 'left', label: 'Email', field: 'email', sortable: true },
      { name: 'contact_number', align: 'left', label: 'Contact', field: 'contact_number', sortable: true },
      { name: 'update', align: 'right', field: 'id' }
    ],
    pagination: {
      rowsPerPage: 10
    }
  }),
  methods: {
    getUsers () {
      this.$axios.get(`users`, this.headers)
        .then(response => {
          this.users = response.data.data
          console.log(response.data.data)
        })
        .catch(error => console.log(error))
    },
    register () {
      if (this.updateMode === false) {
        this.$axios.post(`register`, this.user, this.headers)
          .then(response => {
            // console.log(response)
            if (response.data.message !== undefined) {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Save successful'
              })
              // this.getUsers()
              this.users.push(response.data.message)
              this.clearForm()
              // console.log(response)
            } else {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Error saving record'
              })
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
            }
          })
      } else {
        this.$axios.put(`users/${this.user.id}`, this.user, this.headers)
          .then(response => {
            if (response !== undefined) {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Update successful'
              })
              this.updateMode = false
              this.clearForm()
              this.getUsers()
            } else {
              this.$q.notify({
                color: 'green',
                textColor: 'white',
                position: 'bottom-right',
                message: 'Error updating record'
              })
            }
          })
          .catch(error => {
            if (error.response) {
              console.log(error.response.data)
            }
          })
      }
    },
    updateUser (user) {
      this.updateMode = true
      console.log(user)
      this.user.id = user.id
      this.user.name = user.name
      this.user.username = user.username
      this.user.email = user.email
      this.user.contact_number = user.contact_number
      this.user.type = user.type
    },
    clearForm () {
      this.updateMode = false
      this.user.id = ''
      this.user.name = ''
      this.user.username = ''
      this.user.email = ''
      this.user.contact_number = ''
      this.user.type = ''
    }
  },
  created () {
    this.getUsers()
    this.$store.dispatch('pageTitle', 'Users')
  },
  computed: {
    saveButtonLabel () {
      return this.updateMode === true ? 'update' : 'save'
    },
    cancelButtonLabel () {
      return this.updateMode === true ? 'cancel' : 'clear'
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

<style>
</style>
