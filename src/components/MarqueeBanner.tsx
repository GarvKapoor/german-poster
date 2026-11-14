import React from 'react';

export const MarqueeBanner: React.FC<{ reverse?: boolean; variant?: 'gold' | 'dark' }> = ({
  reverse = false,
  variant = 'gold',
}) => {
  const items = [
    '🥨 KULINARISCHES DEUTSCHLAND',
    '🥖 3.000+ BROTSORTEN (UNESCO WELTKULTURERBE)',
    '🥩 DAS WIENER SCHNITZEL',
    '🌭 DIE THÜRINGER BRATWURST',
    '🍺 DAS WEIZENBIER (REINHEITSGEBOT 1516)',
    '🍰 DIE SCHWARZWÄLDER KIRSCHTORTE',
    '🧀 DIE ALLGÄUER KÄSESPÄTZLE',
    '🍛 DIE BERLINER CURRYWURST',
    '🥣 DAS FRÜHSTÜCK (06:30)',
    '🍽️ DAS MITTAGESSEN (12:00)',
    '☕ KAFFEE & KUCHEN (15:30)',
    '🥖 DAS ABENDBROT (18:30)',
  ];

  const quotes = [
    '„Essen und Trinken hält Leib und Seele zusammen.“',
    '„Frühstücken wie ein Kaiser, mittagessen wie ein König, abendessen wie ein Bettelmann.“',
    '„Liebe geht durch den Magen.“',
    '„In der Ruhe liegt die Kraft – und im guten Brot der Geschmack.“',
    '„Mahlzeit! Guten Appetit!“',
    '„Brot ist der Stab des Lebens.“',
  ];

  const displayList = reverse ? quotes : items;

  return (
    <div className={`w-full overflow-hidden py-3 border-y select-none transition-colors ${
      variant === 'gold'
        ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        : 'bg-stone-900/90 border-stone-800 text-stone-400'
    }`}>
      <div className={`flex w-max gap-8 font-mono text-xs sm:text-sm font-bold tracking-widest uppercase ${
        reverse ? 'animate-marqueeReverse' : 'animate-marquee'
      }`}>
        {/* Render twice for infinite seamless loop */}
        {displayList.concat(displayList).map((text, idx) => (
          <span key={idx} className="flex items-center gap-4 whitespace-nowrap">
            <span>{text}</span>
            <span className="text-amber-500">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
