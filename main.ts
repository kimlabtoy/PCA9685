/**
* MakeCode extension for micro:bit expansion board "Nexus:bit" and robot "NexusBot" from Taiwan Coding Education Association (TCEA)
* By Alan Wang, 2019
*/

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
namespace nexusbit {

    let _joystickSen = joystickSen.normal
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

//% weight=200 color=#e8446d icon="\uf113" block="NexusBot"
namespace nexusbot {

    let isInAction = false

    //% block="Servos calibration|(degrees from default:)|Left leg (servo 1) %servo1|Right leg (servo 2) %servo2|Left foot (servo 3) %servo3|Right foot (servo 4) %servo4|Left arm (servo 5) %servo5|Right arm (servo 6) %servo6|Left hand (servo 7) %servo7|Right hand (servo 8) %servo8|then stand still %stand_still" servo1.min=-180 servo1.max=180 servo1.defl=0 servo2.min=-180 servo2.max=180 servo2.defl=0 servo3.min=-180 servo3.max=180 servo3.defl=0 servo4.min=-180 servo4.max=180 servo4.defl=0 servo5.min=-180 servo5.max=180 servo5.defl=0 servo6.min=-180 servo6.max=180 servo6.defl=0 servo7.min=-180 servo7.max=180 servo7.defl=0 servo8.min=-180 servo8.max=180 servo8.defl=0 stand_still.defl=true
    export function robotCalibrate(servo1: number, servo2: number, servo3: number, servo4: number, servo5: number, servo6: number, servo7: number, servo8: number, stand_still: boolean) {
        if (_boardType != boardType.thunderbit_v1)
            nexusbit.servosDeflAdjust([servo1, servo2, servo3, servo4, servo5 + 90, servo6 - 90, servo7 - 90, servo8 + 90])
        else
            nexusbit.servosDeflAdjust([servo1, servo2, servo3, servo4])
        if (stand_still) {
            robotStandstill()
            basic.pause(500)
        }
    }

    //% block="Servos gradual turn speed %speed" speed.min=1 speed.max=15 speed.defl=5 advanced=true
    export function robotSpeed(speed: number) {
        if (_boardType != boardType.thunderbit_v1)
            nexusbit.servoSetDelta([speed, speed, speed, speed, speed, speed, speed, speed])
        else
            nexusbit.servoSetDelta([speed, speed, speed, speed])
    }

    //% block="Stand still"
    export function robotStandstill() {
        isInAction = true
        nexusbit.servosToDefl()
        isInAction = false
    }

    //% block="Stand still (legs and feet only)"
    export function robotLegStandStill() {
        isInAction = true
        nexusbit.servosToDeltaFromDefl([0, 0, 0, 0])
        isInAction = false
    }

    function _servoMove(s: number, d: number) {
        nexusbit.servoDeltaFromDefl(s, d)
    }

    //% block="Action: %action" action.fieldEditor="gridpicker"
    export function robotAction(action: botAction) {
        isInAction = true
        switch (action) {
            case botAction.l_leg_straight:
                _servoMove(1, 0)
                break
            case botAction.l_leg_out:
                _servoMove(1, -20)
                break
            case botAction.l_leg_out_more:
                _servoMove(1, -40)
                break
            case botAction.l_leg_in:
                _servoMove(1, 20)
                break
            case botAction.r_leg_straight:
                _servoMove(2, 0)
                break
            case botAction.r_leg_out:
                _servoMove(2, 20)
                break
            case botAction.r_leg_out_more:
                _servoMove(2, 40)
                break
            case botAction.r_leg_in:
                _servoMove(2, -20)
                break
            case botAction.l_foot_flat:
                _servoMove(3, 0)
                break
            case botAction.l_foot_down:
                _servoMove(3, 15)
                break
            case botAction.l_foot_down_more:
                _servoMove(3, 40)
                break
            case botAction.l_foot_tiptoe:
                _servoMove(3, 60)
                break
            case botAction.l_foot_up:
                _servoMove(3, -15)
                break
            case botAction.r_foot_flat:
                _servoMove(4, 0)
                break
            case botAction.r_foot_down:
                _servoMove(4, -15)
                break
            case botAction.r_foot_down_more:
                _servoMove(4, -40)
                break
            case botAction.r_foot_tiptoe:
                _servoMove(4, -60)
                break
            case botAction.r_foot_up:
                _servoMove(4, 15)
                break
            case botAction.l_arm_down:
                _servoMove(5, 0)
                break
            case botAction.l_arm_low:
                _servoMove(5, -45)
                break
            case botAction.l_arm_out:
                _servoMove(5, -90)
                break
            case botAction.l_arm_high:
                _servoMove(5, -135)
                break
            case botAction.l_arm_up:
                _servoMove(5, -180)
                break
            case botAction.r_arm_down:
                _servoMove(6, 0)
                break
            case botAction.r_arm_low:
                _servoMove(6, 45)
                break
            case botAction.r_arm_out:
                _servoMove(6, 90)
                break
            case botAction.r_arm_high:
                _servoMove(6, 135)
                break
            case botAction.r_arm_up:
                _servoMove(6, 180)
                break
            case botAction.l_hand_down:
                _servoMove(7, 0)
                break
            case botAction.l_hand_close:
                _servoMove(7, -15)
                break
            case botAction.l_hand_low:
                _servoMove(7, 45)
                break
            case botAction.l_hand_out:
                _servoMove(7, 90)
                break
            case botAction.l_hand_high:
                _servoMove(7, 135)
                break
            case botAction.l_hand_up:
                _servoMove(7, 180)
                break
            case botAction.r_hand_down:
                _servoMove(8, 0)
                break
            case botAction.r_hand_close:
                _servoMove(8, 15)
                break
            case botAction.r_hand_low:
                _servoMove(8, -45)
                break
            case botAction.r_hand_out:
                _servoMove(8, -90)
                break
            case botAction.r_hand_high:
                _servoMove(8, -135)
                break
            case botAction.r_hand_up:
                _servoMove(8, -180)
        }
        isInAction = false
    }

    function _servosDeltaSeq(seq: number[][]) {
        for (let i = 0; i < seq.length; i++)
            nexusbit.servosSlowTurnDeltaFromDefl(seq[i], 0)
    }

    //% block="Movement: %action" action.fieldEditor="gridpicker"
    export function robot_walk(action: botWalk) {
        isInAction = true
        switch (action) {
            case botWalk.forward:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [-20, -20, null, null],
                    [null, null, -15, -40],
                    [20, 20, null, null],
                ])
                break
            case botWalk.backward:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [20, 20, null, null],
                    [null, null, -15, -40],
                    [-20, -20, null, null],
                ])
                break
            case botWalk.left:
                _servosDeltaSeq([
                    [null, null, 40, 15],
                    [-20, 0, null, null],
                    [null, null, -15, -40],
                    [0, -20, null, null],
                ])
                break
            case botWalk.right:
                _servosDeltaSeq([
                    [null, null, -15, -40],
                    [0, 20, null, null],
                    [null, null, 40, 15],
                    [20, 0, null, null],
                ])
                break
            case botWalk.shuffle_left:
                _servosDeltaSeq([
                    [0, 0, -15, -40],
                    [null, null, 40, null],
                ])
                basic.pause(100)
                _servosDeltaSeq([
                    [null, null, null, 15],
                    [null, null, 0, 0]
                ])
                break
            case botWalk.shuffle_right:
                _servosDeltaSeq([
                    [0, 0, 40, 15],
                    [null, null, null, -40],
                ])
                basic.pause(100)
                _servosDeltaSeq([
                    [null, null, -15, null],
                    [null, null, 0, 0]
                ])
                break
            case botWalk.shuffle_forward:
                _servosDeltaSeq([
                    [null, null, 30, -30],
                    [-20, 20, null, null],
                    [null, null, 0, 0],
                    [0, 0, null, null]
                ])
                break
            case botWalk.shuffle_backward:
                _servosDeltaSeq([
                    [null, null, 30, -30],
                    [20, -20, null, null],
                    [null, null, 0, 0],
                    [0, 0, null, null]
                ])
        }
        isInAction = false
    }

    //% block="Heard sound ?"
    export function heardSound(): boolean {
        return nexusbit.micTriggered() && !isInAction
    }

    //% block="Detected object ?"
    export function detectedObj(): boolean {
        return nexusbit.sonarCheck(compareOpr.smaller, 10)
    }

    //% block="DC motor car %direction speed %speed" speed.min=0 speed.max=100 speed.defl=50 direction.fieldEditor="gridpicker" advanced=true
    export function robotCar(direction: carDir, speed: number) {
        nexusbit.DC_car(direction, carTurnMode.rotate, speed, speed)
    }

}

//% weight=15
namespace PCA9685 {
}
