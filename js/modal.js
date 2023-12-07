export const myAddModel = new bootstrap.Modal('#addModal', {
    keyboard: true,
})

const addModel = document.getElementById('addModal')

if (addModel) {
    addModel.addEventListener('show.bs.modal', event => {
        // Button that triggered the modal
        const button = event.relatedTarget;

        // Extract info from data-bs-* attributes
        const recipient = button.getAttribute('data-bs-whatever')
        // If necessary, you could initiate an Ajax request here
        // and then do the updating in a callback.

        // Update the modal's content.
        const modalTitle = addModel.querySelector('.modal-title')
        const modalBodyInput = addModel.querySelector('.modal-body input')

        modalTitle.textContent = `Add a Movie`;

    })
}