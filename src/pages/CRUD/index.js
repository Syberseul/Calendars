import React, { useState, useEffect } from "react";

import { Div, Form, InputWrapper, Para, Input, Select, Button } from "./style";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import * as locales from "react-date-range/dist/locale";
import { DateRange } from "react-date-range";
import { addDays, parseISO } from "date-fns";

const CRUD = () => {
  const [notesArr, setNotesArr] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  const [isFinishRender, setIsFinishRender] = useState(false);

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

  useEffect(() => {
    updateSelectedNote();
  }, [notesArr]);

  const updateSelectedNote = () => {
    setTimeout(() => {
      const note = notesArr.filter((n) => n.select);
      if (note[0] && !("bond" in note[0])) note[0].bond = false;
      if (note[0] && !("amount" in note[0])) note[0].amount = "";
      if (note[0] && !("detail" in note[0])) note[0].detail = "";
      setSelectionRange([
        {
          startDate: new Date(note[0]?.startDate?.split("T")[0]),
          endDate: new Date(note[0]?.endDate?.split("T")[0]),
          key: "selection",
          color: note[0]?.color,
        },
      ]);
      console.log(note[0]);
      setSelectedNote(note[0]);
      setIsFinishRender(true);
      simulateClick();
    }, 10);
  };

  const handleSelect = (ranges) => {
    setSelectionRange([ranges]);
  };

  const simulateClick = () => {
    const monthContainers = document.getElementsByClassName("rdrMonth");
    if (monthContainers.length) {
      setTimeout(() => {
        monthContainers[0].childNodes[0].click();
      }, 20);
    }
  };

  const checkNoteValid = () => {
    return (
      selectedNote.dog &&
      new Date(selectionRange[0].startDate).toString() !=
        new Date().toString() &&
      new Date(selectionRange[0].startDate).toString() !=
        new Date(selectionRange[0].endDate).toString()
    );
  };

  const submit = (e) => {
    e.preventDefault();

    if (!selectedNote.contact) selectedNote.contact = "1";
    if (checkNoteValid()) {
      selectedNote.startDate = selectionRange[0].startDate;
      selectedNote.endDate = selectionRange[0].endDate;
      //   notesArr.push(note);

      //   window.localStorage.setItem("calendarNote", JSON.stringify(notesArr));

      const restNotes = notesArr.filter((n) => n.color != selectedNote.color);
      const newArr = [selectedNote, ...restNotes];
      window.localStorage.setItem("calendarNote", JSON.stringify(newArr));
      window.location.href = "/calendar";
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    window.location.href = "/calendar";
  };

  const Delete = (e) => {
    e.preventDefault();
    const newArr = notesArr.filter((n) => n.color != selectedNote.color);
    window.localStorage.setItem("calendarNote", JSON.stringify(newArr));
    window.location.href = "/calendar";
  };

  return (
    <>
      {isFinishRender && selectedNote && (
        <Div>
          <Form>
            <InputWrapper>
              <Para>狗狗：</Para>
              <Input
                type="text"
                placeholder="输入狗狗类型"
                value={selectedNote.dog}
                onChange={(e) => {
                  setSelectedNote({ ...selectedNote, dog: e.target.value });
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <Para>联系途径：</Para>
              <Select
                value={selectedNote.contact}
                onChange={(e) => {
                  setSelectedNote({ ...selectedNote, contact: e.target.value });
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
                value={selectedNote.detail}
                onChange={(e) => {
                  setSelectedNote({ ...selectedNote, detail: e.target.value });
                }}
              />
            </InputWrapper>

            <InputWrapper>
              <Para>已付定金：</Para>
              <input
                type="checkbox"
                checked={selectedNote.bond}
                onChange={(e) => {
                  console.log(e);
                  setSelectedNote({ ...selectedNote, bond: e.target.checked });
                }}
              />
            </InputWrapper>

            <InputWrapper>
              <Para>金额：</Para>
              <Input
                type="text"
                value={selectedNote.amount}
                onChange={(e) => {
                  setSelectedNote({ ...selectedNote, amount: e.target.value });
                }}
                disabled={selectedNote.bond == false}
              />
            </InputWrapper>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "95vw",
                justifyContent: "space-between",
              }}
            >
              {checkNoteValid() && (
                <Button onClick={(e) => submit(e)}>修改</Button>
              )}
              <Button onClick={(e) => goBack(e)}>返回</Button>
              <Button onClick={(e) => Delete(e)}>删除</Button>
            </div>

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
      )}
    </>
  );
};

export default CRUD;
