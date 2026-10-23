import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  Globe2, 
  ShieldCheck, 
  Activity, 
  ArrowRight,
  Maximize2,
  FileText,
  Radio,
  Satellite,
  Compass,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function InstitutionalPortal({ data, backendOnline, onOpenDashboard }) {
  const [timeUtc, setTimeUtc] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeUtc(now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const groundMoisture = data?.ground_moisture !== undefined ? data.ground_moisture : 58.4;
  const isroData = data?.isro_satellite_data || {};
  const sceneId = isroData.scene_id || 'NISAR_L2_SM_V01';
  const sarDb = isroData.sar_backscatter_db !== undefined ? isroData.sar_backscatter_db : -11.4;
  const sec1 = data?.sector_1_agriculture_and_seeds || {};
  const sec3 = data?.sector_3_nhai_highway_and_disaster || {};
  const sec4 = data?.sector_4_public_health_and_pharma || {};
  const slopeSat = sec3.highway_slope_saturation !== undefined ? sec3.highway_slope_saturation : 66.1;
  const sowingConf = sec1.sowing_confidence_index_pct !== undefined ? sec1.sowing_confidence_index_pct : 92.4;
  const dengueScore = sec4.dengue_malaria_14day_outbreak_score !== undefined ? sec4.dengue_malaria_14day_outbreak_score : 24.0;
  const alertState = data?.alert_trigger_state || 'SOWING_WINDOW_ACTIVE';

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-[#111111] font-sans antialiased selection:bg-[#111111] selection:text-[#FBFBF9] flex flex-col justify-between">
      
      {/* 1. TOP UTILITY TICKER BAR */}
      <div className="border-b border-[#111111] px-4 md:px-8 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono tracking-widest uppercase bg-[#F3F2EE]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 font-medium">
            <span className={`h-2 w-2 rounded-full ${backendOnline ? 'bg-[#111111] animate-pulse' : 'bg-neutral-400'}`} />
            DIRECTORATE OF HYDRO-CARTOGRAPHIC INTELLIGENCE & SATELLITE RADAR
          </span>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="hidden md:inline text-neutral-600">CADASTRE SEC: IN-PB-JAL-01 (FARMING // 1.3.2)</span>
        </div>
        <div className="flex items-center gap-6 text-neutral-600">
          <span className="hidden sm:inline font-bold text-[#111111]">LAT 31.2559°N / LON 75.7037°E [1.3.2]</span>
          <span className="font-semibold text-[#111111]">{timeUtc || 'INITIALIZING CLOCK...'}</span>
          <span className={`px-2 py-0.5 text-[10px] border border-[#111111] font-bold ${backendOnline ? 'bg-[#111111] text-[#FBFBF9]' : 'bg-transparent text-neutral-700'}`}>
            {backendOnline ? 'BACKEND LIVE' : 'OFFLINE CACHE'}
          </span>
        </div>
      </div>

      {/* 2. INSTITUTIONAL MASTHEAD */}
      <header className="border-b border-[#111111] px-4 md:px-8 py-8 md:py-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-[10px] tracking-[0.25em] text-neutral-500 uppercase">
              <span>DOC REF: 2026 / ISRO-NRSC-BHOONIDHI</span>
              <span>•</span>
              <span>CLEARANCE: GENERAL CITIZEN ACCESSIBILITY</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#111111] leading-[0.92]">
              National Soil &<br className="hidden sm:inline" /> Planetary Radar Service
            </h1>
          </div>

          {/* PROMINENT HIGH-CONTRAST DASHBOARD CTA BUTTON */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenDashboard}
              id="primary-dashboard-button"
              className="group relative inline-flex items-center justify-between gap-8 bg-[#111111] text-[#FBFBF9] border-2 border-[#111111] px-8 py-5 transition-all duration-200 hover:bg-[#FBFBF9] hover:text-[#111111] active:translate-y-0.5 shadow-[5px_5px_0px_0px_rgba(17,17,17,1)] hover:shadow-none cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-75 group-hover:opacity-100 text-neutral-300 group-hover:text-neutral-700">
                  SYSTEM CONSOLE // SECTOR 1-4
                </span>
                <span className="font-serif text-3xl md:text-4xl font-normal tracking-wide leading-none mt-1">
                  Access Live Dashboard
                </span>
              </div>
              <div className="h-10 w-10 border border-neutral-700 group-hover:border-[#111111] flex items-center justify-center transition-colors">
                <ArrowUpRight 
                  size={24} 
                  strokeWidth={1.5}
                  className="transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" 
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* 3. STRUCTURAL META LEDGER */}
      <section className="border-b border-[#111111] bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-[#111111]">
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              [ 01 // ORBITAL OBSERVATORY ]
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#111111]">ISRO NISAR Radar</p>
            <p className="font-mono text-[11px] text-neutral-600 mt-1">S/L-Band 100m Polarimetry</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              [ 02 // PHYSICAL ANCHOR NODE ]
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#111111]">Node-01 // Village Hub</p>
            <p className="font-mono text-[11px] text-neutral-600 mt-1">₹5,000 LoRaWAN Ground Truth</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              [ 03 // VOLUMETRIC MOISTURE ]
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#111111]">{groundMoisture}% Volumetric</p>
            <p className="font-mono text-[11px] text-neutral-600 mt-1">Dubois Dielectric Kernel</p>
          </div>
          <div className="p-5 md:p-6">
            <p className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 mb-1">
              [ 04 // PROTOCOL STATUS ]
            </p>
            <p className="font-serif text-2xl md:text-3xl text-[#111111]">{alertState.replace(/_/g, ' ')}</p>
            <p className="font-mono text-[11px] text-neutral-600 mt-1">Autonomous Multilingual Dispatch</p>
          </div>
        </div>
      </section>

      {/* 4. MAIN EDITORIAL CONTENT GRID */}
      <main className="max-w-7xl mx-auto w-full px-4 md:px-8 py-10 md:py-16 flex-grow">
        
        {/* EXECUTIVE SUMMARY & ARCHIVAL STATEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 mb-14">
          <div className="lg:col-span-8">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 block mb-3">
              INSTITUTIONAL DIRECTIVE & PUBLIC MANDATE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-snug tracking-tight mb-6">
              Calibrating orbital radar backscatter against physical ground consensus to eliminate smallholder crop loss.
            </h2>
            <p className="text-base md:text-lg text-neutral-700 font-sans leading-relaxed max-w-2xl mb-8">
              The Directorate operates a synchronized dual-layer observatory coupling ISRO NRSC Bhoonidhi 
              orbital polarimetry with low-cost rural ground telemetry nodes. Standardized data streams are made 
              accessible to agricultural cooperatives, state disaster authorities, and parametric underwriters.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={onOpenDashboard}
                className="inline-flex items-center gap-2 border border-[#111111] bg-white px-5 py-2.5 font-mono text-xs uppercase tracking-wider hover:bg-[#111111] hover:text-white transition-colors cursor-pointer"
              >
                <span>Launch Interactive CADASTRE Map</span>
                <ChevronRight size={14} />
              </button>
              <a 
                href="#registry" 
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-600 hover:text-black hover:underline px-2 py-2.5"
              >
                <span>Review Public Specifications</span>
              </a>
            </div>
          </div>

          {/* AUTHORITATIVE ACTION REGISTRY */}
          <div className="lg:col-span-4 border border-[#111111] p-6 md:p-7 bg-white flex flex-col justify-between shadow-[4px_4px_0px_0px_rgba(17,17,17,0.15)]">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#111111] mb-5">
                <span className="font-mono text-[11px] tracking-wider uppercase font-semibold">
                  INDEXED TELEMETRY STREAM
                </span>
                <span className="font-mono text-[10px] bg-neutral-100 border border-neutral-300 px-2 py-0.5">
                  LIVE FEED
                </span>
              </div>
              <ul className="space-y-3 font-mono text-xs text-neutral-700 divide-y divide-neutral-200">
                <li className="pt-2 flex justify-between">
                  <span className="text-neutral-500">ORBITAL SCENE</span>
                  <span className="text-[#111111] font-semibold">{sceneId}</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-neutral-500">SIGMA-0 RADAR</span>
                  <span className="text-[#111111] font-semibold">{sarDb} dB</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-neutral-500">SLOPE PORE SAT</span>
                  <span className="text-[#111111] font-semibold">{slopeSat}% [STABLE]</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-neutral-500">SOWING CONFIDENCE</span>
                  <span className="text-[#111111] font-semibold">{sowingConf}% OPTIMAL</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-neutral-500">LORA CARRIER</span>
                  <span className="text-[#111111] font-semibold">865.2 MHz (SF7)</span>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={onOpenDashboard}
              className="mt-6 inline-flex items-center justify-between border-t border-[#111111] pt-4 text-xs font-mono tracking-wider uppercase hover:underline cursor-pointer"
            >
              <span>Launch 10x10 High-Resolution Grid</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* 5. MULTI-SECTOR ARCHIVAL MATRIX (4-COLUMN BALANCED GRID) */}
        <div className="border border-[#111111] bg-white divide-y md:divide-y-0 md:divide-x divide-[#111111] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          
          {/* SECTOR 01 - FARMING */}
          <div className="p-6 md:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">
                  DIVISION 01
                </span>
                <span className="font-mono text-[10px] border border-[#111111] px-2 py-0.5 uppercase bg-[#111111] text-[#FBFBF9] font-bold">
                  AGRI [1.3.2]
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal mb-1">
                Kharif Sowing Window
              </h3>
              <p className="font-mono text-[10px] text-emerald-800 font-bold mb-3">
                GPS: 31.2559° N, 75.7037° E
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                Prevents false germination and smallholder seed capital destruction by verifying 72-hour root-zone moisture buffers at 31.2559° N, 75.7037° E [1.3.2].
              </p>
            </div>
            <div className="border-t border-[#111111] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-500">DISPATCH CONF</span>
              <span className="font-semibold text-emerald-800">{sowingConf}% ACTIVE</span>
            </div>
          </div>

          {/* SECTOR 02 - INSURANCE */}
          <div className="p-6 md:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">
                  DIVISION 02
                </span>
                <span className="font-mono text-[10px] border border-[#111111] px-2 py-0.5 uppercase">
                  PARAMETRIC
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal mb-1">
                Crop Insurance Relief
              </h3>
              <p className="font-mono text-[10px] text-amber-700 font-bold mb-3">
                GPS: 31.2559° N, 75.7037° E
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                Direct algorithmic smart-claim execution based on dielectric deficit thresholds, bypassing traditional 90-day physical patwari surveyor delays.
              </p>
            </div>
            <div className="border-t border-[#111111] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-500">SETTLEMENT</span>
              <span className="font-semibold text-[#111111]">0.0 DAYS (AUTO)</span>
            </div>
          </div>

          {/* SECTOR 03 - HIGHWAY */}
          <div className="p-6 md:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">
                  DIVISION 03
                </span>
                <span className="font-mono text-[10px] border border-[#111111] px-2 py-0.5 uppercase bg-[#f97316]/10 text-orange-800 font-bold">
                  NHAI [2.1.2]
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal mb-1">
                National Highway Safety
              </h3>
              <p className="font-mono text-[10px] text-orange-700 font-bold mb-3">
                GPS: 20.16° N, 84.41° E
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                Mohr-Coulomb shear analysis of 34° highway cut-slopes (20.16° N, 84.41° E [2.1.2]) for early roadblock activation during extreme cloudburst events.
              </p>
            </div>
            <div className="border-t border-[#111111] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-500">PORE SAT</span>
              <span className="font-semibold text-neutral-800">{slopeSat}% [STABLE]</span>
            </div>
          </div>

          {/* SECTOR 04 - DENGUE */}
          <div className="p-6 md:p-7 flex flex-col justify-between hover:bg-[#FAF9F5] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs tracking-widest uppercase text-neutral-500">
                  DIVISION 04
                </span>
                <span className="font-mono text-[10px] border border-[#111111] px-2 py-0.5 uppercase bg-red-100 text-red-800 font-bold">
                  VECTOR [2.1.1]
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal mb-1">
                Dengue Surveillance
              </h3>
              <p className="font-mono text-[10px] text-red-700 font-bold mb-3">
                GPS: 12.1664° N, 78.5441° E
              </p>
              <p className="text-xs text-neutral-600 leading-relaxed font-sans mb-6">
                14-day hydro-entomological predictive risk modeling across low-lying micro-depression sinks (12.1664° N, 78.5441° E [2.1.1]) for early mosquito vector abatement.
              </p>
            </div>
            <div className="border-t border-[#111111] pt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-neutral-500">OUTBREAK RISK</span>
              <span className="font-semibold text-red-700">{dengueScore}/100</span>
            </div>
          </div>

        </div>
      </main>

      {/* 6. INSTITUTIONAL FOOTER */}
      <footer className="border-t border-[#111111] bg-[#F3F2EE] px-4 md:px-8 py-8 font-mono text-xs text-neutral-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-[#111111] font-semibold uppercase tracking-wider mb-1">
              REPUBLIC HYDRO-INTELLIGENCE ARCHIVE & REGISTRY
            </p>
            <p className="text-[11px] text-neutral-500">
              Compliant with ISO 19115 Geographic Information Metadata Standard • Cryptographic Hash: SHA-256: 8f4b...39e1
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <button onClick={onOpenDashboard} className="hover:text-[#111111] underline cursor-pointer">
              Command Dashboard
            </button>
            <span className="text-neutral-400">/</span>
            <span className="text-[#111111] font-bold">2026 EDITION</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
