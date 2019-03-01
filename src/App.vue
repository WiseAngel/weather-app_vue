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
  padding 0
  margin 0
  background linear-gradient(#3d4869,#263048) fixed
  font-family 'Arial', sans-serif
  // font-family 'YS Text Web', sans-serif
</style>
