# TIATIL00S

## Projekt Idé
En applikation skriven i JavaScript (NodeJS) som combinerar alla text filer från ett direktiv och genererar en ny text fil med alla poster från alla inlästa text filer, sorterade alfabetiskt utan duplikat poster.

Det ska vara ett CLI (Command Line Interface) program som tar emot två argument. Det första är sökvägen till det direktiv som innehåller de text filer man vill combinera. Det andra argumentet är sökvägen till den output filen som ska genereras.

Programmet ska förvänta sig att text filen är formaterad på sådant sätt att varje post är en ny rad.

Programmet ska då combinera alla poster från alla inlästa text filer, hitta och ta bort duplikat poster. Sedan ska programmet sortera alla poster alfabetiskt.

Programmet ska också kunna visa vilken framdrift den är på samt hur många duplikater som har hittats.

Slut resultatet är en text fil med alla poster från alla text filer i det angivna direktivet, sorterad alfabetiskt och utan duplikat poster.
