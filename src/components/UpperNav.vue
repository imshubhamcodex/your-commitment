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
          <template>
            <div class="text-center">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-width="100"
                left
                absolute
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon class="mr-12" v-bind="attrs" v-on="on">
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
                </template>

                <v-card>
                  <v-list>
                    <v-list-item>
                      <v-card class="mx-auto" max-width="240" max-height="500" outlined>
                      <span class="font-h ml-3">Connection Requests</span>
                      <v-divider></v-divider>
                        <v-list-item three-line>
                          <v-list-item-content>
                            <span class="font-sh">Shubham Kumar</span>
                            <span class="font-shs mb-3">from Bihar, India</span>
                            <div>
                              <v-btn class="" large icon small color="green" outlined>
                                <v-icon dark> mdi-check-circle </v-icon>
                              </v-btn>
                              <v-btn class="ml-10" large icon small color="red" outlined>
                                <v-icon dark> mdi-close-circle </v-icon>
                              </v-btn>
                            </div>
                          </v-list-item-content>

                          <v-list-item-avatar
                            size="40"
                            color="grey"
                          ></v-list-item-avatar>
                        </v-list-item>
                      </v-card>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>
                </v-card>
              </v-menu>
            </div>
          </template>

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
      menu: false,
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
