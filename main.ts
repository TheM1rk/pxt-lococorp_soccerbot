radio.onReceivedNumber(function (receivedNumber) {
    while (receivedNumber != 0) {
        if (receivedNumber == 1) {
            maqueen.servoRun(maqueen.Servos.S2, 90)
            basic.pause(150)
        } else if (receivedNumber == 2) {
            maqueen.servoRun(maqueen.Servos.S1, 40)
            basic.pause(150)
        } else if (receivedNumber == 3) {
            maqueen.servoRun(maqueen.Servos.S2, 90)
            maqueen.servoRun(maqueen.Servos.S1, 40)
            basic.pause(200)
        }
        maqueen.servoRun(maqueen.Servos.S1, 80)
        maqueen.servoRun(maqueen.Servos.S2, 5)
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
let velY = 0
let velX = 0
radio.setGroup(40)
radio.setFrequencyBand(83)
let XandY = ["500", "500"]
let joystickY: number, joystickX: number
basic.forever(function () {
    serial.writeLine("X =" + velX)
    serial.writeLine("Y =" + velY)
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
})
