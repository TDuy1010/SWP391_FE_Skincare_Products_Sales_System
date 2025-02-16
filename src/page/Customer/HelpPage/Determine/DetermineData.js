export const skinTypeQuestions = {
  1: {
    title: "How does your skin feel 30 minutes after cleansing?",
    multiple: false,
    options: [
      { id: "very_tight", label: "Very tight and dry", points: { dry: 3, normal: 0, oily: 0, combination: 0 } },
      { id: "slightly_tight", label: "Slightly tight", points: { dry: 1, normal: 2, oily: 0, combination: 1 } },
      { id: "comfortable", label: "Comfortable", points: { dry: 0, normal: 3, oily: 1, combination: 1 } },
      { id: "oily", label: "Oily", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  2: {
    title: "How does your skin look by midday?",
    multiple: false,
    options: [
      { id: "flaky", label: "Dry and flaky", points: { dry: 3, normal: 0, oily: 0, combination: 1 } },
      { id: "normal", label: "Normal", points: { dry: 0, normal: 3, oily: 0, combination: 1 } },
      { id: "shiny_tzone", label: "Shiny T-zone", points: { dry: 0, normal: 1, oily: 2, combination: 3 } },
      { id: "very_oily", label: "Very oily", points: { dry: 0, normal: 0, oily: 3, combination: 1 } }
    ]
  },
  3: {
    title: "What's your pore size?",
    multiple: false,
    options: [
      { id: "invisible", label: "Barely visible", points: { dry: 3, normal: 1, oily: 0, combination: 1 } },
      { id: "small", label: "Small", points: { dry: 1, normal: 3, oily: 0, combination: 1 } },
      { id: "medium", label: "Medium", points: { dry: 0, normal: 1, oily: 2, combination: 2 } },
      { id: "large", label: "Large", points: { dry: 0, normal: 0, oily: 3, combination: 2 } }
    ]
  },
  4: {
    title: "What's your skin tendency?",
    multiple: false,
    options: [
      { id: "sensitive", label: "Easily irritated, red", points: { dry: 2, normal: 1, oily: 0, combination: 1 } },
      { id: "normal", label: "Normal", points: { dry: 0, normal: 3, oily: 0, combination: 1 } },
      { id: "acne", label: "Prone to acne", points: { dry: 0, normal: 0, oily: 3, combination: 2 } },
      { id: "combination", label: "Combination", points: { dry: 1, normal: 1, oily: 1, combination: 3 } }
    ]
  }
};

export const skinTypeDescriptions = {
  dry: {
    title: "Dry Skin",
    description: "Your skin often feels tight, may be flaky, and lacks moisture. You should use rich moisturizing products and avoid products containing alcohol.",
    tips: [
      "Use a cream-based sulfate-free cleanser",
      "Use alcohol-free toner",
      "Add hydrating serum",
      "Use rich moisturizing cream"
    ]
  },
  normal: {
    title: "Normal Skin",
    description: "Your skin is well-balanced, neither too dry nor too oily. However, it still needs care to maintain this condition.",
    tips: [
      "Maintain a regular skincare routine",
      "Use skin-appropriate products",
      "Protect from sun damage",
      "Stay hydrated daily"
    ]
  },
  oily: {
    title: "Oily Skin",
    description: "Your skin tends to produce excess oil, especially by midday. Focus on oil control without over-drying your skin.",
    tips: [
      "Use gentle gel-based cleanser",
      "Use alcohol-free toner to balance pH",
      "Choose gel or lotion moisturizers",
      "Use clay mask 1-2 times/week"
    ]
  },
  combination: {
    title: "Combination Skin",
    description: "Your T-zone (forehead, nose, chin) is oily while other areas might be dry. Different areas need different care approaches.",
    tips: [
      "Use different products for different areas",
      "Use balancing toner",
      "Apply light moisturizer on T-zone",
      "More hydration on cheeks"
    ]
  }
}; 