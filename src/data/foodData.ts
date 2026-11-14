export type Article = 'der' | 'die' | 'das';
export type MealTime = 'fruehstueck' | 'mittagessen' | 'kaffee' | 'abendbrot';

export interface FoodItem {
  id: string;
  article: Article;
  name: string;
  englishName: string;
  mealTimes: MealTime[];
  category: 'speise' | 'getraenk' | 'gebaeck' | 'suess';
  region: string;
  emoji: string;
  image: string;
  descriptionDe: string;
  descriptionEn: string;
  tasteProfile: string[];
  calories: number; // kcal
  keyIngredientsDe: string[];
  keyIngredientsEn: string[];
  funFactDe: string;
  sampleSentenceDe: string;
  sampleSentenceEn: string;
  phonetic: string;
}

export const FOOD_ITEMS: FoodItem[] = [
  // --- FRÜHSTÜCK ---
  {
    id: 'broetchen',
    article: 'das',
    name: 'Brötchen',
    englishName: 'Bread Roll / Semmel',
    mealTimes: ['fruehstueck', 'abendbrot'],
    category: 'gebaeck',
    region: 'Bundesweit (Semmel in Bayern, Schrippe in Berlin)',
    emoji: '🥖',
    image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Das knusprige Brötchen ist das Herzstück des deutschen Frühstücks. Außen kross, innen wunderbar fluffig.',
    descriptionEn: 'The crispy bread roll is the centerpiece of German breakfast. Crusty outside, soft and fluffy inside.',
    tasteProfile: ['Knusprig', 'Frisch', 'Herzhaft'],
    calories: 140,
    keyIngredientsDe: ['Weizenmehl', 'Wasser', 'Hefe', 'Salz'],
    keyIngredientsEn: ['Wheat flour', 'Water', 'Yeast', 'Salt'],
    funFactDe: 'In Deutschland gibt es über 3.000 verschiedene Brotsorten! Die deutsche Brotkultur gehört seit 2014 zum immateriellen UNESCO-Weltkulturerbe.',
    sampleSentenceDe: 'Ich hole morgens zwei frische Brötchen beim Bäcker.',
    sampleSentenceEn: 'I get two fresh bread rolls from the bakery in the morning.',
    phonetic: '[ˈbʁøːtçən]'
  },
  {
    id: 'kaffee',
    article: 'der',
    name: 'Kaffee',
    englishName: 'Coffee',
    mealTimes: ['fruehstueck', 'kaffee'],
    category: 'getraenk',
    region: 'Bundesweit',
    emoji: '☕',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Der beliebteste Wachmacher der Deutschen. Klassisch frisch gebrüht als Filterkaffee oder mit aufgeschäumter Milch.',
    descriptionEn: 'Germany’s favorite wake-up beverage. Classically fresh filter brew or served with frothed milk.',
    tasteProfile: ['Röstig', 'Aromatisch', 'Warm'],
    calories: 5,
    keyIngredientsDe: ['Kaffeebohnen', 'Heißes Wasser', 'Optional: Milch & Zucker'],
    keyIngredientsEn: ['Coffee beans', 'Hot water', 'Optional: Milk & Sugar'],
    funFactDe: 'Deutsche trinken statistisch mehr Kaffee als Bier – rund 166 Liter pro Person und Jahr!',
    sampleSentenceDe: 'Einen großen Kaffee mit Hafermilch bitte!',
    sampleSentenceEn: 'A large coffee with oat milk please!',
    phonetic: '[ˈkafe]'
  },
  {
    id: 'marmelade',
    article: 'die',
    name: 'Marmelade',
    englishName: 'Jam / Fruit Preserve',
    mealTimes: ['fruehstueck'],
    category: 'suess',
    region: 'Bundesweit',
    emoji: '🍓',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Fruchtiger Aufstrich aus Erdbeeren, Himbeeren oder Aprikosen, am liebsten dick auf Butter und Brötchen gestrichen.',
    descriptionEn: 'Fruity spread made from strawberries, raspberries, or apricots, best enjoyed thickly spread over buttered rolls.',
    tasteProfile: ['Süß', 'Fruchtig', 'Samtig'],
    calories: 55,
    keyIngredientsDe: ['Früchte', 'Gelierzucker', 'Zitronensaft'],
    keyIngredientsEn: ['Fruit', 'Gelling sugar', 'Lemon juice'],
    funFactDe: 'Streng genommen darf in der EU nur Fruchtaufstrich aus Zitrusfrüchten "Marmelade" heißen; im deutschen Alltag nennt man trotzdem jeden Fruchtaufstrich so.',
    sampleSentenceDe: 'Reichst du mir bitte die Erdbeermarmelade?',
    sampleSentenceEn: 'Could you please pass me the strawberry jam?',
    phonetic: '[maʁməˈlaːdə]'
  },
  {
    id: 'muesli',
    article: 'das',
    name: 'Müsli',
    englishName: 'Muesli / Granola',
    mealTimes: ['fruehstueck'],
    category: 'speise',
    region: 'Alpenraum / Bundesweit',
    emoji: '🥣',
    image: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Eine gesunde Schale aus Vollkorn-Haferflocken, Nüssen, Samen und frischen Beeren mit Joghurt oder Milch.',
    descriptionEn: 'A wholesome bowl of whole-grain rolled oats, nuts, seeds, and fresh berries with yogurt or milk.',
    tasteProfile: ['Knusprig', 'Frisch', 'Kernig'],
    calories: 320,
    keyIngredientsDe: ['Haferflocken', 'Nüsse', 'Früchte', 'Milch oder Joghurt'],
    keyIngredientsEn: ['Rolled oats', 'Nuts', 'Fruit', 'Milk or yogurt'],
    funFactDe: 'Das Wort "Müsli" kommt aus der Schweiz und ist eine Verkleinerungsform von "Mus" (Brei).',
    sampleSentenceDe: 'Ein gesundes Müsli gibt mir Energie für den ganzen Tag.',
    sampleSentenceEn: 'A healthy muesli gives me energy for the entire day.',
    phonetic: '[ˈmyːsli]'
  },
  {
    id: 'spiegelei',
    article: 'das',
    name: 'Spiegelei',
    englishName: 'Fried Egg',
    mealTimes: ['fruehstueck', 'mittagessen'],
    category: 'speise',
    region: 'Bundesweit',
    emoji: '🍳',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'In der Pfanne gebratenes Ei mit glänzend flüssigem Dotter, gewürzt mit einer Prise Meersalz und Schnittlauch.',
    descriptionEn: 'Pan-fried egg with a glossy, runny yolk, seasoned with a pinch of sea salt and fresh chives.',
    tasteProfile: ['Cremig', 'Salzig', 'Herzhaft'],
    calories: 90,
    keyIngredientsDe: ['Frisches Ei', 'Butter oder Öl', 'Salz & Pfeffer', 'Schnittlauch'],
    keyIngredientsEn: ['Fresh egg', 'Butter or oil', 'Salt & pepper', 'Chives'],
    funFactDe: 'Es heißt Spiegelei, weil das glänzende Eigelb wie ein kleiner Handspiegel schimmert.',
    sampleSentenceDe: 'Ich esse zum Frühstück gern zwei Spiegeleier mit Schnittlauch.',
    sampleSentenceEn: 'I like to eat two fried eggs with chives for breakfast.',
    phonetic: '[ˈʃpiːɡl̩ˌʔaɪ̯]'
  },

  // --- MITTAGESSEN ---
  {
    id: 'schnitzel',
    article: 'das',
    name: 'Schnitzel',
    englishName: 'Wiener Schnitzel',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Österreich & Süddeutschland',
    emoji: '🥩',
    image: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Hauchdünn geklopftes, in goldener Panade soufflierend knusprig ausgebackenes Fleisch, serviert mit Zitrone und Petersilie.',
    descriptionEn: 'Tender, thinly pounded cutlet fried in a golden, wavy breadcrumb crust, traditionally served with fresh lemon.',
    tasteProfile: ['Knusprig', 'Zart', 'Herzhaft', 'Goldbraun'],
    calories: 580,
    keyIngredientsDe: ['Kalbs- oder Schweinefleisch', 'Semmelbrösel', 'Eier', 'Butterschmalz', 'Zitrone'],
    keyIngredientsEn: ['Veal or pork', 'Breadcrumbs', 'Eggs', 'Clarified butter', 'Lemon'],
    funFactDe: 'Ein echtes "Wiener Schnitzel" muss gesetzlich immer aus Kalbfleisch sein; aus Schweinefleisch heißt es "Schnitzel Wiener Art".',
    sampleSentenceDe: 'Ich nehme das Schnitzel mit warmem Kartoffelsalat!',
    sampleSentenceEn: 'I will take the schnitzel with warm potato salad!',
    phonetic: '[ˈʃnɪt͡sl̩]'
  },
  {
    id: 'bratwurst',
    article: 'die',
    name: 'Bratwurst',
    englishName: 'Grilled German Sausage',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Thüringen & Franken (Bayern)',
    emoji: '🌭',
    image: 'https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Würzig abgeschmeckte Bratwurst, traditionell über Holzkohle gegrillt und im Brötchen mit scharfem Senf serviert.',
    descriptionEn: 'Flavorful spiced sausage grilled over charcoal, famously served in a crusty roll with spicy German mustard.',
    tasteProfile: ['Rauchig', 'Würzig', 'Saftig'],
    calories: 360,
    keyIngredientsDe: ['Schweinefleisch', 'Majoran', 'Kümmel', 'Knoblauch', 'Naturdarm'],
    keyIngredientsEn: ['Pork', 'Marjoram', 'Caraway', 'Garlic', 'Natural casing'],
    funFactDe: 'Die älteste urkundliche Erwähnung der Thüringer Bratwurst stammt aus dem Jahr 1404 im Propsteiarchiv Arnstadt.',
    sampleSentenceDe: 'Eine Thüringer Rostbratwurst mit mittelscharfem Senf bitte!',
    sampleSentenceEn: 'One Thuringian grilled sausage with medium-hot mustard please!',
    phonetic: '[ˈbʁaːtˌvʊʁst]'
  },
  {
    id: 'kaesespaetzle',
    article: 'die',
    name: 'Käsespätzle',
    englishName: 'Swabian Cheese Noodles',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Schwaben (Baden-Württemberg) & Allgäu',
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Frisch vom Brett geschabte Eierteigwaren, geschichtet mit würzigem Bergkäse und garniert mit knusprigen Röstzwiebeln.',
    descriptionEn: 'Hand-scraped fresh egg pasta layered with melted pungent alpine cheese, topped with crispy browned fried onions.',
    tasteProfile: ['Käsig', 'Herzhaft', 'Cremig', 'Seelenwärmend'],
    calories: 640,
    keyIngredientsDe: ['Spätzleteig', 'Allgäuer Bergkäse', 'Emmentaler', 'Zwiebeln', 'Butter'],
    keyIngredientsEn: ['Spätzle dough', 'Alpine mountain cheese', 'Emmental', 'Onions', 'Butter'],
    funFactDe: 'Spätzle haben ihren Namen wahrscheinlich, weil die Teigklößchen im kochenden Wasser früher an kleine Spatzen (Vögel) erinnerten.',
    sampleSentenceDe: 'Die Käsespätzle hier im Wirtshaus schmecken fantastisch!',
    sampleSentenceEn: 'The cheese spätzle here at the inn taste fantastic!',
    phonetic: '[ˈkɛːzəˌʃpɛt͡slə]'
  },
  {
    id: 'currywurst',
    article: 'die',
    name: 'Currywurst',
    englishName: 'Currywurst with Spicy Sauce',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Berlin & Ruhrgebiet',
    emoji: '🍛',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Der Kult-Klassiker der deutschen Straßenküche: Gebratene Wurst in Scheiben mit pikanter Tomaten-Currysauce und Currypulver.',
    descriptionEn: 'The cult classic of German street food: Sliced grilled sausage smothered in spicy tomato-curry sauce and curry powder.',
    tasteProfile: ['Pikant', 'Süß-Sauer', 'Würzig'],
    calories: 420,
    keyIngredientsDe: ['Bratwurst oder Dampfwurst', 'Tomatensauce', 'Currypulver', 'Worcestershiresauce'],
    keyIngredientsEn: ['Sausage', 'Tomato sauce', 'Curry powder', 'Worcestershire sauce'],
    funFactDe: 'Erfunden wurde die Currywurst 1949 von Herta Heuwer an ihrem Imbissstand im Berliner Bezirk Charlottenburg.',
    sampleSentenceDe: 'Einmal Currywurst mit Pommes Schranke (rot-weiß) bitte!',
    sampleSentenceEn: 'One currywurst with fries and red-and-white sauce please!',
    phonetic: '[ˈkœʁiˌvʊʁst]'
  },
  {
    id: 'sauerbraten',
    article: 'der',
    name: 'Sauerbraten',
    englishName: 'Marinated German Pot Roast',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Rheinland & Franken',
    emoji: '🍲',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Tagelang in einer aromatischen Essig-Gewürz-Beize marinierter Rinderbraten, serviert mit süß-säuerlicher Lebkuchensauce und Klößen.',
    descriptionEn: 'Tender beef pot roast marinated for days in spiced red wine vinegar, served in a sweet-tart gingerbread gravy with dumplings.',
    tasteProfile: ['Säuerlich', 'Würzig', 'Zart', 'Komplex'],
    calories: 520,
    keyIngredientsDe: ['Rindfleisch', 'Rotweinessig', 'Wacholderbeeren', 'Printen / Soßenlebkuchen', 'Rosinen'],
    keyIngredientsEn: ['Beef', 'Red wine vinegar', 'Juniper berries', 'Gingerbread spice', 'Raisins'],
    funFactDe: 'Das traditionelle rheinische Rezept verwendet Printen oder Soßenlebkuchen, um die säuerliche Soße wunderbar sämig und leicht süß zu binden.',
    sampleSentenceDe: 'Sonntags gibt es bei Oma immer feinen Sauerbraten mit Kartoffelklößen.',
    sampleSentenceEn: 'On Sundays at Grandma’s, there is always delicious Sauerbraten with potato dumplings.',
    phonetic: '[ˈzaʊ̯ɐˌbʁaːtn̩]'
  },
  {
    id: 'kartoffelsalat',
    article: 'der',
    name: 'Kartoffelsalat',
    englishName: 'German Potato Salad',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'speise',
    region: 'Süden (Essig-Öl-Brühe) & Norden (Mayonnaise)',
    emoji: '🥔',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Die Königsdisziplin der Beilagen. Im Süden herrlich schlotzig mit warmer Fleischbrühe, Essig und Zwiebeln angemacht.',
    descriptionEn: 'The holy grail of side dishes. In Southern Germany prepared warm and silky with savory broth, vinegar, and onions.',
    tasteProfile: ['Herzhaft', 'Leicht säuerlich', 'Würzig'],
    calories: 210,
    keyIngredientsDe: ['Festkochende Kartoffeln', 'Rinder- oder Gemüsebrühe', 'Weinessig', 'Öl', 'Zwiebeln'],
    keyIngredientsEn: ['Waxy potatoes', 'Broth', 'White wine vinegar', 'Oil', 'Onions'],
    funFactDe: 'Über Kartoffelsalat tobt in Deutschland ein freundschaftlicher Glaubenskrieg: Essig & Brühe (Süd) gegen Mayonnaise (Nord)!',
    sampleSentenceDe: 'Der schwäbische Kartoffelsalat muss richtig schlotzig sein!',
    sampleSentenceEn: 'Swabian potato salad must have that perfect silky consistency!',
    phonetic: '[kaʁˈtɔfl̩zaˌlaːt]'
  },

  // --- KAFFEE & KUCHEN ---
  {
    id: 'schwarzwaelder',
    article: 'die',
    name: 'Schwarzwälder Kirschtorte',
    englishName: 'Black Forest Cherry Cake',
    mealTimes: ['kaffee'],
    category: 'suess',
    region: 'Schwarzwald (Baden-Württemberg)',
    emoji: '🍰',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Luftiger Schokoladen-Biskuitboden, Sauerkirschen, frische Sahne und ein edler Schuss Schwarzwälder Kirschwasser.',
    descriptionEn: 'Airy chocolate sponge layers, sour cherries, freshly whipped cream, and a splash of authentic Black Forest cherry schnapps.',
    tasteProfile: ['Schokoladig', 'Cremig', 'Fruchtig-herb', 'Süß'],
    calories: 410,
    keyIngredientsDe: ['Schoko-Biskuit', 'Schlagsahne', 'Sauerkirschen', 'Kirschwasser', 'Schokoraspeln'],
    keyIngredientsEn: ['Chocolate sponge', 'Whipped cream', 'Sour cherries', 'Cherry brandy', 'Chocolate curls'],
    funFactDe: 'Nur Torten, die echtes Kirschwasser aus dem Schwarzwald enthalten, dürfen sich rechtlich "Schwarzwälder Kirschtorte" nennen.',
    sampleSentenceDe: 'Darf ich Ihnen ein Stück Schwarzwälder Kirschtorte anbieten?',
    sampleSentenceEn: 'May I offer you a slice of Black Forest cherry cake?',
    phonetic: '[ˌʃvaʁt͡svɛldɐ ˈkɪʁʃˌtɔʁtə]'
  },
  {
    id: 'apfelstrudel',
    article: 'der',
    name: 'Apfelstrudel',
    englishName: 'Warm Apple Strudel',
    mealTimes: ['kaffee'],
    category: 'suess',
    region: 'Süddeutschland & Österreich',
    emoji: '🥧',
    image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Hauchdünner Teigmantel, gefüllt mit saftigen Zimtäpfeln, Rosinen und gerösteten Semmelbröseln, am besten mit Vanillesauce.',
    descriptionEn: 'Paper-thin stretched pastry filled with spiced tart apples, raisins, and cinnamon toasted breadcrumbs, served warm.',
    tasteProfile: ['Zimt-würzig', 'Fruchtig', 'Süß', 'Knusprig'],
    calories: 340,
    keyIngredientsDe: ['Strudelteig', 'Säuerliche Äpfel', 'Zimt & Zucker', 'Rosinen', 'Butterbrösel'],
    keyIngredientsEn: ['Strudel pastry', 'Tart apples', 'Cinnamon & sugar', 'Raisins', 'Buttered crumbs'],
    funFactDe: 'Ein alter Konditor-Spruch besagt: Ein guter Strudelteig muss so dünn ausgezogen sein, dass man eine Liebeserklärung hindurch lesen kann!',
    sampleSentenceDe: 'Einen warmen Apfelstrudel mit Vanilleeis bitte!',
    sampleSentenceEn: 'A warm apple strudel with vanilla ice cream please!',
    phonetic: '[ˈʔap͡fl̩ˌʃtʁuːdl̩]'
  },
  {
    id: 'brezel',
    article: 'die',
    name: 'Brezel',
    englishName: 'Bavarian Pretzel',
    mealTimes: ['fruehstueck', 'kaffee', 'abendbrot'],
    category: 'gebaeck',
    region: 'Bayern & Baden-Württemberg',
    emoji: '🥨',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Glänzende rotbraune Laugenkruste mit groben Salzkristallen, dicken weichen Ärmchen und krossem Knoten.',
    descriptionEn: 'Glossy mahogany lye crust sprinkled with coarse salt flakes, tender doughy center and crispy crossed arms.',
    tasteProfile: ['Laugenfrisch', 'Salzig', 'Hefe-weich'],
    calories: 230,
    keyIngredientsDe: ['Hefeteig', 'Natronlauge', 'Grobes Brezelsalz', 'Butter'],
    keyIngredientsEn: ['Yeast dough', 'Lye bath', 'Coarse salt crystals', 'Butter'],
    funFactDe: 'Die charakteristische Form soll der Legende nach die zum Gebet vor der Brust verschränkten Arme von Mönchen darstellen.',
    sampleSentenceDe: 'Eine frische Butterbrezel ist der beste Snack zwischendurch.',
    sampleSentenceEn: 'A fresh buttered pretzel is the best quick snack in between.',
    phonetic: '[ˈbʁeːt͡sl̩]'
  },

  // --- ABENDBROT / ABENDESSEN ---
  {
    id: 'vollkornbrot',
    article: 'das',
    name: 'Vollkornbrot',
    englishName: 'Whole Grain Rye Bread',
    mealTimes: ['abendbrot', 'fruehstueck'],
    category: 'gebaeck',
    region: 'Bundesweit',
    emoji: '🍞',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Kräftiges, dunkles Sauerteigbrot aus vollem Korn. Die Grundlage der traditionellen deutschen Mahlzeit: des „Abendbrots“.',
    descriptionEn: 'Hearty, dark natural sourdough bread made with whole rye grain. The cornerstone of Germany’s traditional "Abendbrot".',
    tasteProfile: ['Säuerlich-würzig', 'Körnig', 'Sättigend'],
    calories: 190,
    keyIngredientsDe: ['Roggenschrot', 'Natursauerteig', 'Wasser', 'Salz', 'Sonnenblumenkerne'],
    keyIngredientsEn: ['Cracked rye', 'Natural sourdough', 'Water', 'Salt', 'Sunflower seeds'],
    funFactDe: 'Das Wort "Abendbrot" bedeutet wörtlich "Abend-Brot", weil traditionell abends kalt gegessen wird: Brot mit Käse und Aufschnitt.',
    sampleSentenceDe: 'Wir essen um 19 Uhr gemütlich Abendbrot mit frischem Vollkornbrot.',
    sampleSentenceEn: 'At 7 PM we comfortably eat Abendbrot with fresh whole grain bread.',
    phonetic: '[ˈfɔlˌkɔʁnˌbʁoːt]'
  },
  {
    id: 'kaeseplatte',
    article: 'die',
    name: 'Käseplatte',
    englishName: 'German Cheese Board',
    mealTimes: ['abendbrot'],
    category: 'speise',
    region: 'Allgäu & Harz',
    emoji: '🧀',
    image: 'https://images.unsplash.com/photo-1631379578550-7038263db699?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Eine bunte Auswahl aus gereiftem Bergkäse, Tilsiter, cremigem Camembert und typischem Harzer Käse mit Weintrauben.',
    descriptionEn: 'A colorful assortment of aged Alpine mountain cheese, Tilsit, creamy Camembert, and traditional Harz cheese with grapes.',
    tasteProfile: ['Würzig', 'Cremig', 'Pikant', 'Edel'],
    calories: 380,
    keyIngredientsDe: ['Allgäuer Bergkäse', 'Gouda', 'Harzer Roller', 'Trauben', 'Walnüsse'],
    keyIngredientsEn: ['Alpine cheese', 'Gouda', 'Harz sour milk cheese', 'Grapes', 'Walnuts'],
    funFactDe: 'Harzer Käse ist eine deutsche Spezialität aus Sauermilchquark mit unter 1% Fett, aber extrem intensivem Aroma!',
    sampleSentenceDe: 'Zur Käseplatte trinken wir ein Glas Weißwein.',
    sampleSentenceEn: 'With the cheese platter, we drink a glass of white wine.',
    phonetic: '[ˈkɛːzəˌplatə]'
  },
  {
    id: 'apfelschorle',
    article: 'die',
    name: 'Apfelschorle',
    englishName: 'Sparkling Apple Spritzer',
    mealTimes: ['mittagessen', 'abendbrot'],
    category: 'getraenk',
    region: 'Bundesweit',
    emoji: '🍏',
    image: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Das inoffizielle deutsche Nationalgetränk: Naturtrüber Apfelsaft gemischt mit prickelndem Mineralwasser. Erfrischend und isotonisch.',
    descriptionEn: 'The unofficial German national soft drink: Pure cloudy apple juice blended with sparkling mineral water.',
    tasteProfile: ['Prickelnd', 'Fruchtig-frisch', 'Durstlöschend'],
    calories: 70,
    keyIngredientsDe: ['Direktsaft aus Äpfeln (50-60%)', 'Kohlensäurehaltiges Mineralwasser'],
    keyIngredientsEn: ['Pure pressed apple juice (50-60%)', 'Sparkling mineral water'],
    funFactDe: 'Im Ausland fast unbekannt, aber in Deutschland steht Schorle auf ausnahmslos jeder Restaurant- und Cafékarte!',
    sampleSentenceDe: 'Eine große Apfelschorle mit viel Kohlensäure, bitte!',
    sampleSentenceEn: 'A large sparkling apple spritzer with plenty of fizz, please!',
    phonetic: '[ˈʔap͡fl̩ˌʃɔʁlə]'
  },
  {
    id: 'bier',
    article: 'das',
    name: 'Bier (Weizenbier)',
    englishName: 'German Wheat Beer',
    mealTimes: ['abendbrot', 'mittagessen'],
    category: 'getraenk',
    region: 'Bayern & Bundesweit',
    emoji: '🍺',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=80',
    descriptionDe: 'Naturtrübes, obergäriges Bier mit feiner Bananen- und Gewürznelkennote, gebraut nach dem deutschen Reinheitsgebot von 1516.',
    descriptionEn: 'Naturally cloudy top-fermented beer with subtle hints of banana and clove, brewed according to the 1516 Purity Law.',
    tasteProfile: ['Prickelnd', 'Hefig', 'Fruchtig-herb'],
    calories: 180,
    keyIngredientsDe: ['Wasser', 'Weizen- und Gerstenmalz', 'Hopfen', 'Hefe'],
    keyIngredientsEn: ['Water', 'Wheat and barley malt', 'Hops', 'Yeast'],
    funFactDe: 'Das bayerische Reinheitsgebot von 1516 ist eines der ältesten noch heute gültigen Lebensmittelgesetze der Welt!',
    sampleSentenceDe: 'Prost! Ein kühles Weißbier zum Feierabend.',
    sampleSentenceEn: 'Cheers! A cold wheat beer to celebrate the end of the workday.',
    phonetic: '[biːɐ̯]'
  }
];

export const MEAL_TIME_INFO: Record<MealTime, {
  titleDe: string;
  titleEn: string;
  timeRange: string;
  quoteDe: string;
  quoteEn: string;
  bgGradient: string;
  accentColor: string;
  iconName: string;
}> = {
  fruehstueck: {
    titleDe: 'Frühstück',
    titleEn: 'Breakfast',
    timeRange: '06:30 – 10:00 Uhr',
    quoteDe: '„Frühstücken wie ein Kaiser!“',
    quoteEn: '“Eat breakfast like an emperor!”',
    bgGradient: 'from-amber-600/30 via-orange-600/20 to-stone-900',
    accentColor: '#f59e0b',
    iconName: 'Sunrise'
  },
  mittagessen: {
    titleDe: 'Mittagessen',
    titleEn: 'Lunch',
    timeRange: '12:00 – 14:00 Uhr',
    quoteDe: '„Mahlzeit! Die warme Hauptmahlzeit des Tages.“',
    quoteEn: '“Mahlzeit! The warm centerpiece meal of the day.”',
    bgGradient: 'from-red-600/30 via-amber-600/20 to-stone-900',
    accentColor: '#ef4444',
    iconName: 'Sun'
  },
  kaffee: {
    titleDe: 'Kaffee & Kuchen',
    titleEn: 'Afternoon Coffee & Cake',
    timeRange: '15:00 – 17:00 Uhr',
    quoteDe: '„Ein Stück Gemütlichkeit am Nachmittag.“',
    quoteEn: '“A slice of cozy hospitality in the afternoon.”',
    bgGradient: 'from-amber-800/30 via-yellow-700/20 to-stone-900',
    accentColor: '#d97706',
    iconName: 'Coffee'
  },
  abendbrot: {
    titleDe: 'Abendbrot',
    titleEn: 'Dinner / Supper',
    timeRange: '18:30 – 20:30 Uhr',
    quoteDe: '„Gutes Brot, Käse und gemütliches Beisammensein.“',
    quoteEn: '“Good bread, cheese, and convivial gathering.”',
    bgGradient: 'from-indigo-950/50 via-slate-900 to-stone-950',
    accentColor: '#6366f1',
    iconName: 'Moon'
  }
};
