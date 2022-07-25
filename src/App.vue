<template>
  <div id="app">
    <v-app>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  created() {
    // this.$vuetify.theme.dark = false;
    // console.log(this.$vuetify.theme.dark);
    // const UID = (Math.random() + 1).toString(36).substring(7);
    // let UID = "too4c";
    // firebase
    //   .firestore()
    //   .collection("USERS")
    //   .doc(UID)
    //   .set({
    //     id: UID,
    //     name: "Vikash Kumar",
    //     state_index: 7,
    //     country_index: 0,
    //     image_id: null,
    //     allCommitments: [],
    //     allConnections: [],
    //     connectRequestSend: [],
    //     connectRequestRecived: [],
    //     email:"edwssm777@gmail.com"
    //   })
    //   .catch((error) => {
    //     console.log("Error Saving user:", error);
    //   });
    // firebase
    //   .firestore()
    //   .collection("COMMITMENTS")
    //   .doc(UID)
    //   .set({
    //     COMMITMENTS: [
    //       {
    //         title: "Commitment 1",
    //         description: "Commitment 1 Description",
    //         upadatedOn: Date.now(),
    //         stars: [],
    //         seen: [],
    //         replicated: [],
    //         shared: [],
    //         id: UID,
    //         commitment_id: (Math.random() + 1).toString(36).substring(7),
    //       },
    //       {
    //         title: "Commitment 2",
    //         description: "Commitment 2 Description",
    //         upadatedOn: Date.now(),
    //         stars: [],
    //         seen: [],
    //         replicated: [],
    //         shared: [],
    //         id: UID,
    //         commitment_id: (Math.random() + 1).toString(36).substring(7),
    //       },
    //     ],
    //   })
    //   .catch((error) => {
    //     console.log("Error Saving Commitment:", error);
    //   });
    // firebase
    //   .firestore()
    //   .collection("CONNECTIONS")
    //   .doc(UID)
    //   .set({
    //     CONNECTIONS: [
    //       {
    //         connectedOn: Date.now(),
    //         connectedWith: ["too4c"],
    //         id: UID,
    //       },
    //       {
    //         connectedOn: Date.now(),
    //         connectedWith: ["9rzi3l"],
    //         id: UID,
    //       },
    //     ],
    //   })
    //   .catch((error) => {
    //     console.log("Error Saving Connections:", error);
    //   });
    // firebase
    //   .firestore()
    //   .collection("CONNECT_REQ")
    //   .doc("CONNECT_REQ")
    //   .set({
    //     CONNECT_REQ: [
    //       {
    //         from: UID,
    //         to: "too4c",
    //       },
    //     ],
    //   })
    //   .catch((error) => {
    //     console.log("Error Sending Connect Request:", error);
    //   });
    // firebase
    //   .firestore()
    //   .collection("SUPPORT")
    //   .doc(UID)
    //   .set({
    //     SUPPORT: [
    //       {
    //         createdOn: Date.now(),
    //         useremail: "edwssm@gmail.com",
    //         message: "This is a message",
    //         uid: "UID",
    //       },
    //     ],
    //   })
    //   .catch((error) => {
    //     console.log("Error Saving Connections:", error);
    //   });
    // firebase
    //   .firestore()
    //   .collection("LAST_ACTIVE")
    //   .doc(UID)
    //   .set(
    //     {
    //       active: Date.now(),
    //     },
    //     { merge: true }
    //   )
    //   .catch((error) => {
    //     console.log("Error Saving LAST ACTIVE:", error);
    //   });
  },
  watch: {
    "$store.state.allCommitments": function () {
      if (!this.$store.state.UID) return;

      let peep = this.$store.getters.getPerson[0];
      let commintments = peep.allCommitments;
      firebase
        .firestore()
        .collection("COMMITMENTS")
        .doc(peep.id)
        .set(
          {
            COMMITMENTS: commintments,
          },
          { merge: true }
        )
        .catch((error) => {
          console.log("Error Saving Commitment:", error);
        });
    },
    "$store.state.allConnections": function () {
      if (!this.$store.state.UID) return;

      let allConnections = this.$store.state.allConnections;
      allConnections.forEach((connection) => {
        let ID = connection[connection.length - 1];
        let con =
          connection.length > 1
            ? connection.slice(0, connection.length - 1)
            : [];
        firebase
          .firestore()
          .collection("CONNECTIONS")
          .doc(ID)
          .set(
            {
              CONNECTIONS: con,
            },
            { merge: true }
          )
          .catch((error) => {
            console.log("Error Saving Connections:", error);
          });
        console.log(connection);
      });
    },
    "$store.state.allConnectRequest": function () {
      if (!this.$store.state.UID) return;

      let allConnectRequest = this.$store.state.allConnectRequest;
      allConnectRequest.forEach((conn) => {
        let ID = conn[conn.length - 1];
        let connReq = conn.length > 1 ? conn.slice(0, conn.length - 1) : [];
        firebase
          .firestore()
          .collection("CONNECT_REQ")
          .doc(ID)
          .set(
            {
              CONNECT_REQ: connReq,
            },
            { merge: true }
          )
          .catch((error) => {
            console.log("Error Sending Connect Request:", error);
          });
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Dosis", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
div.v-carousel__controls{
  zoom:0;
  opacity: 0;
  z-index: -99;
}
.content-div {
  width: 85%;
  float: right;
}
.action-btn {
  float: right;
  margin-top: -50px;
  margin-right: 60px;
}
.font-h-big {
  font-size: 50px;
  font-weight: 700;
  font-family: "Dosis", sans-serif;
}
.font-h {
  font-size: 18px;
  font-weight: 700;
  font-family: "Dosis", sans-serif;
}
.font-sh {
  font-size: 18px;
  font-weight: 600;
  font-family: "Dosis", sans-serif;
}
.font-shs {
  font-size: 15px;
  font-weight: 600;
  font-family: "Dosis", sans-serif;
}

@media (max-width: 500px) {
  .font-h-big {
    font-size: 30px;
  }
}
</style>
