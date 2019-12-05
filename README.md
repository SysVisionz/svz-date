# svz-time-manager

This module provides four management classes for manipulating Numbers, Objects, Cookies, and Dates in ways with multiple use cases I've employed on a number of occasions.

## Installation
To install, in terminal type

```
	npm i --save svz-time-manager
```

then, in your project,

```
import TimeManager from 'svz-time-manager';
```  


# TimeManager(time)
<details><summary>Manipulates a supplied <strong>Array</strong> or <strong>Object</strong> as needed for a variety of use cases.</summary>
<p>

___

## Class Variables
* **time**  
**Type: Date**||**Number**  
When this is set to a **Date**, that date is used for the purposes of the functions. When this is set to a **Number**, it instead uses that quantity of milliseconds as the basis for the methods.

* **type**  
**Read Only**  
Returns **date** if **time** is set to a **Date**, and returns 'ms' if it is set to a **Number** of milliseconds. Each return has a different behavior depending on which type is being used, as is clarified in the description of each **class** variable below.

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
</details>

## Methods

### millisecondsFrom (inputDate, absolute)
<details><summary>Gets milliseconds either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### secondsFrom (inputDate, absolute)
<details><summary>Gets seconds either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### minutesFrom (inputDate, absolute)
<details><summary>Gets minutes either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### hoursFrom (inputDate, absolute)
<details><summary>Gets hours either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### daysFrom (inputDate, absolute)
<details><summary>Gets days either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### yearsFrom (inputDate, absolute)
<details><summary>Gets years either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### centuriesFrom (inputDate, absolute)
<details><summary>Gets centuries either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

### milleniaFrom (inputDate, absolute)
<details><summary>Gets millenia either between the set millisecond amount or between the set date and another date.</summary>

* **inputDate**  
**Type:** **Date**||**Number**  
**Note:** **Date** objects cannot be used for this function when **this.type** is 'ms'  
This is the date that is being tested. If it is after **this.day**, the value returned is positive, and if it is before **this.time** and **absolute** is not **true**, the value returned is negative.

* **absolute**  
**Type:** **Boolean**  
If set to **true**, the value returned is a positive number, regardless of whether it is before or after the time given.</details>

## Author

* **Colin Brennan** - *full project* - [SysVisionz Github](https://github.com/SysVisionz), [SysVisionz NPM Modules](https://www.npmjs.com/~sysvisionz)

## Version History
<details><summary>1</summary>

1.0.0 -  Initial Release.
</details>