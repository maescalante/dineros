export const convertFromTo = (rates, value, base) => {
  if (base === 0) {
    const newValue = value / rates.CZK;
    return eurToAll(rates, newValue);
  } else if (base === 1) {
    const newValue = value / rates["COP"];
    return eurToAll(rates, newValue);
  } else if (base === 2) {
    const newValue = value;
    return eurToAll(rates, newValue);
  } else {
    const newValue = value / rates["USD"];
    console.log(newValue);
    return eurToAll(rates, newValue);
  }
};

export const eurToAll = (rates, value) => {
  return [
    rates["CZK"] * value,
    rates["COP"] * value,
    value,
    rates["USD"] * value,
  ];
};
