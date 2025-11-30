console.log("Hello world");

const birds : BirdEntity[] = [];
const hunterBirds : HunterBird[] = [];

const birdCount: number = 50;
const separationRatio: number = 0.01;
const alignment: number = 0.01;
const cohesion: number = 0.001;
const gravityStrengthMultiplier: number = 0.001;
const birdMaxSpeed: number = 100;
const gravityDistance: number = 600;
const birdCohesionDistance: number = 300;
const birdSeparationDistance: number = 200;
const birdAlignmentDistance: number = 200;

const hunterBirdCount: number = 1;
const maxHunterDist : number = 100;
const hunterBirdMaxSpeed: number = 50;
const hunterFearAmount: number = 0.20;

class Position {
    xPos: number = 0;
    yPos: number = 0;
    constructor(public x: number, public y: number) 
    {
        this.xPos = x;
        this.yPos = y;
    }
}

class Vector2 {
    constructor(public x: number, public y: number)  {}

    addVector(vector : Vector2) {
        this.x += vector.x;
        this.y += vector.y;
    }

    subtractVector(vector : Vector2) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    
    getUnitVector() {
        if (Math.hypot(this.x, this.y)!= 0) {
            return new Vector2(
                this.x/Math.hypot(this.x, this.y),
                this.y/Math.hypot(this.x, this.y)
            );
        }
        else {
            return new Vector2(0,0);
        }
    }
    
    multiplyMagnitude(num: number) {
        this.x *= num;
        this.y *= num;
    }
}

const pivotPosition : Position = new Position(0,0);

class BirdEntity {
    position: Position;
    birdVector: Vector2;
    birdBodyImage: HTMLDivElement;
    birdPointer: HTMLDivElement;
    
    sepArrow: HTMLDivElement;
    alignArrow: HTMLDivElement;
    consolArrow: HTMLDivElement;
    combineArrow: HTMLDivElement;
    constructor(position: Position,
                birdVector: Vector2,
                birdBody: HTMLDivElement, 
                birdPointer: HTMLDivElement) 
                {
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

    addVector(delta: Vector2) {
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    addPivotGravity(vector: Vector2) {
        this.birdVector.x += vector.x;
        this.birdVector.y += vector.y;
    }
    addSepVector(delta: Vector2) {
        const angle: Number = getAngleFromVector(delta)
        this.sepArrow.style.transform = "rotate(" + angle + "deg)";
        this.sepArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }
    addAlignVector(delta: Vector2) {
        delta.multiplyMagnitude(alignment);
        const angle: Number = getAngleFromVector(delta)
        this.alignArrow.style.transform = "rotate(" + angle + "deg)";
        this.alignArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
        
    }
    addConsolVector(delta: Vector2) {
        const angle: Number = getAngleFromVector(delta)
        this.consolArrow.style.transform = "rotate(" + angle + "deg)";
        this.consolArrow.style.width = `${Math.hypot(delta.x, delta.y)}px`;
        this.birdVector.x += delta.x;
        this.birdVector.y += delta.y;
    }

    moveStep(step: number) {
        this.position.x += this.birdVector.x *step;
        this.position.y += this.birdVector.y *step;
        this.birdBodyImage.dataset.x = this.position.x.toString();
        this.birdBodyImage.dataset.y = this.position.y.toString();
        this.birdBodyImage.style.left = `${this.position.x.toString()}px`;
        this.birdBodyImage.style.top = `${this.position.y.toString()}px`;
        const x = this.position.x;
        const y = this.position.y;

        this.birdBodyImage.style.left = `${x}px`;
        this.birdBodyImage.style.top = `${y}px`;
        this.sepArrow.style.left = `${x+16}px`;
        this.sepArrow.style.top = `${y+16}px`;
        this.alignArrow.style.left = `${x+16}px`;
        this.alignArrow.style.top = `${y+16}px`;
        this.consolArrow.style.left = `${x+16}px`;
        this.consolArrow.style.top = `${y+16}px`;
        this.combineArrow.style.left = `${x+16}px`;
        this.combineArrow.style.top = `${y+16}px`;

        const combAngle: Number = getAngleFromVector(this.birdVector)
        this.combineArrow.style.transform = `rotate(${combAngle}deg)`;
        this.combineArrow.style.width = `${Math.hypot(this.birdVector.x, this.birdVector.y)}px`;

        if ((this.birdVector.x) > birdMaxSpeed) 
            {
            this.birdVector.x = birdMaxSpeed;
        }
        if ((this.birdVector.y) > birdMaxSpeed) 
            {
            this.birdVector.y = birdMaxSpeed;
        }
        if ((this.birdVector.x) < -birdMaxSpeed) 
            {
            this.birdVector.x = -birdMaxSpeed;
        }
        if ((this.birdVector.y < -birdMaxSpeed))
            {
            this.birdVector.y = -birdMaxSpeed;
        }
    }
}

class HunterBird extends BirdEntity {
    fearLevel : Number = 10;
}
function initBirds(birdCount: number) {
    for (let i = 0; i < birdCount; i++) {
        const birdPos: Position = new Position(
            Math.random() * window.innerWidth, 
            Math.random() * window.innerHeight
        );
        const birdVector: Vector2 = new Vector2(
            0,
            0
        );
        
        const square = document.createElement("div");
        square.className = "birdSquare";
        const pointer = document.createElement("div");
        pointer.className = "birdPointer";
        const newBird : BirdEntity = new BirdEntity(
            birdPos, 
            birdVector, 
            square, 
            pointer
        );
        birds.push(newBird);

    }
    pivotPosition.x = window.innerWidth/2;
    pivotPosition.y = window.innerHeight/2;
    
    const middleSquare = document.createElement("div");
    middleSquare.className = "middleSquare";
    middleSquare.style.left = `${pivotPosition.x.toString()}px`;
    
    middleSquare.style.top = `${pivotPosition.y.toString()}px`;
    document.body.appendChild(middleSquare);

    for (let i = 0; i < hunterBirdCount; i++) {
        const birdPos: Position = new Position(
            Math.random() * window.innerWidth, 
            Math.random() * window.innerHeight
        );
        const birdVector: Vector2 = new Vector2(
            0,
            0
        );
        const square = document.createElement("div");
        square.className = "hunterBirdSquare";
        const pointer = document.createElement("div");
        pointer.className = "hunterBirdPointer";
        const newHunterBird : HunterBird = new HunterBird(
            birdPos, 
            birdVector, 
            square, 
            pointer
        );
        hunterBirds.push(newHunterBird);
        
    }
}


initBirds(birdCount);

let previousTime = performance.now();

function update(now: number) {
    if (now - previousTime >= 100) {
        const delta : number = (now - previousTime)/1000;
        previousTime = now;
        recalculateAndProcessBirds(delta, birds, hunterBirds);
        console.log("Bird Updating")
    }
    else {
        const delta : number = (now - previousTime)/1000;
        processBirds(delta, birds, hunterBirds)
    }

    requestAnimationFrame(update);
}

requestAnimationFrame(update);

function recalculateAndProcessBirds(time: number, birds: BirdEntity[], hunterBirds: HunterBird[]) {
    birds.forEach((bird : BirdEntity) => {
        bird.birdVector.multiplyMagnitude(1);
        calculateNewBirdVector(bird, birds, hunterBirds)
        bird.moveStep(time);
    }
    ) 
    hunterBirds.forEach((hunterBird) => {
        hunterBird.birdVector.multiplyMagnitude(1);
        calculateHunterBirdVector(hunterBird, birds, hunterBirds)
        hunterBird.moveStep(time);
    })
}

function processBirds(time: number, birds: BirdEntity[], hunterBirds: HunterBird[]) {
    birds.forEach((bird : BirdEntity) => {
        //bird.birdVector = new Vector2(0,0); // Reset before calculating new vector
        //calculateNewBirdVector(bird, birds)
        //calculateNewBirdVector(bird, birds)
        calculateNewBirdVector(bird, birds, hunterBirds)
        bird.moveStep(time);
    }
    )
    hunterBirds.forEach((hunterBird) => {
        hunterBird.birdVector.multiplyMagnitude(1);
        calculateHunterBirdVector(hunterBird, birds, hunterBirds)
        hunterBird.moveStep(time);
    }) 
}

function calculateNewBirdVector(selectedBird: BirdEntity, otherBirds: BirdEntity[], hunterBirds: HunterBird[] ) {
    const separationBirds : BirdEntity[] = [];
    const alignBirds : BirdEntity[] = [];
    const cohesionBirds : BirdEntity[] = [];
    otherBirds.forEach((bird : BirdEntity) =>  
        {
            if (bird === selectedBird) 
                {
                return;
            }

            else 
            {
                if (findDistanceTwoPoint(
                    bird.position, selectedBird.position) < birdCohesionDistance) 
                    {
                        cohesionBirds.push(bird);
                    }
                if (findDistanceTwoPoint(
                    bird.position, selectedBird.position) < birdAlignmentDistance) 
                    {
                    alignBirds.push(bird);

                }
                if (findDistanceTwoPoint(
                    bird.position, selectedBird.position) < birdSeparationDistance) 
                    {
                        separationBirds.push(bird);
                    }
                
            }
        }
    )
    const DebugSep = getSeparationVector(selectedBird, separationBirds);
    console.log(`DebugSep ${DebugSep.x},${DebugSep.y}`);
    selectedBird.addSepVector(DebugSep);

    const DebugAln = getAlignmentVector(selectedBird, alignBirds);
    console.log(`DebugAln ${DebugAln.x},${DebugAln.y}`);
    selectedBird.addAlignVector(DebugAln);

    const DebugCoh = getCohesionVector(selectedBird, cohesionBirds);
    console.log(`DebugCoh ${DebugCoh.x},${DebugCoh.y}`);
    selectedBird.addConsolVector(DebugCoh);

    const birdFearVector : Vector2 = calculateBirdFear(selectedBird, hunterBirds);
    selectedBird.addVector(birdFearVector);
    selectedBird.addPivotGravity(getPivotGravity(selectedBird, pivotPosition));
}

function calculateHunterBirdVector(selectedHunter: HunterBird, otherBirds: BirdEntity[], hunterBirds: HunterBird[] ) {
    const cohesionBirds : BirdEntity[] = [];
    otherBirds.forEach((bird : BirdEntity) =>  
        {


            if (findDistanceTwoPoint(
                bird.position, selectedHunter.position) < birdCohesionDistance) 
                {
                    cohesionBirds.push(bird);
                }                
        }
    )
    const DebugCoh = getCohesionVector(selectedHunter, cohesionBirds);
    console.log(`HunterBird: DebugCoh ${DebugCoh.x},${DebugCoh.y}`);
    selectedHunter.addConsolVector(DebugCoh);

    const birdFearVector : Vector2 = calculateBirdFear(selectedHunter, hunterBirds);
    selectedHunter.addVector(birdFearVector);
    selectedHunter.addPivotGravity(getPivotGravity(selectedHunter, pivotPosition));
}


function calculateBirdFear(bird :BirdEntity, hunterBirds : HunterBird[]) : Vector2
{
    let returnVector : Vector2 = new Vector2(0,0);
    let cloestHunter : HunterBird;
    let prevDist : number = 100000000;
    hunterBirds.forEach((hunter) => 
        {
            if (hunter === bird) {
                return;
            }
            if (findDistanceTwoPoint(hunter.position, bird.position) < prevDist) 
                {
                prevDist = findDistanceTwoPoint(hunter.position, bird.position);
                cloestHunter = hunter;
                if (prevDist < maxHunterDist) 
                    {
                    const fearMultiplier = maxHunterDist / findDistanceTwoPoint(hunter.position, bird.position); 
                    returnVector = new Vector2(-(hunter.position.x - bird.position.x), -(hunter.position.y - bird.position.y));
                    returnVector.multiplyMagnitude(fearMultiplier);
                }

            }

        }
    )

    return returnVector;

}

function findDistanceTwoPoint(positionOne: Position, positionTwo: Position): number {
    const dist = Math.hypot(positionOne.x - positionTwo.x, positionOne.y - positionTwo.y);
    return Math.abs(dist);
}

function getSeparationVector(selectedBird :BirdEntity, nearbyBirds :BirdEntity[]) : Vector2
{
    const returnVector : Vector2 = new Vector2(0,0);
    let counter = 0;
    nearbyBirds.forEach((bird: BirdEntity) => 
        {
            counter += 1;
            returnVector.addVector(getSeparationVectorTwoPos(selectedBird, bird));
        }
    )

    return returnVector;
}

function getSeparationVectorTwoPos(startBird: BirdEntity, nearbyBird: BirdEntity): Vector2 {
    const dist : number = findDistanceTwoPoint(nearbyBird.position, startBird.position);
    const separationMagnitude = Math.pow(
        (Math.abs(birdCohesionDistance - dist))/birdCohesionDistance, 2);
    const returnVector = new Vector2(
        (startBird.position.x - nearbyBird.position.x )*separationMagnitude, 
        (startBird.position.y - nearbyBird.position.y )*separationMagnitude
    );
    returnVector.multiplyMagnitude(separationRatio)
    return returnVector;
}

function getAlignmentVector(selectedBird :BirdEntity, nearbyBirds :BirdEntity[]): Vector2
{
    const returnVector : Vector2 = new Vector2(0,0);
    const cumulVector : Vector2 = new Vector2(0,0);

    let counter : number = 0;
    nearbyBirds.forEach((bird: BirdEntity) => 
        {
            counter += 1;
            cumulVector.addVector(bird.birdVector)
        }
    )
    if (counter === 0) {return returnVector;}
    const unitBirdVector = selectedBird.birdVector.getUnitVector();
    // const averageVector : Vector2 = new Vector2(
    //     cumulVector.x / counter,
    //     cumulVector.y / counter
    // );
  
    const steering: Vector2 = new Vector2(
        cumulVector.getUnitVector().x - unitBirdVector.x,
        cumulVector.getUnitVector().y - unitBirdVector.y
    );




    return steering;

    //const unitVector = averageVector.getUnitVector();
    //return unitVector;
}


function getCohesionVector(selectedBird :BirdEntity, nearbyBirds :BirdEntity[]): Vector2
{
    const cumulPosition: Position = new Position(0,0);
    let returnVector : Vector2 = new Vector2(0,0)
    let counter : number = 0;
    nearbyBirds.forEach((bird: BirdEntity) => 
        {
            counter += 1;
            cumulPosition.x += (bird.position.x)
            cumulPosition.y += (bird.position.y)
        }
    )
    if (counter === 0) {return returnVector;}

    const averagePosition: Position = new Position(
        cumulPosition.x / counter,
        cumulPosition.y / counter
    );
    returnVector = new Vector2(
        (averagePosition.x - selectedBird.position.x), 
        (averagePosition.y - selectedBird.position.y)
    )
    returnVector.multiplyMagnitude(cohesion);
    return returnVector;
}

function getAngleFromVector(vector: Vector2): number {
    const angleInRadians: number = Math.atan2(vector.y, vector.x);
    const angleInDegrees: number = angleInRadians * 180 / Math.PI;
    return angleInDegrees;
}

function getPivotGravity(selectedBird: BirdEntity, pivotPosition: Position): any {
    let returnVector : Vector2 = new Vector2(0,0) 

    const distance = findDistanceTwoPoint(pivotPosition, selectedBird.position);


    if (distance > gravityDistance) {
        
        returnVector = new Vector2(
            (pivotPosition.x - selectedBird.position.x), 
            (pivotPosition.y - selectedBird.position.y)
        )
        const gravityMultiplier2 = Math.pow(
            distance / gravityDistance,
            2
        );
        returnVector.multiplyMagnitude(gravityMultiplier2)
        returnVector.multiplyMagnitude(gravityStrengthMultiplier)
        return returnVector;

        
    }
    else {
        return returnVector;
    }
}
