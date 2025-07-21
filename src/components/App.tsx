import React, { useState } from 'react';
import CharacterCard from './CharacterCard';
import Modal from './Modal';
import '../styles.css';

// Define image paths directly
const journalistImage = 'images/journalist.png';
const teacherImage = 'images/teacher.png';
const atHomeImage = 'images/at-home.png';
const userImage = 'images/user.png';

// Sample character data
const characters = [
  {
    id: 1,
    name: 'JOURNALIST',
    imageUrl: journalistImage,
    description: "Writes with passion, edits under duress, and gets paid in exposure (and the occasional tote bag). Runs on caffeine, deadlines, and moral compromise. Always one push notification away from a crisis, but still believes \"the truth matters\"—even if no one clicks.",
    stats: [
      { name: 'INTELLIGENCE', value: 65, maxValue: 100 },
      { name: 'PALATABILITY', value: 75, maxValue: 100 },
      { name: 'INSECURITY', value: 90, maxValue: 100 },
      { name: 'CONNECTION TO "REAL" LIFE', value: 20, maxValue: 100 },
    ],
    modalStats: [
      { name: 'AVERAGE SCREEN TIME', value: '9h 42m/day' },
      { name: 'ARTICLES WRITTEN', value: 762 },
      { name: 'PAGE VIEWS GENERATED', value: '4.2 million (I assume)' },
      { name: 'AD REVENUE DOLLARS MADE FOR OTHER COMPANIES', value: '$347,000 (personal cut: $0.00)' },
      { name: 'MEDIA OUTLETS WORKED FOR', value: '8 (if you count that one internship where they paid in kombucha)' },
      { name: '# OF HOURS SPENT WORRYING ABOUT HOW I LOOK ONLINE', value: 213 },
      { name: 'HOW HAPPY I LOOK VS HOW HAPPY I AM', value: '84% polished / 32% functional' },
      { name: 'NUMBER OF TIMES I FELT EXPLOITED BY THE MEDIA INDUSTRY (PUBLISHERS, EDITORS, BRANDS)', value: '87 (and counting)' },
      { name: 'USE OF AI', value: 'Sem-frequently, cautiously, resentfully' },
      { name: 'AMOUNT OF EMAILS I\'M IGNORING', value: '61 unread, 204 mentally ghosted' },
      { name: '# OF SELFIES TAKEN', value: '349 (2 posted, all over-analyzed)' },
      { name: 'PITCHES GHOSTED', value: '48+ (including the one I was promised feedback on)' },
      { name: 'UNPAID HOURS WORKED', value: 312 },
      { name: 'STORIES THAT GOT BURIED', value: '15 (two of them excellent)' },
      { name: 'TWEETS DELETED IN FEAR OF BACKLASH', value: 19 },
      { name: 'INTERVIEWS DONE VS QUOTED', value: '93:17' },
      { name: 'STORIES ALTERED BY EDITORS WITHOUT MY CONSENT', value: 324 },
      { name: 'TIMES I QUESTIONED JOURNALISTIC INTEGRITY', value: 'Weekly' },
      { name: 'LATE-NIGHT DOOMSCROLLS "FOR RESEARCH"', value: 'Every night that ends in "y"' },
      { name: 'PRESS EVENTS ATTENDED FOR THE FREE STUFF', value: '35 (only half of them worth it)' },
      { name: 'COUNTRIES VISITED ON THE JOB', value: 5 },
    ]
  },
  {
    id: 2,
    name: 'TEACHER',
    imageUrl: teacherImage,
    description: "Professional lesson planner, part-time therapist, full-time bureaucracy warrior. Measures life in overdue reflections, half-read PD books, and printer jams. Shaping young minds while slowly losing her own. Keeps saying \"this is fine\" in a burning Google Classroom.",
    stats: [
      { name: 'INTELLIGENCE', value: 80, maxValue: 100 },
      { name: 'PALATABILITY', value: 99, maxValue: 100 },
      { name: 'INSECURITY', value: 50, maxValue: 100 },
      { name: 'CONNECTION TO "REAL" LIFE', value: 70, maxValue: 100 },
    ],
    modalStats: [
      { name: 'AVERAGE SCREEN TIME', value: '5h 11m/day (half of it spent toggling between tabs)' },
      { name: 'PAGES READ', value: '2,471 (1,300 with intent, the rest under duress)' },
      { name: 'UNIT PLANS CREATED', value: '11 (3 of them still in drafts)' },
      { name: 'HOURS SPENT REFLECTING', value: '88 (23 logged, 65 while trying to fall asleep)' },
      { name: 'HOW HAPPY I LOOK VS HOW HAPPY I AM', value: '91% smiley emoji / 40% burnt toast' },
      { name: 'TIMES AI HELPED TO MAKE WORKSHEETS', value: 24 },
      { name: 'DOLLARS SPENT FROM MY OWN POCKET ON CLASSROOM STUFF', value: '$281.72' },
      { name: 'TIMES AI HELPED VS HINDERED STUDENT LEARNING', value: '2 helped / 23 hindered / 5 full-blown plagiarism cases' },
      { name: 'TIMES I PLANNED TO MARK AND DIDN\'T', value: 12 },
      { name: 'TIMES I DID SOMETHING ON PRACTICUM AND SWORE I\'D NEVER DO IT AGAIN', value: 8 },
    ]
  },
  {
    id: 3,
    name: 'REAL',
    imageUrl: atHomeImage,
    description: "Trying to be human in a world that keeps asking for branding. Collects joy, old TV shows, and moments of actual presence between scrolls. Haunted by the person I could be if I ever unplugged—she sounds cool. Still holding out for magic.",
    stats: [
      { name: 'INTELLIGENCE', value: 50, maxValue: 100 },
      { name: 'PALATABILITY', value: 20, maxValue: 100 },
      { name: 'INSECURITY', value: 10, maxValue: 100 },
      { name: 'CONNECTION TO "REAL" LIFE', value: 90, maxValue: 100 },
    ],
    modalStats: [
      { name: 'AVERAGE SCREEN TIME', value: '3h 26m/day (1h thinking about quitting social media)' },
      { name: 'AVERAGE NUMBER OF NOTIFICATIONS A DAY', value: 83 },
      { name: 'BOOKS READ THIS MONTH', value: '13 (Most of them romance, DNF\'d 3, re-read 2 old favorites instead)' },
      { name: '# OF TIMES I\'VE WATCHED THE SAME TV SHOWS ON REPEAT', value: 47 },
      { name: 'HOW HAPPY I LOOK VS HOW HAPPY I AM', value: '75% glowing / 43% fragile' },
      { name: '# OF FILMS SEEN', value: '26 (including that ones I only half-watched while scrolling)' },
      { name: 'HOURS SPENT WITH LOVED ONES', value: '62 (not nearly enough)' },
      { name: 'USE OF AI', value: 'Rarely and with mild existential guilt' },
      { name: 'AMOUNT OF TEXTS I\'M IGNORING', value: '4 unread / 47 emotionally overwhelming' },
      { name: 'TIMES I\'VE BEEN TRULY PRESENT THIS MONTH', value: 16 },
      { name: 'JOURNALS STARTED AND ABANDONED', value: '10 (3 in the past year alone)' },
      { name: '# OF TIMES I\'VE CRIED THIS MONTH', value: '4.5 (the .5 was tear-brimmed, no actual drop)' },
    ]
  },
  {
    id: 4,
    name: 'USER',
    imageUrl: userImage,
    description: "Just a carbon-based data farm with a soft spot for aesthetic Pinterest boards and existential dread. Produces gigabytes of content and zero inner peace. Lives on screen time, algorithms, and the haunting suspicion that nothing is private—not even thoughts.",
    stats: [
      { name: 'INTELLIGENCE', value: 10, maxValue: 100 },
      { name: 'PALATABILITY', value: 50, maxValue: 100 },
      { name: 'INSECURITY', value: 30, maxValue: 100 },
      { name: 'CONNECTION TO "REAL" LIFE', value: 1, maxValue: 100 },
    ],
    modalStats: [
      { name: 'AVERAGE SCREEN TIME', value: '23h 17m/day (up 12% from last week, oops)' },
      { name: 'DISTANCE SCROLLED', value: '27.3 km/month (enough to qualify as cardio?)' },
      { name: 'PINTEREST BOARDS CREATED', value: '38 (7 useful, 31 mood-based delusions of a different life)' },
      { name: 'PASSWORDS LEAKED', value: '4 (still using the same one with a new number at the end)' },
      { name: 'CONTENT POSTED', value: '2,229 pieces (including 500+ stories that vanished after 24 hours and 0 afterthoughts)' },
      { name: 'USER DATA GENERATED', value: '14.8 GB/week (mostly location history and unspoken insecurities)' },
      { name: 'AD REVENUE DOLLARS MADE FOR OTHER COMPANIES', value: '$212,400 (contributed unknowingly via clicks, likes, and late-night desperation)' },
      { name: 'BOOKS LOGGED ON GOODREADS', value: 178 },
      { name: 'FILMS LOGGED ON LETTERBOXED', value: 'none (does the mean they don\'t count?)' },
      { name: 'HOURS WASTED', value: '562/year (conservatively)' },
      { name: '# OF HOURS SPENT WORRYING ABOUT HOW I LOOK ONLINE', value: '113 (a full 32 spent staring at tagged photos I can\'t untag)' },
      { name: '# OF HOURS LOGGED ON AUDIBLE', value: '57.5 (mostly to feel productive while dissociating or to bribe myself to clean)' },
      { name: '# OF HOURS MY PHONE SPENDS LISTENING TO ME', value: 'Classified (but it definitely heard that breakdown)' },
      { name: 'HOW HAPPY I LOOK VS HOW HAPPY I AM', value: '89% curated joy / 41% quiet chaos' },
      { name: 'USE OF AI', value: 'Occasionally to outsource thinking.' },
    ]
  }
];

const App: React.FC = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(characters[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelect = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleNext = () => {
    const nextIndex = (selectedIndex + 1) % characters.length;
    setSelectedIndex(nextIndex);
    setSelectedCharacter(characters[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (selectedIndex - 1 + characters.length) % characters.length;
    setSelectedIndex(prevIndex);
    setSelectedCharacter(characters[prevIndex]);
  };

  return (
    <div className="app">
      <CharacterCard
        name={selectedCharacter.name}
        imageUrl={selectedCharacter.imageUrl}
        description={selectedCharacter.description}
        stats={selectedCharacter.stats}
      />

      <div className="navigation">
        <button className="pixel-button" onClick={handlePrevious}>PREV</button>
        <button className="pixel-button select-button" onClick={handleSelect}>SELECT</button>
        <button className="pixel-button" onClick={handleNext}>NEXT</button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        character={selectedCharacter}
      />
    </div>
  );
};

export default App;
