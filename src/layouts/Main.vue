<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-primary">
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
      :width="260"
      v-model="leftDrawerOpen"
      :mini="!leftDrawerOpen || miniState"
      bordered
      content-class="bg-grey-4"
    >
      <q-list>
        <q-item clickable @click="drawerClick">
          <q-item-section avatar>
            <q-icon class="text-center" name="mdi-arrow-left-right-bold-outline" />
          </q-item-section>
          <q-item-section>
            <!-- <q-item-label></q-item-label> -->
            <!-- <q-item-label caption>v1.quasar-framework.org</q-item-label> -->
          </q-item-section>
        </q-item>
        <q-item clickable to="/">
          <q-item-section avatar>
            <q-icon name="mdi-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
            <!-- <q-item-label caption>v1.quasar-framework.org</q-item-label> -->
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
            <q-icon name="add_shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Sales Invoice List</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/purchase-invoice">
          <q-item-section avatar>
            <q-icon name="mdi-file-document-box-multiple-outline" />
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
            <q-item-label>Purchase Invoice List</q-item-label>
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
          <!-- <q-item clickable to="/experiments">
            <q-item-section avatar>
              <q-icon name="mdi-test-tube" />
            </q-item-section>
            <q-item-section>
              <q-item-label>Experiments</q-item-label>
            </q-item-section>
          </q-item> -->
        </q-expansion-item>
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
    }
  }
}
</script>

<style>
html {
  overflow-y: scroll;
}
</style>
