function makeChanges(amount, coins) {
	'use strict';
	var repo = [];

	if (amount < 0) {
		return false;
	}

	if (amount === 0) {
		return [['==>']];
	}

	for (var i = 0; i < coins.length; i++) {

		if (amount < coins[i]) {
			continue;
		}

		var t = makeChanges(amount - coins[i], coins);

		if (t) {
			for (var j = 0; j < t.length; j++) {
				repo.push((t[j]).concat(coins[i]));
			}
		}
	}
	return removeDuplicate(repo);
}

function removeDuplicate(arr) {
	var s = new Set();
	var newArr = [];
	var seq;
	for (var i = 0; i < arr.length; i++) {
		var t1 = s.size;
		seq = arr[i].slice(1);
		seq.sort(function (a, b) {
			return a - b;
		});
		s.add(seq.toString());
		var t2 = s.size;
		if (t2 > t1) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}

// var t = makeChanges(30, [5, 10, 25, 50]);
// console.log(t);

for (var j = 0; j < 100; j++) {
  var t = makeChanges(j, [1, 3, 5]);
  console.log('For number ' + j + ':\n', t);
}
