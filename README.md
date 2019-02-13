# TIATIL00S Projekt: Txtmerge

## Idé
En applikation skriven i JavaScript (NodeJS) som combinerar alla text filer från ett direktiv och genererar en ny text fil med alla poster från alla inlästa text filer, sorterade alfabetiskt utan duplikat poster.

Det ska vara ett CLI (Command Line Interface) program som tar emot två argument. Det första är sökvägen till det direktiv som innehåller de text filer man vill combinera. Det andra argumentet är sökvägen till den output filen som ska genereras.

Programmet ska förvänta sig att text filen är formaterad på sådant sätt att varje ny rad är en post.

Programmet ska då combinera alla poster från alla inlästa text filer, hitta och ta bort duplikat poster. Sedan ska programmet sortera alla poster alfabetiskt.

Programmet ska också kunna visa vilken framdrift den är på samt hur många duplikater som har hittats.

Slut resultatet är en text fil med alla poster från alla text filer i det angivna direktivet, sorterad alfabetiskt och utan duplikat poster.

Programmet ska även kunna konvertera slut resultatet till en SQL fil/sats som man kan sedan köra för att mata in den data till en tabell i en databas. Det ska även kunna konvertera till en CSV fil som man kan importera den data till Excel liknande program. Denna operation ska vara frivilig och kunna togglas med en flagga. Denna operation ska kunna väljas att köras på en redan genererad text fil, eller efter att en ny text fil är genererad.

Programmet ska ska kunna konvertera inläst data till små bokstäver om en flagga finns. Så att alla poster i slut resultatet är i små bokstäver.

## Installation
Krav:
* NodeJS
* npm (Node Package Manager)

**Installera nödvändiga paket**
```
$ npm install
```

## Anvädning
**Kör skriptet**
```
$ node txtmerge --source="path/to/directory" --output="path/to/output.txt"
```

## Tillfälles utvärdering
##### [2019-01-09] Tillfälle 1
Jag har hittat fram ett problem och kommit fram med en idé om vad projektet ska vara för att lösa det. See [**Idé**](#Idé) ovan.

##### [2019-01-16] Tillfälle 2
Jag utvecklar idén vidare. Jag tänker att det kanske är bra om programmet också kan konvertera slut resultatet till en SQL sats som man kan köra, och till en CSV fill som man kan importera till Excel liknande programvaror. Denna funktion ska inte vara nödvändig och ska vara helt frivilig operation som man kan välja att ha med, med en flagga när man kör programmet.

En annan idé slog till mig att det kanske skulle vara bra om man kunde välja hur duplikater sköts, med en flagga. Skiftlägeskänslig tänker jag mig att det ska vara standard läget. Sedan ska man kunna välja ett skiftlägesokänsligt läge för duplikata poster. Så programmet i skiftlägeskänsligt läge kommer flagga `Adam` och `Adam` som duplikater men inte `Adam` och `adam`. Skiftlägesokänsligt läge kommer flagga båda exemplen som duplikater.

Med tanken på det, ett val för att konvertera alla poster till små bokstäver skulle vara anvärtbart. Det blir lite av en swiss kniv, men tanken är att detta programmet ska köra det så enkelt som möjligt för att hantera och slå ihop data i flera text filer.

Jag kommer behöva en node modul som gör det enklare för mig att hantera process argument/parametrar. [argparse](https://www.npmjs.com/package/argparse) verkar uppfylla mina krav.

##### [2019-01-25] Tillfälle 3
Nu ska jag börja koda applikationen. Men första måste jag göra ett val. Jag kan skapa en NodeJS applikation med att bara använda JavaScript filer. Men om jag vill installera moduler som någon annan har gjort, så som argparse. Då är det lättaste att skapa ett NPM (Node Package Manager) projekt. Det gör man genom att köra `npm init`. Där efter konfigurerar jag package.json filen och skapar min applikatons fil, som jag döpte till txtmerge.js.

I och med att jag arbetar med filer i mitt program, så vet jag att jag kommer behöva använda mig av en modul inbyggt i NodeJS som heter File Sytem. Den laddar jag in och sparar som en constant. Vad den här modulen låter mig göra är att hantera fil systemet på datorn. Med andra ord, skapa och läsa filer/direktiv.

Nu när jag har mitt projekt upsatt, så kan jag börja klura på hur jag ska skriva programmet. Det smartaste just nu, är att skriva absolut minmal kod för att uppnå kärn funktionaliteten. Alltså, Läsa in filerna, sätta ihop dem, och skriva ut den nya ihop satta listan till en ny fil.

Jag sparar sökvägen till direktivet som innehåller min exempel data, till en variabel. Så att jag kan enkelt referera till den senare. Sedan skrev jag en funktion som hämtar alla filer i ett direktiv, men inte läser in deras data. Seden filtrerar jag bort alla filer som inte är en text fil. Det vill säga alla filer som inte sluter med `.txt`. Jag märkte snabbt att det skulle vara bäst att kolla om sökvägen är ett direktiv, eftersom `readdirSync` funktionen från filsystem modulen slänger ett error om det inte är ett direktiv. Detta gjorde jag till en egen funktion.

Jag sparar namnet på alla text filer i en constant, som då är en samling/array med namnen. Jag skapar två nya variabler. En för att hålla koll på hur många duplikater som har hittats. Och en för att bygga resultatet till. Duplikaterna är en integer som då inkrimenteras när en dupikat post har tagits bort. Resultatet är en samling/array av posterna.

Jag loopar genom varje fil och läser in dem en för en. Jag splitrar innehållet på nya rader, så att varje ny rad är en egen post i en samling. Sedan går jag igen den och tar bort poster som är tomma rader och jämnför posterna med posterna i resultat samlingen. Om det finns en träff, då tar jag bort den posten från den aktiva inlästa samlingen innan den slås ihop med resultatet.

När programmet har gått igenom alla filer, då sorterar jag resultat samlingen med den inbyggda sorterings funktionen inbyggd i JavaScriptets Array objekt. Om alla poster är strängar, då sorterar den alfabetiskt som standard. Jag får ut en ny samling som är den sorterade samlingen av resultatet.

Den samlingen av resultatet bygger jag om till en sträng igen, där varje post är en ny rad. Detta uppnår jag med inbyggda array funtionen join.

Den strängen kan jag då skriva till en fil med hjälp av `writeFileSync`. Om inte filen existerar, så skapar den en ny fil åt mig, och sparar ner den datan jag skickar in till den till filen.

Nu har jag uppnåt grund funktionaliteten för mitt program. I nästa tillfälle kan jag börja lägga till lite extra funktioner som omhandlar data på olika sätt.

##### [2019-01-30] Tillfälle 4
Jag började med att installera argparse, och skapa en separat JavaScript fil för att pröva på hur argparse modulen fungerar. Tyvärr verkar det inte som att den modulen stöder att ha plan text som ett argument. Jag ville bara kunna skriva sökvägen för direktivet och resultat filen i första och andra argumenten. Men man får helt enkelt bara stoppa ner dem i flaggor istället. Exempel: `-s="path/to/files" -o="output.txt"`. `-s` motsvarande Source och `-o` motsvarande Output. Man kan också skriva `--source` och `--output`. Jag skulle kunna fixa det med att parsa argumenten själv. Men modulen gör det mycket enklara att arbeta med flaggor, som kan styra hur programmet slår ihop data från filerna.

## Slutlig utvärdering
Det har gått fel fritt. Men jag har inte arbetat med uppgiften tillräckligt för att utföra hela planneringen. Jag har missat att lägga till extra flaggor för att hantera processen. Så som att konvertera om till små bokstäver och olika merge lägen. Men koden är enkel att utveckla vidare och dela upp.
