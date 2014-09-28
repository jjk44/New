function calcDamage(monster, attacker) {	
	var randomness = 4/10;
	
	if (attacker==1) {
		// monster attacking person
		var DEF0 = curHat[1];
		var DEF1 = curArmor[1];
		var DEF2 = curWeapon[1];
		var ATK = monster.atk;
		var DEF = DEF0 + DEF1 + DEF2;
	} else{
		// person attacking monster
		var ATK0 = curHat[0];
		var ATK1 = curArmor[0];
		var ATK2 = curWeapon[0];
		var DEF = monster.def;
		var ATK = ATK0 + ATK1 + ATK2;
	};
	
	
	var k2 = randomness;
	var d2 = randomness;
	var k1 = 1 - k2;
	var d1 = 1 - d2;
	
	
	var DMG = k1*ATK+k2*Math.random()*ATK - (d1*DEF+d2*Math.random()*DEF);
		
	if(DMG < 0)
		DMG = 0;
		
	return Math.ceil(DMG);
}