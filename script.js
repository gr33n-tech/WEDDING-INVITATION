const weddingDate = new Date("2027-01-31T11:00:00+03:00");

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate - now;
  const ids = ["days", "hours", "minutes", "seconds"];

  if (difference <= 0) {
    ids.forEach(id => document.getElementById(id).textContent = "0");
    document.querySelector(".countdown-label").textContent =
      "Today is the celebration of Nicholas & Lucy!";
    return;
  }

  const values = [
    Math.floor(difference / (1000 * 60 * 60 * 24)),
    Math.floor((difference / (1000 * 60 * 60)) % 24),
    Math.floor((difference / (1000 * 60)) % 60),
    Math.floor((difference / 1000) % 60)
  ];

  ids.forEach((id, index) => {
    document.getElementById(id).textContent = String(values[index]).padStart(2, "0");
  });
}

document.getElementById("printButton").addEventListener("click", () => window.print());

document.getElementById("calendarButton").addEventListener("click", () => {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Nicholas and Lucy//Wedding Invitation//EN",
    "BEGIN:VEVENT",
    "UID:nicholas-lucy-wedding-20270131@example.com",
    "DTSTAMP:20261125T100000Z",
    "DTSTART;TZID=Africa/Nairobi:20270131T110000",
    "SUMMARY:Wedding of Nicholas Gachugi and Lucy Wanjiku",
    "LOCATION:Birithia Catholic Parish",
    "DESCRIPTION:Wedding ceremony. Reception follows immediately after the ceremony at their home ground.",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const file = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "Nicholas-and-Lucy-Wedding.ics";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
});

updateCountdown();
setInterval(updateCountdown, 1000);
