export function validateEmail(email) {
  var re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export function formatCharity(charity) {
  return charity
    .split('-')
    .map(word => {
      return `${word[0].toUpperCase() + word.slice(1, word.length)}`
    })
    .join(' ');
};

// takes two arrays, returns array
export function populateDropdown(friendsList, tripMembers) {
  let dropdownItems = [];
  for (let i = 0; i < friendsList.length; i++ ) {
    let toBeAdded = true;
    for (let n = 0; n < tripMembers.length; n++) {
      if (friendsList[i]._id == tripMembers[n]._id) {
        toBeAdded = false;
      }
    }
    if (toBeAdded) dropdownItems.push(friendsList[i]);
  }
  return dropdownItems;
}
