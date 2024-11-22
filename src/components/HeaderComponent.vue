<template>
  <header>
    <div class="header-container">
        <h1 class="text-xl">My Application</h1>
        <SidebarComponent />
    </div>
  </header>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";
import SidebarComponent from "@/components/sidebar/SidebarComponent.vue";

export default defineComponent({
    name: 'DefaultLayout',
    components: {
        SidebarComponent
    },
});
</script>

<style scoped>
.header-container {
    display: flex;
    justify-content: space-between;
}
</style>