console.log("Hello world");
const birds = [];
const birdCount = 20;
const separationRatio = 0.1;
const alignment = 0.1;
const cohesion = 0.01;
const gravityStrengthMultiplier = 0.001;
const birdMaxSpeed = 250;
const gravityDistance = 600;
const birdCohesionDistance = 1000;
const birdSeparationDistance = 100;
const birdAlignmentDistance = 200;
class Position {
    x;
    y;
    xPos = 0;
    yPos = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.xPos = x;
        this.yPos = y;
    }
}
class Vector2 {
    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    addVector(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    subtractVector(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    getUnitVector() {
        if (Math.hypot(this.x, this.y) != 0) {
            return new Vector2(this.x / Math.hypot(this.x, this.y), this.y / Math.hypot(this.x, this.y));
        }
        else {
            return new Vector2(0, 0);
        }
    }
    multiplyMagnitude(num) {
        this.x *= num;
        this.y *= num;
    }
}
const pivotPosition = new Position(0, 0);
class BirdEntity {
    position;
    birdVector;
    birdBodyImage;
    birdPointer;
    sepArrow;
    alignArrow;
    consolArrow;
    combineArrow;
    constructor(position, birdVector, birdBody, birdPointer) {
        this.position = position;
        this.birdVector = birdVector;
        this.birdBodyImage = birdBody;
        this.birdPointer = birdPointer;
        this.birdBodyImage.dataset.x = position.x.toString();
        this.birdBodyImage.dataset.y = position.y.toString();
        this.birdBodyImage.style.left = `${position.x.toString()}px`;
        this.birdBodyImage.style.top = `${position.y.toString()}px`;
        document.body.appendChild(this.birdBodyImage);
        this.sepArrow = document.createElement("div");
        this.sepArrow.className = "sepVector";
        this.sepArrow.style.left = `${position.x.toString()}px`;
        this.sepArrow.style.top = `${position.y.toString()}px`;
        document.body.appendChild(this.sepArrow);
        this.alignArrow = document.createElement("div");
        this.alignArrow.className = "alignVector";
        this.alignArrow.style.left = `${this.position.x.toString()}px`;
        this.alignArrow.style.top = `${this.position.y.toString()}px`;
        document.body.appendChild(this.alignArrow);
        this.consolArrow = document.createElement("div");
        this.consolArrow.className = "consolVector";
        this.consolArrow.style.left = `${this.position.x.toString()}px`;
        this.consolArrow.style.top = `${this.position.y.toString()}px`;
        document.body.appendChild(this.consolArrow);
        this.combineArrow = document.createElement("div");
        this.combineArrow.className = "combineVector";
        this.combineArrow.style.left = `${this.position.x.toString()}px`;
        this.combineArrow.style.top = `${this.position.y.toString()}px`;
        document.body.appendChild(this.combineArrow);
        // birdPointer.dataset.x = position.x.toString();
        // birdPointer.dataset.y = position.x.toString();
        // birdPointer.style.left = `${position.x.toString()}px`;
        // birdPointer.style.top = `${position.x.toString()}px`;
        // document.body.appendChild(birdPointer);
    }
    addVector(delta) {
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    addPivotGravity(vector) {
        this.birdVector.x += vector.x;
        this.birdVector.y += vector.y;
    }
    addSepVector(delta) {
        const angle = getAngleFromVector(delta);
        this.sepArrow.style.transform = "rotate(" + angle + "deg)";
        this.sepArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    addAlignVector(delta) {
        delta.multiplyMagnitude(alignment);
        const angle = getAngleFromVector(delta);
        this.alignArrow.style.transform = "rotate(" + angle + "deg)";
        this.alignArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    addConsolVector(delta) {
        const angle = getAngleFromVector(delta);
        this.consolArrow.style.transform = "rotate(" + angle + "deg)";
        this.consolArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    moveStep(step) {
        this.position.x += this.birdVector.x * step;
        this.position.y += this.birdVector.y * step;
        this.birdBodyImage.dataset.x = this.position.x.toString();
        this.birdBodyImage.dataset.y = this.position.y.toString();
        this.birdBodyImage.style.left = `${this.position.x.toString()}px`;
        this.birdBodyImage.style.top = `${this.position.y.toString()}px`;
        const x = this.position.x;
        const y = this.position.y;
        this.birdBodyImage.style.left = `${x}px`;
        this.birdBodyImage.style.top = `${y}px`;
        this.sepArrow.style.left = `${x + 16}px`;
        this.sepArrow.style.top = `${y + 16}px`;
        this.alignArrow.style.left = `${x + 16}px`;
        this.alignArrow.style.top = `${y + 16}px`;
        this.consolArrow.style.left = `${x + 16}px`;
        this.consolArrow.style.top = `${y + 16}px`;
        this.combineArrow.style.left = `${x + 16}px`;
        this.combineArrow.style.top = `${y + 16}px`;
        const combAngle = getAngleFromVector(this.birdVector);
        this.combineArrow.style.transform = `rotate(${combAngle}deg)`;
        this.combineArrow.style.width = `${Math.hypot(this.birdVector.x, this.birdVector.y)}px`;
        if ((this.birdVector.x) > birdMaxSpeed) {
            this.birdVector.x = birdMaxSpeed;
        }
        if ((this.birdVector.y) > birdMaxSpeed) {
            this.birdVector.y = birdMaxSpeed;
        }
        if ((this.birdVector.x) < -birdMaxSpeed) {
            this.birdVector.x = -birdMaxSpeed;
        }
        if ((this.birdVector.y < -birdMaxSpeed)) {
            this.birdVector.y = -birdMaxSpeed;
        }
    }
}
function initBirds(birdCount) {
    for (let i = 0; i < birdCount; i++) {
        const birdPos = new Position(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
        const birdVector = new Vector2(0, 0);
        const square = document.createElement("div");
        square.className = "birdSquare";
        const pointer = document.createElement("div");
        pointer.className = "birdPointer";
        const newBird = new BirdEntity(birdPos, birdVector, square, pointer);
        birds.push(newBird);
        pivotPosition.x = window.innerWidth / 2;
        pivotPosition.y = window.innerHeight / 2;
        const middleSquare = document.createElement("div");
        middleSquare.className = "middleSquare";
        middleSquare.style.left = `${pivotPosition.x.toString()}px`;
        middleSquare.style.top = `${pivotPosition.y.toString()}px`;
        document.body.appendChild(middleSquare);
    }
}
initBirds(birdCount);
let previousTime = performance.now();
function update(now) {
    if (now - previousTime >= 50) {
        const delta = (now - previousTime) / 1000;
        previousTime = now;
        recalculateAndProcessBirds(delta);
        console.log("Bird Updating");
    }
    else {
        const delta = (now - previousTime) / 1000;
        processBirds(delta);
    }
    requestAnimationFrame(update);
}
requestAnimationFrame(update);
function recalculateAndProcessBirds(time) {
    birds.forEach((bird) => {
        bird.birdVector.multiplyMagnitude(1); // Reset before calculating new vector
        calculateNewBirdVector(bird, birds);
        bird.moveStep(time);
    });
}
function processBirds(time) {
    birds.forEach((bird) => {
        //bird.birdVector = new Vector2(0,0); // Reset before calculating new vector
        //calculateNewBirdVector(bird, birds)
        //calculateNewBirdVector(bird, birds)
        calculateNewBirdVector(bird, birds);
        bird.moveStep(time);
    });
}
function calculateNewBirdVector(selectedBird, otherBirds) {
    const separationBirds = [];
    const alignBirds = [];
    const cohesionBirds = [];
    otherBirds.forEach((bird) => {
        if (bird === selectedBird) {
            return;
        }
        else {
            if (findDistanceTwoPoint(bird.position, selectedBird.position) < birdCohesionDistance) {
                cohesionBirds.push(bird);
            }
            if (findDistanceTwoPoint(bird.position, selectedBird.position) < birdAlignmentDistance) {
                alignBirds.push(bird);
            }
            if (findDistanceTwoPoint(bird.position, selectedBird.position) < birdSeparationDistance) {
                separationBirds.push(bird);
            }
        }
    });
    const DebugSep = getSeparationVector(selectedBird, separationBirds);
    console.log(`DebugSep ${DebugSep.x},${DebugSep.y}`);
    selectedBird.addSepVector(DebugSep);
    const DebugAln = getAlignmentVector(selectedBird, alignBirds);
    console.log(`DebugAln ${DebugAln.x},${DebugAln.y}`);
    selectedBird.addAlignVector(DebugAln);
    const DebugCoh = getCohesionVector(selectedBird, cohesionBirds);
    console.log(`DebugCoh ${DebugCoh.x},${DebugCoh.y}`);
    selectedBird.addConsolVector(DebugCoh);
    selectedBird.addPivotGravity(getPivotGravity(selectedBird, pivotPosition));
}
function findDistanceTwoPoint(positionOne, positionTwo) {
    const dist = Math.hypot(positionOne.x - positionTwo.x, positionOne.y - positionTwo.y);
    return Math.abs(dist);
}
function getSeparationVector(selectedBird, nearbyBirds) {
    const returnVector = new Vector2(0, 0);
    let counter = 0;
    nearbyBirds.forEach((bird) => {
        counter += 1;
        returnVector.addVector(getSeparationVectorTwoPos(selectedBird, bird));
    });
    return returnVector;
}
function getSeparationVectorTwoPos(startBird, nearbyBird) {
    const dist = findDistanceTwoPoint(nearbyBird.position, startBird.position);
    const separationMagnitude = Math.pow((Math.abs(birdCohesionDistance - dist)) / birdCohesionDistance, 2);
    const returnVector = new Vector2((startBird.position.x - nearbyBird.position.x) * separationMagnitude, (startBird.position.y - nearbyBird.position.y) * separationMagnitude);
    returnVector.multiplyMagnitude(separationRatio);
    return returnVector;
}
function getAlignmentVector(selectedBird, nearbyBirds) {
    const returnVector = new Vector2(0, 0);
    const cumulVector = new Vector2(0, 0);
    let counter = 0;
    nearbyBirds.forEach((bird) => {
        counter += 1;
        cumulVector.addVector(bird.birdVector);
    });
    if (counter === 0) {
        return returnVector;
    }
    const unitBirdVector = selectedBird.birdVector.getUnitVector();
    // const averageVector : Vector2 = new Vector2(
    //     cumulVector.x / counter,
    //     cumulVector.y / counter
    // );
    const steering = new Vector2(cumulVector.getUnitVector().x - unitBirdVector.x, cumulVector.getUnitVector().y - unitBirdVector.y);
    return steering;
    //const unitVector = averageVector.getUnitVector();
    //return unitVector;
}
function getCohesionVector(selectedBird, nearbyBirds) {
    const cumulPosition = new Position(0, 0);
    let returnVector = new Vector2(0, 0);
    let counter = 0;
    nearbyBirds.forEach((bird) => {
        counter += 1;
        cumulPosition.x += (bird.position.x);
        cumulPosition.y += (bird.position.y);
    });
    if (counter === 0) {
        return returnVector;
    }
    const averagePosition = new Position(cumulPosition.x / counter, cumulPosition.y / counter);
    returnVector = new Vector2((averagePosition.x - selectedBird.position.x), (averagePosition.y - selectedBird.position.y));
    returnVector.multiplyMagnitude(cohesion);
    return returnVector;
}
function getAngleFromVector(vector) {
    const angleInRadians = Math.atan2(vector.y, vector.x);
    const angleInDegrees = angleInRadians * 180 / Math.PI;
    return angleInDegrees;
}
function getPivotGravity(selectedBird, pivotPosition) {
    let returnVector = new Vector2(0, 0);
    const distance = findDistanceTwoPoint(pivotPosition, selectedBird.position);
    if (distance > gravityDistance) {
        returnVector = new Vector2((pivotPosition.x - selectedBird.position.x), (pivotPosition.y - selectedBird.position.y));
        const gravityMultiplier2 = Math.pow(distance / gravityDistance, 2);
        returnVector.multiplyMagnitude(gravityMultiplier2);
        returnVector.multiplyMagnitude(gravityStrengthMultiplier);
        return returnVector;
    }
    else {
        return returnVector;
    }
}
export {};
//# sourceMappingURL=hello.js.map