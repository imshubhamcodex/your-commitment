<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Known Faces</h1>
      <v-btn class="action-btn" fab dark x-small color="blue">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn class="action-btn mr-2" fab dark x-small color="blue">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8">
          <v-row v-for="n in 2" :key="n + 'row-connections'" class="mx-auto">
            <v-col v-for="k in 3" :key="k + 'col-connections'">
              <template>
                <v-card
                  v-if="k + (n - 1) * 3 <= person.length"
                  class="mx-auto"
                  max-width="344"
                  outlined
                >
                  <v-list-item three-line>
                    <v-list-item-content>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="green"
                          >mdi-account-tie</v-icon
                        >{{ person[k + (n - 1) * 3 - 1].name }}
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="purple"
                          >mdi-crosshairs-gps</v-icon
                        >
                        {{
                          location_state[
                            person[k + (n - 1) * 3 - 1].location_state_index
                          ]
                        }},
                        {{
                          location_country[
                            person[k + (n - 1) * 3 - 1].location_country_index
                          ]
                        }}
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="red"
                          >mdi-handshake</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].commitments }}
                        Commitments
                      </div>
                      <div class="mb-4 font-shs">
                        <v-icon class="mr-2 mt-n2" color="indigo"
                          >mdi-graph</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].connections }}
                        Connections
                      </div>
                      <div class="font-shs">
                        <v-icon class="mr-2 mt-n2" color="yellow"
                          >mdi-star</v-icon
                        >
                        {{ person[k + (n - 1) * 3 - 1].stars }} Stars
                      </div>
                    </v-list-item-content>

                    <v-avatar color="grey" size="88">
                      <span class="white--text text-h5">{{
                        person[k + (n - 1) * 3 - 1].name
                          .split(" ")[0]
                          .substring(0, 1) +
                        person[k + (n - 1) * 3 - 1].name
                          .split(" ")[1]
                          .substring(0, 1)
                      }}</span>
                    </v-avatar>
                  </v-list-item>

                  <v-btn x-small color="teal" disabled width="100%">
                    <span class="font-shs">
                      Connected on
                      {{
                        new Date(person[k + (n - 1) * 3 - 1].connectedOn)
                          .toString()
                          .substring(0, 15)
                      }}
                    </span>
                  </v-btn>
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
export default {
  data() {
    return {
      person: [],
      connections: [],
      location_state: [
        "Bihar",
        "Haryana",
        "J&K",
        "Karnataka",
        "Kerala",
        "Madhya Pradesh",
        "Maharashtra",
        "Punjab",
        "Rajasthan",
        "Tamil Nadu",
        "Uttar Pradesh",
      ],
      location_country: ["INDIA"],
    };
  },
  mounted() {
    this.connections = this.$store.getters.getPerson[0].allConnections;
    let people = this.$store.getters.getPeople;

    people.forEach((person) => {
      this.connections.forEach((connection) => {
        if (connection.connectedWith === person.id) {
          person.connectedOn = connection.connectedOn;
          this.person.push(person);
        }
      });
    });

    this.connections.forEach((connection) => {});
    console.log(this.connections);
  },
};
</script>

<style></style>
