var casper = require('casperjs').create({
    onRunComplete: function() {
		// Don't exit on complete.
	}
});

//First step is to open Facebook
casper.start("https://facebook.com/login.php", function() {
    this.fill('#login_form', { email: 'someemail', pass: 'somepass' }, true);
});

//Wait to be redirected to the Home page, and then make a screenshot
casper.thenOpen("https://facebook.com/pokes");
casper.then(function(){
    console.log("Make a screenshot and save it as AfterLogin.png");
	this.wait(6000);//Wait a bit so page loads (there are a lot of ajax calls and that is why we are waiting 6 seconds)
    this.capture('AfterLogin.png');
    while (true) {

    this.evaluate(function() {
		var auto = function(pokeAll, targetName, interval) {
			var poker = function() {
				var people = document.querySelectorAll('div[id^="poke_live_item"]');
				if (pokeAll) {
					for (var i = 0; i < people.length; i++) {
						var name = people[i].querySelectorAll('a[data-hovercard^="/ajax"]')[0].textContent;
						console.log("Poking ", name);
						var buttons = people[i].querySelectorAll('a[role^="button"]');
							for (var j = 0; j < buttons.length; j++) {
								if (buttons[j].textContent === "Poke Back")
									buttons[j].click();
							}
					};
				} else if (targetName !== "") {
					for (var i = 0; i < people.length; i++) {
						var name = people[i].querySelectorAll('a[data-hovercard^="/ajax"]')[0].textContent;
						console.log("Poking ", name);
						if (targetName === name) {
							var buttons = people[i].querySelectorAll('a[role^="button"]');
							for (var j = 0; j < buttons.length; j++) {
								if (buttons[j].textContent === "Poke Back")
									buttons[j].click();
							}
						}
					};
				}
			};
			var timer = setInterval(poker, interval);
		};

		auto(true, "", 1000);
		while (true) {};
    });
	}
});

casper.run();
