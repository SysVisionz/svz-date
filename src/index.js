export default class TimeManager {
	constructor(ms){
		this.time = ms;
	}

	trim = time => {
		while ((time.charAt(0) === '0' || time.charAt(0) === ':') && time.length > 1){
			time = time.substring(1);
		}
		return time;
	}

	set time(entry){
		if (entry === undefined){
			this.date = new Date();
		}
		else{
			this.type = typeof entry === 'number' ? 'ms' : 'date';
			this.date = new Date(entry);
		}
	}

	get fromToday(){
		let today = new Date()
		return today + this.date;
	}

	set millisecond(milliseconds){ this.type === 'ms' ? this.date.setTime(milliseconds) : this.date.setMilliseconds(milliseconds) }

	set second(seconds){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 1000 + 1000*seconds) : this.date.setSeconds(seconds) }

	set hour(hours){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 3600000 + 3600000*hours) : this.date.setHours(hours) }

	set minute(minutes){ this.type === 'ms' ? this.date.setTime(this.date.getTime() % 60000 + 60000*minutes) : this.date.setMinutes(minutes) }

	get milliseconds(){ return this.type === 'ms' ? this.date.getTime() : this.date.getMilliseconds() }

	get millisecond(){return this.milliseconds }

	get second(){ return this.type === 'ms' ? this.milliseconds/1000 : this.date.getSeconds()}

	get seconds(){ return this.second}
	
	get minutes(){ return this.type === 'ms' ? Math.floor(this.milliseconds/60000) : this.date.getSeconds()}

	get minute(){ return this.type === 'ms' ? this.minutes + this.date.toTimeString().substr(5,3) : this.date.getSeconds()}

	get hours(){ return this.type === 'ms' ? Math.floor(this.milliseconds/3600000) : this.date.getHours()}

	get hour (){ return this.type === 'ms' ? this.hours + this.date.toTimeString().substr(2,6) : this.date.getHours()}

	get day () { return this.type === 'ms' ? Math.floor(this.milliseconds/86400000) : this.date.getDate() }

	get weekday () { return this.type === 'ms' ? new Date(this.date - 320400000).getDay() : this.date.getDay()}

	millisecondsFrom = (inputDate, absolute = true) => absolute ? Math.abs(this.date - new Date(inputDate)) : this.date - new Date(inputDate);

	secondsFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/1000, 'floor', absolute);

	minutesFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/60000, 'floor', absolute)
	
	hoursFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/3600000, 'floor', absolute)

	daysFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/86400000, 'floor', absolute)
	
	yearsFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/31536000000, 'floor', absolute)
	
	centuriesFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/3153600000000, 'floor', absolute)

	milleniaFrom = (inputDate, absolute) => NumberManager.absRound(this.millisecondsFrom(inputDate, absolute)/31536000000000, 'floor', absolute)
}