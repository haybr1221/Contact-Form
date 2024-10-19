const contactForm = document.querySelector("form");
const Swal = window.Swal;

contactForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    
    let formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("msg").value,
    }
    
    fetch("/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    .then(response => {
        if (response.ok)
        {
            return response.text();
        } 
        else
        {
            throw new Error("Uh oh, something went wrong")
        }
    })
    .then(result => {
        contactForm.reset();
        Swal.fire({
            title: `Thank you, ${formData.name}!`,
            text: "Your message has been sent! We will contact you soon.",
            icon: "success"
            });
    })
    .catch(error => {
        console.error("Error:", error);
        Swal.fire({
            title: "Oops!",
            text: "It seems like there was an error",
            icon: "error"
            });
    });
})