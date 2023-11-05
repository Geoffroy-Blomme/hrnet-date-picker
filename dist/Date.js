import "./Date.css";
import { useState, createElement, useRef } from "react";
import { useClickOutside } from "./UseClickOutside";
import { jsx as _jsx } from "react/jsx-runtime";
import { jsxs as _jsxs } from "react/jsx-runtime";
const DatePicker = props => {
  const {
    id,
    yearsBackWard = 60,
    yearsForward = 60
  } = props;
  const ref = useRef();
  const [datePickerIsHidden, setDatePickerIsHidden] = useState(true);
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
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [pickedYear, setPickedYear] = useState(currentYear);
  const [pickedMonth, setPickedMonth] = useState(currentMonth);
  const [pickedDay, setPickedDay] = useState(currentDay);
  const aDateIsPicked = event => {
    let dayPicked = event.target.innerText;
    let monthPicked = "" + (Number(pickedMonth) + 1);
    console.log(event.target.parentNode);
    console.log(event.target.parentNode.style);
    if (monthPicked.length === 1) {
      monthPicked = "0" + monthPicked;
    }
    if (dayPicked.length === 1) {
      dayPicked = "0" + dayPicked;
    }
    setPickedDay(dayPicked);
    setDatePickerIsHiddenToTrue();
    const input = document.querySelector(`#${id}`);
    input.value = "" + monthPicked + "/" + dayPicked + "/" + pickedYear;
  };
  const inputKeyUpHandler = event => {
    if (event.keyCode === 8) {
      if (event.target.value.length === 2 || event.target.value.length === 5) {
        event.target.value = event.target.value.slice(0, event.target.value.length - 1);
      }
    } else {
      if (event.target.value.length === 2 || event.target.value.length === 5) {
        event.target.value = event.target.value + "/";
      }
    }
  };
  const dateIsCorrect = dateStr => {
    if (dateStr.length === 10) {
      return !isNaN(new Date(dateStr));
    } else {
      return false;
    }
  };
  const onBlurHandler = event => {
    let datePicker = document.querySelector("#date-picker-main-div");
    if (!datePicker.contains(event.relatedTarget)) {
      if (dateIsCorrect(event.target.value)) {
        setPickedMonth(Number(event.target.value.slice(0, 2)) - 1);
        setPickedDay(event.target.value.slice(3, 5));
        setPickedYear(event.target.value.slice(6, 10));
      } else {
        if (event.target.value !== "") {
          setPickedDay(currentDay);
          setPickedMonth(currentMonth);
          setPickedYear(currentYear);
          event.target.value = "" + "" + (Number(currentMonth) + 1) + "/" + currentDay + "/" + currentYear;
        }
      }
    }
  };
  const inputChangedHandler = event => {
    if (event.target.value.length === 11) {
      event.target.value = event.target.value.slice(0, event.target.value.length - 1);
    }
  };
  const toggleYearMenu = () => {
    if (yearMenuIsOpen) {
      setYearMenuIsOpen(false);
    } else {
      setYearMenuIsOpen(true);
    }
    setMonthMenuIsOpen(false);
  };
  const toggleMonthMenu = () => {
    if (monthMenuIsOpen) {
      setMonthMenuIsOpen(false);
    } else {
      setMonthMenuIsOpen(true);
    }
    setYearMenuIsOpen(false);
  };
  function GenerateDays(props) {
    const {
      year,
      month
    } = props;
    const nbDaysInMonth = new Date(year, month + 1, 0).getDate();
    let rows = [];
    for (let i = 0; i * 7 < nbDaysInMonth; i++) {
      let tds = [];
      for (let t = 1; t < 8 && i * 7 + t <= nbDaysInMonth; t++) {
        let innerText = `${i * 7 + t}`;
        let currentDateClass = year === currentYear && month === currentMonth && i * 7 + t === currentDay ? "xdsoft_today" : "";
        let classToAdd = currentDateClass;
        let div = /*#__PURE__*/createElement("div", {
          onClick: aDateIsPicked,
          key: innerText,
          "year-value": year,
          "month-value": month,
          "day-value": innerText,
          tabIndex: innerText
        }, innerText);
        let td = /*#__PURE__*/createElement("td", {
          children: div,
          key: innerText,
          className: classToAdd
        });
        tds.push(td);
      }
      let row = /*#__PURE__*/createElement("tr", {
        children: tds,
        key: i
      });
      rows.push(row);
    }
    const tBody = /*#__PURE__*/createElement("tbody", {
      children: rows
    });
    return tBody;
  }
  function MonthsScroll() {
    let divMonths = [];
    monthNames.forEach((month, index) => {
      const divYear = /*#__PURE__*/createElement("div", {
        className: "xdsoft_option",
        "data-value": index,
        onClick: () => {
          setPickedMonth(monthNames.indexOf(month));
        },
        key: index
      }, month);
      divMonths.push(divYear);
    });
    const divToReturn = /*#__PURE__*/createElement("div", {
      children: divMonths
    });
    return divToReturn;
  }
  function YearsScroll() {
    let divYears = [];
    for (let i = 0; i <= yearsBackWard + yearsForward; i++) {
      const year = currentYear - yearsBackWard + i;
      const divYear = /*#__PURE__*/createElement("div", {
        className: "xdsoft_option",
        "data-value": year.toString(),
        key: i,
        onClick: () => {
          setPickedYear(year);
        }
      }, year.toString());
      divYears.push(divYear);
    }
    const divToReturn = /*#__PURE__*/createElement("div", {
      style: {
        marginTop: "0px"
      },
      children: divYears
    });
    return divToReturn;
  }
  YearsScroll();
  return /*#__PURE__*/_jsxs("div", {
    id: "date-picker-main-div",
    onBlur: onBlurHandler,
    children: [/*#__PURE__*/_jsx("input", {
      onFocus: setDatePickerIsHiddenToFalse,
      onKeyUp: inputKeyUpHandler,
      onChange: inputChangedHandler,
      id: id,
      type: "text",
      placeholder: "mm/dd/yyyy"
    }), /*#__PURE__*/_jsx("div", {
      ref: ref,
      className: "xdsoft_datetimepicker xdsoft_noselect xdsoft_",
      style: {
        position: "absolute",
        display: datePickerIsHidden ? "none" : "block"
      },
      children: /*#__PURE__*/_jsxs("div", {
        className: "xdsoft_datepicker active",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "xdsoft_monthpicker",
          children: [/*#__PURE__*/_jsx("button", {
            type: "button",
            className: "xdsoft_prev",
            style: {
              visibility: "visible"
            },
            onClick: () => {
              if (pickedMonth !== 0) {
                setPickedMonth(pickedMonth - 1);
              } else {
                if (pickedYear !== currentYear - yearsBackWard) {
                  setPickedYear(Number(pickedYear) - 1);
                  setPickedMonth(11);
                }
              }
            }
          }), /*#__PURE__*/_jsx("button", {
            type: "button",
            className: "xdsoft_today_button",
            style: {
              visibility: "visible"
            },
            onClick: () => {
              setPickedDay(currentDay);
              setPickedMonth(currentMonth);
              setPickedYear(currentYear);
            }
          }), /*#__PURE__*/_jsxs("div", {
            className: "xdsoft_label xdsoft_month",
            children: [/*#__PURE__*/_jsx("span", {
              onClick: toggleMonthMenu,
              children: monthNames[pickedMonth]
            }), /*#__PURE__*/_jsx("div", {
              className: "xdsoft_select xdsoft_monthselect xdsoft_scroller_box",
              style: {
                display: monthMenuIsOpen ? "block" : "none",
                overflowY: "auto"
              },
              onClick: toggleMonthMenu,
              children: /*#__PURE__*/_jsx(MonthsScroll, {})
            }), /*#__PURE__*/_jsx("i", {
              onClick: toggleMonthMenu
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "xdsoft_label xdsoft_year",
            children: [/*#__PURE__*/_jsx("span", {
              onClick: toggleYearMenu,
              children: pickedYear
            }), /*#__PURE__*/_jsx("div", {
              onClick: toggleYearMenu,
              className: "xdsoft_select xdsoft_yearselect xdsoft_scroller_box",
              style: {
                display: yearMenuIsOpen ? "block" : "none",
                overflowY: "auto"
              },
              children: /*#__PURE__*/_jsx(YearsScroll, {})
            }), /*#__PURE__*/_jsx("i", {
              onClick: toggleYearMenu
            })]
          }), /*#__PURE__*/_jsx("button", {
            type: "button",
            className: "xdsoft_next",
            style: {
              visibility: "visible"
            },
            onClick: () => {
              if (pickedMonth !== 11) {
                setPickedMonth(pickedMonth + 1);
              } else {
                console.log(currentYear + " " + "picked");
                if (pickedYear !== currentYear + yearsForward) {
                  setPickedYear(Number(pickedYear) + 1);
                  setPickedMonth(0);
                }
              }
            }
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "xdsoft_calendar",
          children: /*#__PURE__*/_jsx("table", {
            children: /*#__PURE__*/_jsx(GenerateDays, {
              year: pickedYear,
              month: pickedMonth
            })
          })
        }), /*#__PURE__*/_jsx("button", {
          type: "button",
          className: "xdsoft_save_selected blue-gradient-button",
          style: {
            display: "none"
          },
          children: "Save Selected"
        })]
      })
    })]
  });
};
export default DatePicker;