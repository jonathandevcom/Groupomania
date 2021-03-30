<template>
  <main class="container">
    <div class="row top-register m-5">
      <div class="col-xl-10 mx-auto">
        <h4 v-if="messageError" class="alert alert-danger mt-4">
          {{ messageError }}
        </h4>
        <h4 v-if="messageWelcome" class="alert alert-success mt-4">
          {{ messageWelcome }}
        </h4>
        <div class="card">
          <div class="card-header bg-danger text-white">
            <h1 class="card-title text-uppercase">Inscription</h1>
          </div>
          <div class="card-body">
            <form
              @submit.prevent="postForm"
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
                      pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^*()_+|~=`{}\[\]:'<>?,.\/]).{8,}"
                    />
                    <div class="invalid-feedback">
                      Merci de saisir un mot de passe contenant au minimun 1
                      majuscule, 1 miniscule et 1 symbole (minimun 8
                      charactères).
                    </div>
                  </div>
                </div>

                <div class="col-sm-12">
                  <div class="form-group">
                    <label for="bio">Biographie</label>
                    <textarea
                      v-model="formData.bio"
                      type="text"
                      class="form-control mb-3"
                      id="bio"
                      name="bio"
                      placeholder="Décrivez-vous en quelques mots"
                      maxlength="500"
                    />
                    <label for="photo">Inserez votre photo</label>
                    <input
                      type="file"
                      ref="file"
                      id="photo"
                      name="photo"
                      @change="onFileUpload"
                      class="mb-1 ml-2 file-path validate"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-sm-12 col-md-12 col-xs-12 mt-2">
                  <button
                    value="valider"
                    id="validation"
                    class="btn btn-primary rounded-0 float-right"
                    type="submit"
                  >
                    Valider
                  </button>
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
        bio: "",
        photo: null,
      },
      messageError: "",
      messageWelcome: "",
    };
  },
  methods: {
    // utilisation d'une méthode pour envoyer la photo de profile au backend
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    // méthode pour enregistrer un nouvel utilisateur
    postForm() {
      var vm = this;
      const formData = new FormData();
      formData.append("email", this.formData.email);
      formData.append("userName", this.formData.userName);
      formData.append("password", this.formData.password);
      formData.append("bio", this.formData.bio);
      formData.append("photo", this.file);

      let form = document.getElementById("needs-validation");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .post("http://localhost:3000/api/users", formData)
          .then(function (response) {
            vm.messageError = "";
            vm.messageWelcome = "Votre inscription a bien été enregistrée.";
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            response.headers = {
              Authorization: "Bearer " + response.data.token,
            };            
            setTimeout(function () {
              window.location.href = "/forum";
            }, 4000);
          })
          .catch(function () {
            vm.messageError = "Nom d'utilisateur ou email déjà utilisé";
          });
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

.btn-connection {
  color: rgb(17, 37, 65) !important;
}
</style>
