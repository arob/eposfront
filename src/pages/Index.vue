<template>
  <q-page>
    <q-card flat square>
      <q-card-section>
        <div class="row q-col-gutter-sm">
          <div class="col-sm-6 col-md-6 col-xs-12">
            <div class="text-h4">{{company.name}}
              <span v-if="company.short_name">
                ({{company.short_name}})
              </span>
            </div>
            <div class="text-subtitle1">{{company.address}}</div>
            <div class="text-subtitle2">{{company.contact_number}}</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      company: {
        name: '',
        short_name: '',
        address: '',
        contact_number: ''
      }
    }
  },
  methods: {
    getData () {
      this.$axios.get(`company`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + this.$store.state.token
        }
      })
        .then(response => {
          if (response !== null) {
            this.company = response.data.data[0]
            console.log(response.data.data[0])
          }
        },
        error => console.log(error)
        )
        .catch(error => console.log(error))
    }
  },
  computed: {
    pageTitle: () => this.$store.state.pageTitle
  },
  created () {
    this.$store.dispatch('pageTitle', 'Home')
    this.getData()
  }
}
</script>
