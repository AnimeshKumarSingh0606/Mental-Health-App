const userproblemform = async (req, res, next) => {
    
    return res.json({"userproblemform":"userproblemform"});
  };
  const userproblemresponse = async (req, res, next) => {
    
    return res.json({"userproblemresponse":"userproblemresponse"});
  };
  const userprofileget = async (req, res, next) => {
    
    return res.json({"userprofileget":"userprofileget"});
  };
  
  module.exports.userproblemform = userproblemform;
  module.exports.userproblemresponse = userproblemresponse;
  module.exports.userprofileget = userprofileget;