<template>
  <v-card id="card">
    <v-list class="mb-8 mt-1">
      <v-list-item class="mt-n2">
        <img src="../assets/logo.png" style="height:100px;margin:auto auto; text-align:center;transform:rotate(-2deg)" />
      </v-list-item>
    </v-list>

    <v-list nav dense>
      <v-list-item  link class="mt-4">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Dashboard</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item link class="mt-4">
        <v-list-item-icon>
          <v-icon>mdi-handshake</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Commitments</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item link class="mt-4">
        <v-list-item-icon>
          <v-icon>mdi-graph</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Connections</span></v-list-item-title
        >
      </v-list-item>
      <v-list-item link class="mt-4">
        <v-list-item-icon>
          <v-icon>mdi-calendar-month</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs">Calendar</span></v-list-item-title
        >
      </v-list-item>
    </v-list>

    <v-list nav dense id="lower-list">
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-help-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-title class="ml-n5"
          ><span class="font-shs black--text">Help</span></v-list-item-title
        >
      </v-list-item>

      <v-list-item id="power-btn">
        <v-btn fab dark small color="cyan">
          <v-icon dark> mdi-power </v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {};
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
