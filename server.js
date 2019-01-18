const express = require('express');
const http = require('http');
const https = require('https');
const cors = require('cors');

const socketIo = require('socket.io');
const easyrtc = require('easyrtc');
const rtcCtrl = require('./controllers/rtcCtrl');
easyrtc.setOption("logLevel", "debug");


const app = express();
const PORT = process.env.PORT || 4009;

app.use(express.static('src'));
const staticServer = http.createServer(app);
const socketServer = socketIo.listen(staticServer,{"logLevel": 1});

// EasyRTC listeners
const rtcServer = easyrtc.listen(app, socketServer, null, rtcCtrl.serverStartHandler)
easyrtc.events.on("easyrtcAuth", rtcCtrl.authenticateRtc);
easyrtc.events.on("roomJoin", rtcCtrl.joinRoomHandler);


staticServer.listen(PORT, () => { console.log(`Server active on http://localhost:${PORT}/`); });
