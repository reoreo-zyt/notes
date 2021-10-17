const { sayImport } = require('./import');

class a {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }
    getNameAndJob() {
        console.log(this.name + this.job);
    }
}

const aInstance = new a('Zhong', '前端');
aInstance.getNameAndJob();
sayImport();