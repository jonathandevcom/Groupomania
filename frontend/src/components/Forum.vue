<template>
  <main>
    <div class="container mt-4">
      <div class="row">
        <div class="col-12 publication">
          <div class="card mb-3 mt-3">
            <div class="card-body">
              <div class="row">
                <div class="m-auto col-lg-8 col-sm-12">
                  <h5>
                    <label class="card-title" for="image"
                      >Publier un gif ou une image</label
                    >
                  </h5>
                  <form @submit.prevent="postImage" action="post">
                    <input
                      type="file"
                      ref="file"
                      name="image"
                      @change="OnImageUpload"
                      class="form-control-file mb-3 mt-1"
                      required
                    />
                    <label for="text">Ajouter un commentaire à votre gif</label>
                    <input
                      v-model="formMessage.text"
                      type="text"
                      name="text"
                      class="form-control"
                      placeholder="Votre commentaire"
                      required
                    />
                    <button type="submit" class="btn btn-outline-info mt-2">
                      Publier
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <message
          v-for="message in messages.slice().reverse()"
          :key="message.id_messages"
          :message="message"
          class="col-lg-7 mx-auto col-sm-12 col-xs-12 publication"
        >
        </message>
      </div>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import Message from "./Message.vue";

export default {
  name: "Forum",
  components: {
    message: Message,
  },

  data() {
    return {
      messages: [],
      userId: "",
      formMessage: {
        image: null,
        text: null,
      },
    };
  },
  created() {
    // Récupération de tous les messages
    axios
      .get("http://localhost:3000/api/forum")
      .then((response) => {
        this.messages = response.data.result;
      })
      .catch(() => {
        alert(
          "Nous rencontrons un problème sur le serveur. Merci de rafraichir votre page ou revenir ultérieurement"
        );
      });
  },
  mounted() {
    // Récupération de l'userId
    if (localStorage.userId) {
      this.userId = localStorage.userId;
    }
  },
  methods: {
    OnImageUpload() {
      this.file = this.$refs.file.files[0];
    },
    // Création d'une publication
    postImage() {
      const formData = new FormData();
      formData.append("id_users_messages", this.userId);
      formData.append("image", this.file);
      formData.append("text", this.formMessage.text);
      axios
        .post("http://localhost:3000/api/forum", formData)
        .then(() => {
          window.location.reload();
        })
        .catch(() => {
          alert(
            "Nous rencontrons un problème sur le serveur. Merci de rafraichir votre page ou revenir ultérieurement"
          );
        });
    },
  },
};
</script>

<style></style>
