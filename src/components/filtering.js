export function initFiltering(elements, indexes) {
  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map((name) => {
          const el = document.createElement("option");
          el.textContent = name;
          el.value = name;
          return el;
        })
      );
    });
  };

  const applyFiltering = (query, state, action) => {
    if (action?.name === "clear") {
      const filterWrapper = action.closest(".filter-wrapper");
      const input = filterWrapper?.querySelector("select, input");
      if (input) {
        input.value = "";
        const field = input.name;
        if (field) {
          state[field] = "";
        }
      }
    }

    const filter = {};
    Object.keys(elements).forEach((key) => {
      if (elements[key]) {
        if (
          ["INPUT", "SELECT"].includes(elements[key].tagName) &&
          elements[key].value
        ) {
          filter[`filter[${elements[key].name}]`] = elements[key].value; 
        }
      }
    });

    return Object.keys(filter).length
      ? Object.assign({}, query, filter)
      : query;
  };
  
  return {
    updateIndexes,
    applyFiltering,
  };
}