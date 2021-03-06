<template>
  <main class="container">
    <div class="row top-register m-5">
      <div class="offset-md-2 col-md-8 offset-md-2">
        <h4 v-if="messageError" class="alert alert-danger mt-4">
          {{ messageError }}
        </h4>
        <div class="card">
          <div class="card-header bg-danger text-white">
            <h4 class="card-title text-uppercase">Inscription</h4>
          </div>
          <div class="card-body">
            <form
              @submit="postForm"
              method="post"
              id="needs-validation"
              enctype="multipart/form-data"
              novalidate
            >
              <div class="row">
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="email">Email</label>
                    <input
                      v-model="formData.email"
                      type="email"
                      class="form-control"
                      id="email"
                      name="email"
                      placeholder="Email"
                      required
                    />
                    <div class="invalid-feedback">
                      Merci de saisir une adresse mail valide.
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="userName">Nom d'utilisateur</label>
                    <input
                      v-model="formData.userName"
                      type="text"
                      id="userName"
                      name="userName"
                      placeholder="Nom d'utilisateur"
                      class="form-control"
                      required
                      minlength="3"
                    />
                    <div class="invalid-feedback">
                      Merci de saisir un nom d'utilisateur.
                    </div>
                  </div>
                </div>
                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="password">Mot de passe</label>
                    <input
                      v-model="formData.password"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Mot de passe"
                      class="form-control"
                      required
                      minlength="8"
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    />
                    <div class="invalid-feedback">
                      Merci de saisir un mot de passe contenant au minimun 1
                      majuscule, 1 miniscule et un symbole.
                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="bio">Biographie</label>
                    <input
                      v-model="formData.bio"
                      type="text"
                      class="form-control"
                      id="bio"
                      name="bio"
                      placeholder="Décrivez-vous en quelques mots"
                    />
                    <input
                      :value="formData.photo"
                      type="file"
                      ref="file"
                      id="photo"
                      name="photo"
                      @change="onFileUpload"
                      class="mb-1 mt-3"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-xs-12 mt-2">
                  <div class="float-left">
                    <button
                      value="valider"
                      id="validation"
                      class="btn btn-primary rounded-0"
                      type="submit"
                    >
                      Valider
                    </button>
                  </div>
                  <div class="float-right">
                    <router-link to="/login">Connexion</router-link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data() {
    return {
      formData: {
        email: null,
        userName: null,
        password: null,
        bio: null,
        photo: null,
      },
      messageError: "",
    };
  },
  methods: {
    // utilisation d'une méthode pour envoyer la photo de profile au backend 
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    // méthode pour enregistrer un nouvel utilisateur
    async postForm(e) {
      e.preventDefault();
      var vm = this;
      const formData = new FormData();
      formData.append("email", this.formData.email);
      formData.append("userName", this.formData.userName);
      formData.append("password", this.formData.password);
      formData.append("bio", this.formData.bio);
      formData.append("photo", this.file);
      try {
        await axios
          .post("http://localhost:3000/api/users", formData)
          .then(function (response) {
            console.log(response);
            window.location.href = "/login";
          })
          .catch(function (error) {
            let form = document.getElementById("needs-validation");
            if (form.checkValidity(event) === false) {
              event.preventDefault();
              event.stopPropagation();
              form.classList.add("was-validated");
            } else {
              vm.messageError = "Nom d'utilisateur ou email déjà utilisé";
            }
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
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
