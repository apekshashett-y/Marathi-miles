import gateImg from "../assets/forts/shivneri/gate.jpg";
import heroImg from "../assets/forts/shivneri/hero.jpg";
import pathImg from "../assets/forts/shivneri/path.jpg";
import templeImg from "../assets/forts/shivneri/temple.jpg";
import viewImg from "../assets/forts/shivneri/view.jpg";
import mainHeroImg from "../assets/forts/shivneri/shivnerimain.jpg";

export const maharashtraForts = [
  {
    id: 1,
    name: "Shivneri Fort",
    location: "Junnar, Pune District, Maharashtra",
    era: "Birthplace of a Legend (1630 CE)",
    subtitle: "Where the lion of Maharashtra took his first breath",
    significance: "The sacred ground where Chhatrapati Shivaji Maharaj was born, marking the dawn of Maratha resistance.",
    imageUrl: "/shivneri_fort.png",

    // DEEP HISTORICAL TIMELINE - Story Chapters with Mood Tags
    timeline: [
      {
        year: "Pre-13th Century",
        era: "The Ancient Sentinel",
        mood: "foundation",
        isMajor: false,
        // Backwards-compatible fields (English)
        preview: "Long before empires rose, Shivneri stood guard over the strategic trade routes of the Western Ghats...",
        fullStory:
          "Long before empires rose, Shivneri stood guard over the strategic trade routes of the Western Ghats. Built by the Yadavas, it was more than just stone and mortar—it was a watchful eye over the prosperous Junnar region. The fort's strategic location allowed it to control access to crucial mountain passes, making it a prized possession for any ruler who understood the value of terrain in warfare.",
        significance:
          "Established the fort's strategic importance that would make it desirable for centuries to come.",
        // Bilingual, explicit text mapping
        text: {
          en: {
            title: "The Ancient Sentinel",
            preview:
              "Long before empires rose, Shivneri stood guard over the strategic trade routes of the Western Ghats...",
            fullStory:
              "Long before empires rose, Shivneri stood guard over the strategic trade routes of the Western Ghats. Built by the Yadavas, it was more than just stone and mortar—it was a watchful eye over the prosperous Junnar region. The fort's strategic location allowed it to control access to crucial mountain passes, making it a prized possession for any ruler who understood the value of terrain in warfare.",
            significance:
              "Established the fort's strategic importance that would make it desirable for centuries to come."
          },
          mr: {
            title: "प्राचीन पहारेकरी",
            preview:
              "साम्राज्ये उभी राहण्याच्या खूप आधी, शिवनेरी किल्ला पश्चिम घाटातील महत्त्वाच्या व्यापारी मार्गांवर पहारा देत उभा होता...",
            fullStory:
              "साम्राज्ये उभी राहण्याच्या खूप आधी, शिवनेरी किल्ला पश्चिम घाटातील महत्त्वाच्या व्यापारी मार्गांवर पहारा देत उभा होता. यादवांनी बांधलेला हा किल्ला केवळ दगड–माती नव्हता, तर समृद्ध जुन्नर प्रदेशावर लक्ष ठेवणारा जागरूक डोळा होता. किल्ल्याचे धोरणात्मक स्थान डोंगरदर्‍यांमधील महत्त्वाच्या घाटमार्गांवर नियंत्रण ठेवू देत होते, ज्यामुळे भूभागाचे महत्त्व ओळखणाऱ्या कोणत्याही सत्ताधीशासाठी तो अत्यंत मौल्यवान मालमत्ता बनला.",
            significance:
              "या काळात निर्माण झालेले किल्ल्याचे धोरणात्मक महत्त्व पुढील अनेक शतकांपर्यंत तो हव्यासाचा विषय बनवत राहिले."
          }
        },
        // Per-language audio paths (can be wired to real files later)
        audio: {
          en: "/audio/en/shivneri-ancient-sentinel.mp3",
          mr: "/audio/mr/shivneri-ancient-sentinel.mp3"
        }
      },
      {
        year: "1294-1347",
        era: "Years of Turmoil",
        mood: "conflict",
        isMajor: false,
        preview:
          "The Delhi Sultanate's expansion brought Shivneri under Muslim rule for the first time...",
        fullStory:
          "The Delhi Sultanate's expansion brought Shivneri under Muslim rule for the first time. Alauddin Khilji's generals captured the fort, transforming it from a regional stronghold into a frontier outpost of a vast empire. For fifty years, the fort witnessed the clash of cultures—Hindu architecture adapted to Islamic military needs, local traditions mixing with northern customs, all while the Maratha people watched and waited.",
        significance:
          "Began the fort's transformation into a multicultural military stronghold.",
        audioNote:
          "🔊 Listen to the sounds of clashing swords and changing cultures",
        text: {
          en: {
            title: "Years of Turmoil",
            preview:
              "The Delhi Sultanate's expansion brought Shivneri under Muslim rule for the first time...",
            fullStory:
              "The Delhi Sultanate's expansion brought Shivneri under Muslim rule for the first time. Alauddin Khilji's generals captured the fort, transforming it from a regional stronghold into a frontier outpost of a vast empire. For fifty years, the fort witnessed the clash of cultures—Hindu architecture adapted to Islamic military needs, local traditions mixing with northern customs, all while the Maratha people watched and waited.",
            significance:
              "Began the fort's transformation into a multicultural military stronghold."
          },
          mr: {
            title: "अस्थिरतेची वर्षे",
            preview:
              "दिल्ली सल्तनतीच्या विस्तारामुळे प्रथमच शिवनेरी किल्ला मुस्लिम सत्तेखाली गेला...",
            fullStory:
              "दिल्ली सल्तनतीच्या विस्तारामुळे प्रथमच शिवनेरी किल्ला मुस्लिम सत्तेखाली गेला. अलाउद्दीन खिलजीच्या सरदारांनी हा किल्ला जिंकून घेतला आणि प्रादेशिक बालेकिल्ल्याला एका विशाल साम्राज्याच्या सीमेवरील चौकीत रूपांतरित केले. जवळजवळ पन्नास वर्षे किल्ल्याने संस्कृतींचे संघर्ष पाहिले—हिंदू स्थापत्यकला इस्लामी लष्करी गरजेनुसार बदलली, स्थानिक परंपरा आणि उत्तर भारतातून आलेल्या चालीरीती एकमेकांत मिसळल्या, आणि दरम्यान मराठा जनता शांतपणे पाहत आणि वाट बघत राहिली.",
            significance:
              "या काळाने किल्ल्याचे बहुसांस्कृतिक लष्करी ठाण्यात रूपांतर होण्याची प्रक्रिया सुरू केली."
          }
        },
        audio: {
          en: "/audio/en/shivneri-years-of-turmoil.mp3",
          mr: "/audio/mr/shivneri-years-of-turmoil.mp3"
        }
      },
      {
        year: "1630",
        era: "A Star is Born",
        mood: "birth",
        isMajor: true,
        preview:
          "On a stormy night in the month of Phalguna, destiny arrived at Shivneri's gates...",
        fullStory:
          "On a stormy night in the month of Phalguna, destiny arrived at Shivneri's gates. In a modest chamber within the fort, Jijabai gave birth to a son she named Shivaji—a child who would become fire and freedom for a nation. Legend says the fort itself seemed to tremble that night, as if aware it now cradled history in its arms. The infant's first cries echoed through stone corridors that would one day echo with marching armies.",
        significance:
          "Marked the beginning of the Maratha Empire and changed the course of Indian history forever.",
        audioNote:
          "🔊 Experience the stormy night and the first cries of a legend",
        text: {
          en: {
            title: "A Star is Born",
            preview:
              "On a stormy night in the month of Phalguna, destiny arrived at Shivneri's gates...",
            fullStory:
              "On a stormy night in the month of Phalguna, destiny arrived at Shivneri's gates. In a modest chamber within the fort, Jijabai gave birth to a son she named Shivaji—a child who would become fire and freedom for a nation. Legend says the fort itself seemed to tremble that night, as if aware it now cradled history in its arms. The infant's first cries echoed through stone corridors that would one day echo with marching armies.",
            significance:
              "Marked the beginning of the Maratha Empire and changed the course of Indian history forever."
          },
          mr: {
            title: "एका ताऱ्याचा जन्म",
            preview:
              "फाल्गुन महिन्यातील वादळग्रस्त रात्री नियती शिवनेरीच्या दरवाज्यावर आली...",
            fullStory:
              "फाल्गुन महिन्यातील वादळग्रस्त रात्री नियती शिवनेरीच्या दरवाज्यावर आली. किल्ल्याच्या आतील साध्या खोलीत जिजाबाईंनी एका लेकराला जन्म दिला आणि त्याचे नाव ठेवले शिवाजी—जो पुढे एका संपूर्ण राष्ट्रासाठी अग्नी आणि स्वातंत्र्य ठरणार होता. लोककथेनुसार त्या रात्री किल्ल्याच्याच भिंती थरथरल्या, जणू त्या आपल्या कुशीत इतिहास जपला जात आहे याची त्यांना जाणीव झाली होती. त्या बालकाच्या पहिल्या रडण्याचे सूर ज्या दगडी गलियार्‍यांत घुमले, तेथून पुढे एकेदिवशी मार्च करणाऱ्या फौजांचे पायघड्यांचे आवाज घुमणार होते.",
            significance:
              "या घटनेने मराठा साम्राज्याच्या आरंभाला चिन्हांकित केले आणि भारतीय इतिहासाचा प्रवाह कायमचा बदलला."
          }
        },
        audio: {
          en: "/audio/en/shivneri-a-star-is-born.mp3",
          mr: "/audio/mr/shivneri-a-star-is-born.mp3"
        }
      },
      {
        year: "1645-1657",
        era: "The Exile Years",
        mood: "mystery",
        isMajor: false,
        preview:
          "While young Shivaji grew into a leader elsewhere, Shivneri remained under Bijapur's control...",
        fullStory:
          "While young Shivaji grew into a leader elsewhere, Shivneri remained under Bijapur's control. The Adil Shahi sultans strengthened its defenses, unaware they were fortifying what would become their nemesis's birthplace. During these years, the fort served as a quiet administrative center, its true potential sleeping like a dormant volcano. Local stories say the walls whispered of the boy born within them, spreading tales that fueled the growing Maratha resistance.",
        significance:
          "The fort's occupation fueled Shivaji's determination to reclaim his birthplace.",
        audioNote:
          "🔊 Hear the whispered legends circulating among the locals",
        text: {
          en: {
            title: "The Exile Years",
            preview:
              "While young Shivaji grew into a leader elsewhere, Shivneri remained under Bijapur's control...",
            fullStory:
              "While young Shivaji grew into a leader elsewhere, Shivneri remained under Bijapur's control. The Adil Shahi sultans strengthened its defenses, unaware they were fortifying what would become their nemesis's birthplace. During these years, the fort served as a quiet administrative center, its true potential sleeping like a dormant volcano. Local stories say the walls whispered of the boy born within them, spreading tales that fueled the growing Maratha resistance.",
            significance:
              "The fort's occupation fueled Shivaji's determination to reclaim his birthplace."
          },
          mr: {
            title: "वनवासाची वर्षे",
            preview:
              "तरुण शिवाजी इतरत्र नेता म्हणून घडत असताना, शिवनेरी मात्र बीजापुरी सत्तेखालीच राहिला...",
            fullStory:
              "तरुण शिवाजी इतरत्र नेता म्हणून घडत असताना, शिवनेरी मात्र बीजापुरी सत्तेखालीच राहिला. आदिलशाही सुलतानांनी या किल्ल्याची तटबंदी अधिक मजबूत केली; त्यांना हे ठाऊक नव्हते की ते भविष्यात त्यांच्या शत्रू ठरणाऱ्या राजाचा जन्मकिल्लाच कणखर करीत आहेत. या काळात किल्ला शांत प्रशासकीय केंद्र म्हणून वापरला गेला; त्याची खरी क्षमता सुप्त ज्वालामुखीसारखी झोपी गेलेली होती. स्थानिक कथांनुसार भिंतींनी आपल्या गर्भात जन्मलेल्या मुलाची कुजबुज पुनःपुन्हा ऐकू येत ठेवली, आणि त्या कथांनीच वाढत्या मराठा प्रतिकाराला इंधन दिले.",
            significance:
              "किल्ला परक्या ताब्यात असल्याची जाणीवच शिवाजींच्या जन्मभूमी परत मिळवण्याच्या निर्धाराला अधिक तीव्र बनवत गेली."
          }
        },
        audio: {
          en: "/audio/en/shivneri-exile-years.mp3",
          mr: "/audio/mr/shivneri-exile-years.mp3"
        }
      },
      {
        year: "1670",
        era: "Homecoming",
        mood: "victory",
        isMajor: true,
        preview:
          "After decades of struggle, Shivaji Maharaj returned to reclaim his birthright...",
        fullStory:
          "After decades of struggle, Shivaji Maharaj returned to reclaim his birthright. The capture of Shivneri wasn't just a military victory—it was a homecoming. As Maratha saffron flags replaced Bijapur's green standards, the fort transformed from occupied territory to sacred ground. Shivaji ordered immediate renovations, turning defensive structures into symbols of sovereignty. For the first time in living memory, Sanskrit prayers echoed where Persian commands had once dominated.",
        significance:
          "Symbolized the complete reversal of power dynamics in the Deccan region.",
        audioNote:
          "🔊 Listen to the triumphant sounds of Maratha victory chants",
        text: {
          en: {
            title: "Homecoming",
            preview:
              "After decades of struggle, Shivaji Maharaj returned to reclaim his birthright...",
            fullStory:
              "After decades of struggle, Shivaji Maharaj returned to reclaim his birthright. The capture of Shivneri wasn't just a military victory—it was a homecoming. As Maratha saffron flags replaced Bijapur's green standards, the fort transformed from occupied territory to sacred ground. Shivaji ordered immediate renovations, turning defensive structures into symbols of sovereignty. For the first time in living memory, Sanskrit prayers echoed where Persian commands had once dominated.",
            significance:
              "Symbolized the complete reversal of power dynamics in the Deccan region."
          },
          mr: {
            title: "घरी परतणे",
            preview:
              "दशकांभर चाललेल्या संघर्षानंतर शिवाजी महाराज जन्महक्क परत मिळवण्यासाठी शिवनेरीकडे परत आले...",
            fullStory:
              "दशकांभर चाललेल्या संघर्षानंतर शिवाजी महाराज जन्महक्क परत मिळवण्यासाठी शिवनेरीकडे परत आले. शिवनेरीचा ताबा मिळवणे ही केवळ लष्करी विजयाची घटना नव्हती—तो घरवापसीचा क्षण होता. मराठा भगवे ध्वज बीजापुरी हिरव्या निशाण्यांची जागा घेताच, किल्ला जिंकलेल्या प्रदेशापासून पवित्र भूमीत रूपांतरित झाला. शिवाजी महाराजांनी तात्काळ दुरुस्ती आणि बांधकामाची आज्ञा दिली, ज्यामुळे संरक्षणात्मक रचनाही सार्वभौमत्वाचे प्रतीक बनल्या. जिवंत स्मृतीतील पहिल्यांदाच, ज्या ठिकाणी कधीकाळी फारशी हुकूमांची भाषा घुमत होती, तेथे पुन्हा संस्कृत प्रार्थनांचे स्वर घुमू लागले.",
            significance:
              "या घटनेने दख्खनमधील सत्तासंतुलन पूर्णपणे उलथवून टाकल्याचे प्रतीक निर्माण केले."
          }
        },
        audio: {
          en: "/audio/en/shivneri-homecoming.mp3",
          mr: "/audio/mr/shivneri-homecoming.mp3"
        }
      },
      {
        year: "1818",
        era: "The Lion Sleeps",
        mood: "tragedy",
        isMajor: false,
        preview:
          "With the Maratha Empire's decline, Shivneri fell to British artillery...",
        fullStory:
          "With the Maratha Empire's decline, Shivneri fell to British artillery. The East India Company's forces, armed with modern cannons, breached walls that had resisted medieval siege weapons. For the British, it was another strategic capture; for the Marathas, it was a spiritual defeat. The fort became a quiet outpost in the Raj's military network, its historical significance noted but not truly understood by its new occupants.",
        significance:
          "Marked the end of Maratha sovereignty and beginning of colonial documentation of Indian history.",
        audioNote:
          "🔊 Hear the distant echoes of cannon fire and changing regimes",
        text: {
          en: {
            title: "The Lion Sleeps",
            preview:
              "With the Maratha Empire's decline, Shivneri fell to British artillery...",
            fullStory:
              "With the Maratha Empire's decline, Shivneri fell to British artillery. The East India Company's forces, armed with modern cannons, breached walls that had resisted medieval siege weapons. For the British, it was another strategic capture; for the Marathas, it was a spiritual defeat. The fort became a quiet outpost in the Raj's military network, its historical significance noted but not truly understood by its new occupants.",
            significance:
              "Marked the end of Maratha sovereignty and beginning of colonial documentation of Indian history."
          },
          mr: {
            title: "झोपलेला सिंह",
            preview:
              "मराठा साम्राज्याच्या अधःपतनानंतर शिवनेरी ब्रिटिश तोफांच्या माऱ्याखाली कोसळला...",
            fullStory:
              "मराठा साम्राज्याच्या अधःपतनानंतर शिवनेरी ब्रिटिश तोफांच्या माऱ्याखाली कोसळला. ईस्ट इंडिया कंपनीच्या सेनेने आधुनिक तोफा वापरून त्या भिंती भेदल्या ज्यांनी मध्ययुगीन वेढ्यांना वर्षानुवर्षे तोंड दिले होते. ब्रिटिशांसाठी हा आणखी एक धोरणात्मक विजय होता; पण मराठ्यांसाठी तो आध्यात्मिक पराभव होता. किल्ला राजच्या लष्करी जाळ्यातील शांत चौकी झाला, ज्याचे ऐतिहासिक महत्त्व नोंदवले गेले तरी नवीन अधिपतींनी त्याचा अर्थ खऱ्या अर्थाने कधी समजून घेतला नाही.",
            significance:
              "ही घटना मराठा सार्वभौमत्वाच्या अंताला आणि भारतीय इतिहासाचे लेखन औपनिवेशिक दृष्टीकोनातून सुरू होण्याला चिन्हांकित करते."
          }
        },
        audio: {
          en: "/audio/en/shivneri-the-lion-sleeps.mp3",
          mr: "/audio/mr/shivneri-the-lion-sleeps.mp3"
        }
      },
      {
        year: "Present",
        era: "Living Legacy",
        mood: "renaissance",
        isMajor: true,
        preview:
          "Today, Shivneri is more than ruins—it's a pilgrimage site where history breathes...",
        fullStory:
          "Today, Shivneri is more than ruins—it's a pilgrimage site where history breathes. Every stone tells a story, every corridor holds an echo. Pilgrims climb the same steps Jijabai once walked, students trace the fortifications that inspired military tactics, and tourists feel the weight of centuries in the mountain air. The fort has transformed from military asset to cultural treasure, its value measured not in strategic advantage but in historical consciousness.",
        significance:
          "Preserves the physical memory of Maharashtra's most transformative period for future generations.",
        audioNote:
          "🔊 Experience the peaceful sounds of modern pilgrimage and learning",
        text: {
          en: {
            title: "Living Legacy",
            preview:
              "Today, Shivneri is more than ruins—it's a pilgrimage site where history breathes...",
            fullStory:
              "Today, Shivneri is more than ruins—it's a pilgrimage site where history breathes. Every stone tells a story, every corridor holds an echo. Pilgrims climb the same steps Jijabai once walked, students trace the fortifications that inspired military tactics, and tourists feel the weight of centuries in the mountain air. The fort has transformed from military asset to cultural treasure, its value measured not in strategic advantage but in historical consciousness.",
            significance:
              "Preserves the physical memory of Maharashtra's most transformative period for future generations."
          },
          mr: {
            title: "जिवंत वारसा",
            preview:
              "आज शिवनेरी हा केवळ उद्ध्वस्त अवशेषांचा समूह नसून इतिहास श्वास घेत असलेले तीर्थस्थान आहे...",
            fullStory:
              "आज शिवनेरी हा केवळ उद्ध्वस्त अवशेषांचा समूह नसून इतिहास श्वास घेत असलेले तीर्थस्थान आहे. प्रत्येक दगड एक कथा सांगतो, प्रत्येक गलियारा एखाद्या प्रतिध्वनीला जपून ठेवतो. यात्रेकरू ज्या पायऱ्यांवरून कधीकाळी जिजाबाई चालल्या त्या पायऱ्यांवरूनच वर चढतात, विद्यार्थी युद्धनीतीला प्रेरणा देणाऱ्या तटबंद्या शोधत फिरतात आणि पर्यटक डोंगरातील हवेत शतकांचे ओझे जाणवतात. किल्ला लष्करी संपत्तीच्या भूमिकेतून बाहेर पडून सांस्कृतिक खजिन्यात रूपांतरित झाला आहे, ज्याचे मूल्य आता धोरणात्मक फायद्याऐवजी ऐतिहासिक भान यावर मोजले जाते.",
            significance:
              "शिवनेरी महाराष्ट्राच्या सर्वाधिक परिवर्तनशील कालखंडाची भौतिक स्मृती पुढील पिढ्यांसाठी जतन करून ठेवतो."
          }
        },
        audio: {
          en: "/audio/en/shivneri-living-legacy.mp3",
          mr: "/audio/mr/shivneri-living-legacy.mp3"
        }
      }
    ],

    // 360° Experience with Enhanced Descriptions
    vrExperience: {
      title: "Step Inside Shivneri: 360° Immersive Journey",
      description: "Stand where Shivaji took his first breath. Our interactive tour lets you explore every corner—from the sacred birth chamber to panoramic viewpoints that inspired a kingdom.",
      highlight: "🎧 Audio-guided experience available"
    },
    images360: [
      {
        src: gateImg,
        label: "Main Gate",
        subtitle: "Maha Darwaja – The Grand Entrance",
        audioGuide: "Listen to the history of this imposing entrance"
      },
      {
        src: pathImg,
        label: "Inner Path",
        subtitle: "The ascent into history",
        audioGuide: "Hear stories of pilgrims and soldiers who walked this path"
      },
      {
        src: templeImg,
        label: "Shivai Temple",
        subtitle: "Sacred space within the walls",
        audioGuide: "Experience the spiritual atmosphere with traditional chants"
      },
      {
        src: viewImg,
        label: "Panoramic View",
        subtitle: "Sahyadri ranges",
        audioGuide: "Listen to descriptions of the strategic importance of this view"
      }
    ],

    // Enhanced Cuisine with Cultural Context
    cuisine: [
      {
        name: "Misal Pav",
        image: "/assets/forts/shivneri/hero.jpg",
        description: "A spicy sprouted moth bean curry topped with farsan, onions, and lemon. Originally a peasant dish, it's now a beloved breakfast across Maharashtra. Junnar has its own spicy variant.",
        culturalNote: "Best eaten at local eateries near the bus stand.",
        spiceLevel: "High",
        bestTime: "Breakfast",
        priceRange: "₹80-120",
        heritageTip: "Try it with extra chopped onions and lemon for authentic taste"
      },
      {
        name: "Bhakri with Thecha",
        image: "https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=1000&auto=format&fit=crop",
        description: "Jowar or Bajra flatbread served with fiery green chili chutney (Thecha). The staple food of the Mawalas (Shivaji's soldiers), providing lasting energy for fort climbing.",
        culturalNote: "The diet of the Maratha warriors",
        spiceLevel: "Very High",
        bestTime: "Lunch",
        priceRange: "₹50-100",
        heritageTip: "Eat with raw onion to balance the spice"
      },
      {
        name: "Solkadhi",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
        description: "A cooling drink made from kokum and coconut milk. Though a Konkan specialty, it's widely available here to beat the heat after a trek.",
        culturalNote: "Digestive and cooling",
        spiceLevel: "Mild",
        bestTime: "Post-Trek",
        priceRange: "₹30-50",
        heritageTip: "Don't miss the garlic hint in the drink"
      },
      {
        name: "Maswadi",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
        description: "A delicacy from the Pune region, it's a stuffed gram flour roll with a spicy coconut-garlic-sesame filling, often served with curry.",
        culturalNote: "A special occasion dish",
        spiceLevel: "Medium",
        bestTime: "Lunch",
        priceRange: "₹100-150",
        heritageTip: "Enjoy with hot bhakri"
      }
    ],

    // Enhanced Shopping Areas
    shopping: [
      {
        name: "Junnar Weekly Market",
        description: "Held every Sunday, this traditional market offers a glimpse into rural life. Farmers sell fresh vegetables, local spices, and agricultural tools.",
        highlights: ["Fresh Produce", "Spices", "Agricultural Tools"],
        timing: "Sundays, 7:00 AM - 2:00 PM",
        bestFor: "Local vibes and photography",
        bargainingTip: "Prices are usually fixed but can bargain on bulk",
        mustBuy: "Homemade spice mixes"
      },
      {
        name: "Sahyadri Handicrafts",
        description: "Small shops selling tribal Warli art, which is indigenous to the North Sahyadri region. Great for souvenirs.",
        highlights: ["Warli Paintings", "Artifacts", "Bamboo Crafts"],
        timing: "10:00 AM - 7:00 PM",
        bestFor: "Art lovers and souvenir hunters",
        bargainingTip: "Good for supporting local artisans",
        mustBuy: "Warli painted coaster or frame"
      },
      {
        name: "Farm Fresh Outlets",
        description: "The Junnar-Narayangaon belt is famous for grape cultivation. Buy export-quality raisins and fresh grapes directly from farm outlets.",
        highlights: ["Grapes", "Raisins", "Fruit pulps"],
        timing: "9:00 AM - 6:00 PM",
        bestFor: "Fresh farm produce",
        bargainingTip: "Check for seasonal discounts",
        mustBuy: "Black raisins"
      },
      {
        name: "Local Sweet Marts",
        description: "Traditional sweet shops offering fresh milk-based sweets, famous in this dairy-rich belt.",
        highlights: ["Pedha", "Mawa", "Basundi"],
        timing: "9:00 AM - 9:00 PM",
        bestFor: "Sweet tooth",
        bargainingTip: "Fixed prices",
        mustBuy: "Junnar Pedha"
      }
    ],

    // Enhanced Cultural Experiences
    experiences: [
      {
        name: "Shiv Jayanti Celebrations",
        duration: "Half Day",
        description: "Witness the grandeur of Chhatrapati Shivaji Maharaj's birth anniversary (19th Feb) at his birthplace. The fort comes alive with decorations, palanquins, and traditional music.",
        includes: ["Processions", "Cultural Programs", "Decorations"],
        bestFor: "Anyone visiting in February",
        price: "Free",
        groupSize: "Large Crowds",
        timeSlot: "February 19th",
        specialNote: "Very crowded, plan ahead"
      },
      {
        name: "Powada Performance",
        duration: "30-60 mins",
        description: "Listen to the 'Powada', a traditional ballad genre that narrates historical events and heroic deeds of the Maratha warriors, performed by Shahirs.",
        includes: ["Live Performance", "Historical Narration"],
        bestFor: "Music & History Lovers",
        price: "Donation based / Event based",
        groupSize: "Any",
        timeSlot: "Usually evenings or weekends",
        specialNote: "Check local schedule"
      },
      {
        name: "Kadelot Experience",
        duration: "30 mins",
        description: "Visit the 'Kadelot' point (execution point). While grim, standing there gives a chilling realization of the strict justice system of the Maratha administration.",
        includes: ["Guided view", "Historical context"],
        bestFor: "History Buffs",
        price: "Included in entry",
        groupSize: "Any",
        timeSlot: "Daytime",
        specialNote: "Steep drop, be careful"
      },
      {
        name: "Buddhist Caves Tour",
        duration: "2 hours",
        description: "Explore the ancient rock-cut caves surrounding Shivneri (like Lenyadri). These caves predate the Maratha empire, showing the region's ancient trade importance.",
        includes: ["Cave exploration", "Sculpture viewing"],
        bestFor: "Heritage Explorers",
        price: "Minimal entry fee",
        groupSize: "Any",
        timeSlot: "Daytime",
        specialNote: "Requires climbing steps"
      }
    ],

    // Enhanced Itinerary Data
    itineraries: {
      "2h": [
        {
          time: "00:00 - 00:30",
          activity: "Base to Maha Darwaja",
          description: "Start the climb. Pass through the seven defensive gates.",
          tip: "Wear grip shoes",
          duration: "30 min"
        },
        {
          time: "00:30 - 01:15",
          activity: "Shiv Janmasthan",
          description: "Visit the birth place building and majestic statue of young Shivaji and Jijabai.",
          tip: "Silence observed inside",
          duration: "45 min"
        },
        {
          time: "01:15 - 01:45",
          activity: "Badami Talav",
          description: "Quick look at the water reservoir and surrounding ruins.",
          tip: "Good photo spot",
          duration: "30 min"
        },
        {
          time: "01:45 - 02:00",
          activity: "Descent",
          description: "Return to base via the main route.",
          tip: "Watch your step",
          duration: "15 min"
        }
      ],
      "4h": [
        {
          time: "00:00 - 01:00",
          activity: "Detailed Climb",
          description: "Observe the architecture of all 7 gates carefully (Maha Darwaja, Ganesh Darwaja, etc.).",
          tip: "Read the info boards",
          duration: "1 hour"
        },
        {
          time: "01:00 - 02:00",
          activity: "Fort Plateau Exploration",
          description: "Visit Shiv Janmasthan, Kadelot Point, and Ganga-Jamuna water cisterns.",
          tip: "Carry water",
          duration: "1 hour"
        },
        {
          time: "02:00 - 03:00",
          activity: "Ambarkhana & Storage",
          description: "Explore the grain storage houses and ruins of palaces.",
          tip: "Historical significance",
          duration: "1 hour"
        },
        {
          time: "03:00 - 04:00",
          activity: "Relaxed Descent",
          description: "Walk down enjoying the Sahyadri views.",
          tip: "Sunset view is great",
          duration: "1 hour"
        }
      ],
      halfDay: [
        {
          time: "08:00 - 11:30",
          activity: "Comprehensive Fort Tour",
          description: "Complete exploration of Shivneri Fort including all points of interest.",
          tip: "Start early",
          duration: "3.5 hours"
        },
        {
          time: "11:30 - 12:30",
          activity: "Lunch Break",
          description: "Enjoy Pithla Bhakri at a local khanaval (eatery).",
          tip: "Try local authentic taste",
          duration: "1 hour"
        },
        {
          time: "12:30 - 13:00",
          activity: "Travel to Lenyadri",
          description: "Short drive to Lenyadri Caves.",
          tip: "Hire auto/taxi available",
          duration: "30 min"
        },
        {
          time: "13:00 - 14:30",
          activity: "Lenyadri Girijatmaj",
          description: "Climb to the Girijatmaj Ganpati (Ashtavinayak) cave temple.",
          tip: "Monkeys present, be careful",
          duration: "1.5 hours"
        }
      ],
      oneDay: [
        {
          time: "07:00 - 11:00",
          activity: "Shivneri Fort",
          description: "Early morning trek to beat the heat. Full exploration.",
          tip: "Carry breakfast",
          duration: "4 hours"
        },
        {
          time: "11:00 - 12:00",
          activity: "Junnar Heritage Walk",
          description: "Visit old wadas and temples in Junnar town.",
          tip: "Photography permitted",
          duration: "1 hour"
        },
        {
          time: "12:00 - 13:00",
          activity: "Lunch",
          description: "Authentic Maharashtrian Thali.",
          tip: "Ask for spicy Misal",
          duration: "1 hour"
        },
        {
          time: "13:00 - 15:00",
          activity: "Lenyadri Caves",
          description: "Visit the Ashtavinayak temple and caves.",
          tip: "Steps climbing",
          duration: "2 hours"
        },
        {
          time: "15:00 - 17:00",
          activity: "Ozar Ganpati",
          description: "Drive to Ozar Vighnahar (another Ashtavinayak) nearby.",
          tip: "Beautiful riverside temple",
          duration: "2 hours"
        },
        {
          time: "17:00 - 18:00",
          activity: "Sunset at Dam",
          description: "Relax at Manikdoh Dam backwaters.",
          tip: "Sunset point",
          duration: "1 hour"
        }
      ]
    },

    // NEW: Fort Statistics & Quick Facts
    quickFacts: {
      elevation: "1094 meters",
      builtBy: "Yadavas of Devagiri",
      captureByShivaji: "1670 AD",
      architectureStyle: "Hill Fort with Maratha and Islamic influences",
      bestTimeToVisit: "November to February",
      entryFee: "Indians: ₹25, Foreigners: ₹200",
      openHours: "9:00 AM to 6:00 PM",
      walkingDistance: "1.5 km from base to top",
      waterSources: "7 water tanks within fort",
      uniqueFeature: "Natural birth cave (where Shivaji was born)"
    },

    // NEW: Travel Tips
    travelTips: [
      "Start early to avoid afternoon heat",
      "Carry sufficient water - limited availability at top",
      "Wear sturdy shoes for rocky terrain",
      "Hire a local guide for better historical insights",
      "Respect photography restrictions in sensitive areas",
      "Carry cash for local purchases",
      "Check weather forecast before visiting",
      "Plan 3-4 hours for complete exploration"
    ],

    // NEW: Nearby Attractions
    nearbyAttractions: [
      {
        name: "Lenyadri Caves",
        distance: "10 km",
        description: "Ancient Buddhist caves with intricate carvings",
        type: "Historical/Religious"
      },
      {
        name: "Junnar Fort",
        distance: "5 km",
        description: "Smaller fort with panoramic views",
        type: "Historical"
      },
      {
        name: "Shivneri Museum",
        distance: "At fort base",
        description: "Small museum showcasing fort history",
        type: "Museum"
      }
    ],

    // NEW: Special Events
    specialEvents: [
      {
        name: "Shivaji Jayanti",
        date: "February 19",
        description: "Birth anniversary celebrations with cultural programs",
        highlight: "Traditional processions and martial arts displays"
      },
      {
        name: "Monsoon Heritage Walk",
        season: "July-August",
        description: "Guided walks during monsoon showcasing lush greenery",
        highlight: "Waterfalls and mist-covered views"
      }
    ]
  },
  {
    id: 2,
    name: "Raigad Fort",
    location: "Raigad District",
    era: "Capital of the Maratha Empire",
    subtitle: "Where the crown of Swarajya was first consecrated.",
    significance: "The seat of Chhatrapati Shivaji Maharaj's coronation and the capital of the Maratha Empire.",
    imageUrl: "/raigad_fort.png",
    timeline: [
      {
        year: "1674",
        era: "The Coronation",
        isMajor: true,
        preview:
          "Shivaji Maharaj was crowned Chhatrapati at Raigad...",
        fullStory:
          "On June 6, 1674, Shivaji Maharaj was crowned Chhatrapati at Raigad in a grand ceremony that marked the formal birth of the Maratha sovereign state. The fort became the political and spiritual heart of Swarajya.",
        significance:
          "Established the Maratha Empire as a sovereign kingdom.",
        text: {
          en: {
            title: "The Coronation",
            preview:
              "Shivaji Maharaj was crowned Chhatrapati at Raigad...",
            fullStory:
              "On June 6, 1674, Shivaji Maharaj was crowned Chhatrapati at Raigad in a grand ceremony that marked the formal birth of the Maratha sovereign state. The fort became the political and spiritual heart of Swarajya.",
            significance:
              "Established the Maratha Empire as a sovereign kingdom."
          },
          mr: {
            title: "राज्याभिषेक",
            preview:
              "शिवाजी महाराजांचा रायगड येथे छत्रपती म्हणून राज्याभिषेक झाला...",
            fullStory:
              "६ जून १६७४ रोजी रायगड येथे भव्य समारंभात शिवाजी महाराजांचा छत्रपती म्हणून राज्याभिषेक झाला. या समारंभाने मराठा सार्वभौम राज्याचा औपचारिक जन्म चिन्हांकित केला. रायगड हा स्वराज्याचा राजकीय आणि आध्यात्मिक केंद्रबिंदू बनला.",
            significance:
              "या टप्प्याने मराठा साम्राज्य स्वतंत्र सार्वभौम राज्य म्हणून स्थिर झाले."
          }
        },
        audio: {
          en: "/audio/en/raigad-coronation.mp3",
          mr: "/audio/mr/raigad-coronation.mp3"
        }
      },
      {
        year: "1680",
        era: "The Passing",
        isMajor: true,
        preview:
          "Shivaji Maharaj passed away at Raigad...",
        fullStory:
          "The founder of the Maratha Empire breathed his last at Raigad, leaving behind a legacy that would shape Indian history for a century.",
        significance:
          "Raigad became a site of pilgrimage and memory.",
        text: {
          en: {
            title: "The Passing",
            preview:
              "Shivaji Maharaj passed away at Raigad...",
            fullStory:
              "The founder of the Maratha Empire breathed his last at Raigad, leaving behind a legacy that would shape Indian history for a century.",
            significance:
              "Raigad became a site of pilgrimage and memory."
          },
          mr: {
            title: "समाप्तीचा क्षण",
            preview:
              "शिवाजी महाराजांनी रायगड येथे अखेरचा श्वास घेतला...",
            fullStory:
              "मराठा साम्राज्याचे संस्थापक शिवाजी महाराजांनी रायगड येथे अखेरचा श्वास घेतला. त्यांच्या जाण्यानंतरही पुढील शतकभर भारतीय इतिहासाला आकार देणारी परंपरा आणि प्रेरणा त्यांनी मागे सोडली.",
            significance:
              "रायगड स्मृतीस्थान आणि यात्रास्थान म्हणून ओळखला जाऊ लागला."
          }
        },
        audio: {
          en: "/audio/en/raigad-the-passing.mp3",
          mr: "/audio/mr/raigad-the-passing.mp3"
        }
      },
      {
        year: "Present",
        era: "Living Monument",
        isMajor: false,
        preview:
          "Raigad draws pilgrims and history lovers...",
        fullStory:
          "Today Raigad is reached by ropeway and foot. The ruins of the royal palace and the view from the fort inspire awe and reflection.",
        significance:
          "Preserves the memory of Maratha sovereignty.",
        text: {
          en: {
            title: "Living Monument",
            preview:
              "Raigad draws pilgrims and history lovers...",
            fullStory:
              "Today Raigad is reached by ropeway and foot. The ruins of the royal palace and the view from the fort inspire awe and reflection.",
            significance:
              "Preserves the memory of Maratha sovereignty."
          },
          mr: {
            title: "जिवंत स्मारक",
            preview:
              "रायगड आज यात्रेकरू आणि इतिहासप्रेमींना आकर्षित करतो...",
            fullStory:
              "आज रायगड पर्यटक आणि यात्रेकरू दोघांसाठी दोरीमार्गाने आणि पायी सहज गाठता येतो. राजवाड्याचे अवशेष आणि किल्ल्यावरून दिसणारा दृश्यमान परिसर पाहणाऱ्यांमध्ये विस्मय आणि चिंतनाची भावना निर्माण करतो.",
            significance:
              "हा किल्ला मराठा सार्वभौमत्वाच्या स्मृती जिवंत ठेवतो."
          }
        },
        audio: {
          en: "/audio/en/raigad-living-monument.mp3",
          mr: "/audio/mr/raigad-living-monument.mp3"
        }
      }
    ],
    vrExperience: "Explore the coronation site and the ruins of the royal court in 360°.",
    images360: [
      { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop", label: "Main Gate", subtitle: "Maha Darwaja – The Grand Entrance" },
      { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop", label: "Royal Palace", subtitle: "Witness the architectural splendor" },
      { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop", label: "Panoramic Views", subtitle: "Sahyadri mountain ranges" }
    ],
    cuisine: [{ name: "Puran Poli", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", description: "Sweet flatbread stuffed with chana and jaggery", spiceLevel: "Low", bestTime: "Breakfast", priceRange: "₹40-80" }],
    shopping: [{ name: "Raigad Bazaar", description: "Local crafts and souvenirs near the ropeway base.", highlights: ["Copper items", "Spices"], timing: "8 AM - 6 PM", bestFor: "Souvenirs" }],
    experiences: [{ name: "Ropeway & Fort Tour", duration: "3 hours", description: "Ropeway ascent and guided fort walk", includes: ["Ropeway", "Guide"], bestFor: "Families" }],
    itineraries: {
      halfDay: [
        { time: "9:00 AM", activity: "Ropeway to Raigad", description: "Ascend by ropeway with views of the Sahyadris", tip: "Book ropeway in advance" },
        { time: "10:00 AM", activity: "Coronation Site & Palace Ruins", description: "Visit the coronation memorial and palace remains", tip: "Carry water" },
        { time: "12:00 PM", activity: "Return & Lunch", description: "Descend and lunch at base village", tip: "Try local thali" }
      ],
      oneDay: [
        { time: "8:00 AM", activity: "Ropeway Ascent", description: "Early ascent to avoid crowds", tip: "Wear comfortable shoes" },
        { time: "9:00 AM", activity: "Full Fort Walk", description: "Explore gates, palace site, and viewpoints", tip: "Guide recommended" },
        { time: "12:00 PM", activity: "Lunch Break", description: "Rest at designated area", tip: "Carry snacks" },
        { time: "2:00 PM", activity: "Temple & Memorial", description: "Visit Shivaji memorial and temples", tip: "Respect sacred spaces" },
        { time: "4:00 PM", activity: "Descent", description: "Ropeway down and depart", tip: "Check last ropeway time" }
      ]
    }
  },
  {
    id: 3,
    name: "Sinhagad Fort",
    location: "Pune District",
    era: "The Lion Fort",
    subtitle: "Where Tanaji fought for the glory of Swarajya.",
    significance: "Site of the legendary Battle of Sinhagad and a symbol of Maratha valour.",
    imageUrl: "/sinhagad_fort.png",
    timeline: [
      {
        year: "1670",
        era: "Tanaji's Sacrifice",
        isMajor: true,
        preview:
          "Tanaji Malusare led a daring night assault to recapture Sinhagad...",
        fullStory:
          "In 1670, Tanaji Malusare and his men scaled the fort at night. The battle cost Tanaji his life but secured the fort for Shivaji. The event became a symbol of loyalty and courage.",
        significance:
          "One of the most celebrated episodes in Maratha history.",
        text: {
          en: {
            title: "Tanaji's Sacrifice",
            preview:
              "Tanaji Malusare led a daring night assault to recapture Sinhagad...",
            fullStory:
              "In 1670, Tanaji Malusare and his men scaled the fort at night. The battle cost Tanaji his life but secured the fort for Shivaji. The event became a symbol of loyalty and courage.",
            significance:
              "One of the most celebrated episodes in Maratha history."
          },
          mr: {
            title: "तानाजींचे बलिदान",
            preview:
              "तानाजी मालुसरेंनी सिंहगड परत जिंकण्यासाठी धाडसी रात्रीचा हल्ला केला...",
            fullStory:
              "१६७० मध्ये तानाजी मालुसरे आणि त्यांच्या मावळ्यांनी रात्रीच्या अंधारात सिंहगडाच्या कड्यावर चढाई केली. या लढाईत तानाजींना प्राण गमवावे लागले, पण किल्ला शिवाजी महाराजांच्या ताब्यात आला. ही घटना निष्ठा आणि शौर्याचे प्रतीक बनली.",
            significance:
              "मराठा इतिहासातील सर्वात गौरवशाली प्रसंगांपैकी एक म्हणून ही घटना ओळखली जाते."
          }
        },
        audio: {
          en: "/audio/en/sinhagad-tanaji-sacrifice.mp3",
          mr: "/audio/mr/sinhagad-tanaji-sacrifice.mp3"
        }
      },
      {
        year: "Present",
        era: "Trekkers' Fort",
        isMajor: false,
        preview:
          "Sinhagad is a favourite trek and picnic spot...",
        fullStory:
          "Today Sinhagad is easily accessible from Pune. Trekkers and history enthusiasts visit the gate, memorials, and the sweeping views.",
        significance:
          "Bridges Pune's urban life with Maratha heritage.",
        text: {
          en: {
            title: "Trekkers' Fort",
            preview:
              "Sinhagad is a favourite trek and picnic spot...",
            fullStory:
              "Today Sinhagad is easily accessible from Pune. Trekkers and history enthusiasts visit the gate, memorials, and the sweeping views.",
            significance:
              "Bridges Pune's urban life with Maratha heritage."
          },
          mr: {
            title: "ट्रेकर्सचा किल्ला",
            preview:
              "सिंहगड हा आज लोकप्रिय ट्रेक आणि पिकनिक स्पॉट आहे...",
            fullStory:
              "आज सिंहगड पुण्याहून सहज गाठता येतो. ट्रेकर्स आणि इतिहासप्रेमी किल्ल्याचे दरवाजे, स्मारके आणि विस्तीर्ण दृश्यांचा अनुभव घेण्यासाठी येथे येतात.",
            significance:
              "हा किल्ला पुण्याच्या नागरी जीवनाला मराठा वारशाशी जोडणारा दुवा आहे."
          }
        },
        audio: {
          en: "/audio/en/sinhagad-trekkers-fort.mp3",
          mr: "/audio/mr/sinhagad-trekkers-fort.mp3"
        }
      }
    ],
    vrExperience: "Walk the path of Tanaji's assault and see the fort in 360°.",
    images360: [
      { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop", label: "Main Gate", subtitle: "Kalyan Darwaza" },
      { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop", label: "Panoramic Views", subtitle: "Sahyadri ranges" }
    ],
    cuisine: [{ name: "Pithla Bhakri", image: "https://images.unsplash.com/photo-1563379091339-03246963d9d6?w=800&auto=format&fit=crop", description: "Rustic gram flour curry with millet bread", spiceLevel: "Medium", bestTime: "Lunch", priceRange: "₹50-80" }],
    shopping: [],
    experiences: [{ name: "Sunrise Trek", duration: "4 hours", description: "Guided sunrise trek from base to fort", includes: ["Guide", "Breakfast"], bestFor: "Trekkers" }],
    itineraries: {
      halfDay: [
        { time: "6:00 AM", activity: "Trek Start", description: "Begin trek from base village", tip: "Start early in summer" },
        { time: "8:00 AM", activity: "Fort Exploration", description: "Visit Kalyan Darwaza, memorials, and viewpoints", tip: "Carry water" },
        { time: "10:00 AM", activity: "Descent", description: "Return to base", tip: "Wear grip shoes" }
      ],
      oneDay: [
        { time: "5:30 AM", activity: "Sunrise Trek", description: "Trek up before dawn for sunrise", tip: "Torch recommended" },
        { time: "8:00 AM", activity: "Fort Tour", description: "Full circuit of fort with guide", tip: "Hire guide at gate" },
        { time: "11:00 AM", activity: "Breakfast & Rest", description: "Local breakfast at stall", tip: "Try pithla bhakri" },
        { time: "1:00 PM", activity: "Monuments & Views", description: "Tanaji memorial, temples, and photography", tip: "Respect memorials" },
        { time: "3:00 PM", activity: "Descent", description: "Walk down and depart", tip: "Avoid descent in peak sun" }
      ]
    }
  },
  {
    id: 4,
    name: "Pratapgad Fort",
    location: "Satara District",
    era: "Where Afzal Khan Fell",
    subtitle: "The fort that witnessed the encounter that changed the Deccan.",
    significance: "Site of Shivaji Maharaj's historic encounter with Afzal Khan in 1659.",
    imageUrl: "/pratapgad_fort.png",
    timeline: [
      {
        year: "1656",
        era: "Building the Sentinel",
        isMajor: false,
        preview:
          "Pratapgad was built under Shivaji's orders to guard the passes...",
        fullStory:
          "Pratapgad was constructed to dominate the strategic route between the Konkan and the Deccan. It would soon become the stage for a decisive moment.",
        significance:
          "Strategic fortification before the Afzal Khan encounter.",
        text: {
          en: {
            title: "Building the Sentinel",
            preview:
              "Pratapgad was built under Shivaji's orders to guard the passes...",
            fullStory:
              "Pratapgad was constructed to dominate the strategic route between the Konkan and the Deccan. It would soon become the stage for a decisive moment.",
            significance:
              "Strategic fortification before the Afzal Khan encounter."
          },
          mr: {
            title: "पहरेदाराची उभारणी",
            preview:
              "प्रातापगड घाटांचे रक्षण करण्यासाठी शिवाजी महाराजांच्या आदेशावर बांधण्यात आला...",
            fullStory:
              "प्रातापगड हा कोकण आणि दख्खन दरम्यानच्या धोरणात्मक मार्गावर वर्चस्व मिळवण्यासाठी बांधण्यात आला. अल्पावधीतच हा किल्ला एका निर्णायक प्रसंगाचे रंगमंच ठरणार होता.",
            significance:
              "अफजलखान भेटीपूर्वीचे हे अत्यंत महत्त्वाचे संरक्षणात्मक बांधकाम होते."
          }
        },
        audio: {
          en: "/audio/en/pratapgad-building-sentinel.mp3",
          mr: "/audio/mr/pratapgad-building-sentinel.mp3"
        }
      },
      {
        year: "1659",
        era: "The Encounter",
        isMajor: true,
        preview:
          "Shivaji Maharaj met Afzal Khan at the foot of Pratapgad...",
        fullStory:
          "The meeting between Shivaji and the Bijapur general Afzal Khan ended in the latter's death. The event is central to Maratha lore and marked a turning point in Shivaji's rise.",
        significance:
          "Marked the shift in power in the Deccan.",
        text: {
          en: {
            title: "The Encounter",
            preview:
              "Shivaji Maharaj met Afzal Khan at the foot of Pratapgad...",
            fullStory:
              "The meeting between Shivaji and the Bijapur general Afzal Khan ended in the latter's death. The event is central to Maratha lore and marked a turning point in Shivaji's rise.",
            significance:
              "Marked the shift in power in the Deccan."
          },
          mr: {
            title: "भेटीचा क्षण",
            preview:
              "शिवाजी महाराजांची प्रातापगडाच्या पायथ्याशी बीजापूरचा सरदार अफजलखानाशी भेट झाली...",
            fullStory:
              "शिवाजी महाराज आणि बीजापुरी सरदार अफजलखान यांची झालेली ही भेट अफजलखानाच्या मृत्यूने संपली. मराठी लोककथांमध्ये या घटनेला अत्यंत मध्यवर्ती स्थान आहे आणि शिवाजींच्या उत्थानातील हा महत्त्वाचा वळणबिंदू मानला जातो.",
            significance:
              "या प्रसंगाने दख्खनमधील सत्तासंतुलन बदलण्यास सुरुवात झाली."
          }
        },
        audio: {
          en: "/audio/en/pratapgad-encounter.mp3",
          mr: "/audio/mr/pratapgad-encounter.mp3"
        }
      },
      {
        year: "Present",
        era: "Pilgrimage of History",
        isMajor: false,
        preview:
          "Pratapgad draws visitors to the encounter spot and the fort...",
        fullStory:
          "The encounter site, the fort, and the statue of Shivaji draw thousands. The drive through the ghats is part of the experience.",
        significance:
          "Keeps the memory of 1659 alive.",
        text: {
          en: {
            title: "Pilgrimage of History",
            preview:
              "Pratapgad draws visitors to the encounter spot and the fort...",
            fullStory:
              "The encounter site, the fort, and the statue of Shivaji draw thousands. The drive through the ghats is part of the experience.",
            significance:
              "Keeps the memory of 1659 alive."
          },
          mr: {
            title: "इतिहासाची यात्रा",
            preview:
              "प्रातापगड आज भेटीच्या ठिकाणी आणि किल्ल्यावर येणाऱ्या असंख्य पर्यटकांना आकर्षित करतो...",
            fullStory:
              "भेटीचे ठिकाण, किल्ल्याची रचना आणि शिवाजींचा पुतळा दरवर्षी हजारो लोकांना येथे खेचून आणतो. घाटमाथ्यावरून किल्ल्यापर्यंतचा प्रवास ही देखील अनुभवाचा एक महत्त्वाचा भाग ठरतो.",
            significance:
              "हा किल्ला १६५९ सालच्या त्या ऐतिहासिक प्रसंगाची आठवण जिवंत ठेवतो."
          }
        },
        audio: {
          en: "/audio/en/pratapgad-pilgrimage-history.mp3",
          mr: "/audio/mr/pratapgad-pilgrimage-history.mp3"
        }
      }
    ],
    vrExperience: "Stand at the encounter site and explore Pratapgad in 360°.",
    images360: [
      { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop", label: "Encounter Site", subtitle: "Where history changed" },
      { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop", label: "Fort Views", subtitle: "Sahyadri landscape" }
    ],
    cuisine: [{ name: "Kanda Bhaji", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", description: "Onion fritters with chai", spiceLevel: "Medium", bestTime: "Snack", priceRange: "₹30-60" }],
    shopping: [{ name: "Pratapgad Village Market", description: "Small market near the fort base.", highlights: ["Local snacks", "Souvenirs"], timing: "7 AM - 6 PM", bestFor: "Quick buys" }],
    experiences: [{ name: "Encounter Site & Fort Tour", duration: "2 hours", description: "Visit encounter spot and fort with narration", includes: ["Guide"], bestFor: "History buffs" }],
    itineraries: {
      halfDay: [
        { time: "9:00 AM", activity: "Drive to Pratapgad", description: "Reach base from Mahabaleshwar or Pune", tip: "Check road conditions" },
        { time: "10:30 AM", activity: "Encounter Site", description: "Visit the historic meeting spot with guide", tip: "Hire local guide" },
        { time: "12:00 PM", activity: "Fort Climb", description: "Climb to fort and explore", tip: "Comfortable shoes" }
      ],
      oneDay: [
        { time: "8:00 AM", activity: "Arrival at Base", description: "Reach Pratapgad base", tip: "Start early" },
        { time: "9:00 AM", activity: "Encounter Site Tour", description: "Detailed narration at encounter spot", tip: "Listen to full story" },
        { time: "11:00 AM", activity: "Fort Exploration", description: "Upper fort and viewpoints", tip: "Carry water" },
        { time: "1:00 PM", activity: "Lunch", description: "Local lunch at village", tip: "Try Maharashtrian thali" },
        { time: "3:00 PM", activity: "Return", description: "Drive back", tip: "Leave before dark" }
      ]
    }
  },
  {
    id: 5,
    name: "Lohagad Fort",
    location: "Lonavala, Pune District",
    era: "The Iron Fort",
    subtitle: "Where the Sahyadris meet the sky.",
    significance: "A well-preserved fort near Lonavala, popular for treks and monsoon views.",
    imageUrl: "/lohagad_fort.png",
    timeline: [
      {
        year: "Medieval",
        era: "Guardian of the Pass",
        isMajor: false,
        preview:
          "Lohagad guarded the Bor Ghat trade route...",
        fullStory:
          "Lohagad controlled movement along the important pass connecting the Konkan to the Deccan. It changed hands between dynasties before Shivaji's era.",
        significance:
          "Strategic control of trade and movement.",
        text: {
          en: {
            title: "Guardian of the Pass",
            preview:
              "Lohagad guarded the Bor Ghat trade route...",
            fullStory:
              "Lohagad controlled movement along the important pass connecting the Konkan to the Deccan. It changed hands between dynasties before Shivaji's era.",
            significance:
              "Strategic control of trade and movement."
          },
          mr: {
            title: "घाटरक्षक",
            preview:
              "लोहगडने बोर घाटावरील व्यापारी मार्गाचे रक्षण केले...",
            fullStory:
              "लोहगडने कोकण आणि दख्खन जोडणाऱ्या महत्त्वाच्या घाटमार्गावरील हालचालींवर नियंत्रण ठेवले. शिवाजी महाराजांच्या काळापूर्वी हा किल्ला अनेक राजवटींच्या ताब्यात येत–जात राहिला.",
            significance:
              "या किल्ल्याने व्यापार आणि हालचालींवरील धोरणात्मक नियंत्रण प्रदान केले."
          }
        },
        audio: {
          en: "/audio/en/lohagad-guardian-pass.mp3",
          mr: "/audio/mr/lohagad-guardian-pass.mp3"
        }
      },
      {
        year: "1670s",
        era: "Under Shivaji",
        isMajor: true,
        preview:
          "Shivaji strengthened Lohagad and used it as a treasury...",
        fullStory:
          "Shivaji captured and reinforced Lohagad. The fort's famous Vinchu Kata (scorpion tail) was built in this period.",
        significance:
          "Part of the Maratha defensive network.",
        text: {
          en: {
            title: "Under Shivaji",
            preview:
              "Shivaji strengthened Lohagad and used it as a treasury...",
            fullStory:
              "Shivaji captured and reinforced Lohagad. The fort's famous Vinchu Kata (scorpion tail) was built in this period.",
            significance:
              "Part of the Maratha defensive network."
          },
          mr: {
            title: "शिवाजींच्या ताब्यात",
            preview:
              "शिवाजी महाराजांनी लोहगड मजबूत केला आणि तो खजिना ठेवण्याच्या ठिकाण म्हणून वापरला...",
            fullStory:
              "शिवाजी महाराजांनी लोहगड जिंकून त्याची तटबंदी अधिक बळकट केली. याच काळात किल्ल्याचा प्रसिद्ध विंचू काटा हा प्रक्षेपक भाग बांधण्यात आला.",
            significance:
              "हा किल्ला मराठा संरक्षण जाळ्याचा महत्त्वाचा भाग बनला."
          }
        },
        audio: {
          en: "/audio/en/lohagad-under-shivaji.mp3",
          mr: "/audio/mr/lohagad-under-shivaji.mp3"
        }
      },
      {
        year: "Present",
        era: "Trekkers' Favourite",
        isMajor: false,
        preview:
          "Lohagad is one of the most trekked forts near Mumbai-Pune...",
        fullStory:
          "Easy access from Lonavala and the scenic Vinchu Kata make Lohagad a favourite for day treks and monsoon visits.",
        significance:
          "Accessible heritage for city dwellers.",
        text: {
          en: {
            title: "Trekkers' Favourite",
            preview:
              "Lohagad is one of the most trekked forts near Mumbai-Pune...",
            fullStory:
              "Easy access from Lonavala and the scenic Vinchu Kata make Lohagad a favourite for day treks and monsoon visits.",
            significance:
              "Accessible heritage for city dwellers."
          },
          mr: {
            title: "ट्रेकर्सची आवड",
            preview:
              "मुंबई–पुणे परिसरातील सर्वाधिक चढला जाणारा किल्ला म्हणून लोहगड ओळखला जातो...",
            fullStory:
              "लोणावळ्याहून सहज पोहोचता येणे आणि विंचू काट्याचे निसर्गरम्य दृश्य यामुळे लोहगड दिवसाच्या ट्रेकसाठी आणि पावसाळी सहलींसाठी आवडता ठिकाण बनला आहे.",
            significance:
              "शहरातील लोकांसाठी हा किल्ला सहज गाठता येणारा वारसास्थळ ठरतो."
          }
        },
        audio: {
          en: "/audio/en/lohagad-trekkers-favourite.mp3",
          mr: "/audio/mr/lohagad-trekkers-favourite.mp3"
        }
      }
    ],
    vrExperience: "Walk the Vinchu Kata and explore Lohagad in 360°.",
    images360: [
      { src: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1200&auto=format&fit=crop", label: "Vinchu Kata", subtitle: "The Scorpion Tail" },
      { src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&auto=format&fit=crop", label: "Fort Gates", subtitle: "Ancient entrance" }
    ],
    cuisine: [{ name: "Chai & Bhajiya", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop", description: "Tea and fritters at base village", spiceLevel: "Low", bestTime: "Any", priceRange: "₹20-50" }],
    shopping: [{ name: "Lonavala Chikki", description: "Famous sweet from Lonavala.", highlights: ["Chikki", "Fudge"], timing: "All day", bestFor: "Takeaways" }],
    experiences: [{ name: "Lohagad Trek", duration: "5 hours", description: "Trek from base to fort and Vinchu Kata", includes: ["Guide optional"], bestFor: "Beginners" }],
    itineraries: {
      halfDay: [
        { time: "7:00 AM", activity: "Trek Start", description: "From Lonavala or base village", tip: "Monsoon: extra caution" },
        { time: "9:00 AM", activity: "Fort & Vinchu Kata", description: "Explore fort and the scorpion tail", tip: "Vinchu Kata is narrow" },
        { time: "11:00 AM", activity: "Descent", description: "Return to base", tip: "Slippery in rain" }
      ],
      oneDay: [
        { time: "6:30 AM", activity: "Start from Lonavala", description: "Drive or shared transport to base", tip: "Leave early" },
        { time: "8:00 AM", activity: "Trek to Fort", description: "Steady climb to Lohagad", tip: "Carry water and snacks" },
        { time: "10:00 AM", activity: "Fort Exploration", description: "Gates, structures, and viewpoints", tip: "Photography friendly" },
        { time: "12:00 PM", activity: "Vinchu Kata", description: "Walk the famous spine (weather permitting)", tip: "Not in strong wind" },
        { time: "2:00 PM", activity: "Descent & Lunch", description: "Down and lunch at Lonavala", tip: "Try chikki" }
      ]
    }
  },
  {
    id: 6,
    name: "Rajgad Fort",
    location: "Pune District",
    era: "The King of Forts",
    subtitle: "The first capital of the Maratha Empire.",
    significance: "Served as the capital of the Maratha Empire under Shivaji Maharaj for nearly 26 years.",
    imageUrl: "/rajgad_fort.png",
    timeline: [],
    vrExperience: "Explore the massive Suvela Machi and Padmavati Machi in 360°.",
    images360: [],
    cuisine: [],
    shopping: [],
    experiences: [],
    itineraries: {}
  }
];