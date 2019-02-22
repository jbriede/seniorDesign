function cleanProcedure()
{
    popupContainer.style.display = "block";
    $("#popupContainer").load('HTML/clean.html', function()
    {
        var exitButton = document.getElementById("cleanExitButton");
        exitButton.onclick = function()
        {
            popupContainer.style.display = "none";
        }

        var load_step = function(step_num)
        {
            var steps = [];
            var step1 = document.getElementById("step1");
            steps.push(step1);
            var step2 = document.getElementById("step2");
            steps.push(step2);
            var step3 = document.getElementById("step3");
            steps.push(step3);
            var step4 = document.getElementById("step4");
            steps.push(step4);
            var step5 = document.getElementById("step5");
            steps.push(step5);
            var step6 = document.getElementById("step6");
            steps.push(step6);
            var step7 = document.getElementById("step7");
            steps.push(step7);
            steps.forEach(function(step)
            {
                step.style.display = "none";
            });

            steps[step_num-1].style.display = "block";

            if (step_num == 7)
            {
                fillTankButton_fromClean
                var fillTankButton_fromClean = document.getElementById("fillTankButton_fromClean");
                fillTankButton_fromClean.onclick = function()
                {
                    fillTankButton.click();
                }
            }

        }

        var current_step = 1;

        var previousStep = document.getElementById("previousStep");
        var nextStep = document.getElementById("nextStep");

        previousStep.onclick = function()
        {
            if (current_step > 1)
            {
                current_step -= 1;
            }
            load_step(current_step);
        }
        nextStep.onclick = function()
        {
            if (current_step < 7)
            {
                current_step += 1;
            }
            load_step(current_step);
        }
        

    });
}

function setupCleanListeners()
{
    var cleanTankButton = document.getElementById("cleanTankButton");
    cleanTankButton.onclick = function()
    {
        cleanProcedure();
    }
}