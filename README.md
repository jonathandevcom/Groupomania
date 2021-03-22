# Groupomania

Projet 7 de ma formation développeur web avec OpenClasRooms.

Pour accéder au mon projet, il faut :

1. Installer nodeJS : NodeJS.org

2. Cloner le repositorie.

3. Télécharger XAMPP :
    * Dans Control Panel
        * Apache : start
        * MySql : start et admin
        * Dans phpMyAdmin : 
            * créer la table : groupomania
            * glisser le fichier groupomania.sql

4. Sur la partie frond end : 
* installer : npm install vue
* lancer : npm run serve

5. Sur la partie backend :
* npm init
* npm i bcrypt body-parser dotenv express express-rate-limit helmet jsonwebtoken multer mysql password-validator
* lancer : node server