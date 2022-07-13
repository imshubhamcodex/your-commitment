<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Let's Catch Up</h1>
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
          <v-row v-for="n in 2" :key="n + 'row-dashboard'" class="mx-auto">
            <v-col v-for="k in 3" :key="k + 'col-dashboard'">
              <template>
                <v-card
                  class="mx-auto"
                  max-width="344"
                  outlined
                  v-if="k + (n - 1) * 3 <= person.length"
                  @click="viewPerson(k + (n - 1) * 3 - 1)"
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="green"
                          >mdi-account-tie</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].name }}
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
                        :src="fetchImage(person[k + (n - 1) * 3 - 1].image_id)"
                        alt="USER IMAGE"
                      />
                    </v-avatar>
                  </v-list-item>
                  <v-btn
                    :id="`${person[k + (n - 1) * 3 - 1].id}connect`"
                    @click.stop="sendRequest(k + (n - 1) * 3 - 1)"
                    x-small
                    :dark="
                      person[k + (n - 1) * 3 - 1].id === UID ? false : true
                    "
                    color="cyan"
                    width="100%"
                    :disabled="person[k + (n - 1) * 3 - 1].id === UID"
                  >
                    <span class="font-shs">
                      {{
                        person[k + (n - 1) * 3 - 1].id === UID
                          ? "THIS IS YOU"
                          : "CONNECT"
                      }}
                    </span>
                  </v-btn>
                  <v-btn
                    :id="`${person[k + (n - 1) * 3 - 1].id}cancle`"
                    @click.stop="cancleRequest(k + (n - 1) * 3 - 1)"
                    x-small
                    color="red"
                    dark
                    width="100%"
                    class="cancle-connect-btn"
                  >
                    <span class="font-shs"> CANCLE </span>
                  </v-btn>
                </v-card>
              </template>
            </v-col>
          </v-row>
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
      dialog: false,
      dialogPersonIndex: -1,
      currentPage: 1,
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
      person: [],
      users: [],
      UID: "",
      dialog_content_key: 0,
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
    sendRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "none";
      document.getElementById(`${this.person[index].id}cancle`).style.display =
        "block";
      console.log("send request", this.person[index]);

      const conn = [
        {
          from: this.UID,
          to: this.person[index].id,
        },
      ];
      this.$store.commit("setConnectionRequest", conn);
    },
    cancleRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "block";
      document.getElementById(`${this.person[index].id}cancle`).style.display =
        "none";

      let person = this.person[index];

      let currentUser = this.$store.getters.getPerson[0];
      currentUser.connectRequestSend.splice(
        currentUser.connectRequestSend.indexOf(person.id),
        1
      );

      person.connectRequestReceived.splice(
        person.connectRequestReceived.indexOf(currentUser.id),
        1
      );

      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", person);

      console.log(this.$store.state.people);
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
      }
    },
    fetchImage() {
      console.log("fetching image");
      return "https://cdn.vuetifyjs.com/images/john.jpg";
    },
  },
  mounted() {
    this.users = this.$store.getters.getPeople;
    if (this.users.length <= 6) {
      this.person = this.users;
    } else {
      this.person = this.users.slice(0, 6);
    }
    this.UID = this.$store.getters.getUID;
  },
};
</script>

<style scoped>
.cancle-connect-btn {
  display: none;
}
</style>
