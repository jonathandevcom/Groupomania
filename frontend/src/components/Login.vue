<template>
<main>
  <section class="container container-centered">
    <div class="row">
      <div class="mx-auto">
        <h4 v-if="messageErrorLogin" class="alert alert-danger mt-4">
          {{ messageErrorLogin }}
        </h4>
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h4 class="card-title text-uppercase text-center">Connexion</h4>
          </div>
          <div class="card-body">
            <form
              action="*"
              @submit="login"
              method="post"
              id="needs-validation"
              novalidate
            >
              <div class="row">
                <div class="col-sm-12 col-md-12 col-xs-12">
                  <div class="form-group">
                    <label for="username">Nom d'utilisateur</label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Nom d'utilisateur"
                      class="form-control"
                      v-model="userName"
                      required
                      minlength="3"
                    />
                    <div class="invalid-feedback">
                      Merci de saisir votre nom d'utilisateur.
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 col-md-12 col-xs-12">
                  <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input
                      v-model="password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Mot de passe"
                      class="form-control"
                      required
                      minlength="8"
                    />
                    <div class="invalid-feedback">
                      Merci de saisir votre mot de passe.
                    </div>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col-sm-12 col-md-12 col-xs-12 mt-2">
                  <div class="float-left">
                    <button
                      value="signIn"
                      id="signIn"
                      class="btn btn-primary rounded-0"
                      action="/Forum"
                      type="submit"
                    >
                      Connexion
                    </button>
                  </div>
                  <div class="float-right">
                    <router-link to="/register">Inscription</router-link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      password: "",
      messageErrorLogin: "",
    };
  },

  methods: {
    login(e) {
      e.preventDefault();
      var vm = this;
      axios
        .post("http://localhost:3000/api/users/login", {
          userName: this.userName,
          password: this.password,
        })
        .then(function(response) {
          console.log(response);
          localStorage.setItem("jwt", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          response.headers = { Authorization: "Bearer " + response.data.token };

             window.location.href = "/forum";
        })

        .catch(function(error) {
          let form = document.getElementById("needs-validation");
          if (form.checkValidity(event) === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
          } else {
            vm.messageErrorLogin = `Nom d'utilisateur ou mot de passe incorrect`;
          }
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
.container-centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 76vh;
}

.btn-primary {
  background-color: rgb(17, 37, 65) !important;
  border: rgb(17, 37, 65) !important;
  color: white !important;
}

#title {
  color: white;
  text-align: center;
}

.card-header {
  background-color: rgb(17, 37, 65) !important;
}
</style>
