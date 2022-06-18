<template lang="">
    <div>
        <div class="row d-flex justify-content-center">
            <div class="col-md-10">
                <form @submit.prevent="submit()">
                    <div
                        v-for="(employee, index) in employees"
                        :key="index"
                        class="row mb-4"
                    >
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="name" class="form-label text-white"
                                    >Name</label
                                >
                                <input
                                    v-model="employee.name"
                                    type="text"
                                    name="name[]"
                                    class="form-control"
                                    id="name"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="mb-3">
                                <label for="email" class="form-label text-white"
                                    >Email address</label
                                >
                                <input
                                    v-model="employee.email"
                                    type="email"
                                    name="email[]"
                                    class="form-control"
                                    id="email"
                                    aria-describedby="emailHelp"
                                />
                            </div>
                        </div>
                        <div
                            class="col-md-4 text-white d-flex align-items-center"
                        >
                            <span>
                                <i
                                    v-if="employees.length > 1"
                                    class="fas fa-minus-circle me-3"
                                    style="cursor: pointer"
                                    @click="remove(index)"
                                    >Remove</i
                                >
                                <i
                                    class="fas fa-plus-circle"
                                    style="cursor: pointer"
                                    @click="add"
                                    >Add fields</i
                                >
                            </span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, reactive } from "vue";
import axios from "axios";
import { useToast, position, POSITION } from "vue-toastification";

export default {
    setup() {
        // data
        const employees = reactive([
            {
                name: "",
                email: "",
            },
        ]);

        // method
        const add = () => {
            employees.push({
                name: "",
                email: "",
            });
        };

        const remove = (index) => {
            employees.splice(index, 1);
        };

        const toast = useToast();

        const submit = async () => {
            if (
                employees.filter((e) => e.name) == 0 ||
                employees.filter((e) => e.email) == 0
            ) {
                toast.warning("you must insert atleast one data", {
                    timeout: 2000,
                    position: POSITION.TOP_RIGHT,
                });
            } else {
                const data = JSON.stringify(employees);
                console.log(data);
                await axios
                    .post("http://127.0.0.1:8000/api/employees", data)
                    // .post("http://127.0.0.1:8000/api/employees", {
                    //     newData: data,
                    // })
                    // .post("http://127.0.0.1:8000/api/employees", employees)
                    .then((response) => {
                        toast.success(response.data.success, {
                            timeout: 2000,
                            position: POSITION.TOP_RIGHT,
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        };

        return { employees, add, remove, submit };
    },
};
</script>
<style lang=""></style>
