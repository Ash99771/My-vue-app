module.exports = {
    e2e: {
        specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
        setupNodeEvents(on, config) {
            return config;
        },
        baseUrl: 'http://localhost:8083',
        supportFile: false,
    },
};
