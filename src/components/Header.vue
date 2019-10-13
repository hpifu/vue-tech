<template>
  <v-app-bar app clipped-left elevate-on-scroll class="pb-3" color="#fafafa">
    <Logo value="HPiFu" />&nbsp;&nbsp;
    <SubLogo value="tech" />
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <v-btn text icon>
      <v-icon>mdi-view-grid</v-icon>
    </v-btn>
    <v-btn
      v-if="!this.$store.state.account.isSignedIn"
      :href="this.$config.web.account + '/signin?from=' + this.$config.web.tech"
      color="primary"
      depressed
    >登录</v-btn>
    <v-btn
      v-else
      :href="this.$config.web.account + '/signin?from=' + this.$config.web.tech"
      color="#fafafa"
      depressed
    >
      <v-avatar size="30">
        <v-img
          v-if="this.$store.state.account.avatar && loadSuccess"
          v-on:error="loadSuccess = false"
          :src="this.$config.api.cloud + '/resource/' + this.$cookies.get('token') + '?name=' + this.$store.state.account.avatar"
        ></v-img>
        <v-icon v-else large>mdi-account-circle</v-icon>
      </v-avatar>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Provide, Component, Prop, Vue } from 'vue-property-decorator';
import Logo from './Logo.vue';
import SubLogo from './SubLogo.vue';

@Component({
  components: {
    Logo,
    SubLogo,
  },
})
export default class Header extends Vue {
  @Provide() private loadSuccess: boolean = true;
}
</script>