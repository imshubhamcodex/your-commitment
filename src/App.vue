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
  mounted() {
    // this.$vuetify.theme.dark = false;
    // console.log(this.$vuetify.theme.dark);
    // const UID = (Math.random() + 1).toString(36).substring(7);
    // let UID = "f4snii";
    // firebase
    //   .firestore()
    //   .collection("USERS")
    //   .doc(UID)
    //   .set({
    //     id: UID,
    //     name: "Saket Kumar",
    //     state_index: 2,
    //     country_index: 0,
    //     image_id: null,
    //     allCommitments: [],
    //     allConnections: [],
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
    //         stars:['too4c'],
    //         seen: ['too4c'],
    //         replicated: ['too4c'],
    //         shared: ['too4c'],
    //         id: UID,
    //         commitment_id: (Math.random() + 1).toString(36).substring(7),
    //       },
    //       {
    //         title: "Commitment 2",
    //         description: "Commitment 2 Description",
    //         upadatedOn: Date.now(),
    //         stars:[],
    //         seen: [],
    //         replicated: [],
    //         shared: [],
    //         id: UID,
    //         commitment_id: (Math.random() + 1).toString(36).substring(7),
    //       }
    //     ],
    //   },{merge: true})
    //   .catch((error) => {
    //     console.log("Error Saving Commitment:", error);
    //   });

    // // firebase
    // //   .firestore()
    // //   .collection("CONNECTIONS")
    // //   .doc(UID)
    // //   .set({
    // //     CONNECTIONS: [
    // //       {
    // //         connectedOn: Date.now(),
    // //         connectedWith: "Conneted UID",
    // //         id: "UID",
    // //       },
    // //     ],
    // //   })
    // //   .catch((error) => {
    // //     console.log("Error Saving Connections:", error);
    // //   },{merge: true});

    // // firebase
    // //   .firestore()
    // //   .collection("SUPPORT")
    // //   .doc(UID)
    // //   .set({
    // //     SUPPORT: [
    // //       {
    // //         createdOn: Date.now(),
    // //         useremail: "edwssm@gmail.com",
    // //         message: "This is a message",
    // //         uid: "UID",
    // //       },
    // //     ],
    // //   })
    // //   .catch((error) => {
    // //     console.log("Error Saving Connections:", error);
    // //   });

    let UID = "f4snii";
    firebase
      .firestore()
      .collection("USERS")
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          console.log(doc.data());
          this.$store.commit("setPeople", doc.data());
        });
      })
      .catch((error) => {
        console.log("Error Getting USERS:", error);
      });

    firebase
      .firestore()
      .collection("COMMITMENTS")
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          console.log(doc.data().COMMITMENTS);
          this.$store.commit("setCommitment", doc.data().COMMITMENTS);
        });
      })
      .catch((error) => {
        console.log("Error Getting COMMITMENTS:", error);
      });

    firebase
      .firestore()
      .collection("CONNECTIONS")
      .get()
      .then((res) => {
        res.docs.forEach((doc) => {
          console.log(doc.data().CONNECTIONS);
          this.$store.commit("setConnection", doc.data().CONNECTIONS);
        });
      })
      .catch((error) => {
        console.log("Error Getting CONNECTIONS:", error);
      });
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
</style>
