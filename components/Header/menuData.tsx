import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Accueil",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Catalogue de ressources",
    path: "/resources",
    newTab: false,
  },
  {
    id: 4,
    title: "Mon compte",
    newTab: false,
    submenu: [
      {
        id: 41,
        title: "Mon tableau de bord",
        path: "/dashboard",
        newTab: false,
      },
      {
        id: 42,
        title: "Administration",
        path: "/admin",
        newTab: false,
      },
      {
        id: 43,
        title: "Déconnexion",
        path: "/logout",
        newTab: false,
      },
    ],
  },
];
export default menuData;
