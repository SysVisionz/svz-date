# svz-date

This module provides four management classes for manipulating Numbers, Objects, Cookies, and Dates in ways with multiple use cases I've employed on a number of occasions.

## Installation
To install, in terminal type

```
	npm i --save svz-date
```

then, in your project,

```
import TimeManager from 'svz-date';
```  


# SVZDate(time)
Manipulates a supplied date in a variety of ways to suit all your datetime needs!
<p>

___

## Class Variables

* **format** 
**Type: string** 
This is probably one of the best features of the SVZDate. When you supply a string setting your format, given particular parameters, the result of the toString method will be altered to reflect your new format! 
<details><summary>Formatting string specifics</summary>

YY | yy: a 2 digit date string (88) 
YYYY | yyyy: a full date string. (1988) 

M or m when directly preceded or followed by time value \( h, s, 0, z, am/pm, \): 
M | m : minutes without leading 0. 
MM | mm : 2 digit minutes. 

M or m otherwise: 
m: month without leading 0. 
mm: 2 digit months. 
M: first letter of month. 
MM: three letter month abbreviation. 
MMM: full month 

D | d: Day of month without leading 0. 
DD | dd: Day of month in two digit format. 

W | w: First letter of weekday. 
WW | ww: Three letter weekday abbreviation. 
WWW | www: full weekday as string. 

h: 12 hour style hour without leading 0. 
hh: 2 digit 12 hour style hour. 
H: 24 hour style hour without leading 0. 
HH: 2 24 hour style hour. 

S | s: seconds without leading 0. 
SS | ss: seconds in 2 digit format.  

0 | 00 | 000 | 0000: milliseconds by that number of digits.  

z: generic timezone letter abbreviation.  
zz: full generic timezone name.  
Z: timezone letter abbrevation.  
ZZ: full timezone name.  

O | o: timezone offset without leading 0.  
OO | o: timezone offset in 2 digit format.  

AM/PM : AM or PM of 12 hour time.  
am/pm : am or pm of 12 hour time.  

</details>

* **valid**  
**Read Only** 
**Type: SVZDate | null**
If the current string or number supplied is a valid date, this simply returns the SVZDate, if not it returns null.

* **fromToday**  
**Read Only**  
Returns the date an amount of time into the future from the current moment.

* **milliseconds**  
**Read Only**  
**ms:** Returns the total number of milliseconds in the time period given.  
**date:** Returns the number of milliseconds from the last second in the **Date** given.

* **seconds**  
**Read Only**  
**ms:** Returns the total number of seconds in the time period given.  
**date:** Returns the total number of seconds from the beginning of the last minute in the **Date** given.

* **minutes**  
**Read Only**  
**ms:** Returns the total number of minutes in the time period given.  
**date:** Returns the total number of minutes from the beginning of the last hour in the **Date** given.

* **hours**  
**Read Only**  
**ms:** Returns the total number of hours in the time period given.  
**date:** Returns the total number of hours from the beginning of the last day in the **Date** given.

* **days**  
**Read Only**  
**ms:** Returns the total number of days in the time period given.  
**date:** Returns the total number of days from the beginning of the last month in the **Date** given.

* **weekday**  
**Read Only**  
**ms:** Returns the full name of the weekday that the time period given would fall on, starting from 0 at 00:00 Sunday.
**date:** Returns the full name of the weekday of the **Date** given.

* **millisecond**  
**ms:** sets or returns the total time in milliseconds.  
**date:** sets or returns the total milliseconds from the last second in the **Date** given.

* **second**  
**ms:** sets or returns the total time in seconds.  
**date:** sets or returns the total seconds from the last minute in the **Date** given.

* **minute**  
**ms:** sets or returns the total time in **mm:ss** format.  
**date:** sets or returns the total time in **mm:ss** from the last minute in the **Date** given.

* **hour**  
**ms:** sets or returns the total time in **mm:ss** format.  
**date:** sets or returns the total time in **mm:ss** from the last minute in the **Date** given.

* **day**  
**ms:** sets or returns the total time in **mm:ss** format.  
**date:** sets or returns the total time in **mm:ss** from the last minute in the **Date** given.
___

</p>

## Methods

### millisecondsFrom (inputDate, absolute)
<details><summary>Gets milliseconds either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### secondsFrom (inputDate, absolute)
<details><summary>Gets seconds either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### minutesFrom (inputDate, absolute)
<details><summary>Gets minutes either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### hoursFrom (inputDate, absolute)
<details><summary>Gets hours either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### daysFrom (inputDate, absolute)
<details><summary>Gets days either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### yearsFrom (inputDate, absolute)
<details><summary>Gets years either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### centuriesFrom (inputDate, absolute)
<details><summary>Gets centuries either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### milleniaFrom (inputDate, absolute)
<details><summary>Gets millenia either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

## Author

* **Colin Brennan** - *full project* - [SysVisionz Github](https://github.com/SysVisionz), [SysVisionz NPM Modules](https://www.npmjs.com/~sysvisionz)

## Version History  
1.0.0 -  Initial Release.  

2.0.0 - Now with typescript, and a while bunch of new features!  
