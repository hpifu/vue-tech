<template>
  <v-app-bar app clipped-left elevate-on-scroll class="pb-3" color="#fafafa">
    <Logo value="HPiFu" />&nbsp;&nbsp;
    <SubLogo value="tech" />
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Logo from './Logo.vue';
import SubLogo from './SubLogo.vue';

@Component({
  components: {
    Logo,
    SubLogo,
  },
})
export default class Header extends Vue {}
</script>