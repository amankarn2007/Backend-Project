(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

//This is the form validation script, Add this in your boilerplate. 
//To apply this is form add "novalidate" to remove default validation, and add ".needs-validation" in form for this bootstrap validation. 
//in input div add "require" and make another div for "text" using  "invalid-feedback" || "valid-feedback" class