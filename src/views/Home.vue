<template>
  <div>
    <TopNav />
    <SideNav />
  </div>
</template>

<script>
import UpperNav from "@/components/UpperNav.vue";
import SideNav from "@/components/SideNav.vue";

export default {
  components: {
    TopNav: UpperNav,
    SideNav: SideNav,
  },
};
</script>
