const stage = document.getElementById("stage");

const people = [
    document.getElementById("child"),
    document.getElementById("adult")
];

const lasers = [...document.querySelectorAll(".laser")];
const receivers = [...document.querySelectorAll(".receiver")];

const detectionElement = document.getElementById("detection");
const detectionDetail = document.getElementById("detectionDetail");
const blockedCountElement = document.getElementById("blockedCount");
const activeCountElement = document.getElementById("activeCount");
const classificationElement = document.getElementById("classification");
const powerStatusElement = document.getElementById("powerStatus");
const powerStatusBox = document.getElementById("powerStatusBox");
const powerLight = document.getElementById("powerLight");
const resetButton = document.getElementById("resetButton");

const DEFAULT_POSITIONS = {
    child: { left: 18, bottom: 20 },
    adult: { left: 95, bottom: 20 }
};

let draggedPerson = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

/*
 * The beam heights are measured from the top edge of the stage.
 * A beam is interrupted when its y-coordinate falls inside a person's
 * actual rendered bounding box and the person overlaps the beam corridor.
 */
function getDetectionBounds() {
    const stageRect = stage.getBoundingClientRect();
    const leftWall = document.querySelector(".left-wall").getBoundingClientRect();
    const rightWall = document.querySelector(".right-wall").getBoundingClientRect();

    return {
        stageRect,
        start: leftWall.right - stageRect.left,
        end: rightWall.left - stageRect.left
    };
}

function personIntersectsDetectionZone(person, bounds) {
    const rect = person.getBoundingClientRect();
    const left = rect.left - bounds.stageRect.left;
    const right = rect.right - bounds.stageRect.left;

    return right > bounds.start && left < bounds.end;
}

function isBeamBlocked(person, beamY, bounds) {
    const rect = person.getBoundingClientRect();

    const top = rect.top - bounds.stageRect.top;
    const bottom = rect.bottom - bounds.stageRect.top;
    const left = rect.left - bounds.stageRect.left;
    const right = rect.right - bounds.stageRect.left;

    const overlapsBeamCorridor =
        right > bounds.start &&
        left < bounds.end;

    const crossesBeamHeight =
        beamY >= top &&
        beamY <= bottom;

    return overlapsBeamCorridor && crossesBeamHeight;
}

function setPower(isOn) {
    const label = isOn ? "CURRENT FLOWING" : "CURRENT BLOCKED";

    powerStatusElement.textContent = label;
    powerLight.style.background = isOn ? "#38e58a" : "#ff4d58";
    powerLight.style.boxShadow = isOn
        ? "0 0 14px #38e58a"
        : "0 0 14px #ff4d58";

    powerStatusBox.classList.toggle("is-off", !isOn);
    powerStatusBox.setAttribute("aria-label", label);
}

function updateSystem() {
    const bounds = getDetectionBounds();

    const peopleInZone = people.filter(person =>
        personIntersectsDetectionZone(person, bounds)
    );

    const blockedByBeam = lasers.map(laser => {
        const beamY = Number(laser.dataset.y);

        return peopleInZone.some(person =>
            isBeamBlocked(person, beamY, bounds)
        );
    });

    const blocked = blockedByBeam.filter(Boolean).length;

    lasers.forEach((laser, index) => {
        const isBlocked = blockedByBeam[index];

        laser.classList.toggle("blocked", isBlocked);
        receivers[index].classList.toggle("blocked", isBlocked);
    });

    let detectedObject = "No person";
    let detail = "Detection area is clear";
    let classification = "CLEAR AREA";
    let powerOn = true;

    if (peopleInZone.length > 1) {
        detectedObject = "Multiple people";
        detail = "More than one figure is in the detection zone";
        classification = "UNCERTAIN — FAIL SAFE";
        powerOn = false;
    } else if (peopleInZone.length === 1) {
        const person = peopleInZone[0];

        if (blocked >= 1 && blocked <= 4) {
            detectedObject = person.id === "child" ? "Child figure" : "Small obstruction";
            detail = `${blocked} of 7 laser beams interrupted`;
            classification = "SMALL OBSTRUCTION";
            powerOn = false;
        } else if (blocked >= 5) {
            detectedObject = person.id === "adult" ? "Adult figure" : "Large obstruction";
            detail = `${blocked} of 7 laser beams interrupted`;
            classification = "LARGE OBSTRUCTION";
            powerOn = true;
        } else {
            detectedObject = "Uncertain object";
            detail = `${blocked} of 7 laser beams interrupted`;
            classification = "UNCERTAIN — FAIL SAFE";
            powerOn = false;
        }
    }

    detectionElement.textContent = detectedObject;
    detectionDetail.textContent = detail;
    blockedCountElement.textContent = `${blocked} / 7`;
    activeCountElement.textContent = String(7 - blocked);
    classificationElement.textContent = classification;

    setPower(powerOn);
}

function startDragging(event) {
    if (event.button !== undefined && event.button !== 0) return;

    draggedPerson = event.currentTarget;

    const personRect = draggedPerson.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();

    dragOffsetX = event.clientX - personRect.left;
    dragOffsetY = event.clientY - personRect.top;

    // Convert bottom-positioned figures to top/left positioning while dragging.
    draggedPerson.style.left = `${personRect.left - stageRect.left}px`;
    draggedPerson.style.top = `${personRect.top - stageRect.top}px`;
    draggedPerson.style.bottom = "auto";

    draggedPerson.setPointerCapture(event.pointerId);
    event.preventDefault();
}

function movePerson(event) {
    if (!draggedPerson) return;

    const stageRect = stage.getBoundingClientRect();

    const maxLeft = stage.clientWidth - draggedPerson.offsetWidth;
    const maxTop = stage.clientHeight - draggedPerson.offsetHeight;

    const left = Math.max(
        0,
        Math.min(event.clientX - stageRect.left - dragOffsetX, maxLeft)
    );

    const top = Math.max(
        0,
        Math.min(event.clientY - stageRect.top - dragOffsetY, maxTop)
    );

    draggedPerson.style.left = `${left}px`;
    draggedPerson.style.top = `${top}px`;

    updateSystem();
}

function stopDragging() {
    if (!draggedPerson) return;

    draggedPerson = null;
    updateSystem();
}

function resetSimulation() {
    people.forEach(person => {
        const position = DEFAULT_POSITIONS[person.id];

        person.style.left = `${position.left}px`;
        person.style.top = "";
        person.style.bottom = `${position.bottom}px`;
    });

    draggedPerson = null;
    updateSystem();
}

people.forEach(person => {
    person.addEventListener("pointerdown", startDragging);
    person.addEventListener("pointermove", movePerson);
    person.addEventListener("pointerup", stopDragging);
    person.addEventListener("pointercancel", stopDragging);
});

resetButton.addEventListener("click", resetSimulation);

window.addEventListener("resize", updateSystem);

// Draw the initial clear-area state.
updateSystem();
