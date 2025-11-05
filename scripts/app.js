const numberFormatter = new Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const inputs = {
  baseRate: document.querySelector('#base-rate'),
  riskPremium: document.querySelector('#risk-premium'),
  operationalCost: document.querySelector('#operational-cost'),
  targetMargin: document.querySelector('#target-margin'),
};

const outputs = {
  recommendedSpread: document.querySelector('#recommended-spread'),
  currentSpread: document.querySelector('#current-spread'),
  marginDelta: document.querySelector('#margin-delta'),
};

const simulateButton = document.querySelector('#simulate-btn');

function parseInputValue(input) {
  const value = Number.parseFloat(input.value.replace(',', '.'));
  return Number.isFinite(value) ? value : 0;
}

function calculateSpread({ baseRate, riskPremium, operationalCost, targetMargin }) {
  const currentSpread = baseRate + riskPremium + operationalCost;
  const recommendedSpread = currentSpread + targetMargin;
  const marginDelta = recommendedSpread - currentSpread;

  return {
    currentSpread,
    recommendedSpread,
    marginDelta,
  };
}

function renderResults(results) {
  outputs.recommendedSpread.textContent = `${numberFormatter.format(results.recommendedSpread)}%`;
  outputs.currentSpread.textContent = `${numberFormatter.format(results.currentSpread)}%`;
  outputs.marginDelta.textContent = `${numberFormatter.format(results.marginDelta)} p.p.`;
}

function runSimulation() {
  const parameters = {
    baseRate: parseInputValue(inputs.baseRate),
    riskPremium: parseInputValue(inputs.riskPremium),
    operationalCost: parseInputValue(inputs.operationalCost),
    targetMargin: parseInputValue(inputs.targetMargin),
  };

  const results = calculateSpread(parameters);
  renderResults(results);
}

if (simulateButton) {
  simulateButton.addEventListener('click', runSimulation);
}

runSimulation();
