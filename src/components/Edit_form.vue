<template>
  <div class="edit-form">
    <div class="edit-form-blackout" @click="$emit('close')"></div>
    <form class="edit-form-content" @submit.prevent="updateWorker">
      <div>
        Имя
      </div>
      <input type="text" v-model="name">
      <div>
        Дата рождения
      </div>
      <input type="text" v-model="birthdate">
      <br>
      <button class="edit-button" type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script>
import {showWorker, updateWorkerData} from '../api';

export default {
  name: 'EditForm',
  props: {
    id: Number
  },
  data () {
    return {
      name: null,
      birthdate: null 
    }
  },
  async created() {
    const {data} = await showWorker(this.id);
    this.name = data.name;
    this.birthdate = data.birthdate;
  },
  methods: {
    async updateWorker() {
      await updateWorkerData({
        id: this.id,
        name: this.name,
        birthdate: this.birthdate,
      });
      this.$emit('close', true);
    }
  }
}
</script>

<style>
  .edit-form{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .edit-form-content {
    position: relative;
    background-color: #a4d4f5;
    border-radius: 30px;
    width: 500px;
    padding: 40px;
  }

  .edit-form-blackout{
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .edit-button{
    background-color: #5c6df2;
    border-radius:  15px;
    color: white;
    padding: 15px 30px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16 px;
    margin-top: 10px;
  }
</style>
