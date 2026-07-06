function calculateDiamond() {
  const shape = document.getElementById("shape").value;
  const carat = parseFloat(document.getElementById("carat").value);
  const color = document.getElementById("color").value;
  const clarity = document.getElementById("clarity").value;
  const result = document.getElementById("result");

  if (!carat || carat <= 0) {
    result.innerHTML = "Please enter a valid carat size.";
    return;
  }

  /*
    Simple approximate natural diamond retail estimator.
    This is not a market quote.
    It uses rough 2026-style retail ranges for natural diamonds
    and adjusts by shape, color, clarity, and carat.
  */

  let basePerCarat;

  if (carat < 0.5) {
    basePerCarat = 1800;
  } else if (carat < 0.75) {
    basePerCarat = 2600;
  } else if (carat < 1.0) {
    basePerCarat = 3800;
  } else if (carat < 1.5) {
    basePerCarat = 6500;
  } else if (carat < 2.0) {
    basePerCarat = 9500;
  } else if (carat < 3.0) {
    basePerCarat = 14500;
  } else if (carat < 5.0) {
    basePerCarat = 24000;
  } else {
    basePerCarat = 38000;
  }

  const shapeMultipliers = {
    round: 1.00,
    oval: 0.85,
    emerald: 0.82,
    pear: 0.84,
    cushion: 0.82,
    princess: 0.80,
    radiant: 0.84,
    marquise: 0.83,
    heart: 0.82
  };

  const colorMultipliers = {
    D: 1.32,
    E: 1.24,
    F: 1.16,
    G: 1.08,
    H: 1.00,
    I: 0.88,
    J: 0.78,
    K: 0.66,
    L: 0.56,
    M: 0.48
  };

  const clarityMultipliers = {
    IF: 1.42,
    VVS1: 1.30,
    VVS2: 1.20,
    VS1: 1.10,
    VS2: 1.00,
    SI1: 0.82,
    SI2: 0.65
  };

  const shapeMultiplier = shapeMultipliers[shape];
  const colorMultiplier = colorMultipliers[color];
  const clarityMultiplier = clarityMultipliers[clarity];

  const estimatedPrice = basePerCarat * carat * shapeMultiplier * colorMultiplier * clarityMultiplier;

  const lowEstimate = estimatedPrice * 0.82;
  const highEstimate = estimatedPrice * 1.18;

  const formatUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const shapeName = shape.charAt(0).toUpperCase() + shape.slice(1);

  result.innerHTML = `
    <strong>Approximate Retail Estimate:</strong><br>
    ${formatUSD.format(lowEstimate)} - ${formatUSD.format(highEstimate)}
    <br><br>
    <strong>Selected Diamond:</strong><br>
    ${carat.toFixed(2)} ct ${shapeName}, ${color} color, ${clarity} clarity
    <br><br>
    <small>
      This is a rough educational estimate only. Actual pricing may vary based on cut, polish, symmetry, fluorescence, certificate, measurements, availability, and current market conditions. Contact Noble Gems International Co.,Ltd for a real sourcing quote.
    </small>
  `;
}
