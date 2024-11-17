<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="10" class="b-max-width mx-auto">
          <PageHeader />
        </v-col>        

        <v-col cols="12" sm="10" class="b-max-width mx-auto">

          <v-card elevation="1" variant="elevated" class="ma-1">
            <v-card-text>
                        
              <v-row>
                <v-col cols="8">
                  <v-text-field
                        v-model="search"
                        label="Search"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        hide-details
                        single-line
                        density="compact"
                      ></v-text-field>
                </v-col>

                <v-col cols="4" >
                  <v-btn class="float-right" color="primary" variant="flat" @click="drawer = true">Add</v-btn>
                </v-col>
              </v-row>

              <v-row>
                <v-col>                  
                  <v-data-table :items="tasks" :headers="headers" :search="search">

                    <template v-slot:item="row">
                        <tr>
                          <td>{{row.item.id}}</td>
                          <td>{{row.item.title}}</td>
                          <td>{{row.item.description}}</td>
                          <td>{{row.item.status}}</td>
                          <td>
                              <v-btn class="mx-2" icon="mdi-delete" size="small" color="pink" @click="deleteTask(row.item)"></v-btn>
                              <v-btn class="mx-2" icon="mdi-pencil" size="small" color="primary" @click="editTask(row.item)"></v-btn>
                          </td>
                        </tr>
                    </template>

                  </v-data-table>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-navigation-drawer 
        width="500"
        v-model="drawer"
        temporary
        location="right"
        @update:modelValue="closeDrawer"
        >

          <v-row class="mx-5 py-4">
            <v-col>
                  <h3>{{ isEdit ? 'Edit Task' : 'Add Task' }}</h3>
            </v-col>
          </v-row>

          <v-form ref="taskForm" @submit.prevent="save" class="pt-5">
            <v-row class="mx-5">
              <v-col>
                <v-text-field
                  label="Title"
                  v-model="task.title"
                  :rules="[(v) => required(v)]"
                />
              </v-col>
            </v-row>

            <v-row class="mx-5">
              <v-col>
                <v-text-field
                  label="Description"
                  v-model="task.description"
                  :rules="[(v) => required(v)]"
                />
              </v-col>
            </v-row>

            <v-row class="mx-5">
              <v-col>
                <v-switch
                  v-model="task.status"
                  color="indigo"
                  label="Completed"
                  hide-details
                ></v-switch>
              </v-col>
            </v-row>

            <v-row class="float-right">
              <v-col class="ma-4">
                <v-btn color="primary" variant="flat" @click="save()">{{ isEdit ? 'Update' : 'Save' }}</v-btn>
              </v-col>
            </v-row>

          </v-form>
      </v-navigation-drawer>

    </v-container>
  </div>

</template>

<style>
</style>

<script setup>
import { ref, onMounted } from 'vue'
import { sendRequest } from '@/helpers/http'
import { required } from '@/helpers/validation'
import { validateForm } from '@/helpers/form'
import PageHeader from '@/components/PageHeader'

const tasks = ref()
const drawer = ref(false)
const task = ref({
  status: false
});
const taskForm = ref(null)
const isEdit = ref(false)
const search = ref(null)

const headers = ref([
  {title: 'ID', key: 'id'},
  {title: 'Title', key: 'title'},
  {title: 'Description', key: 'description'},
  {title: 'Status', key: 'status'},
  {title: 'Action'},
])

async function getTasks() {
  const response = await sendRequest('GET', `/api/tasks`)

  if (response.success) {
      tasks.value = response.data.tasks.data
  }
}

async function save(){
  if (!await validateForm(taskForm)) {
    return
  }

  if (isEdit.value === true) {
    updateTask(task)
  } else {
    const response = await sendRequest('POST', `/api/tasks`, task.value)

    if (response.success) {
      getTasks()
      clearFields()
      drawer.value = false
    }
  }
}

function closeDrawer(){
  taskForm.value.resetValidation()
  clearFields()
}

function clearFields(){
  task.value = {status:false}
}

async function deleteTask(task) {
  if (confirm("Delete this task?") === true) {
    const response = await sendRequest('DELETE', `/api/tasks/${task.id}`)

    if (response.success) {
      getTasks()
    }
  } 
}

async function editTask(item) {
  const response = await sendRequest('GET', `/api/tasks/${item.id}`)

    if (response.success) {
       task.value = response.data.task

       isEdit.value = true
       drawer.value = true
    }
}

async function updateTask(task) {
  const response = await sendRequest('PUT', `/api/tasks/${task.value.id}`, task.value)

    if (response.success) {
       isEdit.value = false
       drawer.value = false
       clearFields()
       getTasks()
    }
}

onMounted(() => {
  getTasks()
});
</script>