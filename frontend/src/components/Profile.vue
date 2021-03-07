<template>
  <main>
    <section class="container">
      <div class="row">
        <div class="card col-12 col-xl-8 mx-auto mt-5">
          <div class="card-body">
            <img
              id="profilePhoto"
              class="img-thumbnail rounded-circle my-3 mr-4 d-block"
              v-bind:src="profile.photo"
              alt="photo profil"
            />
            <h5 class="card-title mt-4">{{ profile.userName }}</h5>

            <p v-if="profile.bio != 'null'" class="card-text">
              {{ profile.bio }}
            </p>
            <button
              v-on:click="put_profile = !put_profile"
              class="btn btn-outline-primary justify-content-end mt-2"
            >
              Modifier votre profil
            </button>
            <button
              v-on:click="delete_profile = !delete_profile"
              class="btn btn-outline-danger d-flex justify-content-end mt-2"
            >
              Supprimer de votre compte
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
                    @submit="modifiedEmail"
                    method="put"
                    id="needs-validation"
                    novalidate
                  >
                    <div class="input-group">
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
                  <form @submit="modifiedUserName" method="put" novalidate>
                    <div class="input-group mt-3">
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
                  <form @submit="modifiedPassword" method="put" novalidate>
                    <div class="input-group mt-3">
                      <input
                        v-model="profile.password"
                        type="password"
                        class="form-control"
                        id="password"
                        name="password"
                        placeholder="Mot de passe"
                        minlength="8"
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
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
                  <form @submit="modifiedBio" method="put" novalidate>
                    <div class="input-group mt-3">
                      <input
                        v-model="profile.bio"
                        type="text"
                        class="form-control"
                        id="bio"
                        name="bio"
                        placeholder="Décrivez-vous en quelques mots"
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
                  <form @submit="modifiedFile" method="put" novalidate>
                    <div class="input-group mt-3">
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
      <form @submit="deleteProfile" method="delete">
        <div class="row">
          <div
            v-show="delete_profile"
            class="container col-lg-6 col-sm-11 publication"
          >
            <div class="card mb-3 mt-3">
              <div class="card-body">
                <div class="col-12">
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
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("jwt"),
    };
  },
  created() {
    // Affichage de l'utilisateur
    // utilisation de created pour accéder au chargement avant l'ouverture de la page
    axios
      .get("http://localhost:3000/api/users/" + this.userId)
      .then((response) => {
        this.profile = response.data.result;
        console.log(this.profile);
      });
  },
  // Modification du nom d'utilisateur
  methods: {
    modifiedUserName(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      axios
        .put(
          "http://localhost:3000/api/users/" + this.userId + "/editUserName",
          this.profile,
          config
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          vm.messageError = "Nom d'utilisateur déjà utilisé";
          console.log(error);
        });
    },

    modifiedBio(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      axios
        .put(
          "http://localhost:3000/api/users/" + this.userId + "/editBio",
          this.profile,
          config
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    // Modification de l'email
    modifiedEmail(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      axios
        .put(
          "http://localhost:3000/api/users/" + this.userId + "/editEmail",
          this.profile,
          config
        )
        .then(function (response) {
          let form = document.getElementById("needs-validation");
          if (form.checkValidity(event) === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
            console.log(response);
          } else {
            window.location.reload();
          }
        })
        .catch(function (error) {
          vm.messageError = "Email déjà utilisé";
          console.log(error);
        });
    },
    // Modification du mot de passe ou de la biographie
    modifiedPassword(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      var vm = this;
      axios
        .put(
          "http://localhost:3000/api/users/" + this.userId,
          this.profile,
          config
        )
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
          vm.messageError =
            "Merci de saisir un mot de passe contenant au minimun 1 majuscule, 1 miniscule et un symbole.";
        });
    },

    // Modification de la photo
    onFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async modifiedFile(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      const formData = new FormData();
      formData.append("email", this.profile.email);
      formData.append("userName", this.profile.userName);
      formData.append("password", this.profile.password);
      formData.append("bio", this.profile.bio);
      formData.append("photo", this.file);
      try {
        await axios
          .put(
            "http://localhost:3000/api/users/" + this.userId + "/editFile",
            formData,
            config
          )
          .then(function (response) {
            console.log(response);
            window.location.reload();
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    // Suppression d'un utilisateur
    deleteProfile(e) {
      e.preventDefault();
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      axios
        .delete("http://localhost:3000/api/users/" + this.userId, config)
        .then(function (response) {
          console.log(response);
          localStorage.clear();
          window.location.href = "/register";
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
#profilePhoto {
  float: left;
  width: 150px;
  height: 150px;
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
