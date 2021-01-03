const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data);

const attributesToString = (obj = {}) => {
  const keys = Object.keys(obj);
  const attrs = [];
  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i];
    attrs.push(`${attr}="${obj[attr]}"`);
  }

  const string = attrs.join("");
  return string;
};

const tagAttributes = obj => (content = "") =>
  `<${obj.tag} ${obj.attrs ? " " : ""}${attributesToString(
    obj.attrs
  )}>${content}</${obj.tag}>`;

const tag = t => {
  if (typeof t === "string") {
    tagAttributes({ tag: t });
  } else {
    tagAttributes(t);
  }
};

const tableRowTag = tag("tr");
const tableRow = item => compose(tableRowTag, tableCells)(items);

const tableCell = tag("td");
const tableCells = item => item.map(tableCell).join("");

let description = $("#description");
let calories = $("#calories");
let carbs = $("#carbs");
let protein = $("#protein");

let list = [];

description.keypress(() => {
  description.removeClass("is-invalid");
});

calories.keypress(() => {
  calories.removeClass("is-invalid");
});

carbs.keypress(() => {
  carbs.removeClass("is-invalid");
});

protein.keypress(() => {
  protein.removeClass("is-invalid");
});

const validateInputs = () => {
  description.val() ? "" : description.addClass("is-invalid");
  calories.val() ? "" : calories.addClass("is-invalid");
  carbs.val() ? "" : carbs.addClass("is-invalid");
  protein.val() ? "" : protein.addClass("is-invalid");

  if (description.val() && calories.val() && carbs.val() && protein.val()) {
    add();
    cleanInputs();
  }
};

const add = () => {
  const newItem = {
    description: description.val(),
    calories: parseInt(calories.val()),
    carbs: parseInt(carbs.val()),
    protein: parseInt(protein.val())
  };

  list.push(newItem);
  console.log(list);
};

const cleanInputs = () => {
  description.val("");
  calories.val("");
  carbs.val("");
  protein.val("");
};
