import { EmergencyContact, EmergencyRequest, LaundryBooking, LaundryCredits, LaundryMachine, MarketplaceListing, MedicalProfile, NavItem, RewardEntry, ServiceItem } from "@/lib/types";
import { getEmergencyStatusState } from "@/lib/emergency";

export const appTitle = "KFUPM Student Hub";

export const primaryStudent = {
  id: "20210001",
  name: "Faisal Al-Qahtani",
  email: "faisal.q@kfupm.edu.sa",
  department: "Computer Engineering",
  year: "Senior",
  dorm: "Dormitory B - Room 314"
};

export const navigation: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: "layout-dashboard" },
  { title: "Laundry Queue", href: "/laundry", icon: "shirt" },
  { title: "Bus Services", href: "/bus-services", icon: "bus-front" },
  { title: "Marketplace", href: "/marketplace", icon: "shopping-bag" },
  { title: "Medical Emergency", href: "/medical", icon: "siren" },
  { title: "Others", href: "/others", icon: "folder" },
  { title: "Rewards", href: "/rewards", icon: "gift" },
  { title: "Leaderboard", href: "/leaderboard", icon: "medal" }
];

export const services: ServiceItem[] = [
  {
    title: "Medical Emergency",
    href: "/medical",
    description: "Request immediate help, track live response stages, and keep medical details ready for dispatch and hospital teams.",
    tone: "from-emerald-500/20 via-white to-brand-100"
  },
  {
    title: "Laundry Queue",
    href: "/laundry",
    description: "Reserve washers and dryers with campus rules, slot buffers, check-in deadlines, and a credit-based usage policy.",
    tone: "from-teal-500/15 via-white to-sky-100"
  },
  {
    title: "Bus Services",
    href: "/bus-services",
    description: "Monitor fixed campus shuttle routes through a live GPS-style map, active bus positions, and stop-by-stop route visibility.",
    tone: "from-sky-200/40 via-white to-cyan-100"
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    description: "Buy, sell, save, and browse student listings with a polished campus marketplace experience.",
    tone: "from-gold-200/35 via-white to-orange-100"
  },
  {
    title: "Others",
    href: "/others",
    description: "Access study groups, course reviews, campus food, and lost and found from one connected student-services platform.",
    tone: "from-brand-100 via-white to-petrol-50"
  }
];

export const campusSnapshot = [
  { label: "Emergency Cases", value: "12", subtext: "Medical requests tracked in one place." },
  { label: "Laundry Reservations", value: "18", subtext: "Buffer-aware slots across washers and dryers." },
  { label: "Active Buses", value: "6", subtext: "Fixed KFUPM routes visible on the live shuttle map." },
  { label: "Student Listings", value: "24", subtext: "Marketplace and community services remain active." }
];

export const medicalProfile: MedicalProfile = {
  bloodGroup: "O+",
  allergies: "Penicillin, peanuts",
  chronicDiseases: "Asthma",
  medications: "Salbutamol inhaler",
  notes: "Carry inhaler during sports activities and notify responders if breathing worsens."
};

export const emergencyContacts: EmergencyContact[] = [
  {
    id: "contact-roommate-1",
    name: "Omar Al-Harbi",
    relationship: "Roommate",
    phone: "+966 55 300 1010",
    note: "Dormitory B roommate, usually on campus after classes.",
    group: "roommate"
  },
  {
    id: "contact-roommate-2",
    name: "Ziyad Al-Rashid",
    relationship: "Roommate",
    phone: "+966 55 300 2020",
    note: "Keeps student ID and room access backup.",
    group: "roommate"
  },
  {
    id: "contact-friend-1",
    name: "Lama Al-Qahtani",
    relationship: "Friend",
    phone: "+966 55 411 3030",
    note: "Close friend and backup emergency contact.",
    group: "friend"
  }
];

export const emergencyRequests: EmergencyRequest[] = [
  {
    id: "EM-24031",
    studentName: primaryStudent.name,
    emergencyType: "breathing problem",
    symptoms: "Shortness of breath, dizziness, chest tightness after football practice.",
    severity: "Urgent",
    location: "Gate 4 walkway, KFUPM campus",
    attachments: [],
    medicalProfileSnapshot: medicalProfile,
    emergencyContactsSnapshot: emergencyContacts,
    stage: "On Site",
    statusState: getEmergencyStatusState("On Site"),
    responderUnit: "Unit 07 - Paramedic Reem",
    eta: "Arrived",
    destinationHospital: "KFUPM Medical Center",
    timeSubmitted: "2:14 PM",
    requestMode: "Instant Emergency Request"
  },
  {
    id: "EM-24032",
    studentName: "Nawaf Al-Mutairi",
    emergencyType: "accident",
    symptoms: "Bike fall with bleeding from left leg and visible swelling.",
    severity: "Critical",
    location: "Parking Area C",
    attachments: ["helmet-photo.jpg"],
    medicalProfileSnapshot: medicalProfile,
    emergencyContactsSnapshot: emergencyContacts,
    stage: "Request Received",
    statusState: getEmergencyStatusState("Request Received"),
    responderUnit: "Pending assignment",
    eta: "Dispatch pending",
    destinationHospital: "KFUPM Medical Center",
    timeSubmitted: "2:20 PM",
    requestMode: "Manual Emergency Request"
  }
];

export const laundryMachines: LaundryMachine[] = [
  { id: "WM-01", type: "Washer", building: "Dorm A", room: "Ground Floor", state: "Available", nextFreeTime: "Now" },
  { id: "WM-02", type: "Washer", building: "Dorm A", room: "Ground Floor", state: "Reserved", nextFreeTime: "17:15" },
  { id: "WM-03", type: "Washer", building: "Dorm B", room: "Level 1", state: "In Use", nextFreeTime: "18:30" },
  { id: "WM-04", type: "Washer", building: "Dorm B", room: "Level 1", state: "Available", nextFreeTime: "Now" },
  { id: "DR-01", type: "Dryer", building: "Dorm A", room: "Ground Floor", state: "Available", nextFreeTime: "Now" },
  { id: "DR-02", type: "Dryer", building: "Dorm A", room: "Ground Floor", state: "Reserved", nextFreeTime: "16:45" },
  { id: "DR-03", type: "Dryer", building: "Dorm B", room: "Level 1", state: "Out of Service", nextFreeTime: "Maintenance" },
  { id: "DR-04", type: "Dryer", building: "Dorm B", room: "Level 1", state: "Available", nextFreeTime: "Now" }
];

export const laundryBookings: LaundryBooking[] = [
  {
    id: "LB-1102",
    userId: primaryStudent.id,
    machineType: "Washer",
    machineId: "WM-02",
    building: "Dorm A",
    room: "Ground Floor",
    bookingDate: "2026-04-08",
    startTime: "17:00",
    endTime: "18:00",
    checkInDeadline: "17:15",
    status: "Upcoming",
    usageResult: "Pending",
    creditsDelta: 0
  },
  {
    id: "LB-1067",
    userId: primaryStudent.id,
    machineType: "Dryer",
    machineId: "DR-01",
    building: "Dorm A",
    room: "Ground Floor",
    bookingDate: "2026-04-05",
    startTime: "20:00",
    endTime: "20:45",
    checkInDeadline: "20:15",
    status: "Completed",
    usageResult: "Successful",
    creditsDelta: 5
  },
  {
    id: "LB-1034",
    userId: primaryStudent.id,
    machineType: "Washer",
    machineId: "WM-03",
    building: "Dorm B",
    room: "Level 1",
    bookingDate: "2026-04-03",
    startTime: "15:15",
    endTime: "16:15",
    checkInDeadline: "15:30",
    status: "Missed",
    usageResult: "Missed",
    creditsDelta: -10
  }
];

export const initialLaundryCredits: LaundryCredits = {
  balance: 20,
  blockedUntil: null,
  lastUpdated: "2026-04-08T00:00:00.000Z"
};

export const laundryRules = [
  "Each reservation includes a 15-minute buffer before the next booking starts.",
  "You must start using your reserved machine within 15 minutes of the booking start time.",
  "Successful usage gives +5 credits.",
  "Missing your slot deducts 10 credits.",
  "If your credits reach zero, laundry booking is blocked for 7 days.",
  "After the 7-day punishment period, 10 credits are restored automatically."
];

export const lostFoundItems = {
  lost: [
    { title: "Black Wallet", date: "Apr 6", location: "Library North Entrance", status: "Open", image: "Wallet" },
    { title: "Student ID Card", date: "Apr 5", location: "Building 14", status: "Matched", image: "ID" }
  ],
  found: [
    { title: "Blue Water Bottle", date: "Apr 7", location: "Gym Reception", status: "Unclaimed", image: "Bottle" },
    { title: "Laptop Charger", date: "Apr 6", location: "Cafeteria 3", status: "In Storage", image: "Charger" }
  ]
};

export const cafeterias = [
  { name: "Central Dining Hall", status: "Open", location: "Student Center", meals: "Breakfast, Lunch, Dinner" },
  { name: "Engineering Cafe", status: "Open", location: "Building 58", meals: "Coffee, Snacks, Sandwiches" },
  { name: "Residence Bites", status: "Busy", location: "Dormitory Zone", meals: "Dinner, Late Night" }
];

export const menuByCafe = [
  {
    cafeteria: "Central Dining Hall",
    items: [
      { name: "Chicken Kabsa", type: "Lunch", price: "SAR 18", availability: "Available" },
      { name: "Lentil Soup", type: "Lunch", price: "SAR 7", availability: "Limited" }
    ]
  },
  {
    cafeteria: "Engineering Cafe",
    items: [
      { name: "Halloumi Sandwich", type: "Snack", price: "SAR 14", availability: "Available" },
      { name: "Arabic Coffee", type: "Drink", price: "SAR 6", availability: "Available" }
    ]
  }
];

export const studyGroups = [
  { course: "ICS 324", title: "Networks Midterm Sprint", members: "8/12", meetingTime: "Tue 7:30 PM", location: "Library Room 2" },
  { course: "MATH 208", title: "Calculus Problem Clinic", members: "5/8", meetingTime: "Wed 6:00 PM", location: "Online - Teams" }
];

export const marketplaceListings: MarketplaceListing[] = [
  {
    id: "mk-001",
    title: "TI-84 Plus Calculator",
    price: 150,
    seller: "Ammar K.",
    sellerEmail: "s202012345@kfupm.edu.sa",
    sellerPhone: "0551234567",
    category: "Calculators",
    condition: "Like New",
    description: "Barely used, bought last semester. Works perfectly.",
    location: "Building 851",
    listedOn: "2026-03-07",
    accent: "from-slate-200 via-slate-100 to-slate-300",
    imageLabel: "Calculator"
  },
  {
    id: "mk-002",
    title: "IKEA Desk Lamp",
    price: 40,
    seller: "Lina M.",
    sellerEmail: "s202045678@kfupm.edu.sa",
    sellerPhone: "0563456789",
    category: "Furniture",
    condition: "Like New",
    description: "Adjustable LED desk lamp. White color.",
    location: "Dorm B",
    listedOn: "2026-03-09",
    accent: "from-slate-100 via-stone-50 to-slate-200",
    imageLabel: "Lamp"
  },
  {
    id: "mk-003",
    title: "Organic Chemistry Textbook",
    price: 45,
    seller: "Hassan R.",
    sellerEmail: "s202034210@kfupm.edu.sa",
    sellerPhone: "0537744110",
    category: "Books",
    condition: "Good",
    description: "McMurry 9th edition. Clean copy.",
    location: "Library Entrance",
    listedOn: "2026-03-08",
    accent: "from-stone-700 via-slate-900 to-stone-800",
    imageLabel: "Book"
  },
  {
    id: "mk-004",
    title: "Engineering Mechanics Textbook",
    price: 60,
    seller: "Rami B.",
    sellerEmail: "s202067890@kfupm.edu.sa",
    sellerPhone: "0549021122",
    category: "Books",
    condition: "Good",
    description: "Meriam & Kraige 9th edition. Some highlighting.",
    location: "Building 14",
    listedOn: "2026-03-06",
    accent: "from-stone-700 via-zinc-900 to-stone-800",
    imageLabel: "Book"
  },
  {
    id: "mk-005",
    title: "Wireless Mouse (Logitech)",
    price: 70,
    seller: "Fahad N.",
    sellerEmail: "s202078654@kfupm.edu.sa",
    sellerPhone: "0556677889",
    category: "Electronics",
    condition: "Like New",
    description: "Logitech M720 Triathlon. Multi-device.",
    location: "Dorm A",
    listedOn: "2026-03-05",
    accent: "from-slate-100 via-slate-50 to-slate-200",
    imageLabel: "Mouse"
  },
  {
    id: "mk-006",
    title: "Dell Monitor 24\"",
    price: 350,
    seller: "Salem H.",
    sellerEmail: "s202099001@kfupm.edu.sa",
    sellerPhone: "0509988776",
    category: "Electronics",
    condition: "Good",
    description: "Full HD IPS monitor. Great for study setup.",
    location: "Parking Area C pickup",
    listedOn: "2026-03-04",
    accent: "from-neutral-50 via-white to-slate-100",
    imageLabel: "Monitor",
    photos: 2
  },
  {
    id: "mk-007",
    title: "Arduino Starter Kit",
    price: 80,
    seller: "Yousef T.",
    sellerEmail: "s202043210@kfupm.edu.sa",
    sellerPhone: "0558901234",
    category: "Electronics",
    condition: "New",
    description: "Complete starter kit with sensors and breadboard.",
    location: "Building 58",
    listedOn: "2026-03-10",
    accent: "from-sky-700 via-cyan-700 to-sky-800",
    imageLabel: "Arduino"
  },
  {
    id: "mk-008",
    title: "Mini Fridge",
    price: 200,
    seller: "Huda M.",
    sellerEmail: "s202054321@kfupm.edu.sa",
    sellerPhone: "0533344556",
    category: "Furniture",
    condition: "Fair",
    description: "Small dorm fridge, works well. Pick up only.",
    location: "Dormitory Zone",
    listedOn: "2026-03-03",
    accent: "from-emerald-200 via-teal-200 to-cyan-200",
    imageLabel: "Fridge"
  }
];

export const courseCatalog = [
  { code: "ICS 202", title: "Data Structures", rating: "4.6", reviews: 28 },
  { code: "COE 308", title: "Digital Logic Design", rating: "4.2", reviews: 18 },
  { code: "MATH 208", title: "Calculus II", rating: "4.0", reviews: 34 }
];

export const courseReviewDetails = {
  title: "ICS 202 - Data Structures",
  averageRating: "4.6",
  workload: "4.3",
  clarity: "4.7",
  difficulty: "3.9",
  reviews: [
    { author: "Sara", rating: "5.0", comment: "Very organized course and lots of practical coding exercises." },
    { author: "Omar", rating: "4.3", comment: "Assignments are challenging but fair if you start early." }
  ]
};

export const rewardBreakdown: RewardEntry[] = [
  { label: "Laundry slot used successfully", points: 5 },
  { label: "Study group created", points: 120 },
  { label: "Course review submitted", points: 90 },
  { label: "Lost item reported", points: 40 },
  { label: "Marketplace listing posted", points: 55 },
  { label: "Emergency request submitted", points: 25 }
];

export const rewardsSummary = {
  totalPoints: 460,
  rank: "#12",
  badges: ["Campus Helper", "Study Buddy", "Trusted Seller"]
};

export const leaderboard = {
  weekly: [
    { name: "Reem A.", points: 620 },
    { name: "Faisal A.", points: 460 },
    { name: "Lama K.", points: 430 }
  ],
  monthly: [
    { name: "Abdulrahman S.", points: 1980 },
    { name: "Reem A.", points: 1770 },
    { name: "Faisal A.", points: 1640 }
  ]
};
