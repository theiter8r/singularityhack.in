'use client';

import React, { useState, useEffect } from 'react';
import { Map, MapControls, MapMarker, MarkerContent, MapPopup } from '@/components/ui/map';

interface FooterMapProps {
  center?: [number, number];
  zoom?: number;
  locationName?: string;
  mapsUrl?: string;
}

export default function FooterMap({
  center = [72.972125, 19.243694],
  zoom = 15,
  locationName = 'K.C. College of Engg., Thane',
  mapsUrl = 'https://maps.app.goo.gl/G942eSt3u9vaFEiQ6',
}: FooterMapProps) {
  const [mounted, setMounted] = useState(false);
  const [popupOpen, setPopupOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-[clamp(15rem,25vw,20rem)] overflow-hidden rounded-[clamp(1rem,1.5vw,1.25rem)] border border-[#F2F4F7]/10 bg-[#171A1F] animate-pulse flex items-center justify-center">
        <span className="text-xs uppercase tracking-widest text-[#F2F4F7]/40 font-mono">
          Loading Map...
        </span>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full h-[clamp(15rem,25vw,20rem)] overflow-hidden rounded-[clamp(1rem,1.5vw,1.25rem)] border border-[#F2F4F7]/10 bg-[#171A1F] shadow-sm relative group/map">
        {/* Floating Show/Hide Toggle Button on Map */}
        <button
          type="button"
          onClick={() => setPopupOpen((prev) => !prev)}
          className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-md bg-[#13171B]/85 hover:bg-[#13171B] text-white text-[0.66rem] font-medium tracking-wider uppercase backdrop-blur-md border border-white/20 shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <span className={`w-1.5 h-1.5 rounded-full ${popupOpen ? 'bg-blue-400 animate-pulse' : 'bg-white/40'}`} />
          {popupOpen ? 'Hide' : 'Show'}
        </button>

        <Map center={center} zoom={zoom} theme="dark" className="h-full w-full">
          <MapControls position="top-right" />

          {/* Interactive Marker Pin */}
          <MapMarker longitude={center[0]} latitude={center[1]}>
            <MarkerContent>
              <button
                type="button"
                onClick={() => setPopupOpen((prev) => !prev)}
                title="Click to toggle college details"
                className="relative flex items-center justify-center cursor-pointer group/pin focus:outline-none"
              >
                <span className="absolute -inset-2.5 rounded-full bg-blue-500/35 animate-ping" />
                <div className="relative w-5 h-5 rounded-full bg-[#13171B] border-2 border-white shadow-lg flex items-center justify-center transition-transform group-hover/pin:scale-125">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                </div>
              </button>
            </MarkerContent>
          </MapMarker>

          {/* Standalone MapPopup displaying College Data */}
          {popupOpen && (
            <MapPopup
              longitude={center[0]}
              latitude={center[1]}
              onClose={() => setPopupOpen(false)}
              closeButton={true}
              offset={18}
              className="!bg-[#141414]/95 !backdrop-blur-md !text-white !border !border-[#383838] !p-3.5 !rounded-xl !shadow-2xl max-w-[245px] select-none"
            >
              <div className="space-y-1.5 pr-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-[0.62rem] font-semibold uppercase tracking-wider text-blue-400">
                    Official Venue
                  </span>
                </div>
                <h4 className="text-[0.8rem] font-bold leading-tight text-white">
                  K.C. College of Engineering &amp; Management Studies
                </h4>
                <p className="text-[0.68rem] text-white/75 leading-snug">
                  Mithbunder Rd, Kopri, Thane (E) / Manpada Campus
                </p>
                <div className="pt-1.5 flex items-center justify-between border-t border-[#2e2e2e] text-[0.65rem]">
                  <span className="gold-ink font-mono">Singularity 2.0</span>
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-0.5"
                  >
                    Directions &rarr;
                  </a>
                </div>
              </div>
            </MapPopup>
          )}
        </Map>
      </div>

      <div className="mt-3 w-full flex items-center justify-between px-1 text-[0.72rem] tracking-wider uppercase text-[#F2F4F7]/60">
        <span className="font-medium text-[#F2F4F7]/80 truncate max-w-[70%]">
          {locationName}
        </span>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#F2F4F7] hover:text-[#E3C77E] transition-colors shrink-0 ml-2"
        >
          Open in Maps &rarr;
        </a>
      </div>
    </div>
  );
}
