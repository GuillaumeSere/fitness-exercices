const BODY_PART_LABELS = {
  all: 'tous',
  back: 'dos',
  cardio: 'cardio',
  chest: 'pectoraux',
  'lower arms': 'avant-bras',
  'lower legs': 'bas des jambes',
  neck: 'cou',
  shoulders: 'épaules',
  'upper arms': 'bras',
  'upper legs': 'cuisses',
  waist: 'taille',
};

const TARGET_LABELS = {
  abductors: 'abducteurs',
  abs: 'abdominaux',
  adductors: 'adducteurs',
  biceps: 'biceps',
  calves: 'mollets',
  'cardiovascular system': 'système cardiovasculaire',
  delts: 'deltoïdes',
  forearms: 'avant-bras',
  glutes: 'fessiers',
  hamstrings: 'ischio-jambiers',
  lats: 'grands dorsaux',
  'levator scapulae': 'élévateur de la scapula',
  pectorals: 'pectoraux',
  quads: 'quadriceps',
  'serratus anterior': 'dentelé antérieur',
  spine: 'colonne',
  traps: 'trapèzes',
  triceps: 'triceps',
  'upper back': 'haut du dos',
};

const EQUIPMENT_LABELS = {
  assisted: 'assisté',
  band: 'élastique',
  barbell: 'barre',
  'body weight': 'poids du corps',
  'bosu ball': 'bosu',
  cable: 'poulie',
  dumbbell: 'haltère',
  'elliptical machine': 'elliptique',
  'ez barbell': 'barre EZ',
  hammer: 'marteau',
  kettlebell: 'kettlebell',
  'leverage machine': 'machine guidée',
  'medicine ball': 'medecine ball',
  'olympic barbell': 'barre olympique',
  'resistance band': 'bande de résistance',
  roller: 'rouleau',
  rope: 'corde',
  'skierg machine': 'ski erg',
  'sled machine': 'traîneau',
  'smith machine': 'machine Smith',
  'stability ball': 'swiss ball',
  'stationary bike': 'vélo stationnaire',
  'stepmill machine': 'stepmill',
  tire: 'pneu',
  'trap bar': 'trap bar',
  'upper body ergometer': 'ergomètre haut du corps',
  weighted: 'lesté',
  'wheel roller': 'roue abdominale',
};

const normalize = (value = '') => value.toString().trim().toLowerCase();

export const formatBodyPart = (value) => BODY_PART_LABELS[normalize(value)] || value;

export const formatTarget = (value) => TARGET_LABELS[normalize(value)] || value;

export const formatEquipment = (value) => EQUIPMENT_LABELS[normalize(value)] || value;

export const formatExerciseMeta = (value) => {
  const normalizedValue = normalize(value);

  return (
    BODY_PART_LABELS[normalizedValue]
    || TARGET_LABELS[normalizedValue]
    || EQUIPMENT_LABELS[normalizedValue]
    || value
  );
};
