<template>
  <v-card id="card">
    <v-list class="mb-12 mt-2">
      <v-list-item id="p-logo" class="mt-n2">
        <img
          id="logo"
          src="../assets/logo.png"
          style="
            height: 100px;
            margin: auto auto;
            text-align: center;
            transform: rotate(-2deg);
          "
        />
      </v-list-item>
    </v-list>

    <v-list nav dense style="margin-top: 80px">
      <v-list-item
        id="dashboard-tab"
        @click="openTab('dashboard')"
        link
        class="mt-1"
      >
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Dashboard</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item
        id="commitments-tab"
        @click="openTab('commitments')"
        link
        class="mt-4"
      >
        <v-list-item-icon>
          <v-icon>mdi-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Commitments</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item
        id="connections-tab"
        @click="openTab('connections')"
        link
        class="mt-4"
      >
        <v-list-item-icon>
          <v-icon>mdi-graph</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Connections</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item
        id="support-tab"
        @click="openTab('support')"
        link
        class="mt-4"
      >
        <v-list-item-icon>
          <v-icon>mdi-lifebuoy</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Support</span></v-list-item-title
        >
      </v-list-item>

      <v-list-item link class="mt-4" @click.stop="donate">
        <v-list-item-icon>
          <v-icon>mdi-gift</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Donate</span></v-list-item-title
        >
      </v-list-item>
    </v-list>

    <v-list nav dense id="lower-list">
      <v-list-item id="power-btn">
        <v-btn @click="signOut" fab dark small color="cyan">
          <v-icon dark> mdi-power </v-icon>
        </v-btn>
        <hr class="mt-8 ml-1" />
        <span class="ml-1" id="version">v1.02</span>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    openTab(tab) {
      if (tab == "dashboard") {
        this.$store.commit("setTab", "DASHBOARD");
        document.getElementById("dashboard-tab").style.backgroundColor =
          "#5CFFFF";
        document.getElementById("commitments-tab").style.backgroundColor =
          "transparent";
        document.getElementById("connections-tab").style.backgroundColor =
          "transparent";
        document.getElementById("support-tab").style.backgroundColor =
          "transparent";
      } else if (tab == "commitments") {
        this.$store.commit("setTab", "COMMITMENTS");
        document.getElementById("dashboard-tab").style.backgroundColor =
          "transparent";
        document.getElementById("commitments-tab").style.backgroundColor =
          "#5CFFFF";
        document.getElementById("connections-tab").style.backgroundColor =
          "transparent";
        document.getElementById("support-tab").style.backgroundColor =
          "transparent";
      } else if (tab == "connections") {
        this.$store.commit("setTab", "CONNECTIONS");
        document.getElementById("dashboard-tab").style.backgroundColor =
          "transparent";
        document.getElementById("commitments-tab").style.backgroundColor =
          "transparent";
        document.getElementById("connections-tab").style.backgroundColor =
          "#5CFFFF";
        document.getElementById("support-tab").style.backgroundColor =
          "transparent";
      } else if (tab == "support") {
        this.$store.commit("setTab", "SUPPORT");
        document.getElementById("dashboard-tab").style.backgroundColor =
          "transparent";
        document.getElementById("commitments-tab").style.backgroundColor =
          "transparent";
        document.getElementById("connections-tab").style.backgroundColor =
          "transparent";
        document.getElementById("support-tab").style.backgroundColor =
          "#5CFFFF";
      }
    },
    signOut() {
      let isOut = confirm("Are you sure to logout?");
      if (isOut) {
        firebase
          .auth()
          .signOut()
          .then(() => {
            this.$store.replaceState({
              openTab: "DASHBOARD",
              UID: false,
              people: [],
              notifications: -1,
              allCommitments: [],
              allConnections: [],
              allConnectRequest: [],
            });
            localStorage.setItem("email-commitment", "");
            this.$router.replace("/");
          })
          .catch((err) => {
            console.log("Error while sign out" + err);
          });

        this.$store.replaceState({});
      }
    },
    donate() {
      this.makePayment();
    },
    makePayment() {
      const options = {
        key: process.env.VUE_APP_RAZORPAY_KEY_ID,
        amount: 51 * 100, // 100 paise = INR 1
        name: "Commitment",
        description: "Donating LOVE",
        image: "https://tinyurl.com/4bcy9a3y",
        handler: (response) => this.onPaymentSuccess(response),
        prefill: {
          name: this.$store.getters.getPerson[0].name,
          id: this.$store.getters.getPerson[0].id,
          email: this.$store.getters.getPerson[0].email,
          contact: 8018439472,
        },
        theme: {
          color: "cyan",
        },
      };
      const rzp = new Razorpay(options);
      rzp.open();
      rzp.on("payment.failed", (error) => this.onPaymentFailure(error));
    },
    onPaymentSuccess(response) {
      console.log("Success" + response);
    },
    onPaymentFailure(response) {
      console.log("Failed" + response);
    },
  },
  mounted() {
    if (this.$store.getters.getOpenTab === "DASHBOARD") {
      document.getElementById("dashboard-tab").style.backgroundColor =
        "#5CFFFF";
    }
  },
};
</script>

<style scoped>
#power-btn {
  text-align: center;
  margin: auto auto;
  display: block;
  margin-top: 0px;
}
#card {
  width: 15%;
  height: 100vh;
  float: left;
}
#lower-list {
  margin-top: 70px;
}

@media (max-width: 480px) {
  #p-logo {
    padding-left: 10px;
  }
  #logo {
    zoom: 0.3;
    margin-top: 5px !important;
  }
  #power-btn {
    margin-left: -10px;
    margin-top: 70px;
  }
}

@media (max-width: 370px) {
  #version {
    zoom: 0.8;
  }
}

@media (min-height: 830px) and (max-width: 480px) {
  #lower-list {
    margin-top: 160px !important;
  }
}

@media (max-height: 640px) {
  #power-btn {
    margin-left: -10px;
    margin-top: 0px;
  }
  #lower-list {
    padding-top: 10px;
    margin-bottom: 0px;
    padding-bottom: 30px;
  }
}
</style>
