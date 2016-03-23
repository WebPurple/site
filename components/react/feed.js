"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var post_1 = require("./post");
var Feed = (function (_super) {
    __extends(Feed, _super);
    function Feed(props) {
        _super.call(this, props);
        this.state = {
            postList: [{ title: "First Post", content: "Bla Bla Bla", _id: 0 }]
        };
    }
    Feed.prototype.render = function () {
        var list = this.state.postList.map(function (post) {
            return React.createElement(post_1.default, {key: post._id, title: post.title, content: post.content});
        });
        return React.createElement("div", null, list);
    };
    return Feed;
}(React.Component));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Feed;
