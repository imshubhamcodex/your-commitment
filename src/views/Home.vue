<template>
  <div>
    <TopNav @accepted="accepted" />
    <SideNav />
    <Dashboard :accepted_id="accepted_id" v-if="showDashboard" />
    <Commitments v-if="showCommitments" />
    <Connections v-if="showConnections" />
    <Help v-if="showHelp" />
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
    };
  },
  methods: {
    accepted(id) {
      this.accepted_id = id;
    },
  },
  mounted() {
    setTimeout(() => {
      let UID = this.$store.state.UID;
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
    }, 15*1000);
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
