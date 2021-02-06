<template>
  <div class="container">
    <div id="app">
      <button type="button" 
      class="cell-top" 
      @click="isCreatingNewWorker = true"
      >
        Создать нового работника
      </button>    
      <button type="button" 
      class="cell-top" 
      @click="changeSortingType('byName')"
      >
        Отсортировать работников по ФИО
      </button>    
      <button type="button" 
      class="cell-top" 
      @click="changeSortingType('byBirthdate')"
      >
        Отсортировать работников по дате рождения
      </button>
      <p v-if="sortingType">
        Работники отсортированы по {{sortingType === 'byName' ? 'имени' : 'дате рождения'}}
      </p>
      <ul>
        <li class="worker-info" v-for="worker in workers" :key="worker.id">
           <p class="worker-info">
            {{worker.name}}
           </p>     
          <p class="worker-info">
            {{worker.birthdate}}
           </p>
          <button class="cell" 
            type="button" 
            @click="updatingWorkerId = worker.id"
          >
            Редактировать
          </button>
          <button 
            class="cell" 
            type="button"
            @click="deleteWorker(worker.id)"
          >
            Удалить
          </button>
        </li>
      </ul>
      <edit-form v-if="updatingWorkerId" :id="updatingWorkerId"
        @close="editFormClose"
      />
      <create-form v-if="isCreatingNewWorker"
        @close="createFormClose"
      />
    </div>
  </div>
</template>

<script>
import {getWorkers, deleteWorker,sortWorkersByName,sortWorkersByBirthdate} from './api';

import EditForm from './components/Edit_form';
import CreateForm from './components/Create_form';

export default {
  name: 'app',
  components: {
    EditForm,
    CreateForm
  },
  data () {
    return {
      workers: [],
      updatingWorkerId: null,
      isCreatingNewWorker: false,
      sortingType: null
    }
  },
  async created() {
    this.updateWorkers();
  },
  methods: {
    editFormClose(withRefresh){
      this.updatingWorkerId=null;
      if (withRefresh) {
        this.updateWorkers();
      }
    },
    createFormClose(withRefresh){
      this.isCreatingNewWorker=false;
      if (withRefresh) {
        this.updateWorkers();
      }
    },
    async updateWorkers(){
      console.log(this.sortingType)
      let method;
      switch (this.sortingType) {
        case 'byName':
          method = sortWorkersByName;
          break;
        case 'byBirthdate':
          method = sortWorkersByBirthdate;
          break;
        default: 
          method = getWorkers;
      }
      const {data} = await method();
      this.workers = data;
    },
    changeSortingType(type) {
      if (type === this.sortingType){
        this.sortingType = null;
      } else {
        this.sortingType = type;
      }
      this.updateWorkers();
    },
    async deleteWorker(id){
      await deleteWorker(id);
      this.updateWorkers();
    }
  }
}
</script>

<style>
  .container {
    background-color: #a4d4f5;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .worker-info {
    display: flex;
    justify-content: right;
    align-items: center;
    text-align: center;
    margin-left: 10px;

  }
  .cell-top {
    background-color: #5c6df2;
    border-radius:  15px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16 px;
    margin-top: 10px;
    margin-left: 20px;
  }
  .cell {
    background-color: #5c6df2;
    border-radius:  15px;
    color: white;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16 px;
    margin-left: 20px;
    margin-bottom: 10px;
  }

</style>
