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

**Kör skriptet**
```
$ npm start
```

## Anvädning

## Tillfälles utvärdering
##### [2019-01-09] Tillfälle 1
Jag har hittat fram ett problem och kommit fram med en idé om vad projektet ska vara för att lösa det. See [**Idé**](#Idé) ovan.

##### [2019-01-16] Tillfälle 2
Jag utvecklar idén vidare. Jag tänker att det kanske är bra om programmet också kan konvertera slut resultatet till en SQL sats som man kan köra, och till en CSV fill som man kan importera till Excel liknande programvaror. Denna funktion ska inte vara nödvändig och ska vara helt frivilig operation som man kan välja att ha med, med en flagga när man kör programmet.

En annan idé slog till mig att det kanske skulle vara bra om man kunde välja hur duplikater sköts, med en flagga. Skiftlägeskänslig tänker jag mig att det ska vara standard läget. Sedan ska man kunna välja ett skiftlägesokänsligt läge för duplikata poster. Så programmet i skiftlägeskänsligt läge kommer flagga `Adam` och `Adam` som duplikater men inte `Adam` och `adam`. Skiftlägesokänsligt läge kommer flagga båda exemplen som duplikater.

Med tanken på det, ett val för att konvertera alla poster till små bokstäver skulle vara anvärtbart. Det blir lite av en swiss kniv, men tanken är att detta programmet ska köra det så enkelt som möjligt för att hantera och slå ihop data i flera text filer.

Jag kommer behöva en node modul som gör det enklare för mig att hantera process argument/parametrar. [argparse](https://www.npmjs.com/package/argparse) verkar uppfylla mina krav.
