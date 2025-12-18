import { TUser } from "@/types/user";

export const users: TUser[] = [
  {
    id: 1,
    name: "Leanne Graham",
    username: "Bret",
    email: "leanne.graham@example.com",
    address: {
      street: "Kulas Light",
      suite: "Apt. 556",
      city: "Gwenborough",
      zipcode: "92998-3874",
      geo: { lat: "-37.3159", lng: "81.1496" },
    },
    phone: "1-770-736-8031",
    website: "leanne.org",
    company: {
      name: "Romaguera-Crona",
      catchPhrase: "Multi-layered client-server neural-net",
      bs: "harness real-time e-markets",
    },
  },
  {
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "ervin.howell@example.com",
    address: {
      street: "Victor Plains",
      suite: "Suite 879",
      city: "Wisokyburgh",
      zipcode: "90566-7771",
      geo: { lat: "-43.9509", lng: "-34.4618" },
    },
    phone: "010-692-6593",
    website: "ervin.info",
    company: {
      name: "Deckow-Crist",
      catchPhrase: "Proactive didactic contingency",
      bs: "synergize scalable supply-chains",
    },
  },
  {
    id: 3,
    name: "Clementine Bauch",
    username: "Samantha",
    email: "clementine.bauch@example.com",
    address: {
      street: "Douglas Extension",
      suite: "Suite 847",
      city: "McKenziehaven",
      zipcode: "59590-4157",
      geo: { lat: "-68.6102", lng: "-47.0653" },
    },
    phone: "1-463-123-4447",
    website: "clementine.net",
    company: {
      name: "Romaguera-Jacobson",
      catchPhrase: "Face to face bifurcated interface",
      bs: "e-enable strategic applications",
    },
  },
  {
    id: 4,
    name: "Patricia Lebsack",
    username: "Karianne",
    email: "patricia.lebsack@example.com",
    address: {
      street: "Hoeger Mall",
      suite: "Apt. 692",
      city: "South Elvis",
      zipcode: "53919-4257",
      geo: { lat: "29.4572", lng: "-164.2990" },
    },
    phone: "493-170-9623",
    website: "patricia.biz",
    company: {
      name: "Robel-Corkery",
      catchPhrase: "Multi-tiered zero tolerance productivity",
      bs: "transition cutting-edge web services",
    },
  },
  {
    id: 5,
    name: "Chelsey Dietrich",
    username: "Kamren",
    email: "chelsey.dietrich@example.com",
    address: {
      street: "Skiles Walks",
      suite: "Suite 351",
      city: "Roscoeview",
      zipcode: "33263",
      geo: { lat: "-31.8129", lng: "62.5342" },
    },
    phone: "(254)954-1289",
    website: "chelsey.org",
    company: {
      name: "Keebler LLC",
      catchPhrase: "User-centric fault-tolerant solution",
      bs: "revolutionize end-to-end systems",
    },
  },

  // ---- USERS 6–50 (synthetic but consistent) ----

  ...Array.from({ length: 45 }, (_, i) => {
    const id = i + 6;
    return {
      id,
      name: `User ${id}`,
      username: `user${id}`,
      email: `user${id}@example.com`,
      address: {
        street: `Main Street ${id}`,
        suite: `Apt. ${100 + id}`,
        city: `City ${id}`,
        zipcode: `1000${id}`,
        geo: {
          lat: (Math.random() * 180 - 90).toFixed(4),
          lng: (Math.random() * 360 - 180).toFixed(4),
        },
      },
      phone: `555-010-${id.toString().padStart(4, "0")}`,
      website: `user${id}.com`,
      company: {
        name: `Company ${id}`,
        catchPhrase: "Innovative scalable solutions",
        bs: "leverage robust infrastructures",
      },
    };
  }),
];
