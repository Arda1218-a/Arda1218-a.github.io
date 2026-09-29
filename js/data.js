/**
 * PORTFOLIO DATA STORE - MIT & Systems Engineering Portfolio
 * Bilingual Data (Turkish / English)
 * 4 Core Engineering Projects, AI-Orchestration Framework, Certifications & Metrics
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Independent Systems & IoT Engineering Portfolio",
    badge: "Independent Systems & IoT Architect • Self-Taught & AI-Augmented",
    tagline_tr: "Sürdürülebilirlik, IoT ve Yapay Zeka Destekli Bağımsız Sistem Mühendisliği",
    tagline_en: "Independent Systems Engineering, Sustainable IoT & AI-Augmented Prototyping",
    bio_tr: "Herhangi bir üniversite laboratuvarı, akademik fon veya hoca desteği olmaksızın; tamamen kendi araştırmalarım ve İnsan-Yapay Zeka ortaklığı (AI-Augmented Engineering) ile sıfırdan geliştirdiğim donanım, IoT ve uç yapay zeka sistemleri.",
    bio_en: "Hardware, IoT, and Edge-AI systems architected from the ground up through self-directed learning and Human-AI co-engineering, completely independent of institutional labs or academic faculty guidance.",
    philosophy_title_tr: "Bağımsız Mühendislik & İnsan-Yapay Zeka Ortaklığı (AI-Augmented Engineering)",
    philosophy_title_en: "Independent Engineering & Human-AI Co-Engineering Philosophy",
    philosophy_desc_tr: "Bu portföydeki tüm sistemler, üniversite veya kurumsal bir destek almadan, tamamen kendi inisiyatifimle hayata geçirilmiştir. Sistem mimarisi, problem tespiti, devre topolojisi ve donanım seçimi tarafımdan kurgulanmış; Yapay Zeka (AI) ise kod üretimi, matematiksel modelleme ve optimizasyonda bir eş-mühendis (pair engineer) olarak yönetilmiştir.",
    philosophy_desc_en: "All systems in this portfolio were conceptualized and built entirely independently without university laboratory access, professorial guidance, or institutional backing. System architecture, problem formulation, hardware topology, and operational logic were engineered by me, while AI was leveraged as an engineering multiplier and pair-programmer for firmware optimization, interface coding, and simulation physics.",
    metrics: [
      { id: "projects", value: "5", label_tr: "Çalışan Mühendislik Projesi", label_en: "Functional Engineering Projects" },
      { id: "simulations", value: "5/5", label_tr: "Canlı İnteraktif Simülatör", label_en: "Interactive Live Simulators" },
      { id: "savings", value: "%40+", label_tr: "Ölçümlenen Kaynak & Enerji Tasarrufu", label_en: "Measured Resource & Energy Efficiency" },
      { id: "methodology", value: "Self+AI", label_tr: "Bağımsız Mühendislik Modeli", label_en: "Independent Engineering Workflow" }
    ]
  },

  projects: [
    {
      id: "dormos",
      title_tr: "DormOS: Hata Toleranslı & Uç Yapay Zekalı Akıllı Yurt İşletim Sistemi (Öne Çıkan Proje)",
      title_en: "DormOS: Fault-Tolerant, Edge-AI Powered Living Ecosystem for Campus Dormitories (Flagship Project)",
      category_tr: "Akıllı Kampüs & NVIDIA Build Destekli Edge AI",
      category_en: "Smart Campus & NVIDIA Build Powered Edge AI",
      badge: "🌟 Flagship Project • 1.95-Yr ROI • NVIDIA Build AI",
      icon: "building",
      short_desc_tr: "Öne çıkan ana sistem: 10.1 inç PoE panelleri, kamerasız TinyML akustik güvenlik, 85ms telsiz mesh ve NVIDIA Build bulut yapay zeka motorunu birleştiren komple kampüs işletim sistemi.",
      short_desc_en: "Flagship system: An industrial-grade smart dormitory OS uniting 10.1\" PoE panels, camera-free TinyML acoustics, 85ms mesh, and NVIDIA Build cloud AI intelligence.",
      
      purpose_tr: "Üniversite ve KYK yurtlarındaki dağınık, manuel ve verimsiz altyapıyı modernize etmek. Öğrenci mahremiyetini koruyarak kamerasız ses yapay zekasıyla güvenliği sağlamak, NVIDIA Build API ile kampüs olay analizlerini ve kestirimci bakımı otonomlaştırmak; 50 odalı bir yurtta 1.95 yılda kendini amorti eden bir ROI modeli sunmak.",
      purpose_en: "Modernizing fragmented and wasteful dormitory operations. Enforcing student privacy with camera-free TinyML acoustics, utilizing NVIDIA Build API for campus event summarization and predictive maintenance, and delivering a 1.95-year industrial ROI.",
      
      human_role_tr: "Baş Sistem Mimarı olarak; 3 katmanlı kablosuz mesh failover stratejisinin kurgulanması, 15 saniyelik insani doğrulama katmanı (rüya/panik çığlığı ayrımı), 50 odalık kalem kalem maliyet/BOM analitiği ve NVIDIA Build API entegrasyon mimarisinin tasarlanması.",
      human_role_en: "Lead System Architect: Formulating 3-layer fail-safe mesh failover topology, 15-second human verification gate, itemized 50-room BOM feasibility, and NVIDIA Build API integration architecture.",
      ai_role_tr: "NVIDIA Build (build.nvidia.com) bulut AI model entegrasyonu, TinyML ses sınıflandırma tensör optimizasyonu, 85ms Node-Hopping simülasyon kodları ve kestirimci bakım algoritmalarının kodlanması.",
      ai_role_en: "NVIDIA Build (build.nvidia.com) cloud AI model integration, TinyML acoustic tensor optimization, 85ms Node-Hopping simulation logic, and predictive maintenance scripts.",
      
      hardware: ["10.1 inç Duvara Gömülü PoE Panel", "ESP32-S3 Edge AI Akustik Düğümü", "Ters Osmoz (RO) + UV Arıtma", "Thread / ESP-NOW Radyo Mesh", "Akıllı Kurye QR Kiosk Dolabı", "Akım & Debi Sensörleri"],
      software: ["NVIDIA Build API (NIM Cloud AI)", "TinyML Akustik Ses Sınıflandırma", "3-Katmanlı Fail-Safe Mesh (85ms)", "Kestirimci Bakım Algoritması", "PoE Dokunmatik UI", "Merkezi İdare & Revir Portalı"],
      metrics: [
        { label_tr: "Mesh Failover Süresi", label_en: "Mesh Failover Latency", value: "85 ms" },
        { label_tr: "Yatırım Amorti Süresi", label_en: "Capital Payback Period", value: "1.95 Yıl" },
        { label_tr: "Bulut AI Hızlandırma", label_en: "Cloud AI Acceleration", value: "NVIDIA Build" },
        { label_tr: "Sahte Alarm Eleme", label_en: "False Alarm Rejection", value: "%99.0" }
      ],
      github_repo: "https://github.com/Arda1218-a/Dormos",
      simulation_type: "dormos"
    },

    {
      id: "water-management",
      title_tr: "BiyoKalp: Sürdürülebilir Evsel Su Atık Yönetimi & Gri Su Geri Kazanımı",
      title_en: "BiyoKalp: Heart-Inspired Biomimetic Domestic Greywater Recycling System",
      category_tr: "Sürdürülebilirlik & Biyomimetik IoT",
      category_en: "Sustainability & Biomimetic IoT",
      badge: "İnsan Kalbinden İlham Alan Tasarım • NVIDIA Build AI",
      icon: "droplet",
      short_desc_tr: "İnsan kalbinin odacık ve kapakçık (vana) yönlendirme mekanizmasından ilham alan; gri suyu sensörlerle analiz edip NVIDIA Build API ile kimyasal kaliteye göre yönlendiren biyomimetik geri kazanım ekosistemi.",
      short_desc_en: "A biomimetic greywater recycling ecosystem inspired by the human heart's ventricular routing valves, analyzing domestic wastewater via sensor fusion and NVIDIA Build API for intelligent diversion.",
      
      purpose_tr: "Küresel su krizine ev ölçeğinde pratik ve biyomimetik bir çözüm üretmek. İnsan kalbinin kirli ve temiz kanı ayıran çoklu kapakçık mantığı örnek alınarak; evsel gri su TDS ve Bulanıklık sensörleriyle ayrıştırılmış, NVIDIA Build API ile filtre ömrü ve su saflığı kestirimci olarak modellenmiştir.",
      purpose_en: "Addressing the global freshwater crisis via biomimicry. Emulating the human heart's dual-chamber separation valves to route filtered domestic water for toilet flushing and smart irrigation with NVIDIA Build predictive analytics.",
      
      human_role_tr: "Kalp kapakçıklarından ilham alan biyomimetik 3 kademeli vana akış tasarımı, sensör yerleşim topolojisi (TDS, Bulanıklık, Su Seviyesi), NVIDIA Build API entegrasyonu ve geri kazanım algoritmik kural setinin kurgulanması.",
      human_role_en: "Heart-valve biomimetic 3-stage flow architecture design, sensor placement topology, NVIDIA Build API integration, and algorithmic decision matrices.",
      ai_role_tr: "NVIDIA Build (build.nvidia.com) API ile kimyasal telemetri analitiği, sensör kalibrasyon algoritmaları, vana anahtarlama durum makineleri ve simülasyon motoru kodlaması.",
      ai_role_en: "NVIDIA Build (build.nvidia.com) API telemetry analytics, sensor calibration logic, valve state machine implementation, and simulation engine code.",
      
      hardware: ["ESP32 DevKit V1", "TDS Sensörü (Analog)", "Bulanıklık (Turbidity) Sensörü", "Ultrasonik Seviye Sensörü (HC-SR04)", "12V Selenoid Vana Grubu", "Röle Modülü (4 Kanal)", "Aktif Karbon & Kum Filtre Ünitesi"],
      software: ["NVIDIA Build API (Chemical AI Reasoning)", "C++ / Arduino IDE", "FreeRTOS Task Management", "MQTT Protokolü", "Web Dashboard & Telemetri"],
      metrics: [
        { label_tr: "Su Tasarrufu", label_en: "Water Savings", value: "%38 - %42" },
        { label_tr: "Geri Dönüşüm Hızı", label_en: "Processing Flow", value: "4.5 L/dk" },
        { label_tr: "Biyomimetik İlham", label_en: "Biomimetic Model", value: "İnsan Kalbi" },
        { label_tr: "Sensör Tepki Süresi", label_en: "Response Latency", value: "<150 ms" }
      ],
      github_repo: "https://github.com/Arda1218-a/sustainable-greywater-iot",
      wokwi_url: "https://wokwi.com/projects/471876742093742081",
      simulation_type: "water"
    },

    {
      id: "smart-home",
      title_tr: "Aura Smart Home OS: Modüler & Kendi Kendini İyileştiren Akıllı Ev Ekosistemi",
      title_en: "Aura Smart Home OS: Modular & Self-Healing IoT Mesh Ecosystem",
      category_tr: "IoT & NVIDIA AI Destekli Mimariler",
      category_en: "IoT & NVIDIA AI Supported Architectures",
      badge: "NVIDIA Build API Copilot • Distributed Mesh",
      icon: "home",
      short_desc_tr: "ESP-NOW yerel mesh protokolü ile internet kopsa da çalışan, NVIDIA Build API ile doğal dil senaryoları ve kestirimci enerji analizi yürüten modüler ev otomasyonu.",
      short_desc_en: "A decentralized smart home ecosystem operating via local ESP-NOW mesh even without cloud, augmented with NVIDIA Build API for natural language scenarios and predictive energy audits.",
      
      purpose_tr: "Geleneksel akıllı evlerdeki tek nokta hata (single point of failure) problemini çözmek. NVIDIA Build API entegrasyonu ile evin enerji paternlerini akıllıca analiz etmek ve tehlike anlarında otonom önlem almak.",
      purpose_en: "Eliminating the single point of failure in traditional centralized smart homes, empowered by NVIDIA Build API for smart household energy reasoning and autonomous hazard mitigation.",
      
      human_role_tr: "Modüler oda düğüm mimarisinin belirlenmesi, enerji tasarruf kuralları, yangın/gaz acil durum tahliye senaryoları ve NVIDIA Build API senaryo orkestrasyonu.",
      human_role_en: "Conceptualizing modular room node hierarchy, autonomous failover routines, emergency hazard triggers, and NVIDIA Build API scenario orchestration.",
      ai_role_tr: "NVIDIA Build (build.nvidia.com) NIM modeli ile akıllı asistan ve enerji analizi, ESP-NOW paket şifreleme yapıları ve asenkron web sunucusu kodlaması.",
      ai_role_en: "NVIDIA Build (build.nvidia.com) NIM model for ambient assistant & energy intelligence, ESP-NOW serialization, and async web server code.",
      
      hardware: ["ESP32 & ESP8266 Modülleri", "DHT22 Sıcaklık/Nem Sensörü", "PIR Hareket Sensörleri", "ACS712 Akım Sensörü", "MQ-2 Gaz & Duman Sensörü", "I2C OLED Ekranlar", "SSR Katı Hal Röleleri"],
      software: ["NVIDIA Build API (Ambient AI Reasoning)", "ESP-NOW Protokolü", "C++ / MicroPython", "WebSockets", "Node-RED Entegrasyonu"],
      metrics: [
        { label_tr: "Arıza Toleransı (Uptime)", label_en: "Local Mesh Uptime", value: "%99.98" },
        { label_tr: "Boşta Enerji Azaltımı", label_en: "Idle Power Saved", value: "%24" },
        { label_tr: "Zeka Motoru", label_en: "Intelligence Core", value: "NVIDIA Build" },
        { label_tr: "Maksimum Düğüm", label_en: "Supported Mesh Nodes", value: "32 Modül" }
      ],
      github_repo: "https://github.com/Arda1218-a/aura-smart-home-os",
      simulation_type: "home"
    },

    {
      id: "smart-parking",
      title_tr: "SmartPark-Mega: Akıllı Otopark Yönetimi & Dinamik Yönlendirme Sistemi",
      title_en: "SmartPark-Mega: IoT Urban Parking Guidance & Dynamic Allocation System",
      category_tr: "Akıllı Şehirler & NVIDIA Vision/AI",
      category_en: "Smart Cities & NVIDIA Vision/AI",
      badge: "NVIDIA Build API • Urban Efficiency",
      icon: "parking",
      short_desc_tr: "Şehir içi park arama süresini ve karbon emisyonunu azaltan, NVIDIA Build API ile yoğunluk tahmini ve akıllı yönlendirme yapan otopark otomasyonu.",
      short_desc_en: "An urban mobility system slashing search latency and emissions via sensor fusion and NVIDIA Build API for predictive congestion analysis and dynamic slot assignment.",
      
      purpose_tr: "Şehir içi trafiğin %30'unu oluşturan park arama krizini çözmek. NVIDIA Build API ile araç tiplerini, giriş yoğunluklarını analiz edip en verimli kat ve slot dağıtımını gerçekleştirmek.",
      purpose_en: "Solving downtown cruising traffic. Leveraging NVIDIA Build API to evaluate vehicle profiles, forecast rush-hour inflows, and execute optimal floor/slot allocation.",
      
      human_role_tr: "Otopark slot yerleşim matrisi, en kısa mesafe atama mantığı, bariyer kontrol akışı, NVIDIA Build API entegrasyonu ve 3-Strike yaptırım kurgusu.",
      human_role_en: "Parking slot grid geometry, shortest-distance allocation heuristic, barrier control state machine, NVIDIA Build API integration, and 3-Strike punitive architecture.",
      ai_role_tr: "NVIDIA Build (build.nvidia.com) API yoğunluk tahminleme ve plaka akıl yürütme motoru, Dijkstra tabanlı rota optimizasyonu ve telemetri kodlaması.",
      ai_role_en: "NVIDIA Build (build.nvidia.com) API density prediction & reasoning engine, Dijkstra routing optimization, and telemetry coding.",
      
      hardware: ["Arduino Mega & ESP32 Bridge", "Ultrasonik Sensör Matrisi (HC-SR04)", "RGB Durum LED Modülleri", "SG90 Servo Bariyer Motorları", "RC522 RFID Okuyucu Modülü", "16x2 I2C LCD Bilgilendirme"],
      software: ["NVIDIA Build API (Predictive Mobility AI)", "C++ Gömülü Kod", "Dijkstra Tabanlı Slot Algoritması", "REST API & JSON", "Gerçek Zamanlı Web UI"],
      metrics: [
        { label_tr: "Park Arama Süresi", label_en: "Search Time Saved", value: "-%70" },
        { label_tr: "Karbon Tasarrufu", label_en: "CO2 Reduction Est.", value: "1.2 kg/araç" },
        { label_tr: "Tahmin Motoru", label_en: "Prediction Engine", value: "NVIDIA Build" },
        { label_tr: "Bariyer Açılma Süresi", label_en: "Barrier Gate Speed", value: "0.8 sn" }
      ],
      github_repo: "https://github.com/Arda1218-a/smartpark-mega",
      simulation_type: "parking"
    },

    {
      id: "smart-medication",
      title_tr: "CareMed-AI: Akıllı İlaç Takip & Dozaj Güvenliği Sistemi",
      title_en: "CareMed-AI: Smart Medication Dispenser & Patient Safety System",
      category_tr: "Sağlık Teknolojileri & IoT",
      category_en: "HealthTech & IoT",
      badge: "Medical Adherence • Zero-Cloud Air Gap",
      icon: "pill",
      short_desc_tr: "Kronik hastalar ve yaşlılar için zamanında, doğru dozda ilaç dağıtımı yapan; alınmayan ilaçlarda refakatçiye acil bildirim gönderen donanım kilitli güvenli dağıtıcı.",
      short_desc_en: "A life-critical IoT dispenser ensuring exact dosage timing, physical compartment locking, missed-dose escalation alerts, and adherence analytics for chronic patients.",
      
      purpose_tr: "Dünya Sağlık Örgütü (WHO) verilerine göre kronik hastalarda ilaç uyumsuzluğu %50 seviyesindedir. Yanlış dozaj ve unutkanlıktan kaynaklanan hayati riskleri donanım kilitli akıllı bir kutuyla ortadan kaldırmak.",
      purpose_en: "According to the WHO, adherence to long-term therapy for chronic diseases averages only 50%. This project prevents accidental double-dosing and missed medication through automated hardware locking.",
      
      human_role_tr: "Döner tambur mekanik kurgusu, saatlik alarm matrisi (RTC tabanlı), acil durum SMS/Bildirim hiyerarşisi, kilit güvenlik protokolü.",
      human_role_en: "Rotary carousel physical layout logic, RTC timing matrix, missed-dose caregiver escalation protocols, and patient safety interlocking.",
      ai_role_tr: "DS3231 RTC zaman senkronizasyonu, push notification webhook servisleri, hasta uyum skorlama algoritması ve zamanlayıcı arayüzü.",
      ai_role_en: "DS3231 RTC interrupt handling, webhook push notification integration, adherence scoring algorithm, and interactive clock UI.",
      
      hardware: ["ESP32 WROOM-32", "DS3231 Yüksek Hassasiyetli RTC", "28BYJ-48 Step Motor + ULN2003", "IR Engel Sensörü (Doz Kontrol)", "Piezo Sesli Alarm & Titreşim", "0.96 inch I2C OLED", "Dokunmatik Onay Butonu"],
      software: ["FreeRTOS Zamanlayıcı", "Blynk IoT / Pushover API", "C++ Hardware Timers", "JSON Hasta Reçete Yapısı", "Uyum Skorlama Motoru"],
      metrics: [
        { label_tr: "İlaç Alma Uyum Oranı", label_en: "Adherence Rate", value: "%98.5" },
        { label_tr: "Dozaj Hata Payı", label_en: "Dispensing Error", value: "%0.00" },
        { label_tr: "Acil Bildirim Hızı", label_en: "Alert Notification", value: "< 2.5 sn" },
        { label_tr: "Pil Dayanım Süresi", label_en: "Deep-Sleep Battery", value: "14+ Gün" }
      ],
      github_repo: "https://github.com/Arda1218-a/caremed-ai",
      simulation_type: "medication"
    }
  ],

  certificates: [
    {
      id: "cert-cs50x",
      title_tr: "CS50x: Bilgisayar Bilimine Giriş",
      title_en: "CS50x: Introduction to Computer Science",
      issuer: "Harvard University / edX",
      date: "2024 - 2025",
      category: "cs",
      category_name_tr: "Bilgisayar Bilimi & Algoritmalar",
      category_name_en: "Computer Science & Algorithms",
      skills_tr: ["C Dili", "Python", "Veri Yapıları", "Algoritmalar", "Bellek Yönetimi (Pointers)", "Web & SQL"],
      skills_en: ["C", "Python", "Data Structures", "Algorithms", "Memory Management", "Web & SQL"],
      status_tr: "Bağımsız Müfredat Çalışması (Coursework Completed)",
      status_en: "Independent Academic Coursework Completed",
      verified: false
    },
    {
      id: "cert-6002x",
      title_tr: "6.002x: Devreler ve Elektronik (Circuits & Electronics)",
      title_en: "6.002x: Circuits and Electronics",
      issuer: "MITx / edX",
      date: "2024 - 2025",
      category: "iot",
      category_name_tr: "Elektronik & Donanım Mimarisi",
      category_name_en: "Electronics & Hardware Architecture",
      skills_tr: ["Devre Analizi", "RLC Ağları", "MOSFET / Transistörler", "Sinyal İşleme", "Op-Amp Tasarımı"],
      skills_en: ["Circuit Analysis", "RLC Networks", "MOSFET Transistors", "Signal Processing", "Op-Amp Design"],
      status_tr: "Bağımsız Müfredat Çalışması (Coursework Completed)",
      status_en: "Independent Academic Coursework Completed",
      verified: false
    }
  ],

  technical_skills: [
    { name: "Hardware & Microcontrollers", items: ["ESP32", "Arduino Mega/Uno", "STM32 Basics", "Raspberry Pi", "FreeRTOS"] },
    { name: "IoT Protocols & Networking", items: ["MQTT", "ESP-NOW", "WebSockets", "HTTP/REST", "I2C / SPI / UART"] },
    { name: "Sensors & Actuators", items: ["TDS / Turbidity", "Ultrasonic HC-SR04", "RTC DS3231", "PIR / MQ-2", "Servo / Stepper Motors"] },
    { name: "Software & AI Orchestration", items: ["NVIDIA Build API (NIM)", "TinyML (Edge AI)", "C / C++ (Embedded)", "Python", "JavaScript / HTML5", "Prompt & System Architecture", "Git & GitHub Workflow"] }
  ]
};
