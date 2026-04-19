export type ResponsiveImage = {
  src: string;
  srcSet: string;
  placeholder?: string;
};

const opt = import.meta.glob("@/assets/optimized/*.webp", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const findOpt = (suffix: string) =>
  opt[Object.keys(opt).find((k) => k.endsWith(suffix))!];

const galleryImages: ResponsiveImage[] = Array.from({ length: 24 }, (_, i) => {
  const n = i + 1;
  const w400 = findOpt(`gallery-${n}-400.webp`);
  const w800 = findOpt(`gallery-${n}-800.webp`);
  const w1200 = findOpt(`gallery-${n}-1200.webp`);
  return {
    src: w800,
    srcSet: `${w400} 400w, ${w800} 800w, ${w1200} 1200w`,
    placeholder: findOpt(`gallery-${n}-blur.webp`),
  };
});

const heroImage = (name: string): ResponsiveImage => {
  const w800 = findOpt(`${name}-800.webp`);
  const w1400 = findOpt(`${name}-1400.webp`);
  const w2000 = findOpt(`${name}-2000.webp`);
  return {
    src: w1400,
    srcSet: `${w800} 800w, ${w1400} 1400w, ${w2000} 2000w`,
    placeholder: findOpt(`${name}-blur.webp`),
  };
};

export const heroSlides: ResponsiveImage[] = [
  heroImage("hero-couple"),
  heroImage("hero-1"),
  heroImage("hero-2"),
  heroImage("hero-3"),
];

const groom = findOpt("groom-800.webp");
const bride = findOpt("bride-800.webp");
const heroCouple = heroSlides[0].src;

export const weddingConfig = {
  // Ngày & Giờ cử hành lễ thành hôn (giờ Việt Nam) — 11:00 Thứ Bảy 02/05/2026
  weddingDate: new Date("2026-05-02T11:00:00+07:00"),

  groom: {
    name: "Minh Vũ",
    fullName: "Nguyễn Minh Vũ",
    bio: "Con trai của Ông Nguyễn Hữu Mạnh.",
    photo: groom,
    bank: {
      name: "Techcombank",
      account: "1903 5502 8770 29",
      holder: "NGUYEN MINH VU",
      qr: "https://img.vietqr.io/image/TCB-19035502877029-print.png?accountName=NGUYEN%20MINH%20VU",
    },
  },

  bride: {
    name: "Kim Chi",
    fullName: "Vũ Thị Kim Chi",
    bio: "Con gái của Ông Vũ Văn Chuẩn và Bà Lưu Thị Hoàng Ngân.",
    photo: bride,
    bank: {
      name: "MB Bank",
      account: "0347 107 339",
      holder: "VU THI KIM CHI",
      qr: "https://img.vietqr.io/image/MB-0347107339-print.png?accountName=VU%20THI%20KIM%20CHI",
    },
  },

  hero: {
    image: heroCouple,
    dateText: "Thứ Bảy · 02 tháng 05 năm 2026",
    lunarText: "Nhằm ngày 16 tháng 03 năm Bính Ngọ",
  },

  ceremony: {
    title: "Lễ Vu Quy",
    time: "08:00 · Thứ Bảy, 02/05/2026",
    address:
      "Tư gia nhà gái — Thôn Hành Dũng Nghĩa, Xã Vũ Tiên, Hưng Yên",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Thon+Hanh+Dung+Nghia+Vu+Tien+Hung+Yen",
  },

  reception: {
    title: "Bữa cơm thân mật",
    time: "16:30 · Thứ Sáu, 01/05/2026",
    address:
      "Tư gia nhà gái — Thôn Hành Dũng Nghĩa, Xã Vũ Tiên, Hưng Yên",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Thon+Hanh+Dung+Nghia+Vu+Tien+Hung+Yen",
  },

  loveStory: [
    {
      date: "Tháng 9, 2019",
      title: "Lần đầu gặp gỡ",
      description:
        "Chúng mình gặp nhau trong một buổi cà phê chiều Hà Nội — anh ngồi đọc sách, em vô tình hỏi giờ. Chỉ thế thôi, mà thành duyên.",
    },
    {
      date: "Tháng 2, 2020",
      title: "Chính thức hẹn hò",
      description:
        "Sau những lần lang thang quán xá và những tin nhắn không ngủ, anh nắm tay em dưới hàng cây Phan Đình Phùng và nói: 'Mình yêu nhau nhé.'",
    },
    {
      date: "Tháng 6, 2023",
      title: "Cùng nhau xây tổ ấm",
      description:
        "Căn hộ nhỏ đầu tiên — nơi chúng mình học cách chia nhau từ ly cà phê sáng đến giấc mơ về một ngôi nhà có tiếng cười trẻ thơ.",
    },
    {
      date: "Tháng 4, 2025",
      title: "Lời cầu hôn",
      description:
        "Tại Đà Lạt, dưới những đoá hoa anh đào nở muộn, anh quỳ gối. Em khóc, gật đầu, và cả thế giới như dừng lại.",
    },
  ],

  gallery: galleryImages,
};

export type WeddingConfig = typeof weddingConfig;
