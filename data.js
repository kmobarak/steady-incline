const DAILY_QUOTES = [
  {
    id: 1,
    morning: {
      text: "When you arise in the morning, think of what a precious privilege it is to be alive—to breathe, to think, to enjoy, to love.",
      author: "Marcus Aurelius",
      source: "Meditations"
    },
    evening: {
      text: "The mystery of human existence lies not in just staying alive, but in finding something to live for.",
      author: "Fyodor Dostoevsky",
      source: "The Brothers Karamazov"
    }
  },
  {
    id: 2,
    morning: {
      text: "النهضة تبدأ من أعماق الإنسان؛ فالحضارة لا تُباع ولا تُشترى، وإنما هي نتاج فكرة وعمل.",
      translation: "Renaissance begins from the depths of the human being; for civilization is not bought or sold, but is rather the product of an idea and action.",
      author: "Malik Bennabi",
      source: "شروط النهضة (Conditions of the Renaissance)"
    },
    evening: {
      text: "All of humanity's problems stem from man's inability to sit quietly in a room alone.",
      author: "Blaise Pascal",
      source: "Pensées"
    }
  },
  {
    id: 3,
    morning: {
      text: "Those who have a 'why' to live for can bear with almost any 'how'.",
      author: "Viktor Frankl",
      source: "Man's Search for Meaning"
    },
    evening: {
      text: "To be free is not merely to cast off one's chains, but to live in a way that respects and enhances the freedom of others.",
      author: "Alija Izzetbegovic",
      source: "My Escape to Freedom"
    }
  },
  {
    id: 4,
    morning: {
      text: "Knowledge without action is insanity, and action without knowledge is vanity. The heart is reformed by the alignment of both.",
      author: "Al-Ghazali",
      source: "Kimiya-yi Sa'adat (The Chemistry of Happiness)"
    },
    evening: {
      text: "Life can only be understood backwards; but it must be lived forwards.",
      author: "Søren Kierkegaard",
      source: "Journals"
    }
  },
  {
    id: 5,
    morning: {
      text: "We suffer more often in imagination than in reality. The mind creates its own chains.",
      author: "Seneca",
      source: "Letters from a Stoic"
    },
    evening: {
      text: "In the depth of winter, I finally learned that within me there lay an invincible summer.",
      author: "Albert Camus",
      source: "The Myth of Sisyphus"
    }
  },
  {
    id: 6,
    morning: {
      text: "No one today is purely one thing. Labels like Indian, or woman, or Muslim, or American are no more than starting-points.",
      author: "Edward Said",
      source: "Orientalism"
    },
    evening: {
      text: "I say let the world go to hell, but I should always have my tea. To be hyper-conscious is a disease—a thorough, absolute disease.",
      author: "Fyodor Dostoevsky",
      source: "Notes from Underground"
    }
  },
  {
    id: 7,
    morning: {
      text: "Attention is the rarest and purest form of generosity. It is the beginning of all true contemplation.",
      author: "Simone Weil",
      source: "Gravity and Grace"
    },
    evening: {
      text: "I have always imagined that Paradise will be a kind of library, an infinite space of memory and imagination.",
      author: "Jorge Luis Borges",
      source: "Ficciones"
    }
  },
  {
    id: 8,
    morning: {
      text: "إن التغيير الحقيقي يبدأ عندما يرفض الإنسان أن يكون مجرد نسخة صامتة تصنعها البيئة والظروف.",
      translation: "True change begins when a human being refuses to be a mere silent duplicate molded by the environment and circumstances.",
      author: "Ali Shariati",
      source: "العودة إلى الذات (Return to the Self)"
    },
    evening: {
      text: "The law of love is not a commandment; it is the essential condition of human existence. When we violate it, we decay.",
      author: "Leo Tolstoy",
      source: "The Law of Love and the Law of Violence"
    }
  },
  {
    id: 9,
    morning: {
      text: "العبودية الحقيقية هي عبودية القلب؛ فمن استعبد قلبه شيء فهو عبده، ومن تحرر قلبه من سوى الله فهو حر.",
      translation: "True servitude is the servitude of the heart; for whatever enslaves a person's heart is their master, and whose heart is free from all but God is truly free.",
      author: "Ibn Taymiyyah",
      source: "العبودية (Al-Uboodiyyah)"
    },
    evening: {
      text: "The wound is the place where the Light enters you. Do not look away from your suffering.",
      author: "Rumi",
      source: "Masnavi"
    }
  },
  {
    id: 10,
    morning: {
      text: "Life is not a state of rest; it is a continuous, creative flow. The universe is not a finished product, but is still in the making.",
      author: "Muhammad Iqbal",
      source: "The Reconstruction of Religious Thought in Islam"
    },
    evening: {
      text: "To remember God is to return to the center, where all contradictions are resolved and all seeking finds peace.",
      author: "Gai Eaton",
      source: "Islam and the Destiny of Man"
    }
  },
  {
    id: 11,
    morning: {
      text: "The ultimate aim of the ego is not to see something, but to be something. It is in the ego’s effort to be something that he discovers his selfhood.",
      author: "Muhammad Iqbal",
      source: "The Reconstruction of Religious Thought in Islam"
    },
    evening: {
      text: "For a colonized people, the most essential value, because the most concrete, is first and foremost the land: the land which must bring them bread and, above all, dignity.",
      author: "Frantz Fanon",
      source: "The Wretched of the Earth"
    }
  },
  {
    id: 12,
    morning: {
      text: "Science is progress, but art is presence. Science builds the world, but religion and art give it a soul.",
      author: "Alija Izzetbegovic",
      source: "Islam Between East and West"
    },
    evening: {
      text: "Beauty will save the world. It is the kind of beauty that arises from suffering, humility, and absolute love.",
      author: "Fyodor Dostoevsky",
      source: "The Idiot"
    }
  },
  {
    id: 13,
    morning: {
      text: "To seek truth is a duty, but to find it is a grace. Do not search for light outside when the lamp is inside your own chest.",
      author: "Al-Ghazali",
      source: "Deliverance from Error"
    },
    evening: {
      text: "The only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.",
      author: "Albert Camus",
      source: "The Rebel"
    }
  },
  {
    id: 14,
    morning: {
      text: "الرحلة من الشك إلى الإيمان ليست انتقالاً من الجهل إلى العلم، بل هي انتقال من الكبرياء إلى التواضع.",
      translation: "The journey from doubt to belief is not a transition from ignorance to knowledge, but rather a transition from pride to humility.",
      author: "Mustafa Mahmoud",
      source: "رحلتي من الشك إلى الإيمان (My Journey from Doubt to Belief)"
    },
    evening: {
      text: "We are asleep until we fall in love, or until we confront our death. Only then do we realize what is real and what is mere passing shadow.",
      author: "Leo Tolstoy",
      source: "The Death of Ivan Ilyich"
    }
  },
  {
    id: 15,
    morning: {
      text: "Prayer in Islam is an ego-expanding act. It is an escape from the mechanics of time into the presence of the Eternal, returning the self strengthened for action.",
      author: "Muhammad Iqbal",
      source: "The Reconstruction of Religious Thought in Islam"
    },
    evening: {
      text: "Remember, young man, that you must never forget the quiet moments of childhood, for a single good memory can save a man in his darkest hours.",
      author: "Fyodor Dostoevsky",
      source: "The Brothers Karamazov"
    }
  },
  {
    id: 16,
    morning: {
      text: "Come, comrades, the European game is finally over; we must find something else. We must shake off the heavy darkness and create a new man.",
      author: "Frantz Fanon",
      source: "The Wretched of the Earth"
    },
    evening: {
      text: "God does not make a sound, but His silence is not absence. It is the silence of a presence that holds everything.",
      author: "Shusaku Endo",
      source: "Silence"
    }
  },
  {
    id: 17,
    morning: {
      text: "الفكرة تولد في الوجدان قبل أن تولد في العقل؛ وإذا لم تكن الفكرة مشحونة بالعاطفة والروح، فإنها تظل باردة وعقيمة.",
      translation: "An idea is born in the conscience before it is born in the intellect; if an idea is not charged with emotion and spirit, it remains cold and sterile.",
      author: "Malik Bennabi",
      source: "شروط النهضة"
    },
    evening: {
      text: "This gate was made only for you. I am now going to shut it.",
      author: "Franz Kafka",
      source: "Before the Law"
    }
  },
  {
    id: 18,
    morning: {
      text: "True strength is not in never falling, but in rising with a heart purified of resentment. Patience is the shield of the intellect.",
      author: "Ibn Taymiyyah",
      source: "Al-Uboodiyyah"
    },
    evening: {
      text: "Ivan Ilyich saw that his life had not been what it should have been, but that it could still be rectified. He asked himself: 'What is the right thing?' and let go of his fear.",
      author: "Leo Tolstoy",
      source: "The Death of Ivan Ilyich"
    }
  },
  {
    id: 19,
    morning: {
      text: "Why should I ask the wise men of the town what my origin is? I am only concerned with what my destination is.",
      author: "Muhammad Iqbal",
      source: "Bal-e-Jibril (Gabriel's Wing)"
    },
    evening: {
      text: "To go wrong in one's own way is better than to go right in someone else's. In the first case you are a human being, in the second you are nothing but a parrot.",
      author: "Fyodor Dostoevsky",
      source: "Crime and Punishment"
    }
  },
  {
    id: 20,
    morning: {
      text: "The heart has two doors: one opening to the external senses, and one opening to the divine world. Keep the second door clean through daily reflection.",
      author: "Al-Ghazali",
      source: "Kimiya-yi Sa'adat"
    },
    evening: {
      text: "He wanted to live, he wanted to feel, he wanted to love. But he was trapped in the mechanical routine of a society that feared the wild nature of the soul.",
      author: "Hermann Hesse",
      source: "Steppenwolf"
    }
  },
  {
    id: 21,
    morning: {
      text: "The transition from a society that accumulates objects to a society that produces ideas is the first step toward true independence.",
      author: "Malik Bennabi",
      source: "مشكلات الحضارة (Problems of Civilization)"
    },
    evening: {
      text: "When we revolt, it is not for a particular culture or country, but for the fundamental right of a human being to stand tall without permission.",
      author: "Frantz Fanon",
      source: "Black Skin, White Masks"
    }
  },
  {
    id: 22,
    morning: {
      text: "Religion is not a science that can be proven; it is a life that must be lived, an experience of the heart that transcends the dry bounds of logic.",
      author: "Alija Izzetbegovic",
      source: "Islam Between East and West"
    },
    evening: {
      text: "My God! A whole moment of happiness! And is that not enough for a whole human life?",
      author: "Fyodor Dostoevsky",
      source: "White Nights"
    }
  },
  {
    id: 23,
    morning: {
      text: "Look at the stars and the precision of the cell; the universe does not run on chance. Your existence has a script, read it with open eyes.",
      author: "Mustafa Mahmoud",
      source: "رحلتي من الشك إلى الإيمان"
    },
    evening: {
      text: "I looked up at the dark sky, full of stars, and for the first time, I opened myself to the gentle indifference of the world.",
      author: "Albert Camus",
      source: "The Stranger"
    }
  },
  {
    id: 24,
    morning: {
      text: "Underdevelopment is not a lack of resources, but the structural extraction of a society's wealth for the benefit of another. Recognize the structure.",
      author: "Walter Rodney",
      source: "How Europe Underdeveloped Africa"
    },
    evening: {
      text: "The modern world is losing its vertical dimension. By severing our relationship with the transcendent, we have turned earth into a spiritual prison.",
      author: "René Guénon",
      source: "The Crisis of the Modern World"
    }
  },
  {
    id: 25,
    morning: {
      text: "Intuition is a higher form of intellect. It does not bypass reason; it completes it by grasping the whole before reason can analyze the parts.",
      author: "Muhammad Iqbal",
      source: "The Reconstruction of Religious Thought in Islam"
    },
    evening: {
      text: "The path is infinite. There is nothing to be done, yet everything to be attempted. Write as if your life depends on it.",
      author: "Franz Kafka",
      source: "Diaries"
    }
  },
  {
    id: 26,
    morning: {
      text: "الاستعمار لا يزول من الأرض إلا إذا زالت 'القابلية للاستعمار' من نفوسنا.",
      translation: "Colonization does not vanish from the earth unless 'colonizability' is first removed from our souls.",
      author: "Malik Bennabi",
      source: "شروط النهضة"
    },
    evening: {
      text: "A man of character does not fit in. He stands out, not out of pride, but because he cannot lie to his own conscience.",
      author: "Fyodor Dostoevsky",
      source: "Notes from Underground"
    }
  },
  {
    id: 27,
    morning: {
      text: "The true seeker of truth is not he who collects opinions, but he who is willing to burn his own preconceptions in the fire of critical inquiry.",
      author: "Al-Ghazali",
      source: "Deliverance from Error"
    },
    evening: {
      text: "It is not our duty to choose between different paths; it is our duty to walk our own path with courage, even if it leads to solitude.",
      author: "Hermann Hesse",
      source: "Steppenwolf"
    }
  },
  {
    id: 28,
    morning: {
      text: "There are no pure materials in history; everything is mixed. But the moral law within us is absolute, and we must guard it against compromise.",
      author: "Alija Izzetbegovic",
      source: "Islam Between East and West"
    },
    evening: {
      text: "One must imagine Sisyphus happy. The struggle itself toward the heights is enough to fill a man's heart.",
      author: "Albert Camus",
      source: "The Myth of Sisyphus"
    }
  },
  {
    id: 29,
    morning: {
      text: "إن الطريق إلى الله يبدأ بوضوح المنهج والتبرؤ من مناهج الجاهلية المادية الفاقدة للروح.",
      translation: "The path to God begins with clarity of method and disassociation from spiritual-less material systems.",
      author: "Sayyid Qutb",
      source: "معالم في الطريق"
    },
    evening: {
      text: "Truth, like gold, is to be obtained not by its growth, but by washing away from it all that is not gold.",
      author: "Leo Tolstoy",
      source: "What is Religion?"
    }
  },
  {
    id: 30,
    morning: {
      text: "القلب لا يدخله نور الحق إذا كان ممتلئاً بحب الدنيا والرئاسة والجاه؛ التخلية قبل التحلية.",
      translation: "The light of truth does not enter the heart if it is filled with the love of worldly items, power, and prestige; emptying comes before filling.",
      author: "Ibn Taymiyyah",
      source: "العبودية"
    },
    evening: {
      text: "Everything that we see is a shadow cast by that which we do not see. The real world is hidden behind the veil.",
      author: "Mikhail Bulgakov",
      source: "The Master and Margarita"
    }
  }
];

const DAILY_SPARKS = [
  {
    id: 1,
    category: "Psychology & Existentialism",
    title: "Viktor Frankl's 'Logotherapy'",
    content: "Developed during his time in concentration camps, Viktor Frankl's logotherapy states that the primary human drive is not the 'will to pleasure' (Freud) or the 'will to power' (Adler), but the 'will to meaning'. Even in the most painful conditions, humans can find meaning in three ways: by creating a work, by experiencing something/someone (love, nature), or by the attitude we adopt toward unavoidable suffering.",
    source: "Man's Search for Meaning"
  },
  {
    id: 2,
    category: "Political Philosophy",
    title: "Bennabi's 'Colonizability' (القابلية للاستعمار)",
    content: "Malik Bennabi argued that external colonization is merely a symptom of a deeper, internal disease: 'colonizability'. A society is colonized only because it has lost its dynamic cultural impulse and collapsed into passive stagnation, making it structurally receptive to foreign domination. True liberation must begin with self-reform and intellectual rebirth, not just political agitation.",
    source: "شروط النهضة"
  },
  {
    id: 3,
    category: "Linguistic Epistemology",
    title: "Key-Concepts in the Quran",
    content: "Toshihiko Izutsu developed a semantic method to study the Quran. He argued that words like 'Allah', 'Islam', 'Iman', and 'Kafir' did not exist in isolation, but formed a highly structured semantic field. In pre-Islamic Arabia, these words existed but had different contexts; the Quran restructured the vocabulary, creating a completely new moral and ontological worldview.",
    source: "God and Man in the Koran"
  },
  {
    id: 4,
    category: "Existential Literature",
    title: "The Underground Man's Rebellion",
    content: "In 'Notes from Underground', Dostoevsky critiques the 19th-century rationalist belief that humanity can be completely mapped out by science and self-interest (the 'Crystal Palace'). The Underground Man insists that human beings value their free will and individuality so much that they will deliberately act irrationally, against their own self-interest, just to prove they are men and not piano keys.",
    source: "Notes from Underground"
  },
  {
    id: 5,
    category: "Philosophy & Linguistics",
    title: "Ngũgĩ on Language as a Colonial Weapon",
    content: "Ngũgĩ wa Thiong'o argues that the most important area of colonial domination is not physical space, but the mental universe of the colonized. By enforcing European languages in schools and banning native ones, colonizers sever children's connection to their history, culture, and self-conception, causing them to associate their own heritage with inferiority.",
    source: "Decolonising the Mind"
  },
  {
    id: 6,
    category: "Islamic Thought",
    title: "Iqbal's Concept of 'Khudi' (Selfhood)",
    content: "Muhammad Iqbal redefined the traditional Sufi concept of self-negation. He argued that the self (Khudi) is not something to be dissolved in God, but rather a dynamic ego that must be strengthened, built, and realized through creative action, struggle, and moral conviction. The stronger the self, the closer it is to fulfilling its role as God's vicegerent on earth.",
    source: "The Reconstruction of Religious Thought in Islam"
  },
  {
    id: 7,
    category: "Metaphysics & Critique",
    title: "Guénon's 'Reign of Quantity'",
    content: "René Guénon argued that the modern Western crisis is due to the rejection of metaphysical truth and the sacred. By replacing quality with quantity (industrial production, mass democracy, material metrics), modern civilization has lost its vertical link to the transcendent, resulting in intellectual disintegration and a society focused entirely on mechanical utility.",
    source: "The Crisis of the Modern World"
  },
  {
    id: 8,
    category: "Philosophy",
    title: "Izzetbegovic on Culture vs. Civilization",
    content: "Alija Izzetbegovic distinguished 'culture' from 'civilization'. Culture belongs to the human spirit—it is religion, art, poetry, and morality. Civilization belongs to the physical world—it is technology, organization, urban planning, and comfort. While civilization is cumulative and can be copied, culture is organic, unique, and must be lived internally.",
    source: "Islam Between East and West"
  },
  {
    id: 9,
    category: "Post-Colonial Theory",
    title: "Fanon's Sociogeny",
    content: "Frantz Fanon introduced 'sociogeny' to explain how psychological disorders in colonized people are not biological or purely individual. Instead, they are produced by the social and economic structures of colonial oppression. Therefore, mental healing for the colonized cannot be achieved in a clinic; it requires the revolutionary transformation of society.",
    source: "Black Skin, White Masks"
  },
  {
    id: 10,
    category: "Philosophical Fiction",
    title: "Borges' 'The Library of Babel'",
    content: "In his famous short story, Jorge Luis Borges imagines the universe as an infinite library composed of hexagonal galleries. The library contains every possible 410-page book consisting of all permutations of letters. It contains all historical truths, future predictions, and biographies, but because they are buried in an infinity of gibberish, the librarians fall into existential despair, unable to find absolute truth.",
    source: "Ficciones"
  },
  {
    id: 11,
    category: "Epistemology",
    title: "Al-Ghazali's 'Nuri' (Inner Light)",
    content: "After experiencing a deep intellectual crisis where he doubted all sensory and rational knowledge, Al-Ghazali concluded that absolute certainty is not achieved through logical proofs or dry argumentation. Instead, it is a 'light which God casts into the chest'—an intuitive, spiritual opening of the intellect that recognizes truth directly.",
    source: "Deliverance from Error"
  },
  {
    id: 12,
    category: "Christian Existentialism",
    title: "Kierkegaard's 'Knight of Faith'",
    content: "Søren Kierkegaard contrasted the 'Infinite Resignation' (renouncing everything for a higher duty) with the 'Knight of Faith'. The Knight of Faith makes the infinite resignation but, by virtue of the absurd, believes he will receive everything back in this life. He does not look like a holy man; he lives completely in the ordinary world, enjoying it, but anchoring his absolute devotion in God.",
    source: "Fear and Trembling"
  },
  {
    id: 13,
    category: "Absurdist Philosophy",
    title: "The Rebel vs. The Absurd",
    content: "Albert Camus argued that while the world is fundamentally 'absurd' (devoid of inherent meaning), humanity must not collapse into nihilism or suicide. Instead, we must 'revolt' by accepting the struggle and living passionately. Sisyphus, condemned to roll a boulder up a hill for eternity, is the ultimate absurd hero because he owns his task and defies despair.",
    source: "The Myth of Sisyphus"
  },
  {
    id: 14,
    category: "Islamic Ethics & Sufism",
    title: "Gai Eaton on 'Remembering Who We Are'",
    content: "Gai Eaton describes the human condition as one of profound forgetfulness (Ghaflah). He argues that Islam's primary function is reminder (Dhikr)—to recall to memory the primordial covenant (Mithaq) made between the human soul and God before creation. True intelligence is not discovery of new facts, but recollection of this primary vertical alignment.",
    source: "Islam and the Destiny of Man"
  },
  {
    id: 15,
    category: "Post-Colonial Theory",
    title: "Césaire's Decolonization of the Mind",
    content: "In 'Discourse on Colonialism', Aimé Césaire argues that colonialism does not civilize the colonized; instead, it decivilizes and brutalizes the colonizer. He writes that Europe is indefensible, and that the colonial project is fundamentally about greed, force, and the reduction of human beings into economic commodities.",
    source: "Discourse on Colonialism"
  },
  {
    id: 16,
    category: "Philosophy & Religion",
    title: "Endo on 'The Silence of God'",
    content: "In his novel 'Silence', Shusaku Endo addresses the persecution of Christians in 17th-century Japan. The central struggle is the silence of God in the face of human torture and suffering. Endo suggests that God does not remain silent out of indifference, but rather suffers *with* humans in their pain. His silence is a form of companionate presence, not absence.",
    source: "Silence"
  },
  {
    id: 17,
    category: "Traditionalist Metaphysics",
    title: "The Transcendent Unity of Religions",
    content: "Traditionalist philosophers like Frithjof Schuon and René Guénon argued that beneath the diverse external forms (exoteric structures, rituals, laws) of the world's great religions lies a single, universal, esoteric core of metaphysical truth (the 'Philosophia Perennis'). Sticking strictly to a tradition is necessary, but understanding the inner unity prevents dogmatic blindspots.",
    source: "The Transcendent Unity of Religions"
  },
  {
    id: 18,
    category: "Islamic Thought",
    title: "Bennabi's Theory of 'The Civilizational Cycle'",
    content: "Malik Bennabi mapped the rise and fall of civilizations into three stages: 1) The Spiritual Stage (where ideas and values dominate, binding man and time), 2) The Rational Stage (where intellect organizes and refines), and 3) The Instinctual Stage (where values decay, appetites dominate, and the civilization collapses into 'colonizability').",
    source: "شروط النهضة"
  },
  {
    id: 19,
    category: "Linguistics & Metaphysics",
    title: "Izutsu on the 'Islamic World-view'",
    content: "Toshihiko Izutsu shows that when Islam entered Arabia, it did not just change religious rituals; it changed the very nature of reality for the Arabs. It shifted their conception of time (adding an eternal hereafter), space (the cosmos as a sign of God), and moral action (introducing accountability and humility over tribal pride).",
    source: "God and Man in the Koran"
  },
  {
    id: 20,
    category: "Existential Literature",
    title: "Dostoevsky's 'Ridiculous Man'",
    content: "In this short story, a man decides to commit suicide because he believes nothing in the world matters. He falls asleep and dreams of a utopian parallel earth where people live in harmony without sin. However, he accidentally infects them with corruption, introducing lies, jealousy, and war. He wakes up transformed, realizing that heaven is a state of love we must strive to build here on earth.",
    source: "The Dream of a Ridiculous Man"
  },
  {
    id: 21,
    category: "Existential Literature",
    title: "The Death of Ivan Ilyich: The Illusion of Life",
    content: "Tolstoy's masterpiece tells of an ordinary judge who spends his life climbing the social ladder, acquiring the 'perfect' house and respectability. Only when he faces a painful terminal illness does he realize that his entire life—his work, marriage, and decorum—was a lie. In his final hours, he lets go of his vanity and finds true light through selflessness.",
    source: "The Death of Ivan Ilyich"
  },
  {
    id: 22,
    category: "Political Economy",
    title: "Pre-Colonial Africa's Development",
    content: "Walter Rodney details how, prior to European intervention, African societies were developing complex agricultural systems, metallurgy, and local trade networks independently. He debars the myth that Africa was 'underdeveloped' in a vacuum, demonstrating how the transatlantic slave trade and subsequent European colonial extraction systematically disrupted these internal developmental trajectories.",
    source: "How Europe Underdeveloped Africa"
  },
  {
    id: 23,
    category: "Social Critique",
    title: "Timothy Mitchell on Colonizing Egypt",
    content: "Mitchell describes how modern colonialism does not just occupy territory; it colonizes the mind by ordering the physical world. Through new methods of layout, school discipline, and military drills, the state creates an 'effect of structure' that makes authority seem objective and inevitable. He calls this process 'enframing'.",
    source: "Colonizing Egypt"
  },
  {
    id: 24,
    category: "Philosophical Literature",
    title: "Stoner: The Quiet Dignity of the Ordinary",
    content: "John Williams' novel 'Stoner' follows the life of an unremarkable literature professor. Despite facing a failing marriage, academic betrayal, and professional mediocrity, Stoner finds salvation and meaning in his quiet love for literature and teaching. It stands as a monument to the dignity of a quiet, compromised life lived with integrity.",
    source: "Stoner"
  },
  {
    id: 25,
    category: "Sociology & Reform",
    title: "Ali Shariati's 'Al-Gharbzadegi' (Westoxification)",
    content: "Shariati critiqued the blind imitation of Western cultural forms by intellectuals in developing nations, a phenomenon he called 'Westoxification'. He argued that decolonization does not mean adopting Western consumerism or superficial liberalism; instead, it requires returning to one's own authentic cultural and spiritual roots, mobilizing them for justice and social reform.",
    source: "العودة إلى الذات"
  },
  {
    id: 26,
    category: "Traditionalist Philosophy",
    title: "The Secularization of Nature",
    content: "Seyyed Hossein Nasr argues that modern science has secularized nature, viewing it as a dead machine to be dominated and exploited. In contrast, traditional Islamic science viewed nature as a sacred book of signs (ayat) reflecting divine wisdom. He calls for a return to a science that respects the cosmic order and the spiritual link between man and nature.",
    source: "A Young Muslim's Guide to the Modern World"
  },
  {
    id: 27,
    category: "Islamic Thought",
    title: "Bennabi on 'Ideas in Pile'",
    content: "Malik Bennabi warned that importing 'dead ideas' or accumulating imported goods does not make a civilization. He compared it to buying bricks without a blueprint. A civilization rises only when it possesses an organizing spirit (a moral idea) that can bind soil, time, and human effort into a creative, self-generating structure.",
    source: "شروط النهضة"
  },
  {
    id: 28,
    category: "Linguistics & Philosophy",
    title: "Borges on Labyrinths and Maps",
    content: "In his brief story 'On Exactitude in Science', Borges describes an empire where the art of cartography becomes so advanced that they create a map of the empire that is the exact size of the empire itself, coinciding point-for-point. Subsequent generations realize the map is useless and leave it to rot. It stands as a critique of hyper-rationalism and the confusion of representation with reality.",
    source: "Ficciones"
  },
  {
    id: 29,
    category: "Existential Literature",
    title: "Kafka's Parable of the Emperor's Message",
    content: "In Kafka's short story 'A Message from the Emperor', a dying emperor sends a vital message to an individual citizen. However, the messenger has to traverse endless chambers, courtyards, and cities, making it impossible to ever deliver the message. It represents the existential condition of humans seeking ultimate truth or law, perpetually separated from it by institutional and physical infinity.",
    source: "A Country Doctor"
  },
  {
    id: 30,
    category: "Islamic Philosophy",
    title: "Al-Ghazali on Self-Knowledge (Ma'rifah)",
    content: "Al-Ghazali stated: 'He who knows himself knows his Lord.' He argued that self-knowledge is not just knowing your name and physical attributes, but understanding your spiritual essence: what are you, where did you come from, what is your purpose, and wherein lies your true happiness and misery.",
    source: "Kimiya-yi Sa'adat"
  }
];

const WEEKLY_BOOKS = [
  {
    id: 1,
    title: "Islam and the Destiny of Man",
    author: "Charles Le Gai Eaton",
    description: "A highly intellectual exposition of the Islamic worldview written by a Western diplomat and philosopher who embraced Islam. Eaton explores the metaphysical principles of faith, the role of the Prophet, and the spiritual crisis of modern man, explaining traditional Islam in a language tailored for the modern, critical mind.",
    whyRead: "It offers a profound bridge between Western philosophical traditions and Islamic metaphysics, addressing the spiritual estrangement of modern life.",
    takeaways: [
      "Islam is a call to remembrance (Dhikr)—recalling the primordial covenant between the soul and God.",
      "The modern world's crisis is fundamentally a crisis of identity, caused by forgetting our transcendent origin.",
      "Faith is not an emotional escape, but a rigorous, intellectual centering of the self."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #133a1e, #1c522b)",
      text: "#f5e6d3",
      accent: "#d4af37",
      style: "classic"
    }
  },
  {
    id: 2,
    title: "Decolonising the Mind",
    author: "Ngũgĩ wa Thiong'o",
    description: "A brilliant classic on the politics of language in literature and culture. Ngũgĩ explores how language is used as a tool of colonial control to capture the mental universe of colonized peoples, and details the necessity of reclaiming native linguistic and cultural frameworks for true independence.",
    whyRead: "It expands on Fanon's and Rodney's ideas, showing how language shapes history, identity, and the structures of intellectual independence.",
    takeaways: [
      "Language carries the values, memory, and collective history of a culture; replacing it severs cultural roots.",
      "Colonialism's ultimate victory is convincing the colonized that their native heritage is inferior.",
      "Decolonization is not merely political independence, but the active reclamation of one's own mental universe."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #4d1c15, #732a20)",
      text: "#fcf8f2",
      accent: "#e07a5f",
      style: "modern"
    }
  },
  {
    id: 3,
    title: "The Master and Margarita",
    author: "Mikhail Bulgakov",
    description: "A masterpiece of Russian literature. Written in secret during the height of Soviet censorship, it details a visit by the Devil (Woland) and his entourage to atheist Moscow. Parallel to this, it contains a beautiful, humanizing retelling of the trial of Pontius Pilate and Yeshua Ha-Nozri (Jesus). It is a deep, satirical exploration of faith, cowardice, and the freedom of the soul.",
    whyRead: "A profound Russian classic that combines existential drama, high-level satire, and a deep defense of the spiritual realm in a materialistic world.",
    takeaways: [
      "Cowardice is the most terrible of human vices because it leads to all others.",
      "Materialistic systems cannot eradicate the human need for spiritual truth and redemption.",
      "Truth and writing survive oppression: 'Manuscripts don't burn.'"
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #1b1b1b, #2b2b2b)",
      text: "#eaeaea",
      accent: "#b70909",
      style: "classic"
    }
  },
  {
    id: 4,
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    description: "A psychological and philosophical memoir of survival in Nazi concentration camps. Frankl outlines his theory of 'logotherapy', asserting that the primary human drive is the search for meaning. He argues that even in the face of suffering and death, a human being retains the freedom to choose their attitude and find purpose.",
    whyRead: "A vital existential text that complements your interest in Camus and Dostoevsky, showing how meaning acts as a literal survival mechanism.",
    takeaways: [
      "Everything can be taken from a man but the last of human freedoms: to choose one's attitude in any given set of circumstances.",
      "Suffering ceases to be suffering the moment it finds a meaning, such as the meaning of a sacrifice.",
      "Meaning is discovered through work, through love/experience, and through our attitude toward suffering."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #23252f, #323543)",
      text: "#f0f2f5",
      accent: "#8b949e",
      style: "minimalist"
    }
  },
  {
    id: 5,
    title: "God and Man in the Koran",
    author: "Toshihiko Izutsu",
    description: "A groundbreaking work of semantic analysis by the Japanese philosopher Toshihiko Izutsu. He maps out the conceptual structure of the Quranic worldview, tracing how pre-Islamic terms were revolutionized to form a brand new moral, ethical, and metaphysical relationship between the Creator and the human being.",
    whyRead: "An extremely high-level, objective philosophical and linguistic exploration of the Quranic text, highly aligned with Iqbal's metaphysical inquiries.",
    takeaways: [
      "The Quranic text operates on a complex network of semantic fields that define key concepts in relation to one another.",
      "Islam introduced a vertical relationship of absolute moral responsibility that shattered tribal self-sufficiency.",
      "Analyzing semantic changes reveals the psychological and cognitive shift that occurred in early Islamic history."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #0e1e38, #18315b)",
      text: "#eef2f7",
      accent: "#00b4d8",
      style: "minimalist"
    }
  },
  {
    id: 6,
    title: "Silence",
    author: "Shusaku Endo",
    description: "A powerful historical novel detailing the persecution of Portuguese Jesuit missionaries in 17th-century Japan. The book explores the psychological struggle of Father Rodrigues, who faces a brutal moral dilemma: should he apostatize (step on a bronze image of Christ) to save Japanese peasants from torture, or maintain his doctrinal purity while they suffer?",
    whyRead: "A devastatingly beautiful study of faith, doubt, Christian existentialism, and the silent presence of God in times of extreme suffering.",
    takeaways: [
      "True faith must sometimes transcend formal rules and doctrines to embody pure love and compassion.",
      "God's silence in the face of suffering is not indifference; He suffers alongside humanity.",
      "Faith is not a rigid fortress, but a fragile, living thing tested in the fire of moral ambiguity."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #3d3b30, #5c594c)",
      text: "#faf0ca",
      accent: "#e09f3e",
      style: "modern"
    }
  },
  {
    id: 7,
    title: "The Crisis of the Modern World",
    author: "René Guénon",
    description: "A seminal work of traditionalist philosophy. Guénon critiques the modern Western world, arguing that it represents the final stage (the Kali Yuga or Dark Age) of cosmic decay, characterized by materialism, the loss of sacred tradition, and the confusion of quantity (statistics, mass production) with quality (spiritual truth).",
    whyRead: "Essential for understanding Traditionalist thought and its critique of secular modernity, expanding on Seyyed Hossein Nasr's philosophical views.",
    takeaways: [
      "Modernity is an anomaly in human history, defined by the systematic denial of metaphysical truth.",
      "The scientific revolution secularized nature, reducing the cosmos to a dead machine.",
      "True intellectual regeneration requires returning to primary, traditional metaphysical sources."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #2d132c, #4a0e4e)",
      text: "#faf2f2",
      accent: "#ff75a0",
      style: "classic"
    }
  },
  {
    id: 8,
    title: "Ficciones",
    author: "Jorge Luis Borges",
    description: "An extraordinary collection of short stories that are essentially compact philosophical thought experiments. Borges explores themes of infinity, labyrinths, memory, mirrors, and the nature of reality, writing stories that challenge the boundaries of rationalism and the human mind.",
    whyRead: "A masterpiece of mind-bending philosophical fiction designed to broaden your horizons, introducing you to the magical realism of Latin American thought.",
    takeaways: [
      "Reality is a labyrinth constructed by the human mind, and our theories are merely maps of the maze.",
      "Infinity is both a source of wonder and an existential terror that can paralyze human action.",
      "Memory, identity, and literature are interconnected, forming a library that outlasts individual life."
    ],
    colorTheme: {
      bg: "linear-gradient(135deg, #2b453a, #3e6052)",
      text: "#f4ede8",
      accent: "#e9c46a",
      style: "classic"
    }
  }
];
