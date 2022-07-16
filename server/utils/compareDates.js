function compareDates(startDate, endDate) {
  const tripStarted = (new Date(startDate) < new Date());
  const tripEnded = (new Date(endDate) < new Date());

  let status;

  if (tripStarted && tripEnded) {
    status = 'passed';
  } else if (tripStarted && !tripEnded) {
    status = 'current';
  } else {
    status = 'upcoming';
  }

  return status;
}

module.exports = compareDates;
