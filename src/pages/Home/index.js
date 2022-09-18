import React, { useState, useEffect } from "react";

import Header from "../../components/Header";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";

import { Div, Form, InputWrapper, Para, Input, Select, Button } from "./style";

const Home = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [note, setNote] = useState({ dog: "", bond: false, amount: "" });

  const [locale, setLocale] = useState("zhCN");
  const [selectionRange, setSelectionRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  useEffect(() => {
    const arr = JSON.parse(window.localStorage.getItem("calendarNote"));
    if (arr?.length) setNotesArr(arr);
  }, []);

  const submit = (e) => {
    e.preventDefault();

    if (!note.contact) note.contact = "1";
    if (checkNoteValid()) {
      note.startDate = selectionRange[0].startDate;
      note.endDate = selectionRange[0].endDate;
      generateHexColor();
      notesArr.push(note);
      setNote({ dog: "", contact: "1", bond: false, amount: "" });
      setSelectionRange([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
      ]);

      window.localStorage.setItem("calendarNote", JSON.stringify(notesArr));
    }
  };

  const checkNoteValid = () => {
    return (
      note.dog &&
      new Date(selectionRange[0].startDate).toString() !=
        new Date().toString() &&
      new Date(selectionRange[0].startDate).toString() !=
        new Date(selectionRange[0].endDate).toString()
    );
  };

  const handleSelect = (ranges) => {
    setSelectionRange([ranges]);
  };

  const generateHexColor = () => {
    const hexColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    note.color = hexColor;
    note.textColor = generateTextColor(hexColor);
  };

  const generateTextColor = (hex, bw) => {
    if (hex.indexOf("#") === 0) {
      hex = hex.slice(1);
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
      throw new Error("Invalid HEX color.");
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
      return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000000" : "#FFFFFF";
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
  };

  const padZero = (str, len) => {
    len = len || 2;
    var zeros = new Array(len).join("0");
    return (zeros + str).slice(-len);
  };

  return (
    <>
      <Header isCreate={true} />
      <Div>
        <Form>
          <InputWrapper>
            <Para>狗狗：</Para>
            <Input
              type="text"
              placeholder="输入狗狗类型"
              value={note.dog}
              onChange={(e) => {
                setNote({ ...note, dog: e.target.value });
              }}
            />
          </InputWrapper>
          <InputWrapper>
            <Para>联系途径：</Para>
            <Select
              value={note.contact}
              defaultValue="1"
              onChange={(e) => {
                setNote({ ...note, contact: e.target.value });
              }}
            >
              <option value="1">微信</option>
              <option value="2">小红书</option>
              <option value="3">短信</option>
              <option value="4">电话</option>
              <option value="5">找宇航</option>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <Para>联系方式：</Para>
            <Input
              type="text"
              placeholder="输入任一联系方式"
              value={note.detail}
              onChange={(e) => {
                setNote({ ...note, detail: e.target.value });
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Para>已付定金：</Para>
            <input
              type="checkbox"
              checked={note.bond}
              onChange={(e) => {
                setNote({ ...note, bond: e.target.checked });
              }}
            />
          </InputWrapper>

          <InputWrapper>
            <Para>金额：</Para>
            <Input
              type="text"
              value={note.amount}
              onChange={(e) => {
                setNote({ ...note, amount: e.target.value });
              }}
              disabled={note.bond == false}
            />
          </InputWrapper>

          {checkNoteValid() && <Button onClick={(e) => submit(e)}>提交</Button>}

          <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <DateRange
              onChange={(item) => handleSelect(item.selection)}
              ranges={selectionRange}
              locale={locales["zhCN"]}
              minDate={addDays(new Date(), 1)}
              maxDate={addDays(new Date(), 360)}
              direction="vertical"
              scroll={{ enabled: true }}
              months={12}
              showDateDisplay={false}
            />
          </div>
        </Form>
      </Div>
    </>
  );
};

export default Home;
