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
        :disabled="
          (person.length < 6 && innerWidth >= 500) ||
          (person.length < 2 && innerWidth < 500)
        "
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8" id="card-container">
          <v-row
            v-for="n in innerWidth < 500 ? 1 : 2"
            :key="n + 'row-dashboard'"
            class="mx-auto"
          >
            <v-col
              v-for="k in innerWidth < 500 ? 2 : 3"
              :key="k + 'col-dashboard'"
            >
              <template>
                <v-card
                  class="mx-auto g-animi-dash-card people-card"
                  max-width="344"
                  outlined
                  v-show="k + (n - 1) * 3 <= person.length"
                  :disabled="k + (n - 1) * 3 > person.length"
                  @click="viewPerson(k + (n - 1) * 3 - 1)"
                  :key="dialog_content_key + 'vcard' + k + (n - 1) * 3"
                >
                  <v-list-item three-line>
                    <v-list-item-content class="text-content">
                      <div
                        v-if="k + (n - 1) * 3 <= person.length"
                        class="mb-4 font-shs"
                      >
                        <v-icon class="mr-2 mt-n2" color="green"
                          >mdi-account-tie</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].name }}
                      </div>
                      <div
                        v-if="k + (n - 1) * 3 <= person.length"
                        class="mb-4 font-shs"
                      >
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
                      <div
                        v-if="k + (n - 1) * 3 <= person.length"
                        class="mb-4 font-shs"
                      >
                        <v-icon class="mr-2 mt-n2" color="red"
                          >mdi-handshake</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].commitments }}
                        Commitments
                      </div>
                      <div
                        v-if="k + (n - 1) * 3 <= person.length"
                        class="mb-4 font-shs"
                      >
                        <v-icon class="mr-2 mt-n2" color="indigo"
                          >mdi-graph</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].connections }}
                        Connections
                      </div>
                      <div
                        v-if="k + (n - 1) * 3 <= person.length"
                        class="font-shs"
                      >
                        <v-icon class="mr-2 mt-n2" color="yellow"
                          >mdi-star</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].starsCount }} Stars
                      </div>
                    </v-list-item-content>

                    <v-avatar
                      class="avatar-dashboard"
                      v-if="k + (n - 1) * 3 <= person.length"
                      color="grey"
                      size="88"
                    >
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
                    v-if="k + (n - 1) * 3 <= person.length"
                    :id="`${person[k + (n - 1) * 3 - 1].id}connect`"
                    @click.stop="sendRequest(k + (n - 1) * 3 - 1)"
                    x-small
                    :dark="
                      person[k + (n - 1) * 3 - 1].id === UID ||
                      connectedPerson.includes(person[k + (n - 1) * 3 - 1].id)
                        ? false
                        : true
                    "
                    color="cyan"
                    width="100%"
                    :disabled="
                      person[k + (n - 1) * 3 - 1].id === UID ||
                      connectedPerson.includes(person[k + (n - 1) * 3 - 1].id)
                    "
                    :style="{
                      display: sentRequests.includes(
                        person[k + (n - 1) * 3 - 1].id
                      )
                        ? 'none'
                        : 'block',
                    }"
                  >
                    <span class="font-shs">
                      {{
                        person[k + (n - 1) * 3 - 1].id === UID
                          ? "THIS IS YOU"
                          : connectedPerson.includes(
                              person[k + (n - 1) * 3 - 1].id
                            )
                          ? "ALREADY CONNECTED"
                          : "CONNECT"
                      }}
                    </span>
                  </v-btn>
                  <v-btn
                    v-if="k + (n - 1) * 3 <= person.length"
                    :id="`${person[k + (n - 1) * 3 - 1].id}cancel`"
                    @click.stop="cancelRequest(k + (n - 1) * 3 - 1)"
                    x-small
                    color="red"
                    dark
                    width="100%"
                    class="cancel-connect-btn"
                    :style="{
                      display: sentRequests.includes(
                        person[k + (n - 1) * 3 - 1].id
                      )
                        ? 'block'
                        : 'none',
                    }"
                  >
                    <span class="font-shs"> cancel </span>
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
            person[dialogPersonIndex].commitments === 0 ? '400px' : '900px'
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

                    <v-row align="center" justify="end" v-if="innerWidth > 500">
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

                    <v-list-item-content v-else>
                      <v-row align="center" justify="end">
                        <v-btn
                          v-if="!item.replicated.includes(UID)"
                          :disabled="item.id === UID"
                          @click="handleReplicate(item.commitment_id)"
                          icon
                          dark
                          class="ma-2 white--text"
                          ><v-icon right dark
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
                          class="mr-5 white--text"
                          v-if="!item.stars.includes(UID)"
                          icon
                          ><v-icon right dark>mdi-star</v-icon></v-btn
                        >
                        <v-btn
                          v-else
                          @click="handleStar(item.commitment_id)"
                          class="mr-5 yellow--text"
                          icon
                        >
                          <v-icon dark>mdi-star</v-icon>
                        </v-btn>
                      </v-row>
                    </v-list-item-content>
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
import gsap from "gsap";
export default {
  props: ["accepted_id"],
  data() {
    return {
      dialog: false,
      dialogPersonIndex: -1,
      currentPage: 1,
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
      person: [],
      users: [],
      UID: "",
      connectedPerson: [],
      sentRequests: [],
      dialog_content_key: 0,
      innerWidth: 1000,
    };
  },
  methods: {
    viewPerson(index) {
      this.dialogPersonIndex = index;
      this.dialog = true;
      this.handleSeen();
    },
    closeDialog() {
      this.dialog = false;
      this.dialogPersonIndex = -1;
    },
    sendRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "none";
      document.getElementById(`${this.person[index].id}cancel`).style.display =
        "block";

      const conn = [
        {
          from: this.UID,
          to: this.person[index].id,
        },
      ];
      this.$store.commit("setConnectionRequest", conn);
      this.updateDB();
    },
    cancelRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "block";
      document.getElementById(`${this.person[index].id}cancel`).style.display =
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
      this.updateDB();
    },
    nextPage() {
      this.currentPage++;

      if (window.innerWidth < 500) {
        let upper_index = this.currentPage * 2;
        if (this.users.length >= upper_index)
          this.person = this.users.slice(upper_index - 2, upper_index);
        else this.person = this.users.slice(upper_index - 2, this.users.length);
      } else {
        let upper_index = this.currentPage * 6;
        if (this.users.length >= upper_index)
          this.person = this.users.slice(upper_index - 6, upper_index);
        else this.person = this.users.slice(upper_index - 6, this.users.length);
      }
    },
    prevPage() {
      this.currentPage--;

      if (window.innerWidth < 500) {
        let upper_index = this.currentPage * 2;
        this.person = this.users.slice(upper_index - 2, upper_index);
      } else {
        let upper_index = this.currentPage * 6;
        this.person = this.users.slice(upper_index - 6, upper_index);
      }
    },
    handleStar(commitmentID) {
      this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
        if (item.commitment_id === commitmentID) {
          if (item.stars.includes(this.UID)) {
            item.stars.splice(item.stars.indexOf(this.UID), 1);

            this.person[this.dialogPersonIndex].starsCount -= 1;
          } else {
            item.stars.push(this.UID);
            this.person[this.dialogPersonIndex].starsCount += 1;
          }
        }
      });
      this.$store.commit("setIndividual", this.person[this.dialogPersonIndex]);
      this.updateDB();
    },
    handleReplicate(commitmentID) {
      let toCopy = false;
      this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
        if (item.commitment_id === commitmentID) {
          if (item.replicated.includes(this.UID)) {
            item.replicated.splice(item.replicated.indexOf(this.UID), 1);

            this.person[this.dialogPersonIndex].replicatedCount -= 1;
          } else {
            item.replicated.push(this.UID);
            toCopy = item;

            this.person[this.dialogPersonIndex].replicatedCount += 1;
          }
        }
      });
      let currentUser = this.$store.getters.getPerson[0];
      currentUser.allCommitments.forEach((item) => {
        if (item.commitment_id === commitmentID) {
          currentUser.allCommitments.splice(
            currentUser.allCommitments.indexOf(item),
            1
          );
        }
      });

      if (toCopy) {
        let copyCommit = {
          title: toCopy.title,
          description: "",
          upadatedOn: Date.now(),
          stars: [],
          seen: [],
          replicated: [],
          shared: [],
          id: this.UID,
          commitment_id: toCopy.commitment_id,
        };
        currentUser.allCommitments.push(copyCommit);
      }

      currentUser.commitments = currentUser.allCommitments.length;

      this.$store.commit("setIndividual", currentUser);
      this.$store.commit("setIndividual", this.person[this.dialogPersonIndex]);
      this.updateDB();
    },
    handleSeen() {
      if (this.person[this.dialogPersonIndex].commitments > 0) {
        this.person[this.dialogPersonIndex].allCommitments.forEach((item) => {
          if (!item.seen.includes(this.UID)) {
            item.seen.push(this.UID);

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
    this.innerWidth = window.innerWidth;
    this.users = this.$store.getters.getPeople;

    if (window.innerWidth < 500) {
      if (this.users.length <= 2) {
        this.person = this.users;
      } else {
        this.person = this.users.slice(0, 2);
      }
    } else {
      if (this.users.length <= 6) {
        this.person = this.users;
      } else {
        this.person = this.users.slice(0, 6);
      }
    }

    this.UID = this.$store.getters.getUID;
    let currentUser = this.$store.getters.getPerson;
    if (currentUser.length > 0) {
      currentUser[0].allConnections.forEach((item) => {
        if (item.connectedWith.length > 0)
          this.connectedPerson.push(...item.connectedWith);
      });

      if (currentUser[0].connectRequestSend.length > 0)
        this.sentRequests = [...currentUser[0].connectRequestSend];
    }

    let inv = setInterval(() => {
      if (document.getElementsByClassName("g-animi-dash-card").length > 0) {
        clearInterval(inv);
        gsap.fromTo(
          ".g-animi-dash-card",
          {
            duration: 0.7,
            opacity: 0,
            x: -20,
            ease: "back.out",
            stagger: 0.2,
          },
          {
            duration: 0.7,
            opacity: 1,
            x: 0,
            ease: "back.out",
            stagger: 0.2,
          }
        );
      }
    }, 50);
  },
  watch: {
    accepted_id: function () {
      this.connectedPerson.push(this.accepted_id);
    },
    "$store.state.notifications": function () {
      let currentUser = this.$store.getters.getPerson;
      if (currentUser.length > 0) {
        currentUser[0].allConnections.forEach((item) => {
          if (item.connectedWith.length > 0)
            this.connectedPerson.push(...item.connectedWith);
        });

        if (currentUser[0].connectRequestSend.length > 0)
          this.sentRequests = [...currentUser[0].connectRequestSend];
      }
    },
  },
};
</script>

<style scoped>
.cancel-connect-btn {
  display: none;
}
.g-animi-dash-card {
  opacity: 0;
}

@media (max-width: 480px) {
  .action-btn {
    margin-top: -40px;
  }
  .avatar-dashboard {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translate(-50%, -50%);
    margin-top: 10px;
  }
  .text-content {
    padding-top: 70px;
  }
  .people-card:nth-child(1) {
    margin-top: 30px;
  }
  #card-container {
    margin-top: 10px !important;
  }
}
</style>
