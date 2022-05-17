<template>
  <div class="layout-bottom">
    <div class="container has-text-centered">
      <p>Markers: {{ sheetData.values.length }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlockFooter',
  computed: {
    sheetData () {
      return this.$store.state.sheet.data
    }
  }
}
</script>
