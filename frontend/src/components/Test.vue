<template>
  <div class="hello">
      <h2>TEST </h2>

      <div :key="index" v-for="(listUserName, index) in listUserName">
      <h1>{{ listUserName }}</h1>
      
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'test',
    data(){
        return{
            listUserName: null,
        }
    },
    mounted(){
        axios
        .get('http://localhost:3000/api/users')
        .then((reponse) => {
            this.listUserName = reponse.data;
            console.log(this.listUserName.result[0].userName)
        })
    }
}
</script>

<style>

.hello {
    margin-top: 50px;
    text-align: center;
    color: white
}
</style>