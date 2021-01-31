<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-sm-4 col-xs-12 user">
          <img
            src="patron.jpg"
            class="img-thumbnail rounded-circle my-3"
            alt="..."
          />

          <h3>Username</h3>

          <p class="my-3">
            Lorem Ipsum Lorem ipsum dolor sit amet consectetur adipisicing elit.
            At architecto animi optio ab aut officiis qui ipsa in tenetur,
            soluta, iusto aperiam molestiae tempore! Blanditiis doloremque,
            optio neque hic quas unde sed rem! Totam doloremque quae dolorum
            animi corporis vitae ad perspiciatis enim, fugiat veniam, eveniet
            quisquam, cumque eaque! Natus!
          </p>
        </div>

        <!-- post  xxxxxxxxxxxxxxxxxx   -->

        <div :key="index" v-for="(message, index) in message" 
        class="col-lg-9 col-md-9 col-sm-8 col-xs-12 publication">
          <div class="card mb-3 mt-3">
            <img src="message.gif" class="card-img-top gif" alt="message.gif" />
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
                    class=" btn btn-warning d-flex justify-content-end mt-2 "
                  >
                    Commenter
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
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Forum",
  data() {
    return {
      message: [],
    };
  },
  created() {
    axios
    .get("http://localhost:3000/api/forum")
    .then((reponse) => {
      this.message = reponse.data.result;
      console.log(this.message);
    });
    
  },
};
</script>

<style scoped>

</style>
