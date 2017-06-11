var ReactDOM = require('react-dom')
var render = ReactDOM.render

// basic
;(function (node) {
    if (!node) {return}
    require(['./basic.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__basic_node'))

// allow-file-type
;(function (node) {
    if (!node) {return}
    require(['./limit.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__limit_node'))

// ie8
;(function (node) {
    if (!node) {return}
    require(['./ie8.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__ie8_node'))

// custom-style
;(function (node) {
    if (!node) {return}
    require(['./custom-style.demo.js'], function (Demo) {
        Demo = Demo.default || Demo
        render(<Demo />, node)
    })
})(document.getElementById('example__custom-style_node'))
