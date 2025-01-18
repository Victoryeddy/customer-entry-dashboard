import { reactive, computed, ref } from "vue";
import { defineStore } from "pinia";

export const useCustomerData = defineStore("customerData", () => {
  const customersData = reactive([]);

  const form = reactive({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    state: "",
    active: true,
    customerDetail: null,
  });

  const editForm = reactive({})
  const editMode = ref(false)


  const addCustomerData = (form) => {
    customersData.push(form);
 
  };

  function editCustomer(selectedIndex) {
    console.log(selectedIndex)
    const user = customersData.find((u, index) => selectedIndex === index);
    if (user) {
      Object.assign(editForm, user);
    }
  }
  const deleteCustomerData = (selectedIndex) => {
    const index = customersData.find((u, index) => index === selectedIndex);
    if (index !== -1) {
      customersData.splice(index, 1);
    }
  };

  return {
    editMode,
    editForm,
    form,
    customersData,
    addCustomerData,
    editCustomer,
    deleteCustomerData,
  };
});
