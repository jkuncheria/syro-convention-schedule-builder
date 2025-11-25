import React, { useState } from 'react';
import { Users, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { Day } from '../types';

interface Speaker {
  name: string;
  title: string;
  bio: string;
  day: Day;
  image: string;
}

const SPEAKERS: Speaker[] = [
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

const DAY_LABELS: Record<Day, string> = {
  [Day.Thursday]: 'Thursday, July 9',
  [Day.Friday]: 'Friday, July 10',
  [Day.Saturday]: 'Saturday, July 11',
  [Day.Sunday]: 'Sunday, July 12',
};

const SpeakersPage: React.FC = () => {
  const [expandedSpeaker, setExpandedSpeaker] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<Day | 'all'>('all');

  const filteredSpeakers = selectedDay === 'all' 
    ? SPEAKERS 
    : SPEAKERS.filter(s => s.day === selectedDay);

  const speakersByDay = Object.values(Day).reduce((acc, day) => {
    acc[day] = SPEAKERS.filter(s => s.day === day);
    return acc;
  }, {} as Record<Day, Speaker[]>);

  const toggleExpand = (speakerName: string) => {
    setExpandedSpeaker(expandedSpeaker === speakerName ? null : speakerName);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 mb-6">
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Speakers</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the distinguished speakers joining us for SyroCon 2026. 
              From faith leaders to artists, entrepreneurs to medical professionals, 
              our speakers bring diverse perspectives and inspiring stories.
            </p>
          </div>
        </div>
      </div>

      {/* Day Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          <button
            onClick={() => setSelectedDay('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedDay === 'all'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
            }`}
          >
            All Days
          </button>
          {Object.values(Day).map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                selectedDay === day
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
            >
              <Calendar className="h-4 w-4" />
              {DAY_LABELS[day]}
            </button>
          ))}
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpeakers.map((speaker) => {
            const isExpanded = expandedSpeaker === speaker.name;
            const bioPreview = speaker.bio.substring(0, 150) + '...';
            
            return (
              <div
                key={speaker.name}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
              >
                {/* Speaker Image */}
                <div className="w-full aspect-[3/2] bg-gray-50 overflow-hidden flex items-center justify-center p-4">
                  {speaker.image ? (
                    <img
                      src={speaker.image}
                      alt={speaker.name}
                      className="max-w-full max-h-full object-contain object-center"
                      onError={(e) => {
                        // Fallback to a placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent && !parent.querySelector('.placeholder')) {
                          const placeholder = document.createElement('div');
                          placeholder.className = 'placeholder w-full h-full flex items-center justify-center bg-gray-200 text-gray-400';
                          placeholder.innerHTML = '<svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>';
                          parent.appendChild(placeholder);
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                      <Users className="h-16 w-16" />
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4 min-h-[100px]">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {speaker.name}
                    </h3>
                    <p className="text-sm text-indigo-600 font-medium mb-3 line-clamp-2">
                      {speaker.title}
                    </p>
                    <div className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                      <Calendar className="h-3 w-3" />
                      {DAY_LABELS[speaker.day]}
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {isExpanded ? speaker.bio : bioPreview}
                    </p>
                    {speaker.bio.length > 150 && (
                      <button
                        onClick={() => toggleExpand(speaker.name)}
                        className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
                      >
                        {isExpanded ? (
                          <>
                            Show Less <ChevronUp className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            Read More <ChevronDown className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSpeakers.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No speakers found for the selected day.</p>
          </div>
        )}

        {/* Summary by Day */}
        {selectedDay === 'all' && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Speakers by Day
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {Object.values(Day).map((day) => (
                <div
                  key={day}
                  className="bg-white rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Calendar className="h-5 w-5 text-indigo-600" />
                    <h3 className="font-semibold text-gray-900">{DAY_LABELS[day]}</h3>
                  </div>
                  <p className="text-2xl font-bold text-indigo-600 mb-1">
                    {speakersByDay[day].length}
                  </p>
                  <p className="text-sm text-gray-600">
                    {speakersByDay[day].length === 1 ? 'Speaker' : 'Speakers'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeakersPage;

