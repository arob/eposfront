<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-8 col-md-8 col-xs-12 absolute-center">
        <q-card flat bordered square class="q-pa-md">
          <q-card-section>
            <h6 class="q-mb-none q-mt-sm">
              {{this.$store.state.user.name}}
            </h6>
            <p class="q-mb-none q-mt-none text-subtitle1 text-weight-light">
              ({{this.$store.state.user.type}})
            </p>
            <hr>
            <p class="q-mb-none q-mt-sm">
              Username: {{this.$store.state.user.username}}
            </p>
            <p class="q-mb-none">Email: {{this.$store.state.user.email}}</p>
            <p>Contact: {{this.$store.state.user.contact_number}}</p>
            <hr>
            <p class="q-mb-none">
              Created at : {{this.$store.state.user.created_at | formatedDate}}
            </p>
            <p class="q-mp-xl">
              Updated at: {{this.$store.state.user.updated_at | formatedDate}}
            </p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  filters: {
    formatedDate (v) {
      return date.formatDate(v, 'DD-MM-YYYY HH:mm:ss')
    }
  },
  created () {
    this.$store.dispatch('pageTitle', 'User Profile')
  }
}
</script>
