<template>
  <v-app>
    <Header />
    <v-content>
      <v-layout align-center justify-center fill-height text-center row wrap mt-5>
        <v-flex md6>
          <v-layout align-center justify-center fill-height text-center row wrap>
            <transition name="slide-x-transition" mode="out-in">
              <router-view></router-view>
            </transition>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-content>
  </v-app>
</template>

<style>
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import Header from "./components/Header.vue";

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>
