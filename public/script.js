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
const Name = document.getElementById('name')?.value || '-';
const fatherName = document.getElementById('fname')?.value || '-';
const email = document.getElementById('email')?.value || '-';
const contact = document.getElementById('contact')?.value || '-';
const address = document.getElementById('address')?.value || '-';
const pdfGen = document.getElementById('pdfGen');
if (skillButton) {
    skillButton.addEventListener('click', () => {
        skills.classList.toggle("hidden");
        if (skills.classList.contains('hidden')) {
            skillButton.textContent = 'SHOW SKILLS';
        }
        else {
            skillButton.textContent = 'HIDE SKILLS';
        }
    });
}
else {
    console.error('something bad happened!');
}
if (addexp) {
    addexp.addEventListener('click', () => {
        if (expform) {
            const expform2 = expform.cloneNode(true);
            expform.appendChild(expform2);
        }
    });
}
if (addedu) {
    addedu.addEventListener('click', () => {
        if (formInEdu) {
            const formInEdu2 = formInEdu.cloneNode(true);
            formInEdu.appendChild(formInEdu2);
        }
    });
}
if (pdfGen) {
    pdfGen.addEventListener('click', (() => {
        window.print();
    }));
}
if (addskills) {
    addskills.addEventListener('click', () => {
        if (skillform) {
            const skillform2 = skillform.cloneNode(true);
            skillform.appendChild(skillform2);
        }
    });
}
let newformarr;
const resumeGen = () => {
    const Name = document.getElementById('name')?.value;
    const fatherName = document.getElementById('fname')?.value;
    const email = document.getElementById('email')?.value;
    const contact = document.getElementById('contact')?.value;
    const address = document.getElementById('address')?.value;
    const edu = Array.from(document.querySelectorAll('#formInEdu input')).map(inp => inp.value);
    const work = Array.from(document.querySelectorAll('#expform input')).map(inp => inp.value);
    const skills = Array.from(document.querySelectorAll('#skillform input')).map(inp => inp.value.trim());
    let eduJoin = '';
    let workJoin = '';
    edu.forEach((inp, index) => {
        if (((index + 1) % 4 === 0)) {
            eduJoin += inp + '<br>';
        }
        else {
            eduJoin += inp + ' | ';
        }
    });
    work.forEach((inp, index) => {
        if (((index + 1) % 3 === 0)) {
            workJoin += inp + '<br>';
        }
        else {
            workJoin += inp + ' | ';
        }
    });
    const skillJoin = skills.map(inp => `<li>${inp}</li>`).join(` `);
    const allInp = [Name, fatherName, contact, address, ...edu, ...work, ...skills];
    const isEmpty = allInp.some(ele => ele === '');
    const htmlOfResume = `
        <div class="resume">
        <h2>RESUME</h2>
        <hr>
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
        let errorResume = ` 
            <h2>Please fill out all mandatory fields before generating the resume.</h2>
            `;
        resumeOutput.innerHTML = errorResume;
    }
    else {
        alert(`SOMETHING BAD HAPPENED`);
    }
};
