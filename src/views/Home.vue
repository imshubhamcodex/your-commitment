<template>
  <div>
    <TopNav />
    <SideNav />
    <Dashboard v-if="true" />
    <Commitments v-if="false" />
    <Connections v-if="false" />
    <Help v-if="false" />
  </div>
</template>

<script>
import UpperNav from "@/components/UpperNav.vue";
import SideNav from "@/components/SideNav.vue";
import Dashboard from "@/components/Dashboard.vue";
import Commitments from "@/components/Commitments.vue";
import Connections from "@/components/Connections.vue";
import Help from "@/components/Help.vue";

export default {
  components: {
    TopNav: UpperNav,
    SideNav: SideNav,
    Dashboard: Dashboard,
    Commitments: Commitments,
    Connections: Connections,
    Help: Help
  },
};
</script>
