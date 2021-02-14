import { ref, computed, watch } from "vue";

export default function userSearch(items, searchProp) {
  // data
  const enteredSearchTerm = ref("");
  const activeSearchTerm = ref("");

  const availableItems = computed(() => {
    let filteredItems = [];
    if (activeSearchTerm.value) {
      filteredItems = items.value.filter((item) =>
        item[searchProp]
          .toLowerCase()
          .includes(activeSearchTerm.value.toLowerCase())
      );
    } else if (items.value) {
      filteredItems = items.value;
    }
    return filteredItems;
  });

  watch(enteredSearchTerm, (newVal) => {
    setTimeout(() => {
      if (newVal === enteredSearchTerm.value) {
        activeSearchTerm.value = newVal;
      }
    }, 300);
  });

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
  };
}
