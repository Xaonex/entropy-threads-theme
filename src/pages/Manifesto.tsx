import SignalInterference from '../components/SignalInterference';

const Manifesto = () => {
  return (
    <div className="min-h-screen bg-void-black text-white flex items-center justify-center pt-24 pb-12 px-6 w-full max-w-[100vw] overflow-x-hidden">
      <div className="max-w-2xl text-center space-y-12 w-full max-w-full overflow-hidden">
        {/* LAYOUT FIX: Removed overflow-hidden, Added padding buffer for expansion animation */}
        <h1 className="w-full px-4 md:px-12 w-full px-4 md:px-12 text-2xl md:text-6xl font-black tracking-tighter whitespace-normal break-words max-w-full overflow-hidden">
            <SignalInterference 
                text="THE STATIC IN THE SIGNAL" 
            />
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base text-gray-400 leading-relaxed tracking-wide">
            <p>
                We are not a brand. We are a frequency.
            </p>
            <p>
                In a world of infinite noise, we are the glitch that reveals the structure. 
                The artifacts we create are not just clothing; they are physical manifestations of digital entropy.
            </p>
            <p>
                Designed in the void. Compiled for the street.
            </p>
            <p className="text-signal-red pt-4">
                // SYSTEM_STATUS: ONLINE
                <br />
                // WELCOME_TO_THE_VOID
            </p>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;


