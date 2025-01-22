<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useValidation } from "@/composables/useValidation.js";
import { formatVue3Editor } from "@/Utils/vue3editor";
import { useCustomerData } from "@/stores";
import { VueEditor } from "vue3-editor";
import States from "@/models/states.json";

import DashboardLayout from "@/components/Layouts/DashboardLayout.vue";
import Card from "@/components/Card.vue";
import Table from "@/components/Table.vue";
import Button from "@/components/Button.vue";
import Modal from "@/components/Modal.vue";
import Input from "@/components/Input.vue";
import Select from "@/components/Select.vue";
import Stepper from "../components/Stepper.vue";
import Badge from "../components/Badge.vue";

// Icon Components
import Edit from "@/components/Icons/Edit.vue";
import Delete from "@/components/Icons/Delete.vue";
import People from "@/components/Icons/People.vue";
import Add from "@/components/Icons/Add.vue";

onMounted(() => {
  states.value = States;
});

const {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePhone,
  validateCustomerDetail,
  errors,
} = useValidation();

const {
  editForm,
  addCustomerData,
  deleteCustomerData,
  editCustomer,
  customersData,
} = useCustomerData();

let form = reactive({
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  state: "",
  active: true,
  customerDetail: null,
});

const states = ref([]);
const searchQuery = ref("");

const filteredCustomers = computed(() => {
  const query = searchQuery.value.toLowerCase().trim();
  if (!query) return customersData;
  return customersData?.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query) ||
      user.state.toLowerCase().includes(query)
  );
});

const clearFormData = () => {
  form = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    state: "",
    active: true,
    customerDetail: null,
  };
};

const currentStep = ref(1);
const editIndex = ref("");

const openCustomerForm = () => {
  clearFormData();
  showCreateCustomerForm.value = true;
  currentStep.value = 1;
};

const firstStepErrors = computed(
  () =>
    !!errors.first_name ||
    !!errors.last_name ||
    !!errors.email ||
    !!errors.phone ||
    !form.first_name ||
    !form.last_name ||
    !form.email ||
    !form.phone
);


const showCreateCustomerForm = ref(false);
const showEditCustomerForm = ref(false);

const closeModal = () => {
  showCreateCustomerForm.value = false;
  currentStep.value = 1;
  clearFormData();
};

const closeEditModal = () => {
  showEditCustomerForm.value = false;
  currentStep.value = 1;
  clearFormData();
};

const handleFormSubmission = () => {
  addCustomerData(form);
  showCreateCustomerForm.value = false;
  clearFormData();

};

const editingCustomer = (index) => {
  showEditCustomerForm.value = true;
  currentStep.value = 1;
  editCustomer(index);
  editIndex.value = index;
};

const save = () => {
  if (editIndex.value !== -1) {
    Object.assign(customersData[editIndex.value], editForm);
    Object.assign(editForm, {});
    showEditCustomerForm.value = false;
  }
};

const headers = ref([
  { name: "No", value: "count" },
  { name: "First Name", value: "first_name" },
  { name: "Last Name", value: "last_name" },
  { name: "Email", value: "email" },
  { name: "Phone Number", value: "phone" },
  { name: "Status", value: "active" },
  { name: "Actions", value: "actions" },
]);
</script>
<template>
  <DashboardLayout>
    <div class="container pt-9 w-[90%] mx-auto">
      <div class="lg:flex lg:justify-between">
        <h3 class="text-black/50 text-2xl ms-1">Welcome Back 👋🏽</h3>
        <div class="flex justify-end mt-7 mb-0">
          <Button
            class="flex lg:hidden"
            type="button"
            @click="openCustomerForm"
          >
            <Add class="me-1" /> Add Customer
          </Button>
        </div>
        <Button
          class="hidden lg:inline-flex"
          type="button"
          @click="openCustomerForm"
        >
          <Add class="me-1" /> Add Customer
        </Button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 mt-6 lg:mt-10 gap-3">
        <div>
          <Card color="bg-blue-500 text-white">
            <template #content>
              <div class="relative flex flex-col items-center space-y-2">
                <People class="size-12" />
                <p class="text-xl">{{ customersData?.length }}</p>
                <h3 class="text-base">Total Customers</h3>
              </div>
            </template>
          </Card>
        </div>
        <div>
          <Card color="bg-green-500 text-white">
            <template #content>
              <div class="relative flex flex-col items-center space-y-2">
                <People class="size-12" />
                <p class="text-xl">{{ customersData?.length }}</p>
                <h3 class="text-base">Active Customers</h3>
              </div>
            </template>
          </Card>
        </div>
        <div>
          <Card color="bg-orange-500 text-white">
            <template #content>
              <div class="relative flex flex-col items-center space-y-2">
                <People class="size-12" />
                <p class="text-xl">{{ customersData?.length }}</p>
                <h3 class="text-base">Total Customers in Country</h3>
              </div>
            </template>
          </Card>
        </div>
      </div>

      <div class="mt-9">
        <Table :headers="headers" :items="filteredCustomers">
          <template #search>
            <Input
              id="search"
              class="block rounded-md shadow-sm min-w-full lg:min-w-0 lg:w-[30%] mb-2"
              type="text"
              placeholder="Filter by name, email, phone number"
              v-model="searchQuery"
            />
          </template>
          <template #active="{ item }">
            <span v-if="item.active">
              <Badge :isActive="item.active" />
            </span>
            <span v-else>
              <Badge :isActive="false" />
            </span>
          </template>
          <template #actions="{ index , item}">
            <div class="flex space-x-2">
              <Edit
                class="cursor-pointer"
                @click.prevent="editingCustomer(index)"
              />
              <!-- <View class="cursor-pointer" /> -->
              <Delete
                class="cursor-pointer"
                @click.prevent="deleteCustomerData(item.email)"
              />
            </div>
          </template>
        </Table>
      </div>
    </div>
    <Modal
      :isOpen="showCreateCustomerForm"
      responsive
      :header="true"
      @close="closeModal"
    >
      <template #header> Add Customer </template>
      <template #body>
        <Stepper @form-submitted="handleFormSubmission">
          <template #firstSet>
            <div>
              <Input
                label="First Name"
                id="first_name"
                v-model="form.first_name"
                placeholder="e.g John"
                :validate="() => validateFirstName(form.first_name)"
                :errorMessages="errors.first_name"
              />
            </div>
            <div>
              <Input
                label="Last Name"
                id="last_name"
                placeholder="e.g Joe"
                v-model="form.last_name"
                :validate="() => validateLastName(form.last_name)"
                :errorMessages="errors.last_name"
              />
            </div>
            <div>
              <Input
                label="Email"
                id="email"
                v-model="form.email"
                placeholder="e.g vik@example.com"
                :validate="() => validateEmail(form.email)"
                :errorMessages="errors.email"
              />
            </div>
            <div>
              <Input
                label="Phone Number"
                id="phone"
                v-model="form.phone"
                placeholder="09039443898"
                :validate="() => validatePhone(form.phone)"
                :errorMessages="errors.phone"
              />
            </div>
          </template>
          <template #secondSet>
            <div>
              <Select label="States" :options="states" v-model="form.state" />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">
                Is Customer Active?
              </h3>
              <input
                type="checkbox"
                id="active_status"
                name="active"
                value="Bike"
                v-model="form.active"
                checked
              />
              <label for="vehicle1" class="ms-2">Yes</label><br />
            </div>
            <div class="mt-3">
              <h3 class="block text-sm font-medium text-gray-700 mb-1">
                Customer's Detail
              </h3>
              <VueEditor
                v-model="form.customerDetail"
                @blur="
                  () =>
                    validateCustomerDetail(
                      formatVue3Editor(form.customerDetail)
                    )
                "
              ></VueEditor>
            </div>
          </template>

          <template #actions="{ prevStep, nextStep, currentStep, totalSteps }">
            <div class="flex items-center justify-between">
              <div>
                <Button
                  type="button"
                  v-if="currentStep > 1"
                  @click="prevStep"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Previous
                </Button>
              </div>
              <div class="flex justify-end">
                <Button
                  type="button"
                  v-if="currentStep < totalSteps"
                  :disabled="firstStepErrors"
                  @click="nextStep"
                  variant="primary"
                >
                  Next &raquo;
                </Button>
                <Button
                  type="submit" 
                  v-if="currentStep === totalSteps"
                  variant="primary"
                  :disabled="errors"
                >
                  Submit
                </Button>
              </div>
            </div>
          </template>
        </Stepper>
      </template>
    </Modal>
    <Modal
      :isOpen="showEditCustomerForm"
      responsive
      :header="true"
      @close="closeEditModal"
    >
      <template #header> Edit Customer </template>
      <template #body>
        <Stepper @form-submitted="save">
          <template #firstSet>
            <div>
              <Input
                label="First Name"
                id="first_name"
                v-model="editForm.first_name"
                placeholder="e.g John"
                :validate="() => validateFirstName(editForm.first_name)"
                :errorMessages="errors.first_name"
              />
            </div>
            <div>
              <Input
                label="Last Name"
                id="last_name"
                placeholder="e.g Joe"
                v-model="editForm.last_name"
                :validate="() => validateLastName(editForm.last_name)"
                :errorMessages="errors.last_name"
              />
            </div>
            <div>
              <Input
                label="Email"
                id="email"
                v-model="editForm.email"
                placeholder="e.g vik@example.com"
                :validate="() => validateEmail(editForm.email)"
                :errorMessages="errors.email"
              />
            </div>
            <div>
              <Input
                label="Phone Number"
                id="phone"
                v-model="editForm.phone"
                placeholder="09039443898"
                :validate="() => validatePhone(editForm.phone)"
                :errorMessages="errors.phone"
              />
            </div>
          </template>
          <template #secondSet>
            <div>
              <Select
                label="States"
                :options="states"
                v-model="editForm.state"
              />
            </div>
            <div>
              <h3 class="text-sm font-medium text-gray-700 mb-1">
                Is Customer Active?
              </h3>
              <input
                type="checkbox"
                id="active_status"
                name="active"
                value="Bike"
                v-model="editForm.active"
                checked
              />
              <label for="vehicle1" class="ms-2">Yes</label><br />
            </div>
            <div class="mt-3">
              <h3 class="block text-sm font-medium text-gray-700 mb-1">
                Customer's Detail
              </h3>
              <VueEditor
                v-model="editForm.customerDetail"
                @blur="
                  () =>
                    validateCustomerDetail(
                      formatVue3Editor(editForm.customerDetail)
                    )
                "
              ></VueEditor>
            </div>
          </template>

          <template #actions="{ prevStep, nextStep, currentStep, totalSteps }">
            <div class="flex items-center justify-between">
              <div>
                <Button
                  type="button"
                  v-if="currentStep > 1"
                  @click="prevStep"
                  class="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Previous
                </Button>
              </div>
              <div class="flex justify-end">
                <Button
                  type="button"
                  v-if="currentStep < totalSteps"
                  
                  @click="nextStep"
                  variant="primary"
                >
                  Next &raquo;
                </Button>
                <Button
                  type="submit"
                  
                  v-if="currentStep === totalSteps"
                  variant="primary"
                >
                  Update
                </Button>
              </div>
            </div>
          </template>
        </Stepper>
      </template>
    </Modal>
  </DashboardLayout>
</template>
