# bookplaceApplication
Applikationen fungerer fungerer som en simpel marketplace, med fem views (Loginscreen, homescreen, userprofile, bookpage, bookmaps) og inkorporerer Google Maps med Google's Geocodign API. Der bruges Firebase til at håndtere user authentication, samt database-funktionalitet (upload en bog). Bøger uploades med titel, pris, kvalitet (dropdown), burger-id (skal ikke indtastes af brugeren), samt adresse - adressen bliver så via Geocoding omskrevet til Longitutde + latitude, for at give koordinater til Google Maps som returnerer adressen på kortet (Præcisisonen af adresse --> koordinater, er ikke rigtigt blevet testet). 

OBS: Før at Google maps funktionaliteten vil kunne køre, skal der bruges en Geocoding API key - jeg har fjernet min egen


LINK TIL VIDEO AF KØRENDE APP: https://www.youtube.com/watch?v=W5Bibb9wPq0
