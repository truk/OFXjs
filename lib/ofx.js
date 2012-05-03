/*!
 * OFXjs
 * Copyright(c) 2012 Kurt Eldridge <kilofoxtrotecho@gmail.com>
 * MIT Licensed
 */

var OFXClient = module.exports = function OFXClient(){
	this.configs = {};
};

OFXClient.prototype = {

	loadBankConfigs: function(configFileName, callback){
		var self = this;
		var fs = require('fs');
		fs.readFile(configFileName, function(err, data){
			if (err){
				callback({"success":false,"err":"Could not find config file " + configFileName});
			}else{
				try{
					self.configs = JSON.parse(data);
					callback({"success":true});
				}catch (e){
					callback({"success":false,"err":"Error parsing the config file"});
				}
			}
		})
	},
	
	getBankConfig: function(bankName){
		if (this.configs[bankName] === void 0){
			return false;
		}
		return this.configs[bankName];
	},
	
	getTransactions: function(bankName){
		if (this.configs[bankName] === void 0){
			return false;
		}
		return "got transactions";
	}
	
};
