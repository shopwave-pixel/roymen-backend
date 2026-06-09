import { Product, Review } from '../types';

export const products: Product[] = [
  {
    id: "roy-001",
    name: "Classic Stealth Black Tee",
    category: "T-Shirts",
    price: 1850,
    originalPrice: 2450,
    description: "Tailored to perfection, our Stealth Black Signature Tee features high-grade organic Pima cotton with a subtle premium silk-touch finish.",
    longDescription: "Crafted specifically for the modern Bangladeshi gentleman who values effortless style and pure luxury. The Stealth Black Signature Tee offers an impeccable drape that naturally accentuates the physique while remaining exceptionally breathable under warm tropical conditions. Finished with double-needle flat-lock stitching and reinforced necklines that preserve their perfect shape, wash after wash.",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Stealth Black", "Monochrome Slate", "Chalk White"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 42,
    inStock: true,
    sku: "RM-TS-STB-01",
    details: [
      "100% Ultra-Fine Premium Giza Organic Cotton",
      "Finished with a silk-lyocell premium wash",
      "Impeccable athletic drape and tailored shoulder lines",
      "Preshrunk and fade-resistant dye technology",
      "Sustainably fabricated in Dhaka, Bangladesh"
    ]
  },
  {
    id: "roy-002",
    name: "Minimalist Ivory Oversized Tee",
    category: "T-Shirts",
    price: 1650,
    originalPrice: 2200,
    description: "Relaxed-fit deluxe cotton tee engineered with drop-shoulder aesthetics and an ultra-soft premium heavy knit structure.",
    longDescription: "Elevate your streetwear game with the Minimalist Ivory Oversized Tee. Fabricated from heavy-knit premium BCI cotton (240 GSM), this tee offers an elegant geometric silhouette with dropped shoulders and structured half sleeves, perfectly aligning with contemporary minimal streetwear trends.",
    images: [
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Ivory White", "Oatmeal Beige", "Charcoal Gray"],
    isNew: true,
    isBestSeller: false,
    featured: true,
    rating: 4.8,
    reviewCount: 29,
    inStock: true,
    sku: "RM-TS-MIV-02",
    details: [
      "Luxurious Heavyweight 240 GSM Premium Cotton Knit",
      "Ultra-soft drop shoulder minimalist profile",
      "Ribbed crewneck collar with spandex recovery fibers",
      "Hand-wash recommended for original premium softness"
    ]
  },
  {
    id: "roy-003",
    name: "Royal Crimson Pique Polo",
    category: "Polo Shirts",
    price: 2450,
    originalPrice: 3200,
    description: "High-density pique polo featuring meticulous honeycomb weave, mercerized collar linings, and precise platinum-grade logo-embroidery.",
    longDescription: "The ultimate representation of smart-casual dressing for the premium lifestyle. Constructed using custom mercerized Pima Cotton Pique, the Royal Crimson Polo combines superb sweat-wicking architecture with structured collar integrity that won't curl over time. Dress it up under a razor-sharp blazer or style with linen trousers.",
    images: [
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Crimson Red", "Royal Navy", "Forest Green", "Stellar Black"],
    isNew: false,
    isBestSeller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 56,
    inStock: true,
    sku: "RM-PL-RCP-03",
    details: [
      "95% Mercerized Giza Cotton, 5% Premium Elastane",
      "High-density tactile pique weave with microventilations",
      "Three-button placket with luxury mother-of-pearl buttons",
      "Structured self-fabric collar with reinforced stay layers"
    ]
  },
  {
    id: "roy-004",
    name: "Platinum Signature Navy Polo",
    category: "Polo Shirts",
    price: 2650,
    originalPrice: 3450,
    description: "Designed for corporate boardrooms and high-profile weekends alike, our navy polo features elegant contrast tipping.",
    longDescription: "Our Platinum Navy Polo is crafted from high-performance double-mercerized Egyptian cotton, yielding a beautiful sheen, incredible drape, and rich depth of color. With exquisite minimal tipping on the collar and sleeves, this polo sets the standard for quiet luxury.",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Imperial Navy", "Onyx Black", "Chalk Melange"],
    isNew: true,
    isBestSeller: true,
    featured: false,
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    sku: "RM-PL-PSN-04",
    details: [
      "100% Double Mercerized Egyptian Giza Cotton",
      "Contrast platinum-silver aesthetic collar tipping",
      "Discreet side vents with reinforced herringbone tape",
      "Lustrous texture and breathable weave architecture"
    ]
  },
  {
    id: "roy-005",
    name: "Classic Oxford Cotton Shirt",
    category: "Shirts",
    price: 2950,
    originalPrice: 3800,
    description: "Premium heavy-wash Oxford button-down shirt featuring signature collar roll, custom yoke stitch, and curved luxury hemline.",
    longDescription: "The bedrock of elegant styling, our Classic Oxford Cotton Shirt is crafted from traditional rich basket-weave long-staple cotton fibers. It's soft to the skin yet robustly structured. Designed with a perfect collar height and curvature pattern for both necktied or casual open-collar wear.",
    images: [
      "https://images.unsplash.com/photo-1620012253295-c05518e993bd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Classic Sky Blue", "Alabaster White", "Starlight Pink"],
    isNew: false,
    isBestSeller: true,
    featured: true,
    rating: 4.8,
    reviewCount: 38,
    inStock: true,
    sku: "RM-SH-OCS-05",
    details: [
      "100% Premium American Pima Cotton Oxford",
      "Traditional English button-down collar with premium inner lining",
      "Dual-chamber luxury cuff stitches with adjustable button widths",
      "Chest patch pocket with double-stitch detailings"
    ]
  },
  {
    id: "roy-006",
    name: "Premium Linen Breeze Shirt",
    category: "Shirts",
    price: 3250,
    originalPrice: 4200,
    description: "Ultra-breathable premium Italian linen casual shirt, meticulously treated for unparalleled skin softness and low crease index.",
    longDescription: "The perfect companion for high-summer elegance in Bangladesh. Engineered from long-strain pure flax fibers directly imported from Italy, our Premium Linen Breeze Shirt is stone-washed for immediate comfort, ensuring you stay exceptionally cool and poised even during high-humidity seasons.",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05518e993bd?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Sage Olive", "Off-White Breeze", "Dusty Rose", "Desert Sand"],
    isNew: true,
    isBestSeller: false,
    featured: true,
    rating: 4.9,
    reviewCount: 22,
    inStock: true,
    sku: "RM-SH-PLB-06",
    details: [
      "100% Pure Certified Italian Flax Linen",
      "Biodegradable natural stone-wash treatment",
      "Casual band-collar (Mandarin style) premium build",
      "Moisture-wicking, fast-drying luxury structure"
    ]
  },
  {
    id: "roy-007",
    name: "Dark Indestructible Selvedge Jeans",
    category: "Jeans",
    price: 3950,
    originalPrice: 4950,
    description: "Deep indigo premium raw selvedge denim, heavy-ounce construction featuring redline selvedge cuffs and solid copper rivets.",
    longDescription: "Our tribute to true denim heads in Bangladesh. Built from durable 14.5oz raw indigo warp denim, these jeans develop beautiful custom fade lines unique to your wear and natural daily movements. Designed with a perfect classic slim-tapered fit, reinforced coin pockets, and hand-numbered authentic leather waist patch.",
    images: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30", "31", "32", "33", "34", "36"],
    colors: ["Raw Indigo Blue", "Ink Jet Black"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    sku: "RM-JN-DIJ-07",
    details: [
      "14.5 oz Japanese Raw Redline Selvedge Denim",
      "Intense deep indigo double-indigo rope-dyed yarn",
      "Authentic brass buttons and solid copper hardware",
      "Classic tapered silhouette with reinforced hidden back pockets"
    ]
  },
  {
    id: "roy-008",
    name: "Midnight Slim Comfort Stretch Jeans",
    category: "Jeans",
    price: 3450,
    originalPrice: 4250,
    description: "Perfect blend of premium cotton and high-retention performance stretch, washed down to a dark anthracite hue.",
    longDescription: "Engineered for pure daily comfort. The Midnight Slim Jeans feature a premium multi-blend denim fabric offering stellar modern 4-way stretch retention. Say goodbye to bagging at the knees. Outfitted with high-density premium zippers and beautifully hand-scuffed distressed highlights around the luxury seams.",
    images: [
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30", "32", "34", "36"],
    colors: ["Anthracite Black", "Muted Steel Blue"],
    isNew: false,
    isBestSeller: true,
    featured: false,
    rating: 4.8,
    reviewCount: 47,
    inStock: true,
    sku: "RM-JN-MSC-08",
    details: [
      "92% BCI Cotton, 6% Lycra Stretch, 2% Performance Spandex",
      "Advanced shape-retention knitting technology",
      "Sleek matte-black button accents and zip-fly closure",
      "Whisker detailing and lightly distressed premium pocket edges"
    ]
  },
  {
    id: "roy-009",
    name: "Sartorial tailored Chino Trousers",
    category: "Trousers",
    price: 2850,
    originalPrice: 3600,
    description: "Elegant modern fit trousers built from rich combed cotton twill, finished with internal premium luxury waistband binding.",
    longDescription: "Our Signature Chinos are designed with high-grade stretch-twill cotton, bridging the gap between elegant corporate-wear and stylish dining. Fabricated with meticulous attention to clean hidden hooks, button enclosures, and micro-piped slip pockets for an exceptionally sleek back profile.",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Desert Khaki", "Executive Grey", "Imperial Navy Blue"],
    isNew: false,
    isBestSeller: true,
    featured: true,
    rating: 4.7,
    reviewCount: 52,
    inStock: true,
    sku: "RM-TR-SCT-09",
    details: [
      "98% Combed Cotton Twill, 2% Elastane Flex",
      "Luxury inner poplin waist lining and secure double-button waist wrap",
      "Premium YKK durable auto-locking zip fly",
      "Anti-wrinkle treated surface fibers for quick smart iron wear"
    ]
  },
  {
    id: "roy-010",
    name: "Royal Heritage Panjabi",
    category: "Panjabi",
    price: 4950,
    originalPrice: 6500,
    description: "Exceptional luxury ethnic wear crafted with premium silk-cotton blend, delicate platinum Zari embroidery, and bespoke metal buttons.",
    longDescription: "Designed for elegant national festivities, Eid celebrations, and prestigious ceremonial gatherings. The Royal Heritage Panjabi represents the finest blend of traditional Bangladeshi heritage designs and modern tailored silhouettes. Hand-embroidered by local artisans in Dhaka using genuine fine thread motifs.",
    images: [
      "https://images.unsplash.com/photo-1610473068565-df0480927e1f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620012253295-c05518e993bd?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["40", "42", "44", "46"],
    colors: ["Royal Platinum White", "Regal Deep Black", "Burgundy Emperor"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 68,
    inStock: true,
    sku: "RM-PJ-RHP-10",
    details: [
      "70% Fine Silk, 30% Egyptian Cotton long-staple warp",
      "Authentic hand-guided delicate Zari stitching on plackets and collar",
      "Tailored luxury band-collar with reinforced internal stiffeners",
      "Delivered in exclusive premium ROYMEN dust-protection box packaging"
    ]
  },
  {
    id: "roy-011",
    name: "Architectural Fleece Hoodie",
    category: "Hoodies",
    price: 3850,
    originalPrice: 4800,
    description: "Ultra-heavy solid fleece hoodie featuring seamless kangaroo pocket layouts, multi-layered double hood structure, and extra-thick alloy tip drawstrings.",
    longDescription: "Engineered to deliver exceptional thermal insulation, heavy geometric structure, and premium street style. Crafted from custom premium heavy fleeced fabric (420 GSM), our Architectural Hoodie maintains its stiff structural drop while surrounding you in cozy, super-soft fleece warmth.",
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Concrete Grey", "Charcoal Onyx", "Earth Green"],
    isNew: true,
    isBestSeller: false,
    featured: false,
    rating: 4.8,
    reviewCount: 14,
    inStock: true,
    sku: "RM-HD-AFH-11",
    details: [
      "Super Heavyweight 420 GSM French Terry Cotton/Fleece Blend",
      "Double-lined extra thick geometric hood contours",
      "Engraved premium ROYMEN hardware alloy aglets",
      "High-elastic double-rib cuffs and hem bands"
    ]
  },
  {
    id: "roy-012",
    name: "Urban Matte Biker Jacket",
    category: "Jackets",
    price: 6450,
    originalPrice: 8500,
    description: "Exceptional eco-conscious matte faux-grain leather jacket, outfitted with heavy stainless-steel durable fasteners and lush windproof satin lining.",
    longDescription: "The absolute pinnacle of our luxury outerwear collection. The Urban Matte Biker Jacket is curated with an incredibly supple, scratch-resistant faux-grain leather shell designed specifically to provide full wind shield in mild winters. Tailored with clean asymmetric zippers and custom shoulder epaulets.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["M", "L", "XL"],
    colors: ["Midnight Obsidian Black", "Vintage Tan Suede"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 25,
    inStock: true,
    sku: "RM-JK-UMB-12",
    details: [
      "SUPRA-Flex Premium Matte Faux Leather shell",
      "Ultra-soft premium wind-resistant inner quilted satin padding",
      "Heavy-gauge industrial utility YKK zipper accents",
      "Snap button throat tab collar design"
    ]
  },
  {
    id: "roy-013",
    name: "ROYMEN Nomad Suede Monks",
    category: "Footwear",
    price: 5950,
    originalPrice: 7500,
    description: "Genuine high-grade split-suede leather double-monk straps, handcrafted by veteran cobblers in Dhaka with premium leather outsoles.",
    longDescription: "Ditch the ordinary and strut with luxury. Our Nomad Suede Double Monks represent the ultimate artisan shoe engineering for the modern gentleman. Hand-cut and shaped on comfortable orthopedic lasts, finished with heavy luxury custom-buckles, a genuine calf-skin internal lining, and non-slip durable rubber overlays on leather soles.",
    images: [
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["40", "41", "42", "43", "44"],
    colors: ["Tobacco Tan Suede", "Smoky Dark Brown", "Noir Calfskin"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 4.8,
    reviewCount: 30,
    inStock: true,
    sku: "RM-FT-NMS-13",
    details: [
      "100% Genuine Imported Split-Suede Premium Leather",
      "Lined with full grain vegetable tanned breathable baby-calf leather",
      "Dual adjustable silver-finished alloy buckle straps",
      "High density comfort memory foam layered insoles"
    ]
  },
  {
    id: "roy-014",
    name: "Signature Full-Grain Travel Duffel",
    category: "Accessories",
    price: 7850,
    originalPrice: 9950,
    description: "Luxury weekender carry-on bag made from genuine textured grain leather, featuring reinforced brass luggage feet, and wide leather shoulder straps.",
    longDescription: "Whether catching a flight out of Hazrat Shahjalal International Airport or steering toward a weekend getaway, the Signature ROYMEN Travel Duffel embodies high-end mobility. Outfitted with spacious double-layer zip cavities, a cushioned padded laptop slot, and robust twin top handles that age beautifully with rich natural patina.",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    colors: ["Rich Cognac Brown", "Sleek Matte Black"],
    isNew: true,
    isBestSeller: true,
    featured: true,
    rating: 4.9,
    reviewCount: 19,
    inStock: true,
    sku: "RM-AC-STD-14",
    details: [
      "100% Genuine Premium Vegetable Tanned Grain Leather",
      "Solid heavy brass buckle adjusters and base protective studs",
      "Spacious moisture-resistant custom canvas internal lining",
      "Meets standard international carry-on luggage dimensions"
    ]
  },
  {
    id: "roy-015",
    name: "Architectural Matte Wayfarers",
    category: "Accessories",
    price: 1950,
    originalPrice: 2800,
    description: "Modern structural sunglasses engineered with heavy matte acetate frames, real bronze skeleton cores, and premium UV400 polarizers.",
    longDescription: "Unrivaled facial symmetry and high-grade sun protection. Featuring crisp architectural profiles, premium polarization layers that cut glare completely in harsh delta heat, and flexible metallic double hinges that contour perfectly to any face width without fatigue.",
    images: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop"
    ],
    sizes: ["One Size"],
    colors: ["Minimalist Obsidian", "Burnt Amber Tortoise"],
    isNew: false,
    isBestSeller: false,
    featured: false,
    rating: 4.6,
    reviewCount: 33,
    inStock: true,
    sku: "RM-AC-AMW-15",
    details: [
      "Grade-A heavy cellulose acetate frame build",
      "Genuine polarized UV400 Scratch-Resistant premium lenses",
      "High strength metallic internal skeleton core struts",
      "Includes premium hardcase and micro-fiber logo wipes"
    ]
  }
];

export const sampleReviews: Record<string, Review[]> = {
  "roy-001": [
    {
      id: "rev-001",
      userName: "Farhan Tanvir",
      rating: 5,
      date: "2026-05-18",
      comment: "Absolutely outstanding quality. I have purchased high-end tees from international brands in Europe, and ROYMEN is easily on par if not better. The custom fit is incredibly accurate for Bangladeshi builds.",
      verified: true
    },
    {
      id: "rev-002",
      userName: "Naser Chowdhury",
      rating: 5,
      date: "2026-05-29",
      comment: "Super soft touch! Perfect for Dhaka summers. The color has not faded at all after 5 machine washes. Exceptional flat-lock seam stitch.",
      verified: true
    }
  ],
  "roy-003": [
    {
      id: "rev-003",
      userName: "Istiaque Ahmed",
      rating: 5,
      date: "2026-04-10",
      comment: "Excellent pique polo! The mercerized finish looks very luxurious. Highly recommended for Friday premium casual office wear.",
      verified: true
    }
  ],
  "roy-007": [
    {
      id: "rev-004",
      userName: "Mahmudul Hasan",
      rating: 5,
      date: "2026-05-01",
      comment: "True Japanese selvedge denim. This raw redline fits beautifully. Be careful with washing, wear it raw to let it develop your custom crease fades. Worth every single penny!",
      verified: true
    }
  ],
  "roy-010": [
    {
      id: "rev-005",
      userName: "Sajid Rahman",
      rating: 5,
      date: "2026-05-12",
      comment: "The embroidery work on the placket is top tier. Fits like a glove. Delivered in a beautiful premium dust-proof magnetic gift box. The silk sheen is absolutely premium.",
      verified: true
    }
  ]
};
