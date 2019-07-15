

enum compareOpr {
    //% block="<"
    smaller,
    //% block=">"
    bigger,
}


enum servoDir {
    //% block="min"
    min,
    //% block="max"
    max,
}

let _boardType: boardType = boardType.nexusbit

//% weight=0 color=#009fb7 icon="\uf11a" block="PCA9685Servo"
namespace PCA9685Servo{


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
  

}




