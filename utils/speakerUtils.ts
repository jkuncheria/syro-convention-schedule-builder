import { Day } from '../types';

export interface Speaker {
  name: string;
  title: string;
  bio: string;
  day: Day;
  image: string;
}

export const SPEAKERS: Speaker[] = [
  // Day 1 - Thursday
  {
    name: 'Padma Shri Jayaram',
    title: 'Film Actor & Chenda Artist',
    bio: "Padma Shri Jayaram is one of South India's most cherished film actors, celebrated for his warm screen presence and extraordinary versatility in Malayalam and Tamil cinema. With over three decades in the industry, he continues to delight audiences with his natural acting, impeccable comic timing, and effortless portrayal of diverse characters. Beyond the silver screen, Jayaram is a gifted chenda artist and a talented performer in mimicry and classical arts. Honored with the Padma Shri for his contributions to the arts, he remains a beloved and multi-talented icon admired across generations.",
    day: Day.Thursday,
    image: '/Padmashri-Jayaram..jpg',
  },
  {
    name: 'Stephen Devassy',
    title: 'Pianist, Composer & Music Producer',
    bio: "Stephen Devassy is an internationally acclaimed Indian pianist, composer, and music producer known for his unmatched speed, precision, and versatility on the keyboard. A child prodigy turned global performer, he has collaborated with leading artists across India and abroad, bringing a unique blend of Western, classical, and contemporary styles to the stage. Through both his music and his ministry, Stephen continues to inspire countless young people in India and abroad.",
    day: Day.Thursday,
    image: '/stephen-devassy.jpg',
  },
  {
    name: 'Nithya Mammen',
    title: 'Award-Winning Playback Singer',
    bio: "Nithya Mammen is an award-winning playback singer from Kerala, admired for her melodious voice and expressive singing style. Known for her versatility, from soulful melodies to contemporary track, she has earned wide acclaim, including the Kerala State Film Award for Best Female Playback Singer. With her warm stage presence and musical finesse, Nithya continues to captivate audiences through film music, live performances, and independent projects.",
    day: Day.Thursday,
    image: '/nithya-mammen.jpeg',
  },
  {
    name: 'Erika Kirk',
    title: 'CEO & Chair of Turning Point USA',
    bio: "Erika Kirk is an American nonprofit leader, former Miss Arizona USA, and the current CEO and Chair of Turning Point USA. Born Erika Frantzve, she has a background in political science, ministry work, and youth-focused community initiatives. After years of involvement in faith-based outreach and entrepreneurship, she stepped into national prominence in 2025 following the death of her husband, Charlie Kirk, assuming leadership of Turning Point USA and becoming a notable voice in public engagement.",
    day: Day.Thursday,
    image: '/erika-kirk.jpg',
  },
  // Day 2 - Friday
  {
    name: 'Bishop Earl K. Fernandes',
    title: 'Bishop of the Diocese of Columbus',
    bio: "Bishop Earl K. Fernandes is the Bishop of the Diocese of Columbus, becoming the first Indian-American to lead a U.S. Catholic diocese. He holds a doctorate in moral theology and is widely recognized for his intellectual depth, pastoral leadership, and commitment to evangelization and formation. Bishop Fernandes has spoken widely across the country and has contributed to multiple essay collections, including a book published by the Institute for Priestly Formation in 2014.",
    day: Day.Friday,
    image: '/earl-fernandes.jpeg',
  },
  {
    name: 'Mar George Jacob Koovakad',
    title: 'Bishop of the Syro-Malabar Catholic Church',
    bio: "Mar George Jacob Koovakad is a bishop of the Syro-Malabar Catholic Church, recognized for his pastoral leadership, spiritual depth, and dedicated service to the faithful. His ministry is marked by a gentle and thoughtful approach, strong commitment to faith formation, and a deep concern for the spiritual well-being of families and communities. Through his prayerful presence, clear teaching, and steadfast dedication to the mission of the Church, Mar Koovakad continues to guide and inspire the faithful toward a more vibrant and Christ-centered life.",
    day: Day.Friday,
    image: '/George-Koovakad.jpg',
  },
  {
    name: 'Mar Raphael Thattil',
    title: 'Major Archbishop of the Syro-Malabar Catholic Church',
    bio: "Mar Raphael Thattil is the Major Archbishop of the Syro-Malabar Catholic Church, widely respected for his pastoral wisdom, administrative leadership, and deep spiritual vision. Having served the Church in various roles—including as Auxiliary Bishop of Trichur and Bishop of Shamshabad—he is known for his commitment to unity, evangelization, and strengthening the global Syro-Malabar community. His ministry is marked by humility, clarity of teaching, and a sincere dedication to guiding the faithful toward a deeper relationship with Christ. Mar Thattil continues to be a unifying and inspiring shepherd for the Church worldwide.",
    day: Day.Friday,
    image: '/raphael.jpeg',
  },
  {
    name: 'Vaughese Maliekkal',
    title: 'Chief Executive Officer of Hollister',
    bio: "Vaughese Maliekkal is a respected community leader and the Chief Executive Officer of Hollister. With a distinguished record of professional excellence, he brings strategic vision, strong organizational leadership, and a deep commitment to service. In the Syro-Malabar community, Vaughese has been an active supporter of numerous diocesan and parish initiatives, contributing his time, expertise, and steady guidance to strengthen and uplift the community. His blend of professional achievement and faith-centered leadership continues to inspire many.",
    day: Day.Friday,
    image: '/george-maliekal.jpg',
  },
  // Day 3 - Saturday
  {
    name: 'Dr. Jose Periappuram',
    title: 'Cardiothoracic Surgeon',
    bio: "Dr. Jose Periappuram is a distinguished cardiothoracic surgeon from Kerala, celebrated for his expertise in cardiac surgery and his leadership in advancing heart care. A sought-after speaker, he delivers talks and presentations on cardiac health, preventive care, and organ donation. Beyond medicine, he is deeply committed to charity and philanthropy, supporting medical outreach, patient assistance, and community health initiatives. His service and compassion continue to make a lasting impact on healthcare in Kerala and beyond.",
    day: Day.Saturday,
    image: '', // Image not found in public folder - will show placeholder
  },
  {
    name: 'Fr. Joseph Puthenpurackal',
    title: 'Priest of the Syro-Malabar Catholic Church',
    bio: "Fr. Joseph Puthenpurackal is a dedicated priest of the Syro-Malabar Catholic Church, known for his pastoral leadership, warm and approachable nature, and deep commitment to serving the community. He is actively involved in liturgical celebrations, faith formation, and pastoral counseling, and his preaching is appreciated for its clarity, depth, and practical relevance. Through his sincere service and prayerful presence, Fr. Joseph continues to inspire the faithful and strengthen the spiritual life of the community.",
    day: Day.Saturday,
    image: '/Joseph-Puthenpurackal.png',
  },
  {
    name: 'Fr. Bobby Jose Kattikad',
    title: 'Priest & Renowned Retreat Preacher',
    bio: "Fr. Bobby Jose Kattikad is a distinguished priest and renowned retreat preacher of the Syro-Malabar Catholic Church, widely respected for his profound biblical insights and compelling style of evangelization. He has devoted his ministry to faith formation through retreats, missions, and media outreach, including his well-known program Vachanamirtham. With a unique gift for presenting deep theological concepts in simple and engaging ways, Fr. Bobby has inspired spiritual renewal in countless individuals and families around the world. He remains a highly sought-after speaker, admired for his humility, pastoral sensitivity, and unwavering commitment to the mission of the Church.",
    day: Day.Saturday,
    image: '/Bobby-Jose-Kattikad.jpg',
  },
  {
    name: 'Dr. Edward Sri',
    title: 'Catholic Theologian, Speaker & Author',
    bio: "Dr. Edward Sri is a renowned Catholic theologian, speaker, and author known for making the richness of the Catholic faith accessible and practical for everyday life. A co-founder of FOCUS (Fellowship of Catholic University Students), he has written numerous bestselling books and hosts the popular podcast All Things Catholic. Dr. Sri is recognized for his engaging teaching style, his deep knowledge of Scripture and Church tradition, and his ability to inspire audiences to live their faith with clarity, conviction, and joy.",
    day: Day.Saturday,
    image: '/edward-sri.jpeg',
  },
  {
    name: 'Usha Vance',
    title: 'Attorney & Wife of U.S. Senator J.D. Vance',
    bio: "Usha Vance is an accomplished attorney and the wife of U.S. Senator J.D. Vance. A graduate of Yale University and Yale Law School, she has built a distinguished legal career with experience in both public service and private practice. Known for her intelligence, poise, and grounded presence, Usha is often recognized for her role in supporting community initiatives. Her story as the daughter of Indian immigrants and her journey through elite academic and professional spaces make her an inspiring example of dedication, resilience, and cultural pride.",
    day: Day.Saturday,
    image: '/usha-vance.jpg',
  },
  {
    name: 'Vivek Ramaswamy',
    title: 'Entrepreneur, Author & Political Figure',
    bio: "Vivek Ramaswamy is an entrepreneur, author, and political figure known for his outspoken views on innovation, free speech, and American identity. The son of Indian immigrants, he rose to prominence as the founder of Roivant Sciences and later became a national voice through his bestselling books and 2024 U.S. presidential campaign. With a background from Harvard and Yale Law School, Ramaswamy is recognized for challenging conventional thinking, championing meritocracy, and inspiring conversations about the role of immigrants and innovators in shaping America's future.",
    day: Day.Saturday,
    image: '/vivek-rama.jpg',
  },
];

// Map event IDs to speaker names (based on event descriptions)
export const EVENT_TO_SPEAKER_MAP: Record<string, string[]> = {
  'th-03': ['Mar Raphael Thattil'], // Holy Qurbana - Main celebrant
  'th-07': ['Padma Shri Jayaram', 'Stephen Devassy'], // Thaala Vismayam
  'fr-05': ['Bishop Earl K. Fernandes'], // Introducing Bishop Fernandez
  'fr-06': ['Bishop Earl K. Fernandes'], // Bishop Earl K. Fernandez
  'fr-08': ['Mar Raphael Thattil'], // Concluding Remarks
  'sa-05': ['Vivek Ramaswamy', 'Usha Vance'], // Panel discussion
  'sa-10': ['Fr. Bobby Jose Kattikad'], // Retreat
  'sa-12': ['Fr. Joseph Puthenpurackal'], // Harmony in Marriage
  'sa-15': ['Padma Shri Jayaram', 'Stephen Devassy', 'Nithya Mammen'], // Cultural Program
};

// Helper function to get speakers for an event
export const getSpeakersForEvent = (eventId: string): Speaker[] => {
  const speakerNames = EVENT_TO_SPEAKER_MAP[eventId] || [];
  return SPEAKERS.filter(speaker => speakerNames.includes(speaker.name));
};

// Helper function to find speaker by name (fuzzy match)
export const findSpeakerByName = (name: string): Speaker | null => {
  const normalizedName = name.toLowerCase().trim();
  return SPEAKERS.find(speaker => {
    const speakerName = speaker.name.toLowerCase();
    // Check if the name contains the speaker's name or vice versa
    return speakerName.includes(normalizedName) || normalizedName.includes(speakerName.split(' ')[speakerName.split(' ').length - 1]);
  }) || null;
};

