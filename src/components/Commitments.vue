<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Unbreakable Promises</h1>
      <v-btn @click="newCommitment" color="blue" class="white--text action-btn">
        New Commitment
        <v-icon right dark> mdi-plus-circle </v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8" style="height: 70vh; overflow: auto">
          <div
            v-if="commitments.length <= 0"
            style="padding-top: 150px; text-align: center"
          >
            <span>No Commitment Found!</span>
          </div>
          <template v-else>
            <v-expansion-panels focusable>
              <v-expansion-panel
                class="mt-3 g-animi-commitment-card"
                v-for="(item, i) in commitments"
                :key="i + 'commintments'"
              >
                <v-card class="mx-auto mr-5" color="cyan" dark width="100%">
                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-icon>mdi-link</v-icon>

                      <v-list-item-content>
                        <v-list-item-title class="ml-4">
                          <span class="title-">{{
                            item.title.length > 25
                              ? item.title.substring(0, 14) + "..."
                              : item.title
                          }}</span>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-row justify="end" class="row-edit">
                        <v-btn
                          @click="editCommitment(item)"
                          icon
                          class="pencil-btn"
                          ><v-icon> mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn
                          class="mr-1"
                          icon
                          @click="deleteCommitment(item)"
                        >
                          <v-icon> mdi-delete </v-icon></v-btn
                        >
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
                <v-expansion-panel-header>
                  <span>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="
                        item.stars.length === 0 ? '0' : item.stars.length
                      "
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-star</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="item.seen.length === 0 ? '0' : item.seen.length"
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-eye</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="
                        item.replicated.length === 0
                          ? '0'
                          : item.replicated.length
                      "
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-book-plus-multiple</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="
                        item.shared.length === 0 ? '0' : item.shared.length
                      "
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-share-variant</v-icon>
                    </v-badge>
                  </span>
                  <span>
                    Updated on
                    {{ new Date(item.upadatedOn).toString().substring(0, 15) }}
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-container>
      </template>
    </div>
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="500">
          <v-card>
            <v-card-title class="font-h">
              {{ dialogTitle }}
            </v-card-title>
            <v-card-text
              ><template>
                <v-container class="mt-1">
                  <div
                    style="max-width: 600px; display: block; margin: auto auto"
                  >
                    <v-text-field
                      v-model="title"
                      :label="
                        newCommit
                          ? 'What you want to commit ?'
                          : 'Your commitment'
                      "
                      outlined
                      clearable
                      counter="75"
                    ></v-text-field>
                    <br />
                    <v-textarea
                      outlined
                      clearable
                      :label="
                        newCommit
                          ? 'Please describe your commitment ?'
                          : 'Commitment Description'
                      "
                      counter="175"
                      v-model="description"
                    ></v-textarea>
                  </div>
                </v-container> </template
            ></v-card-text>
            <v-card-actions class="mt-n5">
              <v-spacer></v-spacer>
              <v-btn color="red darken-1" text @click="dialog = false">
                CANCLE
              </v-btn>
              <v-btn
                :disabled="title.trim() === ''"
                color="green darken-1"
                text
                @click="saveCommit"
              >
                SAVE
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
  data() {
    return {
      commitments: [],
      person: null,
      dialog: false,
      title: "",
      description: "",
      dialogTitle: "",
      newCommit: false,
      editCommit: null,
    };
  },
  methods: {
    deleteCommitment(commitment) {
      this.person.allCommitments.splice(
        this.person.allCommitments.indexOf(commitment),
        1
      );
      this.person.commitments = this.commitments.length;
      this.person.starsCount -= commitment.stars.length;
      this.person.seenCount -= commitment.seen.length;
      this.person.replicatedCount = commitment.replicated.length;
      this.person.sharedCount = commitment.shared.length;

      let allPeep = this.$store.getters.getPeople;

      let modifiedPeep = null;
      let isFound = false;

      allPeep.forEach((peep) => {
        peep.allCommitments.forEach((commit) => {
          if (commit.replicated.includes(this.person.id)) {
            commit.replicated.splice(
              commit.replicated.indexOf(this.person.id),
              1
            );
            isFound = true;
          }
        });
        if (isFound) {
          modifiedPeep = peep;
          return;
        }
      });

      if (isFound) {
        this.$store.commit("setIndividual", modifiedPeep);
      }
      console.log("deleted commitment");
      this.$store.commit("setIndividual", this.person);

      this.updateDB();
    },
    newCommitment() {
      this.newCommit = true;
      this.dialog = true;
      this.dialogTitle = "Your new Commitment";
      this.title = "";
      this.description = "";
    },
    editCommitment(commitment) {
      this.newCommit = false;
      this.editCommit = commitment;
      this.dialog = true;
      this.dialogTitle = "Edit Your Commitment";
      this.title = commitment.title;
      this.description = commitment.description;
    },
    saveCommit() {
      if (this.newCommit) {
        this.person.allCommitments.push({
          title: this.title,
          description: this.description,
          upadatedOn: Date.now(),
          stars: [],
          seen: [],
          replicated: [],
          shared: [],
          id: this.person.id,
          commitment_id: (Math.random() + 1).toString(36).substring(7),
        });
        this.person.commitments = this.person.allCommitments.length;
      } else {
        this.person.allCommitments[
          this.person.allCommitments.indexOf(this.editCommit)
        ].title = this.title;
        this.person.allCommitments[
          this.person.allCommitments.indexOf(this.editCommit)
        ].description = this.description;
        this.person.allCommitments[
          this.person.allCommitments.indexOf(this.editCommit)
        ].upadatedOn = Date.now();
      }
      this.$store.commit("setIndividual", this.person);
      this.dialog = false;
      this.updateDB();
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
    this.person = this.$store.getters.getPerson[0];
    this.commitments = this.person.allCommitments;

    let inv = setInterval(() => {
      if (
        document.getElementsByClassName("g-animi-commitment-card").length > 0
      ) {
        clearInterval(inv);
        gsap.fromTo(
          ".g-animi-commitment-card",
          {
            duration: 0.7,
            opacity: 0,
            y: 20,
            ease: "back.out",
            stagger: 0.2,
          },
          {
            duration: 0.7,
            opacity: 1,
            y: 0,
            ease: "back.out",
            stagger: 0.2,
          }
        );
      }
    }, 50);
  },
};
</script>

<style scoped>
.g-animi-commitment-card {
  opacity: 0;
}
.title {
  font-size: 18px;
  font-weight: bold;
}
.row-edit {
  width: 70px;
}
.pencil-btn {
  margin-right: 50px;
}

@media (max-width: 500px) {
  .action-btn {
    margin-top: 20px;
    margin-right: 17px !important;
  }
  .title {
    font-size: 12px;
  }
  .pencil-btn {
    margin-right: 0px;
  }
  .row-edit {
    width: 0px;
  }
}
</style>
