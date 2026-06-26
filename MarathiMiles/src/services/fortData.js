import gateImg from "../assets/forts/shivneri/gate.jpg";
import heroImg from "../assets/forts/shivneri/hero.jpg";
import pathImg from "../assets/forts/shivneri/path.jpg";
import templeImg from "../assets/forts/shivneri/temple.jpg";
import viewImg from "../assets/forts/shivneri/view.jpg";
import mainHeroImg from "../assets/forts/shivneri/shivnerimain.jpg";

import raigadGateImg from "../assets/forts/raigad/gate.png";
import raigadPalaceImg from "../assets/forts/raigad/palace.png";
import raigadPanoramicImg from "../assets/forts/raigad/panoramic.png";

import sinhagadKalyanDarwajaImg from "../assets/forts/sinhagad/kalyan_darwaja.png";
import sinhagadViewImg from "../assets/forts/sinhagad/view.png";

import pratapgadViewImg from "../assets/forts/pratapgad/pratapgad_view.jpg";
import pratapgadTempleImg from "../assets/forts/pratapgad/pratapgad_temple.jpg";

import lohagadPanoramicImg from "../assets/forts/lohagad/lohagad_panoramic.png";
import lohagadWideImg from "../assets/forts/lohagad/lohagad_wide.png";
import lohagadPathImg from "../assets/forts/lohagad/lohagad_path.jpg";
import lohagadViewImg from "../assets/forts/lohagad/lohagad_view.jpg";

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
    location: "Raigad District, Maharashtra",
    era: "Capital of the Maratha Empire (1674 CE)",
    subtitle: "Where the crown of Swarajya was first consecrated",
    significance: "The seat of Chhatrapati Shivaji Maharaj's coronation and the capital of the Maratha Empire.",
    imageUrl: "/raigad_fort.png",

    // DEEP HISTORICAL TIMELINE - Story Chapters with Mood Tags
    timeline: [
      {
        year: "Pre-12th Century",
        era: "The Ancient Citadel",
        mood: "foundation",
        isMajor: false,
        preview: "Long before the Marathas, Raigad stood as Rairi — a fortress carved into the Sahyadri peaks...",
        fullStory:
          "Long before the Marathas, Raigad stood as Rairi — a fortress carved into the Sahyadri peaks by the Shilahar dynasty. Perched at 820 meters above sea level, this isolated mesa was a natural stronghold. The sheer cliffs on all sides made it virtually impregnable. For centuries, it passed through the hands of Yadavas and local chieftains, each recognizing the strategic genius of its location — commanding views of the Konkan coastline to the west and the Deccan plateau to the east.",
        significance:
          "Established the fort's natural impregnability that would make it the ideal capital for an empire.",
        text: {
          en: {
            title: "The Ancient Citadel",
            preview:
              "Long before the Marathas, Raigad stood as Rairi — a fortress carved into the Sahyadri peaks...",
            fullStory:
              "Long before the Marathas, Raigad stood as Rairi — a fortress carved into the Sahyadri peaks by the Shilahar dynasty. Perched at 820 meters above sea level, this isolated mesa was a natural stronghold. The sheer cliffs on all sides made it virtually impregnable. For centuries, it passed through the hands of Yadavas and local chieftains, each recognizing the strategic genius of its location — commanding views of the Konkan coastline to the west and the Deccan plateau to the east.",
            significance:
              "Established the fort's natural impregnability that would make it the ideal capital for an empire."
          },
          mr: {
            title: "प्राचीन गढी",
            preview:
              "मराठ्यांच्या खूप आधी, रायगड हा रायरी म्हणून सह्याद्रीच्या शिखरांवर कोरलेला किल्ला होता...",
            fullStory:
              "मराठ्यांच्या खूप आधी, रायगड हा रायरी म्हणून शिलाहार घराण्याने सह्याद्रीच्या शिखरांवर बांधलेला किल्ला होता. समुद्रसपाटीपासून ८२० मीटर उंचीवर असलेला हा एकाकी डोंगरमाथा नैसर्गिक बालेकिल्ला होता. चारही बाजूंना उभ्या कड्यांमुळे तो जवळजवळ अजिंक्य बनला होता. शतकानुशतके तो यादव आणि स्थानिक सरदारांच्या ताब्यात गेला, प्रत्येकाने त्याच्या स्थानाची रणनीतिक बुद्धिमत्ता ओळखली — पश्चिमेला कोकण किनारपट्टीचे आणि पूर्वेला दख्खन पठाराचे विहंगम दृश्य.",
            significance:
              "किल्ल्याची नैसर्गिक अजिंक्यता स्थापित केली जी पुढे एका साम्राज्याच्या राजधानीसाठी आदर्श ठरली."
          }
        },
        audio: {
          en: "/audio/en/raigad-ancient-citadel.mp3",
          mr: "/audio/mr/raigad-ancient-citadel.mp3"
        }
      },
      {
        year: "1490-1636",
        era: "Under Chandrarao More",
        mood: "conflict",
        isMajor: false,
        preview:
          "The More clan held Rairi as their stronghold, a bastion of local power in the Sahyadris...",
        fullStory:
          "The More clan held Rairi as their stronghold, a bastion of local power in the Sahyadris. Chandrarao More, a Javali chieftain, ruled the fort and its surrounding territory with an iron grip. The Mores were originally loyal to the Bijapur Sultanate but maintained near-independence due to their remote fortress. The fort during this period was a functional hill station — well-watered with natural tanks, defended by steep approaches, but lacking the grand architecture it would later receive. The Mores' hold on Rairi would become a pivotal chapter when a young Shivaji set his sights on it.",
        significance:
          "The More clan's control made Rairi a target that Shivaji knew he must capture to build his dream of Swarajya.",
        audioNote:
          "🔊 Hear the story of the Javali kingdom and its fateful encounter with destiny",
        text: {
          en: {
            title: "Under Chandrarao More",
            preview:
              "The More clan held Rairi as their stronghold, a bastion of local power in the Sahyadris...",
            fullStory:
              "The More clan held Rairi as their stronghold, a bastion of local power in the Sahyadris. Chandrarao More, a Javali chieftain, ruled the fort and its surrounding territory with an iron grip. The Mores were originally loyal to the Bijapur Sultanate but maintained near-independence due to their remote fortress. The fort during this period was a functional hill station — well-watered with natural tanks, defended by steep approaches, but lacking the grand architecture it would later receive. The Mores' hold on Rairi would become a pivotal chapter when a young Shivaji set his sights on it.",
            significance:
              "The More clan's control made Rairi a target that Shivaji knew he must capture to build his dream of Swarajya."
          },
          mr: {
            title: "चंद्रराव मोऱ्यांच्या अधिपत्याखाली",
            preview:
              "मोरे घराण्याने रायरी हा त्यांचा बालेकिल्ला म्हणून राखला, सह्याद्रीतील स्थानिक सत्तेचा गड...",
            fullStory:
              "मोरे घराण्याने रायरी हा त्यांचा बालेकिल्ला म्हणून राखला, सह्याद्रीतील स्थानिक सत्तेचा गड. जावळीचा सरदार चंद्रराव मोरे याने किल्ला आणि आसपासचा प्रदेश लोखंडी पकडीने राखला. मोरे मूळचे बीजापूर सल्तनतीशी एकनिष्ठ होते पण त्यांच्या दुर्गम किल्ल्यामुळे जवळजवळ स्वतंत्र राहिले. या काळात किल्ला एक कार्यात्मक डोंगरी ठाणा होता — नैसर्गिक टाक्यांमुळे पाण्याने समृद्ध, उभ्या चढाणांमुळे संरक्षित, पण पुढे मिळणाऱ्या भव्य वास्तुकलेचा अभाव. मोऱ्यांच्या रायरीवरील ताब्याचा अध्याय तरुण शिवाजींनी नजर ठेवल्यावर निर्णायक ठरणार होता.",
            significance:
              "मोरे घराण्याच्या ताब्यामुळे रायरी हे शिवाजींचे स्वराज्याचे स्वप्न पूर्ण करण्यासाठी जिंकावे लागणारे लक्ष्य बनले."
          }
        },
        audio: {
          en: "/audio/en/raigad-chandrarao-more.mp3",
          mr: "/audio/mr/raigad-chandrarao-more.mp3"
        }
      },
      {
        year: "1656",
        era: "The Conquest",
        mood: "victory",
        isMajor: true,
        preview:
          "Shivaji captured Rairi from the Mores through a combination of diplomacy and daring...",
        fullStory:
          "Shivaji captured Rairi from the Mores through a combination of diplomacy and daring. After subduing the Javali region, Shivaji took Rairi in 1656. The moment he stood atop its mesa and surveyed the 360-degree vista — the Arabian Sea glinting in the distance, the Sahyadri ranges folding endlessly — he knew this was no ordinary fort. This was a throne. Shivaji immediately began transforming Rairi into Raigad (the Royal Fort), commissioning massive construction: a royal palace, audience halls, markets, water systems, and administrative quarters. What had been a functional hill fort would become the seat of an empire.",
        significance:
          "The capture and renaming of Rairi to Raigad marked the birth of the Maratha Empire's capital.",
        audioNote:
          "🔊 Experience the moment when a fort became a capital",
        text: {
          en: {
            title: "The Conquest",
            preview:
              "Shivaji captured Rairi from the Mores through a combination of diplomacy and daring...",
            fullStory:
              "Shivaji captured Rairi from the Mores through a combination of diplomacy and daring. After subduing the Javali region, Shivaji took Rairi in 1656. The moment he stood atop its mesa and surveyed the 360-degree vista — the Arabian Sea glinting in the distance, the Sahyadri ranges folding endlessly — he knew this was no ordinary fort. This was a throne. Shivaji immediately began transforming Rairi into Raigad (the Royal Fort), commissioning massive construction: a royal palace, audience halls, markets, water systems, and administrative quarters. What had been a functional hill fort would become the seat of an empire.",
            significance:
              "The capture and renaming of Rairi to Raigad marked the birth of the Maratha Empire's capital."
          },
          mr: {
            title: "विजयाचा क्षण",
            preview:
              "शिवाजींनी मुत्सद्देगिरी आणि धाडसाच्या संगमाने रायरी मोऱ्यांकडून जिंकला...",
            fullStory:
              "शिवाजींनी मुत्सद्देगिरी आणि धाडसाच्या संगमाने रायरी मोऱ्यांकडून जिंकला. जावळी प्रदेश काबीज केल्यानंतर शिवाजींनी १६५६ मध्ये रायरी ताब्यात घेतला. ज्या क्षणी ते डोंगरमाथ्यावर उभे राहून ३६० अंशांचे विहंगम दृश्य पाहू लागले — दूरवर चमकणारा अरबी समुद्र, अखंड पसरलेल्या सह्याद्रीच्या रांगा — त्यांना कळले हा साधा किल्ला नाही. हे सिंहासन आहे. शिवाजींनी तात्काळ रायरीचे रायगड (राजगड) मध्ये रूपांतर सुरू केले, भव्य बांधकामाची आज्ञा दिली: राजवाडा, दरबार हॉल, बाजारपेठा, पाणीपुरवठा व्यवस्था आणि प्रशासकीय कार्यालये. एक कार्यात्मक डोंगरी किल्ला एका साम्राज्याचे आसन बनणार होता.",
            significance:
              "रायरीचा ताबा आणि रायगड हे नामकरण मराठा साम्राज्याच्या राजधानीच्या जन्माचे प्रतीक ठरले."
          }
        },
        audio: {
          en: "/audio/en/raigad-the-conquest.mp3",
          mr: "/audio/mr/raigad-the-conquest.mp3"
        }
      },
      {
        year: "1674",
        era: "The Coronation",
        mood: "glory",
        isMajor: true,
        preview:
          "On June 6, 1674, the Sahyadris witnessed history — Shivaji Maharaj was crowned Chhatrapati...",
        fullStory:
          "On June 6, 1674, the Sahyadris witnessed history — Shivaji Maharaj was crowned Chhatrapati at Raigad in a grand ceremony that shook the Mughal and Bijapur courts. The coronation was performed by Gagabhatt, a Brahmin priest from Varanasi, lending pan-Indian legitimacy to the Maratha state. Over 5,000 guests attended. Gold and silver coins were minted, a new royal seal was created, and the fort's marketplace — stretching 200 shops — teemed with merchants from across the subcontinent. Raigad was no longer just a fort; it was the beating heart of Swarajya, a sovereign Hindu kingdom rising from the ashes of subjugation.",
        significance:
          "Established the Maratha Empire as a sovereign kingdom and Raigad as its capital.",
        audioNote:
          "🔊 Hear the royal conch shells and drums of the coronation ceremony",
        text: {
          en: {
            title: "The Coronation",
            preview:
              "On June 6, 1674, the Sahyadris witnessed history — Shivaji Maharaj was crowned Chhatrapati...",
            fullStory:
              "On June 6, 1674, the Sahyadris witnessed history — Shivaji Maharaj was crowned Chhatrapati at Raigad in a grand ceremony that shook the Mughal and Bijapur courts. The coronation was performed by Gagabhatt, a Brahmin priest from Varanasi, lending pan-Indian legitimacy to the Maratha state. Over 5,000 guests attended. Gold and silver coins were minted, a new royal seal was created, and the fort's marketplace — stretching 200 shops — teemed with merchants from across the subcontinent. Raigad was no longer just a fort; it was the beating heart of Swarajya, a sovereign Hindu kingdom rising from the ashes of subjugation.",
            significance:
              "Established the Maratha Empire as a sovereign kingdom and Raigad as its capital."
          },
          mr: {
            title: "राज्याभिषेक",
            preview:
              "६ जून १६७४ — सह्याद्रीने इतिहास घडताना पाहिला — शिवाजी महाराजांचा छत्रपती म्हणून राज्याभिषेक...",
            fullStory:
              "६ जून १६७४ रोजी सह्याद्रीने इतिहास घडताना पाहिला — रायगड येथे शिवाजी महाराजांचा छत्रपती म्हणून भव्य समारंभात राज्याभिषेक झाला ज्याने मुघल आणि बीजापूर दरबारांना हादरवून सोडले. हा राज्याभिषेक वाराणसीहून आलेल्या गागाभट्ट यांनी संपन्न केला, ज्यामुळे मराठा राज्याला अखिल भारतीय वैधता प्राप्त झाली. ५,००० हून अधिक पाहुणे उपस्थित होते. सोन्या-चांदीची नाणी पाडली गेली, नवीन राजमुद्रा तयार झाली आणि किल्ल्याची बाजारपेठ — जिथे २०० दुकाने होती — उपखंडभरातून आलेल्या व्यापाऱ्यांनी गजबजून गेली. रायगड आता केवळ किल्ला राहिला नव्हता; तो स्वराज्याचे धडधडणारे हृदय बनला होता, दास्यत्वाच्या राखेतून उभे राहिलेले सार्वभौम हिंदवी स्वराज्य.",
            significance:
              "या टप्प्याने मराठा साम्राज्य स्वतंत्र सार्वभौम राज्य म्हणून स्थापित झाले आणि रायगड त्याची राजधानी बनली."
          }
        },
        audio: {
          en: "/audio/en/raigad-coronation.mp3",
          mr: "/audio/mr/raigad-coronation.mp3"
        }
      },
      {
        year: "1680",
        era: "The Passing of a Legend",
        mood: "tragedy",
        isMajor: true,
        preview:
          "On April 3, 1680, the lion of Maharashtra breathed his last at Raigad...",
        fullStory:
          "On April 3, 1680, the lion of Maharashtra breathed his last at Raigad. Chhatrapati Shivaji Maharaj, the founder of the Maratha Empire, passed away at the age of 50. The entire fort plunged into mourning. His funeral pyre was lit at the samadhi site that stands today as the most sacred spot on Raigad. His passing triggered a succession crisis — but his legacy had already been carved into the stones of Raigad forever. The markets fell silent, the drums ceased, and the Sahyadri mountains themselves seemed to weep. Yet from this sorrow, a nation's resolve only hardened.",
        significance:
          "Raigad became an eternal pilgrimage site and the Shivaji Samadhi its most revered landmark.",
        audioNote:
          "🔊 A moment of silence and reflection at the samadhi",
        text: {
          en: {
            title: "The Passing of a Legend",
            preview:
              "On April 3, 1680, the lion of Maharashtra breathed his last at Raigad...",
            fullStory:
              "On April 3, 1680, the lion of Maharashtra breathed his last at Raigad. Chhatrapati Shivaji Maharaj, the founder of the Maratha Empire, passed away at the age of 50. The entire fort plunged into mourning. His funeral pyre was lit at the samadhi site that stands today as the most sacred spot on Raigad. His passing triggered a succession crisis — but his legacy had already been carved into the stones of Raigad forever. The markets fell silent, the drums ceased, and the Sahyadri mountains themselves seemed to weep. Yet from this sorrow, a nation's resolve only hardened.",
            significance:
              "Raigad became an eternal pilgrimage site and the Shivaji Samadhi its most revered landmark."
          },
          mr: {
            title: "एका दंतकथेचा अस्त",
            preview:
              "३ एप्रिल १६८० — महाराष्ट्राच्या सिंहाने रायगड येथे अखेरचा श्वास घेतला...",
            fullStory:
              "३ एप्रिल १६८० रोजी महाराष्ट्राच्या सिंहाने रायगड येथे अखेरचा श्वास घेतला. मराठा साम्राज्याचे संस्थापक छत्रपती शिवाजी महाराज वयाच्या ५० व्या वर्षी निवर्तले. संपूर्ण किल्ला शोकसागरात बुडाला. त्यांची चितेची आग ज्या ठिकाणी लावली गेली ती समाधी आज रायगडावरील सर्वात पवित्र स्थान म्हणून उभी आहे. त्यांच्या जाण्याने वारसाहक्काचे संकट निर्माण झाले — पण त्यांचा वारसा रायगडाच्या दगडांमध्ये कायमचा कोरला गेला होता. बाजारपेठा शांत झाल्या, नगारे बंद पडले आणि सह्याद्रीचे डोंगरदेखील रडले असावेत असे वाटले. तरीही या दुःखातून राष्ट्राचा निर्धार अधिकच कठोर झाला.",
            significance:
              "रायगड हे शाश्वत तीर्थस्थान बनले आणि शिवाजी समाधी हे त्याचे सर्वात पूज्य स्मारक ठरले."
          }
        },
        audio: {
          en: "/audio/en/raigad-the-passing.mp3",
          mr: "/audio/mr/raigad-the-passing.mp3"
        }
      },
      {
        year: "1818",
        era: "The Fall to the British",
        mood: "tragedy",
        isMajor: false,
        preview:
          "After the Maratha Empire's decline, British forces captured Raigad...",
        fullStory:
          "After the Maratha Empire's decline, British forces under General Prother captured Raigad in 1818 during the Third Anglo-Maratha War. The British, recognizing the fort's symbolic power, deliberately dismantled key structures — the royal palace was partly destroyed, the Nagarkhana silenced, and administrative buildings left to decay. For the colonial administration, Raigad was too dangerous as a symbol of indigenous sovereignty. Yet the spirit of Raigad could not be demolished. Local villagers continued to make pilgrimages to the Shivaji Samadhi, keeping the flame of Maratha pride alive through generations of colonial rule.",
        significance:
          "Marked the end of Maratha political power but the beginning of Raigad as a symbol of resistance.",
        audioNote:
          "🔊 Hear the echoes of cannon fire and the quiet defiance that followed",
        text: {
          en: {
            title: "The Fall to the British",
            preview:
              "After the Maratha Empire's decline, British forces captured Raigad...",
            fullStory:
              "After the Maratha Empire's decline, British forces under General Prother captured Raigad in 1818 during the Third Anglo-Maratha War. The British, recognizing the fort's symbolic power, deliberately dismantled key structures — the royal palace was partly destroyed, the Nagarkhana silenced, and administrative buildings left to decay. For the colonial administration, Raigad was too dangerous as a symbol of indigenous sovereignty. Yet the spirit of Raigad could not be demolished. Local villagers continued to make pilgrimages to the Shivaji Samadhi, keeping the flame of Maratha pride alive through generations of colonial rule.",
            significance:
              "Marked the end of Maratha political power but the beginning of Raigad as a symbol of resistance."
          },
          mr: {
            title: "ब्रिटिशांच्या ताब्यात",
            preview:
              "मराठा साम्राज्याच्या अधःपतनानंतर ब्रिटिश सैन्याने रायगड ताब्यात घेतला...",
            fullStory:
              "मराठा साम्राज्याच्या अधःपतनानंतर तिसऱ्या आंग्ल-मराठा युद्धात १८१८ मध्ये जनरल प्रॉदरच्या नेतृत्वाखालील ब्रिटिश सैन्याने रायगड ताब्यात घेतला. ब्रिटिशांनी किल्ल्याची प्रतीकात्मक शक्ती ओळखून जाणूनबुजून महत्त्वाच्या वास्तू पाडल्या — राजवाडा अंशतः उद्ध्वस्त केला, नगारखाना शांत केला आणि प्रशासकीय इमारती मोडकळीस आणल्या. वसाहतवादी प्रशासनासाठी रायगड हा स्वदेशी सार्वभौमत्वाचे प्रतीक म्हणून अतिशय धोकादायक होता. तरीही रायगडाचा आत्मा मोडता आला नाही. स्थानिक ग्रामस्थांनी शिवाजी समाधीला यात्रा करणे चालू ठेवले, वसाहतवादी राजवटीच्या पिढ्यांमधून मराठा अभिमानाची ज्योत तेवत ठेवली.",
            significance:
              "या घटनेने मराठा राजकीय सत्तेचा अंत चिन्हांकित केला पण रायगडला प्रतिकाराचे प्रतीक बनवण्याची सुरुवात केली."
          }
        },
        audio: {
          en: "/audio/en/raigad-british-fall.mp3",
          mr: "/audio/mr/raigad-british-fall.mp3"
        }
      },
      {
        year: "Present",
        era: "Living Monument",
        mood: "renaissance",
        isMajor: true,
        preview:
          "Today, Raigad is more than ruins — it's a pilgrimage where the spirit of Swarajya breathes...",
        fullStory:
          "Today, Raigad is more than ruins — it's a pilgrimage where the spirit of Swarajya breathes. The ropeway, installed in 1996, makes the once-arduous climb accessible to all. Every year, lakhs of visitors ascend to pay respects at the Shivaji Samadhi, walk the corridors of the royal palace ruins, and stand at Takmak Tok to gaze at the same view that inspired an empire. The Archaeological Survey of India maintains the site, and ongoing restoration work continues to reveal new insights. On Shivaji Jayanti, the fort comes alive with processions, Powada performances, and the thunderous 'Jai Bhavani! Jai Shivaji!' that echoes across the Sahyadris.",
        significance:
          "Preserves the physical and spiritual memory of Maharashtra's most defining period for future generations.",
        audioNote:
          "🔊 Experience the peaceful sounds of modern pilgrimage at the samadhi",
        text: {
          en: {
            title: "Living Monument",
            preview:
              "Today, Raigad is more than ruins — it's a pilgrimage where the spirit of Swarajya breathes...",
            fullStory:
              "Today, Raigad is more than ruins — it's a pilgrimage where the spirit of Swarajya breathes. The ropeway, installed in 1996, makes the once-arduous climb accessible to all. Every year, lakhs of visitors ascend to pay respects at the Shivaji Samadhi, walk the corridors of the royal palace ruins, and stand at Takmak Tok to gaze at the same view that inspired an empire. The Archaeological Survey of India maintains the site, and ongoing restoration work continues to reveal new insights. On Shivaji Jayanti, the fort comes alive with processions, Powada performances, and the thunderous 'Jai Bhavani! Jai Shivaji!' that echoes across the Sahyadris.",
            significance:
              "Preserves the physical and spiritual memory of Maharashtra's most defining period for future generations."
          },
          mr: {
            title: "जिवंत स्मारक",
            preview:
              "आज रायगड हा केवळ उद्ध्वस्त अवशेष नसून स्वराज्याचा आत्मा श्वास घेत असलेले तीर्थस्थान आहे...",
            fullStory:
              "आज रायगड हा केवळ उद्ध्वस्त अवशेष नसून स्वराज्याचा आत्मा श्वास घेत असलेले तीर्थस्थान आहे. १९९६ मध्ये बसवलेला दोरीमार्ग एकेकाळी कठीण असलेली चढाई सर्वांसाठी सुलभ करतो. दरवर्षी लाखो अभ्यागत शिवाजी समाधीला वंदन करण्यासाठी, राजवाड्याच्या अवशेषांच्या दालनांमधून फिरण्यासाठी आणि टकमक टोकावर उभे राहून त्याच दृश्याकडे पाहण्यासाठी चढतात ज्या दृश्याने एका साम्राज्याला प्रेरणा दिली. भारतीय पुरातत्त्व सर्वेक्षण विभाग या स्थळाची देखभाल करतो आणि चालू असलेले जीर्णोद्धाराचे काम नवीन माहिती उघडकीस आणत आहे. शिवजयंतीला किल्ला मिरवणुकी, पोवाडा सादरीकरण आणि सह्याद्रीत घुमणाऱ्या 'जय भवानी! जय शिवाजी!' या गर्जनेने जिवंत होतो.",
            significance:
              "हा किल्ला महाराष्ट्राच्या सर्वात निर्णायक कालखंडाची भौतिक आणि आध्यात्मिक स्मृती पुढील पिढ्यांसाठी जतन करतो."
          }
        },
        audio: {
          en: "/audio/en/raigad-living-monument.mp3",
          mr: "/audio/mr/raigad-living-monument.mp3"
        }
      }
    ],

    // 360° Experience with Enhanced Descriptions
    vrExperience: {
      title: "Step Inside Raigad: 360° Immersive Journey",
      description: "Stand where Shivaji was crowned Chhatrapati. Our interactive tour lets you explore every corner — from the royal palace ruins to the breathtaking Takmak Tok cliff.",
      highlight: "🎧 Audio-guided experience available"
    },
    images360: [
      {
        src: raigadGateImg,
        label: "Main Gate",
        subtitle: "Maha Darwaja – The Grand Entrance",
        audioGuide: "Listen to the history of this imposing gateway"
      },
      {
        src: raigadPalaceImg,
        label: "Royal Palace",
        subtitle: "Raj Bhavan – Seat of the Empire",
        audioGuide: "Hear stories of the coronation and royal court"
      },
      {
        src: raigadPanoramicImg,
        label: "Panoramic Views",
        subtitle: "Sahyadri ranges and Konkan coast",
        audioGuide: "Learn about the strategic vantage point of Raigad"
      }
    ],

    // Enhanced Cuisine with Cultural Context
    cuisine: [
      {
        name: "Ukadiche Modak",
        image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=1000&auto=format&fit=crop",
        description: "Steamed rice flour dumplings filled with coconut and jaggery. A sacred sweet offered to Lord Ganesha and deeply rooted in Konkan tradition. The Raigad region is known for its distinctly fragrant version.",
        culturalNote: "Traditionally prepared during Ganesh Chaturthi.",
        spiceLevel: "Sweet",
        bestTime: "Festival Season / Dessert",
        priceRange: "₹60-120",
        heritageTip: "Try the authentic hand-shaped ones from local homes"
      },
      {
        name: "Kombdi Vade",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1000&auto=format&fit=crop",
        description: "Spicy chicken curry served with deep-fried puris (vade). The quintessential Konkan non-veg feast, known for its fiery red coconut-based gravy and the crunch of the vade.",
        culturalNote: "The traditional celebratory meal of the Konkan coast.",
        spiceLevel: "High",
        bestTime: "Lunch",
        priceRange: "₹150-250",
        heritageTip: "Best enjoyed at local Konkani restaurants near the base"
      },
      {
        name: "Solkadhi",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop",
        description: "A cooling digestive drink made from kokum fruit and coconut milk. The pink-purple elixir of the Konkan coast, essential after a spicy meal or a long trek.",
        culturalNote: "A staple digestive in every Konkani household.",
        spiceLevel: "Mild",
        bestTime: "Post-Meal / Post-Trek",
        priceRange: "₹30-60",
        heritageTip: "Ask for the garlic-infused version for extra kick"
      },
      {
        name: "Puran Poli",
        image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop",
        description: "Sweet flatbread stuffed with chana dal and jaggery filling (puran), served with a dollop of ghee. A beloved festive dish that represents Maharashtrian hospitality at its finest.",
        culturalNote: "Must-have during Gudi Padwa and other Marathi festivals.",
        spiceLevel: "Sweet",
        bestTime: "Breakfast / Festival",
        priceRange: "₹40-80",
        heritageTip: "Pair with aamti (lentil soup) for the traditional combo"
      }
    ],

    // Enhanced Shopping Areas
    shopping: [
      {
        name: "Raigad Ropeway Bazaar",
        description: "A bustling market near the ropeway base offering souvenirs, Shivaji memorabilia, miniature fort models, and local handicrafts. The go-to stop before or after your fort visit.",
        highlights: ["Fort Miniatures", "Shivaji Memorabilia", "Konkan Spices"],
        timing: "8:00 AM - 6:00 PM",
        bestFor: "Souvenirs and quick shopping",
        bargainingTip: "Fixed prices on packaged items, bargain on handicrafts",
        mustBuy: "Miniature Raigad Fort model"
      },
      {
        name: "Mahad Market",
        description: "The main town market of Mahad, the nearest city to Raigad. Known for fresh Konkani spices, raw cashews, and handcrafted brass items. A taste of authentic small-town Maharashtra.",
        highlights: ["Cashew Nuts", "Kokum Products", "Brass Items"],
        timing: "9:00 AM - 8:00 PM",
        bestFor: "Authentic Konkan products",
        bargainingTip: "Compare prices at 2-3 shops before buying",
        mustBuy: "Raw Konkan cashews and kokum syrup"
      },
      {
        name: "Pachad Village Crafts",
        description: "The small village of Pachad at the base of Raigad has artisans who create traditional copper and brass artifacts, Warli-style paintings, and woven crafts unique to the region.",
        highlights: ["Copper Artifacts", "Warli Art", "Woven Baskets"],
        timing: "10:00 AM - 5:00 PM",
        bestFor: "Supporting local artisans",
        bargainingTip: "Prices are fair — supports village economy",
        mustBuy: "Handcrafted copper vessel"
      },
      {
        name: "Konkan Farm Outlets",
        description: "The Raigad district is renowned for its Alphonso mangoes, cashew feni, and raw honey. Farm outlets along the road sell these directly from producers.",
        highlights: ["Alphonso Mangoes", "Cashew Feni", "Wild Honey"],
        timing: "Seasonal (March-June for mangoes)",
        bestFor: "Foodies and fresh produce lovers",
        bargainingTip: "Buy in season for best prices",
        mustBuy: "Ratnagiri Alphonso mangoes (in season)"
      }
    ],

    // Enhanced Cultural Experiences
    experiences: [
      {
        name: "Shivaji Samadhi Darshan",
        duration: "30-45 mins",
        description: "Pay respects at the sacred samadhi (memorial tomb) of Chhatrapati Shivaji Maharaj. The most emotionally powerful experience at Raigad — a moment of deep reverence and connection with Maratha history.",
        includes: ["Guided narration", "Historical context"],
        bestFor: "Everyone — the must-do experience",
        price: "Included in entry",
        groupSize: "Any",
        timeSlot: "Daytime",
        specialNote: "Maintain silence and respect at the samadhi"
      },
      {
        name: "Takmak Tok Visit",
        duration: "20-30 mins",
        description: "Stand at the edge of the 1,400-foot sheer cliff from which traitors were thrown. While grim in history, the views are the most breathtaking on the entire fort — the Konkan coast stretches endlessly below.",
        includes: ["Panoramic views", "Historical narration"],
        bestFor: "Photography and history enthusiasts",
        price: "Included in entry",
        groupSize: "Any",
        timeSlot: "Daytime (best at sunset)",
        specialNote: "Stay behind railings. Vertigo warning."
      },
      {
        name: "Coronation Anniversary Celebrations",
        duration: "Full Day",
        description: "On June 6 each year, Raigad Fort hosts grand celebrations commemorating the coronation of Chhatrapati Shivaji Maharaj. Thousands gather for Powada performances, traditional music, processions, and cultural programs.",
        includes: ["Processions", "Cultural Programs", "Traditional Music"],
        bestFor: "Anyone visiting on June 6",
        price: "Free",
        groupSize: "Large Crowds",
        timeSlot: "June 6 annually",
        specialNote: "Extremely crowded — plan accommodation in advance"
      },
      {
        name: "Ropeway Scenic Experience",
        duration: "15-20 mins (one way)",
        description: "The aerial ropeway offers a stunning ascent with panoramic views of the Sahyadri valleys, waterfalls (in monsoon), and the fort's imposing cliff face. A modern marvel accessing an ancient wonder.",
        includes: ["Ropeway ride", "Valley views"],
        bestFor: "Families and elderly visitors",
        price: "₹100-200 per person",
        groupSize: "6 per cabin",
        timeSlot: "8:30 AM - 5:30 PM",
        specialNote: "Can be closed during high winds or monsoon — check in advance"
      }
    ],

    // Enhanced Itinerary Data
    itineraries: {
      "2h": [
        {
          time: "00:00 - 00:20",
          activity: "Ropeway Ascent",
          description: "Arrive and take the ropeway up to the fort plateau.",
          tip: "Book tickets in advance during peak season",
          duration: "20 min"
        },
        {
          time: "00:20 - 00:50",
          activity: "Maha Darwaja & Nagarkhana",
          description: "Walk through the grand main gate and see the royal drum house.",
          tip: "Note the anti-elephant spikes on the gate",
          duration: "30 min"
        },
        {
          time: "00:50 - 01:20",
          activity: "Raj Bhavan & Shivaji Samadhi",
          description: "Visit the royal palace ruins and pay respects at the Shivaji Samadhi.",
          tip: "Silence observed at the samadhi",
          duration: "30 min"
        },
        {
          time: "01:20 - 02:00",
          activity: "Ropeway Descent",
          description: "Return to base via ropeway.",
          tip: "Check last ropeway timing",
          duration: "40 min"
        }
      ],
      "4h": [
        {
          time: "00:00 - 00:20",
          activity: "Ropeway Ascent",
          description: "Ascend by ropeway with views of the Sahyadri valleys.",
          tip: "Best views on the right side",
          duration: "20 min"
        },
        {
          time: "00:20 - 01:00",
          activity: "Gates & Nagarkhana",
          description: "Detailed walk through Maha Darwaja, observe fortification architecture and the Nagarkhana (Drum House).",
          tip: "Read the info boards at each gate",
          duration: "40 min"
        },
        {
          time: "01:00 - 01:45",
          activity: "Raj Bhavan & Coronation Site",
          description: "Explore the royal palace complex, audience hall ruins, and the coronation memorial.",
          tip: "Hire a guide for detailed history",
          duration: "45 min"
        },
        {
          time: "01:45 - 02:15",
          activity: "Jagdishwar Temple & Samadhi",
          description: "Visit the ancient Shiva temple and the Shivaji Samadhi.",
          tip: "Carry water for the walk",
          duration: "30 min"
        },
        {
          time: "02:15 - 03:00",
          activity: "Takmak Tok & Hatti Lake",
          description: "Walk to the execution cliff for panoramic views and see the royal elephant tank.",
          tip: "Best photography spot on the fort",
          duration: "45 min"
        },
        {
          time: "03:00 - 04:00",
          activity: "Market Ruins & Descent",
          description: "Walk through the ancient marketplace ruins and take the ropeway down.",
          tip: "Imagine 200 shops here in 1674",
          duration: "1 hour"
        }
      ],
      halfDay: [
        {
          time: "08:00 - 08:30",
          activity: "Ropeway Ascent",
          description: "Early morning ropeway ride to beat the crowds.",
          tip: "Arrive 30 min before ropeway opens",
          duration: "30 min"
        },
        {
          time: "08:30 - 10:00",
          activity: "Full Fort Circuit",
          description: "Complete guided walk: Maha Darwaja → Nagarkhana → Raj Bhavan → Jagdishwar Temple → Shivaji Samadhi.",
          tip: "Hire a local guide at the top",
          duration: "1.5 hours"
        },
        {
          time: "10:00 - 11:00",
          activity: "Takmak Tok & Hatti Lake",
          description: "Walk to the cliff viewpoint and explore the royal water reservoir.",
          tip: "Carry water and snacks",
          duration: "1 hour"
        },
        {
          time: "11:00 - 11:30",
          activity: "Peth Ruins & Hirakani Buruj",
          description: "Explore the marketplace ruins and the watch tower named after the legendary Hirakani.",
          tip: "Steep walk to the tower — good fitness needed",
          duration: "30 min"
        },
        {
          time: "11:30 - 12:00",
          activity: "Ropeway Descent",
          description: "Descend by ropeway and head for lunch.",
          tip: "Check last ropeway time",
          duration: "30 min"
        },
        {
          time: "12:00 - 13:00",
          activity: "Lunch at Pachad",
          description: "Enjoy Konkani thali at a local restaurant in Pachad village.",
          tip: "Try Kombdi Vade if available",
          duration: "1 hour"
        }
      ],
      oneDay: [
        {
          time: "07:00 - 08:00",
          activity: "Trek from Pachad",
          description: "For the adventurous — trek the historic route from Pachad village to the fort top (approx 1,500 steps).",
          tip: "Carry 2 litres of water minimum",
          duration: "1 hour"
        },
        {
          time: "08:00 - 10:00",
          activity: "Comprehensive Fort Tour",
          description: "Full guided walk covering all major landmarks with detailed historical narration.",
          tip: "Start from Maha Darwaja, end at Hirakani Buruj",
          duration: "2 hours"
        },
        {
          time: "10:00 - 10:30",
          activity: "Rest & Refreshment",
          description: "Break at the designated rest area near the marketplace.",
          tip: "Limited food options on top — carry snacks",
          duration: "30 min"
        },
        {
          time: "10:30 - 12:00",
          activity: "Takmak Tok & Hidden Spots",
          description: "Explore the cliff viewpoint, hidden water tanks, and lesser-known bastions.",
          tip: "Ask guide about Hirakani's legendary story",
          duration: "1.5 hours"
        },
        {
          time: "12:00 - 13:00",
          activity: "Lunch at Fort",
          description: "Packed lunch at the panoramic viewpoint.",
          tip: "Carry eco-friendly containers",
          duration: "1 hour"
        },
        {
          time: "13:00 - 14:00",
          activity: "Ropeway Descent",
          description: "Descend by ropeway (or trek down if you have the energy).",
          tip: "Ropeway queues build up after 2 PM",
          duration: "1 hour"
        },
        {
          time: "14:00 - 15:30",
          activity: "Pachad Village & Lunch",
          description: "Authentic Konkani meal and browse local craft shops.",
          tip: "Try Solkadhi after the meal",
          duration: "1.5 hours"
        },
        {
          time: "15:30 - 17:00",
          activity: "Nearby Attractions",
          description: "Visit Mahad's Dr. Ambedkar memorial (Chavdar Tale) or drive to the Konkan coast.",
          tip: "Sunset at the coast is spectacular",
          duration: "1.5 hours"
        }
      ]
    },

    // Fort Statistics & Quick Facts
    quickFacts: {
      elevation: "820 meters (2,700 ft)",
      builtBy: "Shilahar dynasty, reconstructed by Chhatrapati Shivaji Maharaj",
      captureByShivaji: "1656 AD (captured from Chandrarao More)",
      architectureStyle: "Hill Fort with Maratha royal architecture",
      bestTimeToVisit: "October to March (avoid monsoon — ropeway closes)",
      entryFee: "Indians: ₹25, Foreigners: ₹200",
      openHours: "Ropeway: 8:30 AM to 5:30 PM",
      walkingDistance: "~3 km circuit on fort top",
      waterSources: "Multiple cisterns including Hatti Lake",
      uniqueFeature: "Site of the coronation of Chhatrapati Shivaji Maharaj (1674)"
    },

    // Travel Tips
    travelTips: [
      "Check ropeway status before visiting — it closes during high winds and heavy rain",
      "Carry at least 2 litres of water — limited availability on the fort",
      "Wear sturdy shoes for the uneven terrain on top",
      "Hire a local guide at the ropeway base for ₹300-500 for the best experience",
      "Visit early morning to avoid crowds and afternoon heat",
      "Carry cash — no ATMs or card payment on the fort",
      "Monsoon visits offer lush greenery but ropeway may be closed — trek route stays open",
      "Plan 4-5 hours for a thorough exploration of the entire fort"
    ],

    // Nearby Attractions
    nearbyAttractions: [
      {
        name: "Lingana Fort",
        distance: "8 km (trek)",
        description: "A challenging pinnacle fort visible from Raigad, offering thrilling rock climbing",
        type: "Adventure/Historical"
      },
      {
        name: "Mahad - Chavdar Tale",
        distance: "25 km",
        description: "Historic site where Dr. B.R. Ambedkar led the Mahad Satyagraha for water equality",
        type: "Historical/Social"
      },
      {
        name: "Kashid Beach",
        distance: "60 km",
        description: "Beautiful white-sand beach on the Konkan coast, perfect for a post-fort beach day",
        type: "Beach/Leisure"
      },
      {
        name: "Murud-Janjira Fort",
        distance: "55 km",
        description: "The unconquered sea fort — the only fort that the Marathas could never capture",
        type: "Historical/Naval"
      }
    ],

    // Special Events
    specialEvents: [
      {
        name: "Shivaji Coronation Day",
        date: "June 6",
        description: "Grand celebrations marking the anniversary of Chhatrapati Shivaji Maharaj's coronation in 1674",
        highlight: "Traditional processions, Powada performances, and cultural programs"
      },
      {
        name: "Shivaji Punyatithi",
        date: "April 3",
        description: "Solemn remembrance of Chhatrapati Shivaji Maharaj's passing, with prayers and tributes at the samadhi",
        highlight: "Lakhs of devotees gather for darshan at the samadhi"
      }
    ]
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
        year: "14th Century",
        era: "Ancient Origins of Kondhana",
        isMajor: false,
        preview: "Originally known as Kondhana, the fort was ruled by Koli kings...",
        fullStory: "Sinhagad was originally known as Kondhana, named after the sage Kaundinya. Built nearly two thousand years ago, it served as a strategic outpost. In the 14th century, it was ruled by the Koli king Nag Naik, who fiercely defended it for eight months against the powerful forces of Muhammad bin Tughlaq before eventually being captured.",
        significance: "Established Kondhana as a near-impregnable fortress in the Sahyadris.",
        text: {
          en: {
            title: "Ancient Origins of Kondhana",
            preview: "Originally known as Kondhana, the fort was ruled by Koli kings...",
            fullStory: "Sinhagad was originally known as Kondhana, named after the sage Kaundinya. Built nearly two thousand years ago, it served as a strategic outpost. In the 14th century, it was ruled by the Koli king Nag Naik, who fiercely defended it for eight months against the powerful forces of Muhammad bin Tughlaq before eventually being captured.",
            significance: "Established Kondhana as a near-impregnable fortress in the Sahyadris."
          },
          mr: {
            title: "कोंढाण्याची प्राचीन उत्पत्ती",
            preview: "मूळतः कोंढाणा म्हणून ओळखल्या जाणाऱ्या या किल्ल्यावर कोळी राजांची सत्ता होती...",
            fullStory: "सिंहगड मूळतः कोंढाणा म्हणून ओळखला जात असे, हे नाव कौंडिन्य ऋषींवरून पडले. जवळजवळ दोन हजार वर्षांपूर्वी बांधलेला हा किल्ला एक धोरणात्मक लष्करी तळ होता. १४ व्या शतकात, येथे कोळी राजा नाग नाईक याची सत्ता होती. त्याने मुहम्मद बिन तुघलकच्या शक्तिशाली सैन्याविरुद्ध आठ महिने प्राणपणाने किल्ला लढवला होता.",
            significance: "सह्याद्रीतील एक अजिंक्य किल्ला म्हणून कोंढाण्याची ओळख प्रस्थापित झाली."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1647",
        era: "Early Maratha Conquest",
        isMajor: false,
        preview: "A young Shivaji Maharaj strategically captures his first major fort...",
        fullStory: "At the young age of 17, Shivaji Maharaj recognized the strategic importance of Kondhana for his dream of Swarajya (self-rule). Through clever diplomacy and bribing the Adilshahi commander, Siddhi Amber, he took control of the fort without shedding a single drop of blood.",
        significance: "Marked one of the earliest and most crucial victories in the establishment of the Maratha Empire.",
        text: {
          en: {
            title: "Early Maratha Conquest",
            preview: "A young Shivaji Maharaj strategically captures his first major fort...",
            fullStory: "At the young age of 17, Shivaji Maharaj recognized the strategic importance of Kondhana for his dream of Swarajya (self-rule). Through clever diplomacy and bribing the Adilshahi commander, Siddhi Amber, he took control of the fort without shedding a single drop of blood.",
            significance: "Marked one of the earliest and most crucial victories in the establishment of the Maratha Empire."
          },
          mr: {
            title: "मराठ्यांचा सुरुवातीचा विजय",
            preview: "तरुण शिवाजी महाराजांनी अत्यंत हुशारीने त्यांचा पहिला प्रमुख किल्ला जिंकला...",
            fullStory: "अवघ्या १७ व्या वर्षी, शिवाजी महाराजांनी स्वराज्याच्या स्वप्नासाठी कोंढाण्याचे धोरणात्मक महत्त्व ओळखले. अत्यंत हुशारीने आणि आदिलशाही किल्लेदार सिद्दी अंबरला लाच देऊन, त्यांनी रक्ताचा एकही थेंब न सांडता किल्ल्यावर नियंत्रण मिळवले.",
            significance: "मराठा साम्राज्याच्या स्थापनेतील हा एक सर्वात पहिला आणि महत्त्वाचा विजय होता."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1665",
        era: "Treaty of Purandar",
        isMajor: false,
        preview: "Shivaji Maharaj is forced to hand over Kondhana to the Mughals...",
        fullStory: "Following the heavy siege of Purandar by the massive Mughal army led by Mirza Raja Jai Singh, Shivaji Maharaj was forced into a peace treaty. As part of the devastating Treaty of Purandar, he had to surrender 23 of his prized forts, including his beloved Kondhana, to the Mughal Empire.",
        significance: "A painful setback that fueled the Marathas' determination to reclaim their lands.",
        text: {
          en: {
            title: "Treaty of Purandar",
            preview: "Shivaji Maharaj is forced to hand over Kondhana to the Mughals...",
            fullStory: "Following the heavy siege of Purandar by the massive Mughal army led by Mirza Raja Jai Singh, Shivaji Maharaj was forced into a peace treaty. As part of the devastating Treaty of Purandar, he had to surrender 23 of his prized forts, including his beloved Kondhana, to the Mughal Empire.",
            significance: "A painful setback that fueled the Marathas' determination to reclaim their lands."
          },
          mr: {
            title: "पुरंदरचा तह",
            preview: "शिवाजी महाराजांना कोंढाणा मुघलांच्या स्वाधीन करणे भाग पडले...",
            fullStory: "मिर्झा राजा जयसिंगच्या नेतृत्वाखालील विशाल मुघल सैन्याने पुरंदरला वेढा घातल्यानंतर, शिवाजी महाराजांना शांतता तह करणे भाग पडले. पुरंदरच्या या अत्यंत त्रासदायक तहानुसार, त्यांना त्यांचा लाडका कोंढाणा आणि इतर २२ किल्ले मुघल साम्राज्याला द्यावे लागले.",
            significance: "ही एक वेदनादायी माघार होती, जिने मराठ्यांच्या मनात आपली भूमी परत मिळवण्याची जिद्द निर्माण केली."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1670",
        era: "Tanaji's Sacrifice",
        isMajor: true,
        preview:
          "Tanaji Malusare led a daring night assault to recapture Sinhagad...",
        fullStory:
          "In 1670, Tanaji Malusare and his men scaled the fort's sheer cliff at night using a monitor lizard. The battle cost Tanaji his life, but secured the fort for Shivaji. Upon hearing the news, Shivaji Maharaj famously mourned, 'Gad aala, pan Sinha gela' (The fort is won, but the lion is lost). The fort was renamed Sinhagad (Lion's Fort) in his honor.",
        significance:
          "One of the most celebrated episodes in Maratha history, demonstrating ultimate loyalty.",
        text: {
          en: {
            title: "Tanaji's Sacrifice",
            preview:
              "Tanaji Malusare led a daring night assault to recapture Sinhagad...",
            fullStory:
              "In 1670, Tanaji Malusare and his men scaled the fort's sheer cliff at night using a monitor lizard. The battle cost Tanaji his life, but secured the fort for Shivaji. Upon hearing the news, Shivaji Maharaj famously mourned, 'Gad aala, pan Sinha gela' (The fort is won, but the lion is lost). The fort was renamed Sinhagad (Lion's Fort) in his honor.",
            significance:
              "One of the most celebrated episodes in Maratha history, demonstrating ultimate loyalty."
          },
          mr: {
            title: "तानाजींचे बलिदान",
            preview:
              "तानाजी मालुसरेंनी सिंहगड परत जिंकण्यासाठी धाडसी रात्रीचा हल्ला केला...",
            fullStory:
              "१६७० मध्ये तानाजी मालुसरे आणि त्यांच्या मावळ्यांनी घोरपडीच्या साहाय्याने रात्रीच्या अंधारात सिंहगडाच्या कड्यावर चढाई केली. या लढाईत तानाजींना प्राण गमवावे लागले, पण किल्ला शिवाजी महाराजांच्या ताब्यात आला. ही बातमी ऐकल्यावर शिवाजी महाराज दुःखाने उद्गारले, 'गड आला, पण सिंह गेला'. तानाजींच्या स्मरणार्थ कोंढाण्याचे नाव 'सिंहगड' ठेवण्यात आले.",
            significance:
              "मराठा इतिहासातील अत्यंत निष्ठा आणि शौर्याचे प्रतीक असलेला हा सर्वात गौरवशाली प्रसंग आहे."
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
      { src: sinhagadKalyanDarwajaImg, label: "Main Gate", subtitle: "Kalyan Darwaza" },
      { src: sinhagadViewImg, label: "Panoramic Views", subtitle: "Khadakwasla Dam & Sahyadri ranges" }
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
        year: "1661",
        era: "The Divine Sword",
        isMajor: false,
        preview: "Shivaji Maharaj establishes the magnificent Bhavani Mata Temple...",
        fullStory: "To express his deep gratitude after the miraculous victory against Afzal Khan, Shivaji Maharaj commissioned the construction of the Bhavani Mata Temple on the fort. The beautiful idol of the Goddess was specially brought from the Gandaki river in Nepal. Legend says that the Goddess blessed him here with the legendary 'Bhavani Talwar' (sword).",
        significance: "Established Pratapgad not just as a military stronghold, but as a deeply spiritual site for the Maratha Empire.",
        text: {
          en: {
            title: "The Divine Sword",
            preview: "Shivaji Maharaj establishes the magnificent Bhavani Mata Temple...",
            fullStory: "To express his deep gratitude after the miraculous victory against Afzal Khan, Shivaji Maharaj commissioned the construction of the Bhavani Mata Temple on the fort. The beautiful idol of the Goddess was specially brought from the Gandaki river in Nepal. Legend says that the Goddess blessed him here with the legendary 'Bhavani Talwar' (sword).",
            significance: "Established Pratapgad not just as a military stronghold, but as a deeply spiritual site for the Maratha Empire."
          },
          mr: {
            title: "भवानी मातेचा आशीर्वाद",
            preview: "शिवाजी महाराजांनी गडावर भवानी मातेच्या भव्य मंदिराची स्थापना केली...",
            fullStory: "अफजलखानावरील ऐतिहासिक विजयानंतर कृतज्ञता व्यक्त करण्यासाठी, शिवाजी महाराजांनी गडावर भवानी मातेचे मंदिर बांधले. देवीची सुंदर मूर्ती नेपाळमधील गंडकी नदीतून खास आणवली होती. आख्यायिकेनुसार, याच ठिकाणी देवीने महाराजांना सुप्रसिद्ध 'भवानी तलवार' दिली होती.",
            significance: "यामुळे प्रतापगड केवळ एक लष्करी तळ न राहता मराठा साम्राज्यासाठी एक अत्यंत पवित्र धार्मिक स्थळ बनला."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1818",
        era: "The Fall of the Empire",
        isMajor: false,
        preview: "Pratapgad finally falls into the hands of the British East India Company...",
        fullStory: "During the Third Anglo-Maratha War, which led to the collapse of the Maratha Empire, Pratapgad had to be surrendered. It was handed over to the British forces without any significant resistance, marking the end of its era as an active military stronghold.",
        significance: "Marked the transition of the fort from a strategic defense post into a historical monument.",
        text: {
          en: {
            title: "The Fall of the Empire",
            preview: "Pratapgad finally falls into the hands of the British East India Company...",
            fullStory: "During the Third Anglo-Maratha War, which led to the collapse of the Maratha Empire, Pratapgad had to be surrendered. It was handed over to the British forces without any significant resistance, marking the end of its era as an active military stronghold.",
            significance: "Marked the transition of the fort from a strategic defense post into a historical monument."
          },
          mr: {
            title: "साम्राज्याचा अस्त",
            preview: "प्रतापगड अखेर ब्रिटिश ईस्ट इंडिया कंपनीच्या ताब्यात गेला...",
            fullStory: "तिसऱ्या इंग्रज-मराठा युद्धात, ज्यामुळे मराठा साम्राज्याचा अंत झाला, प्रतापगड ब्रिटिशांच्या स्वाधीन करावा लागला. कोणताही मोठा प्रतिकार न होता हा किल्ला ब्रिटिशांना देण्यात आला, ज्यामुळे लष्करी तळ म्हणून त्याच्या अस्तित्वाची सांगता झाली.",
            significance: "या घटनेमुळे किल्ल्याचे एका धोरणात्मक तळावरून ऐतिहासिक स्मारकात रूपांतर झाले."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1957",
        era: "A National Tribute",
        isMajor: false,
        preview: "Prime Minister Jawaharlal Nehru unveils the majestic equestrian statue...",
        fullStory: "To honor the unparalleled legacy of Chhatrapati Shivaji Maharaj, a massive 17-foot bronze equestrian statue was installed at the top of Pratapgad. It was unveiled in 1957 by India's first Prime Minister, Pandit Jawaharlal Nehru, drawing massive crowds from across Maharashtra.",
        significance: "Solidified the fort's status as a prominent national monument and tourist destination.",
        text: {
          en: {
            title: "A National Tribute",
            preview: "Prime Minister Jawaharlal Nehru unveils the majestic equestrian statue...",
            fullStory: "To honor the unparalleled legacy of Chhatrapati Shivaji Maharaj, a massive 17-foot bronze equestrian statue was installed at the top of Pratapgad. It was unveiled in 1957 by India's first Prime Minister, Pandit Jawaharlal Nehru, drawing massive crowds from across Maharashtra.",
            significance: "Solidified the fort's status as a prominent national monument and tourist destination."
          },
          mr: {
            title: "राष्ट्रीय अभिवादन",
            preview: "पंतप्रधान जवाहरलाल नेहरूंच्या हस्ते शिवरायांच्या भव्य अश्वारूढ पुतळ्याचे अनावरण...",
            fullStory: "छत्रपती शिवाजी महाराजांच्या अतुलनीय वारशाचा सन्मान करण्यासाठी, प्रतापगडाच्या माथ्यावर १७ फूट उंचीचा भव्य कांस्य अश्वारूढ पुतळा बसवण्यात आला. १९५७ मध्ये भारताचे पहिले पंतप्रधान पंडित जवाहरलाल नेहरू यांच्या हस्ते त्याचे अनावरण झाले, ज्यासाठी संपूर्ण महाराष्ट्रातून अफाट जनसागर लोटला होता.",
            significance: "यामुळे प्रतापगडाचे एक प्रमुख राष्ट्रीय स्मारक आणि पर्यटन स्थळ म्हणून असलेले महत्त्व अधिक दृढ झाले."
          }
        },
        audio: { en: "", mr: "" }
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
      { src: pratapgadViewImg, label: "Misty Sahyadris", subtitle: "Jawali Forest Views" },
      { src: pratapgadTempleImg, label: "Maha Darwaza", subtitle: "The massive fort entrance" }
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
          "Long before the Maratha Empire came into existence, Lohagad served as a silent guardian overlooking the Bor Ghat. This crucial pass was the primary artery of trade and commerce connecting the prosperous seaports of the Konkan coast to the thriving cities of the Deccan plateau. The fort changed hands between several powerful dynasties, including the Satavahanas, Chalukyas, Rashtrakutas, and Yadavas, each recognizing its supreme strategic value and reinforcing its iron-clad walls to protect their economic interests.",
        significance:
          "Strategic control of trade and movement.",
        text: {
          en: {
            title: "Guardian of the Pass",
            preview:
              "Lohagad guarded the Bor Ghat trade route...",
            fullStory:
              "Long before the Maratha Empire came into existence, Lohagad served as a silent guardian overlooking the Bor Ghat. This crucial pass was the primary artery of trade and commerce connecting the prosperous seaports of the Konkan coast to the thriving cities of the Deccan plateau. The fort changed hands between several powerful dynasties, including the Satavahanas, Chalukyas, Rashtrakutas, and Yadavas, each recognizing its supreme strategic value and reinforcing its iron-clad walls to protect their economic interests.",
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
        year: "1648",
        era: "Shivaji's Early Conquest",
        isMajor: true,
        preview: "Shivaji Maharaj captures Lohagad early in his quest for Swarajya...",
        fullStory: "Recognizing the strategic importance of the fort and its command over the trade routes to Kalyan, a young Shivaji Maharaj captured Lohagad in 1648. This bold move significantly boosted the economic and military strength of the nascent Maratha Empire. By controlling Lohagad, Shivaji Maharaj could effectively tax the trade passing through the Bor Ghat, providing the necessary funds to expand Swarajya and build an invincible army.",
        significance: "Secured a vital economic artery for Swarajya.",
        text: {
          en: {
            title: "Shivaji's Early Conquest",
            preview: "Shivaji Maharaj captures Lohagad early in his quest for Swarajya...",
            fullStory: "Recognizing the strategic importance of the fort and its command over the trade routes to Kalyan, a young Shivaji Maharaj captured Lohagad in 1648. This bold move significantly boosted the economic and military strength of the nascent Maratha Empire. By controlling Lohagad, Shivaji Maharaj could effectively tax the trade passing through the Bor Ghat, providing the necessary funds to expand Swarajya and build an invincible army.",
            significance: "Secured a vital economic artery for Swarajya."
          },
          mr: {
            title: "शिवरायांचा प्रारंभिक विजय",
            preview: "स्वराज्याच्या स्थापनेच्या सुरुवातीच्या काळात शिवरायांनी लोहगड जिंकला...",
            fullStory: "कल्याणकडे जाणाऱ्या व्यापारी मार्गांवरील गडाचे धोरणात्मक महत्त्व ओळखून, तरुण शिवाजी महाराजांनी १६४८ मध्ये लोहगड ताब्यात घेतला. या धाडसी पावलामुळे नवोदित मराठा साम्राज्याच्या आर्थिक आणि लष्करी सामर्थ्यात लक्षणीय वाढ झाली.",
            significance: "स्वराज्यासाठी एक अत्यंत महत्त्वाची आर्थिक नाडी सुरक्षित केली."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1664",
        era: "The Surat Loot Storage",
        isMajor: false,
        preview: "The immense wealth from the first sack of Surat is brought here...",
        fullStory: "After the audacious raid on the wealthy Mughal port of Surat, Shivaji Maharaj chose Lohagad as the secure repository for the vast treasure. Brought under the heavy guard of Netaji Palkar, this wealth was crucial for funding the fortification of other Maratha strongholds. The sheer scale of the treasure required a fortress that was virtually impregnable, and Lohagad's multiple iron gates and massive bastions made it the perfect vault to safeguard the financial future of the Maratha Empire.",
        significance: "Funded the expansion and defense of the Maratha Empire.",
        text: {
          en: {
            title: "The Surat Loot Storage",
            preview: "The immense wealth from the first sack of Surat is brought here...",
            fullStory: "After the audacious raid on the wealthy Mughal port of Surat, Shivaji Maharaj chose Lohagad as the secure repository for the vast treasure. Brought under the heavy guard of Netaji Palkar, this wealth was crucial for funding the fortification of other Maratha strongholds. The sheer scale of the treasure required a fortress that was virtually impregnable, and Lohagad's multiple iron gates and massive bastions made it the perfect vault to safeguard the financial future of the Maratha Empire.",
            significance: "Funded the expansion and defense of the Maratha Empire."
          },
          mr: {
            title: "सुरत लुटीचा खजिना",
            preview: "सुरतेवरील पहिल्या छाप्यातून मिळालेली अफाट संपत्ती येथे आणली गेली...",
            fullStory: "मुघलांच्या श्रीमंत सुरत बंदरावरील धाडसी हल्ल्यानंतर, शिवाजी महाराजांनी त्या प्रचंड खजिन्यासाठी लोहगडाची सुरक्षित जागा म्हणून निवड केली. नेताजी पालकरांच्या कडेकोट बंदोबस्तात आणलेली ही संपत्ती इतर मराठा किल्ल्यांच्या तटबंदीसाठी अत्यंत महत्त्वाची ठरली.",
            significance: "यामुळे मराठा साम्राज्याच्या विस्ताराला आणि संरक्षणाला मोठा आर्थिक आधार मिळाला."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1670s",
        era: "Under Shivaji",
        isMajor: true,
        preview:
          "Shivaji strengthened Lohagad and used it as a treasury...",
        fullStory:
          "After losing it briefly to the Mughals in the Treaty of Purandar (1665), Shivaji Maharaj recaptured Lohagad in 1670. Realizing its importance, he ordered massive renovations. The fort's famous Vinchu Kata (scorpion tail) was further fortified in this period to provide advanced defensive capabilities, allowing soldiers to spot enemies approaching from miles away and rain down fire upon them before they could even reach the base.",
        significance:
          "Part of the invincible Maratha defensive network.",
        text: {
          en: {
            title: "Under Shivaji",
            preview:
              "Shivaji strengthened Lohagad and used it as a treasury...",
            fullStory:
              "After losing it briefly to the Mughals in the Treaty of Purandar (1665), Shivaji Maharaj recaptured Lohagad in 1670. Realizing its importance, he ordered massive renovations. The fort's famous Vinchu Kata (scorpion tail) was further fortified in this period to provide advanced defensive capabilities, allowing soldiers to spot enemies approaching from miles away and rain down fire upon them before they could even reach the base.",
            significance:
              "Part of the invincible Maratha defensive network."
          },
          mr: {
            title: "शिवाजींच्या ताब्यात",
            preview:
              "शिवाजी महाराजांनी लोहगड मजबूत केला आणि तो खजिना ठेवण्याच्या ठिकाण म्हणून वापरला...",
            fullStory:
              "पुरंदरच्या तहात (१६६५) हा किल्ला गमावल्यानंतर शिवाजी महाराजांनी १६७० मध्ये लोहगड पुन्हा जिंकून घेतला. प्रगत संरक्षणात्मक क्षमता प्रदान करण्यासाठी याच काळात किल्ल्याचा प्रसिद्ध विंचू काटा अधिक बळकट करण्यात आला.",
            significance:
              "हा किल्ला अजिंक्य मराठा संरक्षण जाळ्याचा महत्त्वाचा भाग बनला."
          }
        },
        audio: {
          en: "/audio/en/lohagad-under-shivaji.mp3",
          mr: "/audio/mr/lohagad-under-shivaji.mp3"
        }
      },
      {
        year: "1713",
        era: "The Angre Era",
        isMajor: false,
        preview: "Lohagad is placed under the command of the legendary Kanhoji Angre...",
        fullStory: "Under the shifting powers of the Maratha Empire, the fort was handed over to Kanhoji Angre, the brilliant Chief of the Maratha Navy. Although primarily a naval commander, Angre recognized the importance of inland forts to secure supply lines and trade routes.",
        significance: "Secured the inland supply lines for the Maratha Navy.",
        text: {
          en: {
            title: "The Angre Era",
            preview: "Lohagad is placed under the command of the legendary Kanhoji Angre...",
            fullStory: "Under the shifting powers of the Maratha Empire, the fort was handed over to Kanhoji Angre, the brilliant Chief of the Maratha Navy. Although primarily a naval commander, Angre recognized the importance of inland forts to secure supply lines and trade routes.",
            significance: "Secured the inland supply lines for the Maratha Navy."
          },
          mr: {
            title: "आंग्रे पर्व",
            preview: "लोहगड सुप्रसिद्ध कान्होजी आंग्रे यांच्या नेतृत्वाखाली देण्यात आला...",
            fullStory: "मराठा साम्राज्याच्या बदलत्या सत्ता समीकरणांमध्ये हा किल्ला मराठा आरमाराचे प्रमुख कान्होजी आंग्रे यांच्याकडे सोपवण्यात आला. मुख्यत्वे नौदल कमांडर असले तरी, आंग्रे यांनी रसद मार्ग आणि व्यापारी मार्ग सुरक्षित करण्यासाठी अशा अंतर्गत किल्ल्यांचे महत्त्व ओळखले होते.",
            significance: "मराठा आरमारासाठी आवश्यक असलेले अंतर्गत रसद मार्ग सुरक्षित केले."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1803",
        era: "Under the Peshwas",
        isMajor: false,
        preview: "Nana Phadnavis uses Lohagad as a strategic retreat...",
        fullStory: "During the complex political struggles of the late Maratha Empire, the brilliant statesman Nana Phadnavis used Lohagad extensively. He resided here for a significant period, constructing a massive stepwell and several structures. Realizing the vulnerability of Pune, he moved a massive amount of the Peshwa treasury to the fort for safekeeping. Lohagad effectively became the shadow capital and the impenetrable financial vault of the Peshwas during times of extreme political instability.",
        significance: "Served as a critical political and financial center for the Peshwas.",
        text: {
          en: {
            title: "Under the Peshwas",
            preview: "Nana Phadnavis uses Lohagad as a strategic retreat...",
            fullStory: "During the complex political struggles of the late Maratha Empire, the brilliant statesman Nana Phadnavis used Lohagad extensively. He resided here for a significant period, constructing a massive stepwell and several structures. Realizing the vulnerability of Pune, he moved a massive amount of the Peshwa treasury to the fort for safekeeping. Lohagad effectively became the shadow capital and the impenetrable financial vault of the Peshwas during times of extreme political instability.",
            significance: "Served as a critical political and financial center for the Peshwas."
          },
          mr: {
            title: "पेशव्यांच्या काळात",
            preview: "नाना फडणवीस यांनी लोहगडाचा धोरणात्मक आश्रयस्थान म्हणून वापर केला...",
            fullStory: "मराठा साम्राज्याच्या उत्तरार्धातील गुंतागुंतीच्या राजकीय संघर्षांदरम्यान, थोर मुत्सद्दी नाना फडणवीस यांनी लोहगडाचा मोठ्या प्रमाणावर वापर केला. ते बराच काळ येथे राहिले आणि सुरक्षेसाठी त्यांनी पेशव्यांचा प्रचंड खजिना या किल्ल्यावर हलवला होता.",
            significance: "पेशव्यांसाठी हे एक अत्यंत महत्त्वाचे राजकीय आणि आर्थिक केंद्र बनले."
          }
        },
        audio: { en: "", mr: "" }
      },
      {
        year: "1818",
        era: "The Fall to the British",
        isMajor: false,
        preview: "Lohagad falls to the British forces under General Prother...",
        fullStory: "The Third Anglo-Maratha war brought the end of the Maratha Empire. British forces led by General Prother captured neighboring Visapur Fort. Because Visapur is situated at a higher elevation, the British simply rained down artillery fire onto Lohagad from above. Realizing the futility of resistance against this tactical disadvantage, the Marathas surrendered. Unlike many other forts, Lohagad was captured without severe direct bombardment, which is why its massive gates remain beautifully intact today.",
        significance: "Marked the end of its time as an active military fortification.",
        text: {
          en: {
            title: "The Fall to the British",
            preview: "Lohagad falls to the British forces under General Prother...",
            fullStory: "The Third Anglo-Maratha war brought the end of the Maratha Empire. British forces led by General Prother captured neighboring Visapur Fort. Because Visapur is situated at a higher elevation, the British simply rained down artillery fire onto Lohagad from above. Realizing the futility of resistance against this tactical disadvantage, the Marathas surrendered. Unlike many other forts, Lohagad was captured without severe direct bombardment, which is why its massive gates remain beautifully intact today.",
            significance: "Marked the end of its time as an active military fortification."
          },
          mr: {
            title: "ब्रिटिशांच्या ताब्यात",
            preview: "जनरल प्रोथरच्या नेतृत्वाखालील ब्रिटिश सैन्याकडून लोहगड जिंकला गेला...",
            fullStory: "तिसऱ्या इंग्रज-मराठा युद्धाने मराठा साम्राज्याचा अंत झाला. जनरल प्रोथरच्या नेतृत्वाखालील ब्रिटिश सैन्याने लोहगड ताब्यात घेतला. इतर अनेक किल्ल्यांच्या तुलनेत लोहगड मोठ्या तोफमाऱ्याविना सहजपणे जिंकला गेला, त्यामुळेच त्याचे भव्य दरवाजे आजही अगदी शाबूत आहेत.",
            significance: "या घटनेमुळे किल्ल्याचे लष्करी महत्त्व संपुष्टात आले."
          }
        },
        audio: { en: "", mr: "" }
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
      { src: lohagadViewImg, label: "Vinchu Kata", subtitle: "The Scorpion Tail" },
      { src: lohagadPathImg, label: "Maha Darwaza", subtitle: "Ancient entrance to the Iron Fort" }
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