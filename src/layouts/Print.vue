<template>
  <q-layout view="lHh Lpr lFf" id="print-container">
    <div class="row q-col-gutter-sm">
      <div class="col-sm-12 col-md-12 col-xs-12">
        <q-card flat square>
          <q-card-section>
            <span class="text-h6 text-center">{{company.name}}</span><br/>
            <span class="text-caption">{{company.address}}</span><br/>
            <span class="text-caption">Contact: {{company.contact_number}}</span><br/>
            <hr>
          </q-card-section>
        </q-card>
      </div>
    </div>
      <router-view />
  </q-layout>
</template>

<script>

export default {
  name: 'Print',
  data () {
    return {
      company: {}
    }
  },
  methods: {
    getCompany () {
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
      // console.log(this.company)
    }
  },
  created () {
    this.getCompany()
  }
}
</script>

<style>
  @media screen {
    body, html {
      background-color: #efefef;
    }
  }
  #print-container {
    background-color: #fff;
  }
</style>
