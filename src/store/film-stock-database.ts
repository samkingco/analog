type Brand =
  | "ADOX"
  | "AGFA"
  | "Fomapan"
  | "Fujifilm"
  | "Ilford"
  | "Kentmere"
  | "Kodak"
  | "Lomography";

type FilmType =
  | "Black & White"
  | "Black & White Slide"
  | "Color Negative"
  | "Color Slide";

type Process = "B&W" | "C-41" | "E-6";

type Format = "35mm" | "120" | "Sheet film" | "4x5" | "8x10";

type UseCase =
  | "Creative"
  | "Detailed Subject"
  | "Fashion"
  | "General Purpose"
  | "Landscape"
  | "Low Light Conditions"
  | "Nature"
  | "Portraits"
  | "Product"
  | "Street"
  | "Sports"
  | "Sunny Conditions"
  | "Travel"
  | "Wedding";

type Contrast =
  | "Very high"
  | "High"
  | "Medium high"
  | "Medium low"
  | "Medium"
  | "Low";

type Grain = "Very fine" | "Fine" | "Medium" | "Normal";

export interface FilmStock {
  id: string;
  name: string;
  brand?: Brand;
  speed: number;
  type?: FilmType;
  process?: Process;
  formats?: Format[];
  useCases: UseCase[];
  contrast?: Contrast;
  grain?: Grain;
  origin?: string;
}

export const filmStocks: FilmStock[] = [
  {
    name: "Adox CMS 20 II",
    type: "Black & White",
    speed: 20,
    brand: "ADOX",
    grain: "Very fine",
    useCases: ["Portraits", "Landscape", "Nature"],
    formats: ["35mm", "120"],
    contrast: "Very high",
    origin: "Belgium",
    process: "B&W",
    id: "adox-cms-20-ii",
  },
  {
    name: "Adox SCALA 160",
    type: "Black & White Slide",
    speed: 160,
    brand: "ADOX",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Landscape", "Nature"],
    formats: ["35mm"],
    contrast: "High",
    origin: "Belgium",
    process: "B&W",
    id: "adox-scala-160",
  },
  {
    name: "Adox SilverMax",
    type: "Black & White",
    speed: 100,
    brand: "ADOX",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Landscape", "Nature"],
    formats: ["35mm"],
    contrast: "High",
    origin: "Belgium",
    process: "B&W",
    id: "adox-silvermax",
  },
  {
    name: "AGFA APX 100",
    type: "Black & White",
    speed: 100,
    brand: "AGFA",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Nature", "Landscape"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "agfa-apx-100",
  },
  {
    name: "AGFA APX 400",
    type: "Black & White",
    speed: 400,
    brand: "AGFA",
    grain: "Medium",
    useCases: ["General Purpose", "Portraits", "Street", "Sports"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "agfa-apx-400",
  },
  {
    name: "AGFA Vista Plus 200",
    type: "Color Negative",
    speed: 200,
    brand: "AGFA",
    grain: "Normal",
    useCases: ["General Purpose", "Creative", "Sunny Conditions"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "UK",
    process: "C-41",
    id: "agfa-vista-plus-200",
  },
  {
    name: "AGFA Vista Plus 400",
    type: "Color Negative",
    speed: 400,
    brand: "AGFA",
    grain: "Medium",
    useCases: ["General Purpose", "Creative"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "UK",
    process: "C-41",
    id: "agfa-vista-plus-400",
  },
  {
    name: "Fomapan 100 Classic",
    type: "Black & White",
    speed: 100,
    brand: "Fomapan",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "Czech Rep",
    process: "B&W",
    id: "fomapan-100-classic",
  },
  {
    name: "Fomapan 200 Creative",
    type: "Black & White",
    speed: 200,
    brand: "Fomapan",
    grain: "Normal",
    useCases: ["General Purpose", "Portraits", "Street"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Medium",
    origin: "Czech Rep",
    process: "B&W",
    id: "fomapan-200-creative",
  },
  {
    name: "Fomapan 400 Action",
    type: "Black & White",
    speed: 400,
    brand: "Fomapan",
    grain: "Normal",
    useCases: [
      "General Purpose",
      "Portraits",
      "Street",
      "Sports",
      "Low Light Conditions",
    ],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Medium",
    origin: "Czech Rep",
    process: "B&W",
    id: "fomapan-400-action",
  },
  {
    name: "Fuji C200",
    type: "Color Negative",
    speed: 200,
    brand: "Fujifilm",
    grain: "Normal",
    useCases: ["General Purpose"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "Japan",
    process: "C-41",
    id: "fuji-c200",
  },
  {
    name: "Fuji Neopan 400CN",
    type: "Black & White",
    speed: 400,
    brand: "Fujifilm",
    grain: "Fine",
    useCases: ["Wedding", "Portraits", "General Purpose", "Sports"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "Japan",
    process: "C-41",
    id: "fuji-neopan-400cn",
  },
  {
    name: "Fuji Neopan Acros 100",
    type: "Black & White",
    speed: 100,
    brand: "Fujifilm",
    grain: "Fine",
    useCases: ["Wedding", "Portraits", "General Purpose"],
    formats: ["35mm", "120"],
    contrast: "Medium high",
    origin: "Japan",
    process: "B&W",
    id: "fuji-neopan-acros-100",
  },
  {
    name: "Fuji Pro 400H",
    type: "Color Negative",
    speed: 400,
    brand: "Fujifilm",
    grain: "Normal",
    useCases: ["Wedding", "Fashion", "Portraits", "Sports"],
    formats: ["120", "35mm"],
    contrast: "Medium low",
    origin: "Japan",
    process: "C-41",
    id: "fuji-pro-400h",
  },
  {
    name: "Fuji Provia 100F",
    type: "Color Slide",
    speed: 100,
    brand: "Fujifilm",
    grain: "Very fine",
    useCases: [
      "General Purpose",
      "Product",
      "Landscape",
      "Fashion",
      "Portraits",
    ],
    formats: ["35mm", "120", "4x5", "8x10"],
    contrast: "Medium high",
    origin: "Japan",
    process: "E-6",
    id: "fuji-provia-100f",
  },
  {
    name: "Fuji Superia 200",
    type: "Color Negative",
    speed: 200,
    brand: "Fujifilm",
    grain: "Normal",
    useCases: ["General Purpose"],
    formats: ["35mm"],
    contrast: "Medium",
    origin: "Japan",
    process: "C-41",
    id: "fuji-superia-200",
  },
  {
    name: "Fuji Superia X-TRA 400",
    type: "Color Negative",
    speed: 400,
    brand: "Fujifilm",
    grain: "Normal",
    useCases: ["General Purpose", "Sports"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "Japan",
    process: "C-41",
    id: "fuji-superia-x-tra-400",
  },
  {
    name: "Fuji Superia X-TRA 800",
    type: "Color Negative",
    speed: 800,
    brand: "Fujifilm",
    grain: "Medium",
    useCases: ["General Purpose", "Sports", "Low Light Conditions"],
    formats: ["35mm"],
    contrast: "Medium",
    origin: "Japan",
    process: "C-41",
    id: "fuji-superia-x-tra-800",
  },
  {
    name: "Fuji Velvia 50",
    type: "Color Slide",
    speed: 50,
    brand: "Fujifilm",
    grain: "Very fine",
    useCases: ["Landscape", "Nature", "Fashion", "Product"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "Japan",
    process: "E-6",
    id: "fuji-velvia-50",
  },
  {
    name: "Fuji Velvia 100",
    type: "Color Slide",
    speed: 100,
    brand: "Fujifilm",
    grain: "Very fine",
    useCases: ["Landscape", "Nature", "Fashion", "Product"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "Japan",
    process: "E-6",
    id: "fuji-velvia-100",
  },
  {
    name: "Ilford Delta 100",
    type: "Black & White",
    speed: 100,
    brand: "Ilford",
    grain: "Very fine",
    useCases: ["General Purpose", "Portraits", "Street"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "UK",
    process: "B&W",
    id: "ilford-delta-100",
  },
  {
    name: "Ilford Delta 400",
    type: "Black & White",
    speed: 400,
    brand: "Ilford",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Sports"],
    formats: ["35mm", "120"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "ilford-delta-400",
  },
  {
    name: "Ilford Delta 3200",
    type: "Black & White",
    speed: 1000,
    brand: "Ilford",
    grain: "Medium",
    useCases: ["Low Light Conditions", "Sports", "Street"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "UK",
    process: "B&W",
    id: "ilford-delta-3200",
  },
  {
    name: "Ilford FP4 Plus",
    type: "Black & White",
    speed: 125,
    brand: "Ilford",
    grain: "Fine",
    useCases: ["General Purpose"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "UK",
    process: "B&W",
    id: "ilford-fp4-plus",
  },
  {
    name: "Ilford HP5 Plus",
    type: "Black & White",
    speed: 400,
    brand: "Ilford",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Travel", "Sports"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Medium",
    origin: "UK",
    process: "B&W",
    id: "ilford-hp5-plus",
  },
  {
    name: "Ilford Pan 100",
    type: "Black & White",
    speed: 100,
    brand: "Ilford",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "ilford-pan-100",
  },
  {
    name: "Ilford Pan 400",
    type: "Black & White",
    speed: 400,
    brand: "Ilford",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Sports"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "ilford-pan-400",
  },
  {
    name: "Ilford Pan F Plus",
    type: "Black & White",
    speed: 50,
    brand: "Ilford",
    grain: "Very fine",
    useCases: ["Portraits", "Landscape", "Nature"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "UK",
    process: "B&W",
    id: "ilford-pan-f-plus",
  },
  {
    name: "Ilford SFX 200",
    type: "Black & White",
    speed: 200,
    brand: "Ilford",
    grain: "Normal",
    useCases: ["Creative", "Street", "Landscape", "Nature", "Fashion"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "UK",
    process: "B&W",
    id: "ilford-sfx-200",
  },
  {
    name: "Ilford XP2 Super",
    type: "Black & White",
    speed: 400,
    brand: "Ilford",
    grain: "Very fine",
    useCases: ["General Purpose", "Portraits", "Street", "Sports"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "UK",
    process: "C-41",
    id: "ilford-xp2-super",
  },
  {
    name: "Kentmere 100",
    type: "Black & White",
    speed: 100,
    brand: "Kentmere",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "kentmere-100",
  },
  {
    name: "Kentmere 400",
    type: "Black & White",
    speed: 400,
    brand: "Kentmere",
    grain: "Fine",
    useCases: ["General Purpose", "Portraits", "Street", "Sports"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "UK",
    process: "B&W",
    id: "kentmere-400",
  },
  {
    name: "Kodak ColorPlus 200",
    type: "Color Negative",
    speed: 200,
    brand: "Kodak",
    grain: "Normal",
    useCases: ["General Purpose"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "USA",
    process: "C-41",
    id: "kodak-colorplus-200",
  },
  {
    name: "Kodak Ektachrome E100",
    type: "Color Slide",
    speed: 100,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Nature", "Landscape"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Medium high",
    origin: "USA",
    process: "E-6",
    id: "kodak-ektachrome-e100",
  },
  {
    name: "Kodak Ektar 100",
    type: "Color Negative",
    speed: 100,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Nature", "Travel", "Fashion", "Landscape"],
    formats: ["35mm", "120", "4x5"],
    contrast: "High",
    origin: "USA",
    process: "C-41",
    id: "kodak-ektar-100",
  },
  {
    name: "Kodak Gold 200",
    type: "Color Negative",
    speed: 200,
    brand: "Kodak",
    grain: "Medium",
    useCases: ["General Purpose"],
    formats: ["35mm"],
    contrast: "Medium low",
    origin: "USA",
    process: "C-41",
    id: "kodak-gold-200",
  },
  {
    name: "Kodak Portra 160",
    type: "Color Negative",
    speed: 160,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Fashion", "Wedding", "Portraits"],
    formats: ["120", "4x5", "8x10", "35mm"],
    contrast: "Medium",
    origin: "USA",
    process: "C-41",
    id: "kodak-portra-160",
  },
  {
    name: "Kodak Portra 400",
    type: "Color Negative",
    speed: 400,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Portraits", "General Purpose", "Product"],
    formats: ["35mm", "120", "4x5", "8x10"],
    contrast: "Medium high",
    origin: "USA",
    process: "C-41",
    id: "kodak-portra-400",
  },
  {
    name: "Kodak Portra 800",
    type: "Color Negative",
    speed: 800,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Low Light Conditions", "Portraits"],
    formats: ["120", "35mm"],
    contrast: "Medium",
    origin: "USA",
    process: "C-41",
    id: "kodak-portra-800",
  },
  {
    name: "Kodak ProImage 100",
    type: "Color Negative",
    speed: 100,
    brand: "Kodak",
    grain: "Medium",
    useCases: ["Portraits", "Wedding", "General Purpose", "Fashion"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "USA",
    process: "C-41",
    id: "kodak-proimage-100",
  },
  {
    name: "Kodak T-MAX 100",
    type: "Black & White",
    speed: 100,
    brand: "Kodak",
    grain: "Very fine",
    useCases: ["General Purpose", "Detailed Subject", "Product"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Medium high",
    origin: "USA",
    process: "B&W",
    id: "kodak-t-max-100",
  },
  {
    name: "Kodak T-MAX 400",
    type: "Black & White",
    speed: 400,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["General Purpose", "Detailed Subject", "Sports"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "USA",
    process: "B&W",
    id: "kodak-t-max-400",
  },
  {
    name: "Kodak T-MAX P3200",
    type: "Black & White",
    speed: 800,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["General Purpose", "Low Light Conditions"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "USA",
    process: "B&W",
    id: "kodak-t-max-p3200",
  },
  {
    name: "Kodak Tri-X 400",
    type: "Black & White",
    speed: 400,
    brand: "Kodak",
    grain: "Fine",
    useCases: ["Wedding", "Street", "Sports"],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "High",
    origin: "USA",
    process: "B&W",
    id: "kodak-tri-x-400",
  },
  {
    name: "Kodak Ultramax 400",
    type: "Color Negative",
    speed: 400,
    brand: "Kodak",
    grain: "Medium",
    useCases: ["General Purpose"],
    formats: ["35mm"],
    contrast: "High",
    origin: "USA",
    process: "C-41",
    id: "kodak-ultramax-400",
  },
  {
    name: "Lomochrome Purple XR",
    type: "Color Negative",
    speed: 400,
    brand: "Lomography",
    grain: "Medium",
    useCases: ["Creative"],
    formats: ["35mm"],
    contrast: "Medium",
    origin: "Czech Rep",
    process: "C-41",
    id: "lomochrome-purple-xr",
  },
  {
    name: "Lomography CN 100",
    type: "Color Negative",
    speed: 100,
    brand: "Lomography",
    grain: "Normal",
    useCases: ["Sunny Conditions", "General Purpose"],
    formats: ["35mm"],
    contrast: "Medium high",
    origin: "USA",
    process: "C-41",
    id: "lomography-cn-100",
  },
  {
    name: "Lomography CN 400",
    type: "Color Negative",
    speed: 400,
    brand: "Lomography",
    grain: "Medium",
    useCases: ["General Purpose", "Sports"],
    formats: ["35mm"],
    contrast: "High",
    origin: "USA",
    process: "C-41",
    id: "lomography-cn-400",
  },
  {
    name: "Lomography CN 800",
    type: "Color Negative",
    speed: 800,
    brand: "Lomography",
    grain: "Medium",
    useCases: ["Sunny Conditions", "Sports", "Low Light Conditions"],
    formats: ["35mm", "120"],
    contrast: "Medium",
    origin: "USA",
    process: "C-41",
    id: "lomography-cn-800",
  },
  {
    name: "Lomography Earl Grey",
    type: "Black & White",
    speed: 100,
    brand: "Lomography",
    grain: "Normal",
    useCases: ["General Purpose"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "Czech Rep",
    process: "B&W",
    id: "lomography-earl-grey",
  },
  {
    name: "Lomography Lady Grey",
    type: "Black & White",
    speed: 400,
    brand: "Lomography",
    grain: "Medium",
    useCases: ["General Purpose", "Sports"],
    formats: ["35mm", "120"],
    contrast: "High",
    origin: "Czech Rep",
    process: "B&W",
    id: "lomography-lady-grey",
  },
  {
    name: "Retro Pan 320 Soft",
    type: "Black & White",
    speed: 320,
    brand: "Fomapan",
    grain: "Normal",
    useCases: [
      "General Purpose",
      "Portraits",
      "Street",
      "Landscape",
      "Creative",
      "Nature",
    ],
    formats: ["35mm", "120", "Sheet film"],
    contrast: "Low",
    origin: "Czech Rep",
    process: "B&W",
    id: "retro-pan-320-soft",
  },
];
