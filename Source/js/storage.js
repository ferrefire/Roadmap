const subject = 
{
    name: "",
    description: "",
    topics: [],
}

var subcard = document.getElementById("subject-card");
var addTopicButton = document.getElementById("add-topic");

addTopicButton.addEventListener("click", AddNewTopic);

function AddNewTopic()
{
    var topicCount = subcard.childElementCount;

    var topcard = document.createElement("li");
    topcard.className = "list-group-item d-flex justify-content-between align-items-start";
    topcard.setAttribute("data-bs-toggle", "collapse");
    topcard.setAttribute("href", "#topicDescription" + topicCount);

    var content = document.createElement("div");
    content.className = "ms-2 me-auto";

    var header = document.createElement("div");
    header.className = "fw-bold";
    header.textContent = "Topic " + topicCount;
    
    content.appendChild(header);

    var collapse = document.createElement("div");
    collapse.className = "collapse";
    collapse.id = "topicDescription" + topicCount;
    collapse.textContent = "This is the content of this topic.";

    content.appendChild(collapse);

    topcard.appendChild(content);

    var badge = document.createElement("div");
    badge.className = "badge text-bg-primary rounded-pill";
    badge.innerText = "14";

    topcard.appendChild(badge);

    subcard.appendChild(topcard);
}