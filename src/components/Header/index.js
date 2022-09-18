import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Div, ButtonWrapper, Button, SelectedButton } from "./style";

const Header = ({ isCreate }) => {
  return (
    <Div>
      <ButtonWrapper>
        {isCreate && <SelectedButton>创建</SelectedButton>}
        {!isCreate && (
          <Button>
            <Link to="/" style={{ textDecoration: "none" }}>
              创建
            </Link>
          </Button>
        )}
        {isCreate && (
          <Button>
            <Link
              to="/calendar"
              style={{ textDecoration: "none", color: "black" }}
            >
              查看
            </Link>
          </Button>
        )}
        {!isCreate && <SelectedButton>查看</SelectedButton>}
      </ButtonWrapper>
    </Div>
  );
};

export default Header;
