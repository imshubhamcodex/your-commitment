<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Always There For You</h1>
      <template>
        <v-container class="mt-8">
          <div style="max-width: 600px; display: block; margin: auto auto">
            <v-text-field
              class="g-animi-help-card"
              v-model="email"
              label="Your Email"
              outlined
              clearable
              type="email"
            ></v-text-field>
            <br />
            <br id="br2" />
            <v-textarea
              class="g-animi-help-card text-area"
              outlined
              clearable
              label="What's on your mind?"
              v-model="issue"
            ></v-textarea>
            <v-btn
              :disabled="email.trim() == '' || issue.trim() == ''"
              color="blue"
              class="ma-2 white--text g-animi-help-card"
              style="float: right"
              @click="sendIssue"
            >
              SEND
              <v-icon right dark> mdi-send </v-icon>
            </v-btn>
          </div>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
export default {
  data() {
    return {
      email: "",
      issue: "",
    };
  },
  methods: {
    sendIssue() {
      alert("Issue sent");
      this.email = "";
      this.issue = "";
      console.log("issue sent");
    },
  },
  mounted() {
    let inv = setInterval(() => {
      if (document.getElementsByClassName("g-animi-help-card").length > 0) {
        clearInterval(inv);
        gsap.fromTo(
          ".g-animi-help-card",
          {
            duration: 0.7,
            opacity: 0,
            y: 20,
            ease: "back.out",
            stagger: 0.2,
          },
          {
            duration: 0.7,
            opacity: 1,
            y: 0,
            ease: "back.out",
            stagger: 0.2,
          }
        );
      }
    }, 50);
  },
};
</script>

<style scoped>
.g-animi-help-card {
  opacity: 0;
}

@media(max-width:500px) {
  #br2{
    display: none;
  }
}
</style>
