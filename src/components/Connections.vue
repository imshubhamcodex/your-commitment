<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Known Faces</h1>
      <v-btn
        @click.stop="prevPage"
        :disabled="currentPage === 1"
        class="action-btn"
        fab
        dark
        x-small
        color="blue"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        @click.stop="nextPage"
        class="action-btn mr-2"
        fab
        dark
        x-small
        color="blue"
        :disabled="person.length < 6"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8">
          <div
            v-if="connections.length <= 0"
            style="padding-top: 150px; text-align: center"
          >
            <span>No Connection Found!</span>
          </div>
          <template v-else>
            <v-row v-for="n in 2" :key="n + 'row-connections'" class="mx-auto">
              <v-col v-for="k in 3" :key="k + 'col-connections'">
                <template>
                  <v-card
                    v-if="k + (n - 1) * 3 <= person.length"
                    class="mx-auto"
                    max-width="344"
                    outlined
                    style="position: relative"
                    @click="viewPerson(k + (n - 1) * 3 - 1)"
                  >
                    <v-btn
                      icon
                      class="mr-1 mt-1"
                      style="position: absolute; right: 0; z-index: 9"
                      @click.stop="deletePerson(person[k + (n - 1) * 3 - 1])"
                    >
                      <v-icon color="red">mdi-delete</v-icon>
                    </v-btn>
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="mb-4 font-shs">
                          <v-icon class="mr-2 mt-n2" color="green"
                            >mdi-account-tie</v-icon
                          >{{ person[k + (n - 1) * 3 - 1].name }}
                        </div>
                        <div class="mb-4 font-shs">
                          <v-icon class="mr-2 mt-n2" color="purple"
                            >mdi-crosshairs-gps</v-icon
                          >
                          {{
                            location_state[
                              person[k + (n - 1) * 3 - 1].location_state_index
                            ]
                          }},
                          {{
                            location_country[
                              person[k + (n - 1) * 3 - 1].location_country_index
                            ]
                          }}
                        </div>
                        <div class="mb-4 font-shs">
                          <v-icon class="mr-2 mt-n2" color="red"
                            >mdi-handshake</v-icon
                          >
                          {{ person[k + (n - 1) * 3 - 1].commitments }}
                          Commitments
                        </div>
                        <div class="mb-4 font-shs">
                          <v-icon class="mr-2 mt-n2" color="indigo"
                            >mdi-graph</v-icon
                          >
                          {{ person[k + (n - 1) * 3 - 1].connections }}
                          Connections
                        </div>
                        <div class="font-shs">
                          <v-icon class="mr-2 mt-n2" color="yellow"
                            >mdi-star</v-icon
                          >
                          {{ person[k + (n - 1) * 3 - 1].starsCount }} Stars
                        </div>
                      </v-list-item-content>
                      <v-avatar color="grey" size="88">
                        <span
                          v-if="person[k + (n - 1) * 3 - 1].image_id === null"
                          class="white--text text-h5"
                          >{{
                            person[k + (n - 1) * 3 - 1].name
                              .split(" ")[0]
                              .substring(0, 1) +
                            person[k + (n - 1) * 3 - 1].name
                              .split(" ")[1]
                              .substring(0, 1)
                          }}</span
                        >
                        <img
                          v-else
                          :src="
                            fetchImage(person[k + (n - 1) * 3 - 1].image_id)
                          "
                          alt="USER IMAGE"
                        />
                      </v-avatar>
                    </v-list-item>

                    <v-btn x-small color="teal" disabled width="100%">
                      <span class="font-shs">
                        Connected on
                        {{
                          new Date(person[k + (n - 1) * 3 - 1].connectedOn)
                            .toString()
                            .substring(0, 15)
                        }}
                      </span>
                    </v-btn>
                  </v-card>
                </template>
              </v-col>
            </v-row>
          </template>
        </v-container>
      </template>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          v-if="dialogPersonIndex >= 0 && dialog"
          persistent
          :max-width="
            person[dialogPersonIndex].commitments === 0 ? '400px' : '800px'
          "
        >
          <v-card>
            <v-card-title class="text-h6">
              <span class="font-h">
                {{ person[dialogPersonIndex].name }}
                <span class="font-shs"
                  >from
                  {{
                    location_state[
                      person[dialogPersonIndex].location_state_index
                    ]
                  }},
                  {{
                    location_country[
                      person[dialogPersonIndex].location_country_index
                    ]
                  }}</span
                >
              </span>
            </v-card-title>
            <v-card-text>
              <v-card
                style="zoom: 0.8"
                class="mx-auto mr-5 mt-3"
                color="cyan"
                dark
                width="100%"
                v-for="(item, n) in person[dialogPersonIndex].allCommitments"
                :key="
                  item +
                  'commits-dashboard' +
                  person[dialogPersonIndex].id +
                  'dialog' +
                  n
                "
              >
                <v-card-actions :key="dialog_content_key">
                  <v-list-item class="grow">
                    <v-icon>mdi-link</v-icon>

                    <v-list-item-content>
                      <v-list-item-title class="ml-4">
                        <span class="font-h">{{ item.title }}</span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-btn
                        v-if="!item.replicated.includes(UID)"
                        :disabled="item.id === UID"
                        @click="handleReplicate(item.commitment_id)"
                        color="blue"
                        class="mr-5 mr-5 ma-2 white--text"
                        >replicate<v-icon right dark
                          >mdi-book-plus-multiple</v-icon
                        ></v-btn
                      >
                      <v-btn
                        v-else
                        @click="handleReplicate(item.commitment_id)"
                        class="mr-5 yellow--text"
                        icon
                      >
                        <v-icon dark>mdi-file-star</v-icon>
                      </v-btn>

                      <v-btn
                        @click="handleStar(item.commitment_id)"
                        class="mr-5 ma-2 white--text"
                        v-if="!item.stars.includes(UID)"
                        color="blue"
                        >star<v-icon right dark>mdi-star</v-icon></v-btn
                      >
                      <v-btn
                        v-else
                        @click="handleStar(item.commitment_id)"
                        class="mr-5 yellow--text"
                        icon
                      >
                        <v-icon dark>mdi-star</v-icon>
                      </v-btn>

                      <v-btn color="blue" class="mr-2 ma-2 white--text"
                        >share<v-icon right dark
                          >mdi-share-variant</v-icon
                        ></v-btn
                      >
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
              <span
                class="font-h"
                v-if="person[dialogPersonIndex].commitments === 0"
                >Not Commited anything yet!</span
              >
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="closeDialog">
                CLOSE
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      person: [],
      connections: [],
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
      currentPage: 1,
      dialog: false,
      dialogPersonIndex: -1,
      dialog_content_key: 0,
      UID: "",
    };
  },
  methods: {
    viewPerson(index) {
      this.dialogPersonIndex = index;
      this.dialog = true;
      this.handleSeen();
      console.log(this.person[index].id);
    },
    closeDialog() {
      this.dialog = false;
      this.dialogPersonIndex = -1;
    },
    handleStar(commitmentID) {
      this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
        if (item.commitment_id === commitmentID) {
          if (item.stars.includes(this.UID)) {
            item.stars.splice(item.stars.indexOf(this.UID), 1);
            console.log("unstar");
            this.person[this.dialogPersonIndex].starsCount -= 1;
          } else {
            item.stars.push(this.UID);
            this.person[this.dialogPersonIndex].starsCount += 1;
            console.log("star");
          }
        }
      });
      this.$store.commit("setIndividual", this.person[this.dialogPersonIndex]);
      this.dialog_content_key += 1;
      this.updateDB();
    },
    handleReplicate(commitmentID) {
      this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
        if (item.commitment_id === commitmentID) {
          if (item.replicated.includes(this.UID)) {
            item.replicated.splice(item.replicated.indexOf(this.UID), 1);
            console.log("unreplicate");
            this.person[this.dialogPersonIndex].replicatedCount -= 1;
          } else {
            item.replicated.push(this.UID);
            console.log("replicate");
            this.person[this.dialogPersonIndex].replicatedCount += 1;
          }
        }
      });
      this.$store.commit("setIndividual", this.person[this.dialogPersonIndex]);
      this.dialog_content_key += 1;
      this.updateDB();
    },
    handleSeen() {
      if (this.person[this.dialogPersonIndex].commitments > 0) {
        this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
          if (!item.seen.includes(this.UID)) {
            item.seen.push(this.UID);
            console.log("seen");
            this.person[this.dialogPersonIndex].seenCount += 1;
          }
        });
        this.$store.commit(
          "setIndividual",
          this.person[this.dialogPersonIndex]
        );
        this.updateDB();
      }
    },
    nextPage() {
      this.currentPage++;
      let upper_index = this.currentPage * 6;
      this.person = this.users.slice(upper_index - 6, upper_index);
    },
    prevPage() {
      this.currentPage--;
      let upper_index = this.currentPage * 6;
      this.person = this.users.slice(upper_index - 6, upper_index);
    },

    deletePerson(person) {
      this.connections.forEach((connection, index) => {
        if (connection.connectedWith.includes(person.id)) {
          if (connection.connectedWith.length === 1) {
            this.connections.splice(index, 1);
          } else {
            connection.connectedWith.splice(
              connection.connectedWith.indexOf(person.id),
              1
            );
          }
        }
      });
      this.person.forEach((p, index) => {
        if (p.id === person.id) {
          this.person.splice(index, 1);
        }
      });

      let currentUser = this.$store.getters.getPerson[0];
      currentUser.connections = this.connections.length;
      currentUser.allConnections = this.connections;

      person.allConnections.forEach((con, index) => {
        if (con.connectedWith.includes(currentUser.id)) {
          if (con.connectedWith.length === 1) {
            person.allConnections.splice(index, 1);
          } else {
            con.connectedWith.splice(
              con.connectedWith.indexOf(currentUser.id),
              1
            );
          }
        }
      });
      person.connections = person.allConnections.length;
      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", person);
      this.updateDB();
      console.log(currentUser);
    },
    fetchImage() {
      console.log("fetching image");
      return "https://cdn.vuetifyjs.com/images/john.jpg";
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
    this.connections = this.$store.getters.getPerson[0].allConnections;
    let people = this.$store.getters.getPeople;
    this.UID = this.$store.getters.getUID;

    people.forEach((person) => {
      this.connections.forEach((connection) => {
        if (connection.connectedWith.includes(person.id)) {
          person.connectedOn = connection.connectedOn;
          this.person.push(person);
        }
      });
    });
    console.log(this.connections);
  },
};
</script>

<style></style>
