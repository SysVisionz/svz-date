absRound = (num = this.num, absolute) => absolute ? Math.abs(Math[num >= 0 ? 'floor' : 'ceil'](num)) : Math[num >= 0 ? 'floor' : 'ceil'](num);

export default class TimeManager {
	constructor(time){
		this.time = time;
	}

	trim = time => {
		while ((time.charAt(0) === '0' || time.charAt(0) === ':') && time.length > 1 && time !== '0:00'){
			time = time.substring(1);
		}
		return time;
	}

	set time(entry){
		if (entry === undefined){
			this.date = new Date();
		}
		else{
			this.typeVal = typeof entry === 'number' ? 'ms' : 'date';
			this.date = new Date(entry);
		}
	}

	get type() { return this.typeVal}

	get time(){
		return this.type === 'ms' ? this.milliseconds : this.date;
	}

	get fromToday(){
		let today = new Date()
		return today + this.date;
	}

	set fromToday(val){
		throw "SyntaxError: fromToday is a read-only variable."
	}

	set type(val){
		throw "SyntaxError: type is a read-only variable."
	}

	set millisecond(milliseconds){ this.type === 'ms' ? this.date.setTime(milliseconds) : this.date.setMilliseconds(milliseconds) }

	set second(seconds){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 1000 + 1000*seconds) : this.date.setSeconds(seconds) }

	set hour(hours){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 3600000 + 3600000*hours) : this.date.setHours(hours) }

	set minute(minutes){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 60000 + 60000*minutes) : this.date.setMinutes(minutes) }

	get milliseconds(){ return this.type === 'ms' ? this.date.getTime() : this.date.getMilliseconds() }

	get millisecond(){return this.milliseconds }

	get second(){ return this.type === 'ms' ? this.milliseconds/1000 : this.date.getSeconds()}

	get seconds(){ return this.second}
	
	get minutes(){ return this.type === 'ms' ? Math.floor(this.milliseconds/60000) : `${this.date.getMinutes()}:${this.date.getSeconds()}` }

	get minute(){ return this.type === 'ms' ? `${this.minutes}:${this.date.toTimeString().substr(5,3)}` : this.date.getSeconds()}

	get hours(){ return this.type === 'ms' ? Math.floor(this.milliseconds/3600000) : this.date.getHours()}

	get hour (){ return this.type === 'ms' ? this.hours + this.date.toTimeString().substr(2,6) : this.date.getHours()}

	get days (){ return this.type === 'ms' ? `${this.day} ${this.date.toTimeString().substr(0, 6)}` : this.date.getDay()}

	get day () { return this.type === 'ms' ? Math.floor(this.milliseconds/86400000) : this.date.getDate() }

	get weekday () { 
		switch(this.type === 'ms' ? new Date(this.date - 320400000).getDay() : this.date.getDay()){
			case 0:
				return 'Sunday';
			case 1:
				return 'Monday';
			case 2:
				return 'Tuesday';
			case 3:
				return 'Wednesday';
			case 4:
				return 'Thursday';
			case 5:
				return 'Friday';
			case 6:
				return 'Saturday';
		}
	}

	set milliseconds(val){
		throw "SyntaxError: milliseconds is read-only"
	}

	set seconds(val){
		throw "SyntaxError: seconds is read-only"
	}
	set minutes(val){
		throw "SyntaxError: seconds is read-only"
	}
	set hours(val){
		throw "SyntaxError: seconds is read-only"
	}
	set days(val){
		throw "SyntaxError: seconds is read-only"
	}
	set (val){
		throw "SyntaxError: seconds is read-only"
	}

	millisecondsFrom = (inputDate = new Date(), absolute) => {
		if (typeof inputDate === 'number'){
			inputDate = new Date(inputDate)
		}
		else if (!inputDate.getDate){
			throw "TypeError: inputDate must be a Date or Number."
		}
		else if (inputDate.getDate && this.type === 'ms'){
			throw "TypeError: Date objects cannot be used for this function while this TimeManager is ms type."
		}
		return absolute ? Math.abs(inputDate - this.date ) : inputDate - this.date;
	}

	secondsFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/1000, absolute);

	minutesFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/60000, absolute)
	
	hoursFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/3600000, absolute)

	daysFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/86400000, absolute)
	
	yearsFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/31536000000, absolute)
	
	centuriesFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/3153600000000, absolute)

	milleniaFrom = (inputDate, absolute) => absRound(this.millisecondsFrom(inputDate, absolute)/31536000000000, absolute)
}