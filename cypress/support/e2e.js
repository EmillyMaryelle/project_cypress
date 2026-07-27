import './commands';

function normalize(value) {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .toLowerCase();
}

function buildTestStepPath(currentTest, step) {
  const titlePath =
    currentTest && typeof currentTest.titlePath === 'function'
      ? currentTest.titlePath()
      : ['teste'];

  return ['fluxos', ...titlePath.map(normalize), normalize(step)].join('/');
}

beforeEach(function () {
  cy.clearAppState();
  cy.screenshot(buildTestStepPath(this.currentTest, 'Ini_Fluxo'), {
    capture: 'viewport',
  });
});

afterEach(function () {
  cy.screenshot(buildTestStepPath(this.currentTest, 'Fim_Fluxo'), {
    capture: 'viewport',
  });
});
