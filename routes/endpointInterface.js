			var mongo = require('mongodb');
		    var config = require('../config');
		    var maxcount = 10;

			var dbCount;

			var Server = mongo.Server,
			    Db = mongo.Db,
			    BSON = mongo.BSONPure;
				ObjectID = mongo.ObjectID;

			var server = new Server(config.mongodb.host, config.mongodb.port, {auto_reconnect: true});
			db = new Db('fashion', server);

			db.open(function(err, db) {
			    if(!err) {
			        console.log("Connected to 'fashion' database");
			        db.collection('fashion', {strict:true}, function(err, collection) {
			            if (err) {
			                console.log("The 'fashion' not created...");
			               populateDB();
			            }
			        });
			    }
			});

			exports.findBykey = function(req, res) {
			    var id = req.params.id;
			    // console.log('Retrieving endpoint: ' + id);
			     findAndUpdateOrInsert(id,req,res);
			    
			}

			exports.findAll = function(req, res) {
			    db.collection('fashion', function(err, collection) {
			        collection.find().toArray(function(err, items) {
			            res.send(items);
			        });
			    });
			};

			exports.addEndPoint = function(req, res) {
			     var end = req.body;
			    // console.log('Adding End Point: ' + JSON.stringify(req.body));
			     findAndUpdateOrInsert(end.key,req,res);
			}

			exports.updateEndPoint = function(req, res) {
			     var end = req.body;
			   //  console.log('Updating End Point: ' + JSON.stringify(end));
			     findAndUpdateOrInsert(end.key,req,res);
			}

			exports.deleteEndPoint = function(req, res) {
			    var key = req.params.id;
			   // console.log('Deleting Data by Key: ' + key);
			    db.collection('fashion', function(err, collection) {
			        collection.remove({'key':key}, {safe:true}, function(err, result) {
			            if (err) {
			                res.send({'error':'An error has occurred - ' + err});
			            } else {
			               // console.log('' + result + ' document(s) deleted');
			                res.send(req.body);
			            }
			        });
			    });
			}

			exports.deleteAllEndPoint = function(req, res) {
			    db.collection('fashion', function(err, collection) {
			        collection.remove({}, function(err, result) {
			            if (err) {
			                res.send({'error':'An error has occurred - ' + err});
			            } else {
			               // console.log('' + result + ' document(s) deleted');
			                res.send(req.body);
			            }
			        });
			    });
			}

			/*--------------------------------------------------------------------------------------------------------------------*/
			// Populate database with sample data -- Only used once: the first time the application is started.
			// You'd typically not find this code in a real-life app, since the database would already exist.


			

				var insertdata = function(key,req,res){
					var end = 
				    {
				        "key": key,
				        "name": Math.random().toString(36).substring(2, 15),
				        "time": new Date()
				    };

				    db.collection('fashion', function(err, collection){
				    	collection.count(function(err, count) {
			          		dbCount = count;
			         		// console.log("There are " + count + " records.");
			          		if(dbCount > maxcount) {
					  		//delete the record the old one first

					  db.collection('fashion', function(err, collection){
				    		collection.findOneAndDelete({},{ sort : { "time": -1 } });
			      
					    });	
						}

				        });
					});	

					db.collection('fashion', function(err, collection) {
				        collection.insert(end, {safe:true}, function(err, result) {
				            if (err) {
				               // res.send({'error':'An error has occurred'});
				            } else {
				               // console.log('Success: ' + JSON.stringify(result.ops));
				                res.send(JSON.stringify(result.ops));
				                //return result;
				            }
				        });
				    }); 

				};

			var upadtedata = function(key) {

				db.collection('fashion', function(err, collection) {
					collection.update({key: key},
			    {
			        $set: {
			            "time": new Date()
			        }
			    },
			    {upsert:true})

				})

			};


			// API to create data if not present in data base else update the time stamp.

			var findAndUpdateOrInsert = function(key,req,res){

			db.collection('fashion', function(err, collection) {
		            collection.findOne({'key':key}, function(err, item) {
		           // console.log('Success: ' + JSON.stringify(item));
			           if(item == null) {
			           console.log('Cache miss');
			            insertdata(key,req,res);
			           } else {
			            console.log('Cache hit');
						upadtedata(key);
			            res.send(item);
			           }
			           
			        });
			    });
		   
			};



			// API to create intial dummy data and making index for TTL.

			var populateDB = function() {
				var end = 
			    {
			        "key": "key",
			        "name": Math.random().toString(36).substring(2, 15),
			        "time": new Date()
			    };


		    db.collection('fashion', function(err, collection) {
		    	collection.ensureIndex( { "time": 1 }, { expireAfterSeconds: 60*20 } );
		        collection.insert(end, {safe:true}, function(err, result) {});
		    });

		   
		};
