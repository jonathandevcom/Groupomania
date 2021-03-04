<template>
  <main>
    <div class="container mt-4">
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
                    <button type="submit" class="btn btn-outline-info mt-2 ">
                      Publier
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="message in messages.slice().reverse()"
          :key="message.id_messages"
          class="col-lg-8 mx-auto col-sm-12 col-xs-12 publication"
        >
          <div class="card mb-3 mt-3">
            <div class="d-flex flex-row user-info p-3">
              <img
                class="rounded-circle"
                v-bind:src="message.photo"
                width="40"
              />
              <div class="d-flex flex-column justify-content-start ml-2">
                <span class="d-block font-weight-bold name">{{ message.userName }}</span
                ><!--<span class="date text-black-50">Shared publicly - Jan 2020</span>-->
              </div>
            </div>
            <img
              v-bind:src="message.image"
              class="card-img-top image d-block"
              alt="message.image"
            />

            <div class="card-body">
              <div class="row">
                <div class="col-12 d-flex bd-highlight">
                  <div class="p-2 w-100 bd-highlight">
                    <h5 class="card-title mt-2">
                      {{ message.text }}
                    </h5>
                  </div>

                  <div class="p-2 flex-shrink-1 bd-highlight">
                    <form method="delete">
                      <button
                        v-on:click="deleteMessage(message.id_messages)"
                        type="submit"
                        class="btn btn-outline-info mt-2"
                      >
                        Supprimer
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <button type="button" class="btn btn-outline-primary">
                <div class="like cursor">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-hand-thumbs-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"
                    />
                  </svg>

                  <span class="ml-2">Like</span>
                </div>
              </button>

              <button
                type="button"
                class="btn btn-outline-primary float-right mr-2"
              >
                0 like
              </button>
            </div>

            <div>
              <input
                v-model="comment"
                type="text"
                ref="comment"
                id="comment"
                name="comment"
                class="form-control"
                placeholder="Votre commentaire"
                required
              />
              <button
                v-on:click.prevent="postComment(message.id_messages)"
                type="submit"
                class="btn btn-outline-info mt-2 ml-3"
              >
                Publier
              </button>
            </div>
            
        

          <div v-for="comment in comments.slice().reverse()"
          :key="comment.id_comments" 
          >
          <div v-if="comment.id_messages === message.id_messages" >
            <div class="card-body border border-3 mt-3">
              <p class="card-text">
                {{ comment.comment }}
              </p>
           
</div>
</div>
</div>

          </div>
        </div>
      </div>
    </div>
    <!--   <h1 v-if="this.messages[0].id === this.comments[0].id_messages">BIENVENUE</h1> -->
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "Forum",
  data() {
    return {
      profiles: [],
      messages: [],
      comments: [],
      formMessage: {
        image: null,
        text: null,
      },
        comment: null,
      
      // comment: null,
      userId: localStorage.getItem("userId"),
    };
  },
  created() {
    axios.get("http://localhost:3000/api/forum").then((response) => {
      this.messages = response.data.result;
      console.log(this.messages);
    });

    axios.get("http://localhost:3000/api/comments").then((response) => {
      this.comments = response.data.result;
      console.log(this.comments);
    });

    axios
      .get("http://localhost:3000/api/users/" + this.userId)
      .then((response) => {
        this.profiles = response.data.result;
        console.log(this.profiles);
      });
  },
  methods: {
    OnImageUpload() {
      this.file = this.$refs.file.files[0];
    },

    async postImage(e) {
      e.preventDefault();
      const formData = new FormData();
      formData.append("id_users_messages", this.userId);
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

    deleteMessage(id) {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
      };
      //  console.log(message);
      axios
        .delete("http://localhost:3000/api/forum/" + id, config)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    async postComment(id) {
      const formData = new FormData();
      formData.append("id_users_comments", this.userId);
      formData.append("id_messages", id);
      formData.append("comment", this.comment);
      console.log(this.comment);
      try {
        await axios
          .post("http://localhost:3000/api/comments", formData)
          .then(function(response) {
            console.log(response);
            //       window.location.reload();
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
