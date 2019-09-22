<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-primary print-hide">
        <q-btn
          class="print-hide"
          flat round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          E<span class="text-weight-bold">POS</span> - {{pageTitle}}
        </q-toolbar-title>

        <q-btn
          stretch flat label="Home"
          icon="home" to="/"
        />
        <q-btn
          stretch flat label="Sales"
          icon="add_shopping_cart" to="/sales-invoice"
        />
        <q-btn
          v-show="!this.$store.state.isLoggedIn"
          icon="mdi-login"
          stretch flat label="Login" to="/login"
        />
        <q-btn-dropdown
          :label="user + ' (' + userType + ')'"
          v-show="this.$store.state.isLoggedIn" stretch flat>
          <q-list>
            <q-item clickable v-close-popup tabindex="0" @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="mdi-logout" />
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup tabindex="0" to="/profile">
              <q-item-section>
                <q-item-label>Profile</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-icon name="person" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-if="isLoggedIn"
      :width="280"
      v-model="leftDrawerOpen"
      :mini="!leftDrawerOpen || miniState"
      bordered
      content-class="bg-grey-4"
      class="print-hide"
    >
      <q-list>
        <q-item clickable @click="drawerClick">
          <q-item-section avatar>
            <q-icon class="text-center" name="mdi-arrow-left-right-bold-outline" />
          </q-item-section>
          <q-item-section>
          </q-item-section>
        </q-item>
        <q-item clickable to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/sales-invoice">
          <q-item-section avatar>
            <q-icon name="add_shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Sales</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/sales-invoice-list">
          <q-item-section avatar>
            <q-icon name="mdi-view-list" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sales Invoices</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/purchase-invoice">
          <q-item-section avatar>
            <q-icon name="mdi-plus-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>New Purchase</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/purchase-invoice-list">
          <q-item-section avatar>
            <q-icon name="mdi-receipt" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Purchase Invoices</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/customers">
          <q-item-section avatar>
            <q-icon name="mdi-face" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Customers</q-item-label>
          </q-item-section>
        </q-item>
        <q-expansion-item
          group="main"
          expansion-separator
          label="Reports"
          icon="mdi-file-cabinet"
        >
          <q-item clickable to="/purchase-invoice-list">
            <q-item-section avatar>
              <q-icon name="mdi-file-chart" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Sales Report</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/">
            <q-item-section avatar>
              <q-icon name="mdi-receipt" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Purchase Report</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
        <q-expansion-item
          expansion-separator
          group="main"
          label="Master"
          icon="mdi-database"
        >
          <q-item clickable to="/acc-voucher">
            <q-item-section avatar>
              <q-icon name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Account Vouchers</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/acc-heads">
            <q-item-section avatar>
              <q-icon name="money" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Account Heads</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/products">
            <q-item-section avatar>
              <q-icon name="mdi-bag-personal" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Products</q-item-label>
            </q-item-section>
          </q-item>
            <q-item clickable to="/suppliers">
            <q-item-section avatar>
              <q-icon name="mdi-truck-delivery" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Suppliers</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/manufacturers">
            <q-item-section avatar>
              <q-icon name="mdi-factory" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Manufacturers</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/tags-and-uoms">
            <q-item-section avatar>
              <q-icon name="mdi-tag-heart-outline" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Tags and UOM</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/places">
            <q-item-section avatar>
              <q-icon name="mdi-map-marker" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Places</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable to="/user">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Users</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item clickable to="/experiments">
            <q-item-section avatar>
              <q-icon name="mdi-test-tube" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Experiments</q-item-label>
            </q-item-section>
          </q-item> -->
          <q-item clickable to="/company">
            <q-item-section avatar>
              <q-icon name="mdi-office-building" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Company Info</q-item-label>
            </q-item-section>
          </q-item>
        </q-expansion-item>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'Main',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      miniState: false,
      title: 'EPOS'
    }
  },
  methods: {
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      // if (this.miniState) {
      //   this.miniState = !miniState

      this.miniState = !this.miniState
      // notice we have registered an event with capture flag;
      // we need to stop further propagation as this click is
      // intended for switching drawer to "normal" mode only
      e.stopPropagation()
    // }
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  },
  computed: {
    user () {
      return this.$store.state.user
        ? this.$store.state.user.name : 'LOGIN'
    },
    userType () {
      return this.$store.state.user
        ? this.$store.state.user.type : ''
    },
    isAdmin () {
      return this.$store.state.user
        ? this.$store.state.user.type === 'admin' : false
    },
    ...mapGetters([
      'isLoggedIn',
      'pageTitle'
    ])
  }
}
</script>

<style scoped>
  html {
    overflow-y: scroll;
  }
  .q-router-link--exact-active {
    background-color: #40a747;
  }
  .q-router-link--active {
    color: #fff;
  }
</style>
