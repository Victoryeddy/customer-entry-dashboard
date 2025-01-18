import { reactive, watch } from "vue";
export const useValidation = () => {
  let errors = reactive({
    first_name: null,
    last_name: null,
    email: null,
    phone: null,
    customer_details: null,
  });

  watch(errors, (newVal) => {
    errors = newVal;
  });
  const validateFirstName = (name) => {
    if (name.length < 2) {
      errors.first_name = "First name must be at least 2 characters long";
    } else {
      errors.first_name = "";
    }
  };
  const validateLastName = (name) => {
    if (name.length < 2) {
      errors.last_name = "Last name must be at least 2 characters long";
    } else {
      errors.last_name = "";
    }
  };

  const validateEmail = (email) => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Invalid email address";
    } else {
      errors.email = "";
    }
  };

  const validatePhone = (phone) => {
    if (!/^\d{11}$/.test(phone)) {
      errors.phone = "Phone number must be 11 digits";
    } else {
      errors.phone = "";
    }
  };

  const validateCustomerDetail = (details) => {
    if (details.length < 10) {
      errors.customer_details = "Customer Details Too Short";
    } else {
      errors.customer_details = "";
    }
  };

  return {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePhone,
    validateCustomerDetail,
    errors,
  };
};
