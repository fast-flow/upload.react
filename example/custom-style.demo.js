var React = require('react')
var Upload = require('upload.react').default
var App = React.createClass({
    render: function () {
        return (
            <Upload className="alert--info" >basic</Upload>
        )
    }
})
module.exports = App
