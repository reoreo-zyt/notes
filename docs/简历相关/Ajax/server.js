const express = require("express");
const app = express();

app.get('/server', (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应体
    response.send();
});

app.post('/server', (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应体
    response.send("Hello Ajax Post");
});

app.all('/json-server', (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 响应数据
    const data = {
        name: "Zhong"
    }
    // 设置响应体
    response.send(JSON.stringify(data));
});

// ie缓存
app.get("/ie", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置响应体
    response.send("Hello IE");
})

// 延时响应
app.get("/delay", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    setTimeout(() => {
        // 设置响应体
        response.send("延时3秒响应");
    }, 3000)
})

// jQuery 服务
app.all("/jQuery-server", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    const data = {
        name: "Zhong"
    }
    // 设置响应体
    response.send(JSON.stringify(data));
})

// axios 服务
app.all("/axios-server", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置允许添加响应头
    response.setHeader("Access-Control-Allow-Headers","*");
    const data = {
        name: "Zhong"
    }
    // 设置响应体
    response.send(JSON.stringify(data));
})

// fetch 服务
app.all("/fetch-server", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置允许添加响应头
    response.setHeader("Access-Control-Allow-Headers","*");
    const data = {
        name: "Zhong"
    }
    // 设置响应体
    response.send(JSON.stringify(data));
})

// 检测用户名是否存在
app.all("/check-username", (request, response) => {
    // 设置响应头以允许跨域 
    response.setHeader("Access-Control-Allow-Origin", "*");
    // 设置允许添加响应头
    response.setHeader("Access-Control-Allow-Headers","*");
    const data = {
        exist:1,
        msg:"用户名已经存在"
    };
    // 设置响应体
    let str = JSON.stringify(data);
    // 返回结果
    response.end(`handle(${str})`);
})

app.listen(8000, () => {
    console.log("服务已启动 8000端口...");
})