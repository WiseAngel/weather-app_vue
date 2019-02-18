<template>
  <div id="app">
   <Main />
  </div>
</template>
<script>
import Main from './components/Main.vue';

export default {
  name: 'app',
  components: {
    Main,
  },
};
</script>

<style lang="stylus">
@import url('https://fonts.googleapis.com/css?family=Montserrat:200,400|Vast+Shadow&subset=cyrillic')

body
  background linear-gradient(#3d4869,#263048) fixed
  font-family 'Montserrat', sans-serif

#app
  background url(assets/waves.svg) no-repeat
  width 520px
  height 170px
  position absolute
  top 35%
  left 35%
</style>
