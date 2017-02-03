import { Component } from "react"
import Upload from "../index"
import { shallow, mount, render } from "enzyme"

it('className', function () {
    const app = mount(<Upload className="myclass" />)
    expect(app.find('.myclass').length).toEqual(1)
})
