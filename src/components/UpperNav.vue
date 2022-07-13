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
                :close-on-content-click="person.length == 0 ? true : false"
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
                      <v-card
                        class="mx-auto"
                        max-width="240"
                        max-height="500"
                        outlined
                      >
                        <span class="font-h ml-3">Connection Requests</span>
                        <v-divider></v-divider>
                        <v-list-item
                          v-for="peep in person"
                          :key="peep.id + 'request'"
                          three-line
                        >
                          <v-list-item-content>
                            <span class="font-sh">{{ peep.name }}</span>
                            <span class="font-shs mb-3"
                              >from
                              {{ location_state[peep.location_state_index] }},
                              {{
                                location_country[peep.location_country_index]
                              }}</span
                            >
                            <div>
                              <v-btn
                                large
                                icon
                                small
                                color="green"
                                outlined
                                @click.stop="accepted(peep)"
                              >
                                <v-icon dark> mdi-check-circle </v-icon>
                              </v-btn>
                              <v-btn
                                class="ml-10"
                                large
                                icon
                                small
                                color="red"
                                outlined
                                @click.stop="declined(peep)"
                              >
                                <v-icon dark> mdi-close-circle </v-icon>
                              </v-btn>
                            </div>
                          </v-list-item-content>

                          <v-list-item-avatar size="50" color="grey">
                            <span
                              v-if="peep.image_id === null"
                              class="white--text text-h5"
                              >{{
                                peep.name.split(" ")[0].substring(0, 1) +
                                peep.name.split(" ")[1].substring(0, 1)
                              }}</span
                            >
                            <img
                              v-else
                              :src="fetchImage(peep.image_id)"
                              alt="USER IMAGE"
                            />
                          </v-list-item-avatar>
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
      person: [],
      location_state: [
        "Bihar",
        "Haryana",
        "J&K",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Uttar Pradesh",
      ],
      location_country: ["INDIA"],
      UID: "",
    };
  },
  methods: {
    accepted(peep) {
      let person = peep;
      let currentUser = this.$store.getters.getPerson[0];
      currentUser.connectRequestReceived.splice(
        currentUser.connectRequestReceived.indexOf(person.id),
        1
      );
      currentUser.allConnections.push({
        connectedOn: Date.now(),
        connectedWith: [person.id],
        id: this.UID,
      });
      currentUser.connections += 1;

      person.connectRequestSend.splice(
        person.connectRequestSend.indexOf(currentUser.id),
        1
      );
      person.allConnections.push({
        connectedOn: Date.now(),
        connectedWith: [currentUser.id],
        id: this.UID,
      });
      person.connections += 1;

      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", person);

      this.person.splice(this.person.indexOf(person), 1);
      this.notifications -= 1;
      this.$store.commit("setNotifications", this.notifications);

      this.$emit("accepted", person.id);
    },
    declined(peep) {
      let person = peep;
      let currentUser = this.$store.getters.getPerson[0];
      currentUser.connectRequestReceived.splice(
        currentUser.connectRequestReceived.indexOf(person.id),
        1
      );

      person.connectRequestSend.splice(
        person.connectRequestSend.indexOf(currentUser.id),
        1
      );

      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", person);

      this.person.splice(this.person.indexOf(person), 1);
      this.notifications -= 1;
      this.$store.commit("setNotifications", this.notifications);
    },
    fetchImage() {
      console.log("fetching image");
      return "https://cdn.vuetifyjs.com/images/john.jpg";
    },
  },
  mounted() {
    this.UID = this.$store.getters.getUID;
  },
  watch: {
    "$store.state.notifications": function () {
      this.notification = this.$store.state.notifications;
      let currentUser = this.$store.getters.getPerson[0];
      let allRequestRecivedID = currentUser.connectRequestReceived;
      this.$store.getters.getPeople.forEach((person) => {
        if (allRequestRecivedID.includes(person.id)) {
          this.person.push(person);
        }
      });
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
