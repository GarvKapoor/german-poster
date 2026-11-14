export interface RegionSpecialty {
  id: string;
  name: string;
  capital: string;
  famousDish: string;
  article: 'der' | 'die' | 'das';
  descriptionDe: string;
  descriptionEn: string;
  foodEmoji: string;
  coordinates: { x: number; y: number }; // percentage on SVG Germany map
  triviaDe: string;
  color: string;
}

export const GERMAN_REGIONS: RegionSpecialty[] = [
  {
    id: 'bayern',
    name: 'Bayern (Bavaria)',
    capital: 'München',
    famousDish: 'Weißwurst & Brezn',
    article: 'die',
    descriptionDe: 'Weiße Kalbfleischwurst mit süßem Senf, frischer Laugenbrezel und Weißbier. Traditionell vor dem Mittagsläuten verzehrt.',
    descriptionEn: 'White veal sausage paired with sweet mustard, soft lye pretzels, and wheat beer. Traditionally eaten before noon.',
    foodEmoji: '🥨',
    coordinates: { x: 62, y: 76 },
    triviaDe: 'Eine echte Weißwurst wird traditionell "gezuzelt" (aus der Haut gesaugt), niemals mit Messer und Gabel zerschnitten!',
    color: '#3b82f6'
  },
  {
    id: 'baden-wuerttemberg',
    name: 'Baden-Württemberg',
    capital: 'Stuttgart',
    famousDish: 'Käsespätzle & Maultaschen',
    article: 'die',
    descriptionDe: 'Schwäbische Maultaschen (auch "Herrgottsb' + 'scheißerle" genannt) und frische Käsespätzle mit Röstzwiebeln.',
    descriptionEn: 'Swabian meat-and-spinach filled pasta pockets and fresh scraped noodles drenched in mountain cheese.',
    foodEmoji: '🥟',
    coordinates: { x: 38, y: 78 },
    triviaDe: 'Maultaschen wurden von Mönchen im Kloster Maulbronn erfunden, um während der Fastenzeit Fleisch vor Gott im Teigmantel zu verstecken!',
    color: '#eab308'
  },
  {
    id: 'berlin',
    name: 'Berlin',
    capital: 'Berlin',
    famousDish: 'Currywurst & Berliner Pfannkuchen',
    article: 'die',
    descriptionDe: 'Die Hauptstadt-Legende: Gebratene Wurst mit würziger Currysauce sowie der süße, mit Marmelade gefüllte Hefeteig-Berliner.',
    descriptionEn: 'The capital legend: Spicy curried sausage slices alongside the fluffy jelly-filled yeast doughnut called "Berliner".',
    foodEmoji: '🍛',
    coordinates: { x: 74, y: 35 },
    triviaDe: 'In Berlin selbst nennt niemand das Gebäck "Berliner" – dort heißt es schlicht "Pfannkuchen"!',
    color: '#ef4444'
  },
  {
    id: 'hamburg',
    name: 'Hamburg & Norddeutschland',
    capital: 'Hamburg',
    famousDish: 'Fischbrötchen & Franzbrötchen',
    article: 'das',
    descriptionDe: 'Frischer Bismarckhering oder Matjes im krossen Brötchen am Hafen, gefolgt von einem süßen Zimt-Franzbrötchen.',
    descriptionEn: 'Pickled herring roll savored by the harbor, followed by a buttery, flaky cinnamon-sugar "Franzbrötchen".',
    foodEmoji: '🐟',
    coordinates: { x: 48, y: 22 },
    triviaDe: 'Das Franzbrötchen entstand vermutlich während der napoleonischen Besatzung Hamburgs als lokale Hommage an das französische Croissant.',
    color: '#06b6d4'
  },
  {
    id: 'hessen',
    name: 'Hessen',
    capital: 'Wiesbaden (Frankfurt)',
    famousDish: 'Frankfurter Grüne Soße',
    article: 'die',
    descriptionDe: 'Kühle Kräutersoße aus genau 7 frischen Frühlingskräutern, serviert mit gekochten Eiern und Salzkartoffeln.',
    descriptionEn: 'Cold herb sauce blended with exactly seven fresh spring herbs, served with hard-boiled eggs and boiled potatoes.',
    foodEmoji: '🌿',
    coordinates: { x: 36, y: 55 },
    triviaDe: 'Die 7 Kräuter sind gesetzlich geschützt: Borretsch, Kerbel, Kresse, Petersilie, Pimpinelle, Sauerampfer und Schnittlauch!',
    color: '#22c55e'
  },
  {
    id: 'thueringen-sachsen',
    name: 'Thüringen & Sachsen',
    capital: 'Erfurt / Dresden',
    famousDish: 'Thüringer Rostbratwurst & Dresdner Stollen',
    article: 'die',
    descriptionDe: 'Herzhafte Wurst über Holzkohlefeuer und der berühmte festliche Weihnachtsstollen mit Rosinen, Mandeln und Puderzucker.',
    descriptionEn: 'Hearty charcoal-grilled sausage and the world-famous rich festive fruit loaf dusted with powdered sugar.',
    foodEmoji: '🥖',
    coordinates: { x: 62, y: 52 },
    triviaDe: 'Der Dresdner Christstollen ist durch ein EU-Siegel geschützt und darf nur in und um Dresden von Hand gebacken werden.',
    color: '#a855f7'
  }
];
