<template>
  <v-app>
    <Header />
    <v-content>
      <v-layout justify-center fill-height text-center row wrap mt-5>
        <transition name="slide-x-transition" mode="out-in">
          <router-view></router-view>
        </transition>
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
import { Provide, Component, Prop, Vue } from 'vue-property-decorator';
import Header from './components/Header.vue';

@Component({
  components: {
    Header,
  },
})
export default class App extends Vue {
  @Provide() private loading: boolean = false;

  public created() {
    this.loading = true;
    if (this.$cookies.get('token')) {
      try {
        this.$store.dispatch('account/getAccount', this.$cookies.get('token'));
      } catch (error) {
        // console.log(error);
      }
    }
    this.loading = false;
  }
}
</script>
