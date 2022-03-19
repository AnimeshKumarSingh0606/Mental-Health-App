
const userproblemform = async (req, res, next) => {
    
    return res.json({"userproblemform":"userproblemform"});
  };
  const userproblemresponse = async (req, res, next) => {
    
    return res.json({"userproblemresponse":"userproblemresponse"});
  };
  const userprofileget = async (req, res, next) => {
    
    return res.json({"userprofileget":"userprofileget"});
  };
  

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

  module.exports.userproblemform = userproblemform;
  module.exports.userproblemresponse = userproblemresponse;
  module.exports.userprofileget = userprofileget;

