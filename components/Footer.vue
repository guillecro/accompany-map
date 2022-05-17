<template>
  <div class="layout-bottom">
    <div class="container has-text-centered">
      <p>Markers: {{ sheetData.rows.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    sheetData () {
      return this.$store.state.sheet.data
    }
  }
}
</script>
