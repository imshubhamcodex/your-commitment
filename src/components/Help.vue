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
            ></v-text-field>
            <br />
            <br />
            <v-textarea
              outlined
              clearable
              label="What's on your mind?"
              v-model="issue"
            ></v-textarea>
            <v-btn color="blue" class="ma-2 white--text" style="float: right">
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
};
</script>

<style></style>
