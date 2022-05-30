radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1 && !(chiuso)) {
        maqueen.servoRun(maqueen.Servos.S2, 90)
        basic.pause(150)
        maqueen.servoRun(maqueen.Servos.S2, 5)
    } else if (receivedNumber == 2 && !(chiuso)) {
        maqueen.servoRun(maqueen.Servos.S1, 40)
        basic.pause(150)
        maqueen.servoRun(maqueen.Servos.S1, 80)
    } else if (receivedNumber == 3 && !(chiuso)) {
        maqueen.servoRun(maqueen.Servos.S2, 90)
        maqueen.servoRun(maqueen.Servos.S1, 40)
        basic.pause(200)
        maqueen.servoRun(maqueen.Servos.S2, 5)
        maqueen.servoRun(maqueen.Servos.S1, 80)
    } else if (receivedNumber == 4 && linea == 0) {
        if (!(chiuso)) {
            maqueen.servoRun(maqueen.Servos.S2, 60)
            maqueen.servoRun(maqueen.Servos.S1, 60)
            chiuso = true
        } else {
            maqueen.servoRun(maqueen.Servos.S2, 5)
            maqueen.servoRun(maqueen.Servos.S1, 80)
            chiuso = false
        }
    }
})
radio.onReceivedString(function (receivedString) {
    XandY = receivedString.split(" ", 2);
joystickY = parseInt(XandY[1].trim(), 10);
joystickX = parseInt(XandY[0], 10);
if (joystickX != 500) {
        velX = 510 / 1023 * joystickX - 255
    } else {
        velX = 0
    }
    if (joystickY != 500) {
        velY = 510 / 1023 * joystickY - 255
    } else {
        velY = 0
    }
})
let blocked = false
let cambiato = false
let velY = 0
let velX = 0
let chiuso = false
let linea = 0
radio.setGroup(40)
radio.setFrequencyBand(83)
let XandY = ["500", "500"]
let joystickY: number, joystickX: number
linea = 1
maqueen.servoRun(maqueen.Servos.S2, 5)
maqueen.servoRun(maqueen.Servos.S1, 80)
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 1)
    if (pins.digitalReadPin(DigitalPin.P13) != 1 && pins.digitalReadPin(DigitalPin.P14) != 1 && !(cambiato)) {
        cambiato = true
        if (linea == 0) {
            linea = 1
            blocked = false
        } else {
            linea = 0
        }
    }
    if (velY >= 20) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, Math.max(velY, velX) - Math.min(velY, velX))
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velY)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, Math.max(velY, velX * -1) - Math.min(velY, velX * -1))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velY)
        } else {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velY)
        }
    } else if (velY <= -20) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, Math.max(velY * -1, velX) - Math.min(velY * -1, velX))
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velY * -1)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, Math.max(velY * -1, velX * -1) - Math.min(velY * -1, velX * -1))
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velY * -1)
        } else {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velY * -1)
        }
    } else if (velX != 0 && velY > -20 && velY < 20) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velX / 2)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velX / 2)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velX * -1 / 2)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velX * -1 / 2)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
    serial.writeLine("" + linea + "+" + blocked)
    if (linea == 1 && !(blocked)) {
        maqueen.servoRun(maqueen.Servos.S2, 5)
        maqueen.servoRun(maqueen.Servos.S1, 80)
        blocked = true
        chiuso = false
    }
    serial.writeLine("" + (blocked))
})
loops.everyInterval(700, function () {
    cambiato = false
})
