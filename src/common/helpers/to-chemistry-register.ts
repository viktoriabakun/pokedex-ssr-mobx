const toChemistryRegister = (value: string) => {
  const result = Array.from(value.toUpperCase()).map((el, i, array) => {
    if (/^[a-z][a-z0-9]*$/i.test(array[i - 1])) {
      return el.replace(/[0-9]/g, `&#832${el};`);
    }

    return el;
  });

  return result.join('');
};

export default toChemistryRegister;
