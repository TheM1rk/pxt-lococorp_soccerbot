radio.onReceivedNumber(function (receivedNumber) {
    // in case the received number is one, it means
    // that the button A is pressed. thus it just kick
    // with his left thing
    // in case the received number is two, it means
    // that the button b is pressed. thus it just kick
    // with his right thing
    // in case the received number is three, it means
    // that the buttons a+b are pressed. thus it just kick
    // with both thing. it should take longer because yes
    if (receivedNumber == 1 && !(closed)) {
        maqueen.servoRun(maqueen.Servos.S2, 90)
        basic.pause(150)
        maqueen.servoRun(maqueen.Servos.S2, 5)
    } else if (receivedNumber == 2 && !(closed)) {
        maqueen.servoRun(maqueen.Servos.S1, 40)
        basic.pause(150)
        maqueen.servoRun(maqueen.Servos.S1, 81)
    } else if (receivedNumber == 3 && !(closed)) {
        maqueen.servoRun(maqueen.Servos.S2, 90)
        maqueen.servoRun(maqueen.Servos.S1, 40)
        basic.pause(200)
        maqueen.servoRun(maqueen.Servos.S2, 5)
        maqueen.servoRun(maqueen.Servos.S1, 81)
    } else if (receivedNumber == 4 && line == 0) {
        // in case it receives the number 4 it means that
        // the yellow button is pressed, thus it has to hold
        // the ball. if it's not closed it sets the variable
        // to true so that he is unable to kick while it holds
        // the ball
        // if it receives the number 4 but it's already
        // holding something it opens the claws and set the
        // closed to false, so he can kick again
        if (!(closed)) {
            maqueen.servoRun(maqueen.Servos.S2, 57)
            maqueen.servoRun(maqueen.Servos.S1, 63)
            closed = true
        } else {
            maqueen.servoRun(maqueen.Servos.S2, 5)
            maqueen.servoRun(maqueen.Servos.S1, 81)
            closed = false
        }
    }
})
radio.onReceivedString(function (receivedString) {
    XandY = receivedString.split(" ", 2);
joystickX = parseInt(XandY[0], 10);
joystickY = parseInt(XandY[1], 10);
rightW = 0, 707 * ((joystickX + joystickY - 1023) * (255 / 511));
leftW = (0,707*((joystickX - joystickY)*(255/511))) * -1
})
let blocked = false
let hasChanged = false
let leftW = 0
let closed = false
let line = 0
let rightW = 0
radio.setGroup(20)
radio.setFrequencyBand(83)
let XandY = ["500", "500"]
let joystickY: number, joystickX: number
line = 1
maqueen.servoRun(maqueen.Servos.S2, 5)
maqueen.servoRun(maqueen.Servos.S1, 81)
// when it surpasses the line near the goal,
// the robot cannot grab the ball. this is used because
// sometimes the bot glitches and change it's "play style"
// 2-3 times per millisecond. the "loops.everyInterval" is here to
// stop this behaviour for 1.5 seconds
loops.everyInterval(1500, function () {
    hasChanged = false
})
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P13, 1)
    pins.digitalWritePin(DigitalPin.P14, 1)
    if (pins.digitalReadPin(DigitalPin.P13) != 1 && pins.digitalReadPin(DigitalPin.P14) != 1 && !(hasChanged)) {
        // if both infrared sensors see the black line
        hasChanged = true
        if (line == 0) {
            line = 1
            // when line is 1 it means it cant grab.
            blocked = false
        } else {
            line = 0
        }
    }
    if (rightW > 0 && leftW > 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, rightW)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, leftW)
    }
    if (rightW < 0 && leftW < 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, rightW * -1)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, leftW * -1)
    }
    if (rightW < 0 && leftW > 0) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CCW, rightW * -1)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, leftW)
    }
    if (leftW < 0 && rightW > 0) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, leftW * -1)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, rightW)
    }
    if (leftW == 0 && rightW == 0) {
        maqueen.motorStop(maqueen.Motors.All)
    }
    if (line == 1 && !(blocked)) {
        maqueen.servoRun(maqueen.Servos.S2, 5)
        maqueen.servoRun(maqueen.Servos.S1, 81)
        blocked = true
        closed = false
    }
    serial.writeLine("" + (leftW))
    serial.writeLine("" + (rightW))
})
