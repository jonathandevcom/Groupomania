<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="card col-12 my-5">
          <div class="card-body">
            <img
              id="profile_photo"
              class="img-thumbnail rounded-circle my-3 mr-4"
              v-bind:src="profile.photo"
              alt="photo profil"
            />
            <h5 class="card-title mt-4">{{ profile.userName }}</h5>
            <p class="card-text">
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
    </div>

    <!-- modifier le profile  -->

    <div v-show="put_profile" class="container">
      <div class="row m-5">
        <div class="col-md-12 col-lg-10 offset-lg-2 col-xl-8">
          <h4 v-if="messageError" class="alert alert-danger mt-4">
            {{ messageError }}
          </h4>
          <div class="card">
            <div class="card-header bg-danger text-white">
              <h4 class="card-title text-uppercase">Modifier votre profil</h4>
            </div>
            <div class="card-body">
             
             <div class="row">


<!--
               <div class="col-sm-12">
              <form
                @submit="modifiedProfile"
                method="post"
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
                      id="validation"
                      class="btn btn-outline-danger ml-2" 
                      type="submit">
                        Modifier votre adresse mail
                      </button>
                    </span>
                  </div>

              </form>
</div>
-->

<div class="col-sm-12">
<form
                @submit="modifiedProfile"
                method="put"
                id="needs-validation"
                novalidate
              >
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
                      <button class="btn btn-outline-danger ml-2" type="submit">
                        Modifier votre nom d'utilisateur
                      </button>
                    </span>
                  </div>
</form>
</div>
<div class="col-sm-12">
<form
                @submit="modifiedProfile"
                method="post"
                id="needs-validation"
                novalidate
              >
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
                      id="validation"
                      class="btn btn-outline-danger ml-2" 
                      type="submit">
                        Modifier votre mot de passe
                      </button>
                    </span>
                  </div>
</form>
</div>
<div class="col-sm-12">
<form
                @submit="modifiedProfile"
                method="put"
                id="needs-validation"
                novalidate
              >
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
                      <button class="btn btn-outline-danger ml-2" type="submit">
                        Modifier votre biographie
                      </button>
                    </span>
                  </div>
</form>
</div>
                  <!--   <input
                      :value="formData.photo"
                      @change="formData.photo = $event.target.value"
                      type="file"
                      id="file"
                      name="file"
                      class="mb-1 mt-3"
                      required
                    /> -->
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- supprimer le profile -->

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
</template>

<script>
import axios from "axios";



export default {
  name: "Profile",
  formData : {
  email: null,
  userName: null,
  password: null,
  bio: null,
  isAdmin: false,
  photo: "null",
    },
  data() {
    return {
      put_profile: false,
      delete_profile: false,
      profile: [],
      messageError: "",
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("jwt"),
    };
   
  },
  created() {
    // ajouter l'id après users
    // Affichage de l'utilisateur
    axios
      .get("http://localhost:3000/api/users/" + this.userId)
      .then((response) => {
        this.profile = response.data.result;
     //   console.log(this.profile.photo);
     //   console.log(this.userId);
      });
  },
  methods: {
    
    modifiedProfile(e) {
      e.preventDefault();
      var vm = this;
      axios
        // ajouter id
        .put("http://localhost:3000/api/users/" + this.userId, this.profile)
        .then(function(response) {
           let form = document.getElementById("needs-validation");
          if (form.checkValidity(event) === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
          } else {
            console.log(response);
          }
          
         // window.location.reload();
        })
        .catch(function(error) {
          let form = document.getElementById("needs-validation");
          if (form.checkValidity(event) === false) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add("was-validated");
          } else {
            vm.messageError = "Nom d'utilisateur déjà utilisé";
          }
          console.log(error);
        });
    },


    deleteProfile(e) {
      e.preventDefault();
      const config = {
    headers: { Authorization: `Bearer ` + this.token }
};

//const bodyParameters = {
//   key: "mysupersecretpassword"
//};

      axios
        // ajouter id => ok fonctionne
        .delete("http://localhost:3000/api/users/" + this.userId,//bodyParameters, 
        config) 
        .then(function(response) {
          console.log(response);
          window.location.href = "/register";
        })
        .catch(function(error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
#profile_photo {
  float: left;
  width: 150px;
  height: 150px;
}
</style>
