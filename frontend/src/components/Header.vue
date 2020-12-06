<template>
    <div class="header-top">
        <a href="./">
        <img class="logo-header" src="../assets/icon-header.png" alt="logo Groupomania">
        </a>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
    return {
   
    }
  },
}
</script>

<style>
.header-top {
    position: fixed;
    top: 0;
    height: 60px;
    background:  rgb(17,37,65);
    color: #f1f1f1;
    width: 100%;
    text-align: center;
    line-height: 50px;
    font-size: 25px;
}
.logo-header {
    height: 45px;
}
</style>