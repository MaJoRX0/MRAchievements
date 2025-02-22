import { Category } from './types';

export const initialCategories: Category[] = [
  {
    id: 'galactas-guide',
    name: "GALACTA'S GUIDE",
    achievements: [
      {
        id: "gal1",
        title: "Hello, World!",
        description: "Send your first message in the chat.",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal2",
        title: "Now THAT\u2019s a Party!",
        description: "Add 20 friends",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal3",
        title: "You Do You",
        description: "Use the customizable wheel once",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal4",
        title: "Window Dressing",
        description: "Switch up five different nameplates",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal5",
        title: "Member When\u2026?",
        description: "Relive a Highlight in your Career",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal6",
        title: "Self Made",
        description: "Earn 3,000 Chrono Tokens",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal7",
        title: "Dooms\u2019 Rise",
        description: "Unlock all Dooms\u2019 Rise gallery cards",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal8",
        title: "Challenge Accepted!",
        description: "Complete 20 missions",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal9",
        title: "Rising Star",
        description: "Reach level 20",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal10",
        title: "Heroic Honor",
        description: "Read 33 hero stories",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal11",
        title: "Always on Duty",
        description: "Unlock five Hero costumes",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal12",
        title: "Multiversal Veterans",
        description: "Raise the Proficiency of two heroes to Captain",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal13",
        title: "Sticking Around",
        description: "Log in for 30 days",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal14",
        title: "What a Team-Up!",
        description: "Read 15 Team-Up stories",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal15",
        title: "Eternal Night Falls",
        description: "Unlock all Eternal Night Falls Gallery Cards",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal16",
        title: "Family Matters",
        description: "Listen to one conversation between members of the Fantastic Four.",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      },
      {
        id: "gal17",
        title: "First Family",
        description: "Read all four of the Fantastic Four\u2019s hero stories.",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "galactas-guide"
      }    
      
    ]
  },
  {
    id: 'rivalry-rising',
    name: 'RIVALRY RISING',
    achievements: [

      {
        id: "riv1",
        title: "Thumbs Up",
        description: "Upvote one player",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv2",
        title: "Onslaught!",
        description: "Land a 3-player KO streak",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv3",
        title: "On Fire!",
        description: "Win three consecutive matches in Quick Match",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv4",
        title: "Heating Up!",
        description: "Take down 50 AI enemies in Practice VS. AI",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv5",
        title: "Master of Modes",
        description: "Complete one Arcade match",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv6",
        title: "Assemble!",
        description: "Team up with a friend for a match",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv7",
        title: "Ring Master",
        description: "Rank Gold or higher in Competitive mode",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv8",
        title: "All Eyes on Me!",
        description: "Score MVP five times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv9",
        title: "Here to Represent",
        description: "Join a Tournament match with your faction",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv10",
        title: "Inevitable!",
        description: "Win 100 matches",
        type: "gold",
        points: 20,
        completed: false,
        categoryId: "rivalry-rising"
      },
      {
        id: "riv11",
        title: "Six-Sided Victory",
        description: "Score six points in a single game of Doom Match",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "rivalry-rising"
      }    
    ]
  },
  {
    id: 'heroic-journey',
    name: 'HEROIC JOURNEY',
    achievements: [

      {
        id: "her1",
        title: "Puny God!",
        description: "As Monster Hulk, slam an enemy Loki with World Breaker",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her2",
        title: "Vengeance & Glory",
        description: "As the Punish, partner with Captain America to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her3",
        title: "No Love Lost",
        description: "As Storm, partner with Black Panther to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her4",
        title: "Brotherly Love",
        description: "As Loki, assist Thor in landing one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her5",
        title: "Inner Strength",
        description: "As Doctor Strange, knock out the Hulk\u2019s soul with Eye of Agamotto",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her6",
        title: "Psychic Sisters",
        description: "As Mantis, assist Psylocke in landing one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her7",
        title: "Arrow\u2019s Bite",
        description: "As Hawkeye, partner with Black Widow to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her8",
        title: "Like Old Times",
        description: "As Captain America, partner with Winter Soldier to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her9",
        title: "Rodent Rampage",
        description: "As Rocket Raccoon, assist Squirrel Girl in landing one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her10",
        title: "Ragnaroked",
        description: "As Hela, partner with Loki to take down an enemy Thor",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her11",
        title: "Street Justice!",
        description: "As Cloak & Dagger, assist Spider-Man in landing one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her12",
        title: "Clash of Kings",
        description: "As Black Panther, take down an enemy Namor",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her13",
        title: "Tree Talk",
        description: "As Groot, issue a ping and receive a response from allies",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her14",
        title: "Master and Apprentice",
        description: "As Magik, partner with Doctor Strange to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her15",
        title: "Moonlit Hel",
        description: "As Moon Knight, partner with Hela to land 1 KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her16",
        title: "Frozen Fathoms",
        description: "As Luna Snow, freeze an enemy Namor with Absolute Zero",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her17",
        title: "Stark Fan Club Founder",
        description: "As Squirrel Girl, partner with Iron Man to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her18",
        title: "Red Reunion",
        description: "As Black Widow, partner with Winter Soldier to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her19",
        title: "Beard Bros!",
        description: "As Iron Man, partner with Doctor Strange to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her20",
        title: "Broken Bond",
        description: "As Venom, take down an enemy Spider-Man",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her21",
        title: "Web, White, and Blue",
        description: "As Spider-Man, partner with Captain America to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her22",
        title: "House of M",
        description: "As Magneto, partner with Scarlet Witch to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her23",
        title: "Shattered Reality",
        description: "As Scarlet Witch, take down an enemy Scarlet Witch",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her24",
        title: "The Odinson Returns!",
        description: "As Thor, take down an enemy Loki",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her25",
        title: "Brothers in Arms",
        description: "As Winter Soldier, land one KO with an assist from Rocket Raccoon",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her26",
        title: "Spider-Fighters",
        description: "As Peni Parker, partner with Spider-Man to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her27",
        title: "A Better Plan",
        description: "As Star-Lord, issue the \u201cFall Back!\u201d ping three times",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her28",
        title: "Getting Chummy",
        description: "As Namor, land one KO with an assist from Jeff the Land Shark",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her29",
        title: "King in Gold",
        description: "As Adam Warlock, take down an enemy Venom",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her30",
        title: "Wanna Make a Snow Shark?",
        description: "As Jeff the Land Shark, partner with Luna Snow to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her31",
        title: "Jian and Katana",
        description: "As Psylocke, partner with Iron Fist to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her32",
        title: "Learn THIS, bub!",
        description: "As Wolverine, take down an enemy Magneto",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her33",
        title: "The New Agents of Atlas",
        description: "As Iron Fist, land one KO with an assist from Luna Snow",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her34",
        title: "Daughters of Liberty",
        description: "As Invisible Woman, partner with Black Widow to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her35",
        title: "To Solve Everything",
        description: "As Mister Fantastic, partner with Iron Man to land one KO",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her36",
        title: "Flame and Web",
        description: "As Human Torch, partner with Spider-Man to land one KO.",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her37",
        title: "Who\u2019s the Strongest now?",
        description: "As The Thing, take down an enemy Hulk",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her38",
        title: "Smart Is New Smash",
        description: "As Bruce Banner, land one KO within three seconds of calming down from the Hulk to Banner",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her39",
        title: "Smoke Screen",
        description: "As the Punisher, land three KOs amidst the smoke of Scourge Grenade in a single game",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her40",
        title: "To Me, My X-Men!",
        description: "As Storm, assist X-Men members 10 times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her41",
        title: "God of Treachery",
        description: "As Loki, land one KO by stabbing from behind",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her42",
        title: "Perilous Portal",
        description: "As Doctor Strange, land one terrain KO with the Portal",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her43",
        title: "Victory in Bloom",
        description: "As Mantis, assist allies in achieving a team wipe",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her44",
        title: "West Coast, Best Coast",
        description: "As Hawkeye, partner with the Avengers to land 10 KOs",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her45",
        title: "Justice for All!",
        description: "As Captain America, land three KOs with a single use of Freedom Charge",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her46",
        title: "Go Get \u2018Em, Guardians",
        description: "As Rocket Raccoon, revive the Guardians of the Galaxy members five times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her47",
        title: "Terror of the Ten Realms",
        description: "As Hela, land a 3-player KO streak in Yggsgard: Yggdrasill Path",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her48",
        title: "Symphony of Light and Dark",
        description: "As Cloak & Dagger, assist allies in achieving a team wipe",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her49",
        title: "King of the Dead",
        description: "As Black Panther, land a 3-player KO streak in the Intergalactic Empire of Wakanda: Hall of Djalia",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her50",
        title: "Vicious Vines",
        description: "As Groot, imprison four enemies with a single use of Strangling Prison",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her51",
        title: "Demon\u2019s Roar",
        description: "As Magik, land 3 KOs within a single transformation into Darkchild",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her52",
        title: "Punishment of the Moon",
        description: "As Moon Knight, hit four enemies with a single use of Hand of Khonshu",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her53",
        title: "Multiverse Tour",
        description: "As Luna Snow, complete a match on five maps with different themes",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her54",
        title: "\u201cAhhh, those tiny claws!\u201d",
        description: "As Squirrel Girl, land three KOs with a single use of Unbeatable Squirrel Tsunami",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her55",
        title: "Deadly Bites",
        description: "As Black Widow, land three KOs with critical hits in a single match",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her56",
        title: "Flawless Design",
        description: "As Iron Man, hit four enemies with a single use of Invincible Pulse Cannon",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her57",
        title: "Grip of Hunger",
        description: "As Venom, snare four enemies with a single use of Cellular Corrosion",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her58",
        title: "Spider-Sense Tingling!",
        description: "As Spider-Man, detect an enemy with Spider-Sense and land a winning counterattack",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her59",
        title: "Homo Superior",
        description: "As Magneto, assist Mutant allies 10 times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her60",
        title: "No More Mutants",
        description: "As Scarlet Witch, take down Mutant enemies 10 times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her61",
        title: "Divine Justice",
        description: "As Thor, strike down four enemies with a single use of God of Thunder",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her62",
        title: "Arm Race",
        description: "As Winter Soldier, land three KOs with a single use of Kraken Impact",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her63",
        title: "Watch Your Step!",
        description: "As Peni Parker, blast three enemies with a single use of Arachno-Mine",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her64",
        title: "Vengeance for the Milano!",
        description: "As Star-Lord, land 10 KOs with assists from the Guardians of the Galaxy",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her65",
        title: "Aquatic Assault",
        description: "As Namor, summon Monstro Spawn to land 10 KOs in a single game",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her66",
        title: "Family Ties",
        description: "As Adam Warlock, forge a soul bond with three allies from the Guardians of the Galaxy",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her67",
        title: "Snack Attack!",
        description: "As Jeff the Land Shark, swallow four enemies with a single use of It\u2019s Jeff!",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her68",
        title: "Way of the Butterfly",
        description: "As Psylocke, contest the mission area for 60 seconds in a single match",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her69",
        title: "Rage Uncaged",
        description: "As Wolverine, land three KOs with a single use of Last Stand",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her70",
        title: "Might of Fuxi",
        description: "As Iron Fist, land three KOs with a single use of Living Chi",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her71",
        title: "Lady of the House",
        description: "As Invisible Woman, assist the Fantastic Four members 10 times",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her72",
        title: "Bouncing Ideas",
        description: "As Mister Fantastic, bounce five times with a single use of Brainiac Bounce",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her73",
        title: "What Time Is It?",
        description: "As The Thing, launch up four enemies with a single use of Clobberin\u2019 Time",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      },
      {
        id: "her74",
        title: "Hot & Trending",
        description: "As Human Torch, land three KOs with a single use of Supernova",
        type: "silver",
        points: 10,
        completed: false,
        categoryId: "heroic-journey"
      }    
    ]
  },
  {
    id: 'chronoversy-saga',
    name: 'CHRONOVERSY SAGA',
    achievements: [

      {
        id: "chr1",
        title: "Spore Sport",
        description: "Shatter 50 Symbiote Spores in Kylntar",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr2",
        title: "VENI VIDI V\u2026?",
        description: "Spray one time toward the Celestial Codex in Klyntar",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr3",
        title: "We Are Safe\u2026 For Now",
        description: "Stop Knull\u2019s Essence from going underground in Klyntar",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr4",
        title: "Explosive Sendoff",
        description: "Deliver Knull\u2019s Essence underground in Klyntar",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr5",
        title: "Shero of Wakanda",
        description: "Listen to General Okoye\u2019s message in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr6",
        title: "Mind Palace",
        description: "Listen to Shuri\u2019s findings in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr7",
        title: "Spreading Darkness",
        description: "Stop Bast, the Panther God, from returning to her rightful place in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr8",
        title: "Knowledge of Sin",
        description: "Activate the Vibrani-Chronovium force field stabilizer in the Imperial Institute of Science of the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr9",
        title: "Mystical Power",
        description: "Unleash the spiritual energy of the Heart-Shaped Herb in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr10",
        title: "Scientific Strength",
        description: "Advance the Vibrani-Chronovium research in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr11",
        title: "Divine House Divided",
        description: "Listen to the chat between K\u2019Liluna and Bast in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr12",
        title: "Wakanda Forever",
        description: "Purify Bast, the Panther God, in the Intergalactic Empire of Wakanda",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr13",
        title: "Let Her Speak!",
        description: "Chat with Spider-Zero in the Mech Lab of Tokyo 2099: Spider-Islands",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr14",
        title: "As You Wish",
        description: "Help the Master Weaver repair the Web of Life and Destiny in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr15",
        title: "All or Nothing!",
        description: "Help Spider-Zero repair the Web of Life and Destiny in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr16",
        title: "Tough Business",
        description: "Listen to the Fujikawa Mall\u2019s uniform and broadcast in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr17",
        title: "Public Relations",
        description: "Listen to Stark-Fujikawa\u2019s promo broadcast in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr18",
        title: "Eye Witness",
        description: "Listen to Public Eye\u2019s internal comms in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr19",
        title: "Whispers from the Web",
        description: "Listen to Spider-Zero\u2019s holographic message in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr20",
        title: "Halfway Dropout",
        description: "Halt Spider-Zero\u2019s advance to Budokan in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr21",
        title: "The Path to the Spiders\u2019 Nests",
        description: "Escort Spider-Zero to Budokan in Tokyo 2099",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr22",
        title: "Thor\u2019s Alliance",
        description: "Help Thor fight against Loki in Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr23",
        title: "Loki\u2019s Accomplice",
        description: "Help Loki maintain his rule in Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr24",
        title: "Histrionic Perfection",
        description: "Use one emote on the throne in Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr25",
        title: "Illusive Truth",
        description: "Shatter the deception and unveil the mural\u2019s truth in the Throne Room of Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr26",
        title: "Tyrant Tumbles",
        description: "Shatter the Loki statue area in Yggsgard\u2019s Bifrost Garden",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr27",
        title: "I Say Thee Nay!",
        description: "Safeguard the sapping device to wither Yggdrasill in Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr28",
        title: "For Asgard!",
        description: "Destroy the sapping device and save Yggdrasil in Yggsgard",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr29",
        title: "Wakey Wakey",
        description: "Shatter one hibernation pod in the Super-Solider Factory of Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr30",
        title: "Call of the Hive",
        description: "Open the Maveth Portal in Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr31",
        title: "Cut off One Head",
        description: "Destroy the Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr32",
        title: "Not on My Watch",
        description: "Shut down the production line of Super-Soldier Factory in Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr33",
        title: "Wide Open",
        description: "Blast the protective barrier of Frozen Airfield in Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr34",
        title: "Enter the Hydra",
        description: "Activate the entrance to Frozen Airfield in Hydra Charteris Base",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr35",
        title: "Door to Door",
        description: "Use two different portals in a single game when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr36",
        title: "A Hounding Conversation",
        description: "Talk with Bats the ghost dog when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr37",
        title: "No More House Call",
        description: "Save Doctor Strange from the Astral Plane when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr38",
        title: "Factory Setting",
        description: "Trigger Stark\u2019s Sentinel\u2019s Reverse-Destruction when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr39",
        title: "Papers over Digital",
        description: "Stop H.E.R.B.I.E from scanning all pages of the Darkhold when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr40",
        title: "Save the Trees!",
        description: "Scan all pages of the Darkhold with the help of H.E.R.B.I.E when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr41",
        title: "Ruined Idol",
        description: "Shatter the Bloodstorm One statue when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr42",
        title: "Saving Rachel Oskar",
        description: "Rescue Ratatoskr when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr43",
        title: "Night Travelers, Protected",
        description: "Use the spell within Ratatoskr to eliminate all the vampires when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      },
      {
        id: "chr44",
        title: "Silver Living",
        description: "With Ratatoskr\u2019s help, complete the first trial run of TRD when Eternal Night falls on New York",
        type: "bronze",
        points: 5,
        completed: false,
        categoryId: "chronoversy-saga"
      }    
    ]
  }
];