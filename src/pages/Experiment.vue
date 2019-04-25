<template>
  <q-page padding>
    <div class="q-pa-sm">
      <div class="q-gutter-md row">
        <div class="col-sm-4 col-md-4 col-xs-12">
          <q-select
            dense
            clearable
            clear-icon="clear"
            v-model="selected"
            use-input
            hide-selected
            input-debounce="0"
            label="Find"
            :options="options"
            :option-label="(item) => item ? item.model + ': ' + item.name : ''"
            option-value="id"
            @filter="filterFn"
            @input="showSelected"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>
        <q-input
          v-model="product_qty"
          label="Qty"
          dense
        ></q-input>
        <q-btn
          dense
          ref="addBtn"
          color="teal"
          label="add"
          icon="add"
          @click="added">
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      product_qty: '',
      model: '',
      options: [],
      products: [],
      selected: ''
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
    filterFn (val, update) {
      if (val === '') {
        update(() => {
          this.options = this.products
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        this.options = this.products.filter(
          v => v.name.toLowerCase().indexOf(needle) > -1 ||
            v.model.toLowerCase().indexOf(needle) > -1
        )
      })
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
  }
}
</script>

<style>
</style>
