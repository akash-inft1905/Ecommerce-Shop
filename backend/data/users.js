import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin123", 10),
    isAdmin: true,
  },
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: bcrypt.hashSync("password123", 10),
    isAdmin: false,
  },
  {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    password: bcrypt.hashSync("mypassword", 10),
    isAdmin: false,
  },
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    password: bcrypt.hashSync("alicepass", 10),
    isAdmin: false,
  },
  {
    name: "Bob Brown",
    email: "bob.brown@example.com",
    password: bcrypt.hashSync("bobpass", 10),
    isAdmin: false,
  },
  {
    name: "Charlie Davis",
    email: "charlie.davis@example.com",
    password: bcrypt.hashSync("charliepass", 10),
    isAdmin: false,
  },
  {
    name: "Emily White",
    email: "emily.white@example.com",
    password: bcrypt.hashSync("emilypassword", 10),
    isAdmin: false,
  },
  {
    name: "David Wilson",
    email: "david.wilson@example.com",
    password: bcrypt.hashSync("davidpass", 10),
    isAdmin: false,
  },
  {
    name: "Grace Lee",
    email: "grace.lee@example.com",
    password: bcrypt.hashSync("gracepass", 10),
    isAdmin: false,
  },
  {
    name: "Henry Hall",
    email: "henry.hall@example.com",
    password: bcrypt.hashSync("henrypass", 10),
    isAdmin: false,
  },
];

export default users;
