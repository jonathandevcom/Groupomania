<template>
<section class="container py-5">
  <div class="row">
    <div class="offset-md-2 col-md-8 offset-md-2">
      <div class="card">
        <div class="card-header bg-danger text-white">
            <h4 class="card-title text-uppercase">Inscription</h4>
        </div>
          <div class="card-body">
            <form id="needs-validation" novalidate>
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
                        <input v-model="formData.password" type="text" id="password" name="password" placeholder="Mot de passe" class="form-control" required minlength="8" />
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
                <div class="form-group">
                                <!-- <input type="file" accept="image/*" #imageInput (change)="onFileAdded($event)"> -->
                                <!-- <button class="btn-danger rounded-0" mat-raised-button (click)="imageInput.click()">Ajouter une image</button> -->
                                <!-- <img [src]="imagePreview" *ngIf="imagePreview"
                                    style="max-height: 100px;display:block;margin-top:10px"> -->
                  <input type="file" accept="image">
                </div>          
                <div class="col-sm-12">
                 <div class="float-right">
                    <button v-on:click.prevent="postForm()" value="valider" id="validation" class="btn btn-danger rounded-0" type="submit">Valider</button>
                 </div>
               </div>
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
         email: "",
         userName: "",
         password: "",
         bio: "",
         isAdmin: false,
         photo: "",        
      }}
    },
    methods: {
      postForm() {
        axios.post('/', 
          `${this.formData}`
        )
        .then(function(response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        })
      }
    }
}
</script>

<style>
body{
    margin-top: 70px;
}
</style>