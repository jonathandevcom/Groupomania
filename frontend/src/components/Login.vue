<template>

 <div>
     <br>
<h1 id="title">Bienvenue sur votre réseau social</h1>

<section class="container py-5">
            <div class="row">
                <div class="mx-auto">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4 class="card-title text-uppercase text-center">Connexion</h4>
                        </div>
                        <div class="card-body">
                            <form action="*" @submit="login" method="post" id="needs-validation" novalidate>
                                <div class="row">

                                    <div class="col-sm-12 col-md-12 col-xs-12">
                                        <div class="form-group">
                                            <label for="username">Nom d'utilisateur</label>
                                            <input type="text" id="username" name="username" placeholder="Nom d'utilisateur"
                                                class="form-control" v-model="userName" required minlength="3"/>
                                            <div class="invalid-feedback">
                                                Merci de saisir votre nom d'utilisateur.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-xs-12">
                                        <div class="form-group">
                                            <label for="password">Mot de passe</label>
                                            <input v-model="password" type="password" id="password" name="password" placeholder="Mot de passe"
                                                class="form-control"  required minlength="8"/>
                                            <div class="invalid-feedback">
                                                Merci de saisir votre mot de passe.
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-xs-12 mt-2">
                                        <div class="float-left">
                                            <button  value="signIn" id="signIn" class="btn btn-danger rounded-0" action="/Forum"
                                                type="submit">Connexion</button>
                                        </div>
                                        <div class="float-right">
                                            <router-link to="/register">Inscription</router-link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
               
                </div>
        </section>

 </div>
</template>


<script>
import axios from 'axios'

export default {
    name:"Login",
    data() {
        return{

        userName: "",
        password: "",
    }
    },
methods: {
  /*  async login() {
        const response = await axios.post('http://localhost:3000/api/users/login', {
            userName: this.userName,
            password: this.password,
            
            


        })


        console.log(this.userName + response)
    
       
},*/
   // connection(){
 //       this.response.data.status = "success"
 //     }

    login(e){
        e.preventDefault();
        axios.post('http://localhost:3000/api/users/login', {
            userName: this.userName,
            password: this.password,
        })
        .then(function (response) {
            console.log(response);
            window.location.href = "/forum";
            
        })
        .catch(function (error) {
             let form = document.getElementById('needs-validation');
        if (form.checkValidity(event) === false) {
            event.preventDefault();
            event.stopPropagation();
             form.classList.add('was-validated');
          } else {
            alert(`Nom d'utilisateur ou mot de passe incorrect`)
          }
      console.log(error)
        })
    }


      }
}

</script>

<style>
.btn{
    background-color:  rgb(17,37,65)!important;;
    border:   rgb(17,37,65)!important;
}
#title{
    color: white;
    margin-top: 100px;
    text-align: center;
}
.card-header{
    background-color:rgb(17,37,65)!important;
}
.place-form {
    margin-top: 80px;
    margin-right: 150px;

}


@media screen and (max-width: 1200px){
.place-form {
    margin: 0;
}    
#imgWebHome {
    display:none;
}
}


</style>