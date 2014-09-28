//Parse related keys
var PARSE_APP = "YbqfdEMgXlQmhSwEQv8zV5oPvCTOaJtza83dVYgv";
var PARSE_JS = "QdWMbK7SfOvdwRGpNH6IOFA6nqSIZokXFjbxTMqA";

var NoteMonsters = null;



//$(document).ready(function() {
	Parse.initialize(PARSE_APP, PARSE_JS);
	Parse.User.logIn("Johnbot", "password", {
			success: function () {
				
			},
			error: function () {
				
			}
		});
	var currentUser = Parse.User.current();
	
	NoteMonsters = Parse.Object.extend("Monsters");
//});



var checkMonsters = function() {
	var query = null;
	var Monsters = Parse.Object.extend("Monsters");
		query = new Parse.Query(Monsters);
		query.withinKilometers("Location",currentUser.get("Location"),0.010);
		query.first({success:function(result) {
			return result;
		},
		error:function(user, error) {return null;}});
};

/*var checkItems = function() {
	var query = null;
	var Monsters = Parse.Object.extend("Monsters");
		query = new Parse.Query(Monsters);
		query.withinKilometers("Location",currentUser.get("Location"),0.010);
		query.first({success:function(result) {
			return result;
		},
		error:function(user, error) {return null;}});
};*/
