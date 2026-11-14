# german-poster

## 🥨 Kulinarisches Deutschland | Das Interaktive Deutsche Essens-Poster (SPA)

Ein dynamisches, interaktives Single Page Application (SPA) Bildungsplakat zur deutschen Esskultur und den traditionellen Tageszeiten (**Frühstück, Mittagessen, Kaffee & Kuchen, Abendbrot**) sowie regionalen Spezialitäten aus ganz Deutschland.

Entwickelt mit Fokus auf maximale Kreativität, Interaktivität und Lernerfolg für Deutschlerner (A1–B1).

---

### 🌟 Ausgewähltes Thema
- **Bereich:** `Essen`
- **Schwerpunkt:** `Deutsches Essen` & `Frühstück, Mittagessen, und Abendessen`

---

### ✨ Kreative & Dynamische Funktionen

1. **🎨 3D-Parallaxe Plakat-Leinwand (Poster Hero)**
   - Reagiert in Echtzeit mit 3D-Kippeffekten (`perspective` & `rotate3d`) auf Mausbewegungen und Glanzlichter.
   - Zeigt Tageszeit-Zyklen (Morgen, Mittag, Nachmittag, Abend) mit passenden Stimmungen, Beleuchtungen und Zitaten.

2. **🔊 Native Sprachausgabe & Aussprachetrainer (Web Speech API `de-DE`)**
   - Jedes Gericht, jeder Artikel (*der/die/das*), jeder Beispielsatz und ganze Dialoge können auf Deutsch vorgelesen werden.
   - Geschwindigkeitsregler (Normal 0.9x oder Langsam 0.7x für Lernende).

3. **🔵🔴🟢 Grammatik-Farbcodierung (Der, Die, Das)**
   - Deutsche Nomen farblich nach grammatischem Geschlecht gegliedert:
     - 🔵 **DER** (Maskulin)
     - 🔴 **DIE** (Feminin)
     - 🟢 **DAS** (Neutrum)

4. **🥣 „Stell deinen Teller zusammen“ (Interaktiver Teller-Baukasten)**
   - Interaktive Küchen-Werkstatt: Hauptspeise, Beilage, Getränk und Nachspeise auf einem visuellen Porzellanteller zusammenstellen.
   - Berechnet automatisch Kalorien und generiert den korrekten grammatikalischen Bestellsatz im Akkusativ (*„Ich hätte gerne ein Schnitzel mit einem Kartoffelsalat...“*).

5. **🎮 „Der, Die oder Das?“ (Gamifiziertes Lebensmittel-Duell)**
   - Rasantes Quiz-Spiel mit Streaks, Punkte-Multiplikator, Audio-Feedback (Web Audio API) und Konfetti-Animation bei Meilensteinen.

6. **🗺️ Interaktive kulinarische Landkarte Deutschlands**
   - Interaktive Karte mit Hotspots für Bayern, Baden-Württemberg, Berlin, Hamburg, Hessen, Sachsen/Thüringen mit regionalen Kultgerichten und Anekdoten.

7. **💬 Dialog-Simulator („Im Restaurant & Beim Bäcker“)**
   - Praxisnahe Bestellungen Schritt für Schritt oder als Gesamtdialog anhören mit kulturellen Knigge-Tipps (*Trinkgeld, getrennt zahlen*).

8. **🖨️ Museumsreifes Druck- & Präsentations-Plakat**
   - Integrierter Druckmodus (`window.print()`) formatiert das Plakat gestochen scharf für A3/A4-Ausdrucke oder PDF-Abgaben.

---

### 🛠️ Verwendeter Tech-Stack
- **Framework:** React 18 (TypeScript)
- **Bundler:** Vite
- **Styling:** Tailwind CSS (mit Custom Bauhaus/Alpine Theme)
- **Audio & Speech:** Web Speech API (`de-DE`) & Web Audio API (Synthesizer für Soundeffekte)
- **Icons:** Lucide React
- **Effekte:** Canvas-Confetti, CSS 3D Transforms

---

### 🚀 Lokale Ausführung

```bash
# 1. Abhängigkeiten installieren
npm install

# 2. Entwicklungsserver starten
npm run dev

# 3. Produktions-Build erstellen
npm run build
```

---

*Guten Appetit und viel Spaß beim Erkunden der deutschen Esskultur! 🥨🇩🇪*
