<template>
  <v-btn class="ma-2" outlined x-small fab color="indigo" @click="upload">
    <v-icon>mdi-upload</v-icon>
    <input type="file" style="display: none" ref="image" accept="image/*" @change="onFilePicked" />
  </v-btn>
</template>

<script lang="ts">
import axios from 'axios';
import config from '../configs';
import { Component, Prop, Vue, Provide, Watch } from 'vue-property-decorator';

@Component({})
export default class UploadBtn extends Vue {
  @Provide() private imageFile!: any;
  @Provide() private imageName: string = '';

  public upload() {
    (this.$refs.image as HTMLElement).click();
  }
  public onFilePicked(e: any) {
    const files = e.target.files;
    if (files[0] !== undefined) {
      this.imageName = files[0].name;
      if (this.imageName.lastIndexOf('.') <= 0) {
        return;
      }
      const fr = new FileReader();
      fr.readAsDataURL(files[0]);
      fr.addEventListener('load', () => {
        this.imageFile = files[0];
        const formData = new FormData();
        formData.append('file', this.imageFile);
        axios.post(
          config.api.cloud +
            '/techimg/' +
            this.$store.state.account.id +
            '?name=' +
            this.imageFile.name,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': this.$cookies.get('token'),
            },
          },
        );
      });
    }
  }
}
</script>