<template>
  <div>
    <template>
      <v-card id="card-nav">
        <v-toolbar flat class="limit-height">
          <v-toolbar-title id="top-head" class="font-h">{{
            this.$store.getters.getOpenTab
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon class="mr-1" color="green">mdi-cellphone-text</v-icon>
          <span class="grey--text font-shs mr-10">{{
            innerWidth > 330 ? last_active : last_active.substring(0, 7)
          }}</span>
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
                      v-if="notifications > 0"
                      :content="notifications"
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

                          <v-list-item-avatar
                            class="mt-2"
                            size="45"
                            color="grey"
                          >
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
                          <div>
                            <hr
                              style="
                                border: 1px #ddd solid;
                                width: 100%;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                              "
                            />
                          </div>
                        </v-list-item>
                      </v-card>
                    </v-list-item>
                  </v-list>

                  <v-divider></v-divider>
                </v-card>
              </v-menu>
            </div>
          </template>

          <span class="font-sh mr-4">{{ this.user.name }}</span>
          <v-file-input
            id="file-upload-upper-nav"
            hide-input
            accept="image/*"
            truncate-length="1"
            v-model="imgFile"
            style="zoom: 0.1; opacity: 0"
          ></v-file-input>
          <v-avatar @click="setUserImag" color="cyan" size="40">
            <img v-if="imgURL !== null" :src="imgURL" />
            <span
              v-else-if="user.image_id === null"
              class="white--text text-h6"
              >{{
                this.user.name.split(" ")[0].substring(0, 1) +
                this.user.name.split(" ")[1].substring(0, 1)
              }}</span
            >
            <img v-else :src="fetchImage(user.image_id)" alt="USER IMAGE" />
          </v-avatar>
        </v-toolbar>
      </v-card>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["random"],
  data() {
    return {
      notifications: 0,
      last_active: 0,
      menu: false,
      person: [],
      location_state: [
        "Andhra",
        "Arunachal",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal",
        "J & K",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman",
        "Chandigarh",
        "Dadra Nagar Haveli",
        "Daman & Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
      ],
      location_country: ["INDIA"],
      UID: "",
      user: {
        name: "Unknown User",
        image_id: null,
      },
      imgFile: null,
      imgURL: null,
    };
  },
  methods: {
    setUserImag() {
      document.getElementById("file-upload-upper-nav").click();
    },
    async accepted(peep) {
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
        id: person.id,
      });
      person.connections += 1;

      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", person);
      this.person = this.person.filter((item) => item.id !== person.id);
      this.notifications -= 1;
      this.$store.commit("setNotifications", this.notifications);

      let arr = [];
      person.connectRequestSend.forEach((conn) => {
        let connectReq = {
          from: person.id,
          to: conn,
        };
        arr.push(connectReq);
      });

      await firebase
        .firestore()
        .collection("CONNECT_REQ")
        .doc(person.id)
        .set(
          {
            CONNECT_REQ: arr,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log("Error Sending Connect Request:", error);
        });

      this.updateDB();

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

      this.person = this.person.filter((item) => item.id !== person.id);
      this.notifications = currentUser.connectRequestReceived.length;
      console.log(this.notifications);
      this.$store.commit("setNotifications", this.notifications);

      this.updateDB();
    },
    fetchImage(img) {
      console.log("fetching image");
      return img;
    },
    updateDB() {
      let allCommitments = [];
      let allConnections = [];
      let allConnectRequest = [];

      let allPeople = this.$store.getters.getPeople;

      allPeople.forEach((peep) => {
        allCommitments.push(peep.allCommitments);
      });

      allPeople.forEach((peep) => {
        let arr = [...peep.allConnections];
        arr.push(peep.id);
        allConnections.push(arr);
      });

      allPeople.forEach((peep) => {
        let arr = [];
        peep.connectRequestSend.forEach((conn) => {
          let connectReq = {
            from: peep.id,
            to: conn,
          };
          arr.push(connectReq);
        });
        arr.push(peep.id);
        allConnectRequest.push(arr);
      });
      this.$store.commit("setAllCommitments", allCommitments);
      this.$store.commit("setAllConnections", allConnections);
      this.$store.commit("setAllConnectRequest", allConnectRequest);
    },
  },
  mounted() {
    this.UID = this.$store.getters.getUID;
    this.user = this.$store.getters.getPerson[0];
    this.last_active = new Date(this.user.last_active)
      .toString()
      .substring(4, 15);
    let allRequestRecivedID = this.user.connectRequestReceived;
    this.notifications = allRequestRecivedID.length;
    this.$store.getters.getPeople.forEach((person) => {
      if (allRequestRecivedID.includes(person.id)) {
        this.person.push(person);
      }
    });
  },
  watch: {
    random: function () {
      this.person = [];
      this.UID = this.$store.getters.getUID;
      this.user = this.$store.getters.getPerson[0];
      let allRequestRecivedID = this.user.connectRequestReceived;
      this.notifications = allRequestRecivedID.length;
      this.$store.getters.getPeople.forEach((person) => {
        if (allRequestRecivedID.includes(person.id)) {
          this.person.push(person);
        }
      });
    },
    imgFile: async function () {
      this.imgURL = window.URL.createObjectURL(this.imgFile);
      if (this.imgFile !== null) {
        let pathReference = firebase
          .storage()
          .ref()
          .child("images/" + this.user.id);
        await pathReference.put(this.imgFile).then(async () => {
          await pathReference.getDownloadURL().then((url) => {
            this.user.image_id = url;
          });
        });

        await firebase
          .firestore()
          .collection("USERS")
          .doc(this.user.id)
          .update({
            image_id: this.user.image_id,
          });
      }
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

@media (max-width: 480px) {
  #top-head {
    display: none;
  }
}
</style>
