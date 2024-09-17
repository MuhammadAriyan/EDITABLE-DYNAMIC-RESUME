"use strict";
const skills = document.getElementById('skills');
const skillButton = document.getElementById('btnS');
const expform = document.getElementById('expform');
const addexp = document.getElementById('addexp');
const addskills = document.getElementById('addskills');
const skillform = document.getElementById('skillform');
const formInEdu = document.getElementById('formInEdu');
const addedu = document.getElementById('addedu');
const resumeOutput = document.getElementById('resumeOutput');
const form = document.getElementById('form');
const makeform = document.getElementById('makeform');
const pstitle = document.getElementById('pstitle');
const pdfGen = document.getElementById('pdfGen');
const addimage = document.getElementById('add-image');
const pfp = document.getElementById('pfp');
const imgLoader = () => {
    const addimage = document.getElementById('add-image');
    const pfp = document.getElementById('pfp');
    const file = addimage.files?.[0];
    if (file) {
        const url = URL.createObjectURL(file);
        pfp.src = url;
        const read = new FileReader();
        read.onload = () => {
            pfp.src = read.result;
            console.log('pfp changed');
        };
        read.readAsDataURL(file);
    }
    else {
        console.log("file is false");
    }
};
const updateSkillButtonText = () => {
    if (skills.classList.contains('hidden')) {
        skillButton.textContent = 'SHOW SKILLS';
    }
    else {
        skillButton.textContent = 'HIDE SKILLS';
    }
};
if (skillButton) {
    skillButton.addEventListener('click', () => {
        skills.classList.toggle('hidden');
        updateSkillButtonText();
    });
}
else {
    console.error('skillButton element is missing!');
}
const mainExpForm = document.getElementById('mainexpForm');
addexp.addEventListener('click', () => {
    const expformClone = expform.cloneNode(true);
    mainExpForm?.appendChild(expformClone);
});
const mainEduForm = document.getElementById('maineduForm');
addedu.addEventListener('click', () => {
    const formInEduClone = formInEdu.cloneNode(true);
    mainEduForm?.appendChild(formInEduClone);
});
if (pdfGen) {
    pdfGen.addEventListener('click', () => {
        window.print();
    });
}
const mainSkillForm = document.getElementById('mainskillForm');
addskills.addEventListener('click', () => {
    const skillformClone = skillform.cloneNode(true);
    mainSkillForm?.appendChild(skillformClone);
});
const resumeGen = () => {
    imgLoader();
    const Name = document.getElementById('name')?.value || '-';
    const fatherName = document.getElementById('fname')?.value || '-';
    const email = document.getElementById('email')?.value || '-';
    const contact = document.getElementById('contact')?.value || '-';
    const address = document.getElementById('address')?.value || '-';
    const eduInputs = Array.from(document.querySelectorAll('#formInEdu input'));
    const edu = eduInputs.map(input => input.value);
    const workInputs = Array.from(document.querySelectorAll('#expform input'));
    const work = workInputs.map(input => input.value);
    const skillInputs = Array.from(document.querySelectorAll('#skillform input'));
    const skills = skillInputs.map(input => input.value.trim());
    console.log('Name:', Name);
    console.log('Father Name:', fatherName);
    console.log('Email:', email);
    console.log('Contact:', contact);
    console.log('Address:', address);
    console.log('Education:', edu);
    console.log('Work:', work);
    console.log('Skills:', skills);
    const eduJoin = edu.reduce((acc, inp, index) => {
        if ((index + 1) % 4 === 0) {
            acc += inp + '<br>';
        }
        else {
            acc += inp + ' | ';
        }
        return acc;
    }, '');
    const workJoin = work.reduce((acc, inp, index) => {
        if ((index + 1) % 3 === 0) {
            acc += inp + '<br>';
        }
        else {
            acc += inp + ' | ';
        }
        return acc;
    }, '');
    const skillJoin = skills.map(inp => `<li>${inp}</li>`).join(' ');
    const allInputs = [Name, fatherName, contact, address, ...edu, ...work, ...skills];
    const isEmpty = allInputs.some(ele => ele.trim() === '');
    console.log('isEmpty:', isEmpty);
    const htmlOfResume = `
        <div class="resume">
            <h2>RESUME</h2>
            <hr>
            <img src="${document.getElementById('pfp')?.src}" alt="pfp" id="pfp" class="pfpImg" />
            <h3>PERSONAL INFORMATION</h3>
            <h4>NAME : ${Name}</h4>
            <h4>FATHER NAME : ${fatherName}</h4>
            <h4>EMAIL : ${email}</h4>
            <h4>CONTACT INFO : ${contact}</h4>
            <h4>ADDRESS : ${address}</h4>
            <h3>EDUCATION</h3>
            <h4>${eduJoin}</h4>
            <h3>WORKING EXPERIENCE</h3>
           <h4>${workJoin}</h4>
           <h3>SKILLS</h3>
            <ul>
                ${skillJoin}
            </ul>
        </div>
    `;
    if (!isEmpty && resumeOutput && form) {
        resumeOutput.innerHTML = htmlOfResume;
    }
    else if (resumeOutput) {
        resumeOutput.innerHTML = '<h2>Please fill out all mandatory fields before generating the resume.</h2>';
    }
    else {
        alert('SOMETHING BAD HAPPENED');
    }
};
