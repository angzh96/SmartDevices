<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { MP } from '../map'
  import { formatTime } from './utils'
export default {
  name: 'App',
  data () {
    return {
      ak:"Ngn6e8rSX0GWCAQNvQpD1NGccAKU6Gc8"
    }
  },
  async mounted() {
    await MP(this.ak);
  }
}
</script>

