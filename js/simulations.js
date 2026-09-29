/**
 * INTERACTIVE SIMULATION LABS - MIT Engineering Showcase
 * 4 Real-time interactive simulators demonstrating the internal algorithms and hardware logic
 */

const Simulations = {
  // 1. Water Management Simulator State
  water: {
    inflow: 5.0, // L/min
    turbidity: 45, // NTU
    tds: 180, // ppm
    tankLevel: 62, // %
    totalSaved: 142.5, // Liters
    valveState: 'filtering', // 'filtering', 'direct_reuse', 'drain'
    intervalId: null
  },

  // 2. Smart Home Mesh State
  home: {
    nodes: [
      { id: 'living', name: 'Living Room Node', temp: 22.4, humidity: 48, motion: false, power: 120, status: 'online' },
      { id: 'kitchen', name: 'Kitchen Safety Node', temp: 24.1, humidity: 55, gas: 18, power: 340, status: 'online' },
      { id: 'bed', name: 'Bedroom Sensor Node', temp: 21.0, humidity: 50, motion: false, power: 45, status: 'online' },
      { id: 'hub', name: 'Gateway Bridge (ESP32)', uptime: '99.98%', meshPeers: 3, status: 'online' }
    ],
    meshMode: 'ESP-NOW Local Mesh',
    internetConnected: true,
    emergencyState: false
  },

  // 3. Smart Parking State
  parking: {
    slots: [
      { id: 'A1', occupied: true, carPlate: '34-MIT-01', dist: 12 },
      { id: 'A2', occupied: false, carPlate: null, dist: 15 },
      { id: 'A3', occupied: true, carPlate: '06-ENG-42', dist: 20 },
      { id: 'A4', occupied: false, carPlate: null, dist: 24 },
      { id: 'B1', occupied: false, carPlate: null, dist: 30 },
      { id: 'B2', occupied: true, carPlate: '35-IOT-99', dist: 35 },
      { id: 'B3', occupied: false, carPlate: null, dist: 40 },
      { id: 'B4', occupied: true, carPlate: '16-AI-77', dist: 45 }
    ],
    barrierOpen: false,
    allocatedSlot: null,
    totalCarsServed: 128,
    co2SavedKg: 153.6
  },

  // 4. Smart Medication State
  medication: {
    slots: [
      { time: '08:00', label: 'Morning Dose (Cardio)', taken: true, status: 'completed' },
      { time: '13:00', label: 'Noon Dose (Vitamin D3)', taken: true, status: 'completed' },
      { time: '19:00', label: 'Evening Dose (Blood Pressure)', taken: false, status: 'due' },
      { time: '22:00', label: 'Night Dose (Melatonin)', taken: false, status: 'pending' }
    ],
    currentCompartment: 3,
    alarmActive: false,
    buzzerSounding: false,
    adherenceScore: 98.2,
    missedAlertSent: false
  },

  // 5. DormOS Smart Campus State
  dormos: {
    roomNo: "304",
    networkMode: "Ethernet PoE (Primary 1Gbps)",
    meshFailoverActive: false,
    audioEvent: "none",
    verificationSeconds: 0,
    verificationTimerId: null,
    tdsPpm: 32,
    litersDispensed: 1845,
    bottlesSaved: 3690,
    dndMode: false,
    infirmaryService: false,
    acTemp: 23.5
  },

  // Initialize simulations inside UI
  init() {
    this.renderDormosSim();
    this.renderWaterSim();
    this.renderHomeSim();
    this.renderParkingSim();
    this.renderMedicationSim();
  },

  // ================= WATER SIMULATION =================
  renderWaterSim() {
    const container = document.getElementById('sim-water-container');
    if (!container) return;

    const w = this.water;
    // Decision logic
    let statusText = "";
    let statusClass = "";
    let routing = "";

    if (w.turbidity > 150 || w.tds > 500) {
      w.valveState = 'drain';
      statusText = "KİRLİ SU - KANALİZASYONA YÖNLENDİRİLDİ (GÜVENLİK MODU)";
      statusClass = "badge-danger";
      routing = "Kanalizasyon Tahliyesi (Bypass Açık)";
    } else if (w.turbidity > 30 || w.tds > 250) {
      w.valveState = 'filtering';
      statusText = "GRİ SU - AKTİF KARBON FİLTRELEME DEVREDE";
      statusClass = "badge-warning";
      routing = "3 Kademeli Filtre -> Rezervuar Deposu";
    } else {
      w.valveState = 'direct_reuse';
      statusText = "TEMİZ GRİ SU - DİREKT GERİ KAZANIM";
      statusClass = "badge-success";
      routing = "Rezervuar & Bahçe Sulama Tankı";
    }

    container.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <div class="sim-title">
            <span class="sim-icon">💧</span>
            <div>
              <h4>Su Geri Kazanım & Sensör Füzyon Simülatörü</h4>
              <p class="text-muted text-sm">Gerçek zamanlı TDS, Bulanıklık ve Selenoid Vana Yönlendirme Mantığı</p>
            </div>
          </div>
          <span class="badge ${statusClass}">${statusText}</span>
        </div>

        <div class="sim-grid-2">
          <!-- Sensor Controls -->
          <div class="sim-controls">
            <div class="control-group">
              <div class="control-label">
                <span>Gelen Su Debisi: <strong>${w.inflow.toFixed(1)} L/dk</strong></span>
              </div>
              <input type="range" class="slider" min="1" max="15" step="0.5" value="${w.inflow}" 
                oninput="Simulations.updateWaterParam('inflow', parseFloat(this.value))">
            </div>

            <div class="control-group">
              <div class="control-label">
                <span>Bulanıklık (Turbidity): <strong>${w.turbidity} NTU</strong></span>
                <span class="text-xs text-muted">${w.turbidity < 30 ? 'Temiz' : (w.turbidity < 150 ? 'Gri Su' : 'Aşırı Kirli')}</span>
              </div>
              <input type="range" class="slider" min="5" max="250" step="5" value="${w.turbidity}" 
                oninput="Simulations.updateWaterParam('turbidity', parseInt(this.value))">
            </div>

            <div class="control-group">
              <div class="control-label">
                <span>Çözünmüş Katı Madde (TDS): <strong>${w.tds} ppm</strong></span>
                <span class="text-xs text-muted">${w.tds < 200 ? 'İdeal' : (w.tds < 450 ? 'Filtre Gerekli' : 'Tehlikeli')}</span>
              </div>
              <input type="range" class="slider" min="50" max="600" step="10" value="${w.tds}" 
                oninput="Simulations.updateWaterParam('tds', parseInt(this.value))">
            </div>

            <div class="sim-action-row">
              <button class="btn btn-outline btn-sm" onclick="Simulations.setWaterPreset('shower')">🚿 Duş Suyu Simülasyonu</button>
              <button class="btn btn-outline btn-sm" onclick="Simulations.setWaterPreset('sink')">🧼 Lavabo Suyu Simülasyonu</button>
              <button class="btn btn-outline btn-sm" onclick="Simulations.setWaterPreset('dirty')">⚠️ Kimyasal Atık Testi</button>
            </div>
          </div>

          <!-- Live Visual Pipeline -->
          <div class="sim-display">
            <div class="water-pipeline">
              <div class="pipe-node ${w.valveState === 'drain' ? 'node-alert' : 'node-active'}">
                <span class="node-tag">ESP32 Sensör Analizi</span>
                <div class="telemetry-readout">
                  <span>NTU: ${w.turbidity}</span> | <span>TDS: ${w.tds}</span>
                </div>
              </div>
              <div class="pipe-flow-arrow ${w.valveState === 'drain' ? 'flow-alert' : 'flow-active'}">➔</div>
              <div class="pipe-node ${w.valveState === 'drain' ? 'node-bypass' : 'node-success'}">
                <span class="node-tag">Vana Yönlendirmesi</span>
                <div class="telemetry-readout">${routing}</div>
              </div>
            </div>

            <div class="metric-mini-grid">
              <div class="metric-mini-box">
                <div class="metric-mini-val text-cyan">${w.tankLevel}%</div>
                <div class="metric-mini-lbl">Rezervuar Depo Seviyesi</div>
              </div>
              <div class="metric-mini-box">
                <div class="metric-mini-val text-green">${w.totalSaved.toFixed(1)} L</div>
                <div class="metric-mini-lbl">Toplam Geri Kazanılan Su</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  updateWaterParam(key, val) {
    this.water[key] = val;
    if (this.water.valveState !== 'drain') {
      this.water.totalSaved += (this.water.inflow * 0.1);
      this.water.tankLevel = Math.min(100, this.water.tankLevel + 0.3);
    }
    this.renderWaterSim();
  },

  setWaterPreset(type) {
    if (type === 'shower') {
      this.water.inflow = 8.5;
      this.water.turbidity = 28;
      this.water.tds = 140;
    } else if (type === 'sink') {
      this.water.inflow = 4.0;
      this.water.turbidity = 65;
      this.water.tds = 220;
    } else if (type === 'dirty') {
      this.water.inflow = 6.0;
      this.water.turbidity = 190;
      this.water.tds = 520;
    }
    this.renderWaterSim();
  },

  // ================= SMART HOME SIMULATION =================
  renderHomeSim() {
    const container = document.getElementById('sim-home-container');
    if (!container) return;

    const h = this.home;
    const totalWatts = h.nodes.reduce((acc, n) => acc + (n.power || 0), 0);

    container.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <div class="sim-title">
            <span class="sim-icon">🏠</span>
            <div>
              <h4>Modüler Akıllı Ev & Mesh Ağ Simülatörü</h4>
              <p class="text-muted text-sm">ESP-NOW Düğümleri, Kendi Kendini İyileştirme (Self-Healing) ve Enerji Yönetimi</p>
            </div>
          </div>
          <div class="sim-pills">
            <span class="badge ${h.internetConnected ? 'badge-success' : 'badge-warning'}">
              ${h.internetConnected ? '● Cloud + ESP-NOW Aktif' : '● İnternet Koptu (Yerel Mesh Devrede)'}
            </span>
            <span class="badge badge-info">Toplam Tüketim: ${totalWatts}W</span>
          </div>
        </div>

        <div class="home-nodes-grid">
          ${h.nodes.map(node => `
            <div class="node-card ${node.status === 'alert' ? 'node-card-alert' : ''}">
              <div class="node-card-top">
                <span class="node-name">${node.name}</span>
                <span class="status-dot ${node.status === 'alert' ? 'dot-red' : 'dot-green'}"></span>
              </div>
              <div class="node-stats">
                ${node.temp ? `<div>🌡️ Sıcaklık: <strong>${node.temp}°C</strong></div>` : ''}
                ${node.humidity ? `<div>💧 Nem: <strong>${node.humidity}%</strong></div>` : ''}
                ${node.power ? `<div>⚡ Güç: <strong>${node.power}W</strong></div>` : ''}
                ${node.gas !== undefined ? `<div>⚠️ Gaz Seviyesi: <strong class="${node.gas > 50 ? 'text-red' : 'text-green'}">${node.gas} ppm</strong></div>` : ''}
                ${node.uptime ? `<div>⏱️ Uptime: <strong>${node.uptime}</strong></div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>

        <div class="sim-action-bar">
          <button class="btn btn-outline btn-sm" onclick="Simulations.toggleInternet()">
            ${h.internetConnected ? '🌐 İnternet Bağlantısını Kes (Mesh Testi)' : '🌐 İnterneti Yeniden Bağla'}
          </button>
          <button class="btn btn-outline btn-sm btn-danger-soft" onclick="Simulations.triggerGasAlert()">
            🔥 Mutfakta Gaz Sızıntısı Simüle Et (Acil Tahliye)
          </button>
          <button class="btn btn-outline btn-sm" onclick="Simulations.resetHomeNodes()">
            🔄 Normal Duruma Döndür
          </button>
        </div>
      </div>
    `;
  },

  toggleInternet() {
    this.home.internetConnected = !this.home.internetConnected;
    this.renderHomeSim();
  },

  triggerGasAlert() {
    const kitchen = this.home.nodes.find(n => n.id === 'kitchen');
    if (kitchen) {
      kitchen.gas = 145;
      kitchen.status = 'alert';
      kitchen.power = 40; // Auto-cutoff electrical sockets for safety
    }
    this.home.emergencyState = true;
    this.renderHomeSim();
  },

  resetHomeNodes() {
    const kitchen = this.home.nodes.find(n => n.id === 'kitchen');
    if (kitchen) {
      kitchen.gas = 18;
      kitchen.status = 'online';
      kitchen.power = 340;
    }
    this.home.emergencyState = false;
    this.home.internetConnected = true;
    this.renderHomeSim();
  },

  // ================= SMART PARKING SIMULATION =================
  renderParkingSim() {
    const container = document.getElementById('sim-parking-container');
    if (!container) return;

    const p = this.parking;
    const freeCount = p.slots.filter(s => !s.occupied).length;

    container.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <div class="sim-title">
            <span class="sim-icon">🚗</span>
            <div>
              <h4>Akıllı Otopark & En Yakın Slot Algoritması (Dijkstra)</h4>
              <p class="text-muted text-sm">Giriş Kapısından Minimum Mesafeli Slot Tahsisi ve Karbon Emisyon Takibi</p>
            </div>
          </div>
          <div class="sim-pills">
            <span class="badge ${freeCount > 0 ? 'badge-success' : 'badge-danger'}">
              Boş Slot: ${freeCount} / ${p.slots.length}
            </span>
            <span class="badge badge-info">Karbon Tasarrufu: ${p.co2SavedKg.toFixed(1)} kg CO2</span>
          </div>
        </div>

        <div class="parking-lot-layout">
          <div class="parking-entry-gate ${p.barrierOpen ? 'barrier-open' : 'barrier-closed'}">
            <div class="barrier-arm"></div>
            <span>GİRİŞ BARİYERİ: ${p.barrierOpen ? 'AÇIK (GEÇİŞ YAPILIYOR)' : 'KAPALI'}</span>
          </div>

          <div class="parking-grid">
            ${p.slots.map(slot => `
              <div class="parking-slot ${slot.occupied ? 'slot-occupied' : 'slot-free'} ${p.allocatedSlot === slot.id ? 'slot-assigned-pulse' : ''}"
                   onclick="Simulations.toggleSlotOccupancy('${slot.id}')">
                <div class="slot-badge">${slot.id}</div>
                <div class="slot-icon">${slot.occupied ? '🚘' : '🅿️'}</div>
                <div class="slot-details">
                  <span>${slot.occupied ? slot.carPlate : 'BOŞ'}</span>
                  <span class="text-xs text-muted">${slot.dist}m mesafe</span>
                </div>
                ${p.allocatedSlot === slot.id ? '<div class="assigned-tag">TAHSİS EDİLDİ</div>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="sim-action-bar">
          <button class="btn btn-primary btn-sm" onclick="Simulations.dispatchCarArrival()">
            ⚡ Yeni Araç Girişi Yap (Algoritmayı Çalıştır)
          </button>
          <button class="btn btn-outline btn-sm" onclick="Simulations.clearRandomCar()">
            🚪 Rastgele Bir Aracı Çıkart
          </button>
          <span class="text-xs text-muted ml-auto">* Slotlara doğrudan tıklayarak elle doluluk değiştirebilirsiniz.</span>
        </div>
      </div>
    `;
  },

  toggleSlotOccupancy(id) {
    const slot = this.parking.slots.find(s => s.id === id);
    if (slot) {
      slot.occupied = !slot.occupied;
      slot.carPlate = slot.occupied ? `34-ENG-${Math.floor(10 + Math.random() * 89)}` : null;
      if (this.parking.allocatedSlot === id && slot.occupied) {
        this.parking.allocatedSlot = null;
      }
      this.renderParkingSim();
    }
  },

  dispatchCarArrival() {
    // Run shortest path heuristic to find the nearest unoccupied slot
    const freeSlots = this.parking.slots.filter(s => !s.occupied);
    if (freeSlots.length === 0) {
      alert("Otopark tamamen dolu! Uygun slot bulunamadı.");
      return;
    }

    // Sort by distance from entrance gate
    freeSlots.sort((a, b) => a.dist - b.dist);
    const targetSlot = freeSlots[0];

    this.parking.allocatedSlot = targetSlot.id;
    this.parking.barrierOpen = true;
    this.parking.totalCarsServed += 1;
    this.parking.co2SavedKg += 1.2; // 1.2 kg CO2 avoided per search avoided

    this.renderParkingSim();

    // Simulate car parking into slot after 1.5s
    setTimeout(() => {
      targetSlot.occupied = true;
      targetSlot.carPlate = `34-MIT-${Math.floor(10 + Math.random() * 89)}`;
      this.parking.barrierOpen = false;
      this.renderParkingSim();
    }, 1200);
  },

  clearRandomCar() {
    const occupiedSlots = this.parking.slots.filter(s => s.occupied);
    if (occupiedSlots.length > 0) {
      const lucky = occupiedSlots[Math.floor(Math.random() * occupiedSlots.length)];
      lucky.occupied = false;
      lucky.carPlate = null;
      this.renderParkingSim();
    }
  },

  // ================= SMART MEDICATION SIMULATION =================
  renderMedicationSim() {
    const container = document.getElementById('sim-medication-container');
    if (!container) return;

    const m = this.medication;

    container.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <div class="sim-title">
            <span class="sim-icon">💊</span>
            <div>
              <h4>Akıllı İlaç Dağıtıcı & Hasta Uyum Simülatörü</h4>
              <p class="text-muted text-sm">RTC Zamanlayıcı, Step Motor Dozaj Kilidi ve Refakatçi Bildirim Motoru</p>
            </div>
          </div>
          <div class="sim-pills">
            <span class="badge badge-success">Hasta Uyum Skoru: ${m.adherenceScore}%</span>
            <span class="badge ${m.alarmActive ? 'badge-danger-pulse' : 'badge-info'}">
              ${m.alarmActive ? '🔔 DOZ ZAMANI! ALARM ÇALIYOR' : '⏱️ RTC: Sistem Beklemede'}
            </span>
          </div>
        </div>

        <div class="med-schedule-grid">
          ${m.slots.map((s, idx) => `
            <div class="med-slot-card ${s.status === 'completed' ? 'med-done' : (s.status === 'due' ? 'med-due' : 'med-pending')}">
              <div class="med-time-header">
                <span class="med-clock">⏰ ${s.time}</span>
                <span class="med-status-tag">${s.status === 'completed' ? '✓ Alındı' : (s.status === 'due' ? '⚡ ŞU AN ALINMALI' : 'Bekliyor')}</span>
              </div>
              <div class="med-name">${s.label}</div>
              <div class="med-chamber">Hazne No: #${idx + 1} ${idx + 1 === m.currentCompartment ? '(Aktif Pozisyonda)' : ''}</div>
            </div>
          `).join('')}
        </div>

        <div class="sim-action-bar">
          <button class="btn btn-primary btn-sm ${m.alarmActive ? 'btn-pulse' : ''}" onclick="Simulations.triggerMedAlarm()">
            🔔 Dozaj Alarmını Tetikle (Step Motor Dönsün)
          </button>
          <button class="btn btn-outline btn-sm btn-success-soft" onclick="Simulations.confirmMedTaken()">
            👆 İlaç Alındı Onayı Ver (Dokunmatik Sensör)
          </button>
          <button class="btn btn-outline btn-sm btn-danger-soft" onclick="Simulations.simulateMissedDose()">
            ⚠️ İlaç Unutuldu (Refakatçiye Acil SMS Gönder)
          </button>
        </div>
      </div>
    `;
  },

  triggerMedAlarm() {
    this.medication.alarmActive = true;
    this.medication.currentCompartment = 3;
    const eveningSlot = this.medication.slots.find(s => s.time === '19:00');
    if (eveningSlot) eveningSlot.status = 'due';
    this.renderMedicationSim();
  },

  confirmMedTaken() {
    if (this.medication.alarmActive) {
      this.medication.alarmActive = false;
      const eveningSlot = this.medication.slots.find(s => s.time === '19:00');
      if (eveningSlot) {
        eveningSlot.taken = true;
        eveningSlot.status = 'completed';
      }
      this.medication.adherenceScore = Math.min(100, this.medication.adherenceScore + 0.5);
      alert("✅ İlaç başarıyla alındı! Step motor kapağı kilitledi ve telemetri sunucusuna kayıt gönderildi.");
      this.renderMedicationSim();
    } else {
      alert("Şu anda aktif bir dozaj alarmı bulunmuyor.");
    }
  },

  simulateMissedDose() {
    this.medication.alarmActive = false;
    this.medication.adherenceScore = Math.max(70, this.medication.adherenceScore - 4.5);
    alert("🚨 UYARI: Hasta 15 dakika içinde ilacı almadı!\nRefakatçi ve doktora acil bildirim (SMS/Pushover) iletildi. Güvenlik kilidi devrede.");
    this.renderMedicationSim();
  },

  // ================= DORMOS SMART DORMITORY SIMULATION =================
  renderDormosSim() {
    const container = document.getElementById('sim-dormos-container');
    if (!container) return;

    const d = this.dormos;

    container.innerHTML = `
      <div class="sim-card">
        <div class="sim-header">
          <div class="sim-title">
            <span class="sim-icon">🎓</span>
            <div>
              <h4>DormOS: 10.1" Duvar Paneli & Edge-AI Güvenlik Simülatörü</h4>
              <p class="text-muted text-sm">PoE Akıllı Oda Tableti, Kamerasız TinyML Akustik Güvenlik ve 85ms Mesh Yedekleme</p>
            </div>
          </div>
          <div class="sim-pills">
            <span class="badge ${d.meshFailoverActive ? 'badge-warning' : 'badge-success'}">
              🌐 Ağ: ${d.networkMode}
            </span>
            <span class="badge badge-info">Ters Osmoz Su: ${d.tdsPpm} ppm (Saf)</span>
            <span class="badge badge-success">Kurtarılan Pet Şişe: ${d.bottlesSaved} Adet</span>
          </div>
        </div>

        <div class="sim-grid-2">
          <!-- 10.1" Interactive Room Panel Display -->
          <div class="story-card" style="background: #080d1a; border: 2px solid ${d.verificationSeconds > 0 ? 'var(--accent-red)' : 'var(--border-strong)'};">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--border-subtle);">
              <div>
                <span class="badge badge-info">ODA #${d.roomNo}</span>
                <span style="font-size: 0.8rem; margin-left: 0.5rem; color: var(--text-muted);">PoE Smart Touch Tablet</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: var(--accent-green);">
                ${d.dndMode ? '🔕 Rahatsız Etmeyin' : '🔔 Oda Müsait'}
              </div>
            </div>

            <!-- Panel Content -->
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem;">
              <div class="metric-mini-box" style="padding: 0.75rem;">
                <div class="metric-mini-val text-cyan">${d.acTemp}°C</div>
                <div class="metric-mini-lbl">Oda Sıcaklığı & İklim</div>
              </div>
              <div class="metric-mini-box" style="padding: 0.75rem;">
                <div class="metric-mini-val text-green">${d.tdsPpm} ppm</div>
                <div class="metric-mini-lbl">Arıtma Su Kalitesi (RO)</div>
              </div>
            </div>

            <!-- Emergency / Audio Alert Banner -->
            ${d.verificationSeconds > 0 ? `
              <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid var(--accent-red); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center; animation: pulse-border 1.5s infinite;">
                <div style="font-weight: 800; color: var(--accent-red); margin-bottom: 0.25rem;">
                  ⚠️ AKUSTİK SES ALARMI TESPİT EDİLDİ (${d.audioEvent === 'glass_break' ? 'Cam Kırılması' : 'Panik Çığlığı'})
                </div>
                <p class="text-xs text-muted" style="margin-bottom: 0.5rem;">
                  Sahte alarmı önlemek için güvenliğin aranmasına <strong>${d.verificationSeconds} saniye</strong> kaldı.
                </p>
                <button class="btn btn-outline btn-sm" onclick="Simulations.cancelDormosAlert()" style="background: var(--accent-green); color: #fff; border: none; font-weight: 700;">
                  ✓ Yanlış Alarm / Güvendeyim (İptal Et)
                </button>
              </div>
            ` : `
              <div style="background: var(--bg-secondary); padding: 0.75rem; border-radius: 8px; margin-bottom: 1rem; font-size: 0.8rem; color: var(--text-muted); display: flex; align-items: center; gap: 0.5rem;">
                <span>🎙️</span>
                <span><strong>TinyML Edge AI:</strong> Kamerasız ortam dinleme aktif. Mahremiyet korumalı (Ham ses kaydı yapılmaz).</span>
              </div>
            `}

            <!-- Room Quick Actions -->
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-outline btn-sm" onclick="Simulations.toggleDormosDnd()">
                ${d.dndMode ? '🔔 Rahatsız Etmeyin Kapat' : '🔕 Rahatsız Etmeyin Aç'}
              </button>
              <button class="btn btn-outline btn-sm ${d.infirmaryService ? 'badge-success' : ''}" onclick="Simulations.requestDormosSoup()">
                ${d.infirmaryService ? '🍲 Çorba Siparişi İletildi' : '🍲 Revir / Hasta Servisi İste'}
              </button>
            </div>
          </div>

          <!-- Simulation Testbed & Triggers -->
          <div class="sim-controls">
            <h5 style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.75rem; color: var(--accent-cyan-light);">
              🧪 Mühendislik Test Senaryoları & Uç Durumlar:
            </h5>

            <div class="control-group">
              <span class="text-xs text-muted">1. Kamerasız Edge AI Akustik Ses Sınıflandırması Testi:</span>
              <div class="sim-action-row" style="margin-top: 0.25rem;">
                <button class="btn btn-outline btn-sm btn-danger-soft" onclick="Simulations.triggerDormosAudio('scream')">
                  🗣️ Panik Çığlığı Simüle Et
                </button>
                <button class="btn btn-outline btn-sm btn-danger-soft" onclick="Simulations.triggerDormosAudio('glass_break')">
                  💥 Cam Kırılması Simüle Et
                </button>
              </div>
            </div>

            <div class="control-group" style="margin-top: 0.75rem;">
              <span class="text-xs text-muted">2. Askeri Seviye Çökmez Ağ (Fail-Safe Mesh) Testi:</span>
              <button class="btn btn-outline btn-sm" onclick="Simulations.toggleDormosFiber()" style="margin-top: 0.25rem;">
                ${d.meshFailoverActive ? '🌐 Ana Fiber Kabloyu Onar' : '✂️ Ana Fiber İnternet Kablosunu Kes (85ms Mesh Testi)'}
              </button>
            </div>

            <div class="control-group" style="margin-top: 0.75rem;">
              <span class="text-xs text-muted">3. Döngüsel Ekonomi & Su Tüketimi:</span>
              <button class="btn btn-outline btn-sm" onclick="Simulations.dispenseDormosWater()" style="margin-top: 0.25rem;">
                💧 Kattan 1L Arıtma Su Doldur (+2 Pet Şişe Kurtar)
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  triggerDormosAudio(type) {
    if (this.dormos.verificationTimerId) {
      clearInterval(this.dormos.verificationTimerId);
    }
    this.dormos.audioEvent = type;
    this.dormos.verificationSeconds = 15;
    this.renderDormosSim();

    this.dormos.verificationTimerId = setInterval(() => {
      if (this.dormos.verificationSeconds > 1) {
        this.dormos.verificationSeconds -= 1;
        this.renderDormosSim();
      } else {
        clearInterval(this.dormos.verificationTimerId);
        this.dormos.verificationSeconds = 0;
        alert(`🚨 ACİL DURUM: 15 saniye içinde iptal edilmedi!\nLobi Güvenlik Merkezi ve Kat Görevlilerine ODA #${this.dormos.roomNo} için ACİL MÜDAHALE BİLDİRİMİ gönderildi.`);
        this.renderDormosSim();
      }
    }, 1000);
  },

  cancelDormosAlert() {
    if (this.dormos.verificationTimerId) {
      clearInterval(this.dormos.verificationTimerId);
    }
    this.dormos.verificationSeconds = 0;
    this.dormos.audioEvent = 'none';
    alert("✅ Sahte alarm doğrulandı ve iptal edildi. Güvenlik merkezine 'Öğrenci Güvende' sinyali iletildi.");
    this.renderDormosSim();
  },

  toggleDormosFiber() {
    this.dormos.meshFailoverActive = !this.dormos.meshFailoverActive;
    if (this.dormos.meshFailoverActive) {
      this.dormos.networkMode = "Thread / ESP-NOW 85ms Radyo Mesh (Acil Durum)";
      alert("⚠️ ANA FİBER KOPTU!\nSistem 85 milisaniyede odadan odaya sekerek (Node-Hopping) kablosuz Thread/ESP-NOW telsiz mesh ağına geçti. Güvenlik iletişimi %100 kesintisiz devam ediyor.");
    } else {
      this.dormos.networkMode = "Ethernet PoE (Primary 1Gbps)";
    }
    this.renderDormosSim();
  },

  toggleDormosDnd() {
    this.dormos.dndMode = !this.dormos.dndMode;
    this.renderDormosSim();
  },

  requestDormosSoup() {
    this.dormos.infirmaryService = true;
    alert("🍲 Revir ve Yemekhane bilgilendirildi: Oda #304 için sıcak çorba ve vitamin takviyesi yönlendirildi.");
    this.renderDormosSim();
  },

  dispenseDormosWater() {
    this.dormos.litersDispensed += 1;
    this.dormos.bottlesSaved += 2;
    this.renderDormosSim();
  }
};

window.Simulations = Simulations;

