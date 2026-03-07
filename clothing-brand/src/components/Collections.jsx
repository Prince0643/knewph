import { useState } from 'react';

const Collections = () => {
  const collectionImages = [
    { id: 1, src: '/images/collections/642764895_122114712681201757_7394994187547001976_n.jpg', alt: 'Collection 1' },
    { id: 2, src: '/images/collections/642768528_122114712717201757_8652885872791572117_n.jpg', alt: 'Collection 2' },
    { id: 3, src: '/images/collections/642783119_122114713191201757_3862070075968936317_n.jpg', alt: 'Collection 3' },
    { id: 4, src: '/images/collections/643443482_122114713257201757_4721397527349384054_n.jpg', alt: 'Collection 4' },
    { id: 5, src: '/images/collections/643455835_122114712507201757_3671630705052577863_n.jpg', alt: 'Collection 5' },
    { id: 6, src: '/images/collections/643906298_122114713281201757_6646891545366515441_n.jpg', alt: 'Collection 6' },
    { id: 7, src: '/images/collections/643939612_122114713455201757_6038227303509315726_n.jpg', alt: 'Collection 7' },
    { id: 8, src: '/images/collections/644372470_122114715291201757_9094854661127977245_n.jpg', alt: 'Collection 8' },
    { id: 9, src: '/images/collections/644433824_122114713341201757_4339172049418887621_n.jpg', alt: 'Collection 9' },
    { id: 10, src: '/images/collections/644575712_122114713425201757_613076490705345721_n.jpg', alt: 'Collection 10' },
    { id: 11, src: '/images/collections/644630204_122114712591201757_4131185576712466063_n.jpg', alt: 'Collection 11' },
    { id: 12, src: '/images/collections/645251760_122114713371201757_3196467705742775356_n.jpg', alt: 'Collection 12' },
    { id: 13, src: '/images/collections/645585929_122114712633201757_3003544393090892078_n.jpg', alt: 'Collection 13' },
    { id: 14, src: '/images/collections/645657806_122114713515201757_2372861865953053943_n.jpg', alt: 'Collection 14' },
    { id: 15, src: '/images/collections/645736810_122114714607201757_6533164401227911649_n.jpg', alt: 'Collection 15' },
    { id: 16, src: '/images/collections/645835124_122114715375201757_8945384437588113129_n.jpg', alt: 'Collection 16' },
  ];

  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section id="collections" style={{ backgroundColor: '#1a1a1a', padding: '80px 16px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', letterSpacing: '0.05em' }}>
            COLLECTIONS
          </h2>
          <div style={{ width: '96px', height: '4px', backgroundColor: '#ffffff', margin: '0 auto' }}></div>
        </div>

        {/* Gallery Grid */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '16px' }}>
          {collectionImages.map((image) => (
            <div
              key={image.id}
              onClick={() => openModal(image)}
              style={{
                width: '280px',
                height: '280px',
                overflow: 'hidden',
                borderRadius: '12px',
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            style={{
              position: 'fixed',
              top: '24px',
              right: '24px',
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '32px',
              cursor: 'pointer',
              padding: '8px',
              zIndex: 101
            }}
          >
            ✕
          </button>

          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt}
            style={{ 
              maxWidth: '100%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '8px'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Collections;
