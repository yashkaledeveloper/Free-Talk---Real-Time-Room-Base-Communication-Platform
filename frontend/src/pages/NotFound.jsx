import React from 'react'
import { useEffect } from 'react';
import socket from '../socket.js';

const NotFound = () => {
    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected:", socket.id);
        });

        socket.emit("msg","hello")

        socket.on("msg",(data) => {
            console.log(data)
        })

        return () => {
            socket.off("connect");
        };

    }, []);

    return (
        <div>NotFound</div>
    )
}

export default NotFound