
enum boardType {
    //% block="Nexus:bit"
    nexusbit,
    //% block="Thunder:bit V2"
    thunderbit_v2,
    //% block="Thunder:bit V1"
    thunderbit_v1,
}

enum joystickDir {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="left"
    left,
    //% block="right"
    right,
    //% block="center"
    center,
}

enum joystickSen {
    //% block="low"
    low = 100,
    //% block="normal"
    normal = 250,
    //% block="high"
    high = 400,
}

enum joystickAxis {
    //% block="x"
    x,
    //% block="y"
    y,
}

enum compareOpr {
    //% block="<"
    smaller,
    //% block=">"
    bigger,
}

enum colorType {
    //% block="white (full)"
    white,
    //% block="red"
    red,
    //% block="green"
    green,
    //% block="blue"
    blue,
    //% block="yellow"
    yellow,
    //% block="cyan"
    cyan,
    //% block="purple"
    purple,
    //% block="black (off)"
    off,
}

enum servoDir {
    //% block="min"
    min,
    //% block="max"
    max,
}

enum dcMotor {
    //% block="P13/P14"
    P13_14,
    //% block="P15/P16"
    P15_16,
}

enum carDir {
    //% block="forward"
    forward,
    //% block="backward"
    backward,
    //% block="left"
    left,
    //% block="right"
    right,
    //% block="stop"
    stop,
}

enum carTurnMode {
    //% block="normal"
    normal,
    //% block="rotate"
    rotate,
}

enum steMotorDir {
    //% block="1"
    one,
    //% block="2"
    two,
    //% block="stop"
    stop,
}

enum botAction {
    //% block="left leg straight"
    l_leg_straight,
    //% block="left leg outward"
    l_leg_out,
    //% block="left leg outward more"
    l_leg_out_more,
    //% block="left leg inward"
    l_leg_in,
    //% block="right leg straight"
    r_leg_straight,
    //% block="right leg outward"
    r_leg_out,
    //% block="right leg outward more"
    r_leg_out_more,
    //% block="right leg inward"
    r_leg_in,
    //% block="left foot flat"
    l_foot_flat,
    //% block="left foot down"
    l_foot_down,
    //% block="left foot down more"
    l_foot_down_more,
    //% block="left foot tiptoe"
    l_foot_tiptoe,
    //% block="left foot up"
    l_foot_up,
    //% block="right foot flat"
    r_foot_flat,
    //% block="right foot down"
    r_foot_down,
    //% block="right foot down more"
    r_foot_down_more,
    //% block="right foot tiptoe"
    r_foot_tiptoe,
    //% block="right foot up"
    r_foot_up,
    //% block="left arm lowest"
    l_arm_down,
    //% block="left arm low"
    l_arm_low,
    //% block="left arm level"
    l_arm_out,
    //% block="left arm high"
    l_arm_high,
    //% block="left arm highest"
    l_arm_up,
    //% block="right arm lowest"
    r_arm_down,
    //% block="right arm low"
    r_arm_low,
    //% block="right arm level"
    r_arm_out,
    //% block="right arm high"
    r_arm_high,
    //% block="right arm highest"
    r_arm_up,
    //% block="left hand inward"
    l_hand_close,
    //% block="left hand lowest"
    l_hand_down,
    //% block="left hand low"
    l_hand_low,
    //% block="left hand out"
    l_hand_out,
    //% block="left hand high"
    l_hand_high,
    //% block="left hand highest"
    l_hand_up,
    //% block="right hand lowest"
    r_hand_close,
    //% block="right hand low"
    r_hand_down,
    //% block="right hand inward"
    r_hand_low,
    //% block="right hand out"
    r_hand_out,
    //% block="right hand high"
    r_hand_high,
    //% block="right hand highest"
    r_hand_up,
}

enum botWalk {
    //% block="walk forward"
    forward,
    //% block="walk backward"
    backward,
    //% block="turn left"
    left,
    //% block="turn right"
    right,
    //% block="shuffle left"
    shuffle_left,
    //% block="shuffle right"
    shuffle_right,
    //% block="shuffle forward"
    shuffle_forward,
    //% block="shuffle backward"
    shuffle_backward,
    //% block="shuffle dance"
}

let _boardType: boardType = boardType.nexusbit

//% weight=200 color=#009fb7 icon="\uf1aa" block="Nexus:bit"
namespace PCA9685 Servo {


    let _servoNum = 16
    let _rLedPin = 15
    let _gLedPin = 14
    let _bLedPin = 13
    let _boardName = "Nexus:bit"
    let _initialized = false
    let _servoDefl = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoCurrent = [90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90]
    let _servoMin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let _servoMax = [180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180, 180]
    let _servoDelta = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]

    function _initialize() {
        if (!_initialized) {
            PCA9685.reset(64)
            _initialized = true
        }
    }

    //% block="Select board type %type" group="1. Setup"
    export function selectBoard(type: boardType) {
        _boardType = type
        if (_boardType == boardType.nexusbit) {
            _boardName = "Nexus:bit"
            _servoNum = 12
            _rLedPin = 15
            _gLedPin = 14
            _bLedPin = 13
        } else {
            _boardName = "Thunder:bit "
            _boardName += (_boardType == boardType.thunderbit_v2) ? "V2" : "V1"
            _servoNum = (_boardType == boardType.thunderbit_v2) ? 8 : 4
            _rLedPin = 9
            _gLedPin = 10
            _bLedPin = 11
        }
    }

 

    //% block="PCA9685 servo no. %servo turn to %degree degree(s)" servo.min=1 servo.max=16 servo.defl=1 degree.shadow="protractorPicker" degree.defl=180 group="4. PCA9685 Servos"
    export function servoTo(servo: number, degree: number) {
        _initialize()
        degree = Math.constrain(degree, _servoMin[servo - 1], _servoMax[servo - 1])
        if (servo > 0 && servo <= _servoNum) {
            _servoCurrent[servo - 1] = degree
            PCA9685.setServoPosition(servo, degree, 64)
        }
    }


    //% block="All PCA9685 servos turn to default" group="4. PCA9685 Servos"
    export function servosToDefl() {
        for (let i = 0; i < _servoNum; i++)
            servoTo(i + 1, _servoDefl[i])
    }

    //% block="All PCA9685 servos turn to degrees %degree" group="4. PCA9685 Servos"
    export function servosToDegree(degrees: number[]) {
        if (degrees != null && degrees.length <= _servoNum)
            for (let i = 0; i < degrees.length; i++)
                if (degrees[i] != null)
                    servoTo(i + 1, degrees[i])
    }


    //% block="(null)" group="4. PCA9685 Servos" advanced=true
    export function return_null(): number {
        return null
    }

    

}




