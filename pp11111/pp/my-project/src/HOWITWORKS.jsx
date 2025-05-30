

const youtubeUrl = 'https://youtu.be/P3ZTxke4AOU';

const HowItWorks = () => {
  let embedUrl = '';

  try {
    if (youtubeUrl.includes('youtu.be/')) {
      embedUrl = youtubeUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    } else if (youtubeUrl.includes('watch?v=')) {
      embedUrl = youtubeUrl.replace('watch?v=', 'embed/');
    }
    embedUrl = embedUrl.split('?')[0]; // strip any URL params
  } catch (err) {
    console.error('Invalid YouTube URL:', err);
  }

  return (
    <div className="py-20 bg-gray-100 dark:bg-gray-900 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-10">
          How It Works
        </h2>
        {embedUrl ? (
          <div className="relative w-full" style={{ paddingBottom: '56.25%', height: 0 }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl"
              src={embedUrl}
              title="How It Works Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <p className="text-center text-red-500">Video could not be loaded.</p>
        )}
      </div>
    </div>
  );
};

export default HowItWorks;