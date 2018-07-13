class Foo {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}

class Dir {
    files: Foo[];
    subDirs: Dir[];

    constructor() {
        this.files = [];
        this.subDirs = [];
    }

    addFile(file: Foo) {
        this.files.push(file);
    }

    addSubDir(subDir: Dir) {
        this.subDirs.push(subDir);
    }
}
