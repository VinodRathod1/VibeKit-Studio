import React from 'react';

interface FeatureCard {
  title?: string;
  description?: string;
}

interface FeaturesSectionProps {
  data: {
    cards?: FeatureCard[];
  };
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ data }) => {
  const cards = data.cards && data.cards.length > 0 ? data.cards : [
    { title: 'Feature One', description: 'Describe your first key benefit here.' },
    { title: 'Feature Two', description: 'Describe your second key benefit here.' },
    { title: 'Feature Three', description: 'Describe your third key benefit here.' }
  ];

  return (
    <section className="py-20 px-6 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {cards.map((card, i) => (
            <div 
              key={i} 
              className="p-10 rounded-[var(--radius)] border border-[var(--color-text)] border-opacity-5 bg-[var(--color-bg)] shadow-sm hover:shadow-xl transition-all"
            >
              <h3 className="text-2xl font-[var(--font-heading)] text-[var(--color-text)] mb-4">
                {card.title || `Benefit ${i + 1}`}
              </h3>
              <p className="text-lg font-[var(--font-body)] text-[var(--color-text)] opacity-60 leading-relaxed">
                {card.description || 'Add a short description explaining this amazing feature.'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
