// Type definitions
type ProductContent = {
  parentPath: string;
  gallery: string[];
  colors: string[];
  specs: string[];
};

type ProductContentMap = {
  [key: string]: ProductContent;
};

// Product categories

export const products = {
  roller: ["cordless", "motorized"],
  zebra: ["cordless", "motorized"],
  honeycomb: ["cordless", "motorized"],
  shangrila: ["manual"],
  outdoor:[],
  vertical: [],
  wooden: []
}

export const productTypes = {
   // Products by operation type
  motorized: [
    "roller",
    "honeycomb",
    "zebra"
  ],
  cordless: [
    "roller",
    "honeycomb",
    "zebra"
  ],
  manual: [
    "shangrila"
  ]
};