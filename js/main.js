const allSections = document.querySelectorAll("section");
const navHome = document.getElementById("nav-home");

function getCurrentSection() {
  let sectionId;
  const observer_section = new IntersectionObserver((sections) => {
    sections.forEach((section) => {
      if(section.isIntersecting){
        return section.target.id;
      };
    });
  });


  allSections.forEach((section) => {
    observer_section.observe(section);
  });
}

let currentSectionId = getCurrentSection();
setTimeout(() => {
  console.log(currentSectionId);
}, 1000);