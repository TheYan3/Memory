# DESIGN_SPEC.md – Memory (1:1 Figma-Umsetzung)

Referenz für die pixelgenaue Umsetzung. Quelle: Figma „Memory". Alle Frames sind **1440 × 1024 px** (Desktop-Artboard). Layout in allen Themes identisch – es ändern sich nur Hintergrund, Akzentfarbe, Karten-Motive und Button-Stil.

---

## 1. Globales Designsystem

### Farb-Tokens (Basis)
| Token | Wert | Verwendung |
|---|---|---|
| `primary-dark` | `#303131` | Dunkler Hintergrund (Home, Code-vibes, Gaming, Game-over/Winner/Draw) |
| `secondary-yellow` | `~#F4D738` | Play- / Start-Button, gelbe Akzent-Linien |
| `white` | `#FFFFFF` | Heller Hintergrund (Settings, DA-Projects, Foods) |

> Exakte Hex bitte am Screenshot / an den exportierten Assets feinjustieren. Karten-Hintergründe sind Bild-Füllungen und kommen direkt aus den exportierten Motiven.

### Theme-Akzentfarben (Näherung, an Screenshots matchen)
| Theme | Hintergrund | Akzent | Motiv-Welt |
|---|---|---|---|
| `code-vibes` | dunkel `#303131` | Türkis `~#34D3B0` | Programmier-Logos (HTML, CSS, JS, Git, Python, Vue, GitHub, VS Code …) |
| `gaming` | dunkel `#303131` | Magenta/Pink `~#D81E73` | Gaming (Joystick, Würfel, Pac-Man-Geist, Münze …) |
| `da-projects` | hell `#FFFFFF` | Blau `~#2C82C9` | DA-Projekt-Motive (Rakete, Cupcake, Diamant …) |
| `foods` | hell, creme `~#FCEFE0` | Orange `~#F2922E` | Food (Burger, Croissant, Pizza, Eis …) |

### Typografie
- Eine kräftige, runde Sans-Serif (Figma nutzt sehr fette Headlines). Empfehlung: variable Sans wie „Poppins"/„Inter" fett. Headlines extra-bold, sehr groß.
- Headlines („Ready to play?", „Game over", „DRAW") nutzen leichten Glow/Schatten in Akzentfarbe.

### Buttons
- **Primary (gelb):** voll gefüllt `secondary-yellow`, dunkler Text, leicht abgerundet. (Play, Start)
- **Theme-Buttons:** gefüllt in Akzentfarbe ODER Outline in Akzentfarbe (siehe Pop-up: „Back to game" gefüllt, „Exit game" Outline).
- **Radio-Auswahl:** runde Radios; aktive Option bekommt zusätzlich einen gelben Pfeil-/Linien-Indikator rechts.

---

## 2. Screens

### 2.1 Home
- Hintergrund `primary-dark`.
- Großes, schwach sichtbares **Controller-Icon** zentriert im Hintergrund (Wasserzeichen). **Soll animiert sein** (sanftes Schweben/Puls/Wackeln – Checkliste US1: „Controller-Icon mit Animation").
- Text oben mittig: „It's play time." (kleiner, weiß).
- Darunter sehr große Headline „Ready to play?" (weiß, extra-bold).
- Mittig darunter **Play-Button** (gelb) mit Gamepad-Icon + Pfeil „Play →".
- Klick auf Play → Settings-Screen.

### 2.2 Settings (Layout für alle Themes identisch, weißer BG)
- Titel „Settings" oben links, groß, dunkel, mit gelber Akzent-Linie/Raute darunter.
- **Linke Spalte** (drei Gruppen mit kleinem farbigem Icon vor dem Titel):
  1. **Game themes** (Paletten-Icon): Radios „Code vibes theme", „Gaming theme", „DA Projects theme", „Foods theme". Aktiv = gefülltes Radio + gelber Pfeil rechts.
  2. **Choose player** (Spieler-Icon): Radios „Blue", „Orange".
  3. **Board size** (Raster-Icon): Radios „16 cards", „24 cards", „36 cards".
- **Rechte Spalte:** Theme-Vorschau – ein In-Game-Header-Streifen (Score Blue/Orange, „Current player", „Exit game") über einer Karten-Vorschau-Grafik des gewählten Themes. Vorschau wechselt mit der Theme-Auswahl.
- **Unten:** Breadcrumb-Leiste „Game theme / Player / Board size" + **Start-Button** (gelb, mit Play-Icon). Start → Spielfeld.

### 2.3 Spielfeld (Game)
- Hintergrund = Theme-Hintergrund (dunkel oder hell).
- **Header oben (volle Breite):**
  - Links: Score-Box „Blue ⟨n⟩  Orange ⟨n⟩" (Spielerfarben-Badges + Zahl).
  - Mitte: „Current player:" + Badge in aktueller Spielerfarbe.
  - Rechts: **Exit-game-Button** (Stil je Theme; dunkle Themes = Outline hell, helle Themes = Outline/gefüllt in Akzent).
- **Grid zentriert** unter dem Header:
  - 16 cards = **4×4**, 24 cards = **4×6** (4 Spalten, 6 Reihen bzw. wie Figma), 36 cards = **6×6**.
  - Karten quadratisch, abgerundete Ecken, dezenter Schatten, gleichmäßiger Abstand (gap). Grid bleibt zentriert, Kartengröße skaliert mit Boardgröße so, dass alles ohne Scrollen passt.
  - **Rückseite** = Theme-Karten-Back (einfarbiger Akzent-Verlauf mit dezentem Theme-Symbol). **Vorderseite** = eines der 18 Theme-Motive.
- **Flip:** vorhandene 3D-Flip-Logik nutzen (`is-flipped`), flüssige Animation.

### 2.4 Pop-up „Exit game?" (Modal)
- Zentriertes Modal auf abgedunkeltem Overlay. Box ~540 × 270 px, weißer Hintergrund, abgerundet.
- Headline „Are you sure you want to quit the game?".
- Zwei Buttons nebeneinander: **„Back to game"** (gefüllt, Akzentfarbe) schließt Modal; **„Exit game"** (Outline, Akzentfarbe) → zurück zum Home/Settings.
- Erscheint bei Klick auf „Exit game" im Spielfeld-Header.

### 2.5 Game over (Zwischenscreen)
- Theme-Hintergrund (dunkel). Große Headline „Game over" (Akzentfarbe, Glow).
- Darunter „Final score" + Score-Badges „Blue ⟨n⟩  Orange ⟨n⟩".
- **Auto-Übergang nach 1200 ms** → Winner- bzw. Draw-Screen, animiert (Slide-in von oben, Ease-out, ~500 ms).

### 2.6 Winner
- Theme-Hintergrund. Oben **Konfetti** (Banner-Grafik/Animation).
- Text „The winner is" + „⟨BLUE|ORANGE⟩ PLAYER" in Spielerfarbe.
- Großes **Spielerfiguren-Icon** (Bauer/Pawn) in Spielerfarbe (blau oder orange).
- **Back-to-start-Button** (Akzentfarbe) → Home.

### 2.7 Draw (Unentschieden)
- Theme-Hintergrund. Headline „It's a DRAW" (Akzent, Glow).
- **Waage-Icon** (Akzentfarbe). **Back-to-start-Button** → Home.

---

## 3. Screen-Flow / State

```
Home --Play--> Settings --Start--> Game
Game --Exit game--> Pop-up --Exit--> Home
Game --letztes Paar gefunden--> Game over --(1200ms)--> Winner (oder Draw)
Winner/Draw --Back to start--> Home
```

**State, der über Screens gehalten wird:** gewähltes Theme, Spielerfarbe-Start (Blue/Orange), Boardgröße, Punktestände beider Spieler, aktueller Spieler.

---

## 4. Spiellogik (US4 / US5)

- Deck = (Anzahl Karten / 2) Paare aus dem Motiv-Set des Themes, gemischt.
- Zwei Karten aufdecken: bei Match bleiben sie offen, **aktiver Spieler bekommt Punkt und ist erneut dran**; kein Match → beide nach kurzer Verzögerung zudrehen, **Spielerwechsel**.
- Während der Vergleichs-Verzögerung Klicks sperren.
- Score-Anzeige + „Current player" live aktualisieren.
- Alle Paare gefunden → Game-over → Vergleich der Scores → Winner (höherer Score) oder Draw (gleich).

---

## 5. Benötigte Assets (aus Figma „Components"-Seite exportieren)

Zielordner: `assets/img/`. Format SVG bevorzugt (Icons), sonst PNG @2x/@3x.

**Gemeinsam (Shared):**
- `controller.svg` – großes Controller/Gamepad-Icon (Home-Hintergrund + Play-Button-Icon)
- `player-blue.svg`, `player-orange.svg` – Spielerfiguren (Pawn) für Winner + Badges
- `confetti.svg|png` – Konfetti-Banner (Winner)
- `scales.svg` – Waage (Draw)
- Section-Icons Settings: `icon-palette`, `icon-player`, `icon-grid`

**Pro Theme je 18 Karten-Motive + 1 Karten-Rückseite:**
- `code-vibes/back.svg`, `code-vibes/01.svg … 18.svg`
- `gaming/back.svg`, `gaming/01 … 18`
- `da-projects/back.svg`, `da-projects/01 … 18`
- `foods/back.svg`, `foods/01 … 18`

> Tipp: In Figma auf der „Components"-Seite sind die Motive als benannte Komponenten („Code vibes card 1 … 18" usw.) vorhanden. Mehrfachauswahl + Export exportiert alle auf einmal mit ihren Namen.

> Für 4×4 werden 8 Motive gebraucht, 4×6 = 12, 6×6 = 18. Es genügt, pro Theme 18 Motive bereitzustellen; das Spiel nutzt je nach Boardgröße die ersten N.
