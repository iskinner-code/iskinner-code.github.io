var currentImageSrc = "../images/mt.inari.jpg";

var defaultCourses = [
  {
    dept: "ITIS",
    num: "3135",
    name: "Front-End Web App Development",
    reason: "Required for my Concentration."
  },
  {
    dept: "ITIS",
    num: "3200",
    name: "Intro to Privacy and Security",
    reason: "Required for my Concentration."
  },
  {
    dept: "MATH",
    num: "1241",
    name: "Calculus I",
    reason: "General Education requirement."
  },
  {
    dept: "PHYS",
    num: "1101",
    name: "Introductory Physics I",
    reason: "General Education requirement."
  },
  {
    dept: "COMM",
    num: "3050",
    name: "Topics in Communication Studies",
    reason: "Orientation Counselor required class."
  }
];

var courseCounter = 0;

function escapeAttr(str) {
  return String(str).replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renumberCourses() {
  var entries = document.querySelectorAll(".course-entry fieldset legend");
  for (var i = 0; i < entries.length; i++) {
    var legend = entries[i];
    var btn = legend.querySelector("button");
    legend.childNodes[0].textContent = "Course " + (i + 1) + " ";
    if (btn) {
      legend.appendChild(btn);
    }
  }
}

function removeCourse(btn) {
  var entry = btn.closest(".course-entry");
  entry.remove();
  renumberCourses();
}

function addCourse(dept, num, name, reason) {
  dept = dept || "";
  num = num || "";
  name = name || "";
  reason = reason || "";
  courseCounter++;
  var container = document.getElementById("courses-container");
  var div = document.createElement("div");
  div.className = "course-entry";
  div.dataset.courseId = courseCounter;
  div.innerHTML =
    "<fieldset>" +
    "<legend>Course " +
    container.children.length +
    " " +
    '<button type="button" class="delete-course-btn" onclick="removeCourse(this)">Remove</button>' +
    "</legend>" +
    '<label>Department: <input type="text" name="course-dept" value="' +
    escapeAttr(dept) +
    '" placeholder="e.g. ITIS" required></label>' +
    '<label>Number: <input type="text" name="course-num" value="' +
    escapeAttr(num) +
    '" placeholder="e.g. 3135" required></label>' +
    '<label>Name: <input type="text" name="course-name" value="' +
    escapeAttr(name) +
    '" placeholder="Course name" required></label>' +
    '<label>Reason: <input type="text" name="course-reason" value="' +
    escapeAttr(reason) +
    '" placeholder="Why are you taking it?" required></label>' +
    "</fieldset>";
  container.appendChild(div);
  renumberCourses();
}

function get(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function gatherFormData() {
  var courses = [];
  var courseEntries = document.querySelectorAll(".course-entry");
  for (var i = 0; i < courseEntries.length; i++) {
    var entry = courseEntries[i];
    courses.push({
      department: entry.querySelector('[name="course-dept"]').value.trim(),
      number: entry.querySelector('[name="course-num"]').value.trim(),
      name: entry.querySelector('[name="course-name"]').value.trim(),
      reason: entry.querySelector('[name="course-reason"]').value.trim()
    });
  }

  var links = [];
  for (var j = 1; j <= 5; j++) {
    links.push({
      name: get("link-name-" + j),
      href: get("link-href-" + j)
    });
  }

  return {
    firstName: get("first-name"),
    middleName: get("middle-name"),
    nickname: get("nickname"),
    lastName: get("last-name"),
    ackStatement: get("ack-statement"),
    ackDate: get("ack-date"),
    mascotAdjective: get("mascot-adjective"),
    mascotAnimal: get("mascot-animal"),
    divider: get("divider"),
    imageSrc: currentImageSrc,
    imageCaption: get("image-caption"),
    personalStatement: get("personal-statement"),
    personalBackground: get("personal-background"),
    professionalBackground: get("professional-background"),
    academicBackground: get("academic-background"),
    subjectBackground: get("subject-background"),
    primaryComputer: get("primary-computer"),
    backupComputer: get("backup-computer"),
    courses: courses,
    quote: get("quote"),
    quoteAuthor: get("quote-author"),
    funnyThing: get("funny-thing"),
    shareItem: get("share-item"),
    links: links
  };
}

function buildNameHeading(data) {
  var name = data.firstName;
  if (data.middleName) {
    name += " " + data.middleName;
  }
  if (data.nickname) {
    name += ' "' + data.nickname + '"';
  }
  name += " " + data.lastName;
  var divider = data.divider || "|";
  return (
    name + " " + divider + " " + data.mascotAdjective + " " + data.mascotAnimal
  );
}

function renderIntroduction(data) {
  var main = document.querySelector("main");

  var courseItems = "";
  for (var i = 0; i < data.courses.length; i++) {
    var c = data.courses[i];
    courseItems +=
      "<li><b>" +
      escapeHtml(c.department + c.number) +
      " - " +
      escapeHtml(c.name) +
      ":</b> " +
      escapeHtml(c.reason) +
      "</li>\n";
  }

  var linkItems = "";
  var filteredLinks = [];
  for (var j = 0; j < data.links.length; j++) {
    if (data.links[j].name && data.links[j].href) {
      filteredLinks.push(data.links[j]);
    }
  }
  for (var k = 0; k < filteredLinks.length; k++) {
    if (k > 0) {
      linkItems += " | ";
    }
    linkItems +=
      '<a href="' +
      escapeAttr(filteredLinks[k].href) +
      '">' +
      escapeHtml(filteredLinks[k].name) +
      "</a>";
  }

  var funnyLi = data.funnyThing
    ? "<li><b>Funny/Interesting item to remember me by:</b> " +
      escapeHtml(data.funnyThing) +
      "</li>"
    : "";
  var shareLi = data.shareItem
    ? "<li><b>I'd also like to share:</b> " +
      escapeHtml(data.shareItem) +
      "</li>"
    : "";

  main.innerHTML =
    "<h2>Introduction Form</h2>" +
    "<h1>" +
    escapeHtml(buildNameHeading(data)) +
    "</h1>" +
    "<figure>" +
    '<img src="' +
    escapeAttr(data.imageSrc) +
    '" alt="' +
    escapeHtml(data.firstName + " " + data.lastName) +
    '">' +
    "<figcaption>" +
    escapeHtml(data.imageCaption) +
    "</figcaption>" +
    "</figure>" +
    "<p>" +
    escapeHtml(data.personalStatement) +
    "</p>" +
    "<ul>" +
    "<li><b>Personal Background:</b> " +
    escapeHtml(data.personalBackground) +
    "</li>" +
    "<li><b>Professional Background:</b> " +
    escapeHtml(data.professionalBackground) +
    "</li>" +
    "<li><b>Academic Background:</b> " +
    escapeHtml(data.academicBackground) +
    "</li>" +
    "<li><b>Background in this Subject:</b> " +
    escapeHtml(data.subjectBackground) +
    "</li>" +
    "<li><b>Primary Work Computer:</b> " +
    escapeHtml(data.primaryComputer) +
    "</li>" +
    "<li><b>Backup Work Computer &amp; Location Plan:</b> " +
    escapeHtml(data.backupComputer) +
    "</li>" +
    "<li><b>Courses I'm Taking &amp; Why:</b><ol>" +
    courseItems +
    "</ol></li>" +
    funnyLi +
    shareLi +
    "</ul>" +
    "<blockquote>&ldquo;" +
    escapeHtml(data.quote) +
    "&rdquo;<br><cite>- " +
    escapeHtml(data.quoteAuthor) +
    "</cite></blockquote>" +
    "<p>" +
    linkItems +
    "</p>" +
    '<p>Copyright 2026 © | Designed by Skinner Designs</p>' +
    "<hr>" +
    '<p><a href="intro_form.html">&#8635; Start Over</a></p>';
}

function validateForm(data) {
  var required = [
    ["firstName", "First Name"],
    ["lastName", "Last Name"],
    ["ackStatement", "Acknowledgment Statement"],
    ["ackDate", "Acknowledgment Date"],
    ["mascotAdjective", "Mascot Adjective"],
    ["mascotAnimal", "Mascot Animal"],
    ["divider", "Divider"],
    ["imageCaption", "Picture Caption"],
    ["personalStatement", "Personal Statement"],
    ["personalBackground", "Personal Background"],
    ["professionalBackground", "Professional Background"],
    ["academicBackground", "Academic Background"],
    ["subjectBackground", "Background in this Subject"],
    ["primaryComputer", "Primary Work Computer"],
    ["backupComputer", "Backup Work Computer"],
    ["quote", "Quote"],
    ["quoteAuthor", "Quote Author"]
  ];

  for (var i = 0; i < required.length; i++) {
    if (!data[required[i][0]]) {
      alert("Please fill in the required field: " + required[i][1]);
      return false;
    }
  }

  for (var j = 0; j < 5; j++) {
    var l = data.links[j];
    if (!l.name || !l.href) {
      alert("Please fill in both name and URL for Link " + (j + 1));
      return false;
    }
  }

  if (data.courses.length === 0) {
    alert("Please add at least one course.");
    return false;
  }

  for (var k = 0; k < data.courses.length; k++) {
    var c = data.courses[k];
    if (!c.department || !c.number || !c.name || !c.reason) {
      alert("Please fill in all fields for Course " + (k + 1));
      return false;
    }
  }

  return true;
}

function updateImagePreview() {
  var preview = document.getElementById("image-preview");
  if (preview) {
    preview.src = currentImageSrc || "";
    preview.style.display = currentImageSrc ? "block" : "none";
  }
}

function populateDefaultCourses() {
  var container = document.getElementById("courses-container");
  container.innerHTML = "";
  courseCounter = 0;
  for (var i = 0; i < defaultCourses.length; i++) {
    var c = defaultCourses[i];
    addCourse(c.dept, c.num, c.name, c.reason);
  }
}

function resetToDefaults() {
  document.getElementById("intro-form").reset();
  currentImageSrc = "../images/mt.inari.jpg";
  updateImagePreview();
  populateDefaultCourses();
}

function clearAllFields() {
  var inputs = document.querySelectorAll(
    "#intro-form input, #intro-form textarea"
  );
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value = "";
  }
  currentImageSrc = "";
  updateImagePreview();
}

document.addEventListener("DOMContentLoaded", function () {
  populateDefaultCourses();

  var form = document.getElementById("intro-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = gatherFormData();
    if (!validateForm(data)) {
      return;
    }
    renderIntroduction(data);
  });

  document
    .getElementById("reset-btn")
    .addEventListener("click", resetToDefaults);
  document
    .getElementById("clear-btn")
    .addEventListener("click", clearAllFields);
  document
    .getElementById("add-course-btn")
    .addEventListener("click", function () {
      addCourse();
    });

  document
    .getElementById("image-upload")
    .addEventListener("change", function () {
      var file = this.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        currentImageSrc = e.target.result;
        updateImagePreview();
      };
      reader.readAsDataURL(file);
    });
});
