<template>
  <div>
    <template>
      <v-card id="card-nav">
        <v-toolbar flat class="limit-height">
          <v-toolbar-title class="font-h">{{
            this.$store.getters.getOpenTab
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mr-1">mdi-cellphone-text</v-icon>
          <span class="grey--text font-shs mr-10">29 Aug 2019</span>
          <v-btn icon class="mr-12">
            <v-badge
              color="cyan"
              v-if="notification > 0"
              :content="notification"
              overlap
              bordered
            >
              <v-icon>mdi-bell</v-icon>
            </v-badge>

            <v-icon v-else>mdi-bell</v-icon>
          </v-btn>
          <span class="font-sh mr-4">Shubham Kumar</span>
          <v-avatar color="cyan" size="40">
            <span class="white--text font-h">SK</span>
          </v-avatar>
        </v-toolbar>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notification: 0,
    };
  },
  watch: {
    "$store.state.notifications": function () {
      this.notification = this.$store.state.notifications;
      console.log(this.notification);
    },
  },
};
</script>

<style scoped>
#card-nav {
  width: 85%;
  float: right;
  zoom: 0.85;
}
</style>
