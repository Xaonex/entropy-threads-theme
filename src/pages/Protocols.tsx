import SignalInterference from '../components/SignalInterference';
import DecryptedText from '../components/react-bits/DecryptedText';

const Protocols = () => {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-void-black text-white font-mono px-6">
      <div className="container mx-auto max-w-4xl">
        
        {/* HEADER */}
        <div className="mb-20 border-b border-white/10 pb-8">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-signal-red">
                <SignalInterference text="SYSTEM_PROTOCOLS" />
            </h1>
            <p className="text-static-gray text-sm md:text-base max-w-xl">
                // GOVERNING_DYNAMICS_FOR_ENTROPY_THREADS.<br/>
                // COMPLIANCE_IS_MANDATORY.
            </p>
        </div>

        {/* PROTOCOLS GRID */}
        <div className="grid grid-cols-1 gap-12">
            
            {/* PROTOCOL 01 */}
            <div className="group">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-glitch mb-4 border-l-2 border-cyan-glitch pl-4">
                    // PROTOCOL_01: FABRICATION_&_TRANSMISSION
                </h3>
                <div className="pl-5 border-l border-white/10 ml-[1px] py-2 space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                    <p>
                        STATUS: <span className="text-white">ON_DEMAND.</span> To minimize entropy (waste), every artifact is fabricated only upon signal reception.
                    </p>
                    <p>
                        FABRICATION_TIME: <span className="text-white">3-7 CYCLES (DAYS)</span>.
                    </p>
                    <p>
                        GLOBAL_TRANSMISSION: <span className="text-signal-red animate-pulse">ACTIVE</span>. Tracking ID assigned upon dispatch.
                    </p>
                </div>
            </div>

            {/* PROTOCOL 02 */}
            <div className="group">
                <h3 className="text-xl md:text-2xl font-bold text-signal-red mb-4 border-l-2 border-signal-red pl-4">
                     // PROTOCOL_02: RETURN_LOOP
                </h3>
                <div className="pl-5 border-l border-white/10 ml-[1px] py-2 space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                    <p>
                        WINDOW: <span className="text-white">30 CYCLES (DAYS)</span> from reception.
                    </p>
                    <p>
                        FIRST_RETURN: COMPLIMENTARY (Free of Charge).
                        <br/>
                        SUBSEQUENT_RETURNS: NOMINAL_FEE APPLIED.
                        <br/>
                        DEFECTIVE_ARTIFACTS: Immediate replacement authorized.
                    </p>
                    <p>
                        WRONG_SIZE: Exchange protocol available.
                    </p>
                    <p className="text-xs uppercase tracking-widest border border-white/20 p-2 inline-block">
                        CONDITION: Artifacts must be unworn and unwashed to re-enter the system.
                    </p>
                </div>
            </div>

            {/* PROTOCOL 03 */}
            <div className="group">
                <h3 className="text-xl md:text-2xl font-bold text-cyan-glitch mb-4 border-l-2 border-cyan-glitch pl-4">
                    // PROTOCOL_03: DATA_ENCRYPTION
                </h3>
                 <div className="pl-5 border-l border-white/10 ml-[1px] py-2 space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                    <p>
                        ENCRYPTION_LEVEL: <span className="text-white">HIGH</span>.
                    </p>
                    <p>
                        User data is processed solely for transaction completion and transmission.
                        <br/>
                        We do not sell signal data to third-party interceptors.
                    </p>
                    <p className="text-cyan-glitch/80">
                        COMPLIANCE: GDPR / CCPA Protocols Active.
                    </p>
                </div>
            </div>

            {/* PROTOCOL 04 */}
            <div className="group">
                <h3 className="text-xl md:text-2xl font-bold text-signal-red mb-4 border-l-2 border-signal-red pl-4">
                    // PROTOCOL_04: FABRICATION_LOCK
                </h3>
                 <div className="pl-5 border-l border-white/10 ml-[1px] py-2 space-y-4 text-gray-400 text-sm md:text-base leading-relaxed">
                    <p className="flex items-center gap-2">
                        <span className="text-signal-red">WARNING:</span> Fabrication begins automatically.
                    </p>
                    <p>
                        CANCELLATION_WINDOW: <span className="text-white">T-MINUS 24 HOURS</span> from order confirmation.
                    </p>
                    <p>
                        Once the fabrication lock is engaged, the process cannot be aborted.
                    </p>
                </div>
            </div>

        </div>

        {/* FOOTER NOTE */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-static-gray opacity-50">
             <DecryptedText text="END_OF_FILE // AWAITING_INPUT" speed={100} characters="X_-" />
        </div>
      </div>
    </div>
  );
};

export default Protocols;


