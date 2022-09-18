import React, { useState, useEffect } from "react";

import Header from "../../components/Header";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { addDays, parseISO } from "date-fns";

import { Div, DateDiv, DetailDiv, Circle } from "./style";

const Calendar = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [locale, setLocale] = useState("zhCN");

  const [calendarTimes, setCalendarTimes] = useState([]);
  const [calendarColors, setCalendarColors] = useState([]);

  const [isRenderFinish, setIsRenderFinish] = useState(false);

  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem("calendarNote"));
    if (arr?.length) setNotesArr(arr);
  }, []);

  useEffect(() => {
    updateCalendarNotes();
  }, [notesArr]);

  const updateCalendarNotes = () => {
    notesArr.map((note) => (note.select = false));
    window.localStorage.setItem("calendarNote", JSON.stringify(notesArr));

    notesArr.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

    notesArr.map(({ startDate, endDate, color }) => {
      const timeObj = {
        startDate: parseISO(startDate),
        endDate: parseISO(endDate),
        key: color,
        color,
      };
      calendarTimes.push(timeObj);
    });
    setTimeout(() => {
      setIsRenderFinish(true);
      simulateClick();
    }, 0);
  };

  const simulateClick = () => {
    const monthContainers = document.getElementsByClassName("rdrMonth");
    if (monthContainers.length) {
      setTimeout(() => {
        monthContainers[0].childNodes[0].click();
      }, 10);
    }
  };

  const selectNote = (note) => {
    const selectNote = notesArr.filter((n) => n.color == note.color);
    const restNotes = notesArr.filter((n) => n.color != note.color);
    selectNote[0].select = true;
    const newArr = [...selectNote, ...restNotes];
    window.localStorage.setItem("calendarNote", JSON.stringify(newArr));
    window.location.href = "/edit";
  };

  const formatDate = (date) => {
    return date.split("T")[0];
  };

  return (
    <>
      <Header isCreate={false} />
      {isRenderFinish && (
        <Div>
          <DateDiv>
            <DateRange
              ranges={calendarTimes}
              locale={locales["zhCN"]}
              minDate={addDays(new Date(), 1)}
              maxDate={addDays(new Date(), 360)}
              direction="vertical"
              scroll={{ enabled: true }}
              months={12}
              showDateDisplay={false}
              showSelectionPreview={false}
              showPreview={false}
              onChange={() => {}}
            />
          </DateDiv>
          <DetailDiv>
            <p>具体信息：</p>
            {notesArr.map((item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => selectNote(item)}
              >
                <div
                  style={{
                    backgroundColor: item.color,
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "inline-block",
                  }}
                />
                <p style={{ marginLeft: "5px" }}>{item.dog}</p>
                <p style={{ marginLeft: "10px" }}>
                  {formatDate(item.startDate)} - {formatDate(item.endDate)}
                </p>
              </div>
            ))}
          </DetailDiv>
        </Div>
      )}
    </>
  );
};

export default Calendar;
