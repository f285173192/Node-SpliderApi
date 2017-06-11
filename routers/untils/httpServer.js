/*
 * @Author: ecitlm 
 * @Date: 2017-06-07 16:22:29 
 * @Last Modified by: ecitlm
 * @Last Modified time: 2017-06-11 22:23:50
 */
const express = require('express')
var http = require('http')
const app = express()

/**
 * 
 * @param {string} host 域名
 * @param {string} url  路径 
 * @param {string} method 请求方式
 * @param {object} data  请求参数
 * @param {string} bool true :https ,false:http 判断是http 还是https请求
 * @returns 
 */

function httpServer(host, path, method, data, status) {
    console.log('-------------------------------------');
    console.log(data);
     if (method == 'GET') {
           var path=path+"?"+data;
        }
    var options = {
        hostname: host,
        port: 8097,
        path: path,
        method: method,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.96 Safari/537.36"
        }//伪造请求头
    };
    if (status) {
        http = require('https')
        options.port = 443
    }

    return new Promise(function (resolve, reject) {
        let body = "";
        var httpRequest = http.request(options, function (response) {
            //res.writeHead('Content-Type', 'text/html;charset=utf-8');
            response.on("data", function (chunk) {
                body += chunk;
            })

            response.on('end', () => {
                resolve(body)
            })

            response.on('error', err => {
                reject(err)
            })
        })

        if (method == 'POST') {
           // httpRequest.write(data)
           console.log(require('querystring').stringify(data))
            httpRequest.write(require('querystring').stringify(data))
        }
          
        
        httpRequest.end();
     
    })
}


module.exports = {
    httpServer
}