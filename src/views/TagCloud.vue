<template>
  <v-flex xs11 sm10 md8 lg6>
    <wordcloud :data="tagcloud" :showTooltip="false" :wordClick="totag" spiral="rectangular"></wordcloud>
  </v-flex>
</template>



<script lang="ts">
import { Provide, Component, Prop, Vue } from 'vue-property-decorator';
import wordcloud from 'vue-wordcloud';

@Component({
  components: {
    wordcloud,
  },
})
export default class App extends Vue {
  public beforeMounted() {
    this.$store.dispatch('tagcloud/getTagCloud');
  }

  public totag(tag: string) {
    this.$store.commit('tag/reset');
    this.$router.push('/tag/' + tag);
  }

  get tagcloud() {
    return this.$store.state.tagcloud.tagcloud.map((o: any) => {
      return { name: o.tag, value: o.count };
    });
  }
}
</script>