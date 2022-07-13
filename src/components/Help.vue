<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Always There For You</h1>
      <template>
        <v-container class="mt-8">
          <div style="max-width: 600px; display: block; margin: auto auto">
            <v-text-field
              v-model="email"
              label="Your Email"
              outlined
              clearable
              type="email"
            ></v-text-field>
            <br />
            <br />
            <v-textarea
              outlined
              clearable
              label="What's on your mind?"
              v-model="issue"
            ></v-textarea>
            <v-btn
              :disabled="email.trim() == '' || issue.trim() == ''"
              color="blue"
              class="ma-2 white--text"
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
};
</script>

<style></style>
