import { useState, useCallback, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// ─── Fix Leaflet's default icon paths broken by webpack ──────────────────────
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// ─── Custom red teardrop pin icon ─────────────────────────────────────────────
const pinIcon = L.divIcon({
    html: `
    <div style="
      width: 28px; height: 28px;
      background: linear-gradient(135deg, #ef4444, #b91c1c);
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      border: 3px solid white;
      box-shadow: 0 4px 14px rgba(0,0,0,0.4);
    "></div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
});

// ─── Helper: reverse-geocode via Nominatim ────────────────────────────────────
async function reverseGeocode(lat, lng) {
    try {
        const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
            { headers: { 'Accept-Language': 'en' } }
        );
        const data = await res.json();
        return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch {
        return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
}

// ─── Helper: forward-geocode via Nominatim ────────────────────────────────────
async function forwardGeocode(query) {
    const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=5`,
        { headers: { 'Accept-Language': 'en' } }
    );
    return res.json();
}

// ─── Inner component: listens to map clicks ───────────────────────────────────
function ClickHandler({ onMapClick }) {
    useMapEvents({
        click: (e) => onMapClick(e.latlng.lat, e.latlng.lng),
    });
    return null;
}

// ─── Inner component: flies map to a new centre ───────────────────────────────
function FlyTo({ coords }) {
    const map = useMap();
    useEffect(() => {
        if (coords) map.flyTo(coords, 15, { duration: 1.2 });
    }, [coords, map]);
    return null;
}

// ─── Draggable marker ─────────────────────────────────────────────────────────
function DraggableMarker({ position, onDragEnd }) {
    const markerRef = useRef(null);

    const eventHandlers = {
        dragend() {
            const m = markerRef.current;
            if (m) {
                const { lat, lng } = m.getLatLng();
                onDragEnd(lat, lng);
            }
        },
    };

    return (
        <Marker
            draggable
            ref={markerRef}
            position={position}
            icon={pinIcon}
            eventHandlers={eventHandlers}
        />
    );
}

// ═══════════════════════════════════════════════════════════════════════════════
// Main Component
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * LocationPicker — powered by Leaflet + OpenStreetMap (no API key)
 *
 * Props:
 *  - onChange: (locationString) => void   called whenever location changes
 *  - focusColor: 'blue' | 'teal' | 'sky' | 'indigo'   accent color
 */
function LocationPicker({ onChange, focusColor = 'blue' }) {
    const [pin, setPin] = useState(null);   // { lat, lng }
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [searchQuery, setSearch] = useState('');
    const [suggestions, setSugg] = useState([]);
    const [searching, setSearching] = useState(false);
    const searchTimer = useRef(null);

    const accentMap = {
        blue: { ring: '#3b82f6', bg: '#eff6ff', btn: 'linear-gradient(135deg,#2563eb,#1d4ed8)' },
        teal: { ring: '#14b8a6', bg: '#f0fdfa', btn: 'linear-gradient(135deg,#0d9488,#0f766e)' },
        sky: { ring: '#0ea5e9', bg: '#f0f9ff', btn: 'linear-gradient(135deg,#0284c7,#0369a1)' },
        indigo: { ring: '#6366f1', bg: '#eef2ff', btn: 'linear-gradient(135deg,#4f46e5,#4338ca)' },
    };
    const accent = accentMap[focusColor] || accentMap.blue;

    // ── Update pin + notify parent ─────────────────────────────────────────────
    const applyLocation = useCallback(async (lat, lng) => {
        setLoading(true);
        setError('');
        const addr = await reverseGeocode(lat, lng);
        setPin({ lat, lng });
        setAddress(addr);
        onChange(addr);
        setLoading(false);
    }, [onChange]);

    // ── GPS ────────────────────────────────────────────────────────────────────
    const handleGPS = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser.');
            return;
        }
        setLoading(true);
        setError('');
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => applyLocation(latitude, longitude),
            (err) => {
                setLoading(false);
                if (err.code === 1) setError('Location access was denied. Please allow it in browser settings.');
                else if (err.code === 2) setError('Position unavailable. Check GPS / network.');
                else setError('Could not retrieve location. Please try again.');
            },
            { enableHighAccuracy: true, timeout: 12000 }
        );
    };

    // ── Address search (debounced) ─────────────────────────────────────────────
    const handleSearchInput = (e) => {
        const q = e.target.value;
        setSearch(q);
        setSugg([]);
        if (searchTimer.current) clearTimeout(searchTimer.current);
        if (q.trim().length < 3) return;
        searchTimer.current = setTimeout(async () => {
            setSearching(true);
            try {
                const results = await forwardGeocode(q);
                setSugg(results.slice(0, 5));
            } catch { /* ignore */ }
            setSearching(false);
        }, 500);
    };

    const handleSuggClick = (item) => {
        setSugg([]);
        setSearch(item.display_name);
        applyLocation(parseFloat(item.lat), parseFloat(item.lon));
    };

    const mapsUrl = pin
        ? `https://www.openstreetmap.org/?mlat=${pin.lat}&mlon=${pin.lng}&zoom=15`
        : null;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

            {/* ── Search bar ───────────────────────────────────────────────────── */}
            <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <span style={{
                            position: 'absolute', left: '12px', top: '50%',
                            transform: 'translateY(-50%)', color: '#94a3b8', pointerEvents: 'none'
                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={handleSearchInput}
                            placeholder="Search for an address or port…"
                            style={{
                                width: '100%', boxSizing: 'border-box',
                                paddingLeft: '38px', paddingRight: '12px', paddingTop: '10px', paddingBottom: '10px',
                                border: '1.5px solid #e2e8f0', borderRadius: '8px',
                                fontSize: '14px', background: '#f8fafc', color: '#334155',
                                outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                            }}
                            onFocus={e => { e.target.style.borderColor = accent.ring; e.target.style.boxShadow = `0 0 0 3px ${accent.ring}33`; }}
                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = 'none'; }}
                        />
                        {searching && (
                            <span style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                                <svg style={{ animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                            </span>
                        )}
                    </div>

                    {/* GPS button */}
                    <button
                        type="button"
                        onClick={handleGPS}
                        disabled={loading}
                        title="Use my current GPS location"
                        style={{
                            display: 'flex', alignItems: 'center', gap: '6px',
                            padding: '10px 16px', borderRadius: '8px', border: 'none',
                            background: loading ? '#94a3b8' : accent.btn,
                            color: 'white', fontWeight: '600', fontSize: '13px',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                            transition: 'opacity 0.2s, transform 0.15s',
                        }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                        {loading ? (
                            <>
                                <svg style={{ animation: 'spin 1s linear infinite' }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>
                                Locating…
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.713-4.917 3.713-8.627a8 8 0 10-16 0c0 3.71 1.769 6.614 3.713 8.627a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                GPS
                            </>
                        )}
                    </button>
                </div>

                {/* Suggestions dropdown */}
                {suggestions.length > 0 && (
                    <div style={{
                        position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 9999,
                        background: 'white', border: '1px solid #e2e8f0', borderRadius: '8px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)', marginTop: '4px', overflow: 'hidden',
                    }}>
                        {suggestions.map((item, i) => (
                            <button
                                key={i}
                                type="button"
                                onMouseDown={() => handleSuggClick(item)}
                                style={{
                                    width: '100%', textAlign: 'left', padding: '10px 14px',
                                    background: 'none', border: 'none', borderBottom: i < suggestions.length - 1 ? '1px solid #f1f5f9' : 'none',
                                    cursor: 'pointer', fontSize: '13px', color: '#334155',
                                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                                    transition: 'background 0.15s',
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = accent.bg; }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                            >
                                <svg style={{ flexShrink: 0, marginTop: '2px', color: accent.ring }} xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.013 3.713-4.917 3.713-8.627a8 8 0 10-16 0c0 3.71 1.769 6.614 3.713 8.627a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {item.display_name}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ── Error ─────────────────────────────────────────────────────────── */}
            {error && (
                <div style={{
                    display: 'flex', alignItems: 'flex-start', gap: '8px',
                    padding: '10px 14px', borderRadius: '8px',
                    background: '#fef2f2', border: '1px solid #fecaca',
                    color: '#dc2626', fontSize: '13px',
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" style={{ flexShrink: 0, marginTop: '1px' }}>
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </div>
            )}

            {/* ── Hint ──────────────────────────────────────────────────────────── */}
            {!pin && (
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                    Use GPS, search above, or click anywhere on the map to set your location
                </p>
            )}

            {/* ── Address chip ──────────────────────────────────────────────────── */}
            {pin && !loading && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: '10px',
                    padding: '10px 14px', borderRadius: '10px',
                    background: accent.bg, border: `1.5px solid ${accent.ring}44`,
                }}>
                    <span style={{
                        width: '10px', height: '10px', borderRadius: '50%',
                        background: accent.ring, flexShrink: 0,
                        boxShadow: `0 0 0 3px ${accent.ring}33`,
                    }} />
                    <p style={{ fontSize: '13px', color: '#334155', fontWeight: '500', margin: 0, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {address}
                    </p>
                    <button
                        type="button"
                        onClick={() => { setPin(null); setAddress(''); onChange(''); setSearch(''); }}
                        title="Clear location"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '2px', display: 'flex' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            )}

            {/* ── Leaflet Map ───────────────────────────────────────────────────── */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid #e2e8f0', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                <MapContainer
                    center={pin ? [pin.lat, pin.lng] : [25.276987, 55.296249]}
                    zoom={pin ? 15 : 5}
                    style={{ width: '100%', height: '260px' }}
                    attributionControl
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        maxZoom={19}
                    />
                    <ClickHandler onMapClick={applyLocation} />
                    {pin && <FlyTo coords={[pin.lat, pin.lng]} />}
                    {pin && (
                        <DraggableMarker
                            position={[pin.lat, pin.lng]}
                            onDragEnd={applyLocation}
                        />
                    )}
                </MapContainer>

                {/* Footer bar */}
                <div style={{
                    background: '#f8fafc', padding: '8px 14px',
                    borderTop: '1px solid #e2e8f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                        🗺️ Click the map or drag the pin to refine your location
                    </span>
                    {mapsUrl && (
                        <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: '11px', fontWeight: '600', color: accent.ring, textDecoration: 'none', whiteSpace: 'nowrap' }}
                        >
                            Open in Maps ↗
                        </a>
                    )}
                </div>
            </div>

            {/* Spin keyframe injected once */}
            <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

export default LocationPicker;
