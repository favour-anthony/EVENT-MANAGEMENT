let storage = localStorage.getItem('attendees');
let attendees = !storage ? [] : JSON.parse(storage);
let btnAddAttendee = document.getElementById("add-attendee-btn");
let btnfindattendee = document.getElementById("find-attendee-btn")
let btn_remove_attendee = document.getElementById("remove-attendee-btn")
console.log(attendees)
btnAddAttendee.addEventListener('click', ()=> {
    let attendee_name = document.getElementById('attendee-name');
    console.log(attendee_name)
    let name = attendee_name.value.trim().toUpperCase();
    let regexp = /^[a-zA-Z ]*$/
    if (name == "") {
        // nameInput.focus();
        attendee_name.style.borderColor = 'red';
    } else if (!regexp.test(name)) {
        attendee_name.style.borderColor = 'red';
        // alert('A name does not contain a number or character')
    } else {
        attendee_name.style.borderColor = 'green';

        let attendee = attendees.find(x => x.name.toUpperCase() == name);
        if (attendee) {
            alert('attendee already exist')
        } else {
            let attendee = {
                name,
            }
            attendees.push(attendee)
            alert('added successfully');
            attendee_name.value = ""
        }
    }
    console.log(attendees)
});




btnfindattendee.addEventListener('click', () =>{
    
    let findattendee = document.getElementById('find_attendee-name');
    let attendeename = findattendee.value.trim().toUpperCase();

    if (attendeename == '') {
        alert('enter the attendees name')
    } else {
        let attendee = attendees.find((x) => x.name.toUpperCase() == attendeename);
        if (!attendee) {
            alert(`${attendeename} was not found`)
            document.getElementById('message').innerHTML = '';
        } else {
            let reply = `<ul>
                <li>${attendee.name}</li>
            </ul>`;
            document.getElementById('message').innerHTML = reply;
        }
    }
    
})

btn_remove_attendee.addEventListener('click', () => {
    let attendeeNameInput = document.getElementById("remove_attendee-name");
    let attendee_Name = attendeeNameInput.value.trim().toUpperCase();

    if (attendee_Name == '') {
        alert('enter the attendees name')
    }
    else{
        let attendee = attendees.find((x) => x.name.toUpperCase() == attendee_Name);
        if (!attendee) {
            alert(`${attendee_Name} was not found`)
            document.getElementById('message').innerHTML = '';
        } else{
            let Index = attendees.findIndex((x) => x.name.toUpperCase() == attendee_Name);
            if (Index >= 0) {
                attendees.splice(Index, 1)
            }
            alert(`attendee ${attendee_Name} was removed `)
        }
    }   
})


function listattendees() {
    let reply = `<ul id="attendee-list">`;
    attendees.forEach(attendee => {
        reply += `<li>${attendee.name}</li>`;
    });
    reply += `</ul>`;

    document.getElementById('message2').innerHTML = reply;
}
// function to save list to localstorage
function updateLocalStorage() {
    localStorage.setItem('attendees', JSON.stringify(attendees));
}