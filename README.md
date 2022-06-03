# SETHEMES ![](titre.png) #
**jeu SET à thèmes**

### VIDEO DEMO ###
- le mode solo : ![](youtube.png)https://youtu.be/lji-momJNao
- le mode duo : ![](youtube.png)https://youtu.be/A-XaFCndDwA

### FONCTIONNALITES ###
- authentification via le compte *Google* de l'utilisateur
- choix de la *langue* : fr/en/russe
- choix de la *difficulté* : débutant/avancé
- choix du *thème* : poissons/pommes/classique/bonbons/...
- choix du *challenge* : max de sets en 3minutes / 5(ou 10) sets en temps minimal / 2joueurs
- mode *solo* : score, timer, possibilité de revenir à l'accueil, de reprendre la partie depuis le début, de demander de l'aide (on perd 20secondes), accès au statistiques des records battus
- mode *duo* : liste de contacts à partir de la liste des membres inscrits, possibilité de défier un ami en duel (il accepte / refuse), buzzer, mise en pause automatique de la partie si un des 2 joueurs se déconnecte, possible de reprendre une partie en cours, accès aux statistiques des duels gagnés et/ou perdus.

### TECHNOLOGIES ###
- front-end : framework **ANGULAR** ![](angular.png) (HTML-SCSS-TYPESCRIPT) pas de framework css
- Back-end et déploiement : **FIREBASE** ![](firebase.png)  (authentification via Google , database realtime, hosting : https://setheme-69d4d.firebaseapp.com/ faire F12 et mode Mobile (responsivité écran web en cours...))
- l'app est une **PWA** (Progressive Web App) : installable sur le homescreen Mobile (manifest.json), caching (service worker), notifications push (quand on reçoit un défi au duel, si on est déconnecté)

### LANCER L'APP EN LOCAL ###
- npm init
- npm i @angular/cli
- ng serve
