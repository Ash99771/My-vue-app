<template>
    <div class="loader" v-if="loading">
        <div class="spinner"></div>
        <p class="loader-text">{{ text }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'LoaderComponent',
    props: {
        loading: {
            type: Boolean,
            required: true,
        },
        text: {
            type: String,
            default: 'Loading...',
        },
    },
});
</script>

<style scoped>
.loader {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #42b983;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loader-text {
    margin-top: 16px;
    font-size: 1rem;
    color: #333;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
