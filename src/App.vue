<template>
  <div id="app">
   <Search />
   <Widget />
  </div>
</template>
<script>
import Widget from './components/Widget.vue';
import Search from './components/Search.vue';

export default {
  name: 'app',
  components: {
    Widget,
    Search
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
</style>
