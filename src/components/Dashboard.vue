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
          <v-row v-for="n in 2" :key="n" class="mx-auto">
            <v-col v-for="k in 3" :key="k">
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
                        {{ person[k + (n - 1) * 3 - 1].stars }} Stars
                      </div>
                    </v-list-item-content>

                    <v-avatar color="grey" size="88">
                      <span class="white--text text-h5">SK</span>
                    </v-avatar>
                  </v-list-item>
                  <v-btn
                    :id="`${person[k + (n - 1) * 3 - 1].id}connect`"
                    @click.stop="sendRequest(k + (n - 1) * 3 - 1)"
                    x-small
                    color="cyan"
                    dark
                    width="100%"
                  >
                    <span class="font-shs"> CONNECT </span>
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
          max-width="800"
        >
          <v-card>
            <v-card-title class="text-h6">
              <span class="headline">
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
                v-for="n in 3"
                :key="n + 'commits'"
              >
                <v-card-actions>
                  <v-list-item class="grow">
                    <v-icon>mdi-link</v-icon>

                    <v-list-item-content>
                      <v-list-item-title class="ml-4">
                        <span class="font-h">No caffine for life time</span>
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-btn class="mr-5 ma-2 white--text" color="blue"
                        >star<v-icon right dark>mdi-star</v-icon></v-btn
                      >
                      <v-btn color="blue" class="mr-5 mr-5 ma-2 white--text"
                        >replicate<v-icon right dark
                          >mdi-book-plus-multiple</v-icon
                        ></v-btn
                      >
                      <v-btn color="blue" class="mr-2 ma-2 white--text"
                        >share<v-icon right dark
                          >mdi-share-variant</v-icon
                        ></v-btn
                      >
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="green darken-1" text @click="dialog = false">
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
        "Jammu and Kashmir",
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
    };
  },
  methods: {
    viewPerson(index) {
      this.dialogPersonIndex = index;
      this.dialog = true;
    },
    sendRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "none";
      document.getElementById(`${this.person[index].id}cancle`).style.display =
        "block";
      console.log("send request");
    },
    cancleRequest(index) {
      document.getElementById(`${this.person[index].id}connect`).style.display =
        "block";
      document.getElementById(`${this.person[index].id}cancle`).style.display =
        "none";
      console.log("cancle request");
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
  },
  mounted() {
    const data = [
      {
        id: "1",
        name: "Shubham Kumar",
        location_state_index: 0,
        location_country_index: 0,
        commitments: 3,
        connections: 5,
        stars: 30,
      },
      {
        id: "2",
        name: "Monu Kumar",
        location_state_index: 0,
        location_country_index: 0,
        commitments: 93,
        connections: 55,
        stars: 10,
      },
      {
        id: "3",
        name: "Sunny Kumar",
        location_state_index: 0,
        location_country_index: 0,
        commitments: 1,
        connections: 0,
        stars: 3,
      },
      {
        id: "4",
        name: "Tanvi Aggarwal",
        location_state_index: 1,
        location_country_index: 0,
        commitments: 3,
        connections: 50,
        stars: 300,
      },
      {
        id: "5",
        name: "Manish Kumar",
        location_state_index: 7,
        location_country_index: 0,
        commitments: 2,
        connections: 15,
        stars: 6,
      },
      {
        id: "6",
        name: "Monu Kumar",
        location_state_index: 0,
        location_country_index: 0,
        commitments: 93,
        connections: 55,
        stars: 10,
      },
      {
        id: "7",
        name: "Sunny Kumar",
        location_state_index: 0,
        location_country_index: 0,
        commitments: 1,
        connections: 0,
        stars: 3,
      },
      {
        id: "8",
        name: "Tanvi Aggarwal",
        location_state_index: 1,
        location_country_index: 0,
        commitments: 3,
        connections: 50,
        stars: 300,
      },
    ];
    this.users = data;
    if (this.users.length <= 6) {
      this.person = this.users;
    } else {
      this.person = this.users.slice(0, 6);
    }
  },
};
</script>

<style scoped>
.cancle-connect-btn {
  display: none;
}
</style>
