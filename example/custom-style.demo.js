var React = require('react')
var Upload = require('upload.react').default
var App = React.createClass({
    render: function () {
        return (
            <Upload themes="demo" prefixClassName="hhh" >+</Upload>
        )
    }
})
module.exports = App
