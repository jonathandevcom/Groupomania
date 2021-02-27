<template>
  <main>
    <div class="container">
      <div class="row ">
        
        <div class="col-12 publication">
          <div class="card mb-3 mt-3">
            <div class="card-body">
              <div class="row">
                <div class="m-auto col-lg-8 col-sm-12">
                  <h5 class="card-title col-8">Publier votre gif</h5>
                  <form @submit="postImage" action="post">
                    <input
                      :value="formMessage.image"
                      type="file"
                      ref="file"
                      id="image"
                      name="image"
                      @change="OnImageUpload"
                      class="mb-3 mt-1"
                      required
                    />
                    <input
                      v-model="formMessage.text"
                      type="text"
                      id="text"
                      name="text"
                      class="form-control"
                      placeholder="Votre commentaire"
                      required
                    />
                    <button
                      type="submit"
                      class="btn btn-outline-info mt-2"
                    >
                      Publier
                    </button>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>




        
        <div
          :key="index"
          v-for="(message, index) in message"
          class="col-lg-12 col-sm-12 col-xs-12 publication"
        >
          <div class="card mb-3 mt-3">
            <img v-bind:src="message.image" class="card-img-top image" alt="message.image" />
            <div class="card-body">
              <p class="card-text">
                {{ message.text }}
              </p>
              <div class="row">
                <div class="col-8">
                  <h5 class="card-title col-8">Username</h5>
                  <small class="text-muted">Last updated 3 mins ago</small>
                </div>
                <div class="col-4">
                  <button
                    type="button"
                    class="btn btn-outline-secondary d-flex justify-content-end mt-2"
                  >
                    Commenter
                  </button>
                  <button v-if="idUser = message.id_users"
                      type="submit"
                      class="btn btn-outline-info mt-2"
                    >
                      Supprimer
                    </button>
                </div>
              </div>
              <!-- commentaire  xxxxxxxxxxxxxxxxxx -->
              <div class="card-body border border-3 mt-3">
                <h6>Commentaires</h6>
                <p class="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Forum",
  data() {
    return {
      message: [],
      formMessage: {
        image: null,
        text: null,
      },
    };
  },
  created() {
    axios.get("http://localhost:3000/api/forum")
    .then((response) => {
      this.message = response.data.result;
      console.log(this.message);
    });
  },
  methods: {
  OnImageUpload() {
      this.file = this.$refs.file.files[0];
    },

   async postImage(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id_users", localStorage.getItem("userId"));
      formData.append("image", this.file);
      formData.append("text", this.formMessage.text);
      try {
       await axios
        .post("http://localhost:3000/api/forum", formData)
        .then(function(response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function(error) {
          console.log(error);
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
