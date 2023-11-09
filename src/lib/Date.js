import "./Date.css";
import { useState, createElement, useRef } from "react";
import { useClickOutside } from "./UseClickOutside";
import PropTypes from "prop-types";
/**
 * @namespace datePicker

 */
/**
 * @description Generates an input which on focus has a Date Picker pop-up
 * @param {string} id The id of the generated input
 * @param {number} yearsBackWard The number of backward years that the scroller will go
 * @param {number} yearsForward The number of forward years that the scroller will go
 * @memberof datePicker
 * @returns {React.Component} - The Date Picker component
 */
const DatePicker = (props) => {
  const { id, yearsBackWard = 60, yearsForward = 60 } = props;
  const ref = useRef();
  const [datePickerIsHidden, setDatePickerIsHidden] = useState(true);
  const labelMonthId = id + "-label_month";
  const labelYearId = id + "-label_year";
  const monthSCrollerId = id + "-month_scroller";
  const yearScrollId = id + "-year_scroller";
  const setDatePickerIsHiddenToFalse = () => {
    setDatePickerIsHidden(false);
  };

  const setDatePickerIsHiddenToTrue = () => {
    setDatePickerIsHidden(true);
  };
  useClickOutside(ref, !datePickerIsHidden, setDatePickerIsHiddenToTrue);

  const [yearMenuIsOpen, setYearMenuIsOpen] = useState(false);
  const [monthMenuIsOpen, setMonthMenuIsOpen] = useState(false);

  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [pickedYear, setPickedYear] = useState(currentYear);
  const [pickedMonth, setPickedMonth] = useState(currentMonth);
  const [pickedDay, setPickedDay] = useState(currentDay);
  const [displayedMonth, setDisplayedMonth] = useState(currentMonth);
  const [displayedYear, setDisplayedYear] = useState(currentYear);

  /**
   * When a day is picked in the Date Picker, set the the picked Day/Month/Year then closes the Date Picker
   * @memberof datePicker
   */
  const aDateIsPicked = (event) => {
    let dayPicked = event.target.innerText;
    let monthPicked = "" + (Number(displayedMonth) + 1);
    let yearPicked = Number(displayedYear);
    let parentNodeClassList = event.target.parentNode.classList;
    if (parentNodeClassList.value.includes("xdsoft_other_month")) {
      if (Number(dayPicked) > 7) {
        monthPicked = "" + (Number(monthPicked) - 1);
        if (monthPicked === "0") {
          monthPicked = "12";
          yearPicked = Number(displayedYear - 1);
          setDisplayedYear(yearPicked);
          setPickedYear(yearPicked);
        }
        setDisplayedMonth(monthPicked - 1);
        setPickedMonth(monthPicked - 1);
      } else {
        monthPicked = "" + (Number(monthPicked) + 1);
        if (monthPicked === "13") {
          monthPicked = "1";
          yearPicked = Number(displayedYear + 1);
          setDisplayedYear(yearPicked);
          setPickedYear(yearPicked);

          setDisplayedMonth(monthPicked - 1);
          setPickedMonth(monthPicked - 1);
        }
      }
    }
    if (monthPicked.length === 1) {
      monthPicked = "0" + monthPicked;
    }
    if (dayPicked.length === 1) {
      dayPicked = "0" + dayPicked;
    }
    setPickedDay(Number(dayPicked));
    setPickedMonth(Number(monthPicked) - 1);
    setDisplayedMonth(Number(monthPicked) - 1);
    setPickedYear(Number(yearPicked));
    setDatePickerIsHiddenToTrue();
    const input = document.querySelector(`#${id}`);
    input.value = "" + monthPicked + "/" + dayPicked + "/" + yearPicked;
  };

  /**
   * Handles the adding/removal of the '/' in the input value.
   * @memberof datePicker
   */
  const inputKeyUpHandler = (event) => {
    if (event.keyCode === 8) {
      if (event.target.value.length === 2 || event.target.value.length === 5) {
        event.target.value = event.target.value.slice(
          0,
          event.target.value.length - 1
        );
      }
    } else {
      if (event.target.value.length === 2 || event.target.value.length === 5) {
        event.target.value = event.target.value + "/";
      }
    }
  };

  /**
   * Tests if a date is correct
   * @param {string} dateStr The date to test
   * @returns true if the string is a correct Date, false otherwise
   * @memberof datePicker
   */
  const dateIsCorrect = (dateStr) => {
    if (dateStr.length === 10) {
      return !isNaN(new Date(dateStr));
    } else {
      return false;
    }
  };

  /**
   * Verifies that the date in the input is valid
   * @memberof datePicker
   */
  const onBlurHandler = (event) => {
    let datePicker = document.querySelector("#create-employee > div > div");
    if (!datePicker.contains(event.relatedTarget)) {
      if (dateIsCorrect(event.target.value)) {
        setPickedMonth(Number(event.target.value.slice(0, 2)) - 1);
        setPickedYear(Number(event.target.value.slice(6, 10)));
      } else {
        if (event.target.value !== "") {
          setPickedDay(currentDay);
          setPickedMonth(currentMonth);
          setPickedYear(currentYear);
          event.target.value =
            "" +
            "" +
            (Number(currentMonth) + 1) +
            "/" +
            currentDay +
            "/" +
            currentYear;
        }
      }
    }
  };

  /**
   * Makes sure that the Date in the input is not too long
   * @memberof datePicker
   */
  const inputChangedHandler = (event) => {
    if (event.target.value.length === 11) {
      event.target.value = event.target.value.slice(
        0,
        event.target.value.length - 1
      );
    }
  };

  /**
   * Toggles the Year Menu
   * @memberof datePicker
   */
  const toggleYearMenu = () => {
    if (yearMenuIsOpen) {
      setYearMenuIsOpen(false);
    } else {
      setYearMenuIsOpen(true);
    }
    setMonthMenuIsOpen(false);
  };

  /**
   * Toggles the Month Menu
   * @memberof datePicker
   */
  const toggleMonthMenu = () => {
    if (monthMenuIsOpen) {
      setMonthMenuIsOpen(false);
    } else {
      setMonthMenuIsOpen(true);
    }
    setYearMenuIsOpen(false);
  };

  /**
   * Scroll to the picked Month in the month scroller
   * @memberof datePicker
   */
  const scrollToPickedMonth = () => {
    const scrollMonths = document.querySelector("#" + monthSCrollerId);
    const options = scrollMonths.querySelectorAll(".xdsoft_option");
    let offsetTop;
    options.forEach((option) => {
      if (option.getAttribute("data-value") === displayedMonth.toString()) {
        offsetTop = option.offsetTop;
      }
    });
    scrollMonths.scrollTop = offsetTop;
  };

  /**
   * Scroll to the Picked Year in the year scroller
   * @memberof datePicker
   */
  const scrollToPickedYear = () => {
    const scrollYears = document.querySelector("#" + yearScrollId);
    const options = scrollYears.querySelectorAll(".xdsoft_option");
    let offsetTop;
    options.forEach((option) => {
      if (option.getAttribute("data-value") === displayedYear.toString()) {
        offsetTop = option.offsetTop;
      }
    });
    scrollYears.scrollTop = offsetTop;
  };

  /**
   * Returns the index of the first day of the Date in the days of the Week
   * @param {number} year year of the Date
   * @param {number} month month of the Date
   * @returns The index of the first day of the Date in the days of the Week
   * @memberof datePicker
   */
  function firstDayOfDate(year, month) {
    const givenDate = new Date(year.toString(), month.toString());
    return givenDate.getDay();
  }

  /**
   * Returns the last day of the Date
   * @param {number} year year of the Date
   * @param {number} month month of the Date
   * @returns The last day of the Date
   * @memberof datePicker
   */
  function lastDayOfDate(year, month) {
    const givenDate = new Date(year.toString(), (month + 1).toString(), 0);
    return givenDate.getDate();
  }

  /**
   * Generates the thead of the Date Picker
   * @returns The jsx for the thead of the Date Picker
   * @memberof datePicker
   */
  function tableHead() {
    let daysThs = [];
    dayNames.map((day, index) => {
      let dayTh = createElement("th", { children: day, key: index });
      daysThs.push(dayTh);
    });
    let row = createElement("tr", { children: daysThs });
    let tHead = createElement("thead", { children: row, key: 0 });
    return tHead;
  }

  /**
   * Generates the calendar part of the DatePicker
   * @param {string} year The year displayed
   * @param {string} month The month displayed
   * @returns The jsx of the calendar part of the DatePicker
   * @memberof datePicker
   */
  function GenerateDays(props) {
    const { year, month } = props;
    const firstDayMonth = firstDayOfDate(year, month);
    const nbDaysInCurrentMonth = lastDayOfDate(year, month);
    let nbDaysLastMonth;
    if (month.toString() === "0") {
      nbDaysLastMonth = lastDayOfDate(year - 1, 11);
    } else {
      nbDaysLastMonth = lastDayOfDate(year, month - 1);
    }
    const nbOfDaysToGenerate =
      nbDaysInCurrentMonth +
      firstDayMonth +
      ((7 - ((nbDaysInCurrentMonth + firstDayMonth) % 7)) % 7);
    let rows = [];
    let tds = [];
    for (let i = 0; i < nbOfDaysToGenerate; i++) {
      let innerText = "";
      let classToAdd =
        year === currentYear &&
        month === currentMonth &&
        i - firstDayMonth + 1 === currentDay
          ? "xdsoft_today "
          : "";
      if (i - firstDayMonth + 1 === pickedDay) {
        classToAdd += "xdsoft_current";
      }
      if (i < firstDayMonth || i >= nbDaysInCurrentMonth + firstDayMonth) {
        classToAdd += "xdsoft_other_month";
      } else {
        innerText = i - firstDayMonth + 1;
      }
      if (i < firstDayMonth) {
        innerText = "" + nbDaysLastMonth - firstDayMonth + i + 1;
      }
      if (i >= nbDaysInCurrentMonth + firstDayMonth) {
        innerText = "" + (i - nbDaysInCurrentMonth - firstDayMonth + 1);
      }

      let div = createElement(
        "div",
        {
          onClick: aDateIsPicked,
          key: i,
          tabIndex: innerText,
        },
        innerText
      );
      let td = createElement("td", {
        children: div,
        key: i,
        className: classToAdd,
      });
      tds.push(td);
      if (tds.length === 7) {
        let row = createElement("tr", { children: tds, key: i });
        rows.push(row);
        tds = [];
      }
    }

    const tHead = tableHead();
    const tBody = createElement("tbody", { children: rows, key: 1 });
    const table = createElement("table", { children: [tHead, tBody] });
    return table;
  }

  /**
   * Generates the jsx for the displayed Month and scroller month part of the Date Picker
   * @param {number} monthProp The month that must be displayed
   * @returns the jsx for the displayed Month and scroller month part of the Date Picker
   * @memberof datePicker
   */
  function MonthsScroll(props) {
    let monthProp = props.month;
    let divMonths = [];
    monthNames.forEach((month, index) => {
      let classToAdd = "";
      if (index === monthProp) {
        classToAdd += "xdsoft_current";
      }
      const divYear = createElement(
        "div",
        {
          className: "xdsoft_option " + classToAdd,
          "data-value": index,
          onClick: () => {
            setPickedMonth(monthNames.indexOf(month));
            setDisplayedMonth(monthNames.indexOf(month));
          },
          key: index,
        },
        month
      );
      divMonths.push(divYear);
    });
    const divToReturn = createElement("div", {
      children: divMonths,
    });
    return divToReturn;
  }

  /**
   * Generates the jsx for the displayed Year and scroller year part of the Date Picker
   * @param {number} yearProp The year that must be displayed
   * @returns the jsx for the displayed year and scroller year part of the Date Picker
   * @memberof datePicker
   */
  function YearsScroll(props) {
    let yearProp = props.year;
    let divYears = [];
    for (let i = 0; i <= yearsBackWard + yearsForward; i++) {
      const year = currentYear - yearsBackWard + i;
      let classToAdd = "";
      if (typeof year !== "number") {
        console.log("weird");
      }
      if (typeof yearProp !== "number") {
        console.log("weird prop");
      }
      if (year === yearProp) {
        classToAdd += "xdsoft_current";
      }
      const divYear = createElement(
        "div",
        {
          className: "xdsoft_option " + classToAdd,
          "data-value": year.toString(),
          key: i,
          onClick: () => {
            setPickedYear(year);
            setDisplayedYear(year);
          },
        },
        year.toString()
      );
      divYears.push(divYear);
    }
    const divToReturn = createElement("div", {
      style: { marginTop: "0px" },
      children: divYears,
    });
    return divToReturn;
  }
  return (
    <div onBlur={onBlurHandler}>
      <input
        onFocus={setDatePickerIsHiddenToFalse}
        onKeyUp={inputKeyUpHandler}
        onChange={inputChangedHandler}
        id={id}
        type="text"
        placeholder="mm/dd/yyyy"
      />
      <div
        ref={ref}
        className="xdsoft_datetimepicker xdsoft_noselect xdsoft_"
        onClick={() => {
          if (monthMenuIsOpen) {
            setMonthMenuIsOpen(false);
          }
          if (yearMenuIsOpen) {
            setYearMenuIsOpen(false);
          }
        }}
        style={{
          position: "absolute",
          display: datePickerIsHidden ? "none" : "block",
        }}
      >
        <div className="xdsoft_datepicker active">
          <div className="xdsoft_monthpicker">
            <button
              type="button"
              className="xdsoft_prev"
              style={{ visibility: "visible" }}
              onClick={() => {
                if (displayedMonth !== 0) {
                  setDisplayedMonth(displayedMonth - 1);
                } else {
                  setDisplayedYear(Number(displayedYear) - 1);
                  setDisplayedMonth(11);
                }
              }}
            ></button>
            <button
              type="button"
              className="xdsoft_today_button"
              style={{ visibility: "visible" }}
              onClick={() => {
                setPickedDay(currentDay);
                setDisplayedMonth(currentMonth);
                setPickedMonth(currentMonth);
                setDisplayedYear(currentYear);
                setPickedYear(currentYear);
              }}
            ></button>
            <div className="xdsoft_label xdsoft_month" id={labelMonthId}>
              <span
                onClick={() => {
                  toggleMonthMenu();
                  scrollToPickedMonth();
                }}
              >
                {monthNames[displayedMonth]}
              </span>

              <div
                className="xdsoft_select xdsoft_monthselect xdsoft_scroller_box"
                id={monthSCrollerId}
                style={{
                  visibility: monthMenuIsOpen ? "visible" : "hidden",
                  overflowY: "auto",
                }}
                onClick={() => {
                  toggleMonthMenu();
                  scrollToPickedMonth();
                }}
              >
                <MonthsScroll month={displayedMonth}></MonthsScroll>
              </div>
              <i
                onClick={() => {
                  toggleMonthMenu();
                  scrollToPickedMonth();
                }}
              ></i>
            </div>
            <div className="xdsoft_label xdsoft_year" id={labelYearId}>
              <span
                onClick={() => {
                  toggleYearMenu();
                  scrollToPickedYear();
                }}
              >
                {displayedYear}
              </span>
              <div
                onClick={() => {
                  toggleYearMenu();
                  scrollToPickedYear();
                }}
                className="xdsoft_select xdsoft_yearselect xdsoft_scroller_box"
                id={yearScrollId}
                style={{
                  visibility: yearMenuIsOpen ? "visible" : "hidden",
                  overflowY: "auto",
                }}
              >
                <YearsScroll year={displayedYear}></YearsScroll>
              </div>
              <i
                onClick={() => {
                  toggleYearMenu();
                  scrollToPickedYear();
                }}
              ></i>
            </div>
            <button
              type="button"
              className="xdsoft_next"
              style={{ visibility: "visible" }}
              onClick={() => {
                if (displayedMonth !== 11) {
                  setDisplayedMonth(displayedMonth + 1);
                } else {
                  setDisplayedYear(Number(displayedYear) + 1);
                  setDisplayedMonth(0);
                }
              }}
            ></button>
          </div>
          <div className="xdsoft_calendar">
            <GenerateDays
              year={displayedYear}
              month={displayedMonth}
            ></GenerateDays>
          </div>
          <button
            type="button"
            className="xdsoft_save_selected blue-gradient-button"
            style={{ display: "none" }}
          >
            Save Selected
          </button>
        </div>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  yearsBackWard: PropTypes.number,
  yearsForward: PropTypes.number,
};

export default DatePicker;
