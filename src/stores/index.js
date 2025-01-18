import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCustomerData = defineStore("customerData", () => {
  const customersData = reactive(JSON.parse(localStorage.getItem("customersData")) || []);


  const editForm = reactive({})
  const editMode = ref(false)


  const addCustomerData = (form) => {
    customersData.push(form);
    localStorage.setItem("customersData", JSON.stringify(customersData));
 
  };

  function editCustomer(selectedIndex) {
    const user = customersData.find((u, index) => selectedIndex === index);
    if (user) {
      Object.assign(editForm, user);
    }
  }
  const deleteCustomerData = (selectedIndex) => {
    const index = customersData.find((u, index) => u.email === selectedIndex);
    if (index !== -1) {
      customersData.splice(index, 1);
      localStorage.setItem("customersData", JSON.stringify(customersData))
    }
  };

  return {
    editMode,
    editForm,
    customersData,
    addCustomerData,
    editCustomer,
    deleteCustomerData,
  };
});
