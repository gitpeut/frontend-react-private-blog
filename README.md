# Opdrachtbeschrijving

## Inleiding
Je gaat een bloggingplatform bouwen waarbij sommige url's niet toegankelijk zijn voor gebruikers die niet zijn ingelogd. Je gaat ook concepten als doorlinken, dynamische parameters en een nep-login toepassen. De "login"-funtionaliteit is voor deze opdracht expres versimpelt. 

## Applicatie starten
Als je het project gecloned hebt naar jouw locale machine, installeer je eerst de `node_modules` door het volgende commando in de terminal te runnen:

`npm install`

Wanneer dit klaar is, kun je de applicatie starten met behulp van:

`npm start`

of gebruik de WebStorm knop (npm start). Open http://localhost:3000 om de pagina in de browser te bekijken. Begin met het maken van wijzigingen in `src/App.js`: elke keer als je een bestand opslaat, zullen de wijzigingen te zien zijn op de webpagina.

## Randvoorwaarden blogging platform

**Belangrijk:** Zorg dat de applicatie functioneel is voor je los gaat met styling!

#### Pagina's
* De applicatie heeft vier pagina's:
    1. Home pagina (`/`)
    2. Login pagina (`/login`)
    3. Blog overzicht pagina (`/blogposts`)
    4. Blog-post pagina (`/blog/:id`)
* De login pagina bevat simpelweg een knop met "Inloggen" die de gebruiker inlogt en daarna doorstuurt naar overzichtspagina
* De blog overzicht pagina bevat: de totale hoeveelheid posts en alle blog-titels. Bij het klikken op de titel wordt de gebruiker naar de betreffende post gelinkt.
* De blog-post pagina is een component dat op basis van de url de juiste blogpost ophaalt uit de JSON data, en deze weergeeft (_dynamic parameters_). De JSON data kun je simpelweg importeren en gebruiken als een array met objecten:

```javascript
import posts from './data/posts.json';

function App() {
  console.log(posts);
  
  return (
    <></>
  );
}
```
 
#### Navigatie
* De navigatiebalk is boven iedere pagina zichtbaar    
* Wanneer de bezoeker _niet_ ingelogd is, moet er een "inloggen" link in de navigatie aanwezig zijn. Deze wijst naar de Login pagina.
* Wanneer de bezoeker _niet_ ingelogd is, is de link naar de blog-overzichtpagina niet aanwezig.
* Als een bezoeker _wel_ ingelogd is, moet er een "uitloggen" link in de navigatie staan. De gebruiker wordt dan direct uitgelogd en naar de home-pagina gestuurd.

#### Toegankelijkheid
* Wanneer de bezoeker _niet_ ingelogd is, zijn zowel de blogposts als de blog overzichtpagina niet te bezoeken. Dit zijn dus private routes!
* Het in- en uitlog proces is simpelweg het toggelen van de `isAuthenticated` state van `true` naar `false`. Je zult de waarde en setter-functie dus vanaf App.js moeten doorgeven aan de componenten die deze waardes nodig hebben.

## Stappenplan
1. Maak vier pagina componenten en zet er wat dummy content op. Geef alle "pagina's" weer in `App.js`
2. Installeer `react-router-dom` en zet de basis routing op in de applicatie (gebruik de [documentatie](https://reactrouter.com/web/guides/quick-start) of EdHub als geheugensteuntje). Zorg dat je alle pagina's kunt bezoeken. Je hoeft nog geen rekening te houden met toegankelijkheid.
3. Implementeer de navigatie (zonder rekening te houden met toegankelijkheid) zodat alle links werken.
4. Geef alle blogpost-titels weer in de overzichtpagina en zorg ervoor dat de titels klikbaar zijn en naar die blogpost wijzen.
5. Zorg ervoor dat je de dynamische `id` op de blogpost pagina uit de url haalt, en op basis van die `id` de juiste post laat zien.
6. Tijd om onze applicatie te beveiligen! Zorg ervoor dat de menu-navigatie de juiste items laat zien, op basis van de waarde uit `isAuthenticated`
7. Zorg er nu voor dat als de gebruiker op de 'inlog'-knop klikt, de `isAuthenticated` state naar `true` veranderd wordt en de gebruiker wordt doorgestuurd naar de overzichtspagina.
8. Zorg er ook voor dat als de gebruiker op de 'uitlog'-knop in de navigatie klikt, de `isAuthenticated` state naar `false` veranderd wordt en de gebruiker wordt doorgestuurd naar de homepagina.
9. Zorg ervoor dat de overzichts- en post pagina's niet toegankelijk zijn voor gebruikers die niet zijn ingelogd doormiddel van een `<Redirect>` component.
10. Maak hier nu een apart `<PrivateRoute>` component voor die je kunt hergebruiken!

## Bonus opdrachten
* Make it look nice!
* Voeg een React hook form toe aan de login pagina waar de gebruiker ook daadwerkelijk gegevens kan invullen. Je kunt dan een `users.json` bestand maken met gebruikers erin, zodat je iemand daadwerkelijk kunt laten "inloggen" met een bestaand account.

