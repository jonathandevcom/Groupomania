<template>
 <div>
<h1 id="title">Bienvenue sur votre réseau social</h1>


<section class="container py-5">
            <div class="row">

                <div class="offset-md-0 col-md-5 place-form">
                    <div class="card">
                        <div class="card-header bg-primary text-white">
                            <h4 class="card-title text-uppercase text-center">Connexion</h4>
                        </div>
                        <div class="card-body">
                            <form id="needs-validation" novalidate>
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-xs-12">
                                        <div class="form-group">
                                            <label for="username">Nom d'utilisateur</label>
                                            <input type="text" id="username" name="username" placeholder="Nom d'utilisateur"
                                                class="form-control" required minlength="3"/>
                                            <div class="invalid-feedback">
                                                Merci de saisir votre nom d'utilisateur.
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-12 col-xs-12">
                                        <div class="form-group">
                                            <label for="password">Mot de passe</label>
                                            <input type="text" id="password" name="password" placeholder="Mot de passe"
                                                class="form-control" required minlength="3"/>
                                            <div class="invalid-feedback">
                                                Merci de saisir votre mot de passe.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-12 col-xs-12 mt-2">
                                        <div class="float-right">
                                            <button value="valider" id="validation" class="btn btn-primary rounded-0"
                                                type="submit">Connexion</button>
                                        </div>
                                        <div class="float-left">
                                            <button value="signUp" id="signUp" class="btn btn-primary rounded-0"
                                                type="submit"><router-link to="/SignUpForm">Inscription</router-link></button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <img src="../assets/web.png" alt="image web">
                </div>
        </section>



 </div>
</template>


<script>
export default {
    name:"Home",
}
</script>

<style>
body{
    margin-top: 70px;
    font-family: 'Brawler', serif;
    /* background-image: url("../assets/icon-above-font.png");
    background-repeat:no-repeat;
    background-attachment:fixed;
    background-position: right top; */
    /* background: rgba(17,37,65,0.1); */
/* background: linear-gradient(90deg, rgba(15,12,41,0.4) 0%, rgba(48,43,99,0.2) 50%, rgba(36,36,62,0.4) 100%); */
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
    margin-top: 100px;
    text-align: center;
}
.card{
    background: rgba(17,37,65,0.1);
    border: rgb(17,37,65);
}
.card-header{
    background-color:rgb(17,37,65)!important;
}
.img{
    float: right;
}
.place-form {
    margin-top: 80px;
    margin-right: 150px;

}

</style>