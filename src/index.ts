type FormatCategory = 'year' | 'month' | 'weekday' | 'day' | 'hour' | 'minute' | 'second' | 'ms' | 'AM/PM' | 'zone' | 'offset'
type FormatObject = {type: FormatCategory, value: string}
type FormatItem = string | FormatObject
type FormatDateItem = (string | ((date: Date) => string))

export default class SVZDate {
	__date: Date
	formatArr?: FormatDateItem[]
	formatString?: string
	locale?: Intl.Locale

	constructor(time: Date | number | string = new Date()){
		this.__date = new Date(time);
	}

	set value(entry: Date | number | string){
		this.__date = new Date(entry);
	}

	toString () {
		if (!this.formatArr){
			return this.__date.toString()
		}
		return this.formatArr.reduce((str: string, current: FormatDateItem) => {
			return typeof current === 'string'
			? str.concat(current)
			: str.concat( current(this.__date) )
		}, '')
	}

	valueOf() { return this.__date}

	set format(format: string) {
		this.formatString = format;
		const timeType = (val?: FormatCategory) => !!val && ['hour' , 'minute' , 'second' , 'ms' , 'AM/PM' , 'zone' , 'offset'].includes(val)
		const setLast = (arr: FormatItem[], val: FormatItem) => {
			if (typeof val === typeof arr[arr.length-1]){
				if (typeof val === 'string'){
					arr[arr.length - 1]+=val;
				}
				else {
					const last = arr[arr.length - 1]
					if ( typeof last === 'object' && last.value.includes(val.value)){
						(arr[arr.length-1] as FormatObject).value +=  val.value
					}
				}
				return arr;
			}
			return arr.concat(val)
		}
		const formatter = (formatString: string): FormatItem[] => {
			const obj = formatString.split('').reduce((formatArr: FormatItem[], value: string) => {
				const lastItem = formatArr[formatArr.length - 1];
				switch(value){
					case 'Y':
					case 'y':
						return setLast(formatArr, {type: 'year', value})
					case 'm':
					case 'M':
						return setLast(formatArr, {type: 'month', value})
					case 'W':
					case 'w':
						return setLast(formatArr, {type: 'weekday', value})
					case 'd':
					case 'D':
						return setLast(formatArr, {type: 'day', value})
					case 'h':
					case 'H':
						return setLast(formatArr, {type: 'hour', value})
					case 'Z':
					case 'z':
						return setLast(formatArr, {type: 'zone', value})
					case 's':
					case 'S':
						if (lastItem === ':' && (formatArr[formatArr.length-1] as FormatObject).type === 'month'){
							(formatArr[formatArr.length - 1] as FormatObject).type = 'minute'
						}
						return setLast(formatArr, {type: 'second', value})
					case 'o':
					case 'O':
						return setLast(formatArr, {type: 'offset', value})
					case '0':
						return setLast(formatArr, {type: 'ms', value})
					default:
						return setLast(formatArr, value)
				}
			}, [])
			return obj.map((value, i) => {
				const check = (next: FormatItem | undefined, after: FormatObject | undefined): boolean => typeof next === 'object'
					? timeType(next.type)
					: next?.length === 1 && timeType(after?.type)
				if (typeof value === 'object' && value.type === 'month'){
					if (value.value.length < 3 && ![[obj[i-1], obj[i-2]], [obj[i+1],obj[i+2]]].some(val => check(val[0], val[1] as FormatObject))){
						value.type = 'minute'
					}
					else {
						value.value = value.value.toLowerCase()
					}
				}
				return value;
			})
		}
		const formatFromDate = (formatOptions: Intl.DateTimeFormatOptions): ((date?: Date) => string) => {
			return (date = this.__date) => date.toLocaleString(this.locale, formatOptions)
		}
		const mser = (date: Date, digits: number): string => {
			let ms = String(date.getMilliseconds())
			ms = `${Array(4 - ms.length).fill('0').join('')}${ms}`
			return ms.substring(0, digits)
		}
		const zoner = (date: Date, timeZoneName: Intl.DateTimeFormatOptions["timeZoneName"]): string => {
			let time = formatFromDate({timeZoneName})(date)
			return time.substring((time.match(/(AM|PM)/)?.index || 0) + 3)
		}
		const formats: {
			'AM/PM': {
				[Case in 'A' | 'a']: (date?: Date) => string
			}
		} & { 
			[CaseSensitive in 'month' | 'hour' | 'zone']: {
				[value: string]: {
					[number: number]: (date?: Date) => string
				}
			}
		} & {
			[CaseInsensitive in 'year' | 'day' | 'minute' | 'second' | 'ms' | 'offset' | 'weekday']: {
				[number: number]: (date?: Date) => string
			}} = {
			year: {
				2: formatFromDate({year: '2-digit'}),
				4: formatFromDate({year: 'numeric'})
			},
			month: {
				'm': {
					1: formatFromDate({month: 'numeric'}),
					2: formatFromDate({month: '2-digit'})
				},
				'M': {
					1: formatFromDate({month: 'narrow'}),
					2: formatFromDate({month: 'short'}),
					3: formatFromDate({month: 'long'}),
				}
			},
			day: {
				1: formatFromDate({day: 'numeric'}),
				2: formatFromDate({day: '2-digit'})
			},
			hour: {
				'H': {
					1: formatFromDate({hour12: false, hour: 'numeric'}),
					2: formatFromDate({hour12: false, hour: '2-digit'})
				},
				'h': {
					1: (date = this.__date) => { 
						const time = formatFromDate({hour12: true, hour: 'numeric'})(date)
						return time.substring(0, time.indexOf(' '))
					},
					2: (date = this.__date) => { 
						const time = formatFromDate({hour12: true, hour: '2-digit'})(date)
						return time.substring(0, time.indexOf(' '))
					},
				}
			},
			minute: {
				1: formatFromDate({minute: 'numeric'}),
				2: formatFromDate({minute: '2-digit'})
			},
			second: {
				1: formatFromDate({second: 'numeric'}),
				2: formatFromDate({second: '2-digit'})
			},
			ms: {
				1: (date = this.__date) => mser(date, 1),
				2: (date = this.__date) => mser(date, 2),
				3: (date = this.__date) => mser(date, 3),
				4: (date = this.__date) => mser(date, 4),
			},
			weekday: {
				1: formatFromDate({weekday: 'narrow'}),
				2: formatFromDate({weekday: 'short'}),
				3: formatFromDate({weekday: 'long'})
			},
			zone: {
				'z': {
					1: (date = this.__date) => zoner(date, 'shortGeneric'),
					2: (date = this.__date) => zoner(date, 'longGeneric')
				},
				'Z': {
					1: (date = this.__date) => zoner(date, 'short'),
					2: (date = this.__date) => zoner(date, 'long')
				}
			},
			offset: {
				1: (date = this.__date) => zoner(date, 'shortOffset').substring(zoner(date, 'shortOffset').indexOf('-') + 1),
				2: (date = this.__date) => zoner(date, 'longOffset').substring(zoner(date, 'longOffset').indexOf('-') + 1)
			},
			'AM/PM': {
				'A': (date = this.__date) => {
					const time = formatFromDate({hour12: true, hour: 'numeric'})(date)
					return time.substring(time.indexOf(' ')).trim()
				},
				'a': (date = this.__date) => {
					const time = formatFromDate({hour12: true, hour: 'numeric'})(date)
					return time.substring(time.indexOf(' ')).trim().toLocaleLowerCase()
				}
			}
		}
		const basef = format.split('AM/PM').reduce((full: FormatItem[], current: string) => {
			const retval = full
			.concat(current
				.split('am/pm')
				.reduce((full: FormatItem[], current: string) => {
				return full.concat([current, {type: 'AM/PM', value: 'am/pm'}])
			}, []))
			retval.pop()
			return retval.concat({type: 'AM/PM', value: 'AM/PM'});
		},[])
		basef.pop()
		this.formatArr = basef.reduce((full: FormatItem[], current: FormatItem) => {
			return full.concat(typeof current === 'string' ? formatter(current) : current)
		},[]).map(value => {
			if (typeof value === 'string') {
				return value
			}
			switch(value.type){
				case 'AM/PM':
					return formats['AM/PM'][value.value.substring(0, 1) as 'a' | 'A']
				case 'month':
				case 'hour':
				case 'zone':
					return formats[value.type][value.value.substring(0, 1)][value.value.length]
				default:
					return formats[value.type][value.value.length]
			}
		})
	}

	/** get the distance of this.__date from the current time. */
	get fromToday(){
		let today = new Date()
		return new Date(today.getTime() + this.__date.getTime());
	}

	get valid(): SVZDate | null{
		return !!this.__date?.getDate() ? this : null
	}

	set valid(value: any){
		throw `valid is read only! ${value} cannot be applied to it.`
	}

	set fromToday(val){
		this.__date = new Date(new Date(val).getTime() + new Date().getTime())
	}

	set millisecond(milliseconds){ this.__date.setTime(milliseconds) }

	set milliseconds(milliseconds) { this.__date = new Date(milliseconds)}

	set second(seconds){ this.__date.setSeconds(seconds) }

	set seconds(seconds) { this.__date = new Date(seconds * 1000)}

	set minute(minutes: number){ this.__date.setMinutes(minutes * 60000) }

	set hour(hours: number){ this.__date.setHours(hours) }

	set hours(hours: number){ this.__date.setHours(hours * 3600000)}

	set date(days: number) { this.__date.setDate(days)}
	
	set days(days: number) {this.__date.setDate(days * 86400000)}

	set day(day: number) { day !== this.day && this.__date.setDate( this.date - this.day + day)}

	/** full total of milliseconds in this.__date from new Date(0) */
	get milliseconds(){ return Math.floor(this.__date.getTime() )}

	/** milliseconds since start of current second in this.__date */
	get millisecond(){return this.__date.getMilliseconds() }

	/** full total of seconds in this.__date from new Date(0) as an integer */
	get seconds(){ return Math.floor(this.__date.getTime() / 1000)}

	/** seconds since start of current minute in this.__date */
	get second(){ return this.__date.getSeconds() }
	
	/** full total of minutes in this.__date from new Date(0) as an integer. */
	get minutes(){ return Math.floor(this.__date.getTime() / 60000) }

	/** minutes since start of current hour in this.__date */
	get minute(){ return this.__date.getMinutes() }

	/** full total of hours in this.__date from new Date(0) as an integer. */
	get hours(){ return Math.floor(this.milliseconds/3600000) }

	/** hours since start of current day in this.__date() */
	get hour (){ return this.__date.getHours()}

	/** full total of days in this.__date from new Date(0) as an integer. */
	get days (){ return Math.floor(this.milliseconds/86400000)}

	/** days since start of current month in this.__date */
	get date () { return this.__date.getDate() }

	/** full total of months in this.__date from new Date(0) as an integer. Note that this calculates months in order, so a month's timespan varies. */
	get months() { return this.years * 12 + this.__date.getUTCMonth() }

	/** months since the start of current year in this.__date */
	get month() { return this.__date.getMonth() }

	/** years since the new Date(0) as an integer. */
	get years() { return this.__date.getUTCFullYear() - new Date(0).getUTCFullYear()}

	/** current full year for this.__date */
	get year() { return this.__date.getFullYear() }

	/** current weekday of this.__date as an integer. */
	get day () { return this.__date.getDay() }

	/** current UTC Hour for this.__date */
	get UTCHour () { return this.__date.getUTCHours()}

	/** current UTC Date for this.__date */
	get UTCDate () { return this.__date.getUTCDate() }

	/** current UTC Weekday for this.__date */
	get UTCDay() { return this.__date.getUTCDay() }

	/** current UTC Month for this.__date */
	get UTCMonth () { return this.__date.getUTCMonth()}

	/** current UTC Year for this.__date */
	get UTCYear () { return this.__date.getUTCFullYear() }

	get ISOString() { return this.__date.toISOString() }

	private roundTimeSpanDown = (span: number) => {
		return Math[span >= 0 ? 'floor' : 'ceil'](span)
	}

	millisecondsFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => {
		if (typeof inputDate === 'number'){
			inputDate = new Date(inputDate)
		}
		const span = this.roundTimeSpanDown((inputDate as Date).getTime() - this.__date.getTime())
		return absolute ? Math.abs(span) : span;
	}

	secondsFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/1000);

	minutesFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/60000)
	
	hoursFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/3600000)

	daysFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/86400000)
	
	yearsFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/31536000000)
	
	centuriesFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/3153600000000)

	milleniaFrom = (inputDate: Date | number | string = new Date(), absolute?: boolean) => this.roundTimeSpanDown(this.millisecondsFrom(inputDate, absolute)/31536000000000)
}
