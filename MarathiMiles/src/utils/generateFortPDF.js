/**
 * generateFortPDF.js
 * Generates a comprehensive Maharashtra fort journey PDF using jsPDF
 */

import jsPDF from 'jspdf';

// ── Color palette ──────────────────────────────────────────────────────────
const SAFFRON  = [210, 105, 30];   // #D2691E
const ORANGE   = [192, 98,  42];   // #C0622A
const DARK_BG  = [44,  24,  16];   // #2C1810
const GOLD     = [184, 134, 11];   // #B8860B
const LIGHT_BG = [253, 250, 243];  // #FDFAF3
const GRAY     = [102, 102, 102];
const MID_GRAY = [150, 150, 150];

// Helper: set fill + draw color from rgb array
function setFill(doc, rgb) { doc.setFillColor(...rgb); }
function setDraw(doc, rgb) { doc.setDrawColor(...rgb); }
function setTextColor(doc, rgb) { doc.setTextColor(...rgb); }

// Helper: draw a horizontal rule
function hRule(doc, y, x1 = 14, x2 = 196, color = MID_GRAY) {
  setDraw(doc, color);
  doc.setLineWidth(0.3);
  doc.line(x1, y, x2, y);
}

// Helper: add a new page with background + running header
function addPage(doc, fortName) {
  doc.addPage();
  // light warm background
  setFill(doc, LIGHT_BG);
  doc.rect(0, 0, 210, 297, 'F');
  // thin saffron top bar
  setFill(doc, SAFFRON);
  doc.rect(0, 0, 210, 6, 'F');
  // running footer
  setTextColor(doc, MID_GRAY);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`PastPort Maharashtra  •  ${fortName} Journey Guide`, 14, 291);
  doc.text(`Page ${doc.internal.getCurrentPageInfo().pageNumber}`, 196, 291, { align: 'right' });
}

// ── Section header block ───────────────────────────────────────────────────
function sectionHeader(doc, title, emoji, y) {
  setFill(doc, SAFFRON);
  doc.roundedRect(14, y, 182, 10, 2, 2, 'F');
  setTextColor(doc, [255, 255, 255]);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text(`${emoji}  ${title}`, 19, y + 6.8);
  return y + 14;
}

// ── Key-value row ──────────────────────────────────────────────────────────
function kvRow(doc, label, value, y, labelX = 14, valueX = 70) {
  setTextColor(doc, GRAY);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(label, labelX, y);
  setTextColor(doc, DARK_BG);
  doc.setFont('helvetica', 'normal');
  const lines = doc.splitTextToSize(String(value), 125);
  doc.text(lines, valueX, y);
  return y + (lines.length * 4.5) + 1;
}

// ── Timeline row ───────────────────────────────────────────────────────────
function timelineRow(doc, time, activity, desc, tip, y, isEven) {
  const ROW_H = 16;
  if (isEven) {
    setFill(doc, [245, 233, 217]);
    doc.rect(14, y - 1, 182, ROW_H, 'F');
  }
  // Time badge
  setFill(doc, ORANGE);
  doc.roundedRect(15, y + 1, 28, 6, 1, 1, 'F');
  setTextColor(doc, [255, 255, 255]);
  doc.setFontSize(7.5);
  doc.setFont('helvetica', 'bold');
  doc.text(time, 29, y + 5.2, { align: 'center' });

  // Activity
  setTextColor(doc, DARK_BG);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(activity, 48, y + 5);

  // Description
  setTextColor(doc, GRAY);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  const descLines = doc.splitTextToSize(desc, 100);
  doc.text(descLines, 48, y + 9.5);

  // Tip pill
  if (tip) {
    setFill(doc, [255, 243, 225]);
    doc.roundedRect(152, y + 1, 42, 5.5, 1, 1, 'F');
    setTextColor(doc, ORANGE);
    doc.setFontSize(7);
    doc.setFont('helvetica', 'italic');
    const tipText = doc.splitTextToSize(`💡 ${tip}`, 40);
    doc.text(tipText[0], 154, y + 5);
  }

  return y + ROW_H;
}

// ══════════════════════════════════════════════════════════════════════════
export function generateFortPDF(fort) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  // ── PAGE 1: COVER ────────────────────────────────────────────────────────
  // Full saffron gradient cover background
  setFill(doc, DARK_BG);
  doc.rect(0, 0, 210, 297, 'F');

  // Decorative diagonal stripe
  setFill(doc, SAFFRON);
  doc.rect(0, 0, 210, 4, 'F');
  doc.rect(0, 293, 210, 4, 'F');

  // Central orange panel
  setFill(doc, ORANGE);
  doc.roundedRect(20, 60, 170, 170, 8, 8, 'F');

  // Embossed text area
  setFill(doc, DARK_BG);
  doc.roundedRect(28, 68, 154, 154, 5, 5, 'F');

  // PASTPORT header
  setTextColor(doc, GOLD);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('P A S T P O R T   M A H A R A S H T R A', 105, 85, { align: 'center' });

  // Decorative rule
  setFill(doc, GOLD);
  doc.rect(40, 89, 130, 0.5, 'F');

  // Fort name
  setTextColor(doc, [255, 255, 255]);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  const nameParts = doc.splitTextToSize(fort.name.toUpperCase(), 140);
  doc.text(nameParts, 105, 115, { align: 'center' });

  // Subtitle
  setTextColor(doc, [245, 207, 160]);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'italic');
  const subtitleLines = doc.splitTextToSize(fort.subtitle || fort.era, 140);
  doc.text(subtitleLines, 105, 135, { align: 'center' });

  // Location
  setTextColor(doc, GOLD);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.text(`📍  ${fort.location}`, 105, 150, { align: 'center' });

  // Significance
  setTextColor(doc, [200, 180, 150]);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'normal');
  const sigLines = doc.splitTextToSize(fort.significance, 130);
  doc.text(sigLines, 105, 165, { align: 'center' });

  // Bottom rule + stamp
  setFill(doc, GOLD);
  doc.rect(40, 198, 130, 0.5, 'F');
  setTextColor(doc, MID_GRAY);
  doc.setFontSize(8);
  doc.text('YOUR COMPLETE JOURNEY GUIDE  •  TIMINGS  •  ROUTES  •  TIPS', 105, 207, { align: 'center' });

  // Generated date
  const today = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
  setTextColor(doc, [100, 100, 100]);
  doc.setFontSize(8);
  doc.text(`Generated: ${today}`, 105, 280, { align: 'center' });

  // ── PAGE 2: QUICK FACTS + HOW TO REACH ───────────────────────────────────
  addPage(doc, fort.name);
  let y = 18;

  setTextColor(doc, ORANGE);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(fort.name, 14, y);
  y += 5;
  setTextColor(doc, GRAY);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text(fort.era || fort.subtitle, 14, y);
  y += 3;
  hRule(doc, y, 14, 196, SAFFRON);
  y += 8;

  // Quick Facts
  y = sectionHeader(doc, 'FORT AT A GLANCE', '🏰', y);
  const qf = fort.quickFacts || {};
  const facts = [
    ['Elevation',          qf.elevation       || 'N/A'],
    ['Built By',           qf.builtBy         || 'N/A'],
    ['Best Time to Visit', qf.bestTimeToVisit || 'October – February'],
    ['Entry Fee',          qf.entryFee        || 'Indians: ₹25 | Foreigners: ₹200'],
    ['Open Hours',         qf.openHours       || '9:00 AM – 6:00 PM'],
    ['Walking Distance',   qf.walkingDistance || 'N/A'],
    ['Unique Feature',     qf.uniqueFeature   || fort.significance],
  ];
  facts.forEach(([label, val]) => { y = kvRow(doc, label, val, y); });

  y += 4;
  hRule(doc, y);
  y += 8;

  // How to Reach
  y = sectionHeader(doc, 'HOW TO REACH', '🗺️', y);

  const routes = [
    { mode: '🚌  By Bus',   detail: `MSRTC buses run from Pune to Junnar regularly. Journey: ~3 hours. Alight at Junnar Bus Stand, then take an auto-rickshaw (₹30-50) or walk 2 km to fort base.` },
    { mode: '🚗  By Car',   detail: `From Pune: NH 60 via Chakan → Rajgurunagar → Junnar. Distance: ~94 km, approx 2.5 hrs. Parking available at fort base (₹50).` },
    { mode: '🚂  By Train', detail: `Nearest railway station: Pune Junction. Take a bus/cab from Pune to Junnar (no direct train). Cab from Pune: ₹1,200–1,600 one-way.` },
    { mode: '🛺  Local',    detail: `Auto-rickshaws and shared jeeps ply from Junnar bus stand to fort base. Negotiate rate; expect ₹30–60 per person.` },
  ];

  routes.forEach(r => {
    setTextColor(doc, ORANGE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(r.mode, 16, y);
    y += 4.5;
    setTextColor(doc, DARK_BG);
    doc.setFontSize(8.5);
    doc.setFont('helvetica', 'normal');
    const dLines = doc.splitTextToSize(r.detail, 176);
    doc.text(dLines, 16, y);
    y += dLines.length * 4 + 3;
  });

  // ── PAGE 3: FULL DAY ITINERARY ────────────────────────────────────────────
  addPage(doc, fort.name);
  y = 18;

  y = sectionHeader(doc, 'YOUR FULL DAY ITINERARY', '⏱️', y);

  // Table header
  setFill(doc, [245, 233, 217]);
  doc.rect(14, y, 182, 7, 'F');
  setTextColor(doc, ORANGE);
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.text('TIME',        19,  y + 5);
  doc.text('ACTIVITY',    48,  y + 5);
  doc.text('DETAILS',     105, y + 5);
  doc.text('TIP',         155, y + 5);
  y += 9;
  hRule(doc, y, 14, 196, ORANGE);
  y += 2;

  const itinerary = fort.itineraries?.oneDay || fort.itineraries?.halfDay || [];
  itinerary.forEach((item, i) => {
    if (y > 270) { addPage(doc, fort.name); y = 18; }
    y = timelineRow(
      doc,
      item.time,
      item.activity,
      item.description || item.desc || '',
      item.tip || '',
      y,
      i % 2 === 0
    );
  });

  // If no itinerary, show fallback
  if (itinerary.length === 0) {
    setTextColor(doc, GRAY);
    doc.setFontSize(9);
    doc.text('Detailed itinerary coming soon. Explore the fort at your own pace!', 14, y + 6);
    y += 14;
  }

  y += 6;
  hRule(doc, y);
  y += 8;

  // Travel Tips
  if (y > 240) { addPage(doc, fort.name); y = 18; }
  y = sectionHeader(doc, 'INSIDER TRAVEL TIPS', '💡', y);
  const tips = fort.travelTips || [
    'Start early to avoid afternoon heat',
    'Carry sufficient water',
    'Wear sturdy shoes for rocky terrain',
    'Hire a local guide for better historical insights',
    'Carry cash for local purchases',
  ];
  tips.forEach((tip, i) => {
    if (y > 270) { addPage(doc, fort.name); y = 18; }
    const bullet = i % 2 === 0 ? '▸' : '–';
    setTextColor(doc, ORANGE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(bullet, 16, y);
    setTextColor(doc, DARK_BG);
    doc.setFont('helvetica', 'normal');
    const tLines = doc.splitTextToSize(tip, 170);
    doc.text(tLines, 22, y);
    y += tLines.length * 4.5 + 1;
  });

  // ── PAGE 4: FOOD + SHOPPING + NEARBY ─────────────────────────────────────
  addPage(doc, fort.name);
  y = 18;

  // Cuisine
  y = sectionHeader(doc, 'MUST-TRY FOOD NEAR THE FORT', '🍽️', y);
  const cuisine = fort.cuisine || [];
  cuisine.forEach((c, i) => {
    if (y > 255) { addPage(doc, fort.name); y = 18; }
    setFill(doc, i % 2 === 0 ? [253, 248, 238] : [255, 255, 255]);
    doc.roundedRect(14, y - 1, 182, 18, 2, 2, 'F');

    setTextColor(doc, DARK_BG);
    doc.setFontSize(9.5);
    doc.setFont('helvetica', 'bold');
    doc.text(c.name, 19, y + 5);

    setTextColor(doc, GRAY);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const cDesc = doc.splitTextToSize(c.description, 120);
    doc.text(cDesc[0], 19, y + 10);

    // Price + spice
    setFill(doc, SAFFRON);
    doc.roundedRect(148, y + 1, 22, 5, 1, 1, 'F');
    setTextColor(doc, [255, 255, 255]);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'bold');
    doc.text(c.priceRange || '', 159, y + 4.8, { align: 'center' });

    setTextColor(doc, GRAY);
    doc.setFontSize(7);
    doc.text(`🌶 ${c.spiceLevel || ''}`, 148, y + 13);
    doc.text(`🕐 ${c.bestTime || ''}`, 165, y + 13);

    y += 21;
  });

  y += 4;
  hRule(doc, y);
  y += 8;

  // Shopping
  if (y > 220) { addPage(doc, fort.name); y = 18; }
  y = sectionHeader(doc, 'SHOPPING & BAZAARS', '🛍️', y);
  const shopping = fort.shopping || [];
  shopping.forEach(s => {
    if (y > 265) { addPage(doc, fort.name); y = 18; }
    setTextColor(doc, ORANGE);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`• ${s.name}`, 16, y);
    setTextColor(doc, MID_GRAY);
    doc.setFontSize(7.5);
    doc.setFont('helvetica', 'normal');
    doc.text(`⏰ ${s.timing || ''}   |   ★ Best for: ${s.bestFor || ''}   |   🛒 Must Buy: ${s.mustBuy || ''}`, 22, y + 4.5);
    setTextColor(doc, DARK_BG);
    doc.setFontSize(8);
    const sLines = doc.splitTextToSize(s.description, 172);
    doc.text(sLines, 22, y + 9);
    y += sLines.length * 4 + 12;
  });

  y += 4;
  hRule(doc, y);
  y += 8;

  // Nearby Attractions
  if (y > 220) { addPage(doc, fort.name); y = 18; }
  y = sectionHeader(doc, 'NEARBY ATTRACTIONS', '📍', y);
  const nearby = fort.nearbyAttractions || [];
  nearby.forEach(n => {
    if (y > 270) { addPage(doc, fort.name); y = 18; }
    setTextColor(doc, DARK_BG);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${n.name}`, 16, y);
    setTextColor(doc, ORANGE);
    doc.setFontSize(8);
    doc.text(`— ${n.distance}`, 70, y);
    setTextColor(doc, GRAY);
    doc.setFont('helvetica', 'normal');
    const nLines = doc.splitTextToSize(n.description, 172);
    doc.text(nLines, 16, y + 4.5);
    y += nLines.length * 4 + 9;
  });

  // ── LAST PAGE: HISTORY HIGHLIGHTS ─────────────────────────────────────────
  addPage(doc, fort.name);
  y = 18;
  y = sectionHeader(doc, 'HISTORICAL JOURNEY', '📜', y);

  const timeline = fort.timeline || [];
  timeline.forEach(chapter => {
    if (y > 255) { addPage(doc, fort.name); y = 18; }

    const isMajor = chapter.isMajor;
    if (isMajor) {
      setFill(doc, SAFFRON);
      doc.roundedRect(14, y - 1, 182, 5, 1, 1, 'F');
      setTextColor(doc, [255, 255, 255]);
    } else {
      setTextColor(doc, ORANGE);
    }

    doc.setFontSize(isMajor ? 9 : 8.5);
    doc.setFont('helvetica', 'bold');
    doc.text(`${chapter.year}  —  ${chapter.era || (chapter.text?.en?.title)}`, 18, y + 3);
    y += 7;

    setTextColor(doc, DARK_BG);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    const previewText = chapter.preview || chapter.text?.en?.preview || '';
    const pLines = doc.splitTextToSize(previewText, 176);
    doc.text(pLines.slice(0, 2), 18, y);
    y += pLines.slice(0, 2).length * 4 + 4;
  });

  // ── FINAL FOOTER PAGE ──────────────────────────────────────────────────────
  // Back cover
  doc.addPage();
  setFill(doc, DARK_BG);
  doc.rect(0, 0, 210, 297, 'F');
  setFill(doc, ORANGE);
  doc.rect(0, 0, 210, 4, 'F');
  doc.rect(0, 293, 210, 4, 'F');

  // Decorative circle
  setFill(doc, SAFFRON);
  doc.circle(105, 120, 55, 'F');
  setFill(doc, DARK_BG);
  doc.circle(105, 120, 48, 'F');

  setTextColor(doc, GOLD);
  doc.setFontSize(30);
  doc.setFont('helvetica', 'bold');
  doc.text('🏰', 105, 112, { align: 'center' });

  setTextColor(doc, [255, 255, 255]);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PastPort Maharashtra', 105, 132, { align: 'center' });

  setTextColor(doc, [200, 170, 130]);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'italic');
  doc.text('Preserving Heritage Through Storytelling', 105, 140, { align: 'center' });

  setTextColor(doc, [130, 130, 130]);
  doc.setFontSize(8);
  doc.text('Jai Maharashtra 🚩', 105, 200, { align: 'center' });

  // Save the PDF
  doc.save(`${fort.name.replace(/\s+/g, '_')}_PastPort_Journey.pdf`);
}
