import homeNursing from '../assets/images/services/home-nursing.jpg'
import elderlyCare from '../assets/images/services/elderly-care.jpg'
import patientCare from '../assets/images/services/patient-care.jpg'
import fullTime from '../assets/images/services/full-time-caregiver.jpg'
import partTime from '../assets/images/services/part-time-caregiver.jpg'
import medicine from '../assets/images/services/medicine-management.jpg'
import meals from '../assets/images/services/meal-assistance.jpg'
import postSurgery from '../assets/images/services/post-surgery-care.jpg'
import bedside from '../assets/images/services/bedside-attendant.jpg'
import personalCare from '../assets/images/services/personal-care.jpg'
import icuAtHome from '../assets/images/services/icu-at-home.jpg'

/**
 * Service catalogue. Shape mirrors what a future `GET /services` endpoint
 * should return. `icon` is a string key resolved by `utils/icons.js` so the
 * data stays serialisable.
 */
export const serviceCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'medical', label: 'Nursing & Recovery' },
  { id: 'caregivers', label: 'Caregivers' },
  { id: 'daily', label: 'Daily Living Support' },
]

export const services = [
  {
    id: 'svc-01',
    slug: 'home-nursing-care',
    title: 'Home Nursing Care',
    category: 'medical',
    icon: 'stethoscope',
    image: homeNursing,
    imageAlt: 'Nurse checking an elderly woman’s blood pressure at home',
    summary:
      'Professional nursing assistance at home, from wound dressing and injections to post-operative support and routine health monitoring.',
    description:
      'Our home nursing service brings qualified nursing assistance to your doorstep, so patients can receive attentive clinical support in familiar surroundings. Nurses follow the instructions of the treating doctor and keep the family informed at every step.',
    features: [
      'Professional nursing assistance',
      'Wound dressing and injections by qualified nurses',
      'Post-operative nursing support',
      'Patient health monitoring',
    ],
    suitableFor: [
      'Patients recovering after hospital discharge',
      'People who need regular dressings or injections',
      'Patients whose vitals need routine monitoring',
    ],
  },
  {
    id: 'svc-02',
    slug: 'elderly-care',
    title: 'Elderly Care',
    category: 'caregivers',
    icon: 'heartHandshake',
    image: elderlyCare,
    imageAlt: 'Caregiver smiling with an elderly man in a wheelchair',
    summary:
      'Respectful, patient assistance for senior citizens with daily routines, mobility, hygiene and warm companionship.',
    description:
      'Growing older at home should feel safe and dignified. Our elderly caregivers help seniors with everyday routines, offer steady support when moving around, and provide the kind of companionship that keeps the day pleasant and engaged.',
    features: [
      'Personal assistance for senior citizens',
      'Daily routine support',
      'Companionship and mobility assistance',
      'Personal hygiene assistance',
    ],
    suitableFor: [
      'Seniors living alone or with working family members',
      'Elderly people who need help moving safely',
      'Families wanting dependable daytime company for a parent',
    ],
  },
  {
    id: 'svc-03',
    slug: 'patient-care-at-home',
    title: 'Patient Care at Home',
    category: 'medical',
    icon: 'bed',
    image: patientCare,
    imageAlt: 'Nurse checking on a patient resting in bed at home',
    summary:
      'Hands-on help for bedridden and recovering patients, including feeding, bathing, mobility and day-to-day care coordination.',
    description:
      'Caring for a bedridden or recovering patient is demanding. Our patient care assistants take on the hands-on daily tasks, from feeding and bathing to safe repositioning, while coordinating the routine with your family.',
    features: [
      'Bedridden patient assistance',
      'Feeding and bathing support',
      'Patient mobility assistance',
      'Daily care coordination',
    ],
    suitableFor: [
      'Bedridden or largely immobile patients',
      'Patients with long-term illness',
      'Families who need reliable hands-on support',
    ],
  },
  {
    id: 'svc-04',
    slug: 'full-time-caregiver',
    title: 'Full-Time Caregiver',
    category: 'caregivers',
    icon: 'userCheck',
    image: fullTime,
    imageAlt: 'Caregiver feeding an elderly woman at home',
    summary:
      'A dedicated caregiver at home for day and night assistance, with care shaped around the patient’s routine.',
    description:
      'When someone needs consistent support through the day, or around the clock, a full-time caregiver provides continuity. The same familiar caregiver learns the patient’s preferences and routine, offering steady, personalised help.',
    features: [
      'Dedicated home caregivers',
      'Day and night assistance',
      'Personalised patient support',
    ],
    suitableFor: [
      'Patients needing continuous supervision',
      'Seniors who should not be left alone',
      'Families seeking a consistent, familiar caregiver',
    ],
  },
  {
    id: 'svc-05',
    slug: 'part-time-caregiver',
    title: 'Part-Time Caregiver',
    category: 'caregivers',
    icon: 'clock',
    image: partTime,
    imageAlt: 'Caregiver helping an elderly man with a stretching exercise',
    summary:
      'Flexible home assistance through scheduled visits, covering personal care and daily activities when you need it most.',
    description:
      'Not every family needs full-day care. Part-time caregivers visit on a schedule that suits you, helping with personal care, meals and daily activities during the hours that matter most.',
    features: [
      'Flexible home assistance',
      'Scheduled daily visits',
      'Personal care and daily activities',
    ],
    suitableFor: [
      'Families who need cover for specific hours',
      'Seniors who are mostly independent',
      'Short-term help after illness or travel',
    ],
  },
  {
    id: 'svc-06',
    slug: 'medicine-management',
    title: 'Medicine Management',
    category: 'medical',
    icon: 'pill',
    image: medicine,
    imageAlt: 'Caregiver giving an elderly man his medicine',
    summary:
      'Organised medicine schedules and timely reminders, following the prescriptions and instructions of the treating doctor.',
    description:
      'Missed or mixed-up doses can set recovery back. We help organise medicine schedules, provide timely reminders and assist with prescribed medicines strictly according to professional instructions.',
    features: [
      'Medicine schedule coordination',
      'Medication reminders',
      'Assistance with prescribed medicines according to professional instructions',
    ],
    suitableFor: [
      'Patients on multiple daily medicines',
      'Seniors who find schedules hard to track',
      'Families who want peace of mind about doses',
    ],
  },
  {
    id: 'svc-07',
    slug: 'food-preparation-meal-assistance',
    title: 'Food Preparation & Meal Assistance',
    shortTitle: 'Meal Assistance',
    category: 'daily',
    icon: 'utensils',
    image: meals,
    imageAlt: 'Caregiver serving a home-cooked meal to an elderly woman',
    summary:
      'Fresh daily meals prepared to the patient’s dietary instructions, with feeding assistance wherever it is needed.',
    description:
      'Good nutrition supports good recovery. Our caregivers prepare fresh, home-cooked meals in line with patient-specific dietary instructions and help with feeding when required.',
    features: [
      'Daily meal preparation',
      'Patient-specific dietary instructions',
      'Feeding assistance',
      'Healthy home-cooked food support',
    ],
    suitableFor: [
      'Patients on a prescribed diet',
      'Seniors who can no longer cook for themselves',
      'Patients who need help while eating',
    ],
  },
  {
    id: 'svc-08',
    slug: 'post-surgery-care',
    title: 'Post-Surgery Care',
    category: 'medical',
    icon: 'activity',
    image: postSurgery,
    imageAlt: 'Nurse dressing an elderly man’s wound after surgery',
    summary:
      'Recovery support after surgery, including mobility help, hygiene and coordination with the treating medical team.',
    description:
      'The weeks after surgery shape the quality of recovery. We support patients with safe mobility, hygiene and daily care, while coordinating with the treating medical team on their instructions.',
    features: [
      'Recovery assistance',
      'Mobility support',
      'Personal hygiene and daily care',
      'Coordination with the treating medical team',
    ],
    suitableFor: [
      'Patients returning home after an operation',
      'Joint replacement and orthopaedic recovery',
      'Anyone advised to limit movement for a period',
    ],
  },
  {
    id: 'svc-09',
    slug: 'bedside-attendant',
    title: 'Bedside Attendant',
    category: 'daily',
    icon: 'heartPulse',
    image: bedside,
    imageAlt: 'Caregiver giving water to an elderly woman in bed',
    summary:
      'Attentive day-to-day bedside assistance focused on patient comfort, hygiene, feeding and movement.',
    description:
      'A bedside attendant stays close at hand to keep the patient comfortable, clean and well looked after, helping with feeding, positioning and movement throughout their shift.',
    features: [
      'Day-to-day bedside assistance',
      'Patient comfort and hygiene',
      'Feeding and movement assistance',
    ],
    suitableFor: [
      'Patients who need someone nearby at all times',
      'Patients at home or during a hospital stay',
      'Families needing night-time cover',
    ],
  },
  {
    id: 'svc-10',
    slug: 'personal-care-assistance',
    title: 'Personal Care Assistance',
    shortTitle: 'Personal Care',
    category: 'daily',
    icon: 'bath',
    image: personalCare,
    imageAlt: 'Caregiver helping an elderly man with grooming',
    summary:
      'Discreet help with bathing, grooming, dressing and other activities of daily living, always with dignity.',
    description:
      'Personal care is about dignity as much as assistance. Our caregivers help with bathing, grooming, dressing and other daily living tasks discreetly and respectfully, so patients feel comfortable and cared for.',
    features: ['Bathing and grooming', 'Dressing assistance', 'Daily living support'],
    suitableFor: [
      'Seniors with limited mobility',
      'People recovering from illness',
      'Anyone who needs gentle help with daily routines',
    ],
  },
  {
    id: 'svc-11',
    slug: 'icu-at-home',
    title: 'ICU at Home',
    category: 'medical',
    icon: 'monitorDot',
    image: icuAtHome,
    imageAlt: 'Nurse attending a patient on oxygen beside a monitor at home',
    summary:
      'Critical care set up at home, with medical equipment, trained nursing staff and continuous monitoring, as advised by the treating doctor.',
    description:
      'For patients who need intensive, round-the-clock medical attention, we help set up ICU-level care in the comfort of home. Equipment and care are arranged according to the treating doctor’s advice, with trained nursing staff monitoring the patient and keeping the doctor and family updated.',
    features: [
      'ICU setup at home with the required medical equipment',
      'Trained critical care nursing staff',
      'Continuous monitoring of vital signs',
      'Coordination with the treating doctor',
    ],
    suitableFor: [
      'Critically ill patients who need continuous monitoring',
      'Patients discharged from hospital ICU who still need intensive care',
      'Families who prefer critical care at home on medical advice',
    ],
  },
]
