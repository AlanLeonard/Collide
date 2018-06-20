/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        var video = document.querySelector('#videoStream'),
            take_photo_btn = document.querySelector('#take-photo'),
            swapCameraBtn = document.querySelector('#swapCamera'),
            image = document.querySelector('#snap'),
            cameraDirection = 'user';

        function initiate() { 
        // Get access to the camera!
            if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Not adding `{ audio: true }` since we only want video now
                if (window.stream) {
                    window.stream.getTracks().forEach(function(track) {
                      track.stop();
                    });
                }
                navigator.mediaDevices.getUserMedia({ 
                        video: {
                            advanced: [{
                                facingMode: cameraDirection
                            }] 
                        },
                        audio: false
                    }).then(function(stream) {
                    video1.srcObject = stream;
                    video1.play();
                    video2.srcObject = stream;
                    video2.play();
                    video3.srcObject = stream;
                    video3.play();
                    video4.srcObject = stream;
                    video4.play();
                    video5.srcObject = stream;
                    video5.play();
                    video6.srcObject = stream;
                    video6.play();
                });
            }
        }
        initiate();

        swapCameraBtn.addEventListener("click", function(e) {
            e.preventDefault();
            swapCamera();
        });

        take_photo_btn.addEventListener("click", function(e) {
            e.preventDefault();
            var snap = takeSnapshot();  
            console.log('snap');
            // Show image. 
            image.setAttribute('src', snap);
            image.classList.add("visible");

            // Enable delete and save buttons
            // delete_photo_btn.classList.remove("disabled");
            // download_photo_btn.classList.remove("disabled");

            // Set the href attribute of the download button to the snap url.
            // download_photo_btn.href = snap;

            // Pause video playback of stream.
            video.pause();
        });

        function swapCamera() {
            video.pause();
            if(cameraDirection === 'environment') {
                cameraDirection = 'user';
            } else {
                cameraDirection = 'environment';
            } 
            initiate();
        }

        function takeSnapshot() {
        // Here we're using a trick that involves a hidden canvas element.  
            var hidden_canvas = document.querySelector('canvas'),
            context = hidden_canvas.getContext('2d');  
            var width = video1.videoWidth,
            height = video1.videoHeight;

            if (width && height) {

                // Setup a canvas with the same dimensions as the video.
                hidden_canvas.width = width;
                hidden_canvas.height = height;

                // Make a copy of the current frame in the video on the canvas.
                context.drawImage(video1, 0, 0, width, height);

                // Turn the canvas image into a dataURL that can be used as a src for our photo.
                return hidden_canvas.toDataURL('image/png');
            }
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
