// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

// ------------------ GET APIs ------------------

// GET /destinations
app.get("/destinations", async (req, res) => {
  const { data, error } = await supabase.from("destinations").select().order("id", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /hotels
app.get("/hotels", async (req, res) => {
  const { data, error } = await supabase.from("hotels").select("*").order("id", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET /events
app.get("/events", async (req, res) => {
  const { data, error } = await supabase.from("events").select("*").order("date", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// ------------------ POST APIs ------------------

// POST /bookings
app.post("/bookings", async (req, res) => {
  const { customer_name, customer_email, customer_phone, booking_type, reference_id, booking_date } = req.body;

  if (!customer_name || !customer_email || !customer_phone || !booking_type || !reference_id || !booking_date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase.from("bookings").insert([{
    customer_name,
    customer_email,
    customer_phone,
    booking_type,
    reference_id,
    booking_date
  }]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Booking successful", booking: data[0] });
});

// POST /event-registrations
app.post("/event-registrations", async (req, res) => {
  const { customer_name, customer_email, customer_phone, event_id } = req.body;

  if (!customer_name || !customer_email || !customer_phone || !event_id) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase.from("event_registrations").insert([{
    customer_name,
    customer_email,
    customer_phone,
    event_id
  }]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.json({ message: "Event registration successful", registration: data[0] });
});
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});
app.get("/Hello-world", (req, res) => {
  res.send("Hello World! Your server is working!");
});


// ------------------ Start server ------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
