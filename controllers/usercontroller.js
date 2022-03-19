
const usersignup = async (req, res, next) => {
    
    return res.json({"bookDetailsArray":"usersignup"});
  };
const usersignin = async (req, res, next) => {
    
    return res.json({"bookDetailsArray":"usersignin"});
  };
const userprofileupdate = async (req, res, next) => {
    
    return res.json({"bookDetailsArray":"userprofileupdate"});
  };
  
  
module.exports.usersignup = usersignup;
module.exports.usersignin = usersignin;
module.exports.userprofileupdate = userprofileupdate;