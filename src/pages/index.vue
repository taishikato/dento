<template>
  <div id="index">
    <section class="hero is-medium is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            絶滅危惧種伝統
          </h1>
          <h2 class="subtitle">
            伝統
          </h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      moviedata: null
    }
  },
  async asyncData() {
    console.log('yeah');
  }
}
</script>

<style>
</style>
