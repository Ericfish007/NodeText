var mongodb = require('./db');

function User (user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
};

module.exports =User;

//储存用户数据
User.prototype.save = function(callback){
	var user={
		name:this.name,
		password:this.password,
		email:this.email
	};
	mongodb.open(function(err,db){
		if(err){
			return callback(err);
		}

		db.collection('users',function(err,collection){
			if(err){
				mongodb.close();
				return callback(err);
			}

			collection.insert(users,{
				safe:true
			},function(err,user){
				if(err){
					mongodb.close();
					return callback(err);
				}

				callback(null,user[0]);
			});
		});
	});
};