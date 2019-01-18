const easyrtc = require('easyrtc');

easyrtc.setOption("logLevel", "debug");

const authenticateRtc = (socket, easyrtcid, msg, socketCallback, callback) => {
    easyrtc.events.defaultListeners.easyrtcAuth(socket, easyrtcid, msg, socketCallback, function (err, connectionObj) {
        if (err || !msg.msgData || !msg.msgData.credential || !connectionObj) {
            callback(err, connectionObj);
            return;
        }

        connectionObj.setField("credential", msg.msgData.credential, { "isShared": false });

        console.log("[" + easyrtcid + "] Credential saved!", connectionObj.getFieldValueSync("credential"));

        callback(err, connectionObj);
    });
};

const joinRoomHandler = (connectionObj, roomName, roomParameter, callback) => {
    console.log("[" + connectionObj.getEasyrtcid() + "] Credential retrieved!", connectionObj.getFieldValueSync("credential"));
    easyrtc.events.defaultListeners.roomJoin(connectionObj, roomName, roomParameter, callback);
}

const serverStartHandler = (err, rtcRef) => {
    console.log("Initiated");
    rtcRef.events.on("roomCreate", roomCreateHandler);
}

const roomCreateHandler = (appObj, creatorConnectionObj, roomName, roomOptions, callback) => {
    console.log("roomCreate fired! Trying to create: " + roomName); 
    appObj.events.defaultListeners.roomCreate(appObj, creatorConnectionObj, roomName, roomOptions, callback);
};

module.exports = {
    serverStartHandler : serverStartHandler,
    authenticateRtc: authenticateRtc,
    roomCreateHandler: roomCreateHandler,
    joinRoomHandler: joinRoomHandler

}