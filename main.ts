radio.onReceivedNumber(function (receivedNumber) {
    if (receivedNumber == 1) {
        maqueen.servoRun(maqueen.Servos.S2, 47)
        basic.pause(215)
        maqueen.servoRun(maqueen.Servos.S2, 75)
    } else if (receivedNumber == 2) {
        maqueen.servoRun(maqueen.Servos.S1, 75)
        basic.pause(215)
        maqueen.servoRun(maqueen.Servos.S1, 47)
    } else if (receivedNumber == 3) {
        maqueen.servoRun(maqueen.Servos.S2, 47)
        maqueen.servoRun(maqueen.Servos.S1, 75)
        basic.pause(215)
        maqueen.servoRun(maqueen.Servos.S2, 75)
        maqueen.servoRun(maqueen.Servos.S1, 47)
    }
})
radio.onReceivedString(function (receivedString) {
    XandY = receivedString.split(" ", 2);
})
let velX = 0
let velY = 0
radio.setGroup(111)
radio.setFrequencyBand(83)
let XandY = ["500", "500"]
let joystickY: number, joystickX: number
basic.forever(function () {
    if (velY > 0) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velY - velX)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velY)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velY + velX)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velY)
        } else if (velX == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, velY)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else if (velY == 0) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, velX)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, velX * -1)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else if (velY < 0) {
        if (velX > 0) {
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velY * -1 - velX)
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velY * -1)
        } else if (velX < 0) {
            maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, velY * -1 + velX)
            maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, velY * -1)
        } else if (velX == 0) {
            maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, velY * -1)
        } else {
            maqueen.motorStop(maqueen.Motors.All)
        }
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
control.inBackground(function () {
    while (true) {
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
    }
})
