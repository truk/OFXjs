var OFXClient = require('../')
	, util = require('util');
	
describe('OFXClient', function(){
	var client;
	
	beforeEach(function(){
		client = new OFXClient();
	})
	
	describe('.loadBankConfigs()', function(){

		it('should load the configs and return true', function(done){
			client.loadBankConfigs('config/banks.json', function(ret){
				ret.success.should.be.true;
				client.getBankConfig('Chase').should.not.be.false;
				done();
			});
		})

		describe('when the config file does not exist', function(){
			it('should return false', function(done){
				client.loadBankConfigs('test/nonExistantBankConfigFile.json', function(ret){
					ret.success.should.be.false;
					ret.err.should.equal("Could not find config file test/nonExistantBankConfigFile.json");
					done();
				});
			})
		})
		
		describe('when the file exists but is the wrong format', function(){
			it('should return a useful error message', function(done){
				client.loadBankConfigs('test/bankConfigBadFormat.json', function(ret){
					ret.success.should.be.false;
					ret.err.should.equal("Error parsing the config file");
					done();
				});
			})
		})
		
	})
	
	describe('.getTransactions()', function(){
			beforeEach(function(done){
				client.loadBankConfigs('config/banks.json', function(ret){
					ret.success.should.not.be.false;
					done();
				});
			})
	
			it('should return a json object of the transactions', function(){
				client.getTransactions('Chase').should.not.be.false;
			})
	
			describe('when the bank does not exist', function(){
				it('should return false', function(){
					client.getTransactions('NOTChase').should.be.false;
				})
			})
			
			// describe('when the date range is invalid', function(){
			// 	it('should say the date range is invalid')
			// })
		})
	
})