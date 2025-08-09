// Sidebar imports
import {
  UilEstate,
  UilClipboardAlt,
  UilUser,
  UilPackage,
  UilIcons,
  UilChart,
  UilPlus,
  UilUserPlus,
  UilPalette,
  UilApps,
  UilImageResizeSquare,
  UilArchive,
  UilPhoneAlt,
} from "@iconscout/react-unicons";

// Analytics Cards imports
import { UilUsdSquare, UilMoneyWithdrawal } from "@iconscout/react-unicons";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";

// Sidebar Data
export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    to: "/"
  },
  {
    icon: UilClipboardAlt,
    heading: "Commandes",
    to: "/orders"
  },
  {
    icon: UilPackage,
    UilIcons,
    heading: 'Produits',
    to: "/products"
  },
  {
    icon: UilIcons,
    heading: 'Modèles',
    to: "/designs"
  },
  {
    icon: UilPlus,
    heading: 'Nv Produit',
    to: "/add-product"
  },
  {
    icon: UilImageResizeSquare,
    heading: 'Nv modèle',
    to: "/add-design"
  },
  {
    icon: UilApps,
    heading: 'Nv Catégorie',
    to: "/add-category"
  },
  {
    icon: UilPalette,
    heading: 'Nv Theme',
    to: "/add-theme"
  },
    {
    icon: UilUserPlus,
    heading: 'Nv compte',
    to: "/add-user"
  },
  {
    icon: UilChart,
    heading: 'Stats',
    to: "/Analytics"
  },
  {
    icon: UilUser,
    heading: 'Login',
    to: "/login"
  },
  {
    icon: UilUser,
    heading: 'Profile',
    to: "/profile"
  },
];

// Filter Cards Data
export const filterCardsData = [
  {
    title: "Tous",
    color: {
      backGround: "linear-gradient(rgb(0, 51, 102) -146.42%, rgb(102, 178, 255) -46.42%)",
      boxShadow: "0px 8px 12px 0px #FFD700",
    },
  },
  {
    title: "Reçu",
    color: {
      backGround: "linear-gradient(180deg, #FFD700 0%, #FFC300 100%)",
      boxShadow: "0px 8px 12px 0px #FFD700",
    },
  },
  {
    title: "Confirmé",
    color: {
      backGround:
        "linear-gradient(rgb(128, 128, 128) -146.42%, rgb(192, 192, 192) -46.42%)",
      boxShadow: "0px 8px 12px 0px #F9D59B",
    },
  },
  {
    title: "En cours",
    color: {
      backGround: "linear-gradient(180deg, #4facfe 0%, #00f2fe 100%)",
      boxShadow: "0px 8px 12px 0px #4facfe",
    },
  },
  {
    title: "A vérifier",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 8px 12px 0px #bb67ff",
    },
  },
  {
    title: "Livré",
    color: {
      backGround: "linear-gradient(180deg, #66ff66 0%, #33cc33 100%)",
      boxShadow: "0px 8px 12px 0px #66ff66",
    },
  },
  {
    title: "Retour",
    color: {
      backGround:
        "linear-gradient(180deg, #FF6347 0%, #FF4500 100%)",
      boxShadow: "0px 8px 12px 0px #FF6347",
    },
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];


export const ordersRows = [
  { nom: "Talel Ayed", Governorate: "Monastir", téléphone: "53821022", produit: "T-shirt", commandeId: 189084214, date: new Date("2024-10-01"), total: 20, status: "Reçu" },
  { nom: "Mehdi Jlassi", Governorate: "Sousse", téléphone: "53821023", produit: "Sneakers", commandeId: 189084215, date: new Date("2024-10-02"), total: 50, status: "Confirmé" },
  { nom: "Rania Ben Slimane", Governorate: "Tunis", téléphone: "53821024", produit: "Jacket", commandeId: 189084216, date: new Date("2024-10-03"), total: 100, status: "Livré" },
  { nom: "Ahmed Ayari", Governorate: "Bizerte", téléphone: "53821025", produit: "Jeans", commandeId: 189084217, date: new Date("2024-10-04"), total: 40, status: "En cours" },
  { nom: "Sarah Trabelsi", Governorate: "Mahdia", téléphone: "53821026", produit: "Dress", commandeId: 189084218, date: new Date("2024-10-05"), total: 60, status: "A vérifier" },
  { nom: "Khaled Bouazizi", Governorate: "Sfax", téléphone: "53821027", produit: "T-shirt", commandeId: 189084219, date: new Date("2024-10-06"), total: 20, status: "Retour" },
  { nom: "Fatma Rekik", Governorate: "Medenine", téléphone: "53821028", produit: "Sneakers", commandeId: 189084220, date: new Date("2024-10-07"), total: 50, status: "Confirmé" },
  { nom: "Mohamed Ali", Governorate: "Gafsa", téléphone: "53821029", produit: "Jacket", commandeId: 189084221, date: new Date("2024-10-08"), total: 100, status: "Livré" },
  { nom: "Amira Ben Hassine", Governorate: "Gabes", téléphone: "53821030", produit: "Jeans", commandeId: 189084222, date: new Date("2024-10-09"), total: 40, status: "En cours" },
  { nom: "Oussama Gharbi", Governorate: "Nabeul", téléphone: "53821031", produit: "Dress", commandeId: 189084223, date: new Date("2024-10-10"), total: 60, status: "A vérifier" },
  { nom: "Ines Belhaj", Governorate: "Beja", téléphone: "53821032", produit: "T-shirt", commandeId: 189084224, date: new Date("2024-10-11"), total: 20, status: "Retour" },
  { nom: "Nader Bouzid", Governorate: "Kasserine", téléphone: "53821033", produit: "Sneakers", commandeId: 189084225, date: new Date("2024-10-12"), total: 50, status: "Confirmé" },
  { nom: "Yasmine Chaieb", Governorate: "Ariana", téléphone: "53821034", produit: "Jacket", commandeId: 189084226, date: new Date("2024-10-13"), total: 100, status: "Livré" },
  { nom: "Foued Marzouki", Governorate: "Ben Arous", téléphone: "53821035", produit: "Jeans", commandeId: 189084227, date: new Date("2024-10-14"), total: 40, status: "En cours" },
  { nom: "Layla Hentati", Governorate: "Jendouba", téléphone: "53821036", produit: "Dress", commandeId: 189084228, date: new Date("2024-10-15"), total: 60, status: "A vérifier" },
  { nom: "Sami Zitouni", Governorate: "Kairouan", téléphone: "53821037", produit: "T-shirt", commandeId: 189084229, date: new Date("2024-10-16"), total: 20, status: "Retour" },
  { nom: "Rim Gharbi", Governorate: "Kebili", téléphone: "53821038", produit: "Sneakers", commandeId: 189084230, date: new Date("2024-10-17"), total: 50, status: "Confirmé" },
  { nom: "Wassim Riahi", Governorate: "Kef", téléphone: "53821039", produit: "Jacket", commandeId: 189084231, date: new Date("2024-10-18"), total: 100, status: "Livré" },
  { nom: "Nadia Omrani", Governorate: "Manouba", téléphone: "53821040", produit: "Jeans", commandeId: 189084232, date: new Date("2024-10-19"), total: 40, status: "En cours" },
  { nom: "Chokri Souid", Governorate: "Sidi Bouzid", téléphone: "53821041", produit: "Dress", commandeId: 189084233, date: new Date("2024-10-20"), total: 60, status: "A vérifier" },
  { nom: "Marwa Ajmi", Governorate: "Tataouine", téléphone: "53821042", produit: "T-shirt", commandeId: 189084234, date: new Date("2024-10-21"), total: 20, status: "Retour" },
  { nom: "Fathi Dridi", Governorate: "Tozeur", téléphone: "53821043", produit: "Sneakers", commandeId: 189084235, date: new Date("2024-10-22"), total: 50, status: "Confirmé" },
  { nom: "Najla Ben Salah", Governorate: "Zaghouan", téléphone: "53821044", produit: "Jacket", commandeId: 189084236, date: new Date("2024-10-23"), total: 100, status: "Livré" },
  { nom: "Bilel Khammassi", Governorate: "Monastir", téléphone: "53821045", produit: "Jeans", commandeId: 189084237, date: new Date("2024-10-24"), total: 40, status: "En cours" },
  { nom: "Hela Ben Aissa", Governorate: "Sousse", téléphone: "53821046", produit: "Dress", commandeId: 189084238, date: new Date("2024-10-25"), total: 60, status: "A vérifier" },
  { nom: "Wael Majed", Governorate: "Tunis", téléphone: "53821047", produit: "T-shirt", commandeId: 189084239, date: new Date("2024-10-26"), total: 20, status: "Retour" },
  { nom: "Olfa Ben Sassi", Governorate: "Bizerte", téléphone: "53821048", produit: "Sneakers", commandeId: 189084240, date: new Date("2024-10-27"), total: 50, status: "Confirmé" },
  { nom: "Zied Kacem", Governorate: "Mahdia", téléphone: "53821049", produit: "Jacket", commandeId: 189084241, date: new Date("2024-10-28"), total: 100, status: "Livré" },
  { nom: "Lamia Dhouib", Governorate: "Sfax", téléphone: "53821050", produit: "Jeans", commandeId: 189084242, date: new Date("2024-10-29"), total: 40, status: "En cours" },
  { nom: "Chiraz Hamdi", Governorate: "Medenine", téléphone: "53821051", produit: "Dress", commandeId: 189084243, date: new Date("2024-10-30"), total: 60, status: "A vérifier" },
  { nom: "Rached Arfaoui", Governorate: "Gafsa", téléphone: "53821052", produit: "T-shirt", commandeId: 189084244, date: new Date("2024-10-31"), total: 20, status: "Retour" },
  { nom: "Meriem Chaabane", Governorate: "Gabes", téléphone: "53821053", produit: "Sneakers", commandeId: 189084245, date: new Date("2024-11-01"), total: 50, status: "Confirmé" },
  { nom: "Mourad Ben Ammar", Governorate: "Nabeul", téléphone: "53821054", produit: "Jacket", commandeId: 189084246, date: new Date("2024-11-02"), total: 100, status: "Livré" },
  { nom: "Salma Tounsi", Governorate: "Beja", téléphone: "53821055", produit: "Jeans", commandeId: 189084247, date: new Date("2024-11-03"), total: 40, status: "En cours" },
  { nom: "Adel Toumi", Governorate: "Kasserine", téléphone: "53821056", produit: "Dress", commandeId: 189084248, date: new Date("2024-11-04"), total: 60, status: "A vérifier" },
  { nom: "Amina Jabri", Governorate: "Ariana", téléphone: "53821057", produit: "T-shirt", commandeId: 189084249, date: new Date("2024-11-05"), total: 20, status: "Retour" },
  { nom: "Anis Jarray", Governorate: "Ben Arous", téléphone: "53821058", produit: "Sneakers", commandeId: 189084250, date: new Date("2024-11-06"), total: 50, status: "Confirmé" },
  { nom: "Nada Ayari", Governorate: "Jendouba", téléphone: "53821059", produit: "Jacket", commandeId: 189084251, date: new Date("2024-11-07"), total: 100, status: "Livré" },
  { nom: "Amel Ben Abdallah", Governorate: "Kairouan", téléphone: "53821060", produit: "Jeans", commandeId: 189084252, date: new Date("2024-11-08"), total: 40, status: "En cours" },
  { nom: "Hichem Lajili", Governorate: "Kebili", téléphone: "53821061", produit: "Dress", commandeId: 189084253, date: new Date("2024-11-09"), total: 60, status: "A vérifier" },
  { nom: "Selma Khadraoui", Governorate: "Kef", téléphone: "53821062", produit: "T-shirt", commandeId: 189084254, date: new Date("2024-11-10"), total: 20, status: "Retour" },
  { nom: "Tarek Lahmar", Governorate: "Manouba", téléphone: "53821063", produit: "Sneakers", commandeId: 189084255, date: new Date("2024-11-11"), total: 50, status: "Confirmé" },
  { nom: "Ali Dridi", Governorate: "Monastir", téléphone: "53821050", produit: "T-shirt", commandeId: 189084214, date: new Date("2024-11-08"), total: 20, status: "Livré" },
{ nom: "Sami Trabelsi", Governorate: "Sousse", téléphone: "53821051", produit: "Sneakers", commandeId: 189084215, date: new Date("2024-11-09"), total: 50, status: "Livré" },
{ nom: "Mouna Ben Ahmed", Governorate: "Tunis", téléphone: "53821052", produit: "Jacket", commandeId: 189084216, date: new Date("2024-11-10"), total: 100, status: "Livré" },
{ nom: "Hichem Khemiri", Governorate: "Bizerte", téléphone: "53821053", produit: "Jeans", commandeId: 189084217, date: new Date("2024-11-11"), total: 40, status: "Livré" },
{ nom: "Amira Saidi", Governorate: "Mahdia", téléphone: "53821054", produit: "Dress", commandeId: 189084218, date: new Date("2024-11-12"), total: 60, status: "Livré" },
{ nom: "Lotfi Nasri", Governorate: "Sfax", téléphone: "53821055", produit: "T-shirt", commandeId: 189084219, date: new Date("2024-11-13"), total: 20, status: "Livré" },
{ nom: "Samia Ferchichi", Governorate: "Medenine", téléphone: "53821056", produit: "Sneakers", commandeId: 189084220, date: new Date("2024-11-14"), total: 50, status: "Livré" },
{ nom: "Mehdi Saidani", Governorate: "Gafsa", téléphone: "53821057", produit: "Jacket", commandeId: 189084221, date: new Date("2024-11-15"), total: 100, status: "Livré" },
{ nom: "Khaled Mansour", Governorate: "Gabes", téléphone: "53821058", produit: "Jeans", commandeId: 189084222, date: new Date("2024-11-08"), total: 40, status: "Livré" },
{ nom: "Meriem Khelil", Governorate: "Nabeul", téléphone: "53821059", produit: "Dress", commandeId: 189084223, date: new Date("2024-11-09"), total: 60, status: "Livré" },
{ nom: "Nadia Mbarek", Governorate: "Beja", téléphone: "53821060", produit: "T-shirt", commandeId: 189084224, date: new Date("2024-11-10"), total: 20, status: "Livré" },
{ nom: "Zied Ghedira", Governorate: "Kasserine", téléphone: "53821061", produit: "Sneakers", commandeId: 189084225, date: new Date("2024-11-11"), total: 50, status: "Livré" },
{ nom: "Rania Chaabane", Governorate: "Ariana", téléphone: "53821062", produit: "Jacket", commandeId: 189084226, date: new Date("2024-11-12"), total: 100, status: "Livré" },
{ nom: "Moez Miled", Governorate: "Ben Arous", téléphone: "53821063", produit: "Jeans", commandeId: 189084227, date: new Date("2024-11-13"), total: 40, status: "Livré" },
{ nom: "Faten Amri", Governorate: "Jendouba", téléphone: "53821064", produit: "Dress", commandeId: 189084228, date: new Date("2024-11-14"), total: 60, status: "Livré" },
{ nom: "Kais Bejaoui", Governorate: "Kairouan", téléphone: "53821065", produit: "T-shirt", commandeId: 189084229, date: new Date("2024-11-15"), total: 20, status: "Livré" },
{ nom: "Houda Dhouib", Governorate: "Kebili", téléphone: "53821066", produit: "Sneakers", commandeId: 189084230, date: new Date("2024-11-08"), total: 50, status: "Livré" },
{ nom: "Slim Siala", Governorate: "Kef", téléphone: "53821067", produit: "Jacket", commandeId: 189084231, date: new Date("2024-11-09"), total: 100, status: "Livré" },
{ nom: "Saida Zribi", Governorate: "Manouba", téléphone: "53821068", produit: "Jeans", commandeId: 189084232, date: new Date("2024-11-10"), total: 40, status: "Livré" },
{ nom: "Amine Bouzid", Governorate: "Sidi Bouzid", téléphone: "53821069", produit: "Dress", commandeId: 189084233, date: new Date("2024-11-11"), total: 60, status: "Livré" },
{ nom: "Sabrine Bouali", Governorate: "Tataouine", téléphone: "53821070", produit: "T-shirt", commandeId: 189084234, date: new Date("2024-11-12"), total: 20, status: "Livré" },
{ nom: "Habib Messaoudi", Governorate: "Tozeur", téléphone: "53821071", produit: "Sneakers", commandeId: 189084235, date: new Date("2024-11-13"), total: 50, status: "Livré" },
{ nom: "Najwa Chaouch", Governorate: "Zaghouan", téléphone: "53821072", produit: "Jacket", commandeId: 189084236, date: new Date("2024-11-14"), total: 100, status: "Livré" },
{ nom: "Riadh Bouhlel", Governorate: "Monastir", téléphone: "53821073", produit: "Jeans", commandeId: 189084237, date: new Date("2024-11-15"), total: 40, status: "Livré" },
{ nom: "Layla Jaziri", Governorate: "Sousse", téléphone: "53821074", produit: "Dress", commandeId: 189084238, date: new Date("2024-11-08"), total: 60, status: "Livré" },
{ nom: "Wael Sahli", Governorate: "Tunis", téléphone: "53821075", produit: "T-shirt", commandeId: 189084239, date: new Date("2024-11-09"), total: 20, status: "Livré" },
{ nom: "Hana Hamdi", Governorate: "Bizerte", téléphone: "53821076", produit: "Sneakers", commandeId: 189084240, date: new Date("2024-11-10"), total: 50, status: "Livré" },
{ nom: "Zied Mezghani", Governorate: "Mahdia", téléphone: "53821077", produit: "Jacket", commandeId: 189084241, date: new Date("2024-11-11"), total: 100, status: "Livré" },
{ nom: "Salma Jemni", Governorate: "Sfax", téléphone: "53821078", produit: "Jeans", commandeId: 189084242, date: new Date("2024-11-12"), total: 40, status: "Livré" },
{ nom: "Mohamed Salah", Governorate: "Medenine", téléphone: "53821079", produit: "Dress", commandeId: 189084243, date: new Date("2024-11-13"), total: 60, status: "Livré" },
{ nom: "Sami Arfa", Governorate: "Gafsa", téléphone: "53821080", produit: "T-shirt", commandeId: 189084244, date: new Date("2024-11-14"), total: 20, status: "Livré" },
{ nom: "Rim Tlili", Governorate: "Gabes", téléphone: "53821081", produit: "Sneakers", commandeId: 189084245, date: new Date("2024-11-15"), total: 50, status: "Livré" },
{ nom: "Chiraz Mansour", Governorate: "Nabeul", téléphone: "53821082", produit: "Jacket", commandeId: 189084246, date: new Date("2024-11-08"), total: 100, status: "Livré" },
{ nom: "Zina Ammar", Governorate: "Beja", téléphone: "53821083", produit: "Jeans", commandeId: 189084247, date: new Date("2024-11-09"), total: 40, status: "Livré" },
{ nom: "Foued Siala", Governorate: "Kasserine", téléphone: "53821084", produit: "Dress", commandeId: 189084248, date: new Date("2024-11-10"), total: 60, status: "Livré" },
{ nom: "Omar Ben Youssef", Governorate: "Ariana", téléphone: "53821085", produit: "T-shirt", commandeId: 189084249, date: new Date("2024-11-11"), total: 20, status: "Livré" },
{ nom: "Marwa Bouzid", Governorate: "Ben Arous", téléphone: "53821086", produit: "Sneakers", commandeId: 189084250, date: new Date("2024-11-12"), total: 50, status: "Livré" },
{ nom: "Khaled Hmidi", Governorate: "Jendouba", téléphone: "53821087", produit: "Jacket", commandeId: 189084251, date: new Date("2024-11-13"), total: 100, status: "Livré" },
{ nom: "Hiba Chouchene", Governorate: "Kairouan", téléphone: "53821088", produit: "Jeans", commandeId: 189084252, date: new Date("2024-11-14"), total: 40, status: "Livré" },
{ nom: "Ahmed Dali", Governorate: "Kebili", téléphone: "53821089", produit: "Dress", commandeId: 189084253, date: new Date("2024-11-15"), total: 60, status: "Livré" },
{ nom: "Sana Miled", Governorate: "Kef", téléphone: "53821090", produit: "T-shirt", commandeId: 189084254, date: new Date("2024-11-08"), total: 20, status: "Livré" },
{ nom: "Jamel Souid", Governorate: "Manouba", téléphone: "53821091", produit: "Sneakers", commandeId: 189084255, date: new Date("2024-11-09"), total: 50, status: "Livré" },
{ nom: "Zohra Gharbi", Governorate: "Sidi Bouzid", téléphone: "53821092", produit: "Jacket", commandeId: 189084256, date: new Date("2024-11-10"), total: 100, status: "Livré" },
{ nom: "Anis Oueslati", Governorate: "Tataouine", téléphone: "53821093", produit: "Jeans", commandeId: 189084257, date: new Date("2024-11-11"), total: 40, status: "Livré" },
{ nom: "Lamia Chatti", Governorate: "Tozeur", téléphone: "53821094", produit: "Dress", commandeId: 189084258, date: new Date("2024-11-12"), total: 60, status: "Livré" },
{ nom: "Salah Romdhane", Governorate: "Zaghouan", téléphone: "53821095", produit: "T-shirt", commandeId: 189084259, date: new Date("2024-11-13"), total: 20, status: "En cours" },
{ nom: "Nesrine Chaabani", Governorate: "Monastir", téléphone: "53821096", produit: "Sneakers", commandeId: 189084260, date: new Date("2024-11-14"), total: 50, status: "Livré" },
{ nom: "Rachid Triki", Governorate: "Sousse", téléphone: "53821097", produit: "Jacket", commandeId: 189084261, date: new Date("2024-11-15"), total: 100, status: "Livré" },
{ nom: "Mounir Selmi", Governorate: "Tunis", téléphone: "53821098", produit: "Jeans", commandeId: 189084262, date: new Date("2024-11-08"), total: 40, status: "Livré" },
{ nom: "Yasmin Marzouki", Governorate: "Bizerte", téléphone: "53821099", produit: "Dress", commandeId: 189084263, date: new Date("2024-11-09"), total: 60, status: "En cours" },
{ nom: "Brahim Achouri", Governorate: "Mahdia", téléphone: "53821100", produit: "T-shirt", commandeId: 189084264, date: new Date("2024-11-10"), total: 20, status: "Livré" },
{ nom: "Salim Jaziri", Governorate: "Sfax", téléphone: "53821101", produit: "Sneakers", commandeId: 189084265, date: new Date("2024-11-11"), total: 50, status: "Livré" },
{ nom: "Sabri Karray", Governorate: "Medenine", téléphone: "53821102", produit: "Jacket", commandeId: 189084266, date: new Date("2024-11-12"), total: 100, status: "En cours" },
{ nom: "Farah Zarrouk", Governorate: "Gafsa", téléphone: "53821103", produit: "Jeans", commandeId: 189084267, date: new Date("2024-11-13"), total: 40, status: "Livré" },
{ nom: "Issam Mhirsi", Governorate: "Gabes", téléphone: "53821104", produit: "Dress", commandeId: 189084268, date: new Date("2024-11-14"), total: 60, status: "Livré" },
{ nom: "Sabrine Chaker", Governorate: "Nabeul", téléphone: "53821105", produit: "T-shirt", commandeId: 189084269, date: new Date("2024-11-15"), total: 20, status: "Livré" },
{ nom: "Habib Mejri", Governorate: "Beja", téléphone: "53821106", produit: "Sneakers", commandeId: 189084270, date: new Date("2024-11-08"), total: 50, status: "Livré" },
{ nom: "Basma Mhiri", Governorate: "Kasserine", téléphone: "53821107", produit: "Jacket", commandeId: 189084271, date: new Date("2024-11-09"), total: 100, status: "Livré" },
{ nom: "Adel Bouzid", Governorate: "Ariana", téléphone: "53821108", produit: "Jeans", commandeId: 189084272, date: new Date("2024-11-10"), total: 40, status: "Livré" },
{ nom: "Malek Aouadi", Governorate: "Ben Arous", téléphone: "53821109", produit: "Dress", commandeId: 189084273, date: new Date("2024-11-11"), total: 60, status: "En cours" },
{ nom: "Ines Fakhfakh", Governorate: "Jendouba", téléphone: "53821110", produit: "T-shirt", commandeId: 189084274, date: new Date("2024-11-12"), total: 20, status: "Livré" },
{ nom: "Sami Frikha", Governorate: "Kairouan", téléphone: "53821111", produit: "Sneakers", commandeId: 189084275, date: new Date("2024-11-13"), total: 50, status: "Livré" },
{ nom: "Samia Gaidi", Governorate: "Kebili", téléphone: "53821112", produit: "Jacket", commandeId: 189084276, date: new Date("2024-11-14"), total: 100, status: "Livré" },
{ nom: "Majed Maaref", Governorate: "Kef", téléphone: "53821113", produit: "Jeans", commandeId: 189084277, date: new Date("2024-11-15"), total: 40, status: "Livré" },
{ nom: "Asma Jemni", Governorate: "Manouba", téléphone: "53821114", produit: "Dress", commandeId: 189084278, date: new Date("2024-11-08"), total: 60, status: "Livré" },
{ nom: "Mourad Gharbi", Governorate: "Sidi Bouzid", téléphone: "53821115", produit: "T-shirt", commandeId: 189084279, date: new Date("2024-11-09"), total: 20, status: "Livré" },
{ nom: "Ameni Sassi", Governorate: "Tataouine", téléphone: "53821116", produit: "Sneakers", commandeId: 189084280, date: new Date("2024-11-10"), total: 50, status: "Livré" },
{ nom: "Fathi Ben Ali", Governorate: "Tozeur", téléphone: "53821117", produit: "Jacket", commandeId: 189084281, date: new Date("2024-11-11"), total: 100, status: "Livré" },
{ nom: "Rania Mechergui", Governorate: "Zaghouan", téléphone: "53821118", produit: "Jeans", commandeId: 189084282, date: new Date("2024-11-12"), total: 40, status: "A vérifier" },
{ nom: "Hamza Chebbi", Governorate: "Monastir", téléphone: "53821119", produit: "Dress", commandeId: 189084283, date: new Date("2024-11-13"), total: 60, status: "Livré" },
{ nom: "Amira Ben Slimane", Governorate: "Sousse", téléphone: "53821120", produit: "T-shirt", commandeId: 189084284, date: new Date("2024-11-14"), total: 20, status: "Livré" },
{ nom: "Anwar Zribi", Governorate: "Tunis", téléphone: "53821121", produit: "Sneakers", commandeId: 189084285, date: new Date("2024-11-15"), total: 50, status: "Livré" },
{ nom: "Amira Souid", Governorate: "Ariana", téléphone: "99987654", produit: "T-shirt", commandeId: 189084286, date: new Date("2024-11-08"), total: 20, status: "Reçu" },
{ nom: "Karim Zribi", Governorate: "Beja", téléphone: "98876543", produit: "Sneakers", commandeId: 189084287, date: new Date("2024-11-09"), total: 50, status: "Confirmé" },
{ nom: "Layla Hmidi", Governorate: "Ben Arous", téléphone: "20765432", produit: "Jacket", commandeId: 189084288, date: new Date("2024-11-10"), total: 100, status: "En cours" },
{ nom: "Samir Chaabani", Governorate: "Bizerte", téléphone: "22754321", produit: "Jeans", commandeId: 189084289, date: new Date("2024-11-11"), total: 40, status: "A vérifier" },
{ nom: "Fatma Mezghani", Governorate: "Gabes", téléphone: "99654321", produit: "Dress", commandeId: 189084290, date: new Date("2024-11-12"), total: 60, status: "Retour" },
{ nom: "Ahmed Ben Salah", Governorate: "Gafsa", téléphone: "98543210", produit: "T-shirt", commandeId: 189084291, date: new Date("2024-11-13"), total: 20, status: "Reçu" },
{ nom: "Noura Ayari", Governorate: "Jendouba", téléphone: "20432109", produit: "Sneakers", commandeId: 189084292, date: new Date("2024-11-14"), total: 50, status: "Confirmé" },
{ nom: "Hassan Mebarki", Governorate: "Kairouan", téléphone: "22321098", produit: "Jacket", commandeId: 189084293, date: new Date("2024-11-15"), total: 100, status: "En cours" },
{ nom: "Hiba Chouchene", Governorate: "Kasserine", téléphone: "99765432", produit: "Jeans", commandeId: 189084294, date: new Date("2024-11-08"), total: 40, status: "A vérifier" },
{ nom: "Sami Frikha", Governorate: "Kebili", téléphone: "98654321", produit: "Dress", commandeId: 189084295, date: new Date("2024-11-09"), total: 60, status: "Retour" },
{ nom: "Salma Gharbi", Governorate: "Le Kef", téléphone: "20543210", produit: "T-shirt", commandeId: 189084296, date: new Date("2024-11-10"), total: 20, status: "Reçu" },
{ nom: "Mounir Ben Youssef", Governorate: "Mahdia", téléphone: "22432109", produit: "Sneakers", commandeId: 189084297, date: new Date("2024-11-11"), total: 50, status: "Confirmé" },
{ nom: "Imen Fathallah", Governorate: "Manouba", téléphone: "99321098", produit: "Jacket", commandeId: 189084298, date: new Date("2024-11-12"), total: 100, status: "En cours" },
{ nom: "Ali Khedher", Governorate: "Medenine", téléphone: "98210987", produit: "Jeans", commandeId: 189084299, date: new Date("2024-11-13"), total: 40, status: "A vérifier" },
{ nom: "Oumaima Belhaj", Governorate: "Monastir", téléphone: "20109876", produit: "Dress", commandeId: 189084300, date: new Date("2024-11-14"), total: 60, status: "Retour" },
{ nom: "Rania Trabelsi", Governorate: "Nabeul", téléphone: "22198765", produit: "T-shirt", commandeId: 189084301, date: new Date("2024-11-15"), total: 20, status: "Reçu" },
{ nom: "Khaled Slim", Governorate: "Sfax", téléphone: "99432109", produit: "Sneakers", commandeId: 189084302, date: new Date("2024-11-08"), total: 50, status: "Confirmé" },
{ nom: "Maha Rezgui", Governorate: "Sidi Bouzid", téléphone: "98321098", produit: "Jacket", commandeId: 189084303, date: new Date("2024-11-09"), total: 100, status: "En cours" },
{ nom: "Sahar Guesmi", Governorate: "Siliana", téléphone: "20210987", produit: "Jeans", commandeId: 189084304, date: new Date("2024-11-10"), total: 40, status: "A vérifier" },
{ nom: "Firas Amri", Governorate: "Sousse", téléphone: "22987654", produit: "Dress", commandeId: 189084305, date: new Date("2024-11-11"), total: 60, status: "Retour" },
{ nom: "Basma Mansouri", Governorate: "Tataouine", téléphone: "99210987", produit: "T-shirt", commandeId: 189084306, date: new Date("2024-11-12"), total: 20, status: "Reçu" },
{ nom: "Malek Saidani", Governorate: "Tozeur", téléphone: "98109876", produit: "Sneakers", commandeId: 189084307, date: new Date("2024-11-13"), total: 50, status: "Confirmé" },
{ nom: "Nabil Boughzala", Governorate: "Tunis", téléphone: "20876543", produit: "Jacket", commandeId: 189084308, date: new Date("2024-11-14"), total: 100, status: "En cours" },
{ nom: "Marwa Sahli", Governorate: "Zaghouan", téléphone: "22765432", produit: "Jeans", commandeId: 189084309, date: new Date("2024-11-15"), total: 40, status: "A vérifier" },
{ nom: "Amine Ben Hassine", Governorate: "Ariana", téléphone: "99345678", produit: "Dress", commandeId: 189084310, date: new Date("2024-11-08"), total: 60, status: "Retour" },
{ nom: "Wassim Trabelsi", Governorate: "Beja", téléphone: "98456789", produit: "T-shirt", commandeId: 189084311, date: new Date("2024-11-09"), total: 20, status: "Reçu" },
{ nom: "Sara Hammami", Governorate: "Ben Arous", téléphone: "20789012", produit: "Sneakers", commandeId: 189084312, date: new Date("2024-11-10"), total: 50, status: "Confirmé" },
{ nom: "Youssef Ayari", Governorate: "Bizerte", téléphone: "22780921", produit: "Jacket", commandeId: 189084313, date: new Date("2024-11-11"), total: 100, status: "En cours" },
{ nom: "Nadia Boussarsar", Governorate: "Gabes", téléphone: "99567890", produit: "Jeans", commandeId: 189084314, date: new Date("2024-11-12"), total: 40, status: "A vérifier" },
{ nom: "Hatem Mejri", Governorate: "Gafsa", téléphone: "98678901", produit: "Dress", commandeId: 189084315, date: new Date("2024-11-13"), total: 60, status: "Retour" }
];

// Products
export const products = [
  {
    img: "https://www.jbbmenswear.com/wp-content/uploads/Black-Oversized-T-shirt-1-scaled.jpg",
    id: 1,
    nom: "T-shirt",
    couleurs: ["Red", "Blue", "Green"],
    tailles: ["s", "m", "l", "xl"],
    prix: 30.99
  },
  {
    img: "https://www.cpschaps.com/media/catalog/product/c/2/c24wfja290_1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=978&width=700&canvas=700:978",
    id: 2,
    nom: "Jeans",
    couleurs: ["Black", "Blue"],
    tailles: ["28", "30", "32", "34", "36"],
    prix: 49.99
  },
  {
    img: "https://hooke.ca/cdn/shop/files/HOOKE-MEN-LIGHTWEIGHT-INSULATED-HOOD-JACKET-BLK-1.webp?v=1689773252&width=2500",
    id: 3,
    nom: "Jacket",
    couleurs: ["Black", "Brown"],
    tailles: ["s", "m", "l", "xl", "xxl"],
    prix: 79.99
  },
  {
    img: "https://media.monogramparis.com/125007-home_default/sneakers-38-hermes-cuir-blanc-et-argente.webp",
    id: 4,
    nom: "Sneakers",
    couleurs: ["White", "Black", "Grey"],
    tailles: ["38", "39", "40", "41", "42", "43", "44"],
    prix: 59.99
  },
  {
    img: "https://img01.ztat.net/article/spp-media-p1/70c67513ae044eeeb220a3e03a8d8848/d91d970aa805496c90dbc45ca2a20067.jpg?imwidth=762&filter=packshot",
    id: 5,
    nom: "Dress",
    couleurs: ["Red", "Blue", "Black"],
    tailles: ["s", "m", "l", "xl"],
    prix: 39.99
  }
];
