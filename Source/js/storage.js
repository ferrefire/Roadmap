//import * as fs from "libs/fs.js";
//import { writeFile } from "libs/fs.js";
import { writeFile } from "fs";

class Subject 
{
    name = "";
    description = "";
    depth = 0;
    subjects = [];

    constructor(name, description) 
    {
        this.name = name;
        this.description = description;
    }

    AddSubject(sname, sdescription) 
    {
        let count = this.subjects.length;
        this.subjects[count] = new Subject(sname, sdescription);
        this.subjects[count].depth = this.depth + 1;

        return this.subjects[count];
    }
}

const subject = new Subject("Subjects", "All main subjects.");

subject.AddSubject("Vegetation", "This is some description regarding the vegetation.");
subject.AddSubject("Terrain", "This is some description regarding the terrain.");

subject.subjects[0].AddSubject("Trees", "This is some description regarding the trees.");
subject.subjects[0].AddSubject("Grass", "This is some description regarding the grass.");

subject.subjects[0].subjects[0].AddSubject("Leaves", "This is some description regarding the leaves.");
subject.subjects[0].subjects[0].AddSubject("Trunk", "This is some description regarding the trunk.");

const data = JSON.stringify(subject);

writeFile("../json/data.json", data);

const rows = document.getElementById("rows");
const topicName = document.getElementById("topic-name");
const topicDescription = document.getElementById("topic-description");
let addTopic = document.getElementById("add-topic");

//ShowTopics();

rows.innerHTML = "";
ShowSubject(subject);

function NewDiv(className = "", innerText = "", id = "")
{
    let newDiv = document.createElement("div");
    newDiv.className = className;
    newDiv.innerText = innerText;
    newDiv.id = id;
    return newDiv;
}

function NewBtn(className = "", innerText = "", id = "")
{
    let newBtn = document.createElement("button");
    newBtn.className = className;
    newBtn.innerText = innerText;
    newBtn.id = id;
    return newBtn;
}

function NewH5(className = "", innerText = "", id = "")
{
    let newH5 = document.createElement("h5");
    newH5.className = className;
    newH5.innerText = innerText;
    newH5.id = id;
    return newH5;
}

function NewP(className = "", innerText = "", id = "")
{
    let newP = document.createElement("p");
    newP.className = className;
    newP.innerText = innerText;
    newP.id = id;
    return newP;
}

function NewUl(className = "", innerText = "", id = "")
{
    let newUl = document.createElement("ul");
    newUl.className = className;
    newUl.innerText = innerText;
    newUl.id = id;
    return newUl;
}

function NewLi(className = "", innerText = "", id = "")
{
    let newLi = document.createElement("li");
    newLi.className = className;
    newLi.innerText = innerText;
    newLi.id = id;
    return newLi;
}

function ShowSubject(sub)
{
    HideSubject(sub);

    let subCardCount = rows.childElementCount;

    let newSub = NewDiv("col-4 my-3", "", "subject" + subCardCount);

    let newCard = NewDiv("card text-bg-dark");

    let addBtn = NewBtn("btn btn-outline-light btn-sm position-absolute top-0 end-0 m-3 border-2 ", 
        "ADD");
    addBtn.setAttribute("data-bs-toggle", "modal");
    addBtn.setAttribute("data-bs-target", "#exampleModal");
    addBtn.addEventListener("click", 
        function ()
        {
            addTopic.replaceWith(addTopic.cloneNode(true));
            addTopic = document.getElementById("add-topic");
            addTopic.addEventListener("click", 
                function ()
                {
                    CreateTopic(sub);
                }
            );
            //CreateTopic(sub);
        }
    );
    newCard.appendChild(addBtn);
    
    let newBody = NewDiv("card-body");
    newBody.appendChild(NewH5("card-title", sub.name));
    newBody.appendChild(NewP("card-text", sub.description));
    newCard.appendChild(newBody);

    let newList = NewUl("list-group list-group-flush", "", "subject-card" + sub.depth);
    newCard.appendChild(newList);

    newSub.appendChild(newCard);
    rows.appendChild(newSub);

    ShowTopics(sub);
}

function ShowTopics(sub)
{
    let i = 0;

    while (i < sub.subjects.length)
    {
        AddTopic(sub.subjects[i]);
        i++;
    }
}

function CreateTopic(sub)
{
    const newSub = sub.AddSubject(topicName.value, topicDescription.value);
    AddTopic(newSub);
}

function AddTopic(sub)
{
    const subcard = document.getElementById("subject-card" + (sub.depth - 1));
    const count = subcard.childElementCount;

    let topcard = document.createElement("li");
    topcard.className = "list-group-item d-flex justify-content-between align-items-start collapsed";
    topcard.setAttribute("data-bs-toggle", "collapse");
    topcard.setAttribute("href", "#topicDescription" + (sub.depth - 1) + "" + count);
    topcard.setAttribute("aria-expanded", "false");
    topcard.setAttribute("aria-controls", "topicDescription" + (sub.depth - 1) + "" + count);

    let content = document.createElement("div");
    content.className = "ms-2 me-auto";

    let header = document.createElement("div");
    header.className = "fw-bold";
    header.textContent = sub.name;
    
    content.appendChild(header);

    let collapse = document.createElement("div");
    collapse.className = "collapse";
    collapse.id = "topicDescription" + (sub.depth - 1) + "" + count;
    collapse.textContent = sub.description;

    content.appendChild(collapse);

    topcard.appendChild(content);

    let badge = document.createElement("div");
    badge.className = "badge text-bg-dark rounded-pill";
    badge.setAttribute("type", "button");
    badge.innerText = "SHOW";
    badge.addEventListener("click", 
        function ()
        {
            if (badge.innerText == "SHOW")
            {
                const badges = subcard.querySelectorAll(".badge");
                let i = 0;
                while (i < badges.length)
                {
                    badges[i].innerText = "SHOW";
                    i++;
                }
                const items = subcard.querySelectorAll(".list-group-item");
                i = 0;
                while (i < items.length)
                {
                    items[i].setAttribute("data-bs-toggle", "collapse");
                    items[i].classList.add("list-group-item-dark");
                    i++;
                }
                ShowSubject(sub);
                badge.innerText = "HIDE";
                if (topcard.className.includes("collapsed")) new bootstrap.Collapse(collapse);
                topcard.setAttribute("data-bs-toggle", "");
                topcard.classList.remove("list-group-item-dark");
                
            }
            else if (badge.innerText == "HIDE")
            {
                const items = subcard.querySelectorAll(".list-group-item");
                let i = 0;
                while (i < items.length)
                {
                    items[i].classList.remove("list-group-item-dark");
                    i++;
                }
                HideSubject(sub);
                badge.innerText = "SHOW";
                //if (!topcard.className.includes("collapsed")) collapse.className = "collapse";
                topcard.setAttribute("data-bs-toggle", "collapse");
            }
        }
    );

    topcard.appendChild(badge);

    subcard.appendChild(topcard);
}

function HideSubject(sub)
{
    let i = sub.depth;
    while (rows.childElementCount > i)
    {
        const lastChild = rows.lastChild;
        lastChild.innerHTML = "";
        rows.removeChild(lastChild);
    }
}