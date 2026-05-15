export const dashboardStats = {
  farms: 3,
  fields: 18,
  greenhouses: 42,
  activeCycles: 27,
  todayProduction: 4850,
  todaySales: 18700,
  todayExpenses: 6250,
  netProfit: 12450,
};

export const alerts = [
  { id: 1, type: 'danger', title: 'ارتفاع ملوحة المياه', desc: 'محطة التحلية رقم 1 — EC: 1.8 (الحد المسموح: 1.2)', time: 'منذ ساعتين' },
  { id: 2, type: 'warning', title: 'زيادة تكلفة الكهرباء', desc: 'البيت المحمي رقم 7 — تجاوز المتوسط بنسبة 18%', time: 'منذ 4 ساعات' },
  { id: 3, type: 'warning', title: 'انخفاض إنتاج الخيار', desc: 'البيت رقم 2 — انخفض بنسبة 18% عن أسبوع الماضي', time: 'منذ يوم' },
];

export const topCrops = [
  { name: 'خيار', profit: 8300, production: 9800, unit: 'كجم' },
  { name: 'طماطم', profit: 6200, production: 7400, unit: 'كجم' },
  { name: 'فلفل', profit: 4100, production: 2900, unit: 'كجم' },
  { name: 'باذنجان', profit: 2800, production: 3200, unit: 'كجم' },
];

export const topGreenhouses = [
  { id: 'رقم 7', crop: 'خيار', production: 410, status: 'يحتاج متابعة' },
  { id: 'رقم 1', crop: 'خيار', production: 390, status: 'ممتاز' },
  { id: 'رقم 12', crop: 'طماطم', production: 340, status: 'جيد' },
  { id: 'رقم 3', crop: 'فلفل', production: 210, status: 'جيد' },
];

export const weeklyProduction = [
  { day: 'السبت', value: 4200 },
  { day: 'الأحد', value: 4500 },
  { day: 'الإثنين', value: 4100 },
  { day: 'الثلاثاء', value: 4800 },
  { day: 'الأربعاء', value: 5100 },
  { day: 'الخميس', value: 4850 },
  { day: 'الجمعة', value: 3900 },
];

export const cropDistribution = [
  { name: 'خيار', value: 35 },
  { name: 'طماطم', value: 28 },
  { name: 'فلفل', value: 15 },
  { name: 'باذنجان', value: 12 },
  { name: 'أخرى', value: 10 },
];

export const farms = [
  {
    id: 1,
    name: 'مزرعة النخيل',
    location: 'الرياض — حرة رهاط',
    area: '25 هكتار',
    fields: 8,
    greenhouses: 18,
    status: 'نشطة',
    manager: 'أحمد الغامدي',
    fields_data: [
      { id: 1, name: 'حقل 1', crop: 'طماطم', area: '5 هكتار', irrigation: 'تنقيط', status: 'نشط', production: '12 طن متوقع', risk: 'منخفض' },
      { id: 2, name: 'حقل 2', crop: 'بصل', area: '3 هكتار', irrigation: 'رش', status: 'تحت التجهيز', production: '—', risk: 'لا يوجد' },
      { id: 3, name: 'حقل 3', crop: 'بطاطس', area: '7 هكتار', irrigation: 'تنقيط', status: 'يحتاج متابعة', production: '18 طن متوقع', risk: 'متوسط' },
      { id: 4, name: 'حقل 4', crop: 'ذرة', area: '4 هكتار', irrigation: 'غمر', status: 'نشط', production: '8 طن متوقع', risk: 'منخفض' },
    ],
  },
  {
    id: 2,
    name: 'مزرعة الواحة',
    location: 'القصيم — عنيزة',
    area: '15 هكتار',
    fields: 6,
    greenhouses: 14,
    status: 'نشطة',
    manager: 'محمد السالم',
    fields_data: [],
  },
  {
    id: 3,
    name: 'مزرعة الخضراء',
    location: 'المدينة المنورة',
    area: '10 هكتار',
    fields: 4,
    greenhouses: 10,
    status: 'نشطة',
    manager: 'خالد العتيبي',
    fields_data: [],
  },
];

export const greenhouses = [
  {
    id: 1,
    name: 'بيت محمي رقم 1',
    type: 'عادي',
    crop: 'خيار',
    variety: 'خيار بيت محمي',
    plants: 1200,
    plantDate: '2026-01-15',
    dailyProduction: 390,
    diseaseStatus: 'لا يوجد',
    estimatedProfit: 7200,
    electricityHours: 6,
    temperature: 24,
    humidity: 65,
    status: 'ممتاز',
  },
  {
    id: 2,
    name: 'بيت محمي رقم 2',
    type: 'عادي',
    crop: 'طماطم',
    variety: 'طماطم سكري',
    plants: 950,
    plantDate: '2026-01-20',
    dailyProduction: 280,
    diseaseStatus: 'بياض دقيقي — خفيف',
    estimatedProfit: 5100,
    electricityHours: 5,
    temperature: 26,
    humidity: 70,
    status: 'يحتاج متابعة',
  },
  {
    id: 3,
    name: 'بيت محمي رقم 3',
    type: 'مكيف',
    crop: 'فلفل',
    variety: 'فلفل رومي أخضر',
    plants: 800,
    plantDate: '2026-02-01',
    dailyProduction: 210,
    diseaseStatus: 'لا يوجد',
    estimatedProfit: 4800,
    electricityHours: 10,
    temperature: 22,
    humidity: 60,
    status: 'جيد',
  },
  {
    id: 7,
    name: 'بيت محمي رقم 7',
    type: 'مكيف',
    crop: 'خيار',
    variety: 'خيار بيت محمي',
    plants: 1350,
    plantDate: '2026-01-10',
    dailyProduction: 410,
    diseaseStatus: 'لا يوجد',
    estimatedProfit: 8300,
    electricityHours: 14,
    temperature: 27,
    humidity: 68,
    status: 'يحتاج متابعة',
    coolingData: {
      fanHours: 9,
      coolingCellHours: 7,
      electricityKwh: 320,
      electricityCost: 176,
      costPerKg: 0.43,
    },
  },
  {
    id: 12,
    name: 'بيت محمي رقم 12',
    type: 'عادي',
    crop: 'طماطم',
    variety: 'طماطم بيف',
    plants: 1100,
    plantDate: '2026-01-25',
    dailyProduction: 340,
    diseaseStatus: 'لا يوجد',
    estimatedProfit: 6800,
    electricityHours: 7,
    temperature: 25,
    humidity: 63,
    status: 'جيد',
  },
];

export const cropCategories = [
  {
    id: 1,
    name: 'خضار',
    icon: '🥬',
    count: 8,
    crops: [
      { name: 'طماطم', openField: true, greenhouse: true, cooled: true, nursery: true, cycleDays: '70-80', yield: '8-12 كجم/نبات' },
      { name: 'خيار', openField: true, greenhouse: true, cooled: true, nursery: true, cycleDays: '55-70', yield: '6-10 كجم/نبات' },
      { name: 'فلفل', openField: true, greenhouse: true, cooled: true, nursery: true, cycleDays: '80-100', yield: '4-7 كجم/نبات' },
      { name: 'باذنجان', openField: true, greenhouse: true, cooled: false, nursery: true, cycleDays: '75-90', yield: '5-8 كجم/نبات' },
      { name: 'كوسة', openField: true, greenhouse: true, cooled: false, nursery: false, cycleDays: '45-55', yield: '4-6 كجم/نبات' },
      { name: 'خس', openField: false, greenhouse: true, cooled: true, nursery: true, cycleDays: '40-50', yield: '0.3-0.5 كجم/نبات' },
      { name: 'بطاطس', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '90-110', yield: '2-3 كجم/نبات' },
      { name: 'بصل', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '100-120', yield: '1-2 كجم/نبات' },
    ],
  },
  {
    id: 2,
    name: 'فواكه',
    icon: '🍇',
    count: 6,
    crops: [
      { name: 'عنب', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '120-150', yield: '5-8 كجم/شجرة' },
      { name: 'رمان', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '150-180', yield: '8-15 كجم/شجرة' },
      { name: 'مانجو', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '120-180', yield: '20-40 كجم/شجرة' },
      { name: 'تين', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '90-120', yield: '5-10 كجم/شجرة' },
      { name: 'فراولة', openField: true, greenhouse: true, cooled: true, nursery: false, cycleDays: '60-90', yield: '0.5-1 كجم/نبات' },
      { name: 'حمضيات', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '180-240', yield: '30-60 كجم/شجرة' },
    ],
  },
  {
    id: 3,
    name: 'نخيل وتمور',
    icon: '🌴',
    count: 4,
    crops: [
      { name: 'نخيل عجوة', openField: true, greenhouse: false, cooled: false, nursery: true, cycleDays: '365', yield: '50-100 كجم/شجرة' },
      { name: 'نخيل سكري', openField: true, greenhouse: false, cooled: false, nursery: true, cycleDays: '365', yield: '40-80 كجم/شجرة' },
      { name: 'نخيل بريم', openField: true, greenhouse: false, cooled: false, nursery: true, cycleDays: '365', yield: '30-60 كجم/شجرة' },
      { name: 'نخيل مجدول', openField: true, greenhouse: false, cooled: false, nursery: true, cycleDays: '365', yield: '60-100 كجم/شجرة' },
    ],
  },
  {
    id: 4,
    name: 'أعلاف',
    icon: '🌾',
    count: 3,
    crops: [
      { name: 'برسيم', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '60-80', yield: '4-6 طن/هكتار' },
      { name: 'ذرة علفية', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '90-110', yield: '8-12 طن/هكتار' },
      { name: 'شعير', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '100-120', yield: '2-4 طن/هكتار' },
    ],
  },
  {
    id: 5,
    name: 'حبوب',
    icon: '🌽',
    count: 3,
    crops: [
      { name: 'قمح', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '120-150', yield: '3-5 طن/هكتار' },
      { name: 'شعير', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '100-120', yield: '2-4 طن/هكتار' },
      { name: 'ذرة', openField: true, greenhouse: false, cooled: false, nursery: false, cycleDays: '90-110', yield: '6-10 طن/هكتار' },
    ],
  },
  {
    id: 6,
    name: 'ورقيات وعطريات',
    icon: '🌿',
    count: 4,
    crops: [
      { name: 'نعناع', openField: true, greenhouse: true, cooled: false, nursery: false, cycleDays: '45-60', yield: '2-4 طن/هكتار' },
      { name: 'ريحان', openField: true, greenhouse: true, cooled: true, nursery: false, cycleDays: '40-55', yield: '1-3 طن/هكتار' },
      { name: 'بقدونس', openField: true, greenhouse: true, cooled: false, nursery: false, cycleDays: '50-70', yield: '2-4 طن/هكتار' },
      { name: 'كزبرة', openField: true, greenhouse: true, cooled: false, nursery: false, cycleDays: '40-60', yield: '1-2 طن/هكتار' },
    ],
  },
];

export const growingCycle = {
  id: 1,
  title: 'خيار — بيت محمي رقم 7',
  cultivationType: 'الزراعة المحمية المكيفة',
  crop: 'خيار',
  variety: 'خيار بيت محمي — Syngenta',
  startDate: '2026-01-10',
  expectedEndDate: '2026-03-25',
  plantCount: 1350,
  area: '480 م²',
  cycleAge: 42,
  status: 'نشطة',
  totalProduction: 9800,
  totalSales: 24500,
  totalCosts: 16200,
  netProfit: 8300,
  costPerKg: 1.65,
  profitPerKg: 0.85,
  dailyProduction: [
    { day: 'يناير 20', value: 180 },
    { day: 'يناير 27', value: 220 },
    { day: 'فبراير 3', value: 310 },
    { day: 'فبراير 10', value: 380 },
    { day: 'فبراير 17', value: 410 },
    { day: 'فبراير 20', value: 410 },
  ],
  expenses: [
    { category: 'بذور وشتلات', amount: 2400 },
    { category: 'أسمدة', amount: 3200 },
    { category: 'مبيدات', amount: 800 },
    { category: 'عمالة', amount: 4500 },
    { category: 'مياه', amount: 1032 },
    { category: 'كهرباء', amount: 3268 },
    { category: 'مواد تعبئة', amount: 1000 },
  ],
  irrigationRecords: [
    { date: '2026-02-18', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', quantity: '3.5 م³', cost: '8.40 ريال' },
    { date: '2026-02-19', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', quantity: '3.5 م³', cost: '8.40 ريال' },
    { date: '2026-02-20', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '50 دقيقة', quantity: '4.0 م³', cost: '9.60 ريال' },
  ],
};

export const operations = [
  { id: 1, date: '2026-02-20', operation: 'رش مبيد وقائي', cycle: 'خيار — بيت رقم 7', executor: 'أحمد', cost: '180 ريال', status: 'مكتمل' },
  { id: 2, date: '2026-02-19', operation: 'ري — تنقيط', cycle: 'طماطم — بيت رقم 2', executor: 'محمد', cost: '55 ريال', status: 'مكتمل' },
  { id: 3, date: '2026-02-19', operation: 'تسميد نيتروجيني', cycle: 'خيار — بيت رقم 1', executor: 'خالد', cost: '220 ريال', status: 'مكتمل' },
  { id: 4, date: '2026-02-18', operation: 'حصاد', cycle: 'خيار — بيت رقم 7', executor: 'أحمد + يوسف', cost: '600 ريال', status: 'مكتمل' },
  { id: 5, date: '2026-02-18', operation: 'تقليم وتربيط', cycle: 'طماطم — بيت رقم 12', executor: 'محمد', cost: '300 ريال', status: 'مكتمل' },
  { id: 6, date: '2026-02-17', operation: 'فرز وجودة', cycle: 'خيار — بيت رقم 7', executor: 'يوسف', cost: '200 ريال', status: 'مكتمل' },
];

export const operationTypes = [
  { name: 'تجهيز الأرض', records: 12, lastActivity: '2026-01-05', icon: '🚜' },
  { name: 'الزراعة والشتل', records: 27, lastActivity: '2026-02-01', icon: '🌱' },
  { name: 'الري', records: 218, lastActivity: '2026-02-20', icon: '💧' },
  { name: 'التسميد', records: 86, lastActivity: '2026-02-19', icon: '🧪' },
  { name: 'الرش والمكافحة', records: 43, lastActivity: '2026-02-20', icon: '🛡️' },
  { name: 'الأمراض والآفات', records: 18, lastActivity: '2026-02-15', icon: '🔬' },
  { name: 'التقليم والتربيط', records: 54, lastActivity: '2026-02-18', icon: '✂️' },
  { name: 'الحصاد', records: 92, lastActivity: '2026-02-20', icon: '🌾' },
  { name: 'الفرز والجودة', records: 87, lastActivity: '2026-02-20', icon: '⭐' },
  { name: 'التعبئة', records: 78, lastActivity: '2026-02-20', icon: '📦' },
  { name: 'النقل', records: 65, lastActivity: '2026-02-19', icon: '🚛' },
  { name: 'البيع', records: 61, lastActivity: '2026-02-19', icon: '💰' },
];

export const waterSources = [
  { id: 1, name: 'بئر رقم 1', type: 'بئر', active: true, costPerM3: 0.80, latestEC: 1.2, latestTDS: 650, latestPH: 7.1, notes: 'المصدر الرئيسي للري' },
  { id: 2, name: 'محطة التحلية رقم 1', type: 'محطة تحلية', active: true, costPerM3: 2.40, latestEC: 0.9, latestTDS: 420, latestPH: 7.0, notes: 'مياه محلاة عالية الجودة', desalination: { dailyCapacity: 60, lastMaintenance: '2026-02-01', ecBefore: 4.8, ecAfter: 0.9, status: 'جيدة' } },
  { id: 3, name: 'خزان رئيسي', type: 'خزان', active: true, costPerM3: 0, latestEC: 1.0, latestTDS: 500, latestPH: 7.2, notes: 'خزان احتياطي — سعة 200 م³' },
  { id: 4, name: 'صهاريج', type: 'صهاريج', active: false, costPerM3: 4.50, latestEC: 0.8, latestTDS: 380, latestPH: 7.0, notes: 'تستخدم عند الحاجة فقط' },
];

export const irrigationRecords = [
  { id: 1, cycle: 'خيار — بيت رقم 7', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', quantity: '3.5 م³', cost: '8.40', date: '2026-02-20' },
  { id: 2, cycle: 'طماطم — بيت رقم 2', source: 'بئر رقم 1', method: 'تنقيط', duration: '60 دقيقة', quantity: '4.8 م³', cost: '3.84', date: '2026-02-20' },
  { id: 3, cycle: 'حقل طماطم 1', source: 'بئر رقم 1', method: 'رش', duration: '90 دقيقة', quantity: '12 م³', cost: '9.60', date: '2026-02-19' },
  { id: 4, cycle: 'خيار — بيت رقم 1', source: 'محطة التحلية رقم 1', method: 'تنقيط', duration: '45 دقيقة', quantity: '3.5 م³', cost: '8.40', date: '2026-02-19' },
];

export const waterStats = {
  totalConsumption: 430,
  totalCost: 1032,
  costPerKg: 0.11,
  consumptionPerKg: 0.044,
  salinityAlert: 'متوسط',
};

export const electricityData = {
  totalKwh: 1850,
  totalCost: 1017,
  topConsumer: 'بيت رقم 7',
  costPerKg: 0.32,
  openFaults: 2,
  greenhouseOps: [
    { name: 'بيت رقم 1', fans: '8 ساعات', cooling: '—', fog: '—', pumps: '12 ساعات', lighting: '6 ساعات', kwh: 180, cost: 99, status: 'طبيعي' },
    { name: 'بيت رقم 2', fans: '9 ساعات', cooling: '—', fog: '—', pumps: '12 ساعات', lighting: '6 ساعات', kwh: 200, cost: 110, status: 'طبيعي' },
    { name: 'بيت رقم 3', fans: '10 ساعات', cooling: '6 ساعات', fog: '4 ساعات', pumps: '12 ساعات', lighting: '6 ساعات', kwh: 280, cost: 154, status: 'طبيعي' },
    { name: 'بيت رقم 7', fans: '9 ساعات', cooling: '7 ساعات', fog: '5 ساعات', pumps: '12 ساعات', lighting: '6 ساعات', kwh: 320, cost: 176, status: 'مرتفع' },
    { name: 'بيت رقم 12', fans: '8 ساعات', cooling: '—', fog: '—', pumps: '12 ساعات', lighting: '6 ساعات', kwh: 190, cost: 105, status: 'طبيعي' },
  ],
  weeklyConsumption: [
    { day: 'السبت', value: 1650 },
    { day: 'الأحد', value: 1720 },
    { day: 'الإثنين', value: 1800 },
    { day: 'الثلاثاء', value: 1750 },
    { day: 'الأربعاء', value: 1900 },
    { day: 'الخميس', value: 1850 },
    { day: 'الجمعة', value: 1600 },
  ],
};

export const reports = [
  { id: 1, name: 'تقرير الإنتاج', desc: 'إجمالي الإنتاج لكل محصول وحقل وبيت محمي خلال الفترة المحددة', lastGenerated: '2026-02-20', status: 'جاهز' },
  { id: 2, name: 'تقرير التكاليف', desc: 'تفصيل تكاليف الدورات الزراعية: بذور، أسمدة، مياه، كهرباء، عمالة', lastGenerated: '2026-02-20', status: 'جاهز' },
  { id: 3, name: 'تقرير الربحية', desc: 'صافي الربح، هامش الربح، ربحية الكيلو لكل دورة ومحصول', lastGenerated: '2026-02-19', status: 'جاهز' },
  { id: 4, name: 'تقرير المياه والري', desc: 'استهلاك المياه، تكلفة الري، جودة المياه، تنبيهات الملوحة', lastGenerated: '2026-02-20', status: 'جاهز' },
  { id: 5, name: 'تقرير الكهرباء والتشغيل', desc: 'استهلاك الكهرباء لكل بيت محمي، تكلفة التشغيل، تقييم الجدوى', lastGenerated: '2026-02-18', status: 'جاهز' },
  { id: 6, name: 'تقرير الأمراض والآفات', desc: 'الأمراض المسجلة، المبيدات المستخدمة، نتائج العلاج، التوصيات', lastGenerated: '2026-02-15', status: 'جاهز' },
  { id: 7, name: 'تقرير العمال', desc: 'ساعات العمل، توزيع المهام، تكلفة العمالة، الإنتاجية', lastGenerated: '2026-02-14', status: 'جاهز' },
  { id: 8, name: 'تقرير المخزون', desc: 'الكميات المتاحة، المستهلكة، تنبيهات الانخفاض، القيمة الإجمالية', lastGenerated: '2026-02-17', status: 'جاهز' },
  { id: 9, name: 'تقرير الدورة الزراعية', desc: 'تفاصيل كاملة لدورة زراعية: إنتاج، تكاليف، أرباح، تحليل', lastGenerated: '2026-02-20', status: 'جاهز' },
  { id: 10, name: 'تقرير المقارنة بين المواسم', desc: 'مقارنة الأداء والإنتاج والربحية بين المواسم المختلفة', lastGenerated: '2026-01-15', status: 'قديم' },
  { id: 11, name: 'تقرير المحصول', desc: 'أداء كل محصول: إنتاجية، جودة، ربحية، أمراض', lastGenerated: '2026-02-18', status: 'جاهز' },
];

export const smartAnalysis = {
  performanceScore: 82,
  riskLevel: 'متوسط',
  profitability: 'جيدة',
  waterEfficiency: 'جيدة',
  electricityEfficiency: 'تحتاج متابعة',
  risks: [
    { level: 'خطر', title: 'ارتفاع تكلفة الكهرباء', desc: 'تجاوزت تكلفة الكهرباء في البيت رقم 7 المتوسط المقبول بنسبة 18%' },
    { level: 'تحذير', title: 'زيادة استهلاك المياه', desc: 'استهلاك المياه في الأسبوع الماضي أعلى من المتوسط بنسبة 12%' },
    { level: 'تحذير', title: 'انخفاض الإنتاج الأسبوع الرابع', desc: 'انخفض متوسط الإنتاج اليومي من 450 إلى 410 كجم' },
    { level: 'معلومة', title: 'تكرار البياض الدقيقي', desc: 'تكرر ظهور البياض الدقيقي في البيت رقم 2 للمرة الثانية هذا الموسم' },
  ],
  aiReport: {
    summary: 'أظهرت الدورة الزراعية لمحصول الخيار في البيت المحمي رقم 7 أداءً جيداً بشكل عام، مع وجود تحديات في إدارة تكلفة الطاقة. الإنتاج الإجمالي يسير وفق التوقعات مع انخفاض طفيف في الأسبوع الرابع يستحق المتابعة.',
    weaknesses: [
      'ارتفاع تكلفة الكهرباء بنسبة 18% مقارنة بالبيوت المشابهة',
      'ساعات تشغيل خلايا التبريد تتجاوز الحاجة الفعلية بـ 2-3 ساعات يومياً',
      'انخفاض طفيف في الإنتاج خلال الأسبوع الرابع',
    ],
    strengths: [
      'نسبة إنجاز الإنتاج 98% مقارنة بالهدف المحدد',
      'جودة المياه ممتازة بعد محطة التحلية',
      'لا توجد إصابات بالأمراض حتى الآن',
      'كفاءة التسميد جيدة وفق البرنامج المتبع',
    ],
    recommendations: [
      'مراجعة جدول تشغيل التبريد خلال ساعات الذروة وتقليل مدة التشغيل غير المؤثرة على الإنتاج',
      'تركيب حساس درجة حرارة ذكي لضبط التشغيل تلقائياً',
      'زيادة جرعة السماد في الأسبوع الخامس لتعويض الانخفاض',
      'متابعة الرطوبة الداخلية وتقليلها إذا تجاوزت 75%',
    ],
    nextSeasonPlan: 'يُنصح بإعادة زراعة الخيار في الموسم القادم مع تحسين جدول التبريد وإضافة برنامج وقائي مبكر للبياض الدقيقي، مع استهداف رفع الإنتاج بنسبة 10-15%.',
  },
};
