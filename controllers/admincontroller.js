const admingetdoctors = async (req, res, next) => {
    
    return res.json({"admingetdoctors":"admingetdoctors"});
  };

  const admingetsingledoctor = async (req, res, next) => {
    
    return res.json({"admingetsingledoctor":"admingetsingledoctor"});
  };

  const admingetsingleuser = async (req, res, next) => {
    
    return res.json({"admingetsingleuser":"admingetsingleuser"});
  };

  const admingetusers = async (req, res, next) => {
    
    return res.json({"admingetusers":"admingetusers"});
  };


  
module.exports.admingetdoctors = admingetdoctors;
module.exports.admingetsingledoctor = admingetsingledoctor;
module.exports.admingetsingleuser = admingetsingleuser;
module.exports.admingetusers = admingetusers;

