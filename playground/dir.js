var Foo = /** @class */ (function () {
    function Foo(name) {
        this.name = name;
    }
    return Foo;
}());
var Dir = /** @class */ (function () {
    function Dir() {
        this.files = [];
        this.subDirs = [];
    }
    Dir.prototype.addFile = function (file) {
        this.files.push(file);
    };
    Dir.prototype.addSubDir = function (subDir) {
        this.subDirs.push(subDir);
    };
    return Dir;
}());
