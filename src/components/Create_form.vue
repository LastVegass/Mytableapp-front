<template>
  <div class="create-form">
    <div class="create-form-blackout" @click="$emit('close')"></div>
    <form class="create-form-content" @submit.prevent="createWorker">
      <div>
        Имя
      </div>
      <input type="text" v-model="name">
      <div>
        Дата рождения
      </div>
      <input type="text" v-model="birthdate">
      <br>
      <button class="create-button" type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
import {createWorker} from '../api';

export default {
  name: 'CreateForm',
  data () {
    return {
      name: null,
      birthdate: null 
    }
  },
  methods: {
    async createWorker() {
      await createWorker({
        name: this.name,
        birthdate: this.birthdate,
      });
      this.$emit('close', true);
    }
  }
}
</script>

<style>
  .create-form{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    
  }

  .create-form-content {
    position: relative;
    background-color: #a4d4f5;
    border-radius: 30px;
    width: 500px;
    padding: 40px;
  }

  .create-form-blackout{
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  .create-button{
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
