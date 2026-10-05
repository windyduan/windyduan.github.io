const P={
home:'<path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10.5V20h13v-9.5"/><path d="M9.5 20v-6h5v6"/>',
folder:'<path d="M3 6.5h6l2 2h10v9.5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"/><path d="M3 6.5v-.5a2 2 0 0 1 2-2h4l2 2"/>',
file:'<path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h6"/>',
git:'<circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><path d="M8 5h4a4 4 0 0 1 4 4v8M6 7v8a4 4 0 0 0 4 4h6"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5z"/>',
user:'<circle cx="12" cy="8" r="3"/><path d="M5 21a7 7 0 0 1 14 0"/>',
github:'<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.5 5.5 0 0 0 19.3 3 5.2 5.2 0 0 0 19.2 0S18 0 15 1.7a13.4 13.4 0 0 0-6 0C6 0 4.8 0 4.8 0a5.2 5.2 0 0 0-.1 3A5.5 5.5 0 0 0 3.2 7.5c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 9 18v4"/><path d="M9 19c-4 .9-4-2-5-2"/>',
moon:'<path d="M21 12.8A8.4 8.4 0 1 1 11.2 3a6.6 6.6 0 0 0 9.8 9.8Z"/>',
sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42"/>',
flask:'<path d="M9 3h6M10 3v5.5L4.5 18a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 8.5V3"/><path d="M7.5 15h9"/>',
book:'<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>',
brain:'<path d="M9.5 4.5A3 3 0 0 0 4 6v1a3 3 0 0 0 0 5v1a3 3 0 0 0 3 3 3.5 3.5 0 0 0 2.5-1"/><path d="M14.5 4.5A3 3 0 0 1 20 6v1a3 3 0 0 1 0 5v1a3 3 0 0 1-3 3 3.5 3.5 0 0 1-2.5-1"/><path d="M9.5 4.5V20M14.5 4.5V20"/>',
spark:'<path d="m12 3 1.8 4.2L18 9l-4.2 1.8L12 15l-1.8-4.2L6 9l4.2-1.8Z"/><path d="m18 15 .9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9Z"/>',
terminal:'<path d="m5 7 4 4-4 4"/><path d="M11 17h8"/>',
atom:'<circle cx="12" cy="12" r="1.5"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
palette:'<path d="M12 3a9 9 0 1 0 0 18h1.3a1.7 1.7 0 0 0 1.2-2.9l-.6-.6a1.7 1.7 0 0 1 1.2-2.9H18a3 3 0 0 0 3-3A8.6 8.6 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r=".8"/><circle cx="10" cy="6.5" r=".8"/><circle cx="14" cy="6.5" r=".8"/>',
chart:'<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
briefcase:'<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V4h8v3M3 12h18"/>',
eye:'<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z"/><circle cx="12" cy="12" r="2.5"/>',
external:'<path d="M7 17 17 7M7 7h10v10"/>',
chevronLeft:'<path d="m15 18-6-6 6-6"/>',
chevronRight:'<path d="m9 18 6-6-6-6"/>'
};
export function icon(name,cls="icon"){return '<svg class="'+cls+'" viewBox="0 0 24 24" aria-hidden="true">'+(P[name]||P.spark)+'</svg>'}
export function iconPath(name){return P[name]||P.spark}
