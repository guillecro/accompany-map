<template>
  <section class="layout-container">
    <Navbar />
    <Mapper />
    <Footer />
  </section>
</template>

<script>
import Navbar from '~/components/Navbar'
import Mapper from '~/components/Mapper'
import Footer from '~/components/Footer'
// import { GoogleSpreadsheet } from 'google-spreadsheet'

export default {
  name: 'TheMap',
  components: {
    Navbar,
    Mapper,
    Footer
  },
  async asyncData ({ app, params, store, $axios, $config, env }) {
    try {
      // console.log(app)
      // fetch with axios
      const response = await $axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${env.googleSheetId}/values/data?key=${env.googleApiKey}`)
      const keys = response.data.values[0]
      const labels = response.data.values[1]
      const values = response.data.values.slice(2)
      const theLabels = {}
      keys.forEach((key, index) => {
        theLabels[key] = labels[index]
      })
      const theValues = []
      values.forEach((entry) => {
        // eslint-disable-next-line prefer-const
        const marker = {}
        keys.forEach((k, i) => {
          marker[k] = entry[i] !== '' ? entry[i] : null
        })
        theValues.push(marker)
      })
      store.commit('sheet/commit', {
        keys,
        labels: theLabels,
        values: theValues
      })
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: stretch;
  height: 100vh;
}

</style>
