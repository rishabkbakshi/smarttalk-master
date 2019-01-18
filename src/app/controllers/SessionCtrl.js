
angular.module('SmartTalk')
    .controller('SessionCtrl', SessionCtrl)

SessionCtrl.$inject = ['$scope', '$timeout']

function SessionCtrl($scope, $timeout) {

    let localRtcId = '';

    const initializeConnect = () => {
        easyRtc.setVideoDims(1280, 720);
        easyRtc.enableDebug(false);
        easyRtc.setRoomOccupantListener(convertListToButtons);
        easyRtc.easyApp("easyrtc.videoChatHd", "localVideo", ["remoteVideo"], loginSuccessHandler, loginFailureHandler);
    }

    const clearConnectionsList = () => {
        let otherClientDiv = document.getElementById('otherClients');
        while (otherClientDiv.hasChildNodes()) {
            otherClientDiv.removeChild(otherClientDiv.lastChild);
        }
    }

    const convertListToButtons = (roomName, data, isPrimary) => {
        clearConnectionsList();
        var otherClientDiv = document.getElementById('otherClients');
        for (let easyRtcid in data) {
            let button = document.createElement('button');
            button.onclick = function (easyRtcid) {
                return function () {
                    initializeCall(easyRtcid);
                };
            }(easyRtcid);

            var label = document.createTextNode(easyRtc.idToName(easyRtcid));
            button.appendChild(label);
            button.className = "callbutton";
            otherClientDiv.appendChild(button);
        }
    }


    const callSuccessHandler = () => { };

    const callFailedHandler = () => { };

    const callAcceptedHandler = (accepted, caller) => {
        if (!accepted) {
            easyRtc.showError("CALL-REJECTED", "Sorry, your call to " + easyRtc.idToName(caller) + " was rejected");
        }
    }
    const initializeCall = (remoteRtcId) => {
        easyRtc.hangupAll();
        easyRtc.call(remoteRtcId, callSuccessHandler, callFailedHandler, callAcceptedHandler);
    }


    const loginSuccessHandler = (easyRtcid) => {
        localRtcId = easyRtcid;
        document.getElementById("iam").innerHTML = "I am " + easyRtc.cleanId(easyRtcid);
    }


    const loginFailureHandler = (errorCode, message) => {
        easyRtc.showError(errorCode, message);
    }


    // Sets calls so they are automatically accepted (this is default behaviour)
    easyRtc.setAcceptChecker(function (caller, cb) {
        cb(true);
    });





    initializeConnect();





}
