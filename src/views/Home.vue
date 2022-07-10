<template>
  <div>
    <TopNav />
    <SideNav />
    <Dashboard />
  </div>
</template>

<script>
import UpperNav from "@/components/UpperNav.vue";
import SideNav from "@/components/SideNav.vue";
import Dashboard from "@/components/Dashboard.vue";

export default {
  components: {
    TopNav: UpperNav,
    SideNav: SideNav,
    Dashboard: Dashboard,
  },
};
</script>
