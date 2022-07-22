<template>
  <div>
    <div id="container">
      <img style="zoom: 0.1" class="g-animi" src="../assets/logo.png" />
      <br />
      <p class="mt-4">
        {{ currentSlide === 0 ? "Enter your details" : "Enter your password" }}
      </p>
    </div>

    <template>
      <v-carousel
        height="450"
        :show-arrows="false"
        hide-delimiter-background
        id="container-slides"
      >
        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div id="text-div">
                <v-text-field
                  label="First Name"
                  append-icon="mdi-account-outline"
                  color="blue"
                  type="text"
                  :counter="20"
                  v-model="fname"
                ></v-text-field>
                <v-text-field
                  label="Last Name"
                  append-icon="mdi-account-outline"
                  color="blue"
                  type="text"
                  :counter="20"
                  v-model="lname"
                ></v-text-field>
                <v-text-field
                  label="Email"
                  append-icon="mdi-email-outline"
                  color="blue"
                  type="email"
                  :counter="35"
                  v-model="email"
                ></v-text-field>
                <v-row align="center">
                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                      v-model="country_index"
                      :items="country"
                      label="Your Country"
                    ></v-select>
                  </v-col>

                  <v-col class="d-flex" cols="12" sm="6">
                    <v-select
                      v-model="state_index"
                      :items="states"
                      label="Your State"
                    ></v-select>
                  </v-col>
                </v-row>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div id="text-div">
                <v-avatar
                  @click="setUserImag"
                  class="mb-0"
                  color="blue"
                  size="100"
                  style="cursor: pointer"
                >
                  <img v-if="imgURL !== null" :src="imgURL" />
                  <span v-else class="white--text text-h5">{{
                    this.fname.substring(0, 1).toUpperCase() +
                    this.lname.substring(0, 1).toUpperCase()
                  }}</span>
                </v-avatar>
                <v-file-input
                  id="file-upload"
                  hide-input
                  show-size
                  accept="image/png"
                  truncate-length="1"
                  v-model="imgFile"
                  style="opacity: 0; zoom: 0"
                ></v-file-input>
                <v-text-field
                  label="Password"
                  append-icon="mdi-lock-outline"
                  color="blue"
                  type="password"
                  :counter="20"
                  v-model="password"
                ></v-text-field>
                <v-text-field
                  class="mt-3"
                  label="Confirm Password"
                  append-icon="mdi-lock-outline"
                  color="blue"
                  type="password"
                  :counter="20"
                  v-model="confirmPassword"
                ></v-text-field>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet height="100%">
            <v-row class="fill-height" align="center" justify="center"> </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </template>

    <div id="container-bottom">
      <v-btn
        @click="nextSlide"
        class="btns mb-7"
        large
        :dark="!btnDisabled()"
        color="blue"
        :disabled="btnDisabled()"
      >
        {{ currentSlide === 0 ? "NEXT" : "CREATE ACCOUNT" }}
      </v-btn>
      <v-btn
        @click="previousSlide"
        class="btns mb-7"
        large
        :dark="!this.currentSlide == 0"
        color="blue"
        :disabled="this.currentSlide == 0"
        outlined
      >
        BACK
      </v-btn>
    </div>

    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="370">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="display: none" v-bind="attrs" v-on="on"> </v-btn>
          </template>
          <v-card v-if="!wait" justify="center">
            <v-card-text class="pt-4">
              <div style="text-align: center; display:block;margin:auto auto:">
                <p class="font-h mt-3">Account Created!</p>
              </div>
              <v-btn
                @click="goToLogin"
                color="blue"
                dark
                style="display: block; margin: 5px auto; width: 100%"
              >
                login
              </v-btn>
            </v-card-text>
          </v-card>

          <v-card v-if="wait" justify="center">
            <v-card-text>
              <div style="text-align: center">
                <p class="font-h pt-7">Account creating...</p>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      currentSlide: 0,
      fname: "",
      lname: "",
      email: "",
      confirmPassword: "",
      password: "",
      dialog: false,
      wait: true,
      once: false,
      states: [
        "Andhra",
        "Arunachal",
        "Assam",
        "Bihar",
        "Chhattisgarh",
        "Goa",
        "Gujarat",
        "Haryana",
        "Himachal",
        "J & K",
        "Jharkhand",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Manipur",
        "Meghalaya",
        "Mizoram",
        "Nagaland",
        "Odisha",
        "Punjab",
        "Rajasthan",
        "Sikkim",
        "Tamil Nadu",
        "Telangana",
        "Tripura",
        "Uttarakhand",
        "Uttar Pradesh",
        "West Bengal",
        "Andaman",
        "Chandigarh",
        "Dadra Nagar Haveli",
        "Daman & Diu",
        "Delhi",
        "Lakshadweep",
        "Puducherry",
      ],
      country: ["India"],
      state_index: null,
      country_index: null,
      image_id: null,
      imgFile: null,
      id: (Math.random() + 1).toString(36).substring(2),
      imgURL: null,
    };
  },
  methods: {
    setUserImag() {
      document.getElementById("file-upload").click();
    },
    goToLogin() {
      this.dialog = false;
      this.$router.push("/login");
    },
    createAccount() {
      this.dialog = true;
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(async () => {
          if (this.imgFile !== null) {
            let pathReference = firebase
              .storage()
              .ref()
              .child("images/" + this.id + ".png");
            await pathReference.put(this.imgFile).then(async () => {
              await pathReference.getDownloadURL().then((url) => {
                this.image_id = url;
                console.log(url);
              });
            });
          }

          await firebase
            .firestore()
            .collection("USERS")
            .doc(this.id)
            .set({
              id: this.id,
              name:
                this.fname.toUpperCase().substring(0, 1) +
                this.fname.substring(1, this.fname.length) +
                " " +
                this.lname.toUpperCase().substring(0, 1) +
                this.lname.substring(1, this.lname.length),
              state_index: this.states.indexOf(this.state_index),
              country_index: this.country.indexOf(this.country_index),
              image_id: this.image_id,
              allCommitments: [],
              allConnections: [],
              connectRequestSend: [],
              connectRequestRecived: [],
              email: this.email,
            })
            .catch((error) => {
              console.log("Error Saving user:", error);
              alert("Error while saving user data: " + error.message);
              return;
            });

          await firebase
            .firestore()
            .collection("LAST_ACTIVE")
            .doc(this.id)
            .set(
              {
                active: Date.now(),
              },
              { merge: true }
            )
            .catch((error) => {
              console.log("Error Saving LAST ACTIVE:", error);
              return;
            });

          this.wait = false;
        })
        .catch((error) => {
          this.dialog = false;
          console.log(error.code, error.message);
          alert("Error while creating account: " + error.message);
          return;
        });
    },
    nextSlide() {
      if (this.currentSlide < 1) {
        this.currentSlide = 1;
        document.getElementsByTagName("button")[this.once ? 2 : 1].click();
      } else {
        this.createAccount();
      }
    },
    previousSlide() {
      this.currentSlide = 0;
      document.getElementsByTagName("button")[1].click();
      this.once = true;
    },
    btnDisabled() {
      if (this.currentSlide === 0) {
        return (
          this.fname.trim().length < 3 ||
          this.lname.trim().length < 3 ||
          this.email.trim().length < 10 ||
          !/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.email) ||
          this.state_index === null ||
          this.country_index === null
        );
      } else if (this.currentSlide === 1) {
        return (
          this.password.trim().length < 6 ||
          this.confirmPassword.trim().length < 6 ||
          this.password !== this.confirmPassword
        );
      } else {
        return false;
      }
    },
  },
  watch: {
    imgFile: function () {
      this.imgURL = window.URL.createObjectURL(this.imgFile);
    },
  },
};
</script>

<style scoped>
.btns {
  width: 95%;
}
#text-div {
  margin-top: -40px;
  width: 85%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
#container-slides {
  position: absolute;
  top: 18%;
  width: 40%;
  display: block;
  margin: 0 auto;
  text-align: center;
  margin-left: 30%;
  z-index: 99;
}

#container {
  position: absolute;
  top: 15%;
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
  bottom: 20px;
  width: 40%;
  display: block;
  text-align: center;
  z-index: 99;
  zoom: 0.9;
}

@media (max-width: 480px) {
  #container {
    width: 70%;
  }
  #container-slides {
    width: 70%;
    margin-left: 15%;
  }
  #container-bottom {
    width: 70%;
    margin-left: 15%;
  }
}
</style>
