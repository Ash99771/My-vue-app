<template>
    <div class="layout">
        <header-component />

        <div class="content">
            <div class="main-content">
                <router-view />
            </div>
        </div>

        <footer-component />
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import FooterComponent from "@/components/FooterComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
    name: 'DefaultLayout',
    components: {
        FooterComponent,
        HeaderComponent,
    },
});
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    padding: 0 16px;
}

.content {
    display: flex;
    flex: 1;
}

.main-content {
    width: 1000%;
    padding: 1rem;
    overflow: auto;
}
</style>
