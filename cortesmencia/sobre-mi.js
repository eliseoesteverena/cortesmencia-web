
    const block = document.querySelectorAll('.block');
    block.forEach(div => {
        const resume = div.querySelector('.resume-content');
        const btn = div.querySelector('.btn');
        const more = div.querySelector('#more');
        more.addEventListener("click", () => {
            if(resume.classList.contains('limited-height')) {
                resume.classList.remove('limited-height');
                resume.classList.add("full-resume-content");
                more.textContent = "- Mostrar menos";
            } else if(resume.classList.contains('full-resume-content')) {
                resume.classList.remove('full-resume-content');
                resume.classList.add("limited-height");
                more.textContent = "+ Mas";
            }

        })
        
    });