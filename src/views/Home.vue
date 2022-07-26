<template>
  <div>
    <TopNav @accepted="accepted" :random="random" />
    <SideNav />
    <Dashboard
      :accepted_id="accepted_id"
      :forConn="forConn"
      :random="random"
      v-if="showDashboard"
    />
    <Commitments v-if="showCommitments" />
    <Connections :forConn="forConn" v-if="showConnections" />
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
      random: 1,
      forConn: 1,
    };
  },
  methods: {
    goToLogin() {
      this.$router.replace("/login");
    },
    accepted(id) {
      this.accepted_id = id;
    },
  },
  mounted() {
    let UID = this.$store.state.UID;
    if (UID === null || UID === "" || UID === undefined) {
      this.$router.replace("/login");
    }

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

    firebase
      .firestore()
      .collection("LAST_ACTIVE")
      .doc(UID)
      .onSnapshot((doc) => {
        if (doc.data().active) {
          this.$store.commit("setLastActive", doc.data().active);
        }
      });

    firebase
      .firestore()
      .collection("CONNECT_REQ")
      .onSnapshot((res) => {
        let data = res.docs.map((doc) => doc.data());
        let currentUser = this.$store.getters.getPerson[0];
        let connectRequestReceivedOld = [...currentUser.connectRequestReceived];
        let connectRequestReceivedNew = [];

        data.forEach((request, index) => {
          request.CONNECT_REQ.forEach((req) => {
            if (req.to === UID) {
              connectRequestReceivedNew.push(req.from);
            }
          });
        });
        console.log(connectRequestReceivedNew, connectRequestReceivedOld);
        if (
          connectRequestReceivedNew.sort().toString() !==
          connectRequestReceivedOld.sort().toString()
        ) {
          connectRequestReceivedNew.forEach((ele) => {
            if (!connectRequestReceivedOld.includes(ele)) {
              this.$store.commit("addConnectRequestReceived", ele);
            }
          });
          connectRequestReceivedOld.forEach((ele) => {
            if (!connectRequestReceivedNew.includes(ele)) {
              this.$store.commit("removeConnectRequestReceived", ele);
            }
          });
        }
        this.random = (Math.random() + 1).toString(36).substring(2);
      });

    firebase
      .firestore()
      .collection("COMMITMENTS")
      .onSnapshot((res) => {
        let data = res.docs.map((doc) => doc.data());
        let allIds = res.docs.map((doc) => doc.id);
        data.forEach((commitment, index) => {
          if (commitment.COMMITMENTS.length === 0) {
            this.$store.commit("removeCommitment", allIds[index]);
          } else {
            this.$store.commit("setCommitment", commitment.COMMITMENTS);
          }
        });
      });

    firebase
      .firestore()
      .collection("CONNECTIONS")
      .onSnapshot((res) => {
        let data = res.docs.map((doc) => doc.data());
        let allIds = res.docs.map((doc) => doc.id);
        data.forEach((conn, index) => {
          if (conn.CONNECTIONS.length === 0) {
            this.$store.commit("removeConnection", allIds[index]);
          } else {
            this.$store.commit("setConnection", conn.CONNECTIONS);
          }
        });
        this.forConn = (Math.random() + 1).toString(36).substring(2);
        console.log("CONNECTIONS", data);
      });
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
