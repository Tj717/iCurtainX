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


export const productDescriptions: { [key: string]: string } = {
  // ────────── ROLLER/CORDLESS ──────────
  "roller/cordless": `
A simple roller shade you lift or lower by hand—no cords hang down for a clean look.

Advantages:
- Safe for kids and pets (no loose cords)
- Easy, fingertip adjustment that stays put
- Blocks out light for a darker room
- Available in different fabrics (contact us for options)
- Simple, screw-free installation with mounting clips

Perfect for:
- Living rooms and bedrooms where you want quick light control
- Windows or doors that look best without visible cords
- Home theaters or nurseries where you need a dark, quiet space
`.trim(),

  // ────────── ROLLER/MOTORIZED ──────────
  "roller/motorized": `
A motorized roller shade that works with a remote, timer, or smartphone—no manual lifting needed.

Advantages:
- Works with smart home systems, voice assistants, and apps
- Remote has a simple button layout with timer and instant modes
- Two motor options:
    • Plug-in (adapt the power plug for your area)
    • Battery (USB-powered, includes a 3m cable)
- Battery lasts up to 200 days on a single charge
- Water- and dirt-resistant fabric for easy cleaning
- Sleek, cordless look that fits any style
- Ships in sturdy carton or clear PVC packaging

Perfect for:
- High or hard-to-reach windows where manual lifting is tough
- Home theaters or bedrooms where you want scheduled light control
- Smart homes that use voice or app commands to control shades
- Kitchens or bathrooms where moisture-resistant fabric is a plus
`.trim(),

  // ────────── ZEBRA/CORDLESS ──────────
  "zebra/cordless": `
A cordless zebra shade with alternating sheer and solid stripes you raise by hand for flexible light control.

Advantages:
- Safe for kids and pets (no dangling cords)
- Easy, one-hand operation
- Double-layer fabric lets air flow while filtering light
- Sheer and solid stripes give you precise light and privacy settings
- Durable headrail and roller mechanism for long-lasting use
- Comes in several colors to match your décor
- Ships in carton or clear PVC packaging

Perfect for:
- Living rooms, bedrooms, and offices where you want both light and privacy
- Modern spaces that need a sleek, minimal look
- Rooms that need breathable fabric and adjustable shading, like nurseries or home offices
`.trim(),

  // ────────── ZEBRA/MOTORIZED ──────────
  "zebra/motorized": `
A motorized zebra shade with alternating sheer and solid stripes—controlled by remote, voice, or smartphone for easy, hands-free operation.

Advantages:
- Works with Alexa or Google Assistant for voice control
- Remote has timer and instant modes for scheduling and quick adjustments
- Control from anywhere using the smartphone app
- Two motor choices: plug-in (region-adaptable) or rechargeable battery (USB-powered)
- Quiet motor is perfect for bedrooms and living areas
- Choose blackout or semi-blockout fabric for full darkening or gentle filtering
- Comes in popular colors (browns, beiges, grays) to match your style
- Durable plastic-steel headrail, anti-rust aluminum roller, and quiet precision gears
- Ships in sturdy carton or clear PVC packaging

Perfect for:
- Bedrooms where you want a soft morning wake-up with scheduled shade opening
- Home offices—adjust light with a voice command
- Kitchens and family rooms where you need safe, hands-free operation
- Spaces where low noise is essential, like media rooms and nurseries
`.trim(),

  // ────────── HONEYCOMB/CORDLESS ──────────
  "honeycomb/cordless": `
A cordless honeycomb (cellular) shade with hexagonal cells you lift by hand for insulation and noise reduction—no exposed cords.

Advantages:
- Honeycomb design blocks heat and reduces outside noise
- Safe for kids and pets with one-hand operation
- Corrosion-resistant lower track for long life
- Comes with all brackets and hardware for quick installation
- Packs in clear PVC for safe delivery

Perfect for:
- Living rooms or bedrooms where you want better insulation and quieter space
- Home offices or nurseries where noise reduction matters
- Kitchens and bathrooms where moisture resistance is key
- Any room that needs a clean, cordless look without losing performance
`.trim(),

  // ────────── HONEYCOMB/MOTORIZED ──────────
  "honeycomb/motorized": `
A motorized honeycomb canopy shade for skylights or overhead windows—remote-control for easy, hands-free adjustment with insulation and noise reduction.

Advantages:
- Hexagonal cells with aluminum-foil backing block UV, keep heat out in summer, and retain warmth in winter
- Remote-control operation for effortless shading
- Intelligent temperature control to keep rooms comfortable year-round
- Sturdy aluminum-alloy top rail resists corrosion
- Available in multiple fabric colors to fit any décor
- Packaged with protective padding and secure casing

Perfect for:
- Skylights, sunrooms, and conservatories needing overhead shading
- Rooms that want both noise reduction and thermal control, like home offices or bedrooms
- Spaces where remote operation is more convenient and safer
- Windows exposed to direct sun where UV blocking and insulation are critical
`.trim(),

  // ────────── SHANGRILA/MANUAL ──────────
  "shangrila/manual": `
A corded Shangri-La shade with a three-layer design that softens light—adjust between open, half-open, or fully closed positions using the cord.

Advantages:
- Layered fabric gently filters daylight for a soft glow
- Dust cover protects the headrail and inner parts from dirt
- Three positions (open, half-open, closed) for versatile light control
- Eco-friendly, fade-resistant fabric in neutral tones
- Durable headrail and smooth cord mechanism for reliable use

Perfect for:
- Living rooms and bedrooms where you want a soft, diffused light
- Home offices or studies that need glare reduction
- Spaces that love a layered, textured look with classic corded operation
- Rooms where dust protection and easy cleaning matter
`.trim(),

  // ────────── OUTDOOR ──────────
  "outdoor": `
An outdoor windproof blind for gazebos, balconies, and patios—operate by chain/rod or battery motor for sun and wind protection.

Advantages:
- Windproof design stays stable in breezy conditions
- Manual chain and rod for precise positioning
- Optional battery motor for cordless control (battery system included)
- Weather-resistant fabric offers UV protection and glare reduction
- Frame colors: off-white, charcoal gray, brown, light gray, black
- Fabric choices from light mesh to solid block-out materials
- Strong frame resists corrosion for long life

Perfect for:
- Patios, pergolas, and poolside areas needing windproof shading
- Balconies and terraces that need reliable UV and glare protection
- Outdoor dining or lounge spaces where motorized operation adds convenience
- Gazebos and sunrooms where you want to mix frame and fabric colors for a custom look
`.trim(),

  // ────────── VERTICAL ──────────
  "vertical": `
A vertical blind system for large, floor-to-ceiling windows—use chain/rod or battery motor for easy light control.

Advantages:
- Perfect for big windows and sliding doors
- Manual chain/rod control or battery motor for hands-free use
- Fabric options include sheer panels for soft light, opaque panels for privacy, and textured weaves for style
- Blades tilt for precise light control and stack neatly for a clear view
- No strict size limit, but keep width under 2m for easier shipping and setup
- Durable headrail and hardware for smooth performance in busy areas

Perfect for:
- Floor-to-ceiling windows in living rooms, offices, or conference rooms
- Large sliding glass doors needing flexible light and privacy control
- Dining rooms or patios where you want to tuck blades aside for an unobstructed view
- Interiors that want a variety of fabric textures and colors to match the design
`.trim(),

  // ────────── WOODEN ──────────
  "wooden": `
A wood-look blind made from durable PS (polystyrene) material—gives you the warmth of wood at a lower cost and resists moisture.

Advantages:
- PS material imitates real wood grain, costs less, and holds up better than PVC
- Ideal for living rooms, studies, and offices—adds a cozy, natural feel
- Manual chain/rod control or optional rechargeable battery motor for cordless use
- Available in wood tones, whitewash, dark espresso, and modern gray
- Minimum size 80cm×300cm; maximum size 220cm×300cm for floor-to-ceiling coverage
- Easy tilt mechanism for precise light control; slats stack neatly when open
- Strong headrail and metal-reinforced ladder tapes ensure smooth operation

Perfect for:
- Living rooms and bedrooms where you want a wood-grain look without real wood
- Home offices or studies where cordless operation adds safety and convenience
- Kitchens and bathrooms needing a moisture-resistant alternative to wood
- Rooms requiring tall, stable slats up to 3m high
`.trim(),
};
