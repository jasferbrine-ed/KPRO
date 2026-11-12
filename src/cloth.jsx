
const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=90`;

const makeProducts = (category, items, startPrice) =>
  items.map((item, index) => ({
    id: `${category.toLowerCase()}-${index + 1}`,
    name: item[0],
    category,
    price: startPrice + index * 15,
    oldPrice: startPrice + index * 15 + 35,
    image: photo(item[1]),
    front: photo(item[1]),
    description: `A premium ${category.toLowerCase()} fashion piece from the KPRO Dubai collection. Designed for modern style, comfort and everyday confidence.`,
    colors: ["Black", "White", "Beige", "Olive"],
    color: "Black",
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: {
      S: 8,
      M: 12,
      L: 10,
      XL: 7,
      XXL: 4
    },
    featured: index < 5,
    isNew: index < 4,
    tag: index < 4 ? "NEW" : index < 5 ? "BEST SELLER" : "KPRO EDIT"
  }));

const gents = [
  ["Essential Oversized Tee", "photo-1521572163474-6864f9cf17ab"],
  ["Urban Street Shirt", "photo-1503342217505-b0a15ec3261c"],
  ["Classic White Tee", "photo-1523381210434-271e8be1f52b"],
  ["Premium Casual Shirt", "photo-1596755094514-f87e34085b2c"],
  ["Modern Black Outfit", "photo-1515886657613-9f3515b0c78f"],
  ["Relaxed Fit T-Shirt", "photo-1529139574466-a303027c1d8b"],
  ["Minimal Summer Shirt", "photo-1512436991641-6745cdb1723f"],
  ["Everyday Streetwear", "photo-1551488831-00ddcb6c6bd3"],
  ["Premium Polo Style", "photo-1618354691373-d851c5c3a990"],
  ["Urban Layer Shirt", "photo-1483985988355-763728e1935b"],
  ["Modern Beige Look", "photo-1503341504253-dff4815485f1"],
  ["Weekend Casual", "photo-1515886657613-9f3515b0c78f"],
  ["Signature Oversize", "photo-1521572163474-6864f9cf17ab"],
  ["Classic Street Fit", "photo-1503342217505-b0a15ec3261c"],
  ["KPRO Daily Essential", "photo-1523381210434-271e8be1f52b"]
];

const ladies = [
  ["Elegant Everyday Top", "photo-1483985988355-763728e1935b"],
  ["Modern Chic Outfit", "photo-1539109136881-3be0616acf4b"],
  ["Soft Beige Collection", "photo-1529139574466-a303027c1d8b"],
  ["Premium Summer Dress", "photo-1515886657613-9f3515b0c78f"],
  ["Minimal Fashion Top", "photo-1483985988355-763728e1935b"],
  ["Urban Ladies Shirt", "photo-1534528741775-53994a69daeb"],
  ["Classic White Outfit", "photo-1496747611176-843222e1e57c"],
  ["Elegant Black Style", "photo-1524504388940-b1c1722653e1"],
  ["Modern Casual Look", "photo-1539109136881-3be0616acf4b"],
  ["KPRO Signature Style", "photo-1490481651871-ab68de25d43d"],
  ["Soft Summer Wear", "photo-1515886657613-9f3515b0c78f"],
  ["Premium Daily Look", "photo-1529139574466-a303027c1d8b"],
  ["Contemporary Outfit", "photo-1534528741775-53994a69daeb"],
  ["Elegant Weekend Wear", "photo-1496747611176-843222e1e57c"],
  ["Ladies Essential", "photo-1524504388940-b1c1722653e1"]
];

const kids = [
  ["Kids Casual Tee", "photo-1503919005314-30d93d07d823"],
  ["Little Explorer Outfit", "photo-1519238263530-99bdd11df2ea"],
  ["Kids Summer Style", "photo-1503454537195-1dcabb73ffb9"],
  ["Mini Streetwear", "photo-1516627145497-ae6968895b74"],
  ["Comfort Kids Shirt", "photo-1519689680058-324335c77eba"],
  ["Little Trendsetter", "photo-1503919005314-30d93d07d823"],
  ["Playtime Outfit", "photo-1519238263530-99bdd11df2ea"],
  ["Kids Daily Essential", "photo-1503454537195-1dcabb73ffb9"],
  ["Junior Casual Wear", "photo-1516627145497-ae6968895b74"],
  ["Mini Classic Look", "photo-1519689680058-324335c77eba"],
  ["Kids Weekend Tee", "photo-1503919005314-30d93d07d823"],
  ["Little Style Edit", "photo-1519238263530-99bdd11df2ea"],
  ["Junior Summer Fit", "photo-1503454537195-1dcabb73ffb9"],
  ["Comfort Mini Outfit", "photo-1516627145497-ae6968895b74"],
  ["KPRO Kids Essential", "photo-1519689680058-324335c77eba"]
];

export const products = [
  ...makeProducts("Gents", gents, 89),
  ...makeProducts("Ladies", ladies, 99),
  ...makeProducts("Kids", kids, 59)
];

export const categories = [
  "All",
  "Gents",
  "Ladies",
  "Kids"
];

export const campaigns = [
  {
    title: "THE NEW STANDARD",
    subtitle: "Modern essentials. Elevated everyday.",
    image: photo("photo-1529139574466-a303027c1d8b")
  },
  {
    title: "OWN YOUR STYLE",
    subtitle: "Discover the latest KPRO edit.",
    image: photo("photo-1539109136881-3be0616acf4b")
  },
  {
    title: "LITTLE ICONS",
    subtitle: "Comfort and style for the next generation.",
    image: photo("photo-1519238263530-99bdd11df2ea")
  }
];

export const lookbook = [
  photo("photo-1515886657613-9f3515b0c78f"),
  photo("photo-1539109136881-3be0616acf4b"),
  photo("photo-1503342217505-b0a15ec3261c"),
  photo("photo-1490481651871-ab68de25d43d"),
  photo("photo-1529139574466-a303027c1d8b"),
  photo("photo-1483985988355-763728e1935b")
];

export const trendingProducts = products.filter(
  (product) => product.featured
);

export const newArrivals = products.filter(
  (product) => product.isNew
);

export const formatPrice = (price) =>
  `AED ${Number(price || 0).toLocaleString("en-AE")}`;
