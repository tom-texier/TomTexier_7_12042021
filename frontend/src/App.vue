<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <ShowGreetings></ShowGreetings>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import ShowGreetings from './components/ShowGreetings'

export default defineComponent({
  name: 'App',
  components: {
    HelloWorld,
    ShowGreetings
  }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
