<template>
  <q-page padding>
    <q-table
      title="Treats"
      :data="products"
      :columns="columns"
      row-key="name"
      grid
      hide-header
    >
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>

      <template v-slot:item="props">
        <div
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 grid-style-transition">
          <q-card flat bordered>
            <q-card-section>
            </q-card-section>
            <q-separator />
            <q-list dense>
              <q-item v-for="col in props.cols.filter(col => col.name !== 'desc')" :key="col.name">
                <q-item-section>
                  <q-item-label>{{ col.label }}</q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ col.value }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </template>
    </q-table>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      product_qty: '',
      filter: '',
      model: '',
      options: [],
      products: [],
      selected: '',
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ]
    }
  },

  methods: {
    getProducts () {
      this.$axios.get(`products`)
        .then(response => {
          if (response !== null) {
            this.products = response.data.data
          }
        })
        .catch(error => console.log(error))
    },
    showSelected () {
      console.log(this.selected.id)
    },
    added () {
      console.log('added')
    }
  },

  created () {
    this.getProducts()
    this.$store.dispatch('pageTitle', 'Experiment')
  }
}
</script>
