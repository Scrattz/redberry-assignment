const newResumeBtn = document.querySelector(".newResume");
const landingPage = document.querySelector(".landingPage");
const formsAndPreview = document.querySelector(".formsAndPreview");
const personalInfo = document.querySelector(".personalInfo");
const resPreview = document.querySelector(".resPreview");
const resItems = document.querySelectorAll(".resItem");
const experienceInputs = document.querySelector(".experienceInputs");
const experienceInputsTemplate = document.querySelector(
  ".experienceInputsTemplate"
);
const educationInputs = document.querySelector(".educationInputs");
const educationInputsTemplate = document.querySelector(
  ".educationInputsTemplate"
);
const addExpBtn = document.querySelector(".addExperience");
const addInstBtn = document.querySelector(".addInstitution");
const experience = document.querySelector(".experience");
const resExperience = document.querySelector(".resExperience");
const education = document.querySelector(".education");
const resEducation = document.querySelector(".resEducation");
const goToLandingPage = document.querySelector(".goToLandingPage");
const nextBtn = document.querySelector(".nextBtn");
const backBtn = document.querySelector(".backBtn");
const submitBtn = document.querySelector(".submitBtn");
const apiBaseURL = "https://resume.redberryinternship.ge/api";

async function getData() {
  try {
    const response = await fetch(`${apiBaseURL}/degrees`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

const selectOptions = getData();
selectOptions
  .then((options) => {
    for (const edu of sessionObj.educations) {
      edu.degreeType.options = options;
      updateFormData();
    }
  })
  .catch((error) => {
    console.log(error);
  });

// let selectElements = document.getElementsByName("degree");
// selectElements.forEach((selectElement) => {
//   console.log(selectElement);
//   selectOptions.then((options) => {
//     options.forEach((option) => {
//       let optionElement = document.createElement("option");
//       optionElement.value = option.id;
//       optionElement.innerHTML = option.title;
//       selectElement.appendChild(optionElement);
//     });
//   });
// });

const getEducationTemplate = () => {
  return {
    institution: {
      id: "institution",
      validationType: "textAreaType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    degreeType: {
      id: "degreeType",
      validationType: "selectionType",
      value: "",
      options: [],
      isValid: false,
      wasEdited: false,
    },
    gradDate: {
      id: "gradDate",
      validationType: "dateType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    aboutEducation: {
      id: "aboutEducation",
      validationType: "textAreaType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
  };
};

const getExperienceTemplate = () => {
  return {
    position: {
      id: "position",
      validationType: "textAreaType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    employer: {
      id: "employer",
      validationType: "textAreaType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    startDate: {
      id: "startDate",
      validationType: "dateType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    endDate: {
      id: "endDate",
      validationType: "timeFrameType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    aboutExperience: {
      id: "aboutExperience",
      validationType: "textAreaType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
  };
};

let sessionObj = {
  firstName: {
    id: "firstName",
    validationType: "nameType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  lastName: {
    id: "lastName",
    validationType: "nameType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  email: {
    id: "email",
    validationType: "mailType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  phoneNumber: {
    id: "phoneNumber",
    validationType: "phoneNumberType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  experiences: [],
  educations: [],
  img: {
    id: "img",
    validationType: "imgType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  aboutMe: {
    id: "aboutMe",
    validationType: "textAreaNotRequired",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  currentPage: {
    personalInfo: false,
    experience: false,
    education: false,
  },
};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",

    body: JSON.stringify(data),
  });
  return await response;
}

document.addEventListener("DOMContentLoaded", () => {
  if (sessionObj.currentPage.personalInfo === true) {
    showFormsAndPreview();
    handleShowAndHidePersonalInfoForm("show");
    nextBtn.classList.add("show");
    for (const [key, value] of Object.entries(sessionObj)) {
      if (
        value !== "experiences" &&
        value !== "educations" &&
        value !== "currentPage"
      ) {
        let inputElement = document.querySelector(`#${value.id}`);
        validateInputs(inputElement, value.validationType);
      }
    }
    return;
  } else if (sessionObj.currentPage.experience === true) {
    showFormsAndPreview();
    handleShowAndHideExperienceForm("show");
    backBtn.classList.add("show");
    nextBtn.classList.add("show");
    for (const objects of sessionObj.experiences) {
      for (const [key, value] of Object.entries(objects)) {
        let inputElement = document.querySelector(`#${value.id}`);
        validateInputs(inputElement, value.validationType);
      }
    }
    return;
  } else if (sessionObj.currentPage.education === true) {
    showFormsAndPreview();
    handleShowAndHideEducationForm("show");
    backBtn.classList.add("show");
    submitBtn.classList.add("show");
    for (const objects of sessionObj.educations) {
      for (const [ke, value] of Object.entries(objects)) {
        let inputElement = document.querySelector(`#${value.id}`);
        validateInputs(inputElement, value.validationType);
      }
    }

    return;
  }
  landingPage.classList.add("show");
  landingPage.classList.add("directionColumn");
});

const sessionInfo = sessionStorage.getItem("formData");

const updateFormData = () => {
  const sessionObjJSON = JSON.stringify(sessionObj);
  sessionStorage.setItem("formData", sessionObjJSON);
};

if (sessionInfo === null) {
  updateFormData();
} else {
  sessionObj = JSON.parse(sessionInfo);
}

const showFormsAndPreview = () => {
  landingPage.classList.remove("show");
  formsAndPreview.classList.add("show");
};

const handleShowAndHidePersonalInfoForm = (condition) => {
  if (condition === "show") {
    personalInfo.classList.add("show");
    sessionObj.currentPage.personalInfo = true;
  } else if (condition === "hide") {
    personalInfo.classList.remove("show");
    sessionObj.currentPage.personalInfo = false;
  }
  updateFormData();
};

const handleShowAndHideExperienceForm = (condition) => {
  if (condition === "show") {
    experience.classList.add("show");
    sessionObj.currentPage.experience = true;
  } else if (condition === "hide") {
    experience.classList.remove("show");
    sessionObj.currentPage.experience = false;
  }
  updateFormData();
};

const handleShowAndHideEducationForm = (condition) => {
  if (condition === "show") {
    education.classList.add("show");
    sessionObj.currentPage.education = true;
  } else if (condition === "hide") {
    education.classList.remove("show", ".directionColumn");
    sessionObj.currentPage.education = false;
  }
  updateFormData();
};

window.addEventListener("click", (e) => {
  for (let elem of e.composedPath()) {
    if (elem === newResumeBtn) {
      showFormsAndPreview();
      handleShowAndHidePersonalInfoForm("show");
      nextBtn.classList.add("show");
    } else if (elem === goToLandingPage) {
      sessionStorage.clear();
      location.replace(location.pathname);
    } else if (elem === addExpBtn) {
      e.preventDefault();
      // let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
      // newExperienceInputs.classList.remove("experienceInputsTemplate");

      // let newExperienceInputsObj = getExperienceTemplate();
      // for (const [key, value] of Object.entries(newExperienceInputsObj)) {
      //   let newExperienceInput = newExperienceInputs.querySelector(
      //     "#" + value.id
      //   );
      //   let newExperienceLabel = newExperienceInputs.querySelector(
      //     `[for=${value.id}]`
      //   );
      //   value.id = `${value.id}${sessionObj.experiences.length + 1}`;
      //   newExperienceInput.id = value.id;
      //   newExperienceLabel.setAttribute("for", value.id);
      // }
      // experience.insertBefore(newExperienceInputs, addExpBtn);
      // for (const [key, value] of Object.entries(newExperienceInputsObj)) {
      //   addListenersAndUpdate(key, value);
      // }

      // sessionObj.experiences.push(newExperienceInputsObj);
      // const sessionObjJSON = JSON.stringify(sessionObj);
      // sessionStorage.setItem("formData", sessionObjJSON);

      createNewExpInputs(sessionObj.experiences.length + 1, true);
    } else if (elem === addInstBtn) {
      e.preventDefault();
      createNewEduInputs(sessionObj.educations.length + 1, true);
    } else if (elem === nextBtn) {
      if (sessionObj.currentPage.personalInfo === true) {
        handleShowAndHidePersonalInfoForm("hide");
        handleShowAndHideExperienceForm("show");
        backBtn.classList.add("show");
      } else if (sessionObj.currentPage.experience === true) {
        handleShowAndHideExperienceForm("hide");
        handleShowAndHideEducationForm("show");
        nextBtn.classList.remove("show");
        submitBtn.classList.add("show");
      }
    } else if (elem === backBtn) {
      if (sessionObj.currentPage.experience === true) {
        handleShowAndHidePersonalInfoForm("show");
        handleShowAndHideExperienceForm("hide");
        backBtn.classList.remove("show");
      } else if (sessionObj.currentPage.education === true) {
        handleShowAndHideExperienceForm("show");
        handleShowAndHideEducationForm("hide");
        submitBtn.classList.remove("show");
        nextBtn.classList.add("show");
      }
    } else if (elem === submitBtn) {
      const {
        firstName,
        lastName,
        email,
        phoneNumber,
        experiences,
        educations,
        img,
        aboutMe,
      } = sessionObj;
      const formData = {
        name: firstName.value,
        surname: lastName.value,
        email: email.value,
        phone_number: phoneNumber.value,
        experiences: experiences.map((experience) => experience.value),
        educations: educations.map((education) => education.value),
        image: img.value,
        about_me: aboutMe.value,
      };
      let exp = experiences.map((experience) => experience.value);
      console.log(exp);
      console.log(formData);
      postData(`${apiBaseURL}/cvs`, formData)
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }
  }
});

// function updateInput(e) {
//   const fr = new FileReader();
//   fr.readAsDataURL(e.target.files[0]);
//   fr.addEventListener("load", () => {
//     setPhoto(fr.result);
//   });
// }

//   let blobPhoto;

//   fetch(photo)
//     .then((res) => res.blob())
//     .then((blob) => (blobPhoto = blob));

const addListenersAndUpdate = (key, value) => {
  let inputElement = document.querySelector(`#${value.id}`);
  if (!inputElement) {
    return null;
  }
  let previousValue = value.value;
  inputElement.value = previousValue;

  inputElement.addEventListener("input", (e) => {
    if (e.target.id === "img") {
      const file = e.target.files[0];
      const fr = new FileReader();
      fr.onload = function () {
        const blob = new Blob([fr.result], { type: file });
      };
      fr.readAsArrayBuffer(file);
      sessionObj.img.value = blob;
      updateFormData();
    }
    value.value = e.target.value;
    // updates info in resPreview
    for (let item of resItems) {
      if (item.classList.contains(`${key}Res`)) {
        if (item.previousElementSibling) {
          item.previousElementSibling.classList.add("show");
        }
        item.classList.add("show");
        item.innerHTML = e.target.value;
      }
    }
    updateFormData();
    validateInputs(e.target, value.validationType);
  });

  inputElement.addEventListener("blur", (e) => {
    validateInputs(e.target, value.validationType);
  });
};

const createNewExpInputs = (num, shouldUpdate) => {
  let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
  newExperienceInputs.classList.remove("experienceInputsTemplate");
  let newExperienceObj = getExperienceTemplate();
  for (const [key, value] of Object.entries(newExperienceObj)) {
    let newExperienceInput = newExperienceInputs.querySelector("#" + value.id);
    let newExperienceLabel = newExperienceInputs.querySelector(
      `[for=${value.id}]`
    );
    value.id = `${value.id}${num}`;
    newExperienceInput.id = value.id;
    newExperienceLabel.setAttribute("for", value.id);
  }

  if (shouldUpdate) {
    sessionObj.experiences.push(newExperienceObj);
    updateFormData();
  }

  experience.insertBefore(newExperienceInputs, addExpBtn);
  for (const [key, value] of Object.entries(newExperienceObj)) {
    addListenersAndUpdate(key, value);
  }
};

const createNewEduInputs = (num, shouldUpdate) => {
  let newEducationInputs = educationInputsTemplate.cloneNode(true);
  newEducationInputs.classList.remove("educationInputsTemplate");

  let newEducationObj = getEducationTemplate();

  for (const [key, value] of Object.entries(newEducationObj)) {
    let newEducationInput = newEducationInputs.querySelector("#" + value.id);
    let newEducationLabel = newEducationInputs.querySelector(
      `[for=${value.id}]`
    );
    value.id = `${value.id}${num}`;
    newEducationInput.id = value.id;
    newEducationLabel.setAttribute("for", value.id);
  }

  if (shouldUpdate) {
    sessionObj.educations.push(newEducationObj);
    updateFormData();
  }

  education.insertBefore(newEducationInputs, addInstBtn);
  for (const [key, value] of Object.entries(newEducationObj)) {
    addListenersAndUpdate(key, value);
  }
};

if (sessionObj.experiences.length === 0) {
  // let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
  // newExperienceInputs.classList.remove("experienceInputsTemplate");

  // let newExperienceInputsObj = getExperienceTemplate();
  // for (const [key, value] of Object.entries(newExperienceInputsObj)) {
  //   let newExperienceInput = newExperienceInputs.querySelector("#" + value.id);
  //   let newExperienceLabel = newExperienceInputs.querySelector(
  //     `[for=${value.id}]`
  //   );
  //   value.id = `${value.id}${1}`;
  //   newExperienceInput.id = value.id;
  //   newExperienceLabel.setAttribute("for", value.id);
  // }

  // sessionObj.experiences.push(newExperienceInputsObj);
  // const sessionObjJSON = JSON.stringify(sessionObj);
  // sessionStorage.setItem("formData", sessionObjJSON);
  // experience.insertBefore(newExperienceInputs, addExpBtn);
  // for (const [key, value] of Object.entries(newExperienceInputsObj)) {
  //   addListenersAndUpdate(key, value);
  // }

  createNewExpInputs(1, true);
} else {
  for (let i = 0; i < sessionObj.experiences.length; i++) {
    let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
    newExperienceInputs.classList.remove("experienceInputsTemplate");
    let currentExperienceObj = sessionObj.experiences[i];
    for (const [key, value] of Object.entries(currentExperienceObj)) {
      let newExperienceInput = newExperienceInputs.querySelector("#" + key);
      let newExperienceLabel = newExperienceInputs.querySelector(
        `[for=${key}]`
      );

      newExperienceInput.id = value.id;
      newExperienceLabel.setAttribute("for", value.id);
    }
    experience.insertBefore(newExperienceInputs, addExpBtn);
    for (const [key, value] of Object.entries(currentExperienceObj)) {
      addListenersAndUpdate(key, value);
    }
  }
}

if (sessionObj.educations.length === 0) {
  createNewEduInputs(1, true);
} else {
  for (let i = 0; i < sessionObj.educations.length; i++) {
    let newEducationInputs = educationInputsTemplate.cloneNode(true);
    newEducationInputs.classList.remove("educationInputsTemplate");
    let currentEducationObj = sessionObj.educations[i];
    for (const [key, value] of Object.entries(currentEducationObj)) {
      let newEducationInput = newEducationInputs.querySelector("#" + key);
      let newEducationLabel = newEducationInputs.querySelector(`[for=${key}]`);

      newEducationInput.id = value.id;
      newEducationLabel.setAttribute("for", value.id);
    }

    education.insertBefore(newEducationInputs, addInstBtn);
    for (const [key, value] of Object.entries(currentEducationObj)) {
      addListenersAndUpdate(key, value);
    }
  }
}

for (const [key, value] of Object.entries(sessionObj)) {
  if (key !== "experiences" && key !== "educations" && key !== "currentPage") {
    addListenersAndUpdate(key, value);
  }
}

phoneNumber.addEventListener("keydown", (e) => {
  if (
    e.key !== "+" &&
    e.key !== "Backspace" &&
    e.key !== "ArrowLeft" &&
    e.key !== "ArrowRight" &&
    e.key !== " " &&
    isNaN(parseInt(e.key))
  ) {
    e.preventDefault();
  }
});

const startDateInputElement = document.querySelector("#startDate1");
const classCheckAndRemove = (inputElement) => {
  if (inputElement.classList.contains("invalid")) {
    inputElement.classList.remove("invalid");
  } else if (inputElement.classList.contains("valid")) {
    inputElement.classList.remove("valid");
  }
};
const validateInputs = (inputElement, validationType) => {
  if (validationType === "textAreaType") {
    if (inputElement.value.length >= 2) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "textAreaNotRequired") {
    if (inputElement.value) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      inputElement.classList.remove("valid");
    }
  } else if (validationType === "phoneNumberType") {
    let phoneNum = inputElement.value;
    let arr = phoneNum.split(" ");
    for (let elem of arr) {
      if (isNaN(parseInt(elem))) {
        let index = arr.indexOf(elem);
        arr.splice(index, 1);
        phoneNum = arr.join("");
      }
    }
    if (phoneNum.startsWith("+995") && phoneNum.length === 13) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "nameType") {
    if (
      /^[ა-ჰ-.]*$/.test(inputElement.value) &&
      inputElement.value.length >= 2
    ) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "mailType") {
    if (/^[a-zA-Z0-9._]+@redberry.ge$/.test(inputElement.value)) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "selectionType") {
    if (inputElement.value) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "imgType") {
    if (inputElement.value) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("validImg");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalidImg");
    }
  } else if (validationType === "dateType") {
    if (inputElement.value) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  } else if (validationType === "timeFrameType") {
    let startDateString = startDateInputElement.value;
    let endDateString = inputElement.value;
    let startDateTime = new Date(startDateString).getTime();
    let endDateTime = new Date(endDateString).getTime();
    if (startDateTime < endDateTime) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("valid");
    } else if (startDateTime >= endDateTime) {
      classCheckAndRemove(inputElement);
      inputElement.classList.add("invalid");
    }
  }
};
