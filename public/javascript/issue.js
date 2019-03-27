var reportIssue = function(issue)
{
    
    smallPopupContainer.style.display = "block";

    buttonBlocker.style.display = "block";
    $("#smallPopupContainer").load('HTML/issue.html', function()
    {
        var issueText = document.getElementById("issueText");
        issueText.innerHTML = issue;
        var issueExit = document.getElementById("issueExit");
        issueExit.onclick = function()
        {
            smallPopupContainer.style.display = "none";
            buttonBlocker.style.display = "none";
        }
    });
}