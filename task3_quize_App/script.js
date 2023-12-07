let queObj = [
    {
        que: "Nmae of the National Animal?",
        opt1: "Lion",
        opt2: "Tiger",
        opt3: "Leopard",
        opt4: "Cow",
        ans: "Tiger",
    },
    {
        que: "What isThe capitale of India?",
        opt1: "Delhi",
        opt2: "New Delhi",
        opt3: "West Bengal",
        opt4: "Rajasthan",
        ans: "Delhi",
    },
    {
        que: "What is the Hieght of Mount Everest?",
        opt1: "18293m",
        opt2: "5039m",
        opt3: "8849m",
        opt4: "10150m",
        ans: "8849m",
    },
    {
        que: "Who Invented Television?",
        opt1: "Philo Farnsworth",
        opt2: "James Bond",
        opt3: "Thomas Alva Edison",
        opt4: "Nikola Tesla",
        ans: "Philo Farnsworth",
    },
]


/////////////////////////////////////////////////////////
// ALL variables name declearation here
let displayTimer = document.getElementById('chng-timer');
let nextBtn = document.getElementById('next-btn');
let nextIndex = 0;
let rightAnswer = 0;


////////////////////////////////////////////////////
// Button for satrt for the Quize
document.getElementById('start-btn').addEventListener('click', ()=> {
    document.getElementById('info-cont').classList.toggle('display-none');
    document.getElementById('quize-cont').classList.toggle('display-block');
    // function call
    displayQueAndOpt
    (
        queObj[nextIndex].que, 
        queObj[nextIndex].opt1, 
        queObj[nextIndex].opt2, 
        queObj[nextIndex].opt3, 
        queObj[nextIndex].opt4, 
        queObj[nextIndex].ans, 
    )
    timeIncrement();
});



// Increment index when click on Next Button
nextBtn.addEventListener('click', ()=> {
    nextIndex++;
    //console.log(nextIndex);
    if (nextIndex == queObj.length) {
        displayAnswer(nextIndex)
    } else {
        displayQueAndOpt (
            queObj[nextIndex].que, 
            queObj[nextIndex].opt1, 
            queObj[nextIndex].opt2, 
            queObj[nextIndex].opt3, 
            queObj[nextIndex].opt4, 
            queObj[nextIndex].ans, 
        );
    }
});

/////////////////////////////////////////////////////////////
function displayQueAndOpt(que, opt1, opt2, opt3, opt4, ans) {
    document.querySelector('.opt-container').innerHTML = '';

    //console.log("start "+nextIndex);
    //displayAnswer()

    let iTag1 = document.createElement('i');
        iTag1.classList.add('fa-solid')
        iTag1.classList.add('fa-circle-check')
    let iTag2 = document.createElement('i');
        iTag2.classList.add('fa-solid')
        iTag2.classList.add('fa-circle-check')
    let iTag3 = document.createElement('i');
        iTag3.classList.add('fa-solid')
        iTag3.classList.add('fa-circle-check')
    let iTag4 = document.createElement('i');
        iTag4.classList.add('fa-solid')
        iTag4.classList.add('fa-circle-check')
        //iTag1.classList.add('circle-check')

    let li1 = document.createElement('li');
    let li2 = document.createElement('li');
    let li3 = document.createElement('li');
    let li4 = document.createElement('li');

    let input1 = document.createElement('input');
        input1.value = opt1; 
        input1.readOnly = true
        
    let input2 = document.createElement('input');
        input2.value = opt2;
        input2.readOnly = true
    let input3 = document.createElement('input');
        input3.value = opt3;
        input3.readOnly = true
    let input4 = document.createElement('input');
        input4.value = opt4;
        input4.readOnly = true


    li1.append(input1, iTag1);
    li2.append(input2, iTag2);
    li3.append(input3, iTag3);
    li4.append(input4, iTag4);

    let inputs = [input1, input2, input3, input4];
    let iTags = [iTag1, iTag2, iTag3, iTag4];

    inputs.forEach((input, index) => {
        input.addEventListener('click', function handleClick() {
            // Toggle the 'click' class on the clicked input
            input.classList.toggle('click');
            iTags[index].classList.toggle('circle-check');
            if (input.value == ans) {
                rightAnswer++;
                
            }
            
            setTimeout(() => {
                // Increment the index number for questions
                nextIndex++;
                //console.log("setTimeout "+nextIndex);
                displayAnswer(nextIndex)
                displayQueAndOpt (
                    queObj[nextIndex].que, 
                    queObj[nextIndex].opt1, 
                    queObj[nextIndex].opt2, 
                    queObj[nextIndex].opt3, 
                    queObj[nextIndex].opt4, 
                    queObj[nextIndex].ans, 
                );
            }, 1000);
            //console.log("outoftimeout " + nextIndex);
            // Add style in the non-clicked inputs
            inputs.forEach((otherInput, otherIndex) => {
                if (otherIndex !== index) {
                    otherInput.style.pointerEvents = 'none'
                }
            });
        });
    });

    //=> Appending All elements here <=//
    document.querySelector('.question-tag').innerHTML = `${que}`;
    document.querySelector('.opt-container').append(li1, li2, li3 ,li4);
    //console.log("diaplay");

}


// This function used for timer only
let currentMinute = 4;
let totalMinutes = 0;
let interval; // Declare the interval variable outside the function

function timeIncrement() {
    let currentSecond = 60;

    // Check the condition before starting the interval
    if (totalMinutes === 5) {
        //console.log("finish " + totalMinutes);
        return;
    }

    // Set an interval to increment the number
    interval = setInterval(function() {
        currentSecond -= 1;
        displayTimer.innerHTML = `0${currentMinute}:${currentSecond}`;

        if (currentSecond < 10) {
            displayTimer.innerHTML = `0${currentMinute}:0${currentSecond}`;
        }

        if (currentSecond === 0) {
            currentMinute--;
            totalMinutes += 1;
            displayTimer.innerHTML = `0${currentMinute}:0${currentSecond}`;

            if (totalMinutes === 5 || nextIndex === queObj.length) {
                clearInterval(interval); // Clear the interval when the condition is met
                //console.log("finish " + totalMinutes);
                displayAnswer(totalMinutes);
                return;
            }
            
            currentSecond = 60;
        }
    }, 1000); // Interval in 1 second
}

function displayAnswer (index) {

    let accuracy = (rightAnswer / queObj.length) * 100;
    if (index === queObj.length || index === 5) {

        document.getElementById('quize-cont').classList.toggle('display-none');
        document.querySelector('.ans-cont').classList.toggle('display-block');
        document.querySelector('.ans-tag').innerHTML = `Correct Answer : ${rightAnswer}/${queObj.length}`;
        document.querySelector('.acc').innerHTML = `Accuracy Rate : ${accuracy.toFixed(2)}%`;
        //console.log(num);
        //console.log("rigtht "+rightAnswer);
    } 
}
