<template>
  <q-page>
    <q-card flat sqare bordered>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-6 col-md-6 col-xs-12">
            <q-input
              label="Name *"
              v-model="company.name"
            ></q-input>
          </div>
          <div class="col-sm-6 col-md-6 col-xs-12">
            <q-input
              label="Short Name"
              v-model="company.short_name"
            ></q-input>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-12 col-md-12 col-xs-12">
            <q-input
              label="Address"
              v-model="company.address"
            ></q-input>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-12 col-md-12 col-xs-12">
            <q-input
              label="Contact Number"
              v-model="company.contact_number"
            ></q-input>
          </div>
        </div>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-12 col-md-12 col-xs-12 q-mt-lg">
            <q-btn
              color="secondary"
              icon="save"
              label="save"
              @click="saveRecord"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Company',
  data: () => ({
    company: {
      name: '',
      short_name: '',
      address: '',
      contact_number: ''
    }
  }),
  methods: {
    getData () {
      this.$axios.get(`company`, this.headers)
        .then(response => {
          if (response !== null) {
            this.company = response.data.data[0]
            console.log(response.data.data[0])
          }
        },
        error => console.log(error)
        )
        .catch(error => console.log(error))
    },
    saveRecord () {
      console.log('saved...')
      if (this.company !== null) {
        this.$axios.put(`company/${this.company.id}`, this.company, this.headers)
          .then(response => {
            if (response !== null) {
              this.$q.notify({
                message: 'Update successfull!',
                position: 'bottom-right',
                color: 'green'
              })
            } else {
              this.$q.notify({
                message: 'Error updating record!',
                position: 'bottom-right',
                color: 'orange'
              })
            }
          },
          error => console.log(error)
          )
          .catch(error => console.log(error))
      } else {
        this.$$axios.post(`company`, this.headers)
          .then(response => {
            if (response !== null) {
              this.$q.notify({
                message: 'Save successfull!',
                position: 'bottom-right',
                color: 'green'
              })
            }
          },
          error => console.log(error)
          )
          .catch(error => console.log(error))
      }
    }
  },
  created () {
    this.getData()
    this.$store.dispatch('pageTitle', 'Company Information')
  },
  computed: {
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
