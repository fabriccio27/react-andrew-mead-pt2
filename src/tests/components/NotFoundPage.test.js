import React from "react";
import {shallow} from "enzyme";
import NotFoundPage from "../../components/NotFoundPage";

test("should render not found page correctly", ()=>{
    expect(shallow(<NotFoundPage />)).toMatchSnapshot();
})