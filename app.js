const newResumeBtn = document.querySelector(".newResume");
const landingPage = document.querySelector(".landingPage");
const formsAndPreview = document.querySelector(".formsAndPreview");
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
const education = document.querySelector(".education");

const getEducationTemplate = () => {
  return {
    institution: {
      id: "institution",
      validationType: "textType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    degreeType: {
      id: "degreeType",
      validationType: "selectionType",
      value: "",
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
      validationType: "textType",
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
      validationType: "textType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    employer: {
      id: "employer",
      validationType: "textType",
      value: "",
      isValid: false,
      wasEdited: false,
    },
    startDate: {
      id: "startDate",
      validationType: "timeFrameType",
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
      validationType: "textType",
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
    validationType: "numberType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
  experiences: [],
  educations: [],
  img: {
    id: "img",
    validationType: "imgType",
    value: null,
    isValid: false,
    wasEdited: false,
  },
  aboutMe: {
    id: "aboutMe",
    validationType: "textType",
    value: "",
    isValid: false,
    wasEdited: false,
  },
};

const sessionInfo = sessionStorage.getItem("formData");

if (sessionInfo === null) {
  const sessionObjJSON = JSON.stringify(sessionObj);
  sessionStorage.setItem("formData", sessionObjJSON);
} else {
  sessionObj = JSON.parse(sessionInfo);
}

console.log(sessionObj);

window.addEventListener("click", (e) => {
  for (let elem of e.composedPath()) {
    if (elem === newResumeBtn) {
      landingPage.classList.add("hide");
      formsAndPreview.classList.add("show");
    } else if (elem === addExpBtn) {
      e.preventDefault();
      let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
      newExperienceInputs.classList.remove("experienceInputsTemplate");

      let newExperienceInputsObj = getExperienceTemplate();
      for (const [key, value] of Object.entries(newExperienceInputsObj)) {
        let newExperienceInput = newExperienceInputs.querySelector(
          "#" + value.id
        );
        let newExperienceLabel = newExperienceInputs.querySelector(
          `[for=${value.id}]`
        );
        value.id = `${value.id}${sessionObj.experiences.length + 1}`;
        newExperienceInput.id = value.id;
        newExperienceLabel.setAttribute("for", value.id);
      }
      experience.insertBefore(newExperienceInputs, addExpBtn);
      for (const [key, value] of Object.entries(newExperienceInputsObj)) {
        addListenersAndUpdate(key, value);
      }

      sessionObj.experiences.push(newExperienceInputsObj);
      const sessionObjJSON = JSON.stringify(sessionObj);
      sessionStorage.setItem("formData", sessionObjJSON);
    }
    // educationistvis igive dasaweri
    // else if (elem === addInstBtn) {
    //   e.preventDefault();
    // }
  }
});

const addListenersAndUpdate = (key, value) => {
  let inputElement = document.querySelector(`#${value.id}`);
  if (!inputElement) {
    return null;
  }
  let previousValue = value.value;
  inputElement.value = previousValue;

  inputElement.addEventListener("input", (e) => {
    // console.log('in input Listerne', value);
    value.value = e.target.value;
    // console.log(value, sessionObj);
    const sessionJSON = JSON.stringify(sessionObj);
    sessionStorage.setItem("formData", sessionJSON);
  });

  // inputElement.addEventListener("blur", (e) => {
  //   validate function to create here
  // });
};

if (sessionObj.experiences.length === 0) {
  let newExperienceInputs = experienceInputsTemplate.cloneNode(true);
  newExperienceInputs.classList.remove("experienceInputsTemplate");

  let newExperienceInputsObj = getExperienceTemplate();
  for (const [key, value] of Object.entries(newExperienceInputsObj)) {
    let newExperienceInput = newExperienceInputs.querySelector("#" + value.id);
    let newExperienceLabel = newExperienceInputs.querySelector(
      `[for=${value.id}]`
    );
    value.id = `${value.id}${1}`;
    newExperienceInput.id = value.id;
    newExperienceLabel.setAttribute("for", value.id);
  }

  sessionObj.experiences.push(newExperienceInputsObj);
  const sessionObjJSON = JSON.stringify(sessionObj);
  sessionStorage.setItem("formData", sessionObjJSON);
  experience.insertBefore(newExperienceInputs, addExpBtn);
  for (const [key, value] of Object.entries(newExperienceInputsObj)) {
    addListenersAndUpdate(key, value);
  }
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