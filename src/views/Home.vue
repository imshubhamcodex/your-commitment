<template>
  <div>
    <TopNav @accepted="accepted" />
    <SideNav />
    <Dashboard :accepted_id="accepted_id" v-if="showDashboard" />
    <Commitments v-if="showCommitments" />
    <Connections v-if="showConnections" />
    <Help v-if="showHelp" />

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title  style="text-align: center; display:block;margin:auto auto:" class="font-h">
              404. Page lost in space.
            </v-card-title>
            <v-card-text class="pt-2">
              <div style="text-align: center; display:block;margin:auto auto:">
                <p class="font-h mt-1">Login again</p>
              </div>
              <v-btn
                @click="goToLogin"
                color="blue"
                dark
                style="display: block; margin: 10px auto; width: 100%"
              >
                login
              </v-btn>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
import UpperNav from "@/components/UpperNav.vue";
import SideNav from "@/components/SideNav.vue";
import Dashboard from "@/components/Dashboard.vue";
import Commitments from "@/components/Commitments.vue";
import Connections from "@/components/Connections.vue";
import Help from "@/components/Help.vue";

export default {
  components: {
    TopNav: UpperNav,
    SideNav: SideNav,
    Dashboard: Dashboard,
    Commitments: Commitments,
    Connections: Connections,
    Help: Help,
  },
  data() {
    return {
      showDashboard: true,
      showCommitments: false,
      showConnections: false,
      showHelp: false,
      accepted_id: "",
      dialog: false,
    };
  },
  methods: {
    goToLogin() {
      this.dialog = false;
      this.$router.replace("/login");
    },
    accepted(id) {
      this.accepted_id = id;
    },
  },
  mounted() {
    let UID = this.$store.state.UID;

    if (UID === null) {
      this.dialog = true;
      return;
    } else {
      setTimeout(() => {
        firebase
          .firestore()
          .collection("LAST_ACTIVE")
          .doc(UID)
          .set(
            {
              active: Date.now(),
            },
            { merge: true }
          )
          .catch((error) => {
            console.log("Error Saving LAST ACTIVE:", error);
          });
      }, 15 * 1000);
    }
  },
  watch: {
    "$store.state.openTab": function () {
      let openTab = this.$store.state.openTab;
      if (openTab === "DASHBOARD") {
        this.showDashboard = true;
        this.showCommitments = false;
        this.showConnections = false;
        this.showHelp = false;
      } else if (openTab === "COMMITMENTS") {
        this.showDashboard = false;
        this.showCommitments = true;
        this.showConnections = false;
        this.showHelp = false;
      } else if (openTab === "CONNECTIONS") {
        this.showDashboard = false;
        this.showCommitments = false;
        this.showConnections = true;
        this.showHelp = false;
      } else if (openTab === "SUPPORT") {
        this.showDashboard = false;
        this.showCommitments = false;
        this.showConnections = false;
        this.showHelp = true;
      }
    },
  },
};
</script>
