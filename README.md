# Appli météo avec Ionic

## Géolocalisation

Dans la page settings, on va ajouter un nouveau bouton "Me géolocaliser".
Au clic, on devra utiliser un module Ionic Geolocation https://ionicframework.com/docs/native/geolocation.
Grâce au module, on récupére la latitude et la longitude de l'utilisateur.
Pour récupérer la ville de l'utilisateur, on fera une requête sur l'API :
- https://api-adresse.data.gouv.fr/reverse/?lat=XXXX&lon=XXXXXX
On pourra donc ensuite enregistrer la ville dans le storage.
