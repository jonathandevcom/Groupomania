<template>
  <footer>
    <nav>
      <ul> 
        <li>       
        <router-link to="/LegalNotice">Mentions légales</router-link>  
              </li> 
         <li class="right_place">
            <a href="mailto:contact@groupomania.com">Contactez-nous</a>
          </li>
      </ul>
    </nav>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
footer {
  height: 10vh;
  width: 100%;  
}

nav {
  background-color: rgb(17, 37, 65);
  color: #fff;
  padding: 15px;
}

nav ul {
  display: flex;
  align-items: space-between;
}

nav li {
  list-style: none;
}

.right_place {
  margin-left: auto;
}

nav li a {
  color: #fff;
  text-decoration: none;
  font-weight: bold;
  padding: 5px 20px;
}

nav a:hover{
  color: yellow;
  text-decoration: none;
}

nav .router-link-exact-active {
  color:rgb(253, 45, 1);
}

.logo-header {
  height: 45px;
}


</style>
