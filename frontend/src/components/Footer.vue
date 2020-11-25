<template>
    <footer>
   <div class="contenu">
    <a class="acces" href="Règlement interieur.html">Règlement intérieur</a>
    <a class="acces" href="mailto:admin@groupomania.com">Contactez-nous</a>
    </div>
    </footer>
</template>

<script>
export default {
    setup() {
        
    }
}
</script>

<style scoped lang="scss">

    footer { 
    background-color: rgb(17,37,65);
    height: 100px; 
    font-size: 1.4em;  
    padding-top: 40px;
   }

    .contenu {
      justify-content: space-between;
      display: flex;
      margin-left: 30px;
      margin-right: 30px;
    }

    .acces{
    text-decoration: none;
    color: white;
    }

    @media screen and (max-width: 600px){
        header { 
        height: 50px;   
        }
        }
    </style>