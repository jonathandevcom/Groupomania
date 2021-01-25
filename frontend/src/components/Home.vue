<template>

 <div>
<h1 id="title">Bienvenue sur votre réseau social</h1>

<section class="container py-5">
            <div class="row">
                <div class="mx-auto">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4 class="card-title text-uppercase text-center">Connexion</h4>
                        </div>
                        <div class="card-body">
                            <form action="*" @submit.prevent="login" method="post" id="needs-validation" novalidate>
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
                                            <button  value="signIn" id="signIn" class="btn btn-primary rounded-0" action="/Forum"
                                                type="submit">Connexion</button>
                                        </div>
                                        <div class="float-right">
                                            <router-link to="/SignUpForm">Inscription</router-link>
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
    name:"Home",
    data() {
        return{

        userName: "",
        password: "",
    }
    },
methods: {
    async login() {
        const response = await axios.post('http://localhost:3000/api/users/:id', {
            userName: this.userName,
            password: this.password,
        })


        console.log(response)
    

       
},
   // connection(){
 //       this.response.data.status = "success"
 //     }
      }
}

</script>

<style scoped>
body{
    margin-top: 70px;
    font-family: 'Brawler', serif;

    align-items: center;
    background : no-repeat center url(../assets/fond.jpg);
    /* background-image: url("../assets/icon-above-font.png");
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position: right top; */
    /* background: rgba(17,37,65,0.1); */

}
#validation{
    background-color:  rgb(17,37,65)!important;;
    border:   rgb(17,37,65)!important;
}
#signUp{
    background-color:  rgb(0,129,97)!important;;
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