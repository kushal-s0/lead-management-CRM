import { connectDatabase } from "../config/database";
import { Lead } from "../models/Lead";

const sampleLeads = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@example.com",
    phone: "+91 9876543210",
    company: "Nimbus Retail",
    status: "New",
    notes: "Interested in a starter CRM package."
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9823456781",
    company: "BluePeak Logistics",
    status: "Contacted",
    notes: "Requested a product walkthrough next week."
  },
  {
    name: "Rohan Kapoor",
    email: "rohan.kapoor@example.com",
    phone: "+91 9911223344",
    company: "UrbanNest Homes",
    status: "Qualified",
    notes: "Budget approved, comparing enterprise plan."
  },
  {
    name: "Neha Iyer",
    email: "neha.iyer@example.com",
    phone: "+91 9000012345",
    company: "FinEdge Advisors",
    status: "Converted",
    notes: "Closed annual subscription."
  },
  {
    name: "Kabir Sethi",
    email: "kabir.sethi@example.com",
    phone: "+91 9123450987",
    company: "Craftly Studio",
    status: "Lost",
    notes: "Chose a lower-cost competitor."
  },
  {
    name: "Mira Rao",
    email: "mira.rao@example.com",
    phone: "+91 9988776655",
    company: "GreenGrid Energy",
    status: "Contacted",
    notes: "Needs integration details."
  }
];

const seed = async () => {
  await connectDatabase();
  await Lead.deleteMany({});
  await Lead.insertMany(sampleLeads);
  console.log(`Seeded ${sampleLeads.length} leads`);
  process.exit(0);
};

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
