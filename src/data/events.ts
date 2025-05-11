
export interface EventParticipant {
  id: string;
  name?: string;
  avatarUrl: string;
}

export interface EventScheduleItem {
  time: string;
  activity: string;
  description?: string;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO string
  location: string;
  category: string;
  imageUrl?: string;
  description?: string; // Short description for cards
  fullDescription?: string; // Longer description for detail page
  hostName?: string;
  hostAvatarUrl?: string;
  participants?: EventParticipant[];
  scheduleItems?: EventScheduleItem[];
  groupChatId?: string;
  tags?: string[];
  latitude?: number; // For map link
  longitude?: number; // For map link
}

export const dummyEventsData: Event[] = [
  {
    id: '1',
    title: 'Neon Nights Fest',
    date: '2024-08-15T20:00:00Z',
    location: 'Downtown Plaza, New York, NY',
    latitude: 40.7128,
    longitude: -74.0060,
    category: 'Music',
    imageUrl: 'https://picsum.photos/seed/neonfest/1200/675',
    description: 'Experience the ultimate music festival with glowing lights and electrifying beats.',
    fullDescription: 'Join us for Neon Nights Fest, an immersive experience featuring top DJs, stunning visual installations, and a night of unforgettable music. Explore multiple stages, food trucks, and art exhibits. Doors open at 6 PM, music starts at 8 PM. All ages welcome.',
    hostName: 'VibeWave Presents',
    hostAvatarUrl: 'https://picsum.photos/seed/vibewavelogo/100/100',
    participants: [
      { id: 'p1', avatarUrl: 'https://picsum.photos/seed/participant1/80/80', name: 'Alice' },
      { id: 'p2', avatarUrl: 'https://picsum.photos/seed/participant2/80/80', name: 'Bob' },
      { id: 'p3', avatarUrl: 'https://picsum.photos/seed/participant3/80/80', name: 'Charlie' },
      { id: 'p4', avatarUrl: 'https://picsum.photos/seed/participant4/80/80', name: 'Diana' },
    ],
    scheduleItems: [
      { time: '20:00', activity: 'DJ Sparkle Kicks Off', description: 'Main Stage' },
      { time: '21:30', activity: 'Laser Light Show', description: 'Visual Extravaganza' },
      { time: '22:00', activity: 'Headliner: The Chromatics', description: 'Main Stage' },
      { time: '23:30', activity: 'Closing Set: DJ VibeMaster', description: 'Glow Arena' },
    ],
    groupChatId: 'neonfest2024',
    tags: ['MusicFestival', 'EDM', 'LiveDJ', 'Visuals', 'Nightlife'],
  },
  {
    id: '2',
    title: 'Tech Meetup Wave',
    date: '2024-08-20T18:30:00Z',
    location: 'Innovation Hub, San Francisco, CA',
    latitude: 37.7749,
    longitude: -122.4194,
    category: 'Tech',
    imageUrl: 'https://picsum.photos/seed/techmeetup/1200/675',
    description: 'Connect with tech enthusiasts and innovators in your city.',
    fullDescription: 'Our monthly Tech Meetup Wave brings together developers, designers, founders, and investors. This month, we have guest speakers discussing the future of AI and Web3. Networking opportunities and refreshments provided. Bring your ideas and your business cards!',
    hostName: 'SF Tech Circle',
    hostAvatarUrl: 'https://picsum.photos/seed/sftechlogo/100/100',
    participants: [
      { id: 't1', avatarUrl: 'https://picsum.photos/seed/techuser1/80/80', name: 'Eva' },
      { id: 't2', avatarUrl: 'https://picsum.photos/seed/techuser2/80/80', name: 'Frank' },
    ],
    scheduleItems: [
      { time: '18:30', activity: 'Networking & Welcome' },
      { time: '19:00', activity: 'Keynote: AI Advancements by Dr. Innovate' },
      { time: '19:45', activity: 'Panel: The Future of Web3' },
      { time: '20:30', activity: 'Open Networking' },
    ],
    groupChatId: 'techmeetupSFaug',
    tags: ['Technology', 'Networking', 'AI', 'Web3', 'Startups'],
  },
  {
    id: '3',
    title: 'Wellness Weekend Retreat',
    date: '2024-08-25T10:00:00Z',
    location: 'Serene Park, Austin, TX',
    category: 'Wellness',
    imageUrl: 'https://picsum.photos/seed/wellness/1200/675',
    description: 'Recharge your mind and body with our wellness retreat activities.',
    fullDescription: 'Escape the hustle and bustle with our Wellness Weekend Retreat. Enjoy yoga sessions, guided meditations, healthy cooking workshops, and nature walks. All meals are plant-based and locally sourced. Perfect for anyone looking to de-stress and rejuvenate.',
    hostName: 'ZenLife Events',
    hostAvatarUrl: 'https://picsum.photos/seed/zenlifelogo/100/100',
    participants: [
      { id: 'w1', avatarUrl: 'https://picsum.photos/seed/wellnessuser1/80/80', name: 'Grace' },
      { id: 'w2', avatarUrl: 'https://picsum.photos/seed/wellnessuser2/80/80', name: 'Henry' },
      { id: 'w3', avatarUrl: 'https://picsum.photos/seed/wellnessuser3/80/80', name: 'Ivy' },
    ],
    tags: ['Wellness', 'Yoga', 'Meditation', 'Retreat', 'HealthyLiving'],
  },
  {
    id: '4',
    title: 'Local Food Fair',
    date: '2024-07-22T12:00:00Z',
    location: 'Town Square, Austin, TX',
    category: 'Food',
    imageUrl: 'https://picsum.photos/seed/foodfair/1200/675',
    description: "Taste the best local cuisines.",
    fullDescription: "Explore a variety of delicious foods from local vendors at our annual Food Fair. Live music, cooking demonstrations, and family-friendly activities.",
    hostName: 'Austin Foodies',
    hostAvatarUrl: 'https://picsum.photos/seed/austinfoodies/100/100',
    participants: [
      { id: 'f1', avatarUrl: 'https://picsum.photos/seed/foodie1/80/80' },
      { id: 'f2', avatarUrl: 'https://picsum.photos/seed/foodie2/80/80' },
    ],
    tags: ['Food', 'Local', 'Fair', 'FamilyFriendly'],
  },
  {
    id: '5',
    title: 'Indie Film Night',
    date: '2024-09-01T20:00:00Z',
    location: 'Cinema Paradiso, Chicago, IL',
    category: 'Film',
    imageUrl: 'https://picsum.photos/seed/filmnight/1200/675',
    description: "Showcasing independent filmmakers.",
    fullDescription: "Discover new talent and compelling stories at our Indie Film Night. Featuring short films and documentaries from up-and-coming filmmakers, followed by a Q&A session.",
    hostName: 'IndieReel Club',
    hostAvatarUrl: 'https://picsum.photos/seed/indiereel/100/100',
    participants: [],
    tags: ['Film', 'Independent', 'Cinema', 'ShortFilm'],
  },
];
