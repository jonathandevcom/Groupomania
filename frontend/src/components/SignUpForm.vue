<template>
<section class="container py-5">
  <div class="row">
    <div class="offset-md-2 col-md-8 offset-md-2">
      <div class="card">
        <div class="card-header bg-danger text-white">
            <h4 class="card-title text-uppercase">Inscription</h4>
        </div>
          <div class="card-body">
            <form @submit="postForm" action="/Forum" method="post" id="needs-validation" novalidate>
             <div class="row">                  
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input v-model="formData.email" type="email" class="form-control" id="email" name="email" placeholder="Email" required>
                        <div class="invalid-feedback">
                            Merci de saisir une adresse mail valide.
                        </div>
                    </div>
                </div>   
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="userName">Nom d'utilisateur</label>
                        <input v-model="formData.userName" type="text" id="userName" name="userName" placeholder="Nom d'utilisateur" class="form-control" required minlength="3" />
                        <div class="invalid-feedback">
                            Merci de saisir un nom d'utilisateur.
                        </div>
                    </div>
                </div>                         
                <div class="col-sm-12">
                    <div class="form-group">
                        <label for="password">Mot de passe</label>
                        <input v-model="formData.password" type="password" id="password" name="password" placeholder="Mot de passe" class="form-control" required minlength="8" />
                        <div class="invalid-feedback">
                            Merci de saisir un mot de passe contenant au minimun 1 majuscule, 1 miniscule et un symbole.
                        </div>
                    </div>
                </div>
                <div class="col-sm-12">
                    <div class="form-group">
                    <label for="bio">Biographie</label>
                    <input v-model="formData.bio" type="text" class="form-control" id="bio" name="bio" placeholder="Décrivez-vous en quelques mots">
                    </div>
                </div>

              <!--
                <div class="form-group">
                                
                  <input type="file"   accept="image" id="photo" name="photo" ref="myFiles" @change="previewFiles" multiple>
                </div>          
                <div class="col-sm-12">
                 <div class="float-right">
                    
                 </div>
              </div>-->

                    <button  value="valider" id="validation" class="btn btn-danger rounded-0" type="submit" >Valider</button>
                 
               
             </div>                   
           </form>
         </div>
       </div>
     </div>
   </div>
 </section>
</template>

<script>
import axios from 'axios'

export default {
    name:"SignUpForm",
    data(){
      return {
       formData: {
         email: null,
         userName: null,
         password: null,
         bio: null,
         isAdmin: false,
         photo: "avatar.png",        
      }}
    },
    methods: {
      postForm(e) {
        axios.post('http://localhost:3000/api/users', this.formData)
        .then((response) => {
          console.log(response)
        });
        e.preventDefault();
      },
      validate(){
        this.response.data.status = "success"
      }
    }
}
</script>

<style>
body{
    margin-top: 70px;
}

</style>