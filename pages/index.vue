<template>
  <section class="hero is-primary is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-8 has-text-centered">
            <h1 class="title is-2 is-800 is-size-3-mobile">
              Programa ACOMPAÑAR
            </h1>
            <h1 class="subtitle is-5 is-size-6-mobile">
              Mapeo de sedes. Con la tecnología de Google Sheets & Mapbox.com
            </h1>
            <br>
            <br>
            <div class="buttons is-centered is-marginless">
              <button class="button is-white is-outlined is-medium" :class="{'is-loading': isLoading}" @click="goToMap">
                Ir al mapa!&nbsp;<i class="fas fa-rocket" />
              </button>
            </div>
            <br>
            <br>
            <div class="columns is-centered is-vcentered is-mobile">
              <div class="column is-narrow is-size-2">
                🦝
              </div>
              <div class="column is-narrow has-text-left">
                <p class="is-size-7">
                  Developed by<br><a href="https://github.com/guillecro" class="has-text-white"><b>Guillermo Croppi</b></a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexHome',
  components: {},
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    sheetId () {
      return this.$env.googleSheetId
    }
  },
  methods: {
    goToMap () {
      this.isLoading = true
      this.$router.push({
        path: '/map'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dos-icon {
  width: 200px;
  margin: 0 auto 30px;
}
.der-icon {
  width: 40px;
  margin: 0 auto 0px;
}
</style>
