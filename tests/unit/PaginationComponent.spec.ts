import { mount } from '@vue/test-utils';
import PaginationComponent from '@/components/PaginationComponent.vue';

describe('PaginationComponent', () => {
    it('renders the correct number of visible pages', () => {
        const wrapper = mount(PaginationComponent, {
            propsData: {
                totalPages: 10,
                currentPage: 5,
                maxVisibleButtons: 5,
            },
        });
        const pageButtons = wrapper.findAll('.pagination-button');
        const visiblePageButtons = pageButtons.filter((button) => !isNaN(Number(button.text())));
        expect(visiblePageButtons.length).toBeLessThanOrEqual(5);
    });

    it('disables Prev button on the first page', () => {
        const wrapper = mount(PaginationComponent, {
            propsData: {
                totalPages: 10,
                currentPage: 1,
                maxVisibleButtons: 5,
            },
        });

        const prevButton = wrapper.find('.pagination-button:disabled');
        expect(prevButton.exists()).toBe(true);
        expect(prevButton.text()).toBe('Prev');
    });

    it('disables Next button on the last page', () => {
        const wrapper = mount(PaginationComponent, {
            propsData: {
                totalPages: 10,
                currentPage: 10,
                maxVisibleButtons: 5,
            },
        });

        const nextButton = wrapper.find('.pagination-button:disabled');
        expect(nextButton.exists()).toBe(true);
        expect(nextButton.text()).toBe('Next');
    });
});
