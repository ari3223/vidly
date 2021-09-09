const config = require("config");

module.exports = function(){
    if(!config.get('jwtpaskey')){
        throw new Error("FATAL ERROR: jwtpaskey is not defined.")
        
    }
}