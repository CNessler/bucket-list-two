module.exports ={
  signup: function (user, pass, passTwo) {
    var errors = [];
    var empty = 'All fields must be filled';
    var same = 'Passwords must match';
    var length = 'Password must be at least four characters';
    if(user === '' || pass === '' || passTwo === ''){
      errors.push(empty)
    } else if (pass != passTwo){
      errors.push(same)
    } else if (pass.length < 5 || passTwo.length < 5){
      errors.push(length)
    }
    return errors
  },

  login: function (user, pass) {
    var errors = [];
    var empty = 'All fields must be filled';
    var same = 'Passwords must match';
    var length = 'Password must be at least four characters';
    if(user === '' || pass === ''){
      errors.push(empty)
    } else if (pass.length < 5){
      errors.push(length)
    }
    return errors
  }
}
