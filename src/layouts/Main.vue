<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-teal">
        <q-btn
          flat
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          E<span class="text-weight-bold">POS</span>
        </q-toolbar-title>
        <div>POS in the Cloud</div>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-4"
    >
      <q-list>
        <q-item-label header>Main Menu</q-item-label>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <!-- <q-item-label caption>v1.quasar-framework.org</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item clickable to="/sales">
          <q-item-section avatar>
            <q-icon name="add_shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sales</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/customers">
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Customers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/products">
          <q-item-section avatar>
            <q-icon name="add_shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Products</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/suppliers">
          <q-item-section avatar>
            <q-icon name="local_shipping" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Suppliers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/manufacturers">
          <q-item-section avatar>
            <q-icon name="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Manufacturers</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/tags-and-uoms">
          <q-item-section avatar>
            <q-icon name="local_offer" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Tags and UOM</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/places">
          <q-item-section avatar>
            <q-icon name="place" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Places</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-grey-3">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'Main',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      title: 'EPOS'
    }
  },
  methods: {
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
