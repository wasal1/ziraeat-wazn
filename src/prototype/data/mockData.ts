// ═══════════════════════════════════════════
// بيانات وهمية — منصة حصاد الذكية
// ═══════════════════════════════════════════

export const PLATFORM = {
  name: 'منصة وزن الزراعية الذكية',
  tagline: 'إدارة وتحليل المحاصيل الزراعية من الزراعة إلى الربحية',
  farm: 'مزرعة النخيل',
  location: 'الرياض — حرة رهاط',
  user: 'عبدالله العندس',
  role: 'مدير المزرعة',
};

// ─── لوحة التحكم ────────────────────────────
export const dashboardKPIs = [
  { id: 'farms',      label: 'المزارع',             value: 3,      unit: '',      icon: '🏡', color: 'green',  trend: null },
  { id: 'fields',     label: 'الحقول',              value: 18,     unit: '',      icon: '🌾', color: 'sky',    trend: null },
  { id: 'greenhouses',label: 'البيوت المحمية',       value: 42,     unit: '',      icon: '🏠', color: 'amber',  trend: null },
  { id: 'cycles',     label: 'الدورات النشطة',       value: 27,     unit: '',      icon: '🔄', color: 'purple', trend: null },
  { id: 'production', label: 'إنتاج اليوم',          value: 4850,   unit: 'كجم',   icon: '📦', color: 'green',  trend: { val: 7,  up: true  } },
  { id: 'sales',      label: 'مبيعات اليوم',         value: 18700,  unit: 'ريال',  icon: '💰', color: 'sky',    trend: { val: 12, up: true  } },
  { id: 'expenses',   label: 'مصروفات اليوم',        value: 6250,   unit: 'ريال',  icon: '💸', color: 'amber',  trend: { val: 3,  up: false } },
  { id: 'profit',     label: 'صافي الربح المتوقع',   value: 12450,  unit: 'ريال',  icon: '📈', color: 'green',  trend: { val: 15, up: true  } },
];

export const dashboardAlerts = [
  { id: 1, level: 'danger',  title: 'ارتفاع ملوحة المياه',        desc: 'محطة التحلية رقم 1 — EC: 1.8 mS/cm (الحد المسموح: 1.2)',      time: 'منذ ساعتين' },
  { id: 2, level: 'warning', title: 'زيادة تكلفة الكهرباء',        desc: 'البيت المحمي رقم 7 — تجاوز المتوسط بنسبة 18% هذا الأسبوع',    time: 'منذ 4 ساعات' },
  { id: 3, level: 'warning', title: 'انخفاض إنتاج الخيار',         desc: 'بيت رقم 2 — انخفض بنسبة 18% مقارنة بالأسبوع الماضي',          time: 'منذ يوم' },
];

export const weeklyProduction = [
  { day: 'السبت', value: 4200 },
  { day: 'الأحد', value: 4550 },
  { day: 'الإثنين', value: 4100 },
  { day: 'الثلاثاء', value: 4820 },
  { day: 'الأربعاء', value: 5100 },
  { day: 'الخميس', value: 4850 },
  { day: 'الجمعة', value: 3900 },
];

export const cropDistribution = [
  { name: 'خيار',    value: 35, color: '#16a34a' },
  { name: 'طماطم',   value: 28, color: '#0ea5e9' },
  { name: 'فلفل',    value: 15, color: '#f59e0b' },
  { name: 'باذنجان', value: 12, color: '#8b5cf6' },
  { name: 'أخرى',    value: 10, color: '#6b7280' },
];

export const topCrops = [
  { name: 'خيار',    profit: 8300, production: 9800 },
  { name: 'طماطم',   profit: 6200, production: 7400 },
  { name: 'فلفل',    profit: 4100, production: 2900 },
  { name: 'باذنجان', profit: 2800, production: 3200 },
];

export const topGreenhouses = [
  { name: 'بيت رقم 7',  crop: 'خيار',   production: 410, status: 'يحتاج متابعة' },
  { name: 'بيت رقم 1',  crop: 'خيار',   production: 390, status: 'ممتاز' },
  { name: 'بيت رقم 12', crop: 'طماطم',  production: 340, status: 'جيد' },
  { name: 'بيت رقم 3',  crop: 'فلفل',   production: 210, status: 'جيد' },
];

// ─── الدورة الزراعية ────────────────────────
export const growingCycle = {
  title:            'خيار — بيت محمي رقم 7',
  cultivationType:  'الزراعة المحمية المكيفة',
  crop:             'خيار',
  variety:          'خيار بيت محمي — Syngenta',
  startDate:        '2026-01-10',
  expectedEnd:      '2026-03-25',
  plantCount:       1350,
  area:             '480 م²',
  agedays:          42,
  status:           'نشطة',

  summary: {
    production:  9800,
    sales:       24500,
    costs:       16200,
    profit:      8300,
    costPerKg:   1.65,
    profitPerKg: 0.85,
  },

  productionChart: [
    { week: 'أسبوع 1', value: 1200 },
    { week: 'أسبوع 2', value: 2100 },
    { week: 'أسبوع 3', value: 2950 },
    { week: 'أسبوع 4', value: 3200 },
    { week: 'أسبوع 5', value: 3600 },
    { week: 'أسبوع 6', value: 4100 },
  ],

  costBreakdown: [
    { label: 'بذور وشتلات', value: 2400, pct: 14.8 },
    { label: 'أسمدة',       value: 3200, pct: 19.8 },
    { label: 'مبيدات',      value: 800,  pct: 4.9  },
    { label: 'عمالة',       value: 4500, pct: 27.8 },
    { label: 'مياه',        value: 1032, pct: 6.4  },
    { label: 'كهرباء',      value: 3268, pct: 20.2 },
    { label: 'تعبئة ونقل',  value: 1000, pct: 6.2  },
  ],

  recentOps: [
    { date: '2026-02-20', type: 'ري',       detail: '3.5 م³ — محطة التحلية رقم 1', worker: 'أحمد',   cost: '8.40 ريال' },
    { date: '2026-02-19', type: 'تسميد',    detail: 'نترات كالسيوم — 25 كجم',       worker: 'محمد',   cost: '112 ريال'  },
    { date: '2026-02-19', type: 'حصاد',     detail: '410 كجم — درجة أولى 92%',      worker: 'خالد',   cost: '350 ريال'  },
    { date: '2026-02-18', type: 'رش وقائي', detail: 'بياض دقيقي — جرعة وقائية',     worker: 'يوسف',   cost: '180 ريال'  },
    { date: '2026-02-17', type: 'تقليم',    detail: 'تقليم الفروع الجانبية',         worker: 'أحمد',   cost: '200 ريال'  },
  ],

  irrigation: [
    { date: '2026-02-20', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', qty: '3.5 م³', cost: '8.40 ريال' },
    { date: '2026-02-19', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', qty: '3.5 م³', cost: '8.40 ريال' },
    { date: '2026-02-18', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '50 دقيقة', qty: '4.0 م³', cost: '9.60 ريال' },
    { date: '2026-02-17', source: 'بئر رقم 1',           method: 'تنقيط', duration: '45 دقيقة', qty: '3.5 م³', cost: '2.80 ريال' },
  ],
};

// ─── الزراعة المحمية المكيفة ─────────────────
export const cooledGreenhouse = {
  id:          7,
  name:        'بيت محمي مكيف رقم 7',
  crop:        'خيار',
  variety:     'خيار بيت محمي',
  plantCount:  1350,
  plantDate:   '2026-01-10',
  area:        '480 م²',
  status:      'يحتاج متابعة',

  climate: {
    temp:     27,
    humidity: 68,
    tempIdeal:  { min: 22, max: 28 },
    humidIdeal: { min: 60, max: 75 },
  },

  operation: {
    fans:      9,
    cooling:   7,
    fog:       3,
    pumps:     12,
    lighting:  6,
  },

  electricity: {
    kwh:        320,
    cost:       176,
    costPerKg:  0.43,
    avgKwh:     272,
    avgCost:    150,
    weeklyKwh:  [260, 280, 300, 310, 320, 315, 320],
  },

  production: {
    daily:        410,
    total:        9800,
    perPlant:     0.30,
    qualityA:     92,
    qualityB:     6,
    damaged:      2,
  },

  viability: {
    status:     'يحتاج متابعة',
    message:    'تكلفة الكهرباء مرتفعة بنسبة 18% مقارنة بمتوسط البيوت المشابهة.',
    suggestion: 'يُنصح بتقليل ساعات تشغيل خلايا التبريد بمقدار 2 ساعة خلال فترات انخفاض درجة الحرارة الخارجية.',
  },
};

export const cooledComparison = [
  { name: 'بيت رقم 3', crop: 'فلفل',   production: 210, kwh: 280, costPerKg: 0.37, status: 'جيد'           },
  { name: 'بيت رقم 5', crop: 'طماطم',  production: 290, kwh: 295, costPerKg: 0.39, status: 'جيد'           },
  { name: 'بيت رقم 7', crop: 'خيار',   production: 410, kwh: 320, costPerKg: 0.43, status: 'يحتاج متابعة'  },
];

// ─── الري ومصادر المياه ──────────────────────
export const waterSources = [
  {
    id:     1,
    name:   'بئر رقم 1',
    type:   'بئر',
    active: true,
    cost:   0.80,
    ec:     1.20,
    tds:    650,
    ph:     7.1,
    notes:  'المصدر الرئيسي — صيانة دورية شهرية',
    ecStatus: 'normal',
  },
  {
    id:     2,
    name:   'محطة التحلية رقم 1',
    type:   'محطة تحلية',
    active: true,
    cost:   2.40,
    ec:     0.90,
    tds:    420,
    ph:     7.0,
    notes:  'مياه محلاة عالية الجودة',
    ecStatus: 'normal',
    desalination: {
      dailyCapacity:    60,
      lastMaintenance:  '2026-02-01',
      ecBefore:         4.8,
      ecAfter:          0.9,
      tdsBefore:        2800,
      tdsAfter:         420,
      status:           'جيدة',
      reduction:        81,
    },
  },
  {
    id:     3,
    name:   'خزان رئيسي',
    type:   'خزان',
    active: true,
    cost:   0,
    ec:     1.00,
    tds:    500,
    ph:     7.2,
    notes:  'سعة 200 م³ — احتياطي',
    ecStatus: 'normal',
  },
  {
    id:     4,
    name:   'صهاريج',
    type:   'صهاريج',
    active: false,
    cost:   4.50,
    ec:     0.80,
    tds:    380,
    ph:     7.0,
    notes:  'تستخدم في حالات الطوارئ',
    ecStatus: 'normal',
  },
];

export const waterStats = {
  totalM3:          430,
  totalCost:        1032,
  costPerKg:        0.11,
  m3PerKg:          0.044,
  salinityAlert:    'متوسط',
};

export const irrigationRecords = [
  { id: 1, cycle: 'خيار — بيت رقم 7',    source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', qty: '3.5', cost: '8.40',  date: '2026-02-20' },
  { id: 2, cycle: 'طماطم — بيت رقم 2',   source: 'بئر رقم 1',           method: 'تنقيط', duration: '60 دقيقة', qty: '4.8', cost: '3.84',  date: '2026-02-20' },
  { id: 3, cycle: 'حقل طماطم — حقل 1',   source: 'بئر رقم 1',           method: 'رش',    duration: '90 دقيقة', qty: '12',  cost: '9.60',  date: '2026-02-19' },
  { id: 4, cycle: 'خيار — بيت رقم 1',    source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', qty: '3.5', cost: '8.40',  date: '2026-02-19' },
  { id: 5, cycle: 'فلفل — بيت رقم 3',    source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '40 دقيقة', qty: '3.0', cost: '7.20',  date: '2026-02-18' },
];

export const waterQuality = [
  { source: 'بئر رقم 1',           date: '2026-02-20', ec: 1.20, tds: 650,  ph: 7.1, status: 'مقبول'   },
  { source: 'محطة التحلية رقم 1', date: '2026-02-20', ec: 0.90, tds: 420,  ph: 7.0, status: 'ممتاز'   },
  { source: 'خزان رئيسي',          date: '2026-02-18', ec: 1.00, tds: 500,  ph: 7.2, status: 'جيد'     },
  { source: 'بئر رقم 1',           date: '2026-02-15', ec: 1.35, tds: 710,  ph: 7.3, status: 'يحتاج متابعة' },
];

// ─── المزارع والحقول ─────────────────────────
export const farms = [
  {
    id: 1,
    name: 'مزرعة النخيل',
    location: 'الرياض — حرة رهاط',
    area: '12,000 م²',
    greenhouses: 18,
    fields: 6,
    status: 'نشطة',
    manager: 'أحمد الغامدي',
    phone: '0501234567',
    activeCycles: 12,
    dailyProduction: 2850,
    monthlyRevenue: 94500,
    crops: ['خيار', 'طماطم', 'فلفل'],
    lat: 24.68,
    lng: 46.72,
  },
  {
    id: 2,
    name: 'مزرعة الواحة',
    location: 'القصيم — بريدة',
    area: '8,500 م²',
    greenhouses: 14,
    fields: 8,
    status: 'نشطة',
    manager: 'محمد العتيبي',
    phone: '0507654321',
    activeCycles: 9,
    dailyProduction: 1640,
    monthlyRevenue: 62000,
    crops: ['طماطم', 'باذنجان', 'كوسة'],
    lat: 26.33,
    lng: 43.97,
  },
  {
    id: 3,
    name: 'مزرعة الربوة',
    location: 'المدينة المنورة — العيص',
    area: '6,200 م²',
    greenhouses: 10,
    fields: 4,
    status: 'صيانة',
    manager: 'خالد الزهراني',
    phone: '0509876543',
    activeCycles: 6,
    dailyProduction: 360,
    monthlyRevenue: 18200,
    crops: ['فلفل', 'خيار'],
    lat: 25.61,
    lng: 38.10,
  },
];

export const fields = [
  { id: 1, farm: 'مزرعة النخيل',  name: 'بيت رقم 1',  type: 'بيت مكيف', area: '480 م²', crop: 'خيار',    status: 'نشطة',       production: 390, cycle: 'دورة 42 يوم' },
  { id: 2, farm: 'مزرعة النخيل',  name: 'بيت رقم 2',  type: 'بيت مكيف', area: '480 م²', crop: 'خيار',    status: 'يحتاج متابعة', production: 320, cycle: 'دورة 38 يوم' },
  { id: 3, farm: 'مزرعة النخيل',  name: 'بيت رقم 3',  type: 'بيت مكيف', area: '480 م²', crop: 'فلفل',    status: 'جيد',        production: 210, cycle: 'دورة 55 يوم' },
  { id: 4, farm: 'مزرعة النخيل',  name: 'بيت رقم 7',  type: 'بيت مكيف', area: '480 م²', crop: 'خيار',    status: 'يحتاج متابعة', production: 410, cycle: 'دورة 42 يوم' },
  { id: 5, farm: 'مزرعة النخيل',  name: 'حقل 1',       type: 'حقل مكشوف',area: '2000 م²',crop: 'طماطم',   status: 'جيد',        production: 820, cycle: 'دورة 65 يوم' },
  { id: 6, farm: 'مزرعة الواحة',  name: 'بيت رقم 12', type: 'بيت مظلل', area: '600 م²', crop: 'طماطم',   status: 'ممتاز',      production: 340, cycle: 'دورة 50 يوم' },
  { id: 7, farm: 'مزرعة الواحة',  name: 'بيت رقم 13', type: 'بيت مظلل', area: '600 م²', crop: 'باذنجان', status: 'جيد',        production: 280, cycle: 'دورة 48 يوم' },
  { id: 8, farm: 'مزرعة الربوة',  name: 'بيت رقم 5',  type: 'بيت مظلل', area: '500 م²', crop: 'فلفل',    status: 'صيانة',      production: 0,   cycle: '—' },
];

// ─── المزروعات ────────────────────────────────
export const crops = [
  {
    id: 1,
    name: 'خيار',
    category: 'خضروات',
    variety: 'خيار بيت محمي — Syngenta',
    icon: '🥒',
    color: '#16a34a',
    activeCycles: 8,
    avgYieldPerM2: 22,
    avgCostPerKg: 1.65,
    avgPricePerKg: 2.50,
    avgMargin: 33.9,
    growthDays: { min: 35, max: 60 },
    tempRange: '22–28 °C',
    humidRange: '60–75 %',
    waterPerDay: '3.5 م³/1000م²',
    notes: 'الأفضل أداءً في الزراعة المحمية المكيفة',
    status: 'ممتاز',
  },
  {
    id: 2,
    name: 'طماطم',
    category: 'خضروات',
    variety: 'طماطم عنقودية — Rijk Zwaan',
    icon: '🍅',
    color: '#ef4444',
    activeCycles: 6,
    avgYieldPerM2: 18,
    avgCostPerKg: 1.80,
    avgPricePerKg: 2.80,
    avgMargin: 35.7,
    growthDays: { min: 60, max: 90 },
    tempRange: '20–26 °C',
    humidRange: '55–70 %',
    waterPerDay: '4.0 م³/1000م²',
    notes: 'يحتاج تدعيم وتقليم أسبوعي',
    status: 'جيد',
  },
  {
    id: 3,
    name: 'فلفل',
    category: 'خضروات',
    variety: 'فلفل ألوان — Enza Zaden',
    icon: '🫑',
    color: '#f59e0b',
    activeCycles: 5,
    avgYieldPerM2: 12,
    avgCostPerKg: 2.20,
    avgPricePerKg: 4.50,
    avgMargin: 51.1,
    growthDays: { min: 70, max: 100 },
    tempRange: '21–27 °C',
    humidRange: '60–70 %',
    waterPerDay: '3.0 م³/1000م²',
    notes: 'هامش ربح مرتفع — طلب سوقي ثابت',
    status: 'ممتاز',
  },
  {
    id: 4,
    name: 'باذنجان',
    category: 'خضروات',
    variety: 'باذنجان بلدي',
    icon: '🍆',
    color: '#8b5cf6',
    activeCycles: 3,
    avgYieldPerM2: 14,
    avgCostPerKg: 1.50,
    avgPricePerKg: 2.20,
    avgMargin: 31.8,
    growthDays: { min: 60, max: 80 },
    tempRange: '22–30 °C',
    humidRange: '50–65 %',
    waterPerDay: '3.2 م³/1000م²',
    notes: 'يتحمل درجات حرارة مرتفعة نسبياً',
    status: 'جيد',
  },
  {
    id: 5,
    name: 'كوسة',
    category: 'خضروات',
    variety: 'كوسة خضراء — Bayer',
    icon: '🥬',
    color: '#0ea5e9',
    activeCycles: 2,
    avgYieldPerM2: 16,
    avgCostPerKg: 1.40,
    avgPricePerKg: 2.00,
    avgMargin: 30.0,
    growthDays: { min: 40, max: 60 },
    tempRange: '20–28 °C',
    humidRange: '55–70 %',
    waterPerDay: '3.5 م³/1000م²',
    notes: 'دورة إنتاج قصيرة — مناسب للتناوب',
    status: 'جيد',
  },
  {
    id: 6,
    name: 'نعناع',
    category: 'أعشاب',
    variety: 'نعناع بلدي',
    icon: '🌿',
    color: '#10b981',
    activeCycles: 1,
    avgYieldPerM2: 8,
    avgCostPerKg: 3.00,
    avgPricePerKg: 12.00,
    avgMargin: 75.0,
    growthDays: { min: 30, max: 45 },
    tempRange: '15–22 °C',
    humidRange: '60–80 %',
    waterPerDay: '2.5 م³/1000م²',
    notes: 'هامش ربح مرتفع جداً — سوق متخصص',
    status: 'يحتاج متابعة',
  },
];

export const cropMonthlyProduction = [
  { month: 'يناير',  خيار: 8200, طماطم: 5400, فلفل: 2200 },
  { month: 'فبراير', خيار: 9800, طماطم: 6100, فلفل: 2900 },
  { month: 'مارس',   خيار: 10500,طماطم: 7200, فلفل: 3100 },
  { month: 'أبريل',  خيار: 9200, طماطم: 6800, فلفل: 2800 },
  { month: 'مايو',   خيار: 7800, طماطم: 5900, فلفل: 2400 },
];

// ─── العمليات الزراعية ────────────────────────
export const operationsData = [
  { id: 1, date: '2026-05-15', type: 'حصاد',     farm: 'مزرعة النخيل', cycle: 'خيار — بيت 7',    worker: 'أحمد الغامدي', duration: '3 ساعات', cost: 350,  qty: '410 كجم',  status: 'مكتملة' },
  { id: 2, date: '2026-05-15', type: 'ري',         farm: 'مزرعة النخيل', cycle: 'طماطم — حقل 1',   worker: 'محمد الشهري',  duration: '1 ساعة',  cost: 18,   qty: '12 م³',     status: 'مكتملة' },
  { id: 3, date: '2026-05-15', type: 'تسميد',      farm: 'مزرعة الواحة', cycle: 'طماطم — بيت 12',  worker: 'خالد البلوي',  duration: '2 ساعة',  cost: 112,  qty: '25 كجم',   status: 'مكتملة' },
  { id: 4, date: '2026-05-14', type: 'رش وقائي',   farm: 'مزرعة النخيل', cycle: 'خيار — بيت 2',    worker: 'يوسف العمري',  duration: '2 ساعة',  cost: 180,  qty: '—',         status: 'مكتملة' },
  { id: 5, date: '2026-05-14', type: 'تقليم',       farm: 'مزرعة النخيل', cycle: 'خيار — بيت 1',    worker: 'أحمد الغامدي', duration: '4 ساعات', cost: 200,  qty: '—',         status: 'مكتملة' },
  { id: 6, date: '2026-05-13', type: 'زراعة',       farm: 'مزرعة الواحة', cycle: 'كوسة — بيت 15',   worker: 'محمد الشهري',  duration: '6 ساعات', cost: 840,  qty: '800 شتلة', status: 'مكتملة' },
  { id: 7, date: '2026-05-13', type: 'حصاد',        farm: 'مزرعة الواحة', cycle: 'طماطم — بيت 12',  worker: 'خالد البلوي',  duration: '3 ساعات', cost: 280,  qty: '340 كجم',  status: 'مكتملة' },
  { id: 8, date: '2026-05-12', type: 'صيانة',       farm: 'مزرعة الربوة', cycle: '—',               worker: 'فهد القحطاني', duration: '5 ساعات', cost: 1200, qty: '—',         status: 'قيد التنفيذ' },
  { id: 9, date: '2026-05-12', type: 'ري',           farm: 'مزرعة النخيل', cycle: 'فلفل — بيت 3',    worker: 'يوسف العمري',  duration: '1 ساعة',  cost: 12,   qty: '8 م³',      status: 'مكتملة' },
  { id:10, date: '2026-05-11', type: 'تعبئة ونقل',  farm: 'مزرعة النخيل', cycle: 'خيار — بيت 7',    worker: 'أحمد الغامدي', duration: '2 ساعة',  cost: 320,  qty: '1.2 طن',   status: 'مكتملة' },
];

export const operationStats = {
  thisWeek:   47,
  totalCost:  8420,
  topType:    'ري',
  harvested:  '2.1 طن',
};

export const operationTypeChart = [
  { type: 'ري',         count: 14, color: '#0ea5e9' },
  { type: 'حصاد',       count: 9,  color: '#16a34a' },
  { type: 'تسميد',      count: 8,  color: '#f59e0b' },
  { type: 'تقليم',      count: 7,  color: '#8b5cf6' },
  { type: 'رش وقائي',   count: 5,  color: '#ef4444' },
  { type: 'أخرى',       count: 4,  color: '#6b7280' },
];

// ─── العمال ──────────────────────────────────
export const workers = [
  { id: 1, name: 'أحمد الغامدي',  role: 'مشرف مزرعة',    farm: 'مزرعة النخيل', nationality: 'سعودي',  hoursToday: 8,  hoursMonth: 168, salary: 4500,  status: 'حاضر',   tasks: 3 },
  { id: 2, name: 'محمد الشهري',   role: 'عامل زراعة',     farm: 'مزرعة النخيل', nationality: 'يمني',   hoursToday: 8,  hoursMonth: 160, salary: 1800,  status: 'حاضر',   tasks: 2 },
  { id: 3, name: 'خالد البلوي',   role: 'عامل زراعة',     farm: 'مزرعة الواحة', nationality: 'يمني',   hoursToday: 8,  hoursMonth: 155, salary: 1800,  status: 'حاضر',   tasks: 4 },
  { id: 4, name: 'يوسف العمري',   role: 'فني ري',          farm: 'مزرعة النخيل', nationality: 'مصري',   hoursToday: 8,  hoursMonth: 162, salary: 2200,  status: 'حاضر',   tasks: 2 },
  { id: 5, name: 'فهد القحطاني',  role: 'فني كهرباء',      farm: 'مزرعة الربوة', nationality: 'سعودي',  hoursToday: 6,  hoursMonth: 140, salary: 3200,  status: 'في مهمة', tasks: 1 },
  { id: 6, name: 'عمر الزهراني',  role: 'عامل حصاد',      farm: 'مزرعة النخيل', nationality: 'سوداني', hoursToday: 0,  hoursMonth: 148, salary: 1600,  status: 'إجازة',  tasks: 0 },
  { id: 7, name: 'سالم المطيري',  role: 'سائق ناقلة',     farm: 'مزرعة النخيل', nationality: 'سعودي',  hoursToday: 7,  hoursMonth: 158, salary: 2800,  status: 'حاضر',   tasks: 1 },
  { id: 8, name: 'نواف الحربي',   role: 'عامل زراعة',     farm: 'مزرعة الواحة', nationality: 'إثيوبي', hoursToday: 8,  hoursMonth: 165, salary: 1600,  status: 'حاضر',   tasks: 3 },
];

export const workerStats = {
  total:       8,
  present:     6,
  onLeave:     1,
  onMission:   1,
  monthlyLabor: 19500,
  avgHours:    157,
};

export const laborCostChart = [
  { month: 'يناير',  cost: 18200 },
  { month: 'فبراير', cost: 19000 },
  { month: 'مارس',   cost: 20100 },
  { month: 'أبريل',  cost: 18800 },
  { month: 'مايو',   cost: 19500 },
];

export const attendanceToday = [
  { time: '06:00', arrivals: 4 },
  { time: '07:00', arrivals: 2 },
  { time: '08:00', arrivals: 1 },
  { time: '09:00', arrivals: 1 },
];

// ─── التحليل الذكي ───────────────────────────
export const smartAnalysis = {
  score:         82,
  riskLevel:     'متوسط',
  profitability: 'جيدة',
  waterEff:      'جيدة',
  electricityEff:'تحتاج متابعة',

  kpis: [
    { label: 'تكلفة الكيلو',             value: '1.65 ريال', benchmark: '2.00 ريال', good: true  },
    { label: 'تكلفة الكهرباء / كجم',     value: '0.43 ريال', benchmark: '0.35 ريال', good: false },
    { label: 'استهلاك المياه / كجم',      value: '0.044 م³',  benchmark: '0.05 م³',   good: true  },
    { label: 'إنتاج النبات / يوم',        value: '0.30 كجم',  benchmark: '0.28 كجم',  good: true  },
    { label: 'نسبة الجودة الأولى',        value: '92%',        benchmark: '85%',        good: true  },
    { label: 'هامش الربح',               value: '33.9%',      benchmark: '30%',        good: true  },
  ],

  risks: [
    { level: 'خطر',    title: 'ارتفاع تكلفة الكهرباء',          desc: 'تجاوزت تكلفة الكهرباء في البيت رقم 7 المتوسط المقبول بنسبة 18%' },
    { level: 'تحذير',  title: 'زيادة استهلاك المياه',            desc: 'استهلاك المياه في الأسبوع الأخير أعلى من المتوسط بنسبة 12%' },
    { level: 'تحذير',  title: 'انخفاض الإنتاج — الأسبوع الرابع', desc: 'انخفض متوسط الإنتاج اليومي من 450 إلى 410 كجم' },
    { level: 'معلومة', title: 'تكرار البياض الدقيقي',            desc: 'ظهر البياض الدقيقي في بيت رقم 2 للمرة الثانية هذا الموسم' },
  ],

  aiReport: {
    summary:
      'أظهرت الدورة الزراعية لمحصول الخيار في البيت رقم 7 أداءً جيداً بشكل عام، مع تحديات واضحة في إدارة تكلفة الطاقة. الإنتاج الإجمالي يسير وفق التوقعات مع انخفاض طفيف في الأسبوع الرابع.',
    weaknesses: [
      'ارتفاع تكلفة الكهرباء بنسبة 18% مقارنة بالبيوت المشابهة',
      'ساعات تشغيل خلايا التبريد تتجاوز الحاجة الفعلية بمقدار 2-3 ساعات يومياً',
      'انخفاض طفيف في إنتاج الأسبوع الرابع يستوجب المتابعة',
    ],
    strengths: [
      'نسبة تحقيق هدف الإنتاج 98% — أداء ممتاز',
      'جودة المياه بعد التحلية ممتازة EC: 0.9',
      'لا توجد إصابات بالأمراض حتى الآن',
      'كفاءة التسميد جيدة وفق البرنامج المتبع',
    ],
    recommendations: [
      'مراجعة جدول تشغيل التبريد خلال ساعات الذروة وتقليل مدة التشغيل غير المؤثرة على الإنتاج',
      'تركيب حساس درجة حرارة ذكي لضبط التشغيل تلقائياً بناءً على درجة الحرارة الداخلية',
      'مراقبة EC لمصدر المياه قبل كل دورة تسميد للحد من تراكم الأملاح',
      'زيادة جرعة السماد في الأسبوع الخامس لتعويض الانخفاض الملحوظ',
    ],
    nextSeason:
      'يُنصح بإعادة زراعة الخيار في الموسم القادم مع تحسين جدول التبريد وإضافة برنامج وقائي مبكر للبياض الدقيقي. الهدف: رفع الإنتاج بنسبة 10-15% مع تخفيض تكلفة الكهرباء بنسبة 15%.',
  },
};

// ─── المحاسبة ────────────────────────────────
export const accountingMonthly = [
  { month: 'يناير',  revenue: 72000, expenses: 48000, profit: 24000 },
  { month: 'فبراير', revenue: 85000, expenses: 52000, profit: 33000 },
  { month: 'مارس',   revenue: 91000, expenses: 54000, profit: 37000 },
  { month: 'أبريل',  revenue: 88000, expenses: 51000, profit: 37000 },
  { month: 'مايو',   revenue: 94500, expenses: 57000, profit: 37500 },
];

export const accountingKPIs = {
  totalRevenue:   431000,
  totalExpenses:  262000,
  netProfit:      169000,
  profitMargin:   39.2,
  breakEven:      52000,
  revenueTarget:  500000,
  targetAchieved: 86.2,
};

export const expenseBreakdown = [
  { label: 'عمالة',          value: 97500, pct: 37.2, color: '#0ea5e9' },
  { label: 'أسمدة',          value: 46800, pct: 17.9, color: '#16a34a' },
  { label: 'كهرباء',         value: 39200, pct: 15.0, color: '#f59e0b' },
  { label: 'مياه',           value: 20900, pct: 8.0,  color: '#8b5cf6' },
  { label: 'بذور وشتلات',    value: 26200, pct: 10.0, color: '#ec4899' },
  { label: 'مبيدات',         value: 13100, pct: 5.0,  color: '#ef4444' },
  { label: 'تعبئة ونقل',     value: 18300, pct: 7.0,  color: '#6b7280' },
];

export const revenueByFarm = [
  { farm: 'مزرعة النخيل', revenue: 256000, expenses: 148000, profit: 108000 },
  { farm: 'مزرعة الواحة', revenue: 132000, expenses:  84000, profit:  48000 },
  { farm: 'مزرعة الربوة', revenue:  43000, expenses:  30000, profit:  13000 },
];

export const transactions = [
  { id: 1, date: '2026-05-15', type: 'إيراد',   desc: 'مبيعات خيار — مزرعة النخيل',  amount: 18700, farm: 'مزرعة النخيل', category: 'مبيعات' },
  { id: 2, date: '2026-05-15', type: 'مصروف',   desc: 'فاتورة كهرباء — مايو',         amount: -4800, farm: 'مزرعة النخيل', category: 'كهرباء' },
  { id: 3, date: '2026-05-14', type: 'إيراد',   desc: 'مبيعات طماطم — مزرعة الواحة', amount: 9600,  farm: 'مزرعة الواحة', category: 'مبيعات' },
  { id: 4, date: '2026-05-14', type: 'مصروف',   desc: 'شراء أسمدة — نترات كالسيوم',   amount: -3200, farm: 'مزرعة النخيل', category: 'أسمدة' },
  { id: 5, date: '2026-05-13', type: 'مصروف',   desc: 'رواتب عمال — مايو (دفعة 1)',   amount: -9750, farm: 'الكل',          category: 'عمالة' },
  { id: 6, date: '2026-05-13', type: 'إيراد',   desc: 'مبيعات فلفل — مزرعة النخيل',  amount: 6300,  farm: 'مزرعة النخيل', category: 'مبيعات' },
  { id: 7, date: '2026-05-12', type: 'مصروف',   desc: 'صيانة بيوت محمية — مزرعة الربوة', amount: -1200, farm: 'مزرعة الربوة', category: 'صيانة' },
  { id: 8, date: '2026-05-12', type: 'إيراد',   desc: 'مبيعات خيار — مزرعة النخيل',  amount: 14200, farm: 'مزرعة النخيل', category: 'مبيعات' },
];

// ─── التسميد ─────────────────────────────────
export const fertilizerInventory = [
  { id: 1, name: 'نترات كالسيوم',   formula: 'Ca(NO₃)₂', n: 15.5, p: 0,    k: 0,    ca: 26.5, stock: 280, unit: 'كجم', minStock: 100, cost: 4.5,  status: 'كافٍ'      },
  { id: 2, name: 'نترات بوتاسيوم',  formula: 'KNO₃',     n: 13,   p: 0,    k: 46,   ca: 0,    stock: 150, unit: 'كجم', minStock: 80,  cost: 6.2,  status: 'كافٍ'      },
  { id: 3, name: 'فوسفات أحادي',    formula: 'MKP',       n: 0,    p: 52,   k: 34,   ca: 0,    stock: 45,  unit: 'كجم', minStock: 50,  cost: 8.8,  status: 'منخفض'     },
  { id: 4, name: 'سلفات مغنيسيوم',  formula: 'MgSO₄',    n: 0,    p: 0,    k: 0,    ca: 0,    stock: 180, unit: 'كجم', minStock: 60,  cost: 3.2,  status: 'كافٍ'      },
  { id: 5, name: 'نترات أمونيوم',   formula: 'NH₄NO₃',   n: 34,   p: 0,    k: 0,    ca: 0,    stock: 20,  unit: 'كجم', minStock: 50,  cost: 3.8,  status: 'نفذ تقريباً'},
  { id: 6, name: 'حديد EDDHA',      formula: 'Fe-EDDHA',  n: 0,    p: 0,    k: 0,    ca: 0,    stock: 12,  unit: 'كجم', minStock: 10,  cost: 42.0, status: 'كافٍ'      },
];

export const fertilizerProgram = [
  { week: 1,  stage: 'نمو خضري',   formula: 'N-P-K: 3-1-2',    n: 210, p: 70,  k: 140, ec: 2.2, note: 'تركيز عالٍ لتحفيز النمو' },
  { week: 2,  stage: 'نمو خضري',   formula: 'N-P-K: 3-1-2',    n: 210, p: 70,  k: 140, ec: 2.3, note: '' },
  { week: 3,  stage: 'إزهار',      formula: 'N-P-K: 2-1-3',    n: 180, p: 90,  k: 270, ec: 2.4, note: 'زيادة البوتاسيوم لتحسين الإزهار' },
  { week: 4,  stage: 'إزهار',      formula: 'N-P-K: 2-1-3',    n: 180, p: 90,  k: 270, ec: 2.4, note: '' },
  { week: 5,  stage: 'عقد الثمار', formula: 'N-P-K: 1-1-2',    n: 140, p: 140, k: 280, ec: 2.5, note: 'تقليل الآزوت لمنع التعضيل' },
  { week: 6,  stage: 'نضج',        formula: 'N-P-K: 1-0.5-2.5',n: 120, p: 60,  k: 300, ec: 2.6, note: 'رفع البوتاسيوم لتحسين الجودة' },
];

export const fertilizerApplications = [
  { id: 1, date: '2026-05-15', cycle: 'خيار — بيت 7',  type: 'نترات كالسيوم', qty: 25,  unit: 'كجم', method: 'تنقيط', ec: 2.4, ph: 6.2, cost: 112, worker: 'محمد الشهري',  note: 'وفق البرنامج الأسبوعي' },
  { id: 2, date: '2026-05-14', cycle: 'طماطم — بيت 12',type: 'نترات بوتاسيوم',qty: 18,  unit: 'كجم', method: 'تنقيط', ec: 2.5, ph: 6.3, cost: 112, worker: 'خالد البلوي',   note: '' },
  { id: 3, date: '2026-05-12', cycle: 'خيار — بيت 1',  type: 'فوسفات أحادي', qty: 12,  unit: 'كجم', method: 'تنقيط', ec: 2.2, ph: 6.4, cost: 106, worker: 'محمد الشهري',  note: 'مرحلة إزهار' },
  { id: 4, date: '2026-05-10', cycle: 'فلفل — بيت 3',  type: 'سلفات مغنيسيوم',qty: 8,   unit: 'كجم', method: 'رش ورقي',ec: 0,   ph: 0,   cost: 26,  worker: 'يوسف العمري',  note: 'علاج نقص المغنيسيوم' },
  { id: 5, date: '2026-05-08', cycle: 'خيار — بيت 7',  type: 'حديد EDDHA',    qty: 2,   unit: 'كجم', method: 'تنقيط', ec: 2.3, ph: 6.2, cost: 84,  worker: 'محمد الشهري',  note: 'وقاية من الاصفرار' },
  { id: 6, date: '2026-05-06', cycle: 'طماطم — حقل 1', type: 'نترات أمونيوم', qty: 30,  unit: 'كجم', method: 'رش',    ec: 0,   ph: 0,   cost: 114, worker: 'أحمد الغامدي', note: 'تصحيح نقص الآزوت' },
];

export const fertilizerCostChart = [
  { week: 'أسبوع 1', cost: 280 },
  { week: 'أسبوع 2', cost: 320 },
  { week: 'أسبوع 3', cost: 390 },
  { week: 'أسبوع 4', cost: 440 },
  { week: 'أسبوع 5', cost: 380 },
  { week: 'أسبوع 6', cost: 420 },
];

// ─── الأمراض والآفات ──────────────────────────
export const pestIncidents = [
  { id: 1, date: '2026-05-13', type: 'مرض',  name: 'بياض دقيقي',    greenhouse: 'بيت رقم 2',  crop: 'خيار',   severity: 'متوسطة', affected: '15%', status: 'قيد العلاج', treatment: 'رش بمبيد Mancozeb', worker: 'يوسف العمري',  followup: '2026-05-18' },
  { id: 2, date: '2026-05-10', type: 'حشرة', name: 'حشرة الذبابة البيضاء', greenhouse: 'بيت رقم 7', crop: 'خيار',   severity: 'خفيفة',  affected: '8%',  status: 'تحت المراقبة', treatment: 'مصائد صفراء + رش وقائي', worker: 'محمد الشهري', followup: '2026-05-17' },
  { id: 3, date: '2026-05-08', type: 'مرض',  name: 'تبقع أوراق',    greenhouse: 'بيت رقم 12', crop: 'طماطم', severity: 'خفيفة',  affected: '5%',  status: 'منتهية',      treatment: 'رش بـ Copper Hydroxide', worker: 'خالد البلوي', followup: '—' },
  { id: 4, date: '2026-05-05', type: 'حشرة', name: 'عنكبوت أحمر',   greenhouse: 'بيت رقم 3',  crop: 'فلفل',  severity: 'شديدة',  affected: '30%', status: 'منتهية',      treatment: 'رش Abamectin + رفع رطوبة', worker: 'أحمد الغامدي', followup: '—' },
  { id: 5, date: '2026-04-28', type: 'مرض',  name: 'عفن جذور',      greenhouse: 'بيت رقم 1',  crop: 'خيار',  severity: 'شديدة',  affected: '20%', status: 'منتهية',      treatment: 'Trichoderma + تصريف جيد', worker: 'يوسف العمري', followup: '—' },
];

export const preventionCalendar = [
  { week: 'أسبوع 1', task: 'رش وقائي ضد البياض الدقيقي', material: 'Sulfur 80 WP', dose: '200 جم/100 لتر', status: 'مكتمل' },
  { week: 'أسبوع 2', task: 'وضع مصائد حشرية',             material: 'مصائد صفراء لاصقة', dose: '4 مصائد/1000م²', status: 'مكتمل' },
  { week: 'أسبوع 3', task: 'رش وقائي ضد العنكبوت',        material: 'Abamectin 1.8%',   dose: '50 مل/100 لتر',  status: 'مجدول' },
  { week: 'أسبوع 4', task: 'مسح وفحص دوري',               material: '—',                 dose: '—',              status: 'مجدول' },
  { week: 'أسبوع 5', task: 'رش نحاس وقائي',               material: 'Copper Hydroxide',  dose: '150 جم/100 لتر', status: 'مجدول' },
  { week: 'أسبوع 6', task: 'فحص خاتمة الموسم',            material: '—',                 dose: '—',              status: 'مجدول' },
];

export const pestStats = {
  activeIncidents: 2,
  resolvedThisMonth: 3,
  affectedGreenhouses: 3,
  preventionCompliance: 85,
  treatmentCostMonth: 1840,
};

export const pesticideUsed = [
  { name: 'Mancozeb 80 WP',   qty: 1.2,  unit: 'كجم',  cost: 84,   type: 'فطري',  target: 'بياض دقيقي' },
  { name: 'Abamectin 1.8%',   qty: 0.5,  unit: 'لتر',  cost: 220,  type: 'حشري',  target: 'عنكبوت' },
  { name: 'Copper Hydroxide', qty: 0.8,  unit: 'كجم',  cost: 112,  type: 'فطري',  target: 'تبقع أوراق' },
  { name: 'Sulfur 80 WP',     qty: 2.0,  unit: 'كجم',  cost: 60,   type: 'وقائي', target: 'بياض دقيقي' },
  { name: 'Trichoderma',      qty: 0.5,  unit: 'كجم',  cost: 180,  type: 'بيولوجي',target: 'عفن جذور' },
];

// ─── الحصاد ──────────────────────────────────
export const harvestRecords = [
  { id: 1,  date: '2026-05-15', greenhouse: 'بيت رقم 7',  crop: 'خيار',   qty: 410, gradeA: 378, gradeB: 25, damaged: 7,  worker: 'أحمد الغامدي', notes: 'جودة ممتازة' },
  { id: 2,  date: '2026-05-15', greenhouse: 'بيت رقم 12', crop: 'طماطم',  qty: 340, gradeA: 306, gradeB: 27, damaged: 7,  worker: 'خالد البلوي',  notes: '' },
  { id: 3,  date: '2026-05-14', greenhouse: 'بيت رقم 7',  crop: 'خيار',   qty: 395, gradeA: 360, gradeB: 28, damaged: 7,  worker: 'أحمد الغامدي', notes: '' },
  { id: 4,  date: '2026-05-14', greenhouse: 'بيت رقم 1',  crop: 'خيار',   qty: 388, gradeA: 350, gradeB: 30, damaged: 8,  worker: 'عمر الزهراني', notes: '' },
  { id: 5,  date: '2026-05-13', greenhouse: 'بيت رقم 3',  crop: 'فلفل',   qty: 210, gradeA: 189, gradeB: 17, damaged: 4,  worker: 'يوسف العمري',  notes: 'بداية موسم الذروة' },
  { id: 6,  date: '2026-05-13', greenhouse: 'حقل 1',       crop: 'طماطم',  qty: 820, gradeA: 738, gradeB: 66, damaged: 16, worker: 'نواف الحربي',  notes: '' },
  { id: 7,  date: '2026-05-12', greenhouse: 'بيت رقم 7',  crop: 'خيار',   qty: 402, gradeA: 362, gradeB: 32, damaged: 8,  worker: 'أحمد الغامدي', notes: '' },
  { id: 8,  date: '2026-05-12', greenhouse: 'بيت رقم 12', crop: 'طماطم',  qty: 328, gradeA: 295, gradeB: 26, damaged: 7,  worker: 'خالد البلوي',  notes: '' },
  { id: 9,  date: '2026-05-11', greenhouse: 'بيت رقم 1',  crop: 'خيار',   qty: 375, gradeA: 338, gradeB: 30, damaged: 7,  worker: 'عمر الزهراني', notes: '' },
  { id: 10, date: '2026-05-11', greenhouse: 'بيت رقم 3',  crop: 'فلفل',   qty: 198, gradeA: 178, gradeB: 16, damaged: 4,  worker: 'يوسف العمري',  notes: '' },
];

export const harvestStats = {
  todayTotal:     750,
  weeklyTotal:    4866,
  monthlyTotal:   18400,
  gradeARate:     90.2,
  targetDaily:    800,
  achievedPct:    93.8,
};

export const harvestDailyChart = [
  { day: 'السبت',    qty: 820 },
  { day: 'الأحد',    qty: 785 },
  { day: 'الإثنين',  qty: 802 },
  { day: 'الثلاثاء', qty: 777 },
  { day: 'الأربعاء', qty: 840 },
  { day: 'الخميس',   qty: 862 },
  { day: 'الجمعة',   qty: 750 },
];

export const harvestByCrop = [
  { crop: 'خيار',   monthly: 9800, target: 10000, gradeA: 92 },
  { crop: 'طماطم',  monthly: 5840, target:  6000, gradeA: 89 },
  { crop: 'فلفل',   monthly: 2760, target:  2800, gradeA: 90 },
];

// ─── المصروفات التفصيلية ──────────────────────
export const expenseRecords = [
  { id: 1,  date: '2026-05-15', category: 'كهرباء',       desc: 'فاتورة كهرباء — مايو',               amount: 4800,  farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: true  },
  { id: 2,  date: '2026-05-14', category: 'أسمدة',        desc: 'شراء نترات كالسيوم 25 كجم',         amount: 112,   farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: false },
  { id: 3,  date: '2026-05-13', category: 'عمالة',        desc: 'رواتب عمال مايو — دفعة 1',          amount: 9750,  farm: 'الكل',           status: 'مدفوع',    recurring: true  },
  { id: 4,  date: '2026-05-12', category: 'صيانة',        desc: 'إصلاح ضخة ري بيت 5',                amount: 1200,  farm: 'مزرعة الربوة',  status: 'مدفوع',    recurring: false },
  { id: 5,  date: '2026-05-11', category: 'مبيدات',       desc: 'شراء Abamectin 1.8% — 0.5 لتر',    amount: 220,   farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: false },
  { id: 6,  date: '2026-05-10', category: 'مياه',         desc: 'فاتورة استهلاك المياه — أبريل',     amount: 1840,  farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: true  },
  { id: 7,  date: '2026-05-09', category: 'تعبئة ونقل',   desc: 'أكياس تعبئة + صناديق — 500 وحدة',  amount: 650,   farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: false },
  { id: 8,  date: '2026-05-08', category: 'أسمدة',        desc: 'شراء حديد EDDHA 2 كجم',             amount: 84,    farm: 'مزرعة النخيل', status: 'مدفوع',    recurring: false },
  { id: 9,  date: '2026-05-07', category: 'إيجار',        desc: 'إيجار أرض مزرعة الواحة — مايو',    amount: 3500,  farm: 'مزرعة الواحة',  status: 'مدفوع',    recurring: true  },
  { id: 10, date: '2026-05-05', category: 'شتلات وبذور',  desc: 'شراء شتلات خيار 500 شتلة',          amount: 1250,  farm: 'مزرعة النخيل', status: 'معلق',     recurring: false },
  { id: 11, date: '2026-05-03', category: 'معدات',        desc: 'شراء مضخة رشاش جديدة',              amount: 2800,  farm: 'مزرعة الواحة',  status: 'معلق',     recurring: false },
  { id: 12, date: '2026-05-01', category: 'كهرباء',       desc: 'فاتورة كهرباء — مزرعة الواحة',     amount: 2200,  farm: 'مزرعة الواحة',  status: 'مدفوع',    recurring: true  },
];

export const budgetVsActual = [
  { category: 'عمالة',       budget: 20000, actual: 19500, color: '#0ea5e9' },
  { category: 'أسمدة',       budget: 10000, actual: 9800,  color: '#16a34a' },
  { category: 'كهرباء',      budget:  8000, actual: 9200,  color: '#f59e0b' },
  { category: 'مياه',        budget:  4000, actual: 3840,  color: '#8b5cf6' },
  { category: 'مبيدات',      budget:  2000, actual: 1840,  color: '#ef4444' },
  { category: 'تعبئة ونقل',  budget:  2500, actual: 2100,  color: '#6b7280' },
  { category: 'صيانة',       budget:  3000, actual: 4200,  color: '#ec4899' },
];

export const expenseMonthlyChart = [
  { month: 'يناير',  amount: 48000 },
  { month: 'فبراير', amount: 52000 },
  { month: 'مارس',   amount: 54000 },
  { month: 'أبريل',  amount: 51000 },
  { month: 'مايو',   amount: 57000 },
];

// ─── المبيعات ─────────────────────────────────
export const salesRecords = [
  { id: 1,  date: '2026-05-15', crop: 'خيار',   qty: 750,  pricePerKg: 2.50, total: 1875,  customer: 'سوق الجملة المركزي', channel: 'جملة',  status: 'مسلّم' },
  { id: 2,  date: '2026-05-15', crop: 'طماطم',  qty: 600,  pricePerKg: 2.80, total: 1680,  customer: 'شركة المزارع الذهبية', channel: 'عقود',  status: 'مسلّم' },
  { id: 3,  date: '2026-05-14', crop: 'خيار',   qty: 700,  pricePerKg: 2.55, total: 1785,  customer: 'سوق الجملة المركزي', channel: 'جملة',  status: 'مسلّم' },
  { id: 4,  date: '2026-05-14', crop: 'فلفل',   qty: 180,  pricePerKg: 4.50, total: 810,   customer: 'مطاعم الأصيل',       channel: 'مطاعم', status: 'مسلّم' },
  { id: 5,  date: '2026-05-13', crop: 'طماطم',  qty: 580,  pricePerKg: 2.75, total: 1595,  customer: 'شركة المزارع الذهبية', channel: 'عقود',  status: 'مسلّم' },
  { id: 6,  date: '2026-05-13', crop: 'خيار',   qty: 820,  pricePerKg: 2.50, total: 2050,  customer: 'سوق الجملة المركزي', channel: 'جملة',  status: 'مسلّم' },
  { id: 7,  date: '2026-05-12', crop: 'فلفل',   qty: 160,  pricePerKg: 4.60, total: 736,   customer: 'مطاعم الأصيل',       channel: 'مطاعم', status: 'مسلّم' },
  { id: 8,  date: '2026-05-11', crop: 'خيار',   qty: 680,  pricePerKg: 2.45, total: 1666,  customer: 'سوق الجملة المركزي', channel: 'جملة',  status: 'مسلّم' },
  { id: 9,  date: '2026-05-11', crop: 'باذنجان',qty: 220,  pricePerKg: 2.20, total: 484,   customer: 'بقالات الحي',         channel: 'تجزئة', status: 'مسلّم' },
  { id: 10, date: '2026-05-10', crop: 'طماطم',  qty: 550,  pricePerKg: 2.80, total: 1540,  customer: 'شركة المزارع الذهبية', channel: 'عقود',  status: 'مسلّم' },
];

export const salesStats = {
  todayRevenue:    3555,
  weeklyRevenue:   18200,
  monthlyRevenue:  94500,
  avgPriceKg:      2.76,
  topCrop:         'خيار',
  topCustomer:     'سوق الجملة المركزي',
};

export const salesByChannel = [
  { channel: 'جملة',  revenue: 48600, pct: 51.4, color: '#16a34a' },
  { channel: 'عقود',  revenue: 32400, pct: 34.3, color: '#0ea5e9' },
  { channel: 'مطاعم', revenue: 8100,  pct: 8.6,  color: '#f59e0b' },
  { channel: 'تجزئة', revenue: 5400,  pct: 5.7,  color: '#8b5cf6' },
];

export const salesPriceChart = [
  { week: 'أسبوع 1', خيار: 2.45, طماطم: 2.75, فلفل: 4.50 },
  { week: 'أسبوع 2', خيار: 2.50, طماطم: 2.80, فلفل: 4.60 },
  { week: 'أسبوع 3', خيار: 2.48, طماطم: 2.78, فلفل: 4.55 },
  { week: 'أسبوع 4', خيار: 2.55, طماطم: 2.80, فلفل: 4.70 },
  { week: 'أسبوع 5', خيار: 2.50, طماطم: 2.80, فلفل: 4.50 },
];

export const topCustomers = [
  { name: 'سوق الجملة المركزي',   purchases: 38400, qty: 15360, channel: 'جملة'  },
  { name: 'شركة المزارع الذهبية', purchases: 28800, qty: 10480, channel: 'عقود'  },
  { name: 'مطاعم الأصيل',         purchases: 8100,  qty: 1800,  channel: 'مطاعم' },
  { name: 'بقالات الحي',           purchases: 5400,  qty: 2455,  channel: 'تجزئة' },
];

// ─── التقارير والتحليل ────────────────────────
export const reportTypes = [
  { id: 'production', title: 'تقرير الإنتاج',    icon: '📦', desc: 'الإنتاج اليومي والأسبوعي والشهري حسب المحصول والبيت', color: 'green'  },
  { id: 'financial',  title: 'التقرير المالي',    icon: '💰', desc: 'الإيرادات والمصروفات وصافي الربح وهامش الربح',         color: 'sky'    },
  { id: 'water',      title: 'تقرير المياه',      icon: '💧', desc: 'استهلاك المياه والري وجودة المصادر',                    color: 'blue'   },
  { id: 'labor',      title: 'تقرير العمالة',     icon: '👷', desc: 'ساعات العمل والحضور والغياب وتكاليف العمالة',           color: 'purple' },
  { id: 'pests',      title: 'تقرير الأمراض',     icon: '🛡️', desc: 'حوادث الأمراض والآفات والمبيدات المستخدمة',            color: 'red'    },
  { id: 'fertilizer', title: 'تقرير التسميد',     icon: '🧪', desc: 'برامج التسميد والكميات المستهلكة والتكاليف',            color: 'amber'  },
  { id: 'harvest',    title: 'تقرير الحصاد',      icon: '🌾', desc: 'سجلات الحصاد والجودة والإنتاجية',                       color: 'lime'   },
  { id: 'cycle',      title: 'تقرير الدورة',       icon: '🔄', desc: 'ملخص شامل لكل دورة زراعية من البداية للنهاية',          color: 'indigo' },
];

export const kpiComparison = [
  { kpi: 'إنتاج الكيلو / م²',   current: 20.4, prev: 18.8, target: 22,   unit: 'كجم'  },
  { kpi: 'تكلفة الكيلو',         current: 1.65, prev: 1.82, target: 1.60, unit: 'ريال' },
  { kpi: 'هامش الربح',           current: 33.9, prev: 29.4, target: 35,   unit: '%'    },
  { kpi: 'كفاءة استهلاك المياه', current: 0.044,prev: 0.052,target: 0.04, unit: 'م³/كجم'},
  { kpi: 'نسبة الدرجة الأولى',   current: 90.2, prev: 87.5, target: 92,   unit: '%'    },
  { kpi: 'تكلفة الكهرباء / كجم', current: 0.43, prev: 0.41, target: 0.38, unit: 'ريال' },
];

export const seasonComparison = [
  { metric: 'الإنتاج (طن)',     season2024: 38.2, season2025: 42.6, season2026: 18.4 },
  { metric: 'الإيرادات (ألف ريال)', season2024: 312, season2025: 368, season2026: 174 },
  { metric: 'صافي الربح (ألف)', season2024: 98,  season2025: 124, season2026: 67  },
  { metric: 'هامش الربح %',     season2024: 31.4,season2025: 33.7,season2026: 38.5 },
];

// ─── الشتلات ──────────────────────────────────
export const nurseryBatches = [
  {
    id: 1, crop: 'خيار', variety: 'خيار بيت محمي — Syngenta', icon: '🥒',
    seedDate: '2026-05-01', germinationDate: '2026-05-05', transferDate: '2026-05-22',
    totalSeeds: 1500, germinated: 1435, transferred: 0,
    germinationRate: 95.7, costPerSeedling: 1.20, totalCost: 1722,
    destination: 'بيت رقم 9', farm: 'مزرعة النخيل',
    status: 'جاهزة للنقل', daysToTransfer: 7, tray: '30 صينية × 50 خلية',
  },
  {
    id: 2, crop: 'طماطم', variety: 'طماطم عنقودية — Rijk Zwaan', icon: '🍅',
    seedDate: '2026-04-28', germinationDate: '2026-05-03', transferDate: '2026-05-20',
    totalSeeds: 1200, germinated: 1140, transferred: 1140,
    germinationRate: 95.0, costPerSeedling: 1.40, totalCost: 1596,
    destination: 'بيت رقم 12', farm: 'مزرعة الواحة',
    status: 'تم النقل', daysToTransfer: 0, tray: '24 صينية × 50 خلية',
  },
  {
    id: 3, crop: 'فلفل', variety: 'فلفل ألوان — Enza Zaden', icon: '🫑',
    seedDate: '2026-05-08', germinationDate: '2026-05-15', transferDate: '2026-06-01',
    totalSeeds: 800, germinated: 744, transferred: 0,
    germinationRate: 93.0, costPerSeedling: 1.60, totalCost: 1190,
    destination: 'بيت رقم 4', farm: 'مزرعة النخيل',
    status: 'في الإنبات', daysToTransfer: 17, tray: '16 صينية × 50 خلية',
  },
  {
    id: 4, crop: 'باذنجان', variety: 'باذنجان بلدي', icon: '🍆',
    seedDate: '2026-05-03', germinationDate: '2026-05-10', transferDate: '2026-05-28',
    totalSeeds: 600, germinated: 558, transferred: 0,
    germinationRate: 93.0, costPerSeedling: 1.10, totalCost: 614,
    destination: 'بيت رقم 6', farm: 'مزرعة الواحة',
    status: 'نمو خضري', daysToTransfer: 13, tray: '12 صينية × 50 خلية',
  },
  {
    id: 5, crop: 'كوسة', variety: 'كوسة خضراء — Bayer', icon: '🥬',
    seedDate: '2026-04-20', germinationDate: '2026-04-25', transferDate: '2026-05-10',
    totalSeeds: 900, germinated: 891, transferred: 891,
    germinationRate: 99.0, costPerSeedling: 1.00, totalCost: 891,
    destination: 'بيت رقم 15', farm: 'مزرعة الواحة',
    status: 'تم النقل', daysToTransfer: 0, tray: '18 صينية × 50 خلية',
  },
];

export const nurseryStats = {
  activeBatches:     3,
  readyToTransfer:   1,
  avgGerminationRate:95.1,
  totalSeedlingsCost: 6013,
  thisMonthBatches:  4,
};

export const germinationChart = [
  { batch: 'دفعة 1 خيار',    rate: 95.7 },
  { batch: 'دفعة 2 طماطم',   rate: 95.0 },
  { batch: 'دفعة 3 فلفل',    rate: 93.0 },
  { batch: 'دفعة 4 باذنجان', rate: 93.0 },
  { batch: 'دفعة 5 كوسة',    rate: 99.0 },
];

// ─── المخزون ──────────────────────────────────
export const inventoryItems = [
  // بذور
  { id: 1,  category: 'بذور',      name: 'بذور خيار Syngenta',      unit: 'علبة (1000 بذرة)', qty: 8,    minQty: 3,  cost: 85,   totalValue: 680,  status: 'كافٍ',      lastUpdated: '2026-05-10', location: 'مخزن A' },
  { id: 2,  category: 'بذور',      name: 'بذور طماطم Rijk Zwaan',   unit: 'علبة (500 بذرة)',  qty: 4,    minQty: 2,  cost: 120,  totalValue: 480,  status: 'كافٍ',      lastUpdated: '2026-05-08', location: 'مخزن A' },
  { id: 3,  category: 'بذور',      name: 'بذور فلفل Enza Zaden',    unit: 'علبة (500 بذرة)',  qty: 1,    minQty: 2,  cost: 95,   totalValue: 95,   status: 'منخفض',     lastUpdated: '2026-05-01', location: 'مخزن A' },
  // أسمدة
  { id: 4,  category: 'أسمدة',     name: 'نترات كالسيوم Ca(NO₃)₂', unit: 'كجم',              qty: 280,  minQty: 100,cost: 4.5,  totalValue: 1260, status: 'كافٍ',      lastUpdated: '2026-05-12', location: 'مخزن B' },
  { id: 5,  category: 'أسمدة',     name: 'نترات بوتاسيوم KNO₃',    unit: 'كجم',              qty: 150,  minQty: 80, cost: 6.2,  totalValue: 930,  status: 'كافٍ',      lastUpdated: '2026-05-12', location: 'مخزن B' },
  { id: 6,  category: 'أسمدة',     name: 'فوسفات أحادي MKP',       unit: 'كجم',              qty: 45,   minQty: 50, cost: 8.8,  totalValue: 396,  status: 'منخفض',     lastUpdated: '2026-05-05', location: 'مخزن B' },
  { id: 7,  category: 'أسمدة',     name: 'نترات أمونيوم',           unit: 'كجم',              qty: 20,   minQty: 50, cost: 3.8,  totalValue: 76,   status: 'نفذ تقريباً',lastUpdated:'2026-04-30', location: 'مخزن B' },
  // مبيدات
  { id: 8,  category: 'مبيدات',    name: 'Mancozeb 80 WP',         unit: 'كجم',              qty: 5.5,  minQty: 3,  cost: 70,   totalValue: 385,  status: 'كافٍ',      lastUpdated: '2026-05-08', location: 'مخزن C' },
  { id: 9,  category: 'مبيدات',    name: 'Abamectin 1.8%',         unit: 'لتر',              qty: 2.0,  minQty: 1,  cost: 440,  totalValue: 880,  status: 'كافٍ',      lastUpdated: '2026-05-10', location: 'مخزن C' },
  { id: 10, category: 'مبيدات',    name: 'Sulfur 80 WP',           unit: 'كجم',              qty: 8,    minQty: 4,  cost: 30,   totalValue: 240,  status: 'كافٍ',      lastUpdated: '2026-05-03', location: 'مخزن C' },
  { id: 11, category: 'مبيدات',    name: 'Copper Hydroxide',       unit: 'كجم',              qty: 1.5,  minQty: 2,  cost: 140,  totalValue: 210,  status: 'منخفض',     lastUpdated: '2026-04-28', location: 'مخزن C' },
  // تعبئة
  { id: 12, category: 'تعبئة',     name: 'صناديق كرتون',           unit: 'صندوق',            qty: 1200, minQty: 500,cost: 0.8,  totalValue: 960,  status: 'كافٍ',      lastUpdated: '2026-05-07', location: 'مخزن D' },
  { id: 13, category: 'تعبئة',     name: 'أكياس تعبئة 5 كجم',     unit: 'كيس',              qty: 850,  minQty: 300,cost: 0.4,  totalValue: 340,  status: 'كافٍ',      lastUpdated: '2026-05-07', location: 'مخزن D' },
  { id: 14, category: 'تعبئة',     name: 'شريط لاصق تعبئة',       unit: 'بكرة',             qty: 40,   minQty: 20, cost: 8,    totalValue: 320,  status: 'كافٍ',      lastUpdated: '2026-05-07', location: 'مخزن D' },
  // معدات صرف
  { id: 15, category: 'مواد صرف',  name: 'قفازات عمل',             unit: 'زوج',              qty: 25,   minQty: 10, cost: 12,   totalValue: 300,  status: 'كافٍ',      lastUpdated: '2026-05-01', location: 'مخزن D' },
  { id: 16, category: 'مواد صرف',  name: 'قناع تنفس',              unit: 'قطعة',             qty: 3,    minQty: 5,  cost: 35,   totalValue: 105,  status: 'منخفض',     lastUpdated: '2026-04-20', location: 'مخزن D' },
];

export const inventoryStats = {
  totalItems:     inventoryItems.length,
  totalValue:     inventoryItems.reduce((s, i) => s + i.totalValue, 0),
  lowStockCount:  inventoryItems.filter((i) => i.status === 'منخفض' || i.status === 'نفذ تقريباً').length,
  categories:     [...new Set(inventoryItems.map((i) => i.category))].length,
};

export const purchaseOrders = [
  { id: 1, item: 'فوسفات أحادي MKP',       qty: 100, unit: 'كجم',  cost: 880,  status: 'معتمد',       date: '2026-05-15', supplier: 'شركة الزراعة الحديثة' },
  { id: 2, item: 'نترات أمونيوم',            qty: 150, unit: 'كجم',  cost: 570,  status: 'قيد التوريد', date: '2026-05-14', supplier: 'مؤسسة الكيماويات الزراعية' },
  { id: 3, item: 'بذور فلفل Enza Zaden',    qty: 3,   unit: 'علبة', cost: 285,  status: 'بانتظار موافقة', date: '2026-05-13', supplier: 'مستودع البذور المركزي' },
  { id: 4, item: 'Copper Hydroxide',         qty: 5,   unit: 'كجم',  cost: 700,  status: 'مكتمل',       date: '2026-05-10', supplier: 'شركة الزراعة الحديثة' },
  { id: 5, item: 'قناع تنفس',               qty: 20,  unit: 'قطعة', cost: 700,  status: 'مكتمل',       date: '2026-05-08', supplier: 'مستودع معدات السلامة' },
];

// ─── الإعدادات ────────────────────────────────
export const systemUsers = [
  { id: 1, name: 'أحمد الغامدي',  email: 'ahmed@hasad.sa',   role: 'مدير المنصة',    permissions: ['all'],                            status: 'نشط',  lastLogin: '2026-05-15' },
  { id: 2, name: 'محمد الشهري',   email: 'mohd@hasad.sa',    role: 'مشرف مزرعة',     permissions: ['farms','operations','harvest'],    status: 'نشط',  lastLogin: '2026-05-15' },
  { id: 3, name: 'خالد البلوي',   email: 'khaled@hasad.sa',  role: 'مشرف مزرعة',     permissions: ['farms','operations','harvest'],    status: 'نشط',  lastLogin: '2026-05-14' },
  { id: 4, name: 'فاطمة العتيبي', email: 'fatima@hasad.sa',  role: 'محاسب',          permissions: ['accounting','sales','expenses'],   status: 'نشط',  lastLogin: '2026-05-13' },
  { id: 5, name: 'يوسف العمري',   email: 'yousef@hasad.sa',  role: 'فني ري',          permissions: ['irrigation','operations'],         status: 'نشط',  lastLogin: '2026-05-12' },
  { id: 6, name: 'سارة القحطاني', email: 'sarah@hasad.sa',   role: 'مشاهدة فقط',    permissions: ['dashboard','reports'],             status: 'معطل', lastLogin: '2026-04-30' },
];

export const farmSettings = {
  name:        'مزرعة النخيل',
  nameEn:      'Al-Nakhal Farm',
  location:    'الرياض — حرة رهاط',
  area:        '12,000 م²',
  phone:       '0501234567',
  email:       'info@hasad.sa',
  licenseNo:   'SA-AGR-2024-00847',
  established: '2019-03-15',
  timezone:    'Asia/Riyadh',
  currency:    'ريال سعودي (SAR)',
  language:    'العربية',
};

export const notificationSettings = [
  { id: 'harvest_alert',   label: 'تنبيه موعد الحصاد',        enabled: true,  channel: 'واتساب + بريد' },
  { id: 'low_stock',       label: 'تحذير نقص المخزون',         enabled: true,  channel: 'واتساب' },
  { id: 'ec_alert',        label: 'تنبيه ارتفاع EC المياه',    enabled: true,  channel: 'تطبيق' },
  { id: 'daily_report',    label: 'التقرير اليومي',             enabled: true,  channel: 'بريد' },
  { id: 'weekly_report',   label: 'التقرير الأسبوعي',           enabled: true,  channel: 'بريد + واتساب' },
  { id: 'pest_alert',      label: 'تنبيه الأمراض والآفات',      enabled: true,  channel: 'واتساب + تطبيق' },
  { id: 'expense_overrun', label: 'تجاوز الميزانية',            enabled: false, channel: 'بريد' },
  { id: 'worker_absence',  label: 'تنبيه غياب العمال',          enabled: false, channel: 'تطبيق' },
];


// ─── Subscription Plans ──────────────────────────────────

export type PlanId = 'starter' | 'professional' | 'company' | 'enterprise';

export interface SubscriptionPlan {
  id: PlanId;
  name: string;
  tagline: string;
  price: number | null;
  color: string;
  accentClass: string;
  badge?: string;
  limits: {
    farms: number | null;
    users: number | null;
    fields: number | null;
    greenhouses: number | null;
    activeCycles: number | null;
    aiReports: number | null;
  };
  features: string[];
  lockedModules?: string[];
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'starter',
    name: 'باقة البداية السنوية',
    tagline: 'للمزارع الصغيرة',
    price: 3000,
    color: '#16a34a',
    accentClass: 'green',
    limits: { farms: 1, users: 3, fields: 5, greenhouses: 5, activeCycles: 10, aiReports: 2 },
    features: [
      'إدارة المزرعة الأساسية',
      'المزروعات والأصناف',
      'الدورات الزراعية',
      'إدارة الري',
      'التسميد',
      'سجلات الأمراض والآفات',
      'الحصاد',
      'المبيعات',
      'المصروفات الأساسية',
      'التحليل الداخلي الأساسي',
      'التقارير الأساسية',
    ],
    lockedModules: ['المخزون', 'إدارة العمال', 'محطة التحلية', 'مقارنة المزارع', 'لوحات متعددة المزارع'],
  },
  {
    id: 'professional',
    name: 'الباقة الاحترافية السنوية',
    tagline: 'للمزارع المتوسطة',
    price: 9600,
    color: '#0284c7',
    accentClass: 'sky',
    badge: 'الأكثر شيوعاً',
    limits: { farms: 3, users: 10, fields: 20, greenhouses: 30, activeCycles: 50, aiReports: 10 },
    features: [
      'كل مميزات باقة البداية',
      'إدارة المخزون',
      'العمال والمهام',
      'الري ومصادر المياه المتقدمة',
      'محطة التحلية المبسطة',
      'الكهرباء وتشغيل البيوت المحمية',
      'تقارير الربحية المتقدمة',
      'تصدير PDF / Excel',
      '10 تقارير ذكاء اصطناعي سنوياً',
    ],
    lockedModules: ['لوحات متعددة المزارع', 'مقارنة المزارع المتقدمة', 'شعار مخصص في التقارير'],
  },
  {
    id: 'company',
    name: 'باقة الشركات السنوية',
    tagline: 'للشركات الزراعية',
    price: 36000,
    color: '#7c3aed',
    accentClass: 'purple',
    limits: { farms: 10, users: 30, fields: 100, greenhouses: 150, activeCycles: 250, aiReports: 40 },
    features: [
      'كل مميزات الباقة الاحترافية',
      'لوحات تحكم متعددة المزارع',
      'صلاحيات متقدمة',
      'مقارنة المواسم والمزارع',
      'تقارير مالية وتشغيلية متقدمة',
      'شعار مخصص في التقارير',
      'دعم أولوية مع مدير حساب',
      '40 تقرير ذكاء اصطناعي سنوياً',
    ],
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات السنوية',
    tagline: 'للمؤسسات الكبرى',
    price: null,
    color: '#d97706',
    accentClass: 'amber',
    badge: 'مخصصة',
    limits: { farms: null, users: null, fields: null, greenhouses: null, activeCycles: null, aiReports: null },
    features: [
      'كل مميزات باقة الشركات',
      'حدود مخصصة حسب الاتفاقية',
      'صلاحيات مخصصة بالكامل',
      'دعم مخصص ومدير حساب مخصص',
      'تأهيل وتدريب للفريق',
      'تقارير مخصصة حسب الطلب',
      'تكاملات مستقبلية مع أنظمة الجهات',
      'تقارير ذكاء اصطناعي غير محدودة',
    ],
  },
];

// ─── Current Subscription ───────────────────────────────

export const currentSubscription = {
  planId:       'professional' as PlanId,
  planName:     'الباقة الاحترافية السنوية',
  status:       'active' as 'active' | 'expired' | 'suspended' | 'trial',
  startDate:    '2026-01-15',
  endDate:      '2027-01-14',
  daysRemaining: 244,
  autoRenew:    true,
  billingCycle: 'سنوي',
  paidAmount:   9600,
  usage: {
    farms:         2,
    users:         7,
    fields:        14,
    greenhouses:   22,
    activeCycles:  38,
    aiReports:     6,
    aiReportsAddon: 5,
  },
};

// ─── Subscription Invoices ──────────────────────────────

export const subscriptionInvoices = [
  { id: 'INV-2026-001', date: '2026-01-15', plan: 'الباقة الاحترافية السنوية', amount: 9600, status: 'مدفوعة',  method: 'بطاقة ائتمان' },
  { id: 'INV-2025-004', date: '2025-10-02', plan: 'إضافة 5 تقارير ذكاء اصطناعي', amount: 250, status: 'مدفوعة', method: 'بطاقة ائتمان' },
  { id: 'INV-2025-001', date: '2025-01-15', plan: 'الباقة الاحترافية السنوية', amount: 4500, status: 'مدفوعة',  method: 'تحويل بنكي'  },
  { id: 'INV-2024-003', date: '2024-06-01', plan: 'إضافة 10 تقارير ذكاء اصطناعي', amount: 480, status: 'مدفوعة', method: 'بطاقة ائتمان' },
  { id: 'INV-2024-001', date: '2024-01-15', plan: 'باقة البداية السنوية',       amount: 1200, status: 'مدفوعة',  method: 'تحويل بنكي'  },
];

// ─── AI Report Add-ons ──────────────────────────────────

export const aiReportAddOns = [
  { id: 'ai5',   label: '5 تقارير إضافية',   reports: 5,   price: 250,  popular: false },
  { id: 'ai10',  label: '10 تقارير إضافية',  reports: 10,  price: 450,  popular: true  },
  { id: 'ai25',  label: '25 تقارير إضافية',  reports: 25,  price: 950,  popular: false },
  { id: 'ai50',  label: '50 تقارير إضافية',  reports: 50,  price: 1600, popular: false },
];

// ─── Module Access Map ──────────────────────────────────

export const moduleAccessMap: Record<PlanId, string[]> = {
  starter: [
    'لوحة التحكم', 'المزارع والحقول', 'المزروعات', 'الدورات الزراعية',
    'العمليات الزراعية', 'الحصاد', 'التسميد', 'الأمراض والآفات',
    'الري', 'المبيعات', 'المصروفات', 'التحليل الأساسي', 'التقارير الأساسية',
  ],
  professional: [
    'لوحة التحكم', 'المزارع والحقول', 'المزروعات', 'الدورات الزراعية',
    'العمليات الزراعية', 'الحصاد', 'التسميد', 'الأمراض والآفات',
    'الري ومصادر المياه', 'الزراعة المحمية المكيفة', 'المبيعات',
    'المصروفات', 'المحاسبة', 'المخزون', 'إدارة العمال',
    'التحليل الذكي', 'التقارير المتقدمة', 'الشتلات',
  ],
  company: [
    'كل وحدات الباقة الاحترافية',
    'لوحات متعددة المزارع', 'مقارنة المزارع', 'الصلاحيات المتقدمة',
    'شعار مخصص في التقارير', 'تقارير مالية وتشغيلية متقدمة',
  ],
  enterprise: ['وصول كامل غير محدود مع تخصيص كامل'],
};

// ════════════════════════════════════════════════════════
// المتابعة الذكية وتقليل النفقات
// ════════════════════════════════════════════════════════

// ─── العمليات اليومية ───────────────────────────────────

export const opTypeConfig: Record<string, { label: string; icon: string }> = {
  irrigation:    { label: 'ري',             icon: '💧' },
  fertilization: { label: 'تسميد',          icon: '🧪' },
  harvest:       { label: 'حصاد',           icon: '🌾' },
  spraying:      { label: 'رش',             icon: '🫧' },
  planting:      { label: 'زراعة',          icon: '🌱' },
  maintenance:   { label: 'صيانة',          icon: '🔧' },
  inspection:    { label: 'فحص',            icon: '🔍' },
  transport:     { label: 'نقل',            icon: '🚛' },
};

export const dailyOperations = [
  { id: 1, type: 'irrigation',    title: 'ري البيت المحمي رقم 3',    farm: 'مزرعة الوادي', field: 'بيت 3',    worker: 'أحمد محمد',   cost: 120, status: 'completed',  priority: 'high',   startTime: '06:00', duration: '2 ساعة', notes: 'تمت بنجاح' },
  { id: 2, type: 'fertilization', title: 'تسميد الخيار الحقل الشمالي', farm: 'مزرعة الوادي', field: 'الشمال',  worker: 'سعيد علي',    cost: 280, status: 'completed',  priority: 'high',   startTime: '07:30', duration: '3 ساعات', notes: '' },
  { id: 3, type: 'spraying',      title: 'رش مبيد فطري البيت 5',      farm: 'مزرعة النخيل', field: 'بيت 5',    worker: 'فهد ناصر',    cost: 95,  status: 'inProgress', priority: 'medium', startTime: '09:00', duration: '1.5 ساعة', notes: 'جارٍ حالياً' },
  { id: 4, type: 'harvest',       title: 'حصاد الطماطم البيت 1',      farm: 'مزرعة الوادي', field: 'بيت 1',    worker: 'فريق الحصاد', cost: 340, status: 'inProgress', priority: 'high',   startTime: '08:00', duration: '4 ساعات', notes: '' },
  { id: 5, type: 'maintenance',   title: 'صيانة نظام الري التنقيط',   farm: 'مزرعة النخيل', field: 'القطعة A', worker: 'علي حسن',     cost: 200, status: 'scheduled',  priority: 'medium', startTime: '11:00', duration: '2 ساعة', notes: '' },
  { id: 6, type: 'planting',      title: 'زراعة شتلات فلفل البيت 7',  farm: 'مزرعة الوادي', field: 'بيت 7',    worker: 'محمد سالم',   cost: 150, status: 'scheduled',  priority: 'low',    startTime: '13:00', duration: '3 ساعات', notes: '' },
  { id: 7, type: 'inspection',    title: 'فحص نظام التبريد بيت 2',    farm: 'مزرعة النخيل', field: 'بيت 2',    worker: 'خالد عمر',    cost: 50,  status: 'completed',  priority: 'medium', startTime: '05:30', duration: '1 ساعة', notes: 'لا مشكلات' },
  { id: 8, type: 'irrigation',    title: 'ري الحقل الجنوبي',          farm: 'مزرعة الجنوب', field: 'الجنوب',   worker: 'يوسف أحمد',   cost: 80,  status: 'completed',  priority: 'medium', startTime: '05:00', duration: '1.5 ساعة', notes: '' },
  { id: 9, type: 'transport',     title: 'نقل محصول الطماطم للسوق',   farm: 'مزرعة الوادي', field: '—',        worker: 'ناصر خالد',   cost: 120, status: 'scheduled',  priority: 'high',   startTime: '14:00', duration: '3 ساعات', notes: '' },
  { id: 10, type: 'spraying',     title: 'رش سماد ورقي البيت 4',      farm: 'مزرعة النخيل', field: 'بيت 4',    worker: 'سعيد علي',    cost: 60,  status: 'completed',  priority: 'low',    startTime: '07:00', duration: '1 ساعة', notes: '' },
];

export const dailyOpStats = {
  totalToday: 10,
  completed: 5,
  inProgress: 2,
  scheduled: 3,
  totalCost: 1495,
  savedVsAvg: 215,
};

// ─── المهام وأوامر العمل ────────────────────────────────

export const workOrders = [
  { id: 1, title: 'إصلاح نظام التنقيط بيت 3',    farm: 'مزرعة الوادي', assignedTo: 'علي حسن',     priority: 'critical', status: 'inProgress', createdDate: '2026-05-14', dueDate: '2026-05-16', overdue: false, estimatedCost: 850,  description: 'انسداد في خطوط التنقيط يؤثر على 40% من النباتات', materials: [{ name: 'نبيبة تنقيط', qty: 50, unit: 'متر' }, { name: 'نوزل', qty: 20, unit: 'حبة' }] },
  { id: 2, title: 'تركيب مضخة احتياطية',          farm: 'مزرعة النخيل', assignedTo: 'فهد ناصر',    priority: 'high',     status: 'pending',    createdDate: '2026-05-13', dueDate: '2026-05-20', overdue: false, estimatedCost: 1200, description: 'تركيب مضخة احتياطية لمنع أي انقطاع في الري', materials: [{ name: 'مضخة 2 حصان', qty: 1, unit: 'قطعة' }] },
  { id: 3, title: 'صيانة الكاميرات الأمنية',       farm: 'مزرعة الوادي', assignedTo: 'محمد سالم',   priority: 'medium',   status: 'planned',    createdDate: '2026-05-12', dueDate: '2026-05-25', overdue: false, estimatedCost: 300,  description: 'تنظيف وضبط كاميرات القطاع الغربي', materials: [] },
  { id: 4, title: 'تغيير فلاتر نظام التبريد',      farm: 'مزرعة النخيل', assignedTo: 'خالد عمر',    priority: 'high',     status: 'completed',  createdDate: '2026-05-10', dueDate: '2026-05-15', overdue: false, estimatedCost: 420,  description: 'تغيير الفلاتر الربع سنوية لبيوت التبريد', materials: [{ name: 'فلتر هواء', qty: 6, unit: 'قطعة' }] },
  { id: 5, title: 'تركيب حساسات رطوبة التربة',    farm: 'مزرعة الجنوب', assignedTo: 'أحمد محمد',   priority: 'medium',   status: 'pending',    createdDate: '2026-05-11', dueDate: '2026-05-22', overdue: false, estimatedCost: 650,  description: 'تركيب 10 حساسات جديدة في الحقل الجنوبي', materials: [{ name: 'حساس رطوبة تربة', qty: 10, unit: 'قطعة' }] },
  { id: 6, title: 'إصلاح سياج القطاع الشمالي',    farm: 'مزرعة الوادي', assignedTo: 'يوسف أحمد',   priority: 'low',      status: 'planned',    createdDate: '2026-05-09', dueDate: '2026-05-30', overdue: false, estimatedCost: 280,  description: 'إصلاح جزء تالف من السياج الخارجي', materials: [] },
  { id: 7, title: 'تحديث برنامج وحدة التحكم',     farm: 'مزرعة النخيل', assignedTo: 'فهد ناصر',    priority: 'high',     status: 'pending',    createdDate: '2026-05-08', dueDate: '2026-05-14', overdue: true,  estimatedCost: 0,    description: 'تحديث فيرم وير وحدة التحكم الرئيسية للري الآلي', materials: [] },
  { id: 8, title: 'تنظيف خزانات المياه الكبرى',   farm: 'مزرعة الوادي', assignedTo: 'فريق الصيانة', priority: 'medium',  status: 'completed',  createdDate: '2026-05-05', dueDate: '2026-05-12', overdue: false, estimatedCost: 470,  description: 'التنظيف والتعقيم الدوري لخزانات التخزين', materials: [] },
];

export const workOrderStats = {
  total: 8, pending: 3, inProgress: 1, completed: 2, planned: 2, overdue: 1, totalCost: 4170,
};

// ─── المراسلات والمرفقات ────────────────────────────────

export const messageThreads = [
  { id: 1, title: 'فريق مزرعة الوادي', type: 'internal', lastMessage: 'تم الانتهاء من ري البيت 3', lastTime: '09:15', participants: 8, unread: 3, farm: 'مزرعة الوادي', attachmentsCount: 5 },
  { id: 2, title: 'مورد البذور - الخليج',  type: 'supplier', lastMessage: 'الشحنة ستصل يوم الاثنين', lastTime: 'أمس', participants: 3, unread: 1, farm: 'عام', attachmentsCount: 2 },
  { id: 3, title: 'فريق الصيانة',          type: 'internal', lastMessage: 'انتهينا من فحص التبريد', lastTime: 'أمس', participants: 4, unread: 0, farm: 'مزرعة النخيل', attachmentsCount: 1 },
  { id: 4, title: 'عميل - سوق الخضار',    type: 'client',   lastMessage: 'نريد 200 كيلو طماطم غداً', lastTime: '2 يوم', participants: 2, unread: 2, farm: 'عام', attachmentsCount: 0 },
  { id: 5, title: 'تنبيهات النظام',        type: 'system',   lastMessage: 'تنبيه: حساس الرطوبة بيت 5 خارج النطاق', lastTime: '3 يوم', participants: 1, unread: 0, farm: 'عام', attachmentsCount: 0 },
  { id: 6, title: 'إدارة المزرعة',         type: 'internal', lastMessage: 'اجتماع تقييم الأسبوع القادم', lastTime: '4 يوم', participants: 5, unread: 0, farm: 'عام', attachmentsCount: 3 },
];

export const mockMessages: Record<number, Array<{ id: number; sender: string; text: string; time: string; isMe: boolean; attachment?: string }>> = {
  1: [
    { id: 1, sender: 'أحمد محمد',   text: 'صباح الخير، بدأنا ري البيت 3 في الموعد', time: '06:01', isMe: false },
    { id: 2, sender: 'أنا',          text: 'ممتاز، راقب ضغط الخطوط جيداً', time: '06:05', isMe: true },
    { id: 3, sender: 'أحمد محمد',   text: 'نعم، الضغط طبيعي 2.5 بار', time: '06:10', isMe: false },
    { id: 4, sender: 'سعيد علي',    text: 'انتهينا من التسميد في الشمال', time: '09:15', isMe: false, attachment: 'تقرير_التسميد.pdf' },
    { id: 5, sender: 'أنا',          text: 'شكراً، أرسل التقرير للإدارة', time: '09:18', isMe: true },
  ],
  2: [
    { id: 1, sender: 'مورد البذور', text: 'السلام عليكم، بخصوص طلبكم رقم 2045', time: 'أمس 10:00', isMe: false },
    { id: 2, sender: 'أنا',          text: 'أهلاً، نعم ننتظر تأكيد موعد الشحن', time: 'أمس 10:30', isMe: true },
    { id: 3, sender: 'مورد البذور', text: 'الشحنة ستصل يوم الاثنين 19/5', time: 'أمس 11:00', isMe: false, attachment: 'فاتورة_2045.pdf' },
  ],
};

// ─── الكاميرات والمراقبة ────────────────────────────────

export const cameras = [
  { id: 1, name: 'كاميرا البوابة الرئيسية',   location: 'البوابة',     farm: 'مزرعة الوادي', zone: 'الأمن',   status: 'active',          hasStream: true,  resolution: '4K',   type: 'ptz',   lastMaintenance: '2026-04-01', storageRetentionDays: 30, nightVision: true,  motionDetection: true  },
  { id: 2, name: 'كاميرا البيت المحمي 1',      location: 'بيت 1 - داخل', farm: 'مزرعة الوادي', zone: 'الإنتاج', status: 'active',          hasStream: true,  resolution: '1080p', type: 'fixed', lastMaintenance: '2026-03-15', storageRetentionDays: 14, nightVision: true,  motionDetection: false },
  { id: 3, name: 'كاميرا البيت المحمي 3',      location: 'بيت 3 - داخل', farm: 'مزرعة الوادي', zone: 'الإنتاج', status: 'active',          hasStream: true,  resolution: '1080p', type: 'fixed', lastMaintenance: '2026-03-15', storageRetentionDays: 14, nightVision: false, motionDetection: false },
  { id: 4, name: 'كاميرا مخزن المعدات',        location: 'المخزن',       farm: 'مزرعة الوادي', zone: 'الأمن',   status: 'active',          hasStream: true,  resolution: '1080p', type: 'fixed', lastMaintenance: '2026-02-20', storageRetentionDays: 30, nightVision: true,  motionDetection: true  },
  { id: 5, name: 'كاميرا الحقل الشمالي',       location: 'الشمال - خارج', farm: 'مزرعة النخيل', zone: 'الإنتاج', status: 'active',          hasStream: true,  resolution: '2K',    type: 'ptz',   lastMaintenance: '2026-04-10', storageRetentionDays: 14, nightVision: true,  motionDetection: true  },
  { id: 6, name: 'كاميرا منطقة التعبئة',       location: 'التعبئة',      farm: 'مزرعة النخيل', zone: 'العمليات', status: 'active',         hasStream: true,  resolution: '1080p', type: 'fixed', lastMaintenance: '2026-03-01', storageRetentionDays: 7,  nightVision: false, motionDetection: false },
  { id: 7, name: 'كاميرا البيت المكيف 7',      location: 'بيت 7 - داخل', farm: 'مزرعة النخيل', zone: 'الإنتاج', status: 'needsMaintenance', hasStream: false, resolution: '1080p', type: 'fixed', lastMaintenance: '2026-01-10', storageRetentionDays: 14, nightVision: true,  motionDetection: false },
  { id: 8, name: 'كاميرا الحوض الجنوبي',       location: 'الجنوب',       farm: 'مزرعة الجنوب', zone: 'الأمن',   status: 'offline',         hasStream: false, resolution: '720p',  type: 'fixed', lastMaintenance: '2025-12-01', storageRetentionDays: 7,  nightVision: false, motionDetection: true  },
];

export const cameraStats = { total: 8, active: 6, offline: 1, needsMaintenance: 1, withStream: 6 };

// ─── الري الكهربائي والمضخات ────────────────────────────

export const pumps = [
  { id: 1, name: 'مضخة الري الرئيسية 1',    location: 'محطة الري A', farm: 'مزرعة الوادي', status: 'running', flowRate: 80,  pressure: 3.2, powerKw: 15.0, dailyKwh: 90.0, dailyCost: 45.0, nextMaintenance: null },
  { id: 2, name: 'مضخة الري الرئيسية 2',    location: 'محطة الري A', farm: 'مزرعة الوادي', status: 'idle',    flowRate: 80,  pressure: 0.0, powerKw: 0.0,  dailyKwh: 0.0,  dailyCost: 0.0,  nextMaintenance: '2026-06-01' },
  { id: 3, name: 'مضخة البيوت المحمية',      location: 'محطة الري B', farm: 'مزرعة النخيل', status: 'running', flowRate: 45,  pressure: 2.8, powerKw: 7.5,  dailyKwh: 52.5, dailyCost: 26.25, nextMaintenance: null },
  { id: 4, name: 'مضخة التنقيط الجنوبي',    location: 'محطة الري C', farm: 'مزرعة الجنوب', status: 'running', flowRate: 30,  pressure: 2.4, powerKw: 5.5,  dailyKwh: 38.5, dailyCost: 19.25, nextMaintenance: '2026-05-28' },
  { id: 5, name: 'مضخة الاحتياطي',          location: 'محطة الري A', farm: 'مزرعة الوادي', status: 'off',     flowRate: 100, pressure: 0.0, powerKw: 0.0,  dailyKwh: 0.0,  dailyCost: 0.0,  nextMaintenance: null },
];

export const pumpStats = {
  activePumps: 3,
  totalFlowToday: 310,
  totalKwhToday: 181.0,
  totalCostToday: 90.5,
};

export const irrigationSchedules = [
  { id: 1, name: 'جدول ري البيوت المحمية',  farm: 'مزرعة الوادي', field: 'بيوت 1-4',    pump: 'مضخة الري 1', startTime: '06:00', duration: '2 ساعة',   frequency: 'يومي',    waterVolume: 160, status: 'active'    },
  { id: 2, name: 'جدول ري الخيار',          farm: 'مزرعة النخيل', field: 'بيت 5-6',     pump: 'مضخة البيوت', startTime: '07:30', duration: '1.5 ساعة', frequency: 'يومي',    waterVolume: 67,  status: 'active'    },
  { id: 3, name: 'جدول ري الحقل الجنوبي',  farm: 'مزرعة الجنوب', field: 'الحقل الكامل', pump: 'مضخة التنقيط', startTime: '05:00', duration: '3 ساعات',  frequency: 'يومي',    waterVolume: 90,  status: 'active'    },
  { id: 4, name: 'ري الفلفل المكيف',        farm: 'مزرعة النخيل', field: 'بيت 7',       pump: 'مضخة البيوت', startTime: '08:00', duration: '1 ساعة',   frequency: 'يومي',    waterVolume: 45,  status: 'scheduled' },
  { id: 5, name: 'ري احتياطي الموسم',      farm: 'مزرعة الوادي', field: 'كل الحقول',   pump: 'مضخة الاحتياطي', startTime: '—',  duration: 'حسب الحاجة', frequency: 'طارئ',  waterVolume: 0,   status: 'paused'    },
];

// ─── الحساسات والقراءات ─────────────────────────────────

export const sensors = [
  { id: 1,  name: 'حساس درجة حرارة بيت 1',  type: 'temperature',   location: 'بيت 1', farm: 'مزرعة الوادي', status: 'normal', value: 24.5, unit: '°م', minOk: 18, maxOk: 32, lastUpdate: 'قبل 5 دقائق', batteryLevel: 87, alertMessage: null },
  { id: 2,  name: 'حساس رطوبة بيت 1',        type: 'humidity',      location: 'بيت 1', farm: 'مزرعة الوادي', status: 'normal', value: 72,   unit: '%',  minOk: 60, maxOk: 85, lastUpdate: 'قبل 5 دقائق', batteryLevel: 87, alertMessage: null },
  { id: 3,  name: 'حساس درجة حرارة بيت 3',  type: 'temperature',   location: 'بيت 3', farm: 'مزرعة الوادي', status: 'alert',  value: 37.2, unit: '°م', minOk: 18, maxOk: 32, lastUpdate: 'قبل 2 دقيقة', batteryLevel: 64, alertMessage: 'درجة الحرارة تجاوزت الحد الأعلى' },
  { id: 4,  name: 'حساس رطوبة التربة قطعة A', type: 'soil_moisture', location: 'قطعة A', farm: 'مزرعة النخيل', status: 'alert',  value: 28,   unit: '%',  minOk: 40, maxOk: 80, lastUpdate: 'قبل 10 دقائق', batteryLevel: 45, alertMessage: 'رطوبة التربة منخفضة جداً' },
  { id: 5,  name: 'حساس CO₂ بيت 5',          type: 'co2',           location: 'بيت 5', farm: 'مزرعة النخيل', status: 'normal', value: 820,  unit: 'ppm',minOk: 400, maxOk: 1200, lastUpdate: 'قبل 8 دقائق', batteryLevel: 92, alertMessage: null },
  { id: 6,  name: 'حساس الإضاءة البيت 7',    type: 'light',         location: 'بيت 7', farm: 'مزرعة النخيل', status: 'normal', value: 45000, unit: 'lux', minOk: 20000, maxOk: 80000, lastUpdate: 'قبل 3 دقائق', batteryLevel: 78, alertMessage: null },
  { id: 7,  name: 'حساس pH تربة الشمال',      type: 'ph',            location: 'الشمال', farm: 'مزرعة النخيل', status: 'alert',  value: 4.8,  unit: 'pH', minOk: 5.5, maxOk: 7.5, lastUpdate: 'قبل 15 دقيقة', batteryLevel: 33, alertMessage: 'حموضة التربة مرتفعة (pH منخفض)' },
  { id: 8,  name: 'حساس EC الري التنقيط',    type: 'ec',            location: 'محطة B', farm: 'مزرعة الوادي', status: 'normal', value: 2.1,  unit: 'mS/cm', minOk: 1.5, maxOk: 3.0, lastUpdate: 'قبل 4 دقائق', batteryLevel: 91, alertMessage: null },
  { id: 9,  name: 'حساس الرياح الخارجي',     type: 'wind',          location: 'السطح',  farm: 'مزرعة الوادي', status: 'normal', value: 12,   unit: 'كم/ساعة', minOk: 0, maxOk: 40, lastUpdate: 'قبل 1 دقيقة', batteryLevel: 100, alertMessage: null },
  { id: 10, name: 'حساس درجة حرارة الجنوب',  type: 'temperature',   location: 'الجنوب', farm: 'مزرعة الجنوب', status: 'normal', value: 29.8, unit: '°م', minOk: 18, maxOk: 35, lastUpdate: 'قبل 6 دقائق', batteryLevel: 72, alertMessage: null },
  { id: 11, name: 'حساس رطوبة التربة B',      type: 'soil_moisture', location: 'قطعة B', farm: 'مزرعة الجنوب', status: 'normal', value: 62,   unit: '%',  minOk: 40, maxOk: 80, lastUpdate: 'قبل 9 دقائق', batteryLevel: 58, alertMessage: null },
  { id: 12, name: 'حساس CO₂ بيت 2',          type: 'co2',           location: 'بيت 2', farm: 'مزرعة الوادي', status: 'offline', value: 0, unit: 'ppm', minOk: 400, maxOk: 1200, lastUpdate: 'منذ 3 ساعات', batteryLevel: 0, alertMessage: null },
];

export const sensorStats = { total: 12, normal: 8, alert: 3, offline: 1 };

// ─── الصيانة والأعطال ───────────────────────────────────

export const maintenanceBreakdowns = [
  { id: 1, equipment: 'مضخة الري الرئيسية 1', farm: 'مزرعة الوادي', severity: 'high',     status: 'resolved',   description: 'توقف مفاجئ بسبب ارتفاع الضغط',         reportedDate: '2026-05-10', resolvedDate: '2026-05-11', downtimeHrs: 6,  assignedTo: 'علي حسن',     repairCost: 450  },
  { id: 2, equipment: 'نظام التبريد بيت 7',   farm: 'مزرعة النخيل', severity: 'critical', status: 'inProgress', description: 'عطل في وحدة الضخ الرئيسية للتبريد',     reportedDate: '2026-05-14', resolvedDate: null,         downtimeHrs: 18, assignedTo: 'فهد ناصر',    repairCost: 1800 },
  { id: 3, equipment: 'كاميرا بيت 7',         farm: 'مزرعة النخيل', severity: 'medium',   status: 'open',       description: 'انقطاع في الاتصال وعدم استجابة',        reportedDate: '2026-05-13', resolvedDate: null,         downtimeHrs: null, assignedTo: null,          repairCost: 200  },
  { id: 4, equipment: 'نظام الري التنقيط B',  farm: 'مزرعة الوادي', severity: 'high',     status: 'open',       description: 'انسداد في خطوط التنقيط الرئيسية',       reportedDate: '2026-05-15', resolvedDate: null,         downtimeHrs: null, assignedTo: 'علي حسن',     repairCost: 320  },
  { id: 5, equipment: 'مولد الكهرباء الاحتياطي', farm: 'مزرعة الجنوب', severity: 'medium', status: 'resolved', description: 'لم يبدأ التشغيل عند انقطاع التيار',    reportedDate: '2026-05-08', resolvedDate: '2026-05-09', downtimeHrs: 4,  assignedTo: 'خالد عمر',    repairCost: 150  },
  { id: 6, equipment: 'حساس pH قطعة الشمال',  farm: 'مزرعة النخيل', severity: 'low',      status: 'open',       description: 'قراءات غير دقيقة تحتاج معايرة',         reportedDate: '2026-05-12', resolvedDate: null,         downtimeHrs: null, assignedTo: null,          repairCost: 50   },
];

export const preventiveSchedules = [
  { id: 1, equipment: 'مضخات الري الرئيسية',  farm: 'مزرعة الوادي', task: 'فحص الزيت والحزام والتشحيم',         status: 'scheduled',  nextDate: '2026-06-01', frequency: 'شهري',      assignedTo: 'علي حسن',     estimatedCost: 200, estimatedDurationHrs: 3, lastCompleted: '2026-05-01' },
  { id: 2, equipment: 'نظام التبريد بيت 1-4', farm: 'مزرعة النخيل', task: 'تغيير فلاتر الهواء وتنظيف الوحدات', status: 'scheduled',  nextDate: '2026-06-15', frequency: 'ربع سنوي', assignedTo: 'فهد ناصر',    estimatedCost: 650, estimatedDurationHrs: 8, lastCompleted: '2026-03-15' },
  { id: 3, equipment: 'خطوط الري التنقيط',    farm: 'مزرعة الوادي', task: 'تنظيف بالضغط وفحص النبيبات',         status: 'overdue',    nextDate: '2026-05-10', frequency: 'شهري',      assignedTo: 'محمد سالم',   estimatedCost: 120, estimatedDurationHrs: 4, lastCompleted: '2026-04-10' },
  { id: 4, equipment: 'الكاميرات الأمنية',    farm: 'مزرعة الوادي', task: 'تنظيف العدسات وفحص الاتصالات',       status: 'scheduled',  nextDate: '2026-06-20', frequency: 'ربع سنوي', assignedTo: null,           estimatedCost: 80,  estimatedDurationHrs: 2, lastCompleted: '2026-03-20' },
  { id: 5, equipment: 'المولد الكهربائي',      farm: 'مزرعة الجنوب', task: 'تغيير الزيت وفحص البطارية',          status: 'completed',  nextDate: '2026-08-01', frequency: 'نصف سنوي', assignedTo: 'خالد عمر',    estimatedCost: 350, estimatedDurationHrs: 3, lastCompleted: '2026-05-01' },
  { id: 6, equipment: 'الحساسات الإلكترونية', farm: 'مزرعة النخيل', task: 'معايرة وتحديث الفيرم وير',            status: 'inProgress', nextDate: '2026-05-20', frequency: 'نصف سنوي', assignedTo: 'فهد ناصر',    estimatedCost: 200, estimatedDurationHrs: 6, lastCompleted: '2025-11-20' },
  { id: 7, equipment: 'خزانات المياه',         farm: 'مزرعة الوادي', task: 'التنظيف والتعقيم الكامل',             status: 'completed',  nextDate: '2026-08-05', frequency: 'ربع سنوي', assignedTo: 'فريق الصيانة', estimatedCost: 500, estimatedDurationHrs: 6, lastCompleted: '2026-05-05' },
  { id: 8, equipment: 'لوحات التحكم الكهربائية', farm: 'مزرعة النخيل', task: 'فحص الاتصالات والتوصيلات',       status: 'scheduled',  nextDate: '2026-07-01', frequency: 'سنوي',      assignedTo: null,           estimatedCost: 400, estimatedDurationHrs: 4, lastCompleted: '2025-07-01' },
];

export const maintenanceStats = {
  openBreakdowns: 3, resolvedThisMonth: 3, totalCostMonth: 2970,
  avgDowntimeHrs: 8.2, preventiveOnTime: 6, preventiveOverdue: 1, preventiveCompliance: 85,
};

// ─── تحليل الهدر وتقليل النفقات ────────────────────────

export const wasteCategories = [
  { id: 'water',     name: 'هدر المياه',              icon: '💧', priority: 'high',   description: 'زيادة في استهلاك المياه عن المعدل المثالي',             monthlyLoss: 3200, savingPotential: 2200, actions: ['تحسين توقيت الري', 'فحص التسربات', 'كاليبريشن الحساسات'] },
  { id: 'energy',    name: 'هدر الطاقة الكهربائية',   icon: '⚡', priority: 'high',   description: 'استهلاك طاقة زائد في تشغيل المضخات والتبريد',          monthlyLoss: 2800, savingPotential: 1900, actions: ['جدولة التشغيل في أوقات الذروة المنخفضة', 'صيانة دورية للمحركات'] },
  { id: 'fertilizer',name: 'هدر الأسمدة',             icon: '🧪', priority: 'medium', description: 'استخدام أسمدة أكثر من الاحتياج الفعلي للنبات',         monthlyLoss: 1800, savingPotential: 1200, actions: ['تحليل التربة الدوري', 'برامج تسميد دقيقة'] },
  { id: 'labor',     name: 'هدر وقت العمالة',         icon: '👷', priority: 'medium', description: 'ساعات عمل غير منتجة وتنقلات زائدة بين المناطق',       monthlyLoss: 1500, savingPotential: 900,  actions: ['تحسين جداول العمل', 'تقليل التنقلات'] },
  { id: 'produce',   name: 'خسارة المحصول',           icon: '🌾', priority: 'high',   description: 'محصول تالف أو منخفض الجودة بسبب تأخر الحصاد أو التخزين', monthlyLoss: 4500, savingPotential: 3200, actions: ['جدولة الحصاد بدقة', 'تحسين شروط التخزين'] },
  { id: 'pesticide', name: 'هدر المبيدات',            icon: '🫧', priority: 'low',    description: 'رش زائد عن الحاجة أو في توقيت غير مثالي',              monthlyLoss: 900,  savingPotential: 600,  actions: ['مراقبة الآفات بالحساسات', 'رش موجه'] },
];

export const wasteTotalLoss = wasteCategories.reduce((s, c) => s + c.monthlyLoss, 0);
export const wasteSavingPotential = wasteCategories.reduce((s, c) => s + c.savingPotential, 0);

export const wasteMonthlyTrend = [
  { month: 'يناير', total: 17200, saved: 4800 },
  { month: 'فبراير', total: 15900, saved: 5200 },
  { month: 'مارس',   total: 16400, saved: 6100 },
  { month: 'أبريل',  total: 15100, saved: 6800 },
  { month: 'مايو',   total: 14700, saved: 8100 },
];

// ─── مركز التنبيهات ─────────────────────────────────────

export const alertsList = [
  { id: 1,  type: 'sensor',      severity: 'critical', title: 'درجة حرارة مرتفعة - بيت 3',      message: 'درجة حرارة البيت المحمي 3 وصلت 37.2°م وتجاوزت الحد الأعلى (32°م)',     farm: 'مزرعة الوادي', timestamp: 'اليوم 08:14', source: 'حساس درجة حرارة بيت 3',       actionRequired: 'تشغيل نظام التبريد فوراً ومراجعة الوضع', status: 'active'   },
  { id: 2,  type: 'sensor',      severity: 'critical', title: 'رطوبة تربة منخفضة جداً - قطعة A', message: 'رطوبة التربة انخفضت إلى 28% أقل من الحد المثالي (40%)',                   farm: 'مزرعة النخيل', timestamp: 'اليوم 07:45', source: 'حساس رطوبة التربة A',         actionRequired: 'الري الفوري للقطعة A', status: 'active'   },
  { id: 3,  type: 'maintenance',  severity: 'high',     title: 'عطل نظام تبريد بيت 7',            message: 'نظام التبريد في البيت المحمي 7 متوقف عن العمل منذ 18 ساعة',             farm: 'مزرعة النخيل', timestamp: 'أمس 14:30',   source: 'نظام التبريد بيت 7',          actionRequired: 'إرسال فريق الصيانة فوراً', status: 'active'   },
  { id: 4,  type: 'pump',        severity: 'high',     title: 'انسداد في خط ري التنقيط',          message: 'ضغط غير طبيعي في خط التنقيط B يشير إلى انسداد محتمل',                  farm: 'مزرعة الوادي', timestamp: 'اليوم 06:30', source: 'مضخة الري 1',                actionRequired: 'فحص وإصلاح خطوط التنقيط B', status: 'active'   },
  { id: 5,  type: 'sensor',      severity: 'medium',   title: 'حموضة التربة مرتفعة - الشمال',    message: 'pH التربة في القطعة الشمالية 4.8 (الحد المقبول 5.5-7.5)',                farm: 'مزرعة النخيل', timestamp: 'أمس 16:00',   source: 'حساس pH الشمالي',             actionRequired: 'إضافة جير لتعديل الحموضة', status: 'active'   },
  { id: 6,  type: 'maintenance',  severity: 'medium',   title: 'صيانة وقائية متأخرة - التنقيط',  message: 'موعد صيانة خطوط التنقيط تجاوز تاريخه منذ 5 أيام',                       farm: 'مزرعة الوادي', timestamp: '5 أيام',      source: 'جدول الصيانة الوقائية',       actionRequired: 'جدولة صيانة خطوط التنقيط', status: 'active'   },
  { id: 7,  type: 'sensor',      severity: 'medium',   title: 'بطارية حساس pH على وشك النفاد',   message: 'مستوى البطارية 33% سيتوقف الحساس خلال أسبوع',                           farm: 'مزرعة النخيل', timestamp: 'أمس',         source: 'حساس pH الشمالي',             actionRequired: 'تغيير البطارية', status: 'active'   },
  { id: 8,  type: 'weather',     severity: 'medium',   title: 'توقع موجة حر غداً',               message: 'توقعات الطقس تشير لدرجات حرارة تصل 44°م غداً',                          farm: 'عام',           timestamp: 'اليوم 10:00', source: 'خدمة الطقس',                  actionRequired: 'التحضير لتشغيل التبريد بكامل طاقته', status: 'active' },
  { id: 9,  type: 'irrigation',  severity: 'low',      title: 'جدول الري منتهي - الموسم',        message: 'انتهى جدول الري الموسمي للبيت 7، يجب إنشاء جدول جديد',                  farm: 'مزرعة النخيل', timestamp: '2 أيام',      source: 'نظام الري',                   actionRequired: 'إنشاء جدول ري جديد للموسم القادم', status: 'active' },
  { id: 10, type: 'financial',   severity: 'low',      title: 'تجاوز ميزانية الكهرباء',          message: 'تجاوز استهلاك الكهرباء الشهري بنسبة 12% عن الميزانية',                  farm: 'مزرعة الوادي', timestamp: '3 أيام',      source: 'نظام المحاسبة',               actionRequired: 'مراجعة جداول تشغيل المضخات', status: 'active'  },
  { id: 11, type: 'pest',        severity: 'high',     title: 'اشتباه بإصابة حشرية - بيت 5',    message: 'رصد أعراض على نباتات الخيار في بيت 5 تشير لإصابة بحشرة التربس',           farm: 'مزرعة النخيل', timestamp: 'أمس',         source: 'فريق الفحص',                  actionRequired: 'إجراء فحص دقيق وبدء معالجة فورية', status: 'resolved' },
  { id: 12, type: 'system',      severity: 'low',      title: 'انقطاع كاميرا الجنوب',            message: 'الكاميرا رقم 8 في الحوض الجنوبي غير متصلة',                             farm: 'مزرعة الجنوب', timestamp: '4 أيام',      source: 'نظام المراقبة',               actionRequired: 'فحص الاتصال والطاقة للكاميرا', status: 'resolved' },
];

export const alertStats = { total: 12, critical: 2, high: 3, medium: 4, low: 3, resolvedToday: 2 };

// ════════════════════════════════════════════════════════
// وحدة تفاصيل المهمة اليومية المتكاملة
// ════════════════════════════════════════════════════════

export const taskTypeConfig: Record<string, { label: string; icon: string }> = {
  irrigation:          { label: 'ري',                  icon: '💧' },
  fertilization:       { label: 'تسميد',               icon: '🧪' },
  spraying:            { label: 'رش ومكافحة',          icon: '🫧' },
  disease_inspection:  { label: 'فحص مرض/آفة',         icon: '🔍' },
  harvest:             { label: 'حصاد',                icon: '🌾' },
  sorting:             { label: 'فرز',                 icon: '📦' },
  packing:             { label: 'تعبئة',               icon: '🎁' },
  transport:           { label: 'نقل',                 icon: '🚛' },
  maintenance:         { label: 'صيانة',               icon: '🔧' },
  pump_operation:      { label: 'تشغيل مضخة',          icon: '⚡' },
  sensor_check:        { label: 'فحص حساس',            icon: '📡' },
  camera_check:        { label: 'فحص كاميرا',          icon: '📷' },
  meter_reading:       { label: 'قراءة عداد',          icon: '🔢' },
  greenhouse_cleaning: { label: 'تنظيف بيت محمي',      icon: '🧹' },
  growth_monitoring:   { label: 'متابعة نمو',          icon: '🌱' },
  material_dispatch:   { label: 'صرف مواد',            icon: '📤' },
  purchase:            { label: 'شراء',                icon: '🛒' },
  breakdown_report:    { label: 'بلاغ عطل',            icon: '⚠️' },
};

export const taskStatusConfig: Record<string, { label: string; style: string }> = {
  draft:           { label: 'مسودة',           style: 'bg-gray-100 text-gray-500'    },
  scheduled:       { label: 'مجدولة',          style: 'bg-blue-100 text-blue-700'    },
  assigned:        { label: 'مُسندة',           style: 'bg-purple-100 text-purple-700'},
  inProgress:      { label: 'قيد التنفيذ',     style: 'bg-sky-100 text-sky-700'      },
  pendingReview:   { label: 'بانتظار مراجعة',  style: 'bg-amber-100 text-amber-700'  },
  pendingApproval: { label: 'بانتظار اعتماد',  style: 'bg-orange-100 text-orange-700'},
  completed:       { label: 'مكتملة',          style: 'bg-green-100 text-green-700'  },
  rejected:        { label: 'مرفوضة',          style: 'bg-red-100 text-red-700'      },
  overdue:         { label: 'متأخرة',          style: 'bg-red-100 text-red-600'      },
  cancelled:       { label: 'ملغاة',           style: 'bg-gray-100 text-gray-400'    },
};

export const msgTypeConfig: Record<string, { label: string; icon: string }> = {
  text:             { label: 'رسالة',           icon: '💬' },
  image:            { label: 'صورة',            icon: '🖼️' },
  note:             { label: 'ملاحظة تنفيذ',   icon: '📝' },
  approval_request: { label: 'طلب اعتماد',     icon: '🔔' },
  approval:         { label: 'اعتماد',         icon: '✅' },
  rejection:        { label: 'رفض',            icon: '❌' },
  redo_request:     { label: 'إعادة تنفيذ',    icon: '🔄' },
  status_change:    { label: 'تغيير حالة',     icon: '🔀' },
  system:           { label: 'نظام',           icon: '⚙️' },
  mention:          { label: 'إشارة',          icon: '@'  },
};

export const attachmentTypeConfig: Record<string, { label: string; icon: string }> = {
  before:    { label: 'قبل التنفيذ',  icon: '📸' },
  after:     { label: 'بعد التنفيذ', icon: '📸' },
  disease:   { label: 'صورة مرض',    icon: '🔬' },
  pest:      { label: 'صورة آفة',    icon: '🦗' },
  meter:     { label: 'صورة عداد',   icon: '🔢' },
  invoice:   { label: 'فاتورة',      icon: '🧾' },
  equipment: { label: 'صورة جهاز',   icon: '⚙️' },
  breakdown: { label: 'صورة عطل',    icon: '🔴' },
  harvest:   { label: 'صورة حصاد',   icon: '🌾' },
  document:  { label: 'مستند/ملف',   icon: '📄' },
  other:     { label: 'أخرى',        icon: '📎' },
};

export const sampleTaskDetail = {
  id: 101,
  title: 'رش وقائي ضد البياض الدقيقي — بيت محمي رقم 7',
  type: 'spraying',
  priority: 'high',
  status: 'pendingReview',
  cycle: 'خيار — بيت محمي رقم 7',
  farm: 'مزرعة النخيل',
  field: 'بيت محمي 7',
  scheduledTime: 'اليوم 17:00',
  dueDate: '2026-05-16',
  createdDate: '2026-05-16',
  estimatedCost: 180,
  actualCost: 165,
  instructions: 'رش وقائي ضد البياض الدقيقي بجرعة مخفضة 50% مع مادة Myclobutanil. تصوير الأوراق قبل وبعد الرش. تهوية البيت لمدة ساعة كاملة بعد الانتهاء. ارتداء معدات الحماية الشخصية طوال مدة التنفيذ.',
  participants: [
    { name: 'المهندس أحمد',  role: 'المهندس الزراعي',  initials: 'أح', color: 'bg-purple-500' },
    { name: 'المشرف خالد',   role: 'المشرف الميداني',   initials: 'خل', color: 'bg-blue-500'   },
    { name: 'العامل يوسف',   role: 'العامل',            initials: 'يو', color: 'bg-green-500'  },
  ],
  materials: [
    { name: 'Myclobutanil — مبيد فطري', qty: 50, unit: 'مل',   cost: 120 },
    { name: 'قفازات حماية',              qty: 1,  unit: 'زوج',  cost: 15  },
    { name: 'كمامة تنفس',                qty: 1,  unit: 'قطعة', cost: 25  },
    { name: 'ماء (محلول الرش)',          qty: 20, unit: 'لتر',   cost: 0   },
  ],
  executionLog: [
    { time: '15:30', actor: 'المهندس أحمد', role: 'المهندس الزراعي',  action: 'إنشاء المهمة وإسنادها للمشرف خالد',         type: 'create'   },
    { time: '16:30', actor: 'المشرف خالد',  role: 'المشرف الميداني',  action: 'استلام المهمة وتوجيه العامل يوسف للتنفيذ',  type: 'assign'   },
    { time: '16:55', actor: 'العامل يوسف',  role: 'العامل',            action: 'صرف المواد (مبيد + معدات حماية) من المستودع', type: 'material' },
    { time: '17:05', actor: 'العامل يوسف',  role: 'العامل',            action: 'بدء تجهيز محلول الرش وتجهيز الرش',           type: 'start'    },
    { time: '17:20', actor: 'العامل يوسف',  role: 'العامل',            action: 'بدء تنفيذ الرش الميداني في البيت 7',          type: 'progress' },
    { time: '18:10', actor: 'العامل يوسف',  role: 'العامل',            action: 'الانتهاء من الرش وتهوية البيت المحمي',        type: 'done'     },
    { time: '18:25', actor: 'المشرف خالد',  role: 'المشرف الميداني',  action: 'مراجعة ميدانية — الرش تم بشكل صحيح وكامل',  type: 'review'   },
    { time: '18:30', actor: 'النظام',        role: '',                  action: 'تغيير تلقائي للحالة إلى "بانتظار مراجعة"',   type: 'system'   },
  ],
};

export const taskConversation = [
  {
    id: 1, type: 'text', sender: 'المهندس أحمد', role: 'المهندس الزراعي',
    initials: 'أح', color: 'bg-purple-500', time: '15:30', isSystem: false,
    text: 'يرجى تنفيذ رش وقائي ضد البياض الدقيقي بجرعة مخفضة، مع تصوير الأوراق قبل وبعد الرش.',
  },
  {
    id: 2, type: 'text', sender: 'المشرف خالد', role: 'المشرف الميداني',
    initials: 'خل', color: 'bg-blue-500', time: '16:30', isSystem: false,
    text: 'تم استلام المهمة، وسيتم توجيه العامل يوسف للتنفيذ الساعة 5 مساءً.',
  },
  {
    id: 3, type: 'system', sender: 'النظام', role: '',
    initials: '⚙', color: 'bg-gray-400', time: '16:35', isSystem: true,
    text: 'تم إسناد المهمة إلى العامل يوسف', statusChange: 'مُسندة',
  },
  {
    id: 4, type: 'image', sender: 'العامل يوسف', role: 'العامل',
    initials: 'يو', color: 'bg-green-500', time: '17:10', isSystem: false,
    text: 'صورة الأوراق قبل الرش — يظهر بياض طفيف في الزاوية الشمالية للبيت.',
    attachments: [{ type: 'before', label: 'صورة قبل الرش', filename: 'before_spray_beit7.jpg' }],
  },
  {
    id: 5, type: 'note', sender: 'العامل يوسف', role: 'العامل',
    initials: 'يو', color: 'bg-green-500', time: '18:10', isSystem: false,
    text: 'تم التنفيذ. مرفق صورة المبيد المستخدم وصورة الأوراق بعد الرش.',
    attachments: [
      { type: 'after',     label: 'صورة بعد الرش',     filename: 'after_spray_beit7.jpg'     },
      { type: 'equipment', label: 'صورة المبيد المستخدم', filename: 'myclobutanil_bottle.jpg' },
    ],
  },
  {
    id: 6, type: 'system', sender: 'النظام', role: '',
    initials: '⚙', color: 'bg-gray-400', time: '18:11', isSystem: true,
    text: 'تم إرفاق 3 صور بواسطة العامل يوسف',
  },
  {
    id: 7, type: 'text', sender: 'المشرف خالد', role: 'المشرف الميداني',
    initials: 'خل', color: 'bg-blue-500', time: '18:25', isSystem: false,
    text: 'تمت مراجعة التنفيذ ميدانياً، والرش تم بشكل صحيح وكامل في جميع أنحاء البيت.',
  },
  {
    id: 8, type: 'approval_request', sender: 'المشرف خالد', role: 'المشرف الميداني',
    initials: 'خل', color: 'bg-blue-500', time: '18:28', isSystem: false,
    text: '@المهندس أحمد — طلب اعتماد إتمام المهمة. تمت المراجعة الميدانية بنجاح والتنفيذ مطابق للمواصفات.',
  },
  {
    id: 9, type: 'system', sender: 'النظام', role: '',
    initials: '⚙', color: 'bg-gray-400', time: '18:28', isSystem: true,
    text: 'تم تغيير الحالة إلى "بانتظار اعتماد"', statusChange: 'بانتظار اعتماد',
  },
  {
    id: 10, type: 'approval', sender: 'المهندس أحمد', role: 'المهندس الزراعي',
    initials: 'أح', color: 'bg-purple-500', time: '18:45', isSystem: false,
    text: 'معتمد. الرجاء متابعة الحالة بعد 48 ساعة وإرسال تقرير بنتيجة الرش.',
  },
  {
    id: 11, type: 'system', sender: 'النظام', role: '',
    initials: '⚙', color: 'bg-gray-400', time: '18:45', isSystem: true,
    text: 'تم تغيير حالة المهمة من "بانتظار اعتماد" إلى "مكتملة"', statusChange: 'مكتملة',
  },
];

export const taskAttachments = [
  { id: 1, type: 'before',    label: 'الأوراق قبل الرش',      filename: 'before_spray_beit7.jpg',  uploadedBy: 'العامل يوسف', time: '17:10', size: '2.4 MB', emoji: '🌿' },
  { id: 2, type: 'after',     label: 'الأوراق بعد الرش',      filename: 'after_spray_beit7.jpg',   uploadedBy: 'العامل يوسف', time: '18:10', size: '2.1 MB', emoji: '🌿' },
  { id: 3, type: 'equipment', label: 'صورة المبيد المستخدم',  filename: 'myclobutanil_bottle.jpg', uploadedBy: 'العامل يوسف', time: '18:10', size: '1.8 MB', emoji: '🧴' },
];
