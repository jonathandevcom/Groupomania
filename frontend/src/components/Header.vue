<template>
<header>
   <div class="header_logo">
     <img id="logo" class="img_header" v-bind:src="image" alt="logo Groupomania">
     </div>
 </header>
</template>


<script>
export default {
  setup() {
  
  }
}
</script>

<style scoped lang="scss">

      header { 
      background-color: rgb(17,37,65);
      text-align: center;
      height: 200px;   
      }
      .img_header{
          width : 600px;
          height: 133px;
          padding-top: 40px;
      }
      @media screen and (max-width: 600px){
          header { 
          height: 100px;   
          }

          .img_header{
          width : 300px;
          height: 67px;
          padding-top: 15px;
          }
          }
</style>
