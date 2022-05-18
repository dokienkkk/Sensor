const express = require("express")

const ejs = require("ejs")

const app = new express()


//cấu hình public file
app.use(express.static('public'))

//cấu honfh templte engine
app.set('view engine', 'ejs')

// app.get("/", (req, res) => {
//     res.render('sensor')
// })

app.listen(1234, () => {
    console.log("Server listen at port: 1234")
})


//MQTT Client Subscribe
const mqtt = require('mqtt')
const topic = 'dck'
const client = mqtt.connect('mqtt://broker.emqx.io:1883')
let sensorData = []

client.on("connect", () => {
    console.log("connected to MQTT Broker")
})

// Subscribe to a topic with QoS 0
client.on('message', function (topic, payload, packet) {
    // Payload is Buffer
    // console.log(`Topic: ${topic}, Message: ${payload.toString()}, QoS: ${packet.qos}`)
    // console.log(typeof payload.toString())
    sensorData.push(JSON.parse(payload.toString()))
})

//route
app.get("/", (req, res) => {
    res.render("sensor.ejs", { data: sensorData })
    sensorData = [];
})


client.on("connect", () => {
    client.subscribe(topic)
})











