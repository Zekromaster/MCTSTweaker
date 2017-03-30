"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createFile(name, content) {
    var fs = require('fs');
    fs.writeFileSync(name, content);
}
var recipeList = [];
var ItemStack = (function () {
    function ItemStack(content, quantity, data) {
        this.content = content;
        this.quantity = quantity;
        this.data = data;
    }
    ItemStack.prototype.getContent = function () {
        return this.content;
    };
    ItemStack.prototype.getQuantity = function () {
        return this.quantity;
    };
    ItemStack.prototype.getData = function () {
        return this.data;
    };
    ItemStack.prototype.setContent = function (a) {
        this.content = a;
    };
    ItemStack.prototype.setQuantity = function (a) {
        this.quantity = a;
    };
    ItemStack.prototype.setData = function (a) {
        this.data = a;
    };
    ItemStack.prototype.json = function (item, count, data) {
        var ret = {};
        if (item) {
            ret['item'] = this.content;
        }
        if (count) {
            ret['count'] = this.quantity;
        }
        if (data && this.data != null) {
            ret['data'] = this.data;
        }
        return ret;
    };
    return ItemStack;
}());
exports.ItemStack = ItemStack;
var ShapelessRecipe = (function () {
    function ShapelessRecipe(output, input) {
        this.input = input;
        this.output = output;
    }
    ShapelessRecipe.prototype.getInput = function () {
        return this.input;
    };
    ShapelessRecipe.prototype.getOutput = function () {
        return this.output;
    };
    ShapelessRecipe.prototype.register = function () {
        recipeList.push(this);
    };
    ShapelessRecipe.prototype.nameFromStack = function (s, inp) {
        if (inp) {
            return s.getContent().replace(":", "_");
        }
        else {
            return s.getQuantity() + "_" + s.getContent().replace(":", "-");
        }
    };
    ShapelessRecipe.prototype.getName = function () {
        var nameofthis = "";
        for (var _i = 0, _a = this.getInput(); _i < _a.length; _i++) {
            var element = _a[_i];
            nameofthis = nameofthis + this.nameFromStack(element, true) + "_";
        }
        nameofthis = nameofthis + "makes_" + this.nameFromStack(this.getOutput());
        return nameofthis;
    };
    ShapelessRecipe.prototype.write = function () {
        var arrInput = [];
        for (var _i = 0, _a = this.getInput(); _i < _a.length; _i++) {
            var element = _a[_i];
            arrInput.push(element.json(true, false, true));
        }
        var jsonedRecipe = { type: "crafting_shapeless", ingredients: arrInput, result: this.getOutput().json(true, true, true) };
        createFile(this.getName() + ".json", JSON.stringify(jsonedRecipe));
    };
    return ShapelessRecipe;
}());
exports.ShapelessRecipe = ShapelessRecipe;
var ShapedRecipe = (function () {
    function ShapedRecipe(name, output, pattern, input) {
        this.name = name;
        this.input = input;
        this.output = output;
        this.pattern = pattern;
    }
    ShapedRecipe.prototype.getInput = function () {
        var inpArr = [];
        for (var _i = 0, _a = this.input; _i < _a.length; _i++) {
            var element = _a[_i];
            inpArr.push(element[1]);
        }
        return inpArr;
    };
    ShapedRecipe.prototype.getRawInput = function () {
        return this.input;
    };
    ShapedRecipe.prototype.getOutput = function () {
        return this.output;
    };
    ShapedRecipe.prototype.register = function () {
        recipeList.push(this);
    };
    ShapedRecipe.prototype.getName = function () {
        return this.name;
    };
    ShapedRecipe.prototype.write = function () {
        var key = {};
        for (var _i = 0, _a = this.getRawInput(); _i < _a.length; _i++) {
            var o = _a[_i];
            key[o[0]] = o[1].json(true, false, true);
        }
        var obj = {
            type: "crafting_shaped",
            pattern: this.pattern,
            key: key,
            result: this.getOutput().json(true, true, true)
        };
        createFile(this.getName() + ".json", JSON.stringify(obj));
    };
    return ShapedRecipe;
}());
exports.ShapedRecipe = ShapedRecipe;
function push() {
    for (var _i = 0, recipeList_1 = recipeList; _i < recipeList_1.length; _i++) {
        var element = recipeList_1[_i];
        element.write();
    }
}
exports.push = push;
