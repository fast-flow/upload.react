# Custom style

If you want to completely customize the style,you need a reference [lib/index.css](../lib/index.css),and using the props.className props.prefixClassName.

````css
.hhh {
    width: 100px;
    margin-left: auto;margin-right: auto;
}
.hhh-xhr {
    position: relative;
    display: block;
}
.hhh-xhr-input {
    display: none;
    position: absolute;
    top: 0;left:0;
}
.hhh-xhr-label {
    display: inline-block;
}
.hhh--themes-demo .hhh-xhr-label {
    width: 100%;height:100px;
    border-color: #aaa;
    background-color: #eee;
    color:#333;
    border: 1px solid #333;
    border-radius: 10px;
    text-align: center;
    font-size: 70px;
    box-sizing: border-box;
}
.hhh--themes-demo .hhh-xhr-label:hover {
    cursor: pointer;
    background-color: #666;
    color:#eee;
    transition: 0.2s;
}
````

<div id="example__custom-style_node" class="fast-flow-demo">loading...</div>

<!--MR-R {
    type: "pre",
    file: './custom-style.demo.js'
} -->
[./custom-style.demo.js](./custom-style.demo.js)
