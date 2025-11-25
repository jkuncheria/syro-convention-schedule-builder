const fs = require('fs');
const csv = fs.readFileSync('fullschedule.csv', 'utf-8');
const lines = csv.split('\n');
const events = [];
let currentDay = '';
let eventCounter = { th: 0, fr: 0, sa: 0, su: 0 };
let lastBreakoutTime = null;

function mapFocusGroup(fg) {
  const fgUpper = (fg || '').toUpperCase();
  if (fgUpper === 'ALL' || fgUpper === 'MT' || fgUpper === 'PRE-REGISTERED' || fgUpper === 'SPONSORS' || fgUpper === 'WOMEN' || fgUpper.includes('SACRISTANS') || fgUpper.includes('EARLY TRAVELERS')) {
    return 'All';
  }
  if (fgUpper === '15+' || fgUpper.includes('YOUNG ADULTS')) {
    return 'Young Adults';
  }
  if (fgUpper.includes('YOUTH')) {
    return 'Youth';
  }
  if (fgUpper.includes('FAMILIES') || fgUpper.includes('FAMILY')) {
    return 'Families';
  }
  if (fgUpper.includes('CLERGY') || fgUpper.includes('TRUSTEES') || fgUpper.includes('PIONEERS')) {
    return 'Clergy';
  }
  return 'All';
}

function mapCategory(cat, title) {
  const catUpper = (cat || '').toUpperCase();
  const titleUpper = (title || '').toUpperCase();
  
  if (catUpper === 'KEYNOTE') return 'Keynote';
  if (catUpper === 'PANEL' || titleUpper.includes('PANEL')) return 'Panel';
  if (titleUpper.includes('QURBANA') || titleUpper.includes('LITURGY') || titleUpper.includes('ROSARY') || titleUpper.includes('ADORATION') || titleUpper.includes('CONFESSION') || titleUpper.includes('MEDITATION')) return 'Liturgy';
  if (titleUpper.includes('DINNER') || titleUpper.includes('LUNCH') || titleUpper.includes('BREAKFAST') || titleUpper.includes('REFRESHMENTS')) return 'Social';
  if (titleUpper.includes('CULTURAL') || titleUpper.includes('PERFORMANCE') || titleUpper.includes('SHOWCASE') || titleUpper.includes('FEST') || titleUpper.includes('CEREMONY') || titleUpper.includes('INAUGURATION')) return 'Social';
  if (catUpper === 'SPIRITUAL') return 'Workshop';
  if (catUpper === 'LEADERSHIP' || catUpper === 'FINANCIAL' || catUpper === 'FAMILY' || catUpper === 'HEALTH' || catUpper === 'SENIORS' || catUpper === 'BUSINESS') return 'Workshop';
  return 'Workshop';
}

function parseDay(dayStr) {
  if (!dayStr) return null;
  const dayUpper = dayStr.toUpperCase();
  if (dayUpper.includes('THURSDAY')) return 'Thursday';
  if (dayUpper.includes('FRIDAY')) return 'Friday';
  if (dayUpper.includes('SATURDAY')) return 'Saturday';
  if (dayUpper.includes('SUNDAY')) return 'Sunday';
  return null;
}

function parseTime(timeStr) {
  if (!timeStr || timeStr.trim() === '') return { start: null, end: null };
  if (timeStr.includes('Breakour Session')) {
    const match = timeStr.match(/(\d{1,2}:\d{2}\s*(?:AM|PM))\s*–\s*(\d{1,2}:\d{2}\s*(?:AM|PM))/);
    if (match) {
      return { start: match[1], end: match[2] };
    }
  }
  const parts = timeStr.split('–').map(s => s.trim());
  if (parts.length === 2) {
    return { start: parts[0], end: parts[1] };
  }
  return { start: null, end: null };
}

function fixTime(timeStr, day) {
  if (!timeStr) return timeStr;
  // Fix obvious errors: 11:20 PM should be 11:20 AM for morning events
  if (timeStr.includes('11:20 PM') && day === 'Saturday') {
    return timeStr.replace('11:20 PM', '11:20 AM');
  }
  if (timeStr.includes('11:30 PM') && day === 'Saturday') {
    return timeStr.replace('11:30 PM', '11:30 AM');
  }
  return timeStr.trim();
}

function getDayPrefix(day) {
  if (day === 'Thursday') return 'th';
  if (day === 'Friday') return 'fr';
  if (day === 'Saturday') return 'sa';
  if (day === 'Sunday') return 'su';
  return 'ev';
}

function escapeString(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line || line === '') continue;
  
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let j = 0; j < line.length; j++) {
    const char = line[j];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      fields.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  fields.push(current.trim());
  
  let [day, time, eventName, focusGroup, venue, description, category] = fields;
  
  if (!eventName || eventName === 'Break' || eventName === '') {
    if (eventName === 'Break') {
      lastBreakoutTime = null;
    }
    continue;
  }
  
  const parsedDay = parseDay(day);
  if (parsedDay) {
    currentDay = parsedDay;
    lastBreakoutTime = null;
  }
  
  if (!currentDay) continue;
  
  let parsedTime = parseTime(time);
  
  if (time && time.includes('Breakour Session')) {
    parsedTime = parseTime(time);
    lastBreakoutTime = parsedTime;
  } else if (!parsedTime.start && lastBreakoutTime) {
    parsedTime = lastBreakoutTime;
  }
  
  if (!parsedTime.start || !parsedTime.end) continue;
  
  parsedTime.start = fixTime(parsedTime.start, currentDay);
  parsedTime.end = fixTime(parsedTime.end, currentDay);
  
  const prefix = getDayPrefix(currentDay);
  eventCounter[prefix]++;
  const id = `${prefix}-${String(eventCounter[prefix]).padStart(2, '0')}`;
  
  events.push({
    id,
    title: eventName,
    day: currentDay,
    startTime: parsedTime.start,
    endTime: parsedTime.end,
    venue: venue || 'TBD',
    focusGroup: mapFocusGroup(focusGroup),
    category: mapCategory(category, eventName),
    description: description || ''
  });
}

// Generate TypeScript code
let tsCode = "import { ConventionEvent, Day, FocusGroup, Category } from './types';\n\n";
tsCode += "export const EVENTS: ConventionEvent[] = [\n";

events.forEach((event, idx) => {
  const isLast = idx === events.length - 1;
  const dayComment = idx === 0 || events[idx - 1].day !== event.day ? `  // ${event.day}\n` : '';
  tsCode += dayComment;
  tsCode += `  {\n`;
  tsCode += `    id: '${event.id}',\n`;
  tsCode += `    title: '${escapeString(event.title)}',\n`;
  tsCode += `    day: Day.${event.day},\n`;
  tsCode += `    startTime: '${event.startTime}',\n`;
  tsCode += `    endTime: '${event.endTime}',\n`;
  tsCode += `    venue: '${escapeString(event.venue)}',\n`;
  tsCode += `    focusGroup: FocusGroup.${event.focusGroup.replace(/ /g, '')},\n`;
  tsCode += `    category: Category.${event.category},\n`;
  tsCode += `    description: '${escapeString(event.description)}'\n`;
  tsCode += `  }${isLast ? '' : ','}\n`;
});

tsCode += "];\n";

fs.writeFileSync('constants.ts', tsCode);
console.log(`Generated ${events.length} events in constants.ts`);

