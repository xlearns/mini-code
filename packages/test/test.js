//TreeToArray Function
function treeToArray(tree, list) {
    list = list || [];
    for (var i = 0; i < tree.length; i++) {
        if (tree[i].children) {
            treeToArray(tree[i].children, list);
        } else {
            list.push(tree[i]);
        }
    }
    return list;
}

//ArrayToTree Function
function arrayToTree(list, tree) {
    tree = tree || [];
    var tmpMap = {};
    for (var i = 0; i < list.length; i++) {
        var tmp = list[i];
        tmpMap[tmp.id] = tmp;
        tmpMap[tmp.id].children = [];
    }
    for (var i = 0; i < list.length; i++) {
        var tmp = list[i];
        if (tmp.parentId) {
            tmpMap[tmp.parentId].children.push(tmp);
        } else {
            tree.push(tmp);
        }
    }
    return tree;
}


// echarts圆饼config
var pieConfig = {
    title: {
        text: '',
        subtext: '',
        x: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

// nginx配置conf
var nginxConf = {
    "server": {
        "listen": "80",
        "server_name": "",  
        "location": { 
            "~ / ": {
                "root": "",
                "index": "index.html index.htm;", 
                "try_files $uri $uri/ /index.html $uri/index.html;"
            }
        }
    }
};

// nginx配置conf包含代理websocket


  


//threejs画个矩形


// usewebsocket function
function usewebsocket(url, callback) {
    var ws = new WebSocket(url);
    ws.onopen = function () {
        console.log("websocket open");
    };
    ws.onmessage = function (evt) {
        callback(evt.data);
    };
    ws.onclose = function () {
        console.log("websocket close");
    };
    ws.onerror = function () {
        console.log("websocket error");
    };
}


// usefetch function
function usefetch(url, callback) {
    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            callback(json);
        });
}

// http.js function
function http(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}




function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
}



// 用对象属性唯一的性质去重,且对象的键名只能是字符串或者symbol
function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        var key = JSON.stringify(Object.keys(elem));
        if (!hash[key]) {
            result.push(elem);
            hash[key] = true;
        }
    }
    return result;
}


// svg画一个三角形 html
<svg width="100" height="100">
    <polygon points="10,10 40,40 70,10" style="fill:lime;stroke:purple;stroke-width:1" />
</svg>

// svg画一个五角星 html
<svg width="100" height="100">
    <polygon points="10,10 40,40 70,10" style="fill:lime;stroke:purple;stroke-width:1" />
</svg>