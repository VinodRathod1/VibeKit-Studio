import React from 'react';
import { 
  TrashIcon, 
  PlusIcon, 
  ChevronUpIcon, 
  ChevronDownIcon 
} from '../icons';

interface SectionEditorProps {
  section: any;
  onUpdate: (data: any) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

const SectionEditor: React.FC<SectionEditorProps> = ({ 
  section, 
  onUpdate, 
  onRemove, 
  onMoveUp, 
  onMoveDown,
  isFirst,
  isLast
}) => {
  const updateData = (newData: any) => {
    onUpdate({ ...section.data, ...newData });
  };

  const renderFields = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Headline</label>
              <input 
                type="text" 
                value={section.data.title || ''} 
                onChange={(e) => updateData({ title: e.target.value })}
                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter headline..."
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Subtitle</label>
              <textarea 
                value={section.data.subtitle || ''} 
                onChange={(e) => updateData({ subtitle: e.target.value })}
                className="w-full p-2 border rounded text-sm h-20 focus:ring-2 focus:ring-black outline-none"
                placeholder="Enter subtitle..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Button Text</label>
                <input 
                  type="text" 
                  value={section.data.buttonText || ''} 
                  onChange={(e) => updateData({ buttonText: e.target.value })}
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Button URL</label>
                <input 
                  type="text" 
                  value={section.data.buttonUrl || ''} 
                  onChange={(e) => updateData({ buttonUrl: e.target.value })}
                  className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-black outline-none"
                />
              </div>
            </div>
          </div>
        );

      case 'features':
        const cards = section.data.cards || [];
        return (
          <div className="space-y-4 pt-4">
            <label className="block text-xs font-bold uppercase text-gray-500">Feature Cards</label>
            {cards.map((card: any, i: number) => (
              <div key={i} className="p-3 bg-gray-50 rounded border flex flex-col gap-2 relative">
                <button 
                  onClick={() => {
                    const newCards = [...cards];
                    newCards.splice(i, 1);
                    updateData({ cards: newCards });
                  }}
                  className="absolute top-2 right-2 text-red-500 hover:bg-red-50 p-1 rounded"
                >
                  <TrashIcon size={14} />
                </button>
                <input 
                  type="text" 
                  value={card.title || ''} 
                  onChange={(e) => {
                    const newCards = [...cards];
                    newCards[i] = { ...card, title: e.target.value };
                    updateData({ cards: newCards });
                  }}
                  className="w-[90%] p-2 border rounded text-sm bg-white"
                  placeholder="Card Title"
                />
                <textarea 
                  value={card.description || ''} 
                  onChange={(e) => {
                    const newCards = [...cards];
                    newCards[i] = { ...card, description: e.target.value };
                    updateData({ cards: newCards });
                  }}
                  className="w-full p-2 border rounded text-sm bg-white h-16"
                  placeholder="Card Description"
                />
              </div>
            ))}
            <button 
              onClick={() => updateData({ cards: [...cards, { title: '', description: '' }] })}
              className="w-full py-2 border-2 border-dashed rounded text-sm text-gray-500 hover:border-black hover:text-black transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon size={14} /> Add Card
            </button>
          </div>
        );

      case 'gallery':
        const images = section.data.images || [];
        return (
          <div className="space-y-4 pt-4">
            <label className="block text-xs font-bold uppercase text-gray-500">Gallery Images</label>
            <div className="grid grid-cols-2 gap-4">
              {images.map((img: any, i: number) => (
                <div key={i} className="group relative aspect-square rounded border bg-gray-50 overflow-hidden">
                  {img.url ? (
                    <img src={img.url} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">Empty</div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col p-2 gap-1 justify-center">
                    <input 
                      type="text" 
                      value={img.url || ''} 
                      onChange={(e) => {
                        const newImages = [...images];
                        newImages[i] = { ...img, url: e.target.value };
                        updateData({ images: newImages });
                      }}
                      className="text-[10px] p-1 rounded bg-white w-full"
                      placeholder="URL..."
                    />
                    <button 
                      onClick={() => {
                        const newImages = [...images];
                        newImages.splice(i, 1);
                        updateData({ images: newImages });
                      }}
                      className="text-[10px] text-white bg-red-600 rounded p-1"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => updateData({ images: [...images, { url: '', alt: '' }] })}
                className="aspect-square border-2 border-dashed rounded flex flex-col items-center justify-center text-gray-400 hover:border-black hover:text-black transition-colors"
              >
                <PlusIcon size={20} />
                <span className="text-[10px] mt-1 uppercase font-bold">Add Image</span>
              </button>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 pt-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Heading</label>
              <input 
                type="text" 
                value={section.data.heading || ''} 
                onChange={(e) => updateData({ heading: e.target.value })}
                className="w-full p-2 border rounded text-sm focus:ring-2 focus:ring-black outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Subheading</label>
              <textarea 
                value={section.data.subheading || ''} 
                onChange={(e) => updateData({ subheading: e.target.value })}
                className="w-full p-2 border rounded text-sm h-20 focus:ring-2 focus:ring-black outline-none"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 bg-white border rounded shadow-sm overflow-hidden group">
      <div className="bg-gray-100 p-3 flex items-center justify-between border-b">
        <div className="flex items-center gap-3">
          <div className="bg-black text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
            {section.type}
          </div>
          <span className="text-xs text-gray-400 font-mono">#{section.id.slice(0, 4)}</span>
        </div>
        <div className="flex items-center gap-1">
          <button 
            disabled={isFirst}
            onClick={onMoveUp}
            className="p-1 hover:bg-white rounded disabled:opacity-30"
          >
            <ChevronUpIcon size={16} />
          </button>
          <button 
            disabled={isLast}
            onClick={onMoveDown}
            className="p-1 hover:bg-white rounded disabled:opacity-30"
          >
            <ChevronDownIcon size={16} />
          </button>
          <button 
            onClick={onRemove}
            className="p-1 hover:bg-red-500 hover:text-white rounded text-red-500 ml-2 transition-colors"
          >
            <TrashIcon size={16} />
          </button>
        </div>
      </div>
      <div className="p-4">
        {renderFields()}
      </div>
    </div>
  );
};

export default SectionEditor;
