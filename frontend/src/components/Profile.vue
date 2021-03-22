<template>
  <main>
    <section class="container">
      <div class="row">
        <div class="card col-12 col-xl-8 mx-auto mt-5">
          <div class="card-body d-block">
            <img
              id="profilePhoto"
              class="img-thumbnail rounded-circle my-3 mr-4"
              v-bind:src="profile.photo"
              alt="photo profil"
            />
            <h5 class="card-title mt-5">{{ profile.userName }}</h5>

            <p v-if="profile.bio != 'null'" class="card-text">
              {{ profile.bio }}
            </p>
            <button
              v-on:click="put_profile = !put_profile"
              class="btn btn-primary justify-content-end mt-2"
            >
              Modifier votre profil
            </button>
            <button
              v-on:click="delete_profile = !delete_profile"
              class="btn btn-outline-danger d-flex justify-content-end mt-2"
            >
              Supprimer votre compte
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- modifier le profile  -->

    <section v-show="put_profile" class="container">
      <div class="row mb-5">
        <div class="col-xs-12 col-md-8 col-xl-6 mx-auto mt-5">
          <h4 v-if="messageError" class="alert alert-danger mt-4">
            {{ messageError }}
          </h4>
          <div class="card">
            <div class="card-header bg-danger text-white">
              <h4 class="card-title text-uppercase">Modifier votre profile</h4>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-sm-12">
                  <form
                    @submit.prevent="modifiedEmail"
                    method="put"
                    id="validationEmail"
                    novalidate
                  >
                    <label for="email">Modifier votre email</label>
                    <div class="input-group mb-3">
                      <input
                        v-model="profile.email"
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
                      <span class="input-group-btn">
                        <button
                          value="valider"
                          class="btn btn-outline-danger ml-2"
                          type="submit"
                        >
                          Modifier votre adresse mail
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div class="col-sm-12">
                  <form
                    @submit.prevent="modifiedUserName"
                    method="put"
                    id="validationUsername"
                    novalidate
                  >
                    <label for="userName"
                      >Modifier votre nom d'utilisateur</label
                    >
                    <div class="input-group mb-3">
                      <input
                        v-model="profile.userName"
                        type="text"
                        id="userName"
                        name="userName"
                        placeholder="Nom d'utilisateur"
                        class="form-control"
                        required
                        minlength="3"
                      />
                      <span class="input-group-btn">
                        <button
                          class="btn btn-outline-danger ml-2"
                          type="submit"
                        >
                          Modifier votre nom d'utilisateur
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div class="col-sm-12">
                  <form
                    @submit.prevent="modifiedPassword"
                    method="put"
                    id="validationPassword"
                    novalidate
                  >
                    <label for="password">Modifier votre mot de passe</label>
                    <div class="input-group mb-3">
                      <input
                        v-model="profile.password"
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        minlength="8"
                        maxlength="30"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-!$%^*()_+|~=`{}\[\]:'<>?,.\/]).{8,}"
                        required
                      />
                      <div class="invalid-feedback">
                        Merci de saisir un mot de passe contenant au minimun 1
                        majuscule, 1 miniscule et un symbole.
                      </div>
                      <span class="input-group-btn">
                        <button
                          value="valider"
                          class="btn btn-outline-danger ml-2"
                          type="submit"
                        >
                          Modifier votre mot de passe
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
                <div class="col-sm-12">
                  <form
                    @submit.prevent="modifiedBio"
                    method="put"
                    id="validationBio"
                    novalidate
                  >
                    <label for="bio">Ajouter ou modifer votre biographie</label>
                    <div class="input-group mb-3">
                      <textarea
                        v-model="profile.bio"
                        type="text"
                        class="form-control"
                        id="bio"
                        name="bio"
                        placeholder="Décrivez-vous en quelques mots"
                        maxlength="500"
                        minlength="3"
                        required
                      />
                      <span class="input-group-btn">
                        <button
                          class="btn btn-outline-danger ml-2"
                          type="submit"
                        >
                          Modifier votre biographie
                        </button>
                      </span>
                    </div>
                  </form>
                </div>

                <div class="col-sm-12">
                  <form
                    @submit.prevent="modifiedFile"
                    method="put"
                    id="validationPhoto"
                    novalidate
                  >
                    <label for="photo">Ajouter ou modifier votre photo</label>
                    <div class="input-group mb-3">
                      <input
                        :value="formData.photo"
                        type="file"
                        ref="file"
                        id="photo"
                        name="photo"
                        class="form-control"
                        @change="onFileUpload"
                        required
                      />
                      <span class="input-group-btn">
                        <button
                          class="btn btn-outline-danger ml-2"
                          type="submit"
                        >
                          Modifier votre photo de profile
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- supprimer le profile -->

    <section>
      <form @submit.prevent="deleteProfile(profile.id_users)" method="delete">
        <div class="row">
          <div
            v-show="delete_profile"
            class="container col-lg-6 col-sm-11 publication"
          >
            <div class="card mb-3 mt-3">
              <div class="card-body">
                <div class="col-12">
                  <h4 v-if="messageErrorDelete" class="alert alert-danger mt-4">
                    {{ messageErrorDelete }}
                  </h4>
                  <h5 class="card-title text-center">
                    Attention la suppression de votre compte sera définitive
                  </h5>
                  <span class="input-group-btn d-flex justify-content-center">
                    <button type="submit" class="btn btn-danger">
                      Valider la suppression
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Profile",
  data() {
    return {
      formData: {
        email: null,
        userName: null,
        password: null,
        bio: null,
        photo: null,
      },
      put_profile: false,
      delete_profile: false,
      profile: [],
      messageError: "",
      messageErrorDelete: "",
      userId: "",
      token: "",
    };
  },
  created() {
    // Récupération de l'userId
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    //
    if (localStorage.jwt) {
      this.token = localStorage.jwt;
    }
    // Récupération de isAdmin pour modérer les interactions
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
    }

    // Affichage de l'utilisateur
    // utilisation de created pour accéder au chargement avant l'ouverture de la page
    axios
      .get("http://localhost:3000/api/users/" + this.userId)
      .then((response) => {
        this.profile = response.data.result;
      })
      .catch(() => {
        alert(
          "Nous rencontrons un problème sur le serveur. Merci de rafraichir votre page ou revenir ultérieurement"
        );
      });
  },
  // Modification du nom d'utilisateur
  methods: {
    modifiedUserName() {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      let form = document.getElementById("validationUsername");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .put(
            "http://localhost:3000/api/users/" + this.userId + "/editUserName",
            this.profile,
            config
          )
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            vm.messageError = "Nom d'utilisateur déjà utilisé";
          });
      }
    },

    modifiedBio() {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      let form = document.getElementById("validationBio");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .put(
            "http://localhost:3000/api/users/" + this.userId + "/editBio",
            this.profile,
            config
          )
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            vm.messageError =
              "Vous n'êtes pas autoriser à modifier cette biographie";
          });
      }
    },

    // Modification de l'email
    modifiedEmail() {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      let form = document.getElementById("validationEmail");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .put(
            "http://localhost:3000/api/users/" + this.userId + "/editEmail",
            this.profile,
            config
          )
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            vm.messageError = "Email déjà utilisé";
          });
      }
    },
    // Modification du mot de passe ou de la biographie
    modifiedPassword() {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      let form = document.getElementById("validationPassword");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .put(
            "http://localhost:3000/api/users/" + this.userId,
            this.profile,
            config
          )
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            vm.messageError =
              "Merci de saisir un mot de passe contenant au minimun 1 majuscule, 1 miniscule et un symbole.";
          });
      }
    },

    // Modification du fichier de la photo
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    modifiedFile() {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      const formData = new FormData();
      formData.append("id_users", this.profile.id_users);
      formData.append("email", this.profile.email);
      formData.append("userName", this.profile.userName);
      formData.append("password", this.profile.password);
      formData.append("isAdmin", this.profile.isAdmin);
      formData.append("bio", this.profile.bio);
      formData.append("photo", this.file);
      var vm = this;
      let form = document.getElementById("validationPhoto");
      if (form.checkValidity(event) === false) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add("was-validated");
      } else {
        axios
          .put(
            "http://localhost:3000/api/users/" + this.userId + "/editFile",
            formData,
            config
          )
          .then(() => {
            window.location.reload();
          })
          .catch(() => {
            vm.messageError =
              "Vous n'êtes pas autoriser à modifier la photo de profile";
          });
      }
    },

    // Suppression d'un utilisateur
    deleteProfile(id_users) {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
        data: { id_users: id_users },
      };
      var vm = this;
      axios
        .delete("http://localhost:3000/api/users/" + this.userId, config)
        .then(() => {
          localStorage.clear();
          window.location.href = "/register";
        })
        .catch(() => {
          vm.messageErrorDelete =
            "Vous n'êtes pas autoriser à supprimer ce profile";
        });
    },
  },
};
</script>

<style scoped>
#profilePhoto {
  float: left;
  width: 200px;
  height: 200px;
  object-fit: cover;
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

#photo {
  border: none !important;
}
</style>
