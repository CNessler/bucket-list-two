

// names // ['Dave Mathews']
//
var Band = function (name) {
  this.name = name;
}
var Member = function (first, last) {
  this.first = first;
  this.last = last;
}

// band.prototy.addMember = function (member) {
//   return member
// }

Band.prototype.memberNames = function (member) {

  return members;
}

var band = new Band;
member = new Member({first: 'Dave', last: 'Mathews'})
// band.addMember(member)
var names = band.memberNames()

console.log(band.memberNames());
