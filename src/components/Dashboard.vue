<template>
  <div style="width: 85%; float: right; overflow: auto">
    <div class="mt-2 ml-7 mr-7">
      <h1 class="font-h-big">Let's Catch Up,</h1>
      <v-btn
        style="float: right; margin-top: -50px; margin-right: 60px"
        fab
        dark
        x-small
        color="blue"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn
        style="float: right; margin-top: -50px"
        fab
        dark
        x-small
        color="blue"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8">
          <v-row v-for="n in 2" :key="n" class="mx-auto">
            <v-col v-for="k in 3" :key="k">
              <template>
                <v-card class="mx-auto" max-width="344" outlined>
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="green"
                          >mdi-account-tie</v-icon
                        >Shubham Kumar
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="purple"
                          >mdi-crosshairs-gps</v-icon
                        >
                        Mumbai, India
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="red"
                          >mdi-handshake</v-icon
                        >
                        3 Commitments
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="indigo"
                          >mdi-graph</v-icon
                        >
                        5 Connections
                      </div>
                      <div class=" font-shs">
                        <v-icon class="mr-2 mt-n2" color="yellow"
                          >mdi-star</v-icon
                        >
                        30 Stars
                      </div>
                    </v-list-item-content>

                    <v-avatar color="grey" size="88">
                      <span class="white--text text-h5">SK</span>
                    </v-avatar>
                  </v-list-item>
                </v-card>
              </template>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
