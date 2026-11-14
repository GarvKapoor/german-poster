export interface DialogueLine {
  speaker: 'waiter' | 'customer';
  speakerLabelDe: string;
  speakerLabelEn: string;
  textDe: string;
  textEn: string;
  audioText: string;
  tipDe?: string;
}

export interface DialogueScenario {
  id: string;
  titleDe: string;
  titleEn: string;
  location: string;
  icon: string;
  lines: DialogueLine[];
}

export const DIALOGUE_SCENARIOS: DialogueScenario[] = [
  {
    id: 'im-restaurant',
    titleDe: 'Im deutschen Wirtshaus',
    titleEn: 'At the German Tavern / Restaurant',
    location: 'Gasthaus „Zum Goldenen Hirsch“',
    icon: '🍽️',
    lines: [
      {
        speaker: 'waiter',
        speakerLabelDe: 'Kellner',
        speakerLabelEn: 'Waiter',
        textDe: 'Guten Abend! Haben Sie reserviert oder darf ich Ihnen einen schönen Tisch am Fenster anbieten?',
        textEn: 'Good evening! Do you have a reservation or may I offer you a nice table by the window?',
        audioText: 'Guten Abend! Haben Sie reserviert oder darf ich Ihnen einen schönen Tisch am Fenster anbieten?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Gast',
        speakerLabelEn: 'Guest',
        textDe: 'Guten Abend! Einen Tisch für zwei Personen am Fenster wäre wunderbar, danke.',
        textEn: 'Good evening! A table for two by the window would be wonderful, thank you.',
        audioText: 'Guten Abend! Einen Tisch für zwei Personen am Fenster wäre wunderbar, danke.'
      },
      {
        speaker: 'waiter',
        speakerLabelDe: 'Kellner',
        speakerLabelEn: 'Waiter',
        textDe: 'Sehr gerne. Was darf ich Ihnen vorab zu trinken bringen?',
        textEn: 'With pleasure. What may I bring you to drink first?',
        audioText: 'Sehr gerne. Was darf ich Ihnen vorab zu trinken bringen?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Gast',
        speakerLabelEn: 'Guest',
        textDe: 'Ich hätte gern ein frisches Weißbier vom Fass und eine große Apfelschorle, bitte.',
        textEn: 'I would like a fresh draft wheat beer and a large sparkling apple spritzer, please.',
        audioText: 'Ich hätte gern ein frisches Weißbier vom Fass und eine große Apfelschorle, bitte.',
        tipDe: '„Ich hätte gern...“ ist die höflichste Form, um auf Deutsch Essen oder Getränke zu bestellen.'
      },
      {
        speaker: 'waiter',
        speakerLabelDe: 'Kellner',
        speakerLabelEn: 'Waiter',
        textDe: 'Kommt sofort! Und haben Sie schon gewählt, was Sie essen möchten?',
        textEn: 'Right away! And have you decided what you would like to eat?',
        audioText: 'Kommt sofort! Und haben Sie schon gewählt, was Sie essen möchten?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Gast',
        speakerLabelEn: 'Guest',
        textDe: 'Ja, für mich bitte das Wiener Schnitzel mit Kartoffelsalat und Preiselbeeren.',
        textEn: 'Yes, for me please the Wiener Schnitzel with potato salad and lingonberries.',
        audioText: 'Ja, für mich bitte das Wiener Schnitzel mit Kartoffelsalat und Preiselbeeren.'
      },
      {
        speaker: 'waiter',
        speakerLabelDe: 'Kellner',
        speakerLabelEn: 'Waiter',
        textDe: 'Ausgezeichnete Wahl! Ich wünsche Ihnen einen guten Appetit!',
        textEn: 'Excellent choice! I wish you bon appétit!',
        audioText: 'Ausgezeichnete Wahl! Ich wünsche Ihnen einen guten Appetit!'
      }
    ]
  },
  {
    id: 'beim-baecker',
    titleDe: 'Beim traditionellen Bäcker',
    titleEn: 'At the Traditional German Bakery',
    location: 'Bäckerei & Konditorei Müller',
    icon: '🥖',
    lines: [
      {
        speaker: 'waiter',
        speakerLabelDe: 'Bäckerin',
        speakerLabelEn: 'Baker',
        textDe: 'Guten Morgen! Der Nächste bitte! Was darf es sein?',
        textEn: 'Good morning! Next please! What can I get for you?',
        audioText: 'Guten Morgen! Der Nächste bitte! Was darf es sein?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Kunde',
        speakerLabelEn: 'Customer',
        textDe: 'Guten Morgen! Ich möchte bitte drei knusprige Weizenbrötchen und zwei Laugenbrezeln.',
        textEn: 'Good morning! I would like three crispy wheat rolls and two pretzels, please.',
        audioText: 'Guten Morgen! Ich möchte bitte drei knusprige Weizenbrötchen und zwei Laugenbrezeln.'
      },
      {
        speaker: 'waiter',
        speakerLabelDe: 'Bäckerin',
        speakerLabelEn: 'Baker',
        textDe: 'Gerne! Die Brezeln sind gerade noch ofenwarm. Darf es noch etwas Süßes für den Nachmittag sein?',
        textEn: 'Sure! The pretzels are still warm from the oven. Would you like something sweet for the afternoon?',
        audioText: 'Gerne! Die Brezeln sind gerade noch ofenwarm. Darf es noch etwas Süßes für den Nachmittag sein?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Kunde',
        speakerLabelEn: 'Customer',
        textDe: 'Ja, noch ein Stück frischen Apfelstrudel bitte. Was macht das zusammen?',
        textEn: 'Yes, one slice of fresh apple strudel please. How much is that altogether?',
        audioText: 'Ja, noch ein Stück frischen Apfelstrudel bitte. Was macht das zusammen?',
        tipDe: '„Was macht das zusammen?“ fragt man in Deutschland nach dem Gesamtpreis beim Bäcker oder Markt.'
      },
      {
        speaker: 'waiter',
        speakerLabelDe: 'Bäckerin',
        speakerLabelEn: 'Baker',
        textDe: 'Das macht genau 6 Euro und 40 Cent, bitte. Zahlen Sie bar oder mit Karte?',
        textEn: 'That makes exactly 6 Euros and 40 cents, please. Are you paying cash or card?',
        audioText: 'Das macht genau 6 Euro und 40 Cent, bitte. Zahlen Sie bar oder mit Karte?'
      },
      {
        speaker: 'customer',
        speakerLabelDe: 'Kunde',
        speakerLabelEn: 'Customer',
        textDe: 'Mit Karte, bitte. Schönen Tag noch!',
        textEn: 'By card, please. Have a wonderful day!',
        audioText: 'Mit Karte, bitte. Schönen Tag noch!'
      }
    ]
  }
];
