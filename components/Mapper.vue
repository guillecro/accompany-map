<template>
  <div class="layout-mapper" :class="{'loading': $fetchState.pending}">
    <div v-if="$fetchState.pending" class="has-text-primary">
      Cargando <i class="fas fa-sync fa-spin" />
    </div>
    <mapbox
      v-else
      ref="theMap"
      :access-token="mapboxApiKey"
      :map-options="mapboxOptions"
      @map-load="loaded"
    />
  </div>
</template>

<script>
/* eslint-disable no-undef */
import Mapbox from 'mapbox-gl-vue'

export default {
  name: 'BlockMapper',
  components: { Mapbox },
  data () {
    return {
    }
  },
  fetchOnServer: false,
  async fetch () {
    try {
      // console.log(app)
      // fetch with axios
      const response = await this.$axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${this.googleSheetId}/values/data?key=${this.googleApiKey}`)
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
      this.$store.commit('sheet/commit', {
        keys,
        labels: theLabels,
        values: theValues
      })
    } catch (err) {
      console.error(err)
    }
  },
  computed: {
    mapboxApiKey () {
      return process.env.mapboxApiKey
    },
    googleSheetId () {
      return process.env.googleSheetId
    },
    googleApiKey () {
      return process.env.googleApiKey
    },
    mapboxOptions () {
      return {
        style: process.env.mapboxMapStyle,
        center: [process.env.mapCenterLongitude, process.env.mapCenterLatitude],
        zoom: process.env.mapZoomDefault
      }
    },
    sheetData () {
      return this.$store.state.sheet.data
    },
    extraHeaders () {
      if (!this.sheetData) { return [] }
      const noExtra = ['title', 'latitude', 'longitude', 'color', 'original_latitud', 'original_longitud', 'google_maps_lat_long']
      const extraHeaders = this.sheetData.keys.filter((x) => {
        return !noExtra.includes(x)
      })
      return extraHeaders
    }
  },
  methods: {
    loaded (map) {
      this.addPoints(map)
    },
    addPoints (map) {
      // iterate through your table to set the marker to lat/long values for each row
      this.sheetData.values.forEach((row) => {
        if (row.latitude === '-' || row.longitude === '-' || row.latitude === '' || row.longitude === '') {
          return
        }
        // Create the Title
        let str = `<h3>${row.title}</h3>`
        str += '<div class="the-marker-content">'
        this.extraHeaders.forEach((header) => {
          if (header === 'Latitud' || header === 'Longitud') {
            return
          }
          str += `<p class="data-title">${this.sheetData.labels[header]}</p><p class="data-text">${row[header] || '<i>- No Data -</i>'}</p>`
        })
        str += '</div>'
        // create a variable for your popup for the current event
        const popup = new mapboxgl.Popup().setHTML(str) // use the table to populate your popup with text

        // create the dot
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.style.background = row.color
        el.style['border-radius'] = '40px'
        el.style.border = '2px solid #FFFFFF'
        el.style.width = '16px'
        el.style.height = '16px'
        // create a variable for your markup and add it to the map
        new mapboxgl.Marker(el)
          .setLngLat([row.longitude, row.latitude])
          .setPopup(popup)
          .addTo(map) // add the marker to the map
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.layout-mapper {
  // background-color: #2a2b33;
  flex: 1 0 auto;
  align-self: auto;
  background-color: #fff;
  &.loading {
    display: flex;
    justify-content:center;
    align-items:center;
  }
}
.mapboxgl-map {
  height: 100%;
}
</style>
