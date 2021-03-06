# Groupomania

## Pour installer le projet, veuillez suivre les instructions ci-dessous

***Ce projet nécessite l'installation de Node.js ainsi que d'un environnement de développement tel que Wamp (pour Windows) ou Mamp (pour MacOS) pour l'utilisation d'une base de données MySQL.***

---

1. Cloner le repository
```
git clone https://github.com/tom-texier/TomTexier_7_12042021.git
```
2. Se rendre dans le répertoire `backend`
```bash
cd TomTexier_7_12042021/backend
```

3. Installer les dépendances
```js
npm install
```

4. Se rendre dans le répertoire `frontend`
```bash
cd ../frontend
```

5. Installer les dépendances
```js
npm install
```

6. Démarrer le serveur local pour accéder à phpmyadmin

7. Créer une base de données

8. Onglet “Importer“, téléverser le fichier `BDD.sql` disponible à la racine du projet

9. Vérifier que les 3 tables suivantes ont été créées :
    - users
    - posts
    - likes

10. Dans le dossier `backend` du projet, copier le fichier `.env-sample` et le nommer `.env`

11. Ajouter les valeurs manquantes :
    - JWT_SECRET_TOKEN : Clé pour la génération de token d'authentification
    - DB_HOST : Hôte de la base de données *(ex. localhost)*
    - DB_USER : Utilisateur de la base de données *(ex. root)*
    - DB_PASSWORD : Mot de passe de la base de données *(ex. root)*
    - DB_NAME : Nom de la base de données *(ex. groupomania)*

12. Ouvrir un terminal et se rendre dans le dossier `backend` avec la commande *`cd`*

13. Démarrer le serveur
```js
nodemon server
```
Une fois terminé, vous devriez voir :
```js
Listening on port 3000
Connexion à la base de données établie !
```

14. Ouvrir un deuxième terminal et se rendre dans le dossier `frontend` avec la commande *`cd`*

15. Démarrer le service de *`Vue`*
```js
npm run serve
```
Une fois terminé, vous devriez voir :
```
DONE Compiled successfully in 3687ms

App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.24:8080/

Note that the development build is not optimized.
To create a production build, run npm run build.
```

16. Vous pouvez dès maintenant accéder à [`http://localhost:8080/`](http://localhost:8080/)