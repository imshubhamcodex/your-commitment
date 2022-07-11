<template>
  <div class="content-div">
    <div class="mt-2 ml-3 mr-3">
      <h1 class="font-h-big">Unbreakable Promises</h1>
      <v-btn color="blue" class="white--text action-btn mr-0">
        New Commitment
        <v-icon right dark> mdi-plus-circle </v-icon>
      </v-btn>
      <template>
        <v-container class="mt-8" style="height: 70vh; overflow: auto">
          <template>
            <v-expansion-panels focusable>
              <v-expansion-panel
                class="mt-3"
                v-for="(item, i) in commitments"
                :key="i + 'commintments'"
              >
                <v-card class="mx-auto mr-5" color="cyan" dark width="100%">
                  <v-card-actions>
                    <v-list-item class="grow">
                      <v-icon>mdi-link</v-icon>

                      <v-list-item-content>
                        <v-list-item-title class="ml-4">
                          <span style="font-size: 18px; font-weight: bold">{{
                            item.title
                          }}</span>
                        </v-list-item-title>
                      </v-list-item-content>

                      <v-row align="center" justify="end">
                        <v-btn icon class="mr-10"
                          ><v-icon> mdi-lead-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mr-1" icon
                          ><v-icon> mdi-delete </v-icon></v-btn
                        >
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                </v-card>
                <v-expansion-panel-header>
                  <span>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="item.stars"
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-star</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="item.seen"
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-eye</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="item.replicated"
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-book-plus-multiple</v-icon>
                    </v-badge>
                    <v-badge
                      class="mr-4"
                      color="blue"
                      :content="item.shared"
                      overlap
                      bordered
                    >
                      <v-icon color="teal">mdi-share-variant</v-icon>
                    </v-badge>
                  </span>
                  <span> Updated on 
                    {{ new Date(item.upadatedOn).toString().substring(0, 15) }}
                  </span>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  {{ item.description }}
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </template>
        </v-container>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commitments: [],
      person: {},
    };
  },
  mounted() {
    this.person = this.$store.getters.getPerson[0];
    this.commitments = this.person.allCommitments;
  },
};
</script>

<style></style>
