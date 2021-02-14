<template>
  <header>
    <nav>
      <ul>
        <img
          class="logo-header"
          src="../assets/icon-header.png"
          alt="logo Groupomania"
        />
        <li v-if="token" class="right_place"><a href="/forum">Forum</a></li>
        <li v-else class="right_place"><a href="/">Accueil</a></li>

        <li v-if="token"><a href="/profil">Profil</a></li>
        <li v-else><a href="/login">Connexion</a></li>

        <li v-if="token" v-on:click="logout">
          <a href="/login">Déconnection</a>
        </li>
        <li v-else><a href="/register">Inscription</a></li>
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
    if (localStorage.token) {
      this.token = localStorage.token;
    }
  },
};
</script>

<style>
header {
  top: 0;
  position: static;
  width: 100%;
}
nav {
  background-color: rgb(17, 37, 65);
  color: #fff;
  padding: 30px 60px;
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

nav li a:hover {
  color: yellow;
  text-decoration: none;
}

.logo-header {
  height: 45px;
}

@media screen and (max-width: 800px) {
  nav {
    padding: 15px 0 2px 0;
  }
}

@media screen and (max-width: 600px) {
  img {
    display: none;
  }
  li {
    margin-right: auto;
  }
}
</style>
