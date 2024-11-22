<template>
    <div class="pagination">
        <button
            class="pagination-button"
            :disabled="currentPage === 1"
            @click="changePage(currentPage - 1)"
        >
            Prev
        </button>

        <button
            v-if="startPage > 1"
            class="pagination-button"
            @click="changePage(1)"
        >
            1
        </button>
        <span v-if="startPage > 2">...</span>

        <button
            v-for="page in visiblePages"
            :key="page"
            @click="changePage(page)"
            class="pagination-button"
            :class="[{ active: currentPage === page }]"
        >
            {{ page }}
        </button>

        <span v-if="endPage < totalPages - 1">...</span>
        <button
            v-if="endPage < totalPages"
            class="pagination-button"
            @click="changePage(totalPages)"
        >
            {{ totalPages }}
        </button>

        <button
            class="pagination-button"
            :disabled="currentPage === totalPages"
            @click="changePage(currentPage + 1)"
        >
            Next
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';

export default defineComponent({
    name: 'PaginationComponent',
    props: {
        totalPages: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
        maxVisibleButtons: {
            type: Number,
            default: 5,
        },
    },
    emits: ['changePage'],
    setup(props, { emit }) {
        const startPage = computed(() =>
            Math.max(1, props.currentPage - Math.floor(props.maxVisibleButtons / 2))
        );

        const endPage = computed(() =>
            Math.min(props.totalPages, startPage.value + props.maxVisibleButtons - 1)
        );

        const visiblePages = computed(() => {
            const pages = [];
            for (let i = startPage.value; i <= endPage.value; i++) {
                pages.push(i);
            }
            return pages;
        });

        const changePage = (page: number) => {
            if (page >= 1 && page <= props.totalPages) {
                emit('changePage', page);
            }
        };

        return {
            startPage,
            endPage,
            visiblePages,
            changePage,
        };
    },
});
</script>

<style scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
}

.pagination-button {
    background-color: #f5f5f5;
    color: #333;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s;
}

.pagination-button:hover {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
}

.pagination-button:disabled {
    background-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
}

.pagination-button.active {
    background-color: #42b983;
    color: #fff;
    border-color: #42b983;
}

span {
    font-size: 1rem;
    color: #999;
}
</style>
