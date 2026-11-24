import nursingImg from '../assets/images/team/nursing-professional.jpg'
import assistantImg from '../assets/images/team/patient-care-assistant.jpg'
import elderlyImg from '../assets/images/team/elderly-caregiver.jpg'
import attendantImg from '../assets/images/team/home-care-attendant.jpg'

/**
 * Care duration options. `value` is the stable key sent in enquiry payloads,
 * so these can be managed from an admin panel later.
 */
export const careDurations = [
  {
    value: 'short-term',
    icon: 'hourglass',
    label: 'Short-Term Care',
    text: 'Support for a few days or weeks, ideal after surgery or illness.',
  },
  {
    value: 'long-term',
    icon: 'calendarDays',
    label: 'Long-Term Care',
    text: 'Ongoing assistance for chronic conditions and elderly family members.',
  },
  {
    value: 'daytime',
    icon: 'sun',
    label: 'Daytime Assistance',
    text: 'Help through the day while family members are at work.',
  },
  {
    value: 'nighttime',
    icon: 'moon',
    label: 'Nighttime Assistance',
    text: 'Overnight presence for safety, comfort and peace of mind.',
  },
  {
    value: '12-hour',
    icon: 'clock12',
    label: '12-Hour Care',
    text: 'A dedicated half-day shift, day or night, as you prefer.',
  },
  {
    value: '24-hour',
    icon: 'sunMoon',
    label: '24-Hour Care',
    text: 'Round-the-clock care for patients who need continuous support.',
  },
]

/**
 * Representative care-professional categories.
 * Images are stock photography; these are NOT real employee profiles.
 * Replace with `GET /team` data when actual profiles are available.
 */
export const teamRoles = [
  {
    id: 'role-nursing',
    isSample: true,
    role: 'Nursing Professionals',
    image: nursingImg,
    imageAlt: 'Team of nurses in blue uniforms',
    text: 'Qualified nurses for clinical tasks such as dressings, injections and health monitoring.',
    skills: ['Wound care', 'Injections', 'Vitals monitoring'],
  },
  {
    id: 'role-assistant',
    isSample: true,
    role: 'Patient Care Assistants',
    image: assistantImg,
    imageAlt: 'Patient care assistant feeding an elderly woman',
    text: 'Hands-on assistance for bedridden and recovering patients through the day.',
    skills: ['Mobility help', 'Feeding', 'Hygiene'],
  },
  {
    id: 'role-elderly',
    isSample: true,
    role: 'Elderly Caregivers',
    image: elderlyImg,
    imageAlt: 'Caregiver embracing an elderly woman',
    text: 'Warm companionship and daily routine support for senior family members.',
    skills: ['Companionship', 'Daily routines', 'Safe walking'],
  },
  {
    id: 'role-attendant',
    isSample: true,
    role: 'Home Care Attendants',
    image: attendantImg,
    imageAlt: 'Home care attendant holding an elderly man’s hands',
    text: 'Attentive bedside and household support focused on patient comfort.',
    skills: ['Bedside care', 'Meal help', 'Comfort care'],
  },
]
