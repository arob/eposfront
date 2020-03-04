<template>
  <q-page>
    <div class="row q-col-gutter-sm">
      <div class="col-sm-6 col-md-6 col-xs-12 absolute-center">
        <q-card flat bordered square class="q-pa-md">
          <q-card-section>
            <div class="row q-col-gutter-sm">
              <div class="col-sm-4 col-md-4 col-xs-12">
                <q-icon
                  name="mdi-lock-outline"
                  size="160px"
                  color="grey-5"
                  class="q-mt-sm">
                </q-icon>
              </div>
              <div class="col-sm-8 col-md-8 col-xs-12">
                <q-input
                  dense no-error-icon
                  v-model="user.username"
                  label="Username"
                >
                  <template v-slot:prepend>
                    <q-icon name="person"></q-icon>
                  </template>
                </q-input>
                <q-input
                  class="q-mt-md"
                  dense no-error-icon
                  v-model="user.password"
                  label="Password"
                  type="password"
                  @keypress.enter="login"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock"></q-icon>
                  </template>
                </q-input>
                <q-btn
                  class="q-mt-xl q-ml-sm"
                  label="Login"
                  color="primary"
                  icon="mdi-login"
                  @click="login"
                >
                </q-btn>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>

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
    login () {
      this.$axios.post(`login`, this.user)
        .then(response => {
          if (response.data.message.token !== null) {
            this.$store.dispatch('login', response.data.message.token)
            this.$q.notify({
              color: 'green',
              textColor: 'white',
              position: 'bottom-right',
              message: 'Login successful!',
              closeBtn: 'close'
            })
            // console.log(Object.entries(this.$router.history.current.query).length === 0)
            if (Object.entries(this.$router.history.current.query).length !== 0) {
              this.$router.push(this.$router.history.current.query.redirect)
            } else {
              this.$router.push('/dashboard')
            }
            // console.log(response.data.message.token)
            // this.$store.dispatch('currentUser', response.data.message.token)
            this.$axios.post(`users`, this.user, {
              headers: { 'Authorization': 'Bearer ' + response.data.message.token }
            }).then(response => {
              // console.log(response.data.message)
              this.$store.dispatch('user', response.data.message)
              localStorage.setItem('user', JSON.stringify(response.data.message))
              console.log(response.data.message)
            })
          } else {
            // console.log(response)
            this.$q.notify({
              color: 'yellow',
              textColor: 'black',
              position: 'bottom-right',
              message: 'Sorry, Invalid credentials!',
              closeBtn: 'close'
            })
          }
        })
    },
    logout () {
      this.$store.dispatch('logout')
    }
  },
  created () {
    this.$store.dispatch('pageTitle', 'Login')
  }
}
</script>
