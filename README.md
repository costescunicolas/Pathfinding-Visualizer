# Pathfinding Visualizer

Acest proiect este un instrument interactiv dezvoltat în React pentru vizualizarea algoritmilor de căutare a drumului cel mai scurt și a algoritmilor de generare a labirinturilor. Utilizatorul poate selecta diverși algoritmi, poate genera labirinturi complexe și poate observa în timp real procesul de explorare a nodurilor.

## Caracteristici Principale

### 1. Algoritmi de Căutare (Pathfinding)
Proiectul include implementări pentru trei algoritmi fundamentali de explorare a grafurilor:
* **BFS (Breadth-First Search):** Garantează găsirea drumului cel mai scurt într-un graf neponderat.
* **DFS (Depth-First Search):** Explorează cât mai adânc posibil ramurile înainte de a face backtracking (nu garantează drumul cel mai scurt).
* **A-Star (A*):** Un algoritm euristic eficient care folosește distanța Manhattan pentru a ghida căutarea către destinație.

### 2. Generare de Labirint
* **DFS Maze:** Utilizează un algoritm de tip Depth-First Search cu backtracking pentru a genera labirinturi aleatorii.

### 3. Interfață Utilizator (UI)
Interfața permite controlul total asupra vizualizării:
* **Selecție Algoritm:** Un meniu drop-down pentru alegerea între BFS, DFS și A-Star.
* **Control Vizualizare:** Butoane pentru pornirea algoritmului ("Start") și resetarea grilei ("Reset").
* **Generare Labirint:** Buton dedicat pentru crearea instantanee a unui labirint pe grid.

## Tehnologii Utilizate
* **React 19:** Biblioteca principală pentru construirea interfeței.
* **Vite:** Instrument pentru build și mediu de dezvoltare rapid.
* **JavaScript (ES6+):** Logica algoritmilor și gestionarea stării
