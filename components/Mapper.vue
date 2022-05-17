<template>
  <div class="layout-mapper">
    <mapbox
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
  fetchOnServer: false,
  data () {
    return {
    }
  },
  computed: {
    mapboxApiKey () {
      return process.env.mapboxApiKey
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
      const noExtra = ['title', 'latitude', 'longitude', 'color', 'original_latitud', 'original_longitud']
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

        // create a variable for your markup and add it to the map
        new mapboxgl.Marker({
          color: row.color,
          scale: 0.7
        })
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
}
.mapboxgl-map {
  height: 100%;
}
</style>
