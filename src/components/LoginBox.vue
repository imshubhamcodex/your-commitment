<template>
  <div>
    <div id="container">
      <img style="zoom: 0.1" class="g-animi" src="../assets/logo.png" />
      <div id="text-div">
        <v-text-field
          label="Email"
          append-icon="mdi-email-outline"
          color="blue"
          type="email"
          :counter="35"
          v-model="email"
          class="g-animi"
        ></v-text-field>
        <v-text-field
          class="mt-3 g-animi"
          label="Password"
          append-icon="mdi-lock-outline"
          color="blue"
          type="password"
          v-model="password"
          :counter="20"
          @keyup.enter="goForAuth"
        ></v-text-field>

        <p class="g-animi mt-3">Forgot Password ?</p>
      </div>
    </div>

    <div id="container-bottom">
      <v-btn
        :disabled="
          this.email.trim().length < 10 ||
          this.password.trim() === '' ||
          this.password.length < 6 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            ? true
            : false
        "
        class="btns mb-9 g-animi-btn"
        large
        :dark="
          this.email.trim().length < 10 ||
          this.password.trim() === '' ||
          this.password.length < 6 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            ? false
            : true
        "
        color="cyan"
        @click="goForAuth"
        @keyup.enter="goForAuth"
      >
        LOGIN
      </v-btn>
      <v-btn
        outlined
        text
        class="btns mb-15 g-animi-btn"
        large
        color="cyan"
        @click="goToSignup"
      >
        SIGN UP
      </v-btn>
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="250">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="display: none" v-bind="attrs" v-on="on"> </v-btn>
          </template>
          <v-card justify="center" style="height: 50px">
            <v-card-text>
              <div style="text-align: center; display:block;margin:auto auto:">
                <p class="font-h mr-12 mt-3">Authenticating...</p>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import gsap from "gsap";
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
      dialog: false,
    };
  },
  methods: {
    goToSignup() {
      this.$router.push("/signup");
    },
    goForAuth() {
      this.dialog = true;
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          // Success
          await firebase
            .firestore()
            .collection("USERS")
            .get()
            .then((res) => {
              res.docs.forEach(async (doc) => {
                if (doc.data().email === this.email) {
                  this.$store.commit("setUID", doc.data().id);
                  let UID = this.$store.state.UID;
                  await firebase
                    .firestore()
                    .collection("USERS")
                    .get()
                    .then((res) => {
                      res.docs.forEach((doc) => {
                        // console.log(doc.data());
                        this.$store.commit("setPeople", doc.data());
                      });
                    })
                    .catch((error) => {
                      console.log("Error Getting USERS:", error);
                    });

                  await firebase
                    .firestore()
                    .collection("LAST_ACTIVE")
                    .doc(UID)
                    .get()
                    .then((res) => {
                      // console.log(res.data().active);
                      this.$store.commit("setLastActive", res.data().active);
                    })
                    .catch((error) => {
                      console.log("Error Getting LAST_ACTIVE:", error);
                    });

                  await firebase
                    .firestore()
                    .collection("COMMITMENTS")
                    .get()
                    .then((res) => {
                      res.docs.forEach((doc) => {
                        // console.log(doc.data().COMMITMENTS);
                        this.$store.commit(
                          "setCommitment",
                          doc.data().COMMITMENTS
                        );
                      });
                    })
                    .catch((error) => {
                      console.log("Error Getting COMMITMENTS:", error);
                    });

                  await firebase
                    .firestore()
                    .collection("CONNECTIONS")
                    .get()
                    .then((res) => {
                      res.docs.forEach((doc) => {
                        // console.log(doc.data().CONNECTIONS);
                        this.$store.commit(
                          "setConnection",
                          doc.data().CONNECTIONS
                        );
                      });
                    })
                    .catch((error) => {
                      console.log("Error Getting CONNECTIONS:", error);
                    });

                  await firebase
                    .firestore()
                    .collection("CONNECT_REQ")
                    .get()
                    .then((res) => {
                      res.docs.forEach((doc) => {
                        // console.log(doc.data().CONNECT_REQ);
                        this.$store.commit(
                          "setConnectionRequest",
                          doc.data().CONNECT_REQ
                        );
                      });
                    })
                    .catch((error) => {
                      console.log("Error Getting CONNECTIONS_REQUEST:", error);
                    });

                  this.$router.replace("/home");
                  return;
                }
              });
            })
            .catch((error) => {
              alert("User details NOT found: " + error.message);
              this.dialog = false;
              return;
            });
        })
        .catch((error) => {
          console.log(error.code, error.message);
          alert("Error while login into account: " + error.message);
          this.dialog = false;
        });
    },
  },
  mounted() {

    document.documentElement.style.setProperty("overflow", "auto");
    const metaViewport = document.querySelector("meta[name=viewport]");
    metaViewport.setAttribute(
      "content",
      "height=" +
        window.innerHeight +
        "px, width=device-width, initial-scale=1.0"
    );

    gsap.from(".g-animi", {
      duration: 0.7,
      opacity: 0,
      x: -20,
      ease: "back.out",
      stagger: 0.2,
    });
    gsap.fromTo(
      ".g-animi-btn",
      {
        duration: 1,
        opacity: 0,
        x: -20,
        stagger: 0.1,
      },

      {
        duration: 1,
        opacity: 1,
        x: 0,
        stagger: 0.1,
      }
    );
  },
};
</script>

<style scoped>
.g-animi-btn {
  opacity: 0;
}
p {
  float: right;
  color: black;
  cursor: pointer;
}
.btns {
  width: 95%;
}
#text-div {
  padding-top: 40px;
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#container {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40%;
  display: block;
  margin: 0 auto;
  text-align: center;
}
#container-bottom {
  position: absolute;
  margin-left: 30%;
  bottom: 0;
  width: 40%;
  display: block;
  text-align: center;
  padding-bottom: 50px;
}
@media (max-width: 480px) {
  #container {
    width: 70%;
  }
  #container-bottom {
    width: 70%;
    margin-left: 15%;
  }
}
</style>
