interface Props {
  status: string;
  size?: 'xs' | 'sm' | 'md';
}

const MAP: Record<string, [string, string]> = {
  'ممتاز':           ['bg-emerald-100 text-emerald-800 border-emerald-200', 'bg-emerald-500'],
  'جيد':             ['bg-green-100 text-green-800 border-green-200',       'bg-green-500'  ],
  'نشط':             ['bg-blue-100 text-blue-800 border-blue-200',           'bg-blue-500'   ],
  'نشطة':            ['bg-blue-100 text-blue-800 border-blue-200',           'bg-blue-500'   ],
  'يحتاج متابعة':   ['bg-amber-100 text-amber-800 border-amber-200',        'bg-amber-500'  ],
  'تحت التجهيز':    ['bg-slate-100 text-slate-600 border-slate-200',        'bg-slate-400'  ],
  'خطر':             ['bg-red-100 text-red-800 border-red-200',              'bg-red-500'    ],
  'مكتمل':           ['bg-purple-100 text-purple-800 border-purple-200',     'bg-purple-500' ],
  'مرتفع':           ['bg-red-100 text-red-800 border-red-200',              'bg-red-500'    ],
  'طبيعي':           ['bg-green-100 text-green-800 border-green-200',        'bg-green-500'  ],
  'جيدة':            ['bg-green-100 text-green-800 border-green-200',        'bg-green-500'  ],
  'جاهز':            ['bg-emerald-100 text-emerald-800 border-emerald-200',  'bg-emerald-500'],
  'متوسط':           ['bg-amber-100 text-amber-800 border-amber-200',        'bg-amber-500'  ],
  'منخفض':           ['bg-green-100 text-green-800 border-green-200',        'bg-green-500'  ],
  'مقبول':           ['bg-sky-100 text-sky-800 border-sky-200',              'bg-sky-500'    ],
  'غير نشط':         ['bg-gray-100 text-gray-500 border-gray-200',           'bg-gray-400'   ],
};

const SIZES = {
  xs: 'px-2 py-0.5 text-[10px] gap-1',
  sm: 'px-2.5 py-1 text-xs gap-1.5',
  md: 'px-3 py-1.5 text-sm gap-1.5',
};

const DOT_SIZES = { xs: 'w-1 h-1', sm: 'w-1.5 h-1.5', md: 'w-2 h-2' };

export default function StatusBadge({ status, size = 'sm' }: Props) {
  const [cls, dot] = MAP[status] ?? ['bg-gray-100 text-gray-600 border-gray-200', 'bg-gray-400'];
  return (
    <span className={`inline-flex items-center rounded-full border font-medium ${SIZES[size]} ${cls}`}>
      <span className={`rounded-full flex-shrink-0 ${DOT_SIZES[size]} ${dot}`} />
      {status}
    </span>
  );
}
