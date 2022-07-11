<template>
  <v-card id="card">
    <v-list class="mb-12 mt-2">
      <v-list-item class="mt-n2">
        <img
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
        class="mt-4"
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
    </v-list>

    <v-list nav dense id="lower-list">
      <v-list-item id="power-btn">
        <v-btn fab dark small color="cyan">
          <v-icon dark> mdi-power </v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
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
  margin-top: 20px;
}
#card {
  width: 15%;
  height: 100vh;
  float: left;
}
#lower-list {
  margin-top: 120px;
}
</style>
