import { useState, useEffect, useRef } from 'react';

function App() {
  const [voltage, setVoltage] = useState(400);
  const [frequency, setFrequency] = useState(32.3);
  const rotorRef = useRef<SVGGElement>(null);
  const animationRef = useRef<number>(0);

  const p = 2;
  const s = 0.0559;
  const speed = frequency === 0 ? 0 : Math.round(60 * frequency / p * (1 - s));
  const uf = frequency === 0 ? "—" : (voltage / frequency).toFixed(2);

  useEffect(() => {
    let angle = 0;
    const animate = () => {
      if (rotorRef.current && frequency > 0) {
        angle += frequency * 0.6;
        rotorRef.current.setAttribute('transform', `rotate(${angle} 150 150)`);
      }
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationRef.current);
  }, [frequency]);

  return (
    <div className="app-container">
      <div className="main-grid">
        <div className="panel generator-panel">
          <h2 className="panel-title">Générateur Triphasé</h2>

          <div className="control-group">
            <label className="control-label">
              <span className="label-text">Tension (V)</span>
              <span className="label-value voltage-value">{voltage} V</span>
            </label>
            <input
              type="range"
              min="0"
              max="400"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="slider voltage-slider"
            />
          </div>

          <div className="control-group">
            <label className="control-label">
              <span className="label-text">Fréquence (Hz)</span>
              <span className="label-value frequency-value">{frequency.toFixed(3)} Hz</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="0.001"
              value={frequency}
              onChange={(e) => setFrequency(Number(e.target.value))}
              className="slider frequency-slider"
            />
          </div>

          <div className="led-display">
            <div className="led-value voltage-led">U = {voltage} V</div>
            <div className="led-value frequency-led">f = {frequency.toFixed(1)} Hz</div>
          </div>
        </div>

        <div className="panel motor-panel">
          <h2 className="panel-title">Moteur Asynchrone Triphasé</h2>
          <div className="motor-container">
            <div className="motor-visualization">
              <svg viewBox="0 0 300 300" className="motor-svg">
                <defs>
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <circle cx="150" cy="150" r="130" fill="none" stroke="rgba(100,150,255,0.2)" strokeWidth="3"/>

                <g ref={rotorRef} className="rotor-group">
                  <circle cx="150" cy="150" r="80" fill="#2a3040" stroke="rgba(100,150,255,0.4)" strokeWidth="2"/>
                  <g className="rotor-bars">
                    <rect x="135" y="75" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="145" y="75" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="155" y="75" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="165" y="75" width="4" height="30" fill="#555" rx="2"/>

                    <rect x="135" y="195" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="145" y="195" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="155" y="195" width="4" height="30" fill="#555" rx="2"/>
                    <rect x="165" y="195" width="4" height="30" fill="#555" rx="2"/>

                    <rect x="75" y="135" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="75" y="145" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="75" y="155" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="75" y="165" width="30" height="4" fill="#555" rx="2"/>

                    <rect x="195" y="135" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="195" y="145" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="195" y="155" width="30" height="4" fill="#555" rx="2"/>
                    <rect x="195" y="165" width="30" height="4" fill="#555" rx="2"/>
                  </g>

                  <circle cx="150" cy="150" r="25" fill="#1a1f2f" stroke="rgba(100,150,255,0.5)" strokeWidth="2"/>

                  <g className="propeller">
                    <ellipse cx="150" cy="110" rx="15" ry="40" fill="rgba(200, 220, 255, 0.7)" stroke="rgba(100, 150, 255, 0.8)" strokeWidth="2"/>
                    <ellipse cx="150" cy="190" rx="15" ry="40" fill="rgba(200, 220, 255, 0.7)" stroke="rgba(100, 150, 255, 0.8)" strokeWidth="2"/>
                    <ellipse cx="110" cy="150" rx="40" ry="15" fill="rgba(200, 220, 255, 0.7)" stroke="rgba(100, 150, 255, 0.8)" strokeWidth="2"/>
                    <ellipse cx="190" cy="150" rx="40" ry="15" fill="rgba(200, 220, 255, 0.7)" stroke="rgba(100, 150, 255, 0.8)" strokeWidth="2"/>
                  </g>

                  <circle cx="150" cy="150" r="8" fill="rgba(100,150,255,0.6)"/>
                </g>

                <g className="stator-coils">
                  <g className="coil-phase1" filter="url(#glow)">
                    <path d="M 10 145 L 50 145" stroke="#555" strokeWidth="3" fill="none"/>
                    <path d="M 50 125 L 70 125 L 70 165 L 50 165 L 50 125" fill="none" stroke="#4CAF50" strokeWidth="2.5"/>
                    <path d="M 52 127 L 68 127 L 68 163 L 52 163 L 52 127" fill="none" stroke="#4CAF50" strokeWidth="2.5"/>
                    <path d="M 54 129 L 66 129 L 66 161 L 54 161 L 54 129" fill="none" stroke="#4CAF50" strokeWidth="2.5"/>
                    <path d="M 56 131 L 64 131 L 64 159 L 56 159 L 56 131" fill="none" stroke="#4CAF50" strokeWidth="2.5"/>
                    <path d="M 58 133 L 62 133 L 62 157 L 58 157 L 58 133" fill="none" stroke="#4CAF50" strokeWidth="2.5"/>
                    <path d="M 70 145 L 80 145" stroke="#4CAF50" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <rect x="48" y="140" width="24" height="10" fill="#666" stroke="#888" strokeWidth="1" rx="2"/>
                    <text x="35" y="120" fontSize="14" fontWeight="bold" fill="#4CAF50">Bobine 1</text>
                  </g>

                  <g className="coil-phase2" filter="url(#glow)">
                    <path d="M 155 15 L 155 45" stroke="#555" strokeWidth="3" fill="none"/>
                    <path d="M 140 45 L 140 65 L 170 65 L 170 45 L 140 45" fill="none" stroke="#FF5252" strokeWidth="2.5"/>
                    <path d="M 142 47 L 142 63 L 168 63 L 168 47 L 142 47" fill="none" stroke="#FF5252" strokeWidth="2.5"/>
                    <path d="M 144 49 L 144 61 L 166 61 L 166 49 L 144 49" fill="none" stroke="#FF5252" strokeWidth="2.5"/>
                    <path d="M 146 51 L 146 59 L 164 59 L 164 51 L 146 51" fill="none" stroke="#FF5252" strokeWidth="2.5"/>
                    <path d="M 148 53 L 148 57 L 162 57 L 162 53 L 148 53" fill="none" stroke="#FF5252" strokeWidth="2.5"/>
                    <path d="M 155 65 L 155 75" stroke="#FF5252" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <rect x="150" y="43" width="10" height="24" fill="#666" stroke="#888" strokeWidth="1" rx="2"/>
                    <text x="175" y="55" fontSize="14" fontWeight="bold" fill="#FF5252">Bobine 2</text>
                  </g>

                  <g className="coil-phase3" filter="url(#glow)">
                    <path d="M 210 225 L 180 225" stroke="#555" strokeWidth="3" fill="none"/>
                    <path d="M 180 210 L 160 210 L 160 240 L 180 240 L 180 210" fill="none" stroke="#2196F3" strokeWidth="2.5"/>
                    <path d="M 178 212 L 162 212 L 162 238 L 178 238 L 178 212" fill="none" stroke="#2196F3" strokeWidth="2.5"/>
                    <path d="M 176 214 L 164 214 L 164 236 L 176 236 L 176 214" fill="none" stroke="#2196F3" strokeWidth="2.5"/>
                    <path d="M 174 216 L 166 216 L 166 234 L 174 234 L 174 216" fill="none" stroke="#2196F3" strokeWidth="2.5"/>
                    <path d="M 172 218 L 168 218 L 168 232 L 172 232 L 172 218" fill="none" stroke="#2196F3" strokeWidth="2.5"/>
                    <path d="M 160 225 L 150 225" stroke="#2196F3" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <rect x="178" y="220" width="24" height="10" fill="#666" stroke="#888" strokeWidth="1" rx="2"/>
                    <text x="185" y="255" fontSize="14" fontWeight="bold" fill="#2196F3">Bobine 3</text>
                  </g>
                </g>

              </svg>
            </div>
          </div>
        </div>

        <div className="panel tachymeter-panel">
          <h2 className="panel-title">Tachymètre</h2>
          <div className="tachymeter-display">
            <div className="tachymeter-value">
              <span className="tach-label">Vitesse</span>
              <span className="tach-number speed-number">{speed} tr/min</span>
            </div>
            <div className="tachymeter-value">
              <span className="tach-label">Rapport U/f</span>
              <span className="tach-number ratio-number">{uf} V/Hz</span>
            </div>
          </div>
        </div>
      </div>

      <div className="experimental-setup">
        <h3 className="setup-title">Schéma Expérimental du TP</h3>
        <img src="Phase 1-8 copy.png" alt="Schéma expérimental du TP moteur asynchrone" className="setup-diagram"/>
      </div>

      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-license">© 2025 - Tous droits réservés</p>
          <p className="footer-author">Shafik Ben Ahmed</p>
          <p className="footer-position">Professeur de Mathématiques et de Sciences Physiques</p>
          <p className="footer-institution">Lycée Léon Chiris - Grasse</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
