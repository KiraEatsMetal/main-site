function runFlowChart(epSeptal, epLateral, EeSeptal, EeLateral, averageEe, LAVI, TRVelocity, EA){
    let final = "ERROR";

    let stageOneMarkerCount = 0;

    let reducedEp = false
    let EeHigh = false
    let TRVelocityHigh = false

    let isEALow = false
    let isEAHigh = false

    //graphic 1 marker checking, also marks stage 2 markers 1 and 2 if it finds them
    if (epSeptal <= 6 || epLateral <= 7 || (epSeptal + epLateral) <= 13) {
        stageOneMarkerCount += 1;
        reducedEp = true
        console.log("Reduced e' velocity");
    }
    if (averageEe > 14) {
        stageOneMarkerCount += 1;
        EeHigh = true
        console.log("High average E/e'");
    }
    if (LAVI > 34) {
        stageOneMarkerCount += 1;
        console.log("High LAVI");
    }
    if (EA <= 0.8) {
        stageOneMarkerCount += 1;
        isEALow = true;
        console.log("E/A low");

    } else if (EA >= 2) {
        stageOneMarkerCount += 1;
        isEAHigh = true
        console.log("E/A high");
    }
    
    //stage 1 marker count
    if (stageOneMarkerCount >= 2) {
        console.log("dysfunction present", stageOneMarkerCount);
        //found dysfunction, start checking graphic 2
        
        //graphic 2 marker 2 and 3 checking
        if (EeSeptal >= 15 || EeLateral >= 13) {
            EeHigh = true;
        }
        if (TRVelocity >= 2.8) {
            TRVelocityHigh = true;
        }
        console.log("reduced e': " + reducedEp + ", E/e' high: " + EeHigh + ", TR velocity high: " + TRVelocityHigh);
        console.log("is E/A high: " + isEAHigh + ", is E/A low: " + isEALow)

        //graphic 2 solving
        if (reducedEp && EeHigh && TRVelocityHigh) {
            if (isEAHigh) {
                final = "grade 3"
            } else {
                final = "grade 2"
            }
        } else if (EeHigh || TRVelocityHigh) {
            final = "purple zone"
        } else if (reducedEp) {
            if (isEALow) {
                final = "grade 1"
            } else {
                final = "purple zone"
            }
        } else {
            final = "normal";
        }
    } else {
        console.log("dysfunction NOT present", stageOneMarkerCount);
        final = "normal";
    }

    console.log(final);
    return final;
}

//runFlowChart(1, 2, 3, 4, 5, 6, 7, 8);
//runFlowChart(1, 20, 16, 14, 15, 50, 7, 2.1);

function update() {
    let finalResult, warningResult
    const warningArray = []
    //all variables and their html input ids
    const variableInput = {
        epSeptal: "epSeptal",
        epLateral: "epLateral",
        EeSeptal: "EeSeptal",
        EeLateral: "EeLateral",
        averageEe: "averageEe",
        LAVI: "LAVI",
        TRVelocity: "TRVelocity",
        EA: "EA"
    }
    
    const warningTranslation = {
        epSeptal: "e' Septal",
        epLateral: "e' Lateral",
        EeSeptal: "E/e' Septal",
        EeLateral: "E/e' Lateral",
        averageEe: "average E/e'",
        LAVI: "LA Velo Index",
        TRVelocity: "TR Velocity",
        EA: "E/A"
    }

    console.log();
    //get and assign for each variable
    let value
    for (const key of Object.keys(variableInput)) {
        value = document.getElementById(variableInput[key]).value

        //console.log(value, value == "", Number(value), Number.isNaN(Number(value)))
        if (value == "" || Number.isNaN(Number(value))) {
            console.log(variableInput[key] + " undefined")
            //if the value isn't a valid number, ex: empty or is words instead, add warning
            warningArray.push(variableInput[key]);
            variableInput[key] = 0;
        } else {
            console.log(variableInput[key] + " defined and a number: " + Number(value))
            variableInput[key] = Number(value);
        }
    }
    
    console.log(variableInput["epSeptal"], variableInput["epLateral"], variableInput["EeSeptal"], variableInput["EeLateral"], variableInput["averageEe"], variableInput["LAVI"], variableInput["TRVelocity"], variableInput["EA"]);
    console.log();

    finalResult = runFlowChart(variableInput["epSeptal"], variableInput["epLateral"], variableInput["EeSeptal"], variableInput["EeLateral"], variableInput["averageEe"], variableInput["LAVI"], variableInput["TRVelocity"], variableInput["EA"]);

    //display warnings
    let warning = document.getElementById("warnings");
    if (warningArray.length > 0) {
        warningResult = "Warning, missing: |";
        warningArray.forEach(element => {
            warningResult += warningTranslation[element] + "|";
        });
        warning.innerHTML = warningResult;
    }

    //show the result
    let output = document.getElementById("output");
    output.innerHTML = finalResult;

    //console.log('updating');
    //setTimeout(update, 500);
}

//update();