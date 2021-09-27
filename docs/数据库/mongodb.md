## 1. 数据库简介

### 1.1 数据库

* 数据库是按照数据结构来组织、存储、管理数据的仓库
* 我们的程序都是在内存中进行的，一旦程序运行结束或者计算机断电，程序运行中的数据都会丢失
* 因此需要将一些程序运行的数据持久化到硬盘之中，以确保数据的安全性。数据库就是数据持久化的最佳选择
*  数据库就是存储数据的仓库

### 1.2 数据库分类

* 数据库主要分两种：

  * 关系型数据库（MySql、Oracle、SQL Server）

    关系型数据库中全都是表

  * 非关系型数据库  (MongoDB、Redis)

    键值对数据库、文档数据库（MongoDB）

## 2. MongoDB简介

* MongoDB 是为快速开发互联网 Web 应用而设计的数据库系统
* MongoDB 的设计目标是极简、灵活、作为 Web 应用栈的一部分
* MongoDB 的数据模型是面向文档的，所谓文档是一种类似 JSON 的结构，简单理解 MongoDB 这个数据库存储的是各种各样的 JSON (BSON)

### 2.1 三个概念

* 数据库

  数据库是一个仓库，在仓库中可以存放集合

* 集合

  集合类似于数组，在集合中可以存放文档

* 文档

  文档数据库中的最小单位，我们存储和操作的内容都是文档

### 2.2 安装MongoDB

<https://www.mongodb.com/try/download/community>

![](/images/mongodb-2.jpg)



配置环境变量：

```bash
D:\MongoDB\Server\4.4\bin
```

> 注意：MongoDB 偶数版本为稳定版，奇数版本为开发版



输入 mongod 检测：

![](/images/mongodb-1.jpg)

> 证明环境变量无误



输入 mongod 启动服务器，启动时可以输入参数

```bash
mongod --dbpath 数据库路径 --port 端口号
```



连接数据库：

```bash
mongo
```

![](/images/mongodb-3.jpg)



MongoDB 默认开启在 27017 端口：

![](/images/mongodb-4.jpg)



将 MongoDB 设置为自动在后台启动，MongoDB 4.4 貌似已经在安装时已经设置好了自启动。



![](/images/mongodb-5.jpg)



## 3. MongoDB的基本操作

数据库、集合、文档是 MongoDB 的核心概念：

![](/images/mongodb-6.jpg)



在 MongoDB 中，数据库和集合都不需要手动创建，当我们创建文档时，如果文档所在的集合或者数据库不存在会自动创建数据库和集合。



进入 Mongo Shell ：

```bash
mongo
```

基本指令：

* `show dbs` 显示当前所有的数据库
* `use <数据库名>` 进入到指定的数据库
* `db` 表示当前所属的数据库
* `show collections` 显示当前数据库的所有集合

数据库的 CRUD 的操作：

* `db.<collection(集合名)>.insert(doc)` 向集合中插入一个文档
* `db.<collection(集合名)>.find()` 查询集合里的所有文档

![](/images/mongodb-7.jpg)



## 4. 安装图形化管理界面

<https://www.mongodbmanager.com/download-mongodb-manager-free>



## 5. 文档的相关操作

### 5.1 向数据库中插入文档

* `db.<collection>.insert()` 向集合中插入一个或者多个文档

```sql
db.stus.insert([
    {name:'张三',age:18},
    {name:'李四',age:19},
    {name:'王五',age:20}
]);
db.stus.find();
```

> 注意：当我们向集合插入文档时，如果没有给文档指定  `_id` 值，则数据库会自动为文档添加 `_id`，`ObjectId()` 可以生成一个 `_id` 值。

* `db.<collection>.insertOne()` 插入一个文档对象
* `db.<collection>.insertMany()` 插入多个文档对象

> 提供语义，与第一个方法用法一样

### 5.2 查询文档

* `db.<collection>.find()` 查询集合中所有符合条件的文档

  `find()` 接收一个对象作为条件参数

  ```sql
  db.stus.find({
        name:'张三'       
  })
  ```

* `db.<collecction>.findOne()` 用来查询符合条件的第一个文档

> 注意：find()返回的是一个数组，findOne()返回的是对象

* `db.<collection>.find().count()` 查询所有结果的数量

### 5.3 修改文档

* `db.<collection>.update(查询条件,新对象,配置选项)` 

  `update()` 默认情况下会使用新对象来替换查询到的旧对象，且只会修改一个查询到的结果；**修改操作符**参数可以修改指定的属性；

  `$set` 可以用来修改文档中指定的属性；

  `$unset`  删除指定属性

  ```sql
  db.stus.update(
      {'_id':ObjectId('609271be223f53424bff3758')},
      {
      	$set:{
          	gender:'man',
          	address:''
      	}
  	},
      {
      	/*表示匹配多个，与下面的方法一致，实际上下面的方法都可以用update实现*/
      	multi:true
      }
  );
  ```

* `db.<collection>.updateMany()` 同时修改多个符合条件的文档

* `db.<collection>.updateOne()` 修改一个符合条件的文档

* `db.<collection>.replaceOne()` 替换一个文档

### 5.4 删除文档

* `db.<collection>.remove()` 

  删除符合条件的所有文档（默认情况下删除多个）如果传空对象作为参数，则会删除全部文档

* `db.<collection>.deleteOne()`  

* `db.<collection>.deleteMany()` 

* `db.<collection>.drop()` 删除集合

* `db.dropDatabase()` 删除数据库 

```sql
db.stus.remove({name:'张三'})
```

清空集合、删除集合：

```sql
// 性能略差
db.stus.remove({});
db.stus.drop();
```

## 6. 文档间的关系

* 一对一

  在 MongoDB 中，可以通过内嵌文档的形式体现一对一的关系

*  一对多/多对一

  也可以通过内嵌文档来映射一对多的关系

* 多对多

## 7. 练习

主要是练习增删改查的内容，以及常见的查询操作等，可以到官网查看更多的参数应用。注意内嵌文档的相关内容。

## 8. Mongoose 简介

* Mongoose 可以让我们通过 node 来操作 MongoDB 的模块
* 可以为文档创建一个模式结构 （Scheme）
* 可以对模型中的对象/文档进行验证
* 数据可以通过类型转换为对象模型
* 可以使用中间件来应用业务逻辑
* 比原生驱动更容易

Mongoose 为我们提供了几个新的对象：

* Scheme
* Model
* Document



### 8.1 Model 代表数据库的集合



连接数据库创建 Model：

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
    console.log('数据库已连接');
});

// 创建 Schema （模式）对象
// 约束对象，用来定义数据的类型等
const Schema = mongoose.Schema;
const stuSchema = new Schema({
    name: String,
    age: Number,
    // 配置复杂的类型需要创建对象
    gender: {
        type: String,
        default: '女'
    },
    address: String
});

// 通过 Scheme 创建 Model
// Model 代表的是数据库里的集合，通过 Model 才能对数据库进行操作
// mongoose.model(modelName,scheme)
// modelName就是要映射的集合名 集合名会被 mongoose 自动转换为复数
const StuModel = mongoose.model('students', stuSchema);
```



有了 Model，就能进行增删改查的操作了：

> 可以在 API 文档查看具体的用法：<http://www.mongoosejs.net/docs/api.html>

* `Model.create(doc(s),[callback])` 用来创建一个或者多个文档，操作完成后调用回调函数

```sql
StuModel.create({
    name: '张三',
    age: 18,
    gender: '男',
    address: '医院'
}, {
    name:'李四',
    age:19,
    gender:'女',
    address:'校园'
}, (err) => {
    if (!err) {
        console.log('已插入');
    }
})
```

增删改查操作：

```js
const StuModel = require('./02.mongoose_connect');

// 向数据库中插入一个或者多个文档 StuModel.create(doc(s),()=>{})
// StuModel.create({
//     name: '张三',
//     age: 18,
//     gender: '男',
//     address: '医院'
// }, {
//     name:'李四',
//     age:19,
//     gender:'女',
//     address:'校园'
// }, (err) => {
//     if (!err) {
//         console.log('已插入');
//     }
// })

// 查询
// Model.find([condition查询条件],[projection投影],[options查询选项],[callback]) 返回数组
// Model.findById() 根据文档的 _id 属性查询文档 会返回具体的文档对象
// Model.findOne() 查询符合条件的第一个文档 会返回具体的文档对象
// 投影有两种方式，{name:1,_id:0} 或者 'name -id'
StuModel.find({
    name: '张三'
}, (err, docs) => {
    if (!err) {
        console.log(docs);
        console.log(docs[0].name);
    }
});
// 投影
// 'name age -_id' 表示投影 name,age，但不投影_id
StuModel.find({}, 'name age -_id', {
    // 设置跳过的数量
    skip: 3,
    // 最多显示一个
    limit:1
}, (err, docs) => {
    if (!err) {
        console.log(docs);
    }
});

StuModel.findOne({},(err,doc)=>{
    if(!err){
        console.log(doc);
        console.log(doc.name);
    }
});

StuModel.findById('6093b1a7a8feab3c7889d5c2',(err,doc)=>{
    if(!err){
        // Document 是 Model 的一个实例 
        console.log(doc);
        console.log(doc.name);
    }
})

// 修改
/**
 * Model.update(conditions,doc,[options],[callback]) 用来修改一个或者多个文档
 * conditions 查询条件
 * doc 修改后的对象
 * options 配置参数
 * callback 回调函数
 */
// Model.updateMany()
// Model.updateOne()

// 修改张三年龄为 99
// $set 可以修改指定的对象
StuModel.updateOne({name:'张三'},{$set:{age:99}},(err)=>{
    if(!err){
        console.log('修改成功');
    }
})

// 删除
// Model.remove()
// Model.deleteOne()
// Model.deleteMany()
```



### 8.2 Document 代表集合中的文档，Document 是 Model 的实例

```js
const StuModel = require('./02.mongoose_connect');
/**
 * Document 代表集合中的文档，Document 是 Model 的实例，通过 Model 查询到的结果都是 Document
 */

// 创建一个 Document
const stu = new StuModel({
    name: '张三丰',
    age:50,
    gender:'男',
    address:'全真教'
})

// 创建了实例，但是并没有插入到数据库
console.log(stu);

// document 方法
// Model#save()
stu.save((err)=>{
    if(!err){
        console.log('保存成功');
    }
});

StuModel.findOne({name:'张三丰'},(err,doc)=>{
    if(!err){
        /**
         * update()
         * remove()
         */
        doc.update({$set:{age:99}},(err)=>{
            if(!err){
                console.log("修改成功");
            }
        })
        doc.age = 999;
        doc.save();
        console.log(doc);
        // get(name) 获取文档中的属性值
        // set(name,value) 设置文档中制定的属性值
        // toJSON()
        // toObject()
    }
});
```