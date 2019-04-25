function cancelNew() {
    element_preview.innerHTML = "";
    element_content.value = "";
}

function addNew() {
    let new_element = document.createElement("li");
    new_element.innerHTML = element_content.value;
    new_element.innerHTML += "<i class='far fa-edit edit-button'></i>";
    new_element.innerHTML += "<i class='fas fa-trash-alt delete-button'></i>";
    created_elements.appendChild(new_element);

    element_preview.innerHTML = "";
    element_content.value = "";
    checkExercise();
}

function composeTagData(tag) {
    let complete = "<" + tag.type;
    for (attribute of tag.attributes) {
        complete += " " + attribute();
    }

    complete += ">";
    let cursor_offset = complete.length

    if (tag.closed) {
        complete += "</" + tag.type + ">";
    }
    return [complete, cursor_offset];
}

function insertHTML(event) {
    const VALUE = element_content.value
    const START = element_content.selectionStart;
    const END = element_content.selectionEnd;

    target_tag = findObject(tags, "type", event.target.id);

    target_tag_data = composeTagData(target_tag);
    target_tag.complete = target_tag_data[0];
    target_tag.cursor_offset = target_tag_data[1];

    element_content.value = VALUE.slice(0, START) + target_tag.complete + VALUE.slice(END);
    element_content.selectionStart = element_content.selectionEnd = START + target_tag.cursor_offset;

    element_content.focus();
    updatePreview();
}

function findObject(array, key, value) {
    for (item of array) {
        if (item[key] === value) {
            return item;
        }
    }
}

function updatePreview() {
    element_preview.innerHTML = element_content.value;
}

function editContent() {
    if (event.target.classList.contains("edit-button")) {
        let edit_input = document.createElement("textarea");
        let parent_node = event.target.parentNode;
        let first_child = parent_node.firstChild;
        edit_input.innerHTML = first_child.outerHTML;
        parent_node.innerHTML = edit_input.outerHTML;
        parent_node.innerHTML += "<i class='far fa-save save-button'></i>";
    }
}

function deleteContent(event) {
    if (event.target.classList.contains("delete-button")) {
        let element_to_remove = event.target.parentNode;
        element_to_remove.remove();
        checkExercise();
    }
}

function saveContent(event) {
    if (event.target.classList.contains("save-button")) {
        let parent_node = event.target.parentNode;
        let first_child_content = parent_node.firstChild.value;
        parent_node.innerHTML = first_child_content;
        parent_node.innerHTML += "<i class='far fa-edit edit-button'></i>";
        parent_node.innerHTML += "<i class='fas fa-trash-alt delete-button'></i>";
        checkExercise();
    }
}
//==================== Between here and the NEXT line, you are allowed to edit! ====================

//Here you can add JS functions to generate more attributes. Just follow the examples:
function getHREF() {
    return "href=\"" + prompt("Please enter the url:") + "\"";
}

function getSRC() {
    return "src=\"" + prompt("Please enter the url:") + "\"";
}

function getALT() {
    return "alt=\"" + prompt("Please enter the alternative text:") + "\"";
}

function getCLASS() {
    return "class=\"" + prompt("Please enter the classes (seperated with a space):") + "\"";
}

function getTYPE() {
    return "type=\"" + prompt("Please enter the type:") + "\"";
}

function getCOLOR() {
    return "color=\"" + prompt("Please enter the name of a color:") + "\"";
}


//==================== Between here and the PREVIOUS line, you are allowed to edit! ====================

function checkExercise() {
    for (let i = 0; i < created_elements.childElementCount; i++) {
        for (let j = 0; j < exercise_elements.childElementCount; j++) {
            // console.log(created_elements.children[i].firstElementChild.outerHTML.replace(/\s+/g, ''));
            // console.log(exercise_elements.children[j].firstElementChild.outerHTML.replace(/\s+/g, ''));
            if(created_elements.children[i].firstElementChild.outerHTML.replace(/\s+/g, '') === exercise_elements.children[j].firstElementChild.outerHTML.replace(/\s+/g, '')) {
                if (i === j) {
                    created_elements.children[i].className = "great";
                }

                else {
                    created_elements.children[i].className = "good";
                }

                break;
            }

            else {
                created_elements.children[i].className = "bad";
            }
        }
    }
}

function removeDraggable() {
    let list_to_edit = document.querySelectorAll("*[draggable]");
    for (element of list_to_edit) {
        element.removeAttribute("draggable");
    }
    checkExercise();
}

let creation_window = document.getElementById("creation_window");
let insert_buttons = document.getElementById("insert_buttons");
let element_content = document.getElementById("element_content");
let element_preview = document.getElementById("element_preview");
let cancel_new_button = document.getElementById("cancel_new");
let add_new_button = document.getElementById("add_new");
let created_elements = document.getElementById("created_elements");
let exercise_elements = document.getElementById("exercise_elements");

//==================== Between here and the NEXT line, you are allowed to edit! ====================

//Here you can add JS objects to generate more tags. Just follow the examples:
let tags = [
    {display_name: "Heading 1", type: "h1", attributes: [], closed: true},
    {display_name: "Heading 3", type: "h3", attributes: [], closed: true},
    {display_name: "Paragraph", type: "p", attributes: [], closed: true},
    {display_name: "List Item", type: "li", attributes: [], closed: true},
    {display_name: "font color", type: "font", attributes: [getCOLOR], closed: true}
];

//==================== Between here and the PREVIOUS line, you are allowed to edit! ====================

for (tag of tags) {
    let new_li = document.createElement("li");
    let new_button = document.createElement("button");

    new_button.innerHTML = tag.display_name;
    new_button.setAttribute("id", tag.type);
    new_button.addEventListener("click", insertHTML);

    new_li.appendChild(new_button);
    insert_buttons.appendChild(new_li);
}

cancel_new_button.addEventListener("click", cancelNew);
add_new_button.addEventListener("click", addNew);
element_content.addEventListener("keyup", updatePreview);

document.addEventListener("click", editContent);
document.addEventListener("click", deleteContent);
document.addEventListener("click", saveContent);
document.addEventListener("drop", removeDraggable);
document.addEventListener("dragend", removeDraggable);

new Sortable(created_elements, {animation: 150});

/*
 * Mijn javascript
*/
function changeTheme(){
    let element = document.getElementById('student');
    element.classList.toggle('theme');

}

function changeHeader(){
    let element = document.querySelectorAll('h1, h2, h3');
    //element[0].classList.toggle('header');
    element[0].classList.toggle('header');
    element[1].classList.toggle('header');
    element[2].classList.toggle('header');
    element[3].classList.toggle('header');
    element[4].classList.toggle('header');
}

function changeTextColor(){
    let element = document.querySelectorAll('p');
    element[0].classList.toggle('textColor');
    element[1].classList.toggle('textColor');
    element[2].classList.toggle('textColor');
    element[3].classList.toggle('textColor');

}

function changeFont() {
    let element = document.querySelector('body');
    element.classList.toggle('font');
}


