// takes two arrays
// returns array of members to be removed from trip
// returns false if no members to remove
function populateRemoveList(oldMembers, newMembers) {
  let removeList = [];
  for (let i=0; i < oldMembers.length; i++) {
    let toBeRemoved = true;
    for (let n=0; n < newMembers.length; n++) {
      if (oldMembers[i]._id.toString() == newMembers[n]) {
        toBeRemoved = false;
      }
    }
    if (toBeRemoved) removeList.push(oldMembers[i]);
  }
  if (removeList[0]) {
    return removeList;
  } else {
    return false;
  }
}

module.exports = populateRemoveList;