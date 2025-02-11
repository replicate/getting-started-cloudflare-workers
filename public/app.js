const ImageGenerator = () => {
  const [prompt, setPrompt] = React.useState('');
  const [images, setImages] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const samplePrompts = [
    "cats riding bikes on the boardwalk",
    "mice playing poker", 
    "dogs riding motorcycles in the desert",
    "penguins having a tea party",
    "rabbits playing basketball",
    "giraffes dancing ballet in tutus",
    "elephants painting masterpieces",
    "monkeys having a beach party",
    "pandas practicing kung fu",
    "owls teaching mathematics",
    "hippos ice skating gracefully",
    "kangaroos playing soccer",
    "sloths racing Formula 1 cars",
    "turtles hosting a cooking show",
    "flamingos performing in a rock band"
  ];

  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    return samplePrompts[randomIndex];
  };

  React.useEffect(() => {
    // Set a random prompt when component mounts
    setPrompt(getRandomPrompt());
  }, []);

  const generateImage = async () => {
    try {
      setLoading(true);
      const response = await fetch('/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      setImages(prevImages => [{
        url: data.imageUrl,
        prompt,
        timestamp: new Date().toLocaleTimeString()
      }, ...prevImages]);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading && prompt) {
      generateImage();
      
      // Set a new random prompt after submission, unless user has entered a custom prompt
      if (samplePrompts.includes(prompt)) {
        setPrompt(getRandomPrompt());
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Flux Image Generator
      </h1>

      <p className="text-center text-gray-600 mb-8">
        Generate images with{" "}
        <a href="https://replicate.com/black-forest-labs/flux-schnell" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline">Flux</a> on{" "}
        <a href="https://replicate.com/" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline">Replicate</a>, and host it on{" "}
        <a href="https://developers.cloudflare.com/workers/" target="_blank" rel="noopener noreferrer" className="text-gray-800 underline">Cloudflare Workers</a>.
      </p>

      <form onSubmit={handleSubmit} className="flex gap-4 justify-center mb-8">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt"
          className="flex-1 max-w-lg px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        />
        <button
          type="submit"
          disabled={loading || !prompt}
          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </form>
      <div className="space-y-8">
        {images.map((image, index) => (
          <div key={image.timestamp} className="bg-white p-4 rounded-md shadow-lg">
            <img
              src={image.url}
              alt={image.prompt}
              className="rounded-md w-full mb-2"
            />
            <div>
              <p className="text-gray-700 font-medium text-center">"{image.prompt}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ImageGenerator />);
