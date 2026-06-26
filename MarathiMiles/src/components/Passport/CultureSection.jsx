import React, { useEffect } from 'react';
import './CultureSection.css';

// Import local authentic assets
import shivjayantiHero from '../../assets/culture/shivjayanti_hero.png';
import dholTashaImg from '../../assets/culture/dhol_tasha.png';
import mahaAartiImg from '../../assets/culture/maha_aarti.png';
import palnaDetailImg from '../../assets/culture/palna_detail.png';

// Raigad and Sinhagad Culture Assets
import raigadCoronationImg from '../../assets/culture/raigad/coronation.png';
import raigadPalaceImg from '../../assets/forts/raigad/2.jpg';
import sinhagadTanajiImg from '../../assets/culture/sinhagad/tanaji.png';

const CULTURE_DATA = {
    1: { // Shivneri
        title: "Shivneri Janmotsav",
        subtitle: 'Witness the majestic "Cradle Ceremony" of Chhatrapati Shivaji Maharaj at his very birthplace.',
        heroImg: shivjayantiHero,
        dateDay: "19",
        dateMonth: "FEB",
        heading: "The Spirit of Swarajya Comes Alive",
        desc1: 'Shivjayanti (the birth anniversary of Chhatrapati Shivaji Maharaj) is the most significant cultural event at Shivneri Fort. Thousands of "Shivbhakts" gather to pay homage at the birth chamber where the legendary Maratha King was born in 1630.',
        desc2: 'The atmosphere is electric with the beats of **Dhol-Tasha** and the waving of saffron **Bhagwa Zenda**. The entire fort is illuminated, and the "Shiv Jyot" (sacred flame) is carried by groups from all over Maharashtra to the fort top.',
        highlightImg1: palnaDetailImg,
        highlightTitle1: "Palna (Cradle Ceremony)",
        highlightDesc1: "The symbolic cradle ritual where the infant King is celebrated with traditional songs and a floral cradle.",
        highlightImg2: dholTashaImg,
        highlightTitle2: "Dhol Tasha Pathak",
        highlightDesc2: "Vibrant drumming troupes perform synchronized, thunderous beats that echo through the valley.",
        highlightImg3: mahaAartiImg,
        highlightTitle3: "Maha Aarti",
        highlightDesc3: "A grand collective prayer and lighting of lamps at the birthplace chamber at dawn.",
        caption1: "The Shivneri birth chamber adorned for the celebration",
        caption2: "The spiritual Maha Aarti at dawn"
    },
    2: { // Raigad
        title: "Rajyabhishek Sohala",
        subtitle: "Experience the grandeur of the Coronation Anniversary of Chhatrapati Shivaji Maharaj at his capital.",
        heroImg: raigadCoronationImg,
        dateDay: "06",
        dateMonth: "JUN",
        heading: "The Crowning of an Empire",
        desc1: "The Rajyabhishek (Coronation) ceremony marks the day in 1674 when Shivaji Maharaj was officially crowned Chhatrapati, formally establishing the independent Maratha Empire. Every June 6th, the capital fort of Raigad comes alive to recreate this historic moment.",
        desc2: "Thousands of followers gather at the royal court (Raj Sabha). Priests chant ancient Vedic mantras, while the massive Nagarkhana drums boom across the Sahyadris, celebrating the establishment of Swarajya.",
        highlightImg1: raigadPalaceImg,
        highlightTitle1: "Sinhasan Pooja",
        highlightDesc1: "Reverence paid at the exact spot where the golden throne (Sinhasan) once stood.",
        highlightImg2: dholTashaImg,
        highlightTitle2: "Mardani Khel",
        highlightDesc2: "Exhilarating displays of traditional Maratha martial arts, sword fighting, and stick combat.",
        highlightImg3: mahaAartiImg,
        highlightTitle3: "Palkhi Procession",
        highlightDesc3: "A grand palanquin carrying the royal insignia, escorted by devotees in traditional attire.",
        caption1: "The Raj Sabha filled with devotees during the ceremony",
        caption2: "Traditional Maratha martial arts on display"
    },
    3: { // Sinhagad
        title: "Legacy of Tanaji",
        subtitle: "Walk the path of bravery and honor the supreme sacrifice of Tanaji Malusare.",
        heroImg: sinhagadTanajiImg,
        dateDay: "04",
        dateMonth: "FEB",
        heading: "A Tale of Unmatched Valor",
        desc1: "The Battle of Sinhagad (Kondhana) in 1670 is one of the most legendary chapters in Maratha history. Commanded by Tanaji Malusare, a small band of Maratha soldiers scaled the fort's sheer cliffs at night using a monitor lizard (ghorpad) to recapture the stronghold.",
        desc2: "Though the fort was won, Tanaji fell in battle. Upon hearing the news, Shivaji Maharaj famously said, 'Gad aala, pan Sinha gela' (The fort is captured, but the lion is lost). Today, the fort stands as a monument to his incredible sacrifice.",
        highlightImg1: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop",
        highlightTitle1: "Tanaji Samadhi",
        highlightDesc1: "The memorial tomb where visitors pay their deep respects to the fallen commander.",
        highlightImg2: "https://images.unsplash.com/photo-1626014903706-e7e26fc54045?w=500&auto=format&fit=crop",
        highlightTitle2: "Powada Performances",
        highlightDesc2: "Traditional bards sing soul-stirring ballads (Powadas) recounting the epic night battle.",
        highlightImg3: dholTashaImg,
        highlightTitle3: "Kada Climb Tribute",
        highlightDesc3: "Trekkers and history enthusiasts trace the difficult path up the cliff face in remembrance.",
        caption1: "The majestic memorial of Tanaji Malusare",
        caption2: "Powada singers honoring the heroes of Sinhagad"
    },
    4: { // Pratapgad
        title: "The Tiger's Claws",
        subtitle: "Relive the legendary encounter that shocked the Adilshahi Empire.",
        heroImg: "https://images.unsplash.com/photo-1605648834418-42f88ffabf53?w=1000&auto=format&fit=crop", // Swords/armor aesthetic
        dateDay: "10",
        dateMonth: "NOV",
        heading: "A Turning Point in Maratha History",
        desc1: "The Battle of Pratapgad in 1659 is one of the most famous tactical victories in Indian military history. When the massive Adilshahi general Afzal Khan marched to destroy Swarajya, Shivaji Maharaj lured him deep into the dense, mountainous forests of Jawali at the foot of Pratapgad.",
        desc2: "During a supposed 'peaceful' meeting in a specialized tent (Shamiyana), Khan attempted to assassinate Maharaj. Prepared for treachery, Shivaji Maharaj wore armor beneath his clothes and famously disemboweled Khan using concealed 'Wagh Nakh' (Tiger Claws).",
        highlightImg1: "https://images.unsplash.com/photo-1626014903706-e7e26fc54045?w=500&auto=format&fit=crop",
        highlightTitle1: "Bhavani Mata Temple",
        highlightDesc1: "The sacred temple built by Shivaji Maharaj. He was presented a legendary sword by the Goddess here.",
        highlightImg2: dholTashaImg,
        highlightTitle2: "Shiv Pratap Din",
        highlightDesc2: "The annual grand celebration of this historic victory at the fort.",
        highlightImg3: "https://images.unsplash.com/photo-1548013146-72479768bada?w=500&auto=format&fit=crop",
        highlightTitle3: "Afzal Khan's Tomb",
        highlightDesc3: "As a mark of true warrior respect, Shivaji Maharaj gave Khan a proper burial at the base of the fort.",
        caption1: "The dense, treacherous forests of Jawali surrounding Pratapgad",
        caption2: "Traditional weapons similar to those used in the battle"
    },
    5: { // Lohagad
        title: "Guardian of the Trade Route",
        subtitle: "The iron fort that watched over the ancient caravan trails.",
        heroImg: "https://images.unsplash.com/photo-1544626159-0027f31df538?w=1000&auto=format&fit=crop", // Mountains
        dateDay: "01",
        dateMonth: "JUL",
        heading: "The Monsoon Citadel",
        desc1: "Lohagad, literally meaning 'Iron Fort', is one of the most structurally robust forts in Maharashtra. For centuries, it served to guard the ancient trade route connecting the Deccan plateau to the prosperous port of Kalyan.",
        desc2: "Today, Lohagad is arguably the most popular monsoon trekking destination near Pune and Mumbai. The lush green Sahyadris, deep misty valleys, and continuous rainfall transform the fort into a magical, cloud-covered fortress.",
        highlightImg1: "https://images.unsplash.com/photo-1596485802280-99c5b6b10705?w=500&auto=format&fit=crop",
        highlightTitle1: "Vinchu Kata",
        highlightDesc1: "The famous 'Scorpion's Tail', a long, narrow fortified spur that provides sweeping views and natural defense.",
        highlightImg2: dholTashaImg,
        highlightTitle2: "Chhatrapati Shivaji's Surat Loot",
        highlightDesc2: "The wealth brought from Surat by Shivaji Maharaj was securely kept here under the supervision of Netaji Palkar.",
        highlightImg3: "https://images.unsplash.com/photo-1621217036687-39328eb92040?w=500&auto=format&fit=crop",
        highlightTitle3: "The Four Grand Gates",
        highlightDesc3: "Maha Darwaza, Ganesh Darwaza, Narayan Darwaza, and Hanuman Darwaza stand perfectly intact to this day.",
        caption1: "A misty trek up the ancient stone steps",
        caption2: "The impenetrable fortification"
    }
};

const CultureSection = ({ fort }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const data = CULTURE_DATA[fort?.id] || CULTURE_DATA[1];

    return (
        <section className="culture-section-container">
            <div className="culture-hero" style={{ backgroundImage: `linear-gradient(to right, rgba(230, 126, 34, 0.8), rgba(192, 57, 43, 0.8)), url(${data.heroImg})` }}>
                <div className="culture-hero-content">
                    <span className="culture-eyebrow">CULTURAL EXPERIENCE</span>
                    <h1 className="culture-title">{data.title}</h1>
                    <p className="culture-subtitle">{data.subtitle}</p>
                </div>
            </div>

            <div className="culture-body">
                <div className="culture-split">
                    <div className="culture-text-content">
                        <div className="date-badge">
                            <span className="date-day">{data.dateDay}</span>
                            <span className="date-month">{data.dateMonth}</span>
                        </div>
                        
                        <h2>{data.heading}</h2>
                        <p className="culture-desc">{data.desc1}</p>
                        <p className="culture-desc">{data.desc2}</p>

                        <div className="culture-highlights">
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={data.highlightImg1} alt={data.highlightTitle1} />
                                </div>
                                <div className="highlight-content">
                                    <h4>{data.highlightTitle1}</h4>
                                    <p>{data.highlightDesc1}</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={data.highlightImg2} alt={data.highlightTitle2} />
                                </div>
                                <div className="highlight-content">
                                    <h4>{data.highlightTitle2}</h4>
                                    <p>{data.highlightDesc2}</p>
                                </div>
                            </div>
                            <div className="highlight-item">
                                <div className="highlight-img">
                                    <img src={data.highlightImg3} alt={data.highlightTitle3} />
                                </div>
                                <div className="highlight-content">
                                    <h4>{data.highlightTitle3}</h4>
                                    <p>{data.highlightDesc3}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="culture-image-content">
                        <div className="culture-img-wrapper main-img">
                            <img src={data.heroImg} alt={data.title} />
                            <div className="img-caption">{data.caption1}</div>
                        </div>
                        <div className="culture-img-wrapper secondary-img">
                            <img src={data.highlightImg3} alt={data.highlightTitle3} />
                            <div className="img-caption">{data.caption2}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CultureSection;
