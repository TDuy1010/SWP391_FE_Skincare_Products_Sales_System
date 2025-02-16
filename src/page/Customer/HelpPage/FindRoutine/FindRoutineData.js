export const questions = {
    1: {
      title: "What's your skin type?",
      multiple: false,
      options: [
        { id: 'dry', label: 'Dry Skin' },
        { id: 'oily', label: 'Oily Skin' },
        { id: 'combination', label: 'Combination Skin' },
        { id: 'normal', label: 'Normal Skin' },
        { id: 'sensitive', label: 'Sensitive Skin' }
      ]
    },
    2: {
      title: "What skin concerns do you have?",
      multiple: true,
      options: [
        { id: 'acne', label: 'Acne' },
        { id: 'dark_spots', label: 'Dark Spots' },
        { id: 'wrinkles', label: 'Wrinkles' },
        { id: 'sensitive', label: 'Dull Skin' },
        { id: 'large_pores', label: 'Large Pores' }
      ]
    },
    3: {
      title: "What's your age?",
      options: [
        { id: 'under20', label: 'Under 20' },
        { id: '20-25', label: '20-25' },
        { id: '26-30', label: '26-30' },
        { id: '31-40', label: '31-40' },
        { id: 'over40', label: 'Over 40' }
      ]
    },
    4: {
      title: "What type of routine do you prefer?",
      options: [
        { id: 'basic', label: 'Basic (3 steps)' },
        { id: 'moderate', label: 'Moderate (5 steps)' },
        { id: 'advanced', label: 'Advanced (7 steps)' }
      ]
    }
};

export const routineSteps = {
  basic: [
    { step: 1, name: 'Cleanser', description: 'Clean your skin' },
    { step: 2, name: 'Moisturizer', description: 'Hydrate your skin' },
    { step: 3, name: 'Sunscreen', description: 'Protect from sun damage' }
  ],
  moderate: [
    { step: 1, name: 'Cleanser', description: 'Clean your skin' },
    { step: 2, name: 'Toner', description: 'Balance pH levels' },
    { step: 3, name: 'Serum', description: 'Treat skin concerns' },
    { step: 4, name: 'Moisturizer', description: 'Hydrate your skin' },
    { step: 5, name: 'Sunscreen', description: 'Protect from sun damage' }
  ],
  advanced: [
    { step: 1, name: 'Makeup Remover', description: 'Remove makeup and impurities' },
    { step: 2, name: 'Cleanser', description: 'Clean your skin' },
    { step: 3, name: 'Toner', description: 'Balance pH levels' },
    { step: 4, name: 'Essence', description: 'Hydrate and repair' },
    { step: 5, name: 'Serum', description: 'Treat skin concerns' },
    { step: 6, name: 'Moisturizer', description: 'Hydrate your skin' },
    { step: 7, name: 'Sunscreen', description: 'Protect from sun damage' }
  ]
};