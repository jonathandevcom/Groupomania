<template>
  <header>
    <nav>
      <ul>
        <img
          class="logo-header"
          src="../assets/icon-header.png"
          alt="logo Groupomania"
        />
        
        <li v-if="token" class="right_place"> 
        <router-link to="/forum" exact>Forum</router-link>
        </li>
        <li v-else class="right_place">
          <router-link to="/" exact>Accueil</router-link>
        </li>

        <li v-if="token">
          <router-link to="/profile" exact>Profile</router-link>
        </li>
        <li v-else>
          <router-link to="/login" exact>Connexion</router-link>
        </li>

        <li v-if="token" v-on:click="logout">
          <router-link to="/login" exact>Déconnection</router-link>
        </li>
        <li v-else>
           <router-link to="/register" exact>Inscription</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      token: "",
    };
  },
  methods: {
    logout() {
      localStorage.clear();
    },
  },
  mounted() {
    if (localStorage.jwt) {
      this.token = localStorage.jwt;
    }
  },
};
</script>

<style>
header {
  width: 100%;
  height: 10vh;
}

nav {
  background-color: rgb(17, 37, 65);
  color: #fff;
  padding: 15px;
  display: flex;
  justify-content: space-between;
}

nav ul {
  display: flex;
  align-items: center;
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

nav a:hover {
  color: yellow;
}

nav .router-link-exact-active {
  color: rgb(167, 155, 156);
}

.logo-header {
  height: 45px;
}

@media screen and (max-width: 800px) {
  nav {
    padding: 10px 5px 10px 5px;
  }
}

@media screen and (max-width: 600px) {
  nav {
    padding: 25px 5px 25px 5px;
  }
  img {
    display: none;
  }
  li {
    margin-right: auto;
  }
}
</style>
