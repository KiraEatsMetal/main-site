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
        //final = "dysfunction present";
    }

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
        final = "normal"
    }

    console.log(final);
    console.log();
    return final;
}

//runFlowChart(1, 2, 3, 4, 5, 6, 7, 8);
//runFlowChart(1, 20, 16, 14, 15, 50, 7, 2.1);

function update() {
    let epSeptal, epLateral, EeSeptal, EeLateral, averageEe, LAVI, TRVelocity, EA, final, finalResult
    //get and assign for each variable 
    epSeptal = Number(document.getElementById("epSeptal").value);
    epLateral = Number(document.getElementById("epLateral").value);
    EeSeptal = Number(document.getElementById("EeSeptal").value);
    EeLateral = Number(document.getElementById("EeLateral").value);
    averageEe = Number(document.getElementById("averageEe").value);
    LAVI = Number(document.getElementById("LAVI").value);
    TRVelocity = Number(document.getElementById("TRVelocity").value);
    EA = Number(document.getElementById("EA").value);
    
    final = runFlowChart(epSeptal, epLateral, EeSeptal, EeLateral, averageEe, LAVI, TRVelocity, EA);

    //show the result
    let output = document.getElementById("output");
    finalResult = final
    output.innerHTML = finalResult;

    //console.log('updating');
    //setTimeout(update, 500);
}

//update();