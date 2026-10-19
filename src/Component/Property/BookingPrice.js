// Shared by the modal (to display) and the API route (to charge).
const DAYS_PER_PERIOD = { Daily: 1, Weekly: 7, Monthly: 30 };

export function calculateBooking({ rent, rentType, moveInDate, moveOutDate }) {
  const daysPerPeriod = DAYS_PER_PERIOD[rentType];
  const days = Math.round((new Date(moveOutDate) - new Date(moveInDate)) / 86400000);

  if (!daysPerPeriod || !(days > 0)) return null;

  const perDay = Number(rent) / daysPerPeriod;
  return { days, perDay, total: Math.round(days * perDay) };
}