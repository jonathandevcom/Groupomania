<template>
  <div class="card mb-3 mt-3">
    <div v-if="message.photo" class="d-flex flex-row user-info p-3">
      <img
        class="rounded-circle d-block"
        v-bind:src="message.photo"
        width="45"
        height="45"
        alt="Photo de profile de :"
      />
      <div class="d-flex flex-column justify-content-start ml-2">
        <span class="d-block font-weight-bold name mt-3 ml-3">{{
          message.userName
        }}</span>
      </div>
    </div>

    <img
      v-bind:src="message.image"
      class="card-img-top image d-block"
      alt="Gif publier par un utilisateur"
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
            <form
              method="delete"
              v-if="message.id_users_messages == userId || isAdmin == 1"
            >
              <button
                v-on:click.prevent="
                  deleteMessage(message.id_messages, message.id_users_messages)
                "
                type="submit"
                class="btn btn-outline-info mt-2"
              >
                Supprimer
              </button>
            </form>
          </div>
        </div>
      </div>

      <button
        v-on:click.prevent="addLikes(message.id_messages)"
        type="submit"
        class="btn btn-outline-primary"
      >
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
      <span v-for="like in likes" :key="like.id_likes">
        <button
          v-if="
            (message.id_messages === like.id_messages_likes) & (like.likes != 0)
          "
          type="buton"
          class="btn btn-outline-primary float-right mr-2"
        >
          <span> {{ like.numberLikes }} </span>
          <span v-if="like.numberLikes < 2">like</span>
          <span v-else>likes</span>
        </button>
      </span>
    </div>

    <div class="mx-3">
      <label for="comment" class="ml-1">Ajouter un commentaire</label>
      <input
        v-model="comment"
        type="text"
        ref="comment"
        name="comment"
        class="form-control"
        placeholder="Votre commentaire"
        required
      />
      <button
        v-on:click.prevent="postComment(message.id_messages)"
        type="submit"
        class="btn btn-outline-info my-2"
      >
        Publier
      </button>
    </div>

    <div
      v-for="comment in comments.slice().reverse()"
      :key="comment.id_comments"
    >
      <div v-if="comment.id_messages_comments === message.id_messages">
        <div class="d-flex flex-row user-info p-3">
          <img
            v-if="comment.photo"
            class="rounded-circle mt-4 mr-3 d-block"
            v-bind:src="comment.photo"
            width="45"
            height="45"
            alt="Photo de profile de :"
          />
          <div class="card-body border border-3 mt-3">
            <h5 v-if="comment.userName">{{ comment.userName }} :</h5>
            <p class="card-text">
              {{ comment.comment }}
            </p>
          </div>
          <div class="p-2 my-auto">
            <form
              v-if="comment.id_users_comments == userId || isAdmin == 1"
              method="delete"
            >
              <button
                v-on:click="
                  deleteComment(comment.id_comments, comment.id_users_comments)
                "
                type="submit"
                class="btn btn-outline-info mt-2"
              >
                Supprimer
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Message",
  props: ["message"],
  data() {
    return {
      comments: [],
      likes: [],
      comment: null,
      userId: "",
      isAdmin: "",
    };
  },
  created() {
    // Récupération de tous les commentaires
    axios
      .get("http://localhost:3000/api/comments")
      .then((response) => {
        this.comments = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
    // Récupération de tous les likes
    axios
      .get("http://localhost:3000/api/likes")
      .then((response) => {
        this.likes = response.data.result;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  mounted() {
    // Récupération de l'userId
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
    // Récupération de isAdmin pour modérer les interactions
    if (localStorage.isAdmin) {
      this.isAdmin = localStorage.isAdmin;
    }
    if (localStorage.jwt) {
      this.token = localStorage.jwt;
    }
  },
  methods: {
    // Suppression d'un message
    deleteMessage(id_message, id_users) {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
        data: { id_users: id_users, isAdmin: this.isAdmin },
      };
      axios
        .delete("http://localhost:3000/api/forum/" + id_message, config)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Création d'un commentaire
    postComment(id) {
      try {
        axios
          .post("http://localhost:3000/api/comments", {
            id_users_comments: this.userId,
            id_messages_comments: id,
            comment: this.comment,
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    // Suppression d'un commentaire
    deleteComment(id_comment, id_users) {
      const config = {
        headers: { Authorization: `Bearer ` + this.token },
        data: { id_users: id_users, isAdmin: this.isAdmin },
      };
      axios
        .delete("http://localhost:3000/api/comments/" + id_comment, config)
        .then(() => {
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    // Ajout ou suppression d'un like
    addLikes(id) {
      try {
        axios
          .post("http://localhost:3000/api/likes/" + id, {
            id_users_likes: this.userId,
            id_messages_likes: id,
            likes: "",
          })
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
</style>